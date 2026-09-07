"""Tests for screenplay ingest.

Page-number fidelity is the property under test throughout. A finding that cites
the wrong page is unusable, so the deterministic anchor must be exact and must
override the model whenever the two disagree.
"""

from __future__ import annotations

from pathlib import Path

import pytest

from clearframe.ingest.parser import (
    LINES_PER_PAGE,
    PageText,
    ParserError,
    _is_character_cue,
    build_marked_document,
    deterministic_scenes,
    extract_pages,
    parse_script,
    reconcile,
)
from clearframe.models import Scene

SCRIPT_TXT = Path("data/scripts/the_last_good_year.txt")
SCRIPT_PDF = Path("data/scripts/the_last_good_year.pdf")


def test_text_and_pdf_agree_on_every_page_number() -> None:
    """The same script in two formats must yield identical page attribution.

    This is the core guarantee of the ingest stage. If PDF extraction drifted by
    even one page, every finding for that page would send counsel to the wrong
    place in the script.
    """
    txt = parse_script(SCRIPT_TXT, use_gemini=False)
    pdf = parse_script(SCRIPT_PDF, use_gemini=False)

    assert len(txt.scenes) == len(pdf.scenes) == 14
    assert txt.page_count == pdf.page_count == 6
    assert [s.page_number for s in txt.scenes] == [s.page_number for s in pdf.scenes]
    assert [s.heading for s in txt.scenes] == [s.heading for s in pdf.scenes]


def test_page_numbers_are_monotonic_and_within_range() -> None:
    """Scenes never go backwards, and never cite a page the script lacks."""
    doc = parse_script(SCRIPT_PDF, use_gemini=False)
    pages = [s.page_number for s in doc.scenes]
    assert pages == sorted(pages)
    assert all(1 <= p <= doc.page_count for p in pages)


def test_scene_numbers_are_sequential_from_one() -> None:
    """Scene numbering is dense and 1-based, which the chunker relies on."""
    doc = parse_script(SCRIPT_PDF, use_gemini=False)
    assert [s.scene_number for s in doc.scenes] == list(range(1, len(doc.scenes) + 1))


def test_deterministic_parser_finds_all_slugline_forms() -> None:
    """INT., EXT. and CONTINUOUS variants are all recognised as scene starts."""
    doc = parse_script(SCRIPT_TXT, use_gemini=False)
    headings = [s.heading for s in doc.scenes]
    assert any(h.startswith("INT.") for h in headings)
    assert any(h.startswith("EXT.") for h in headings)
    assert "INT. VALLEY PAWN & LOAN - CONTINUOUS" in headings


def test_action_and_dialogue_are_separated() -> None:
    """Both channels must be populated; extraction reads them differently."""
    doc = parse_script(SCRIPT_TXT, use_gemini=False)
    assert sum(len(s.action_text) for s in doc.scenes) > 1000
    assert sum(len(s.dialogue_text) for s in doc.scenes) > 1000

    diner = next(s for s in doc.scenes if "GOLDEN BEAR" in s.heading)
    assert "COCA-COLA" in diner.action_text
    assert "BYE BYE BLACKBIRD" in diner.dialogue_text


def test_title_page_is_not_a_scene() -> None:
    """"FADE IN:" and the title block must not be segmented as scenes."""
    doc = parse_script(SCRIPT_TXT, use_gemini=False)
    assert all("FADE IN" not in s.heading for s in doc.scenes)
    assert all("THE LAST GOOD YEAR" not in s.heading for s in doc.scenes)


# ---------------------------------------------------------------------------
# Pagination
# ---------------------------------------------------------------------------


def test_form_feeds_define_pages_when_present() -> None:
    """Paginated text uses its own page breaks rather than a line count."""
    raw = "INT. A - DAY\nline\n\fINT. B - DAY\nline\n\fINT. C - DAY\nline"
    from clearframe.ingest.parser import _pages_from_text

    pages = _pages_from_text(raw)
    assert [p.page_number for p in pages] == [1, 2, 3]
    scenes = deterministic_scenes(pages)
    assert [s.page_number for s in scenes] == [1, 2, 3]


def test_unpaginated_text_falls_back_to_standard_page_length() -> None:
    """Without form feeds, a standard 55-line screenplay page is assumed."""
    from clearframe.ingest.parser import _pages_from_text

    raw = "\n".join(f"line {i}" for i in range(LINES_PER_PAGE * 3))
    pages = _pages_from_text(raw)
    assert len(pages) == 3


def test_unsupported_and_missing_files_raise() -> None:
    """Ingest fails loudly rather than returning an empty script."""
    with pytest.raises(ParserError):
        extract_pages(Path("data/scripts/does_not_exist.pdf"))
    with pytest.raises(ParserError):
        extract_pages(Path("requirements.txt").with_suffix(".xyz"))


