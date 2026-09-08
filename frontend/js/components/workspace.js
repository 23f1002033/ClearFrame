/**
 * Counsel Review & Triage Workspace Component
 * Dual-pane workstation: Item Matrix on left, Deep Review Inspector on right.
 */
import { store } from "../store.js";

// Survives the re-render that setState triggers, so a focused text field keeps
// focus and caret position across it.
let pendingFocus = null;

export function renderWorkspace(container) {
  const { currentReport, selectedItemId, searchQuery, tierFilter, categoryFilter, decisionFilter } = store.state;

  if (!currentReport) {
    container.innerHTML = `
      <div class="h-full flex items-center justify-center p-8 text-center">
        <div>
          <h2 class="text-xl font-bold text-white mb-3">No Screenplay Loaded</h2>
          <p class="text-sm text-gray-400 mb-5">Please return to the dashboard or upload a script.</p>
          <button id="wsGoDashboard" class="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold">
            Go to Dashboard
          </button>
        </div>
      </div>
    `;
    const btn = container.querySelector("#wsGoDashboard");
    if (btn) btn.onclick = () => store.setState({ view: "dashboard" });
    return;
  }

  // Pre-sort findings by severity: ESCALATE -> NEEDS_VERIFICATION -> CLEAR_ON_RECORD
  const tierWeight = { ESCALATE: 3, NEEDS_VERIFICATION: 2, CLEAR_ON_RECORD: 1 };
  const sortedFindings = [...currentReport.findings].sort(
    (a, b) => (tierWeight[b.tier] || 0) - (tierWeight[a.tier] || 0)
  );

  // Map items joined with findings
  const itemMap = new Map(currentReport.items.map(i => [i.item_id, i]));
  const orderedItems = sortedFindings
    .map(f => itemMap.get(f.item_id))
    .filter(Boolean);

  // Apply filters & search
  const filteredItems = orderedItems.filter(item => {
    const finding = sortedFindings.find(f => f.item_id === item.item_id);
    const decision = store.getItemDecision(item.item_id);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchMention = item.mention_text.toLowerCase().includes(q);
      const matchNorm = (item.normalized_name || "").toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      if (!matchMention && !matchNorm && !matchCat) return false;
    }

    if (tierFilter !== "ALL" && finding?.tier !== tierFilter) return false;
    if (categoryFilter !== "ALL" && item.category !== categoryFilter) return false;
    if (decisionFilter !== "ALL" && decision !== decisionFilter) return false;

    return true;
  });

  const selectedItem = store.selectedItem || filteredItems[0] || null;
  const selectedFinding = selectedItem
    ? currentReport.findings.find(f => f.item_id === selectedItem.item_id)
    : null;

  const pendingCount = store.getPendingCount();
  const totalCount = currentReport.items.length;
  const reviewedCount = totalCount - pendingCount;

  // A failed run, or a finished run that yielded nothing from a script that did
  // parse, is not a clean script - it is a broken review. Rendering it as
  // "0 items - 0/0 decided" invites a producer to read an empty list as "nothing
  // here needs clearing", which is the worst false negative this product can
  // produce. It also made `isAllDecided` true, so the export button lit up green
  // for a report the backend would (correctly) refuse with 425.
  const pipelineFailed = currentReport.pipeline_state === "FAILED";
  const emptyButParsed =
    currentReport.pipeline_state === "COMPLETE" &&
    totalCount === 0 &&
    (currentReport.scene_count || 0) > 0;
  const runUnusable = pipelineFailed || emptyButParsed;
  const isAllDecided = pendingCount === 0 && totalCount > 0 && !runUnusable;

  const occurrences = selectedItem?.occurrences || [];
  const evidenceList = selectedItem
    ? Object.values(currentReport.evidence_store).filter(e => e.item_id === selectedItem.item_id)
    : [];
  const ruleOutcomes = selectedFinding?.rule_outcomes || [];

  // A music item carries two independent rights (composition and sound
  // recording) that must be shown side by side and never collapsed. The section
  // used to trigger on `category === "MUSIC" || ruleOutcomes.length >= 2`, while
  // section 4 tested only the category — so a non-music item with two outcomes
  // was labelled "Music Dual-Rights Analysis" and rendered twice. These two
  // flags are complementary by construction.
  const isDualRights = ruleOutcomes.length >= 2;
  const dualRightsHeading =
    selectedItem?.category === "MUSIC"
      ? "Music Dual-Rights Analysis (Independent Evaluation)"
      : "Independent Rights Analysis (Evaluated Separately)";
  const currentDecision = selectedItem ? store.getItemDecision(selectedItem.item_id) : "PENDING";
  const currentNote = selectedItem ? (currentReport.review_states?.[selectedItem.item_id]?.reviewer_note || "") : "";

  function renderClaimsWithCitations(claims) {
    if (!claims || claims.length === 0) {
      return `<p class="text-sm text-gray-400 italic">No verified rationale available for this item.</p>`;
    }

    return claims
      .map(claim => {
        const textWithChips = escapeHtml(claim.text).replace(/\[([^\]]+)\]/g, (match, inner) => {
          const ids = inner.split(/[,;]\s*/);
          const chips = ids.map(id => {
            const ev = currentReport.evidence_store[id];
            if (ev) {
              return `<span class="cite-token" data-ev-id="${id}" title="${escapeHtml(ev.source_title || ev.source_url)}">
                <svg class="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                ${id}
              </span>`;
            }
            const rule = ruleOutcomes.find(r => r.rule_id === id);
            if (rule) {
              return `<span class="cite-token cite-rule" data-rule-id="${id}" title="${escapeHtml(rule.citation || rule.explanation)}">
                § ${id}
              </span>`;
            }
            return `<span class="cite-token font-mono">${id}</span>`;
          });
          return `<span class="inline-flex gap-1 mx-0.5">${chips.join("")}</span>`;
        });

        return `<p class="text-base leading-relaxed text-gray-200 mb-3">${textWithChips}</p>`;
      })
      .join("");
  }

  container.innerHTML = `
    <div class="h-[calc(100vh-65px)] flex overflow-hidden">
      <!-- Left Pane: Item Matrix & Triage List -->
      <div class="w-96 flex-shrink-0 flex flex-col border-r border-gray-700/60 bg-gray-800/40">
        <!-- Matrix Top Bar -->
        <div class="p-5 border-b border-gray-700/60 bg-gray-800/60">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-base font-bold text-white tracking-tight">${currentReport.script_name}</h2>
              <div class="text-sm text-gray-400 mt-1">
                ${
                  runUnusable
                    ? `<b class="text-red-400">Pipeline ${escapeHtml(currentReport.pipeline_state)} — review incomplete</b>`
                    : `${totalCount} items · <b class="${isAllDecided ? "text-emerald-400" : "text-amber-400"}">${reviewedCount}/${totalCount} decided</b>`
                }
              </div>
            </div>
            <button id="wsBtnExport" ${runUnusable ? "disabled" : ""} title="${
              runUnusable ? "Export unavailable: the pipeline did not complete" : "Export the clearance log"
            }" class="px-4 py-2 rounded-xl ${
              runUnusable
                ? "bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed font-medium"
                : isAllDecided
                ? "bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/25 text-white font-semibold"
                : "bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600 font-medium"
            } text-sm flex items-center gap-2 transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              Export Log
            </button>
          </div>

          <!-- Search Input -->
          <div class="relative mb-3">
            <input type="text" id="wsSearchInput" placeholder="Filter items, categories, scenes..." value="${escapeHtml(searchQuery)}"
              class="w-full bg-gray-900 border border-gray-700 focus:border-blue-500 text-white rounded-xl pl-9 pr-4 py-2 text-sm placeholder:text-gray-500 transition-all outline-none">
            <svg class="w-4 h-4 text-gray-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>

          <!-- Tier Quick Filters -->
          <div class="flex items-center gap-1.5">
            <button class="filter-tier px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              tierFilter === "ALL" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-gray-200"
            }" data-tier="ALL">All</button>
            <button class="filter-tier px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              tierFilter === "ESCALATE" ? "bg-red-500/15 text-red-300 border border-red-500/30" : "text-gray-400 hover:text-red-300"
            }" data-tier="ESCALATE">Escalate</button>
            <button class="filter-tier px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              tierFilter === "NEEDS_VERIFICATION" ? "bg-amber-500/15 text-amber-300 border border-amber-500/30" : "text-gray-400 hover:text-amber-300"
            }" data-tier="NEEDS_VERIFICATION">Needs verify</button>
            <button class="filter-tier px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              tierFilter === "CLEAR_ON_RECORD" ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30" : "text-gray-400 hover:text-emerald-300"
            }" data-tier="CLEAR_ON_RECORD">Clear on record</button>
          </div>
        </div>

        <!-- Scrollable Item List -->
        <div class="flex-1 overflow-y-auto divide-y divide-gray-700/40" id="itemList">
          ${
            filteredItems.length === 0
              ? `<div class="p-8 text-center text-sm ${runUnusable ? "text-red-300" : "text-gray-500"}">${
                  runUnusable
                    ? "No items were extracted because the pipeline did not complete. This is not a clean script."
                    : "No items match the current filters."
                }</div>`
              : filteredItems
                  .map(item => {
                    const finding = currentReport.findings.find(f => f.item_id === item.item_id);
                    const decision = store.getItemDecision(item.item_id);
                    const isSelected = selectedItem?.item_id === item.item_id;
                    const tier = finding?.tier || "NEEDS_VERIFICATION";
                    const pageNums = item.occurrences.map(o => o.page_number).filter((v, i, a) => a.indexOf(v) === i);

                    return `
              <div class="p-4 cursor-pointer transition-all item-row ${
                isSelected
                  ? "bg-gray-700/60 border-l-4 border-blue-500 pl-3.5 shadow-sm"
                  : "hover:bg-gray-800/60"
              }" data-id="${item.item_id}">
                <div class="flex items-center justify-between gap-2 mb-1.5">
                  <span class="font-semibold text-sm text-white truncate max-w-[200px]" title="${escapeHtml(item.mention_text)}">
                    ${escapeHtml(item.mention_text)}
                  </span>
                  <span class="px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide uppercase badge-${tier}">
                    ${tier.replace(/_/g, " ")}
                  </span>
                </div>
                <div class="flex items-center justify-between text-xs text-gray-400">
                  <span class="truncate max-w-[170px]">${item.category.replace(/_/g, " ").toLowerCase()} · p.${pageNums.join(", ")}</span>
                  <span class="px-2 py-0.5 rounded-full text-xs font-mono uppercase font-semibold border ${
                    decision !== "PENDING" ? "decision-" + decision : "text-gray-500 border-gray-700"
                  }">
                    ${decision}
                  </span>
                </div>
              </div>
            `;
                  })
                  .join("")
          }
        </div>

        <!-- Matrix Footer / Hotkey helper -->
        <div class="p-3 border-t border-gray-700/60 bg-gray-900 text-xs text-gray-500 flex items-center justify-between">
          <span>Hotkeys:</span>
          <span class="flex items-center gap-1.5">
            <span class="kbd-chip">C</span> Confirm
            <span class="kbd-chip">R</span> Reject
            <span class="kbd-chip">E</span> Escalate
            <span class="kbd-chip">J/K</span> Nav
          </span>
        </div>
      </div>

      <!-- Right Pane: Deep Review Inspector -->
      <div class="flex-1 flex flex-col overflow-hidden bg-gray-900">
        ${
          runUnusable
            ? `
          <div class="h-full flex items-center justify-center p-10">
            <div class="max-w-2xl">
              <div class="rounded-2xl border border-red-500/40 bg-red-950/25 p-8">
                <div class="flex items-center gap-4 mb-5">
                  <div class="w-12 h-12 rounded-xl bg-red-500/15 text-red-300 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  </div>
                  <div>
                    <h2 class="text-xl font-bold text-white tracking-tight">Pipeline did not complete</h2>
                    <div class="text-sm text-red-300 font-medium">This is not a clean script. It is an incomplete review.</div>
                  </div>
                </div>
                <p class="text-sm text-gray-200 leading-relaxed mb-5">
                  ${escapeHtml(
                    currentReport.error ||
                      "The run produced no items from a screenplay that parsed successfully. Nothing here has been researched."
                  )}
                </p>
                <div class="text-sm text-gray-300 bg-gray-900/60 border border-gray-700/60 rounded-xl p-4 mb-6">
                  <b class="text-white">Do not treat this as a clearance result.</b>
                  ${currentReport.scene_count || 0} scene(s) were parsed and
                  ${totalCount} item(s) extracted, so any brand, song, person or
                  location in this screenplay remains unreviewed.
                </div>
                <div class="flex items-center gap-3">
                  <button id="wsViewTrace" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold">
                    Inspect agent trace
                  </button>
                  <button id="wsGoDashboardFail" class="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-medium border border-gray-600">
                    Back to dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        `
            : !selectedItem
            ? `
          <div class="h-full flex items-center justify-center text-gray-500 text-base">
            Select an item from the matrix to inspect clearance research.
          </div>
        `
            : `
          <!-- Inspector Top Header & Review Decision Bar -->
          <div class="p-6 border-b border-gray-700/60 bg-gray-800/50 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <div class="flex items-center gap-3">
                <h1 class="text-2xl font-bold text-white tracking-tight">${escapeHtml(selectedItem.mention_text)}</h1>
                <span class="px-3 py-1 rounded-lg text-sm font-bold uppercase tracking-wide badge-${selectedFinding?.tier}">
                  ${selectedFinding?.tier.replace(/_/g, " ")}
                </span>
                <span class="text-sm text-gray-400 font-mono px-3 py-1 rounded-lg bg-gray-700 border border-gray-600">
                  ${selectedItem.category.replace(/_/g, " ").toLowerCase()}
                </span>
              </div>
              <div class="text-sm text-gray-400 mt-2 flex items-center gap-4">
                ${
                  selectedItem.normalized_name &&
                  selectedItem.normalized_name.toLowerCase() !== selectedItem.mention_text.toLowerCase()
                    ? `<span>Resolved entity: <b class="text-gray-200">${escapeHtml(selectedItem.normalized_name)}</b></span>`
                    : ""
                }
                ${
                  selectedItem.variants?.length
                    ? `<span>Also appears as: <i class="text-gray-300">${selectedItem.variants.map(escapeHtml).join(", ")}</i></span>`
                    : ""
                }
                ${
                  selectedFinding?.rights_holder_hint
                    ? `<span>Rights Holder Hint: <b class="text-blue-400">${escapeHtml(selectedFinding.rights_holder_hint)}</b></span>`
                    : ""
                }
              </div>
            </div>

            <!-- Reviewer Decision Actions -->
            <div class="flex items-center gap-2.5 flex-wrap">
              <span class="text-sm text-gray-400 mr-1">Decision:</span>
              <button class="btn-decide px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                currentDecision === "CONFIRMED"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                  : "bg-gray-700 hover:bg-gray-600 text-emerald-400 border border-gray-600"
              }" data-decision="CONFIRMED">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Confirm
              </button>

              <button class="btn-decide px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                currentDecision === "REJECTED"
                  ? "bg-gray-600 text-white shadow-md"
                  : "bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-600"
              }" data-decision="REJECTED">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                Reject
              </button>

              <button class="btn-decide px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                currentDecision === "ESCALATED"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/25"
                  : "bg-gray-700 hover:bg-gray-600 text-red-400 border border-gray-600"
              }" data-decision="ESCALATED">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                Escalate
              </button>

              ${
                currentDecision !== "PENDING"
                  ? `
                <button class="btn-decide px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white bg-gray-800 border border-gray-700" data-decision="PENDING" title="Reset to Pending">
                  Reset
                </button>
              `
                  : ""
              }
            </div>
          </div>

          <!-- Counsel Note Row -->
          <div class="px-6 py-3 bg-gray-800/30 border-b border-gray-700/40 flex items-center gap-4">
            <label for="reviewerNoteInput" class="text-sm text-gray-400 flex items-center gap-2 whitespace-nowrap">
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              Counsel Note:
            </label>
            <input type="text" id="reviewerNoteInput" placeholder="Add rationale or instructions for production legal binder (optional)..."
              value="${escapeHtml(currentNote)}"
              class="flex-1 bg-gray-900 border border-gray-700 focus:border-blue-500 text-white rounded-lg px-4 py-2 text-sm outline-none transition-all">
          </div>

          <!-- Inspector Scrollable Body -->
          <div class="flex-1 overflow-y-auto p-8 space-y-8">
            <!-- 1. Script Occurrences -->
            <div class="inspector-section">
              <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                Screenplay Occurrences (${occurrences.length})
              </h3>
              <div class="rounded-xl border border-gray-700/60 overflow-hidden bg-gray-800/40">
                <table class="w-full text-left text-sm">
                  <thead class="bg-gray-800/80 text-gray-400 border-b border-gray-700/60">
                    <tr>
                      <th class="py-3 px-4 font-semibold">Scene</th>
                      <th class="py-3 px-4 font-semibold">Page</th>
                      <th class="py-3 px-4 font-semibold">On-Screen</th>
                      <th class="py-3 px-4 font-semibold">Depiction</th>
                      <th class="py-3 px-4 font-semibold">Context Snippet</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-700/40">
                    ${occurrences
                      .map(
                        occ => `
                      <tr class="hover:bg-gray-700/30">
                        <td class="py-3 px-4 font-mono text-gray-300">Sc. ${occ.scene_number}</td>
                        <td class="py-3 px-4 font-mono font-bold text-blue-400">p. ${occ.page_number}</td>
                        <td class="py-3 px-4">
                          <span class="px-2.5 py-1 rounded-lg text-xs font-semibold ${
                            occ.on_screen ? "bg-blue-500/15 text-blue-300" : "bg-gray-700 text-gray-400"
                          }">
                            ${occ.on_screen ? "Visual Prop" : "Dialogue only"}
                          </span>
                        </td>
                        <td class="py-3 px-4">
                          <span class="px-2.5 py-1 rounded-lg text-xs font-semibold ${
                            occ.depiction_nature === "NEGATIVE"
                              ? "bg-red-500/15 text-red-300"
                              : occ.depiction_nature === "POSITIVE"
                              ? "bg-emerald-500/15 text-emerald-300"
                              : "bg-gray-700 text-gray-400"
                          }">
                            ${occ.depiction_nature.toLowerCase()}
                          </span>
                        </td>
                        <td class="py-3 px-4 text-gray-300 leading-relaxed max-w-lg">
                          ${highlightMention(occ.context_snippet, selectedItem.mention_text)}
                        </td>
                      </tr>
                    `
                      )
                      .join("")}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- 2. Sourced Legal Assessment -->
            <div class="inspector-section">
              <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Synthesized Assessment &amp; Citations
              </h3>
              <div class="p-5 rounded-xl border border-gray-700/60 bg-gray-800/50">
                ${renderClaimsWithCitations(selectedFinding?.claims)}
              </div>
            </div>

            <!-- 3. Side-by-side comparison when an item carries two rights -->
            ${
              isDualRights
                ? `
              <div class="inspector-section">
                <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
                  ${dualRightsHeading}
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                  ${ruleOutcomes
                    .map(r => {
                      const isPD = r.outcome === "PUBLIC_DOMAIN";
                      return `
                    <div id="rule-${r.rule_id}" class="p-5 rounded-xl border scroll-mt-6 ${
                      isPD ? "border-emerald-500/25 bg-emerald-950/15" : "border-red-500/25 bg-red-950/15"
                    }">
                      <div class="flex items-center justify-between mb-3">
                        <span class="text-sm font-mono font-bold text-white">${r.rule_id}</span>
                        <span class="px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
                          isPD ? "bg-emerald-500/15 text-emerald-300" : "bg-red-500/15 text-red-300"
                        }">${r.outcome}</span>
                      </div>
                      <div class="text-sm text-gray-300 leading-relaxed mb-4">${escapeHtml(r.explanation)}</div>
                      <div class="text-xs text-gray-400 font-mono border-t border-gray-700/40 pt-3 flex items-center justify-between">
                        <span>${r.citation || "Statutory Schedule"}</span>
                        ${r.public_domain_year ? `<b class="text-white">PD Year: ${r.public_domain_year}</b>` : ""}
                      </div>
                    </div>
                  `;
                    })
                    .join("")}
                </div>
              </div>
            `
                : ""
            }

            <!-- 4. Deterministic Statutory Rule Outcomes -->
            ${
              !isDualRights && ruleOutcomes.length > 0
                ? `
              <div class="inspector-section">
                <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                  Deterministic Rule Outcomes
                </h3>
                <div class="space-y-4">
                  ${ruleOutcomes
                    .map(r => {
                      const isInsuf = r.outcome === "INSUFFICIENT_FACTS";
                      return `
                    <div id="rule-${r.rule_id}" class="p-5 rounded-xl border border-gray-700/60 bg-gray-800/40 border-l-4 border-l-blue-500 scroll-mt-6">
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-bold text-white font-mono">${r.rule_id}</span>
                        <span class="px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase ${
                          isInsuf
                            ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                            : "bg-gray-700 text-gray-300"
                        }">
                          ${r.outcome}
                        </span>
                      </div>
                      <p class="text-sm text-gray-300 leading-relaxed">${escapeHtml(r.explanation)}</p>
                      ${
                        r.missing_facts?.length
                          ? `
                        <div class="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-sm text-amber-300">
                          <b>Further research needed:</b> ${r.missing_facts.join(", ")}
                        </div>
                      `
                          : ""
                      }
                      ${r.citation ? `<div class="mt-3 text-xs text-gray-400 font-mono">${escapeHtml(r.citation)}</div>` : ""}
                    </div>
                  `;
                    })
                    .join("")}
                </div>
              </div>
            `
                : ""
            }

            <!-- 5. Open Questions Checklist -->
            ${
              selectedFinding?.open_questions?.length
                ? `
              <div class="inspector-section">
                <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Counsel Clearance Inquiries
                </h3>
                <div class="p-5 rounded-xl border border-gray-700/60 bg-gray-800/40">
                  <ul class="space-y-2.5 text-sm text-gray-300 list-disc list-inside">
                    ${selectedFinding.open_questions.map(q => `<li>${escapeHtml(q)}</li>`).join("")}
                  </ul>
                </div>
              </div>
            `
                : ""
            }

            <!-- 6. Verified Evidence Sources -->
            <div class="inspector-section">
              <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                Evidence Vault (${evidenceList.length} sources)
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4" id="evidenceCardsContainer">
                ${
                  evidenceList.length === 0
                    ? `<div class="col-span-2 p-5 rounded-xl border border-red-500/25 bg-red-950/15 text-sm text-red-300">
                        No sources retrieved. This item has not been researched.
                      </div>`
                    : evidenceList
                        .map(
                          ev => `
                      <div class="p-5 rounded-xl border border-gray-700/60 bg-gray-800/40 hover:border-gray-600 transition-all flex flex-col justify-between" id="card-${ev.evidence_id}">
                        <div>
                          <div class="flex items-center justify-between gap-2 mb-2">
                            <span class="text-xs font-mono text-blue-400 font-semibold truncate">${ev.evidence_id}</span>
                            <span class="text-xs text-gray-500 font-mono">Retrieved ${ev.retrieved_at ? ev.retrieved_at.slice(0, 10) : "N/A"}</span>
                          </div>
                          <a href="${escapeHtml(ev.source_url)}" target="_blank" rel="noopener" class="text-sm font-semibold text-white hover:text-blue-400 transition-colors line-clamp-1 mb-2">
                            ${escapeHtml(ev.source_title || ev.source_url)}
                          </a>
                          <p class="text-sm text-gray-400 leading-relaxed line-clamp-3 mb-3">${escapeHtml(ev.snippet)}</p>
                        </div>
                        <div class="text-xs text-gray-500 border-t border-gray-700/40 pt-3 truncate font-mono">
                          ${escapeHtml(ev.relevance_note || "Source reference")}
                        </div>
                      </div>
                    `
                        )
                        .join("")
                }
              </div>
            </div>

            <!-- 7. Dropped Claims Disclosure -->
            ${
              selectedFinding?.dropped_claims?.length
                ? `
              <details class="inspector-section rounded-xl border border-gray-700/60 bg-gray-800/30 p-5 text-sm text-gray-400">
                <summary class="cursor-pointer font-medium text-gray-300 hover:text-white flex items-center justify-between">
                  <span>${selectedFinding.dropped_claims.length} claim(s) stripped in validation</span>
                  <span class="text-xs uppercase font-mono px-2.5 py-1 rounded-lg bg-gray-700">Guardrail Audit</span>
                </summary>
                <div class="mt-4 pt-4 border-t border-gray-700/40 space-y-2 text-gray-400 italic">
                  ${selectedFinding.dropped_claims.map(c => `<div>• ${escapeHtml(c)}</div>`).join("")}
                </div>
              </details>
            `
                : ""
            }
          </div>
        `
        }
      </div>
    </div>
  `;

  // Attach handlers
  const searchInput = container.querySelector("#wsSearchInput");
  if (searchInput) {
    searchInput.oninput = e => {
      // Remember the caret: setState re-renders this whole pane, which replaces
      // the input element. Without this the field lost focus after the first
      // character and the reviewer could only ever type one letter.
      pendingFocus = { id: "wsSearchInput", start: e.target.selectionStart, end: e.target.selectionEnd };
      store.setState({ searchQuery: e.target.value });
    };
  }

  if (pendingFocus) {
    const el = container.querySelector(`#${pendingFocus.id}`);
    if (el) {
      el.focus();
      if (typeof el.setSelectionRange === "function" && pendingFocus.start != null) {
        try {
          el.setSelectionRange(pendingFocus.start, pendingFocus.end);
        } catch {
          /* non-text input types do not support selection ranges */
        }
      }
    }
    pendingFocus = null;
  }

  container.querySelectorAll(".filter-tier").forEach(btn => {
    btn.onclick = () => {
      store.setState({ tierFilter: btn.dataset.tier });
    };
  });

  container.querySelectorAll(".item-row").forEach(row => {
    row.onclick = () => {
      store.selectItem(row.dataset.id);
    };
  });

  container.querySelectorAll(".btn-decide").forEach(btn => {
    btn.onclick = () => {
      const decision = btn.dataset.decision;
      const noteInput = container.querySelector("#reviewerNoteInput");
      const note = noteInput ? noteInput.value : "";
      store.decideCurrentItem(decision, note);
    };
  });

  const noteInput = container.querySelector("#reviewerNoteInput");
  if (noteInput) {
    noteInput.onchange = e => {
      const currentDec = store.getItemDecision(selectedItem.item_id);
      store.decideCurrentItem(currentDec, e.target.value);
    };
  }

  const traceBtn = container.querySelector("#wsViewTrace");
  if (traceBtn) traceBtn.onclick = () => store.setState({ view: "trace" });
  const failDash = container.querySelector("#wsGoDashboardFail");
  if (failDash) failDash.onclick = () => store.setState({ view: "dashboard" });

  const exportBtn = container.querySelector("#wsBtnExport");
  if (exportBtn) {
    exportBtn.onclick = () => {
      store.export();
    };
  }

  // Citation chips jump to what they cite. Rule chips previously carried the
  // same clickable styling but no handler and no target element, so clicking a
  // [RULE_ID] chip silently did nothing.
  function flashTarget(target) {
    if (!target) return false;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.classList.add("ring-2", "ring-blue-500");
    setTimeout(() => target.classList.remove("ring-2", "ring-blue-500"), 2000);
    return true;
  }

  container.querySelectorAll(".cite-token").forEach(chip => {
    const evId = chip.dataset.evId;
    const ruleId = chip.dataset.ruleId;
    if (!evId && !ruleId) return;
    chip.style.cursor = "pointer";
    chip.onclick = () => {
      // getElementById tolerates ids that are not valid CSS selectors.
      const target = evId
        ? document.getElementById(`card-${evId}`)
        : document.getElementById(`rule-${ruleId}`);
      flashTarget(target);
    };
  });
}

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}

function highlightMention(text, mention) {
  if (!text || !mention) return escapeHtml(text);
  const escaped = escapeHtml(text);
  const regex = new RegExp(`(${escapeRegex(mention)})`, "gi");
  return escaped.replace(regex, `<mark class="bg-blue-500/25 text-blue-200 px-1 rounded font-semibold">$1</mark>`);
}

function escapeRegex(string) {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
}