def test_marked_document_labels_every_page() -> None:
    """Page markers are what let the model attribute scenes to real pages."""
    pages = [PageText(page_number=n, text=f"body {n}") for n in (1, 2, 3)]
    marked = build_marked_document(pages)
    for n in (1, 2, 3):
        assert f"<<<PAGE {n}>>>" in marked


# ---------------------------------------------------------------------------
# Character cue detection
# ---------------------------------------------------------------------------


@pytest.mark.parametrize(
    "line",
    ["MAYA", "        RAY", "DESMOND (CONT'D)", "RAY (O.S.)", "YOUNG MUSICIAN"],
)
def test_character_cues_are_recognised(line: str) -> None:
    """Cues are detected regardless of indentation, which PDFs discard."""
    assert _is_character_cue(line)


@pytest.mark.parametrize(
    "line",
    [
        "INT. DINER - NIGHT",
        "FADE IN:",
        "CUT TO:",
        "THE END",
        "She opens it.",
        "A 1962 GIBSON ES-335, CHERRY RED, WORN THROUGH AT THE THUMB.",
        "BACK TO SCENE",
    ],
)
def test_non_cues_are_rejected(line: str) -> None:
    """Transitions and all-caps action must not be mistaken for dialogue."""
    assert not _is_character_cue(line)


# ---------------------------------------------------------------------------
# Reconciliation
# ---------------------------------------------------------------------------


def _scene(n: int, page: int, heading: str) -> Scene:
    """Build a Scene for reconciliation tests."""
    return Scene(scene_number=n, page_number=page, heading=heading, action_text="x")


def test_reconcile_corrects_a_wrong_model_page_number() -> None:
    """The deterministic anchor wins every page-number disagreement."""
    model = [_scene(1, 9, "INT. DINER - NIGHT")]
    anchor = [_scene(1, 4, "INT. DINER - NIGHT")]
    scenes, notes = reconcile(model, anchor)
    assert scenes[0].page_number == 4
    assert any("Corrected page" in n for n in notes)


def test_reconcile_recovers_a_scene_the_model_dropped() -> None:
    """A dropped scene is a missed clearance item, so it is always recovered."""
    model = [_scene(1, 1, "INT. DINER - NIGHT")]
    anchor = [
        _scene(1, 1, "INT. DINER - NIGHT"),
        _scene(2, 2, "EXT. STREET - DAY"),
    ]
    scenes, notes = reconcile(model, anchor)
    assert len(scenes) == 2
    assert any("Recovered scene" in n for n in notes)
    assert [s.scene_number for s in scenes] == [1, 2]


def test_reconcile_flags_a_scene_with_no_source_slugline() -> None:
    """A scene the model invented is kept but explicitly marked unverified."""
    model = [_scene(1, 3, "INT. NOWHERE - DAY")]
    anchor = [_scene(1, 1, "INT. DINER - NIGHT")]
    scenes, notes = reconcile(model, anchor)
    assert any("unverified" in n for n in notes)
    assert len(scenes) == 2  # the anchor scene is still recovered


def test_reconcile_falls_back_cleanly_when_model_returns_nothing() -> None:
    """A failed or blocked model call degrades to the deterministic parser."""
    anchor = [_scene(1, 1, "INT. DINER - NIGHT")]
    scenes, notes = reconcile([], anchor)
    assert scenes == anchor
    assert any("deterministic" in n for n in notes)


def test_reconcile_matches_headings_despite_scene_numbers_and_case() -> None:
    """Heading matching survives the numbering some drafts print in the slug."""
    model = [_scene(1, 7, "INT. DINER - NIGHT")]
    anchor = [_scene(1, 2, "12  INT. Diner - Night")]
    scenes, notes = reconcile(model, anchor)
    assert scenes[0].page_number == 2
    assert any("Corrected page" in n for n in notes)


def test_repeated_headings_are_matched_one_to_one() -> None:
    """A location used twice yields two scenes, each on its own page."""
    model = [_scene(1, 1, "INT. DINER - NIGHT"), _scene(2, 1, "INT. DINER - NIGHT")]
    anchor = [_scene(1, 1, "INT. DINER - NIGHT"), _scene(2, 4, "INT. DINER - NIGHT")]
    scenes, _ = reconcile(model, anchor)
    assert sorted(s.page_number for s in scenes) == [1, 4]


def test_parse_without_gemini_records_a_note() -> None:
    """Running deterministic-only is visible in the output, never silent."""
    doc = parse_script(SCRIPT_TXT, use_gemini=False)
    assert doc.parser_notes
    assert any("deterministic" in n for n in doc.parser_notes)
