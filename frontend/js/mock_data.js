/**
 * Pre-baked sample report and trace data for "The Last Good Year".
 *
 * GENERATED — do not hand-edit. Regenerate after a pipeline run with:
 *   python scripts/generate_mock_data.py
 *
 * Source run : rpt_demo_the_last_good_year (COMPLETE)
 * Script     : 15 scenes / 7 pages
 * Items      : 27   Evidence: 222   Findings: 27
 * Tiers      : {'ESCALATE': 12, 'NEEDS_VERIFICATION': 13, 'CLEAR_ON_RECORD': 2}
 * Categories : {'NAME_COLLISION': 4, 'REAL_PERSON': 3, 'BRAND_TRADEMARK': 9, 'REAL_LOCATION_BUSINESS': 5, 'MUSIC': 1, 'LOGO_PROP': 4, 'PUBLISHED_WORK': 1}
 *
 * Shapes match the API exactly:
 *   MOCK_REPORT   <- GET /api/reports/{id}
 *   MOCK_TRACE    <- GET /api/reports/{id}/trace
 *   MOCK_REPORTS  <- GET /api/reports          (dashboard list view)
 *
 * Enables offline demo and presentation when live API keys are unavailable.
 */

export const MOCK_REPORT = {
  "report_id": "rpt_demo_the_last_good_year",
  "script_name": "The Last Good Year",
  "status": "DRAFT",
  "created_at": "2026-09-08T11:16:46.472263Z",
  "updated_at": "2026-09-08T11:22:04.550373Z",
  "pipeline_state": "COMPLETE",
  "error": null,
  "page_count": 7,
  "scene_count": 15,
  "items": [
    {
      "item_id": "item_4051d7cfe988",
      "mention_text": "MERIDIAN SOUND",
      "category": "NAME_COLLISION",
      "occurrences": [
        {
          "scene_number": 4,
          "page_number": 2,
          "context_snippet": "INT. MERIDIAN SOUND - LOBBY - DAY\n\nA waiting room pretending to be a lounge.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        },
        {
          "scene_number": 5,
          "page_number": 3,
          "context_snippet": "INT. MERIDIAN SOUND - RECORDING BOOTH - DAY\n\nCramped. Egg-crate foam gone yellow.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        },
        {
          "scene_number": 7,
          "page_number": 3,
          "context_snippet": "ELENA\nMeridian Sound. That's who's paying\nyou.",
          "on_screen": false,
          "depiction_nature": "NEUTRAL"
        },
        {
          "scene_number": 10,
          "page_number": 5,
          "context_snippet": "YOUNG MUSICIAN\nSomebody said you almost signed to\nMeridian.",
          "on_screen": false,
          "depiction_nature": "NEUTRAL"
        },
        {
          "scene_number": 11,
          "page_number": 5,
          "context_snippet": "INT. MERIDIAN SOUND - CONTROL ROOM - NIGHT\n\n[ACTION]\nRay alone. He pulls up a file.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "Meridian Sound",
      "variants": [
        "Meridian"
      ],
      "extraction_notes": "Fictional company name used as a setting."
    },
    {
      "item_id": "item_ceb693738e73",
      "mention_text": "VALLEY PAWN & LOAN",
      "category": "NAME_COLLISION",
      "occurrences": [
        {
          "scene_number": 1,
          "page_number": 1,
          "context_snippet": "INT. VALLEY PAWN & LOAN - DAY\n\nFluorescent light. Glass cases of dead men's watches.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        },
        {
          "scene_number": 13,
          "page_number": 6,
          "context_snippet": "EXT. VALLEY PAWN & LOAN - DAY\n\n[ACTION]\nMaya at the door before it opens. Desmond lets her in.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        },
        {
          "scene_number": 14,
          "page_number": 6,
          "context_snippet": "INT. VALLEY PAWN & LOAN - CONTINUOUS\n\n[ACTION]\nThe Gibson is still on the wall.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "Valley Pawn & Loan",
      "variants": [],
      "extraction_notes": "Fictional or real business name used as a setting."
    },
    {
      "item_id": "item_4f29daeee2b1",
      "mention_text": "THE GOLDEN BEAR DINER",
      "category": "NAME_COLLISION",
      "occurrences": [
        {
          "scene_number": 3,
          "page_number": 1,
          "context_snippet": "INT. THE GOLDEN BEAR DINER - NIGHT\n\nA counter, eight stools, a jukebox nobody has fed since the",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        },
        {
          "scene_number": 9,
          "page_number": 5,
          "context_snippet": "INT. THE GOLDEN BEAR DINER - NIGHT\n\nSame stool. Different night. Ray is already talking when we",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "The Golden Bear Diner",
      "variants": [],
      "extraction_notes": "Fictional or real restaurant name used as a setting."
    },
    {
      "item_id": "item_ceb6a70b34d4",
      "mention_text": "Gene Austin",
      "category": "REAL_PERSON",
      "occurrences": [
        {
          "scene_number": 3,
          "page_number": 1,
          "context_snippet": "MAYA\nAnd the recording? The one from\n'26. The Gene Austin.",
          "on_screen": false,
          "depiction_nature": "NEUTRAL"
        },
        {
          "scene_number": 12,
          "page_number": 6,
          "context_snippet": "She opens a browser. Types: \"Gene Austin 1926 rights holder.\"\nShe reads for a long time.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "Gene Austin",
      "variants": [],
      "extraction_notes": "Real musical artist mentioned in dialogue."
    },
    {
      "item_id": "item_8558fc24473b",
      "mention_text": "VOSS & ASSOCIATES",
      "category": "NAME_COLLISION",
      "occurrences": [
        {
          "scene_number": 8,
          "page_number": 4,
          "context_snippet": "INT. VOSS & ASSOCIATES - CONFERENCE ROOM - DAY\n\nGlass table. One legal pad.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        },
        {
          "scene_number": 15,
          "page_number": 6,
          "context_snippet": "INT. VOSS & ASSOCIATES - CONFERENCE ROOM - DAY\n\n[ACTION]\nElena reads a single sheet. Sets it down.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "Voss & Associates",
      "variants": [],
      "extraction_notes": "Fictional business name used as a setting."
    },
    {
      "item_id": "item_320649948473",
      "mention_text": "Rolex Submariner",
      "category": "BRAND_TRADEMARK",
      "occurrences": [
        {
          "scene_number": 1,
          "page_number": 1,
          "context_snippet": "He slides a Rolex Submariner across the glass toward her --\nsomeone else's pawn, tagged and forgotten.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "Rolex Submariner",
      "variants": [],
      "extraction_notes": "Branded watch explicitly described as a prop."
    },
    {
      "item_id": "item_74eabfebbb60",
      "mention_text": "Gibson ES-335",
      "category": "BRAND_TRADEMARK",
      "occurrences": [
        {
          "scene_number": 1,
          "page_number": 1,
          "context_snippet": "She opens it. A 1962 Gibson ES-335, cherry red, the finish\nworn through where a thumb has rested for sixty years.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "Gibson ES-335",
      "variants": [],
      "extraction_notes": "Branded guitar explicitly described in action lines."
    },
    {
      "item_id": "item_ab7298e47bca",
      "mention_text": "COCA-COLA",
      "category": "BRAND_TRADEMARK",
      "occurrences": [
        {
          "scene_number": 3,
          "page_number": 1,
          "context_snippet": "Maya sits with a COCA-COLA in a glass bottle, sweating onto a\nnapkin.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "Coca-Cola",
      "variants": [],
      "extraction_notes": "Branded beverage used as a prop."
    },
    {
      "item_id": "item_7999e01c917c",
      "mention_text": "SUNSET BOULEVARD",
      "category": "REAL_LOCATION_BUSINESS",
      "occurrences": [
        {
          "scene_number": 2,
          "page_number": 1,
          "context_snippet": "EXT. SUNSET BOULEVARD - CONTINUOUS\n\nMaya walks east, guitar case knocking against her leg.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "Sunset Boulevard",
      "variants": [],
      "extraction_notes": "Real famous street used as a setting."
    },
    {
      "item_id": "item_c28c010c3064",
      "mention_text": "CHATEAU MARMONT",
      "category": "REAL_LOCATION_BUSINESS",
      "occurrences": [
        {
          "scene_number": 2,
          "page_number": 1,
          "context_snippet": "Traffic\ncrawls. Above her, the CHATEAU MARMONT sits behind its hedge\nlike something that got away with it.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "Chateau Marmont",
      "variants": [],
      "extraction_notes": "Real hotel used as a visual landmark."
    },
    {
      "item_id": "item_0e21e763f3c2",
      "mention_text": "Clinton",
      "category": "REAL_PERSON",
      "occurrences": [
        {
          "scene_number": 3,
          "page_number": 1,
          "context_snippet": "A counter, eight stools, a jukebox nobody has fed since the\nClinton administration.",
          "on_screen": false,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "Bill Clinton",
      "variants": [],
      "extraction_notes": "Reference to a real former US President to denote a time period."
    },
    {
      "item_id": "item_4ac4ea6f6480",
      "mention_text": "\"BYE BYE BLACKBIRD.\"",
      "category": "MUSIC",
      "occurrences": [
        {
          "scene_number": 3,
          "page_number": 1,
          "context_snippet": "RAY\nYou cut \"BYE BYE BLACKBIRD.\" Straight,\nno tricks. Ninety seconds.",
          "on_screen": false,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "Bye Bye Blackbird",
      "variants": [],
      "extraction_notes": "Real song title mentioned in dialogue."
    },
    {
      "item_id": "item_b6d84d21d91e",
      "mention_text": "CAPITOL RECORDS",
      "category": "LOGO_PROP",
      "occurrences": [
        {
          "scene_number": 4,
          "page_number": 2,
          "context_snippet": "On the wall behind reception: a gold record in a frame, the\nCAPITOL RECORDS logo -- the stacked-coin roundel -- clearly\nvisible in the corner of the mat.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "Capitol Records",
      "variants": [],
      "extraction_notes": "Record label logo explicitly described as visible on screen."
    },
    {
      "item_id": "item_2763dcf7f352",
      "mention_text": "FEDEX",
      "category": "LOGO_PROP",
      "occurrences": [
        {
          "scene_number": 4,
          "page_number": 2,
          "context_snippet": "A FEDEX box sits unopened on the reception desk, the purple\nand orange wordmark facing the room.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "FedEx",
      "variants": [],
      "extraction_notes": "Shipping company logo explicitly described as visible on screen."
    },
    {
      "item_id": "item_81a717e2944d",
      "mention_text": "APPLE",
      "category": "LOGO_PROP",
      "occurrences": [
        {
          "scene_number": 4,
          "page_number": 2,
          "context_snippet": "The RECEPTIONIST, 20s, works at a laptop. The illuminated\nAPPLE logo on the lid faces Maya the entire scene.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "Apple Inc.",
      "variants": [],
      "extraction_notes": "Tech company logo explicitly described as visible on screen."
    },
    {
      "item_id": "item_3c88b902b2de",
      "mention_text": "STARBUCKS",
      "category": "LOGO_PROP",
      "occurrences": [
        {
          "scene_number": 4,
          "page_number": 2,
          "context_snippet": "Beside the laptop, a STARBUCKS cup, the green siren logo\nturned outward, going cold.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "Starbucks",
      "variants": [],
      "extraction_notes": "Coffee company logo explicitly described as visible on screen."
    },
    {
      "item_id": "item_0dff9dbcaf39",
      "mention_text": "Penguin",
      "category": "BRAND_TRADEMARK",
      "occurrences": [
        {
          "scene_number": 6,
          "page_number": 3,
          "context_snippet": "One room. A mattress. On the windowsill: a Penguin paperback\nof THE GREAT GATSBY, spine broken, read to death.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "Penguin Books",
      "variants": [],
      "extraction_notes": "Branded book publisher mentioned as a prop."
    },
    {
      "item_id": "item_75ee3491ea73",
      "mention_text": "NEUMANN U 87",
      "category": "BRAND_TRADEMARK",
      "occurrences": [
        {
          "scene_number": 5,
          "page_number": 3,
          "context_snippet": "Cramped. Egg-crate foam gone yellow. A NEUMANN U 87 hangs on\na boom, the only object in the room worth anything.",
          "on_screen": true,
          "depiction_nature": "POSITIVE"
        }
      ],
      "normalized_name": "Neumann U87",
      "variants": [],
      "extraction_notes": "Branded microphone described as 'the only object in the room worth anything'."
    },
    {
      "item_id": "item_cec43d334307",
      "mention_text": "PRO TOOLS",
      "category": "BRAND_TRADEMARK",
      "occurrences": [
        {
          "scene_number": 5,
          "page_number": 3,
          "context_snippet": "Through the glass, an ENGINEER, 20s, watches PRO TOOLS scroll.\nMaya plays.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "Pro Tools",
      "variants": [],
      "extraction_notes": "Branded audio software visible on screen."
    },
    {
      "item_id": "item_97d887b5109a",
      "mention_text": "MARLBORO",
      "category": "BRAND_TRADEMARK",
      "occurrences": [
        {
          "scene_number": 6,
          "page_number": 3,
          "context_snippet": "Maya smokes a MARLBORO out the window, which she quit in\nMarch and has now unquit.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "Marlboro",
      "variants": [],
      "extraction_notes": "Branded cigarette used as a prop."
    },
    {
      "item_id": "item_0a02db79809c",
      "mention_text": "NIKE",
      "category": "BRAND_TRADEMARK",
      "occurrences": [
        {
          "scene_number": 7,
          "page_number": 3,
          "context_snippet": "ELENA VOSS, 50s, sharp, walks the boardwalk in NIKE running\nshoes that have actually been run in.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "Nike",
      "variants": [],
      "extraction_notes": "Branded shoes worn by a character."
    },
    {
      "item_id": "item_ed4fb13eb46a",
      "mention_text": "Meridian Records",
      "category": "REAL_LOCATION_BUSINESS",
      "occurrences": [
        {
          "scene_number": 7,
          "page_number": 3,
          "context_snippet": "ELENA\nThere's a Meridian Records in\nNashville. Forty years old. Owns a\ncatalog.",
          "on_screen": false,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "Meridian Records",
      "variants": [],
      "extraction_notes": "Real business mentioned in dialogue to point out a name collision."
    },
    {
      "item_id": "item_fbbd96ccec77",
      "mention_text": "VENICE BEACH",
      "category": "REAL_LOCATION_BUSINESS",
      "occurrences": [
        {
          "scene_number": 7,
          "page_number": 3,
          "context_snippet": "EXT. VENICE BEACH - BOARDWALK - DAY\n\nTourists. A man selling sunglasses that are not the brand",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "Venice Beach",
      "variants": [],
      "extraction_notes": "Real famous location used as a setting."
    },
    {
      "item_id": "item_edaf252de2d5",
      "mention_text": "THE GREAT GATSBY",
      "category": "PUBLISHED_WORK",
      "occurrences": [
        {
          "scene_number": 6,
          "page_number": 3,
          "context_snippet": "One room. A mattress. On the windowsill: a Penguin paperback\nof THE GREAT GATSBY, spine broken, read to death.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "The Great Gatsby",
      "variants": [],
      "extraction_notes": "Famous novel used as a prop."
    },
    {
      "item_id": "item_e33955bfacfb",
      "mention_text": "THE ECHO PLEX",
      "category": "REAL_LOCATION_BUSINESS",
      "occurrences": [
        {
          "scene_number": 10,
          "page_number": 5,
          "context_snippet": "INT. THE ECHO PLEX - BACKSTAGE - NIGHT\n\n[ACTION]\nAmps. Cable. A poster for a band that broke up.",
          "on_screen": true,
          "depiction_nature": "NEUTRAL"
        }
      ],
      "normalized_name": "The Echoplex",
      "variants": [],
      "extraction_notes": "Real music venue in Los Angeles used as a setting."
    },
    {
      "item_id": "item_7901727b8f1f",
      "mention_text": "JONI MITCHELL",
      "category": "REAL_PERSON",
      "occurrences": [
        {
          "scene_number": 10,
          "page_number": 5,
          "context_snippet": "YOUNG MUSICIAN\nMy whole thing is I want to be, like,\nJONI MITCHELL. But now. Do you know",
          "on_screen": false,
          "depiction_nature": "POSITIVE"
        }
      ],
      "normalized_name": "Joni Mitchell",
      "variants": [],
      "extraction_notes": "Real musician referenced aspirationally in dialogue."
    },
    {
      "item_id": "item_b1d796825054",
      "mention_text": "Gibson",
      "category": "BRAND_TRADEMARK",
      "occurrences": [
        {
          "scene_number": 14,
          "page_number": 6,
          "context_snippet": "[ACTION]\nThe Gibson is still on the wall. He hasn't sold it.\nDesmond takes it down. Doesn't ask for money.",
          "on_screen": true,
          "depiction_nature": "POSITIVE"
        }
      ],
      "normalized_name": "Gibson Brands, Inc.",
      "variants": [],
      "extraction_notes": "Real guitar brand depicted on screen and referred to as 'the right instrument' in subsequent dialogue."
    }
  ],
  "findings": [
    {
      "item_id": "item_4051d7cfe988",
      "tier": "ESCALATE",
      "rationale": "The name \"Meridian Sound\" closely matches Meridian Audio Ltd, a real-world British audio technology company that produces sound systems [ev_c33049849ee7, ev_479c6a767ca3]. The term \"MERIDIAN\" is an active, registered trademark owned by this company [ev_84ad0cc56a8c, ev_837114466d44]. Trademark rights do not expire on a fixed term, meaning the mark remains active [TRADEMARK_NO_EXPIRY]. Because this active trademark appears on screen in multiple scenes, further review is required to assess the context of its use [TRADEMARK_NO_EXPIRY].",
      "claims": [
        {
          "text": "The name \"Meridian Sound\" closely matches Meridian Audio Ltd, a real-world British audio technology company that produces sound systems [ev_c33049849ee7, ev_479c6a767ca3].",
          "evidence_ids": [
            "ev_c33049849ee7",
            "ev_479c6a767ca3"
          ],
          "rule_ids": []
        },
        {
          "text": "The term \"MERIDIAN\" is an active, registered trademark owned by this company [ev_84ad0cc56a8c, ev_837114466d44].",
          "evidence_ids": [
            "ev_84ad0cc56a8c",
            "ev_837114466d44"
          ],
          "rule_ids": []
        },
        {
          "text": "Trademark rights do not expire on a fixed term, meaning the mark remains active [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        },
        {
          "text": "Because this active trademark appears on screen in multiple scenes, further review is required to assess the context of its use [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        }
      ],
      "evidence_ids": [
        "ev_34aa0f1b3486",
        "ev_479c6a767ca3",
        "ev_719cac8d3c52",
        "ev_7e75af0e9178",
        "ev_837114466d44",
        "ev_84ad0cc56a8c",
        "ev_ab07bca03a61",
        "ev_c33049849ee7"
      ],
      "rule_outcomes": [
        {
          "rule_id": "TRADEMARK_NO_EXPIRY",
          "applied_facts": {
            "work_type": "TRADEMARK",
            "jurisdiction": "US",
            "authorship_type": "UNKNOWN",
            "trademark_status": "Active"
          },
          "outcome": "NOT_APPLICABLE",
          "explanation": "Trade mark rights do not expire on a fixed term, so no term arithmetic applies. Registration status on the record: Active. CAVEAT: Duration is not the operative question for a trade mark. Assess whether the on-screen use is nominative, whether it implies endorsement, and whether the depiction is disparaging.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "15 U.S.C. \u00a7\u00a7 1058, 1059 (Lanham Act renewal provisions)",
          "evaluated_at": "2026-09-08T11:19:04.614265Z"
        }
      ],
      "open_questions": [
        "Is the on-screen use of 'Meridian Sound' nominative, or does it imply endorsement by Meridian Audio Ltd?",
        "Does the script's neutral depiction of the brand present any risk of disparagement or consumer confusion?",
        "Can the on-screen text be altered to a fictional brand name to avoid collision with the real-world audio company?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "MERIDIAN AUDIO LIMITED",
      "generated_at": "2026-09-08T11:19:25.916605Z"
    },
    {
      "item_id": "item_ceb693738e73",
      "tier": "ESCALATE",
      "rationale": "Multiple real-world pawn shops operate under the name \"Valley Pawn\" or similar variations, such as \"Sauk Valley Pawn & Loan\" and \"Valley Jewelry & Loan Company\" [ev_1c9526325394, ev_7d1041363d22, ev_94b19641bb64]. The proposed name \"Valley Pawn & Loan\" appears on screen, which implicates trademark considerations [TRADEMARK_NO_EXPIRY]. Although the depiction is neutral, the existence of highly similar businesses in the exact same sector requires further review to assess the risk of consumer confusion [ev_bc9fe70091f0, TRADEMARK_NO_EXPIRY].",
      "claims": [
        {
          "text": "Multiple real-world pawn shops operate under the name \"Valley Pawn\" or similar variations, such as \"Sauk Valley Pawn & Loan\" and \"Valley Jewelry & Loan Company\" [ev_1c9526325394, ev_7d1041363d22, ev_94b19641bb64].",
          "evidence_ids": [
            "ev_1c9526325394",
            "ev_7d1041363d22",
            "ev_94b19641bb64"
          ],
          "rule_ids": []
        },
        {
          "text": "The proposed name \"Valley Pawn & Loan\" appears on screen, which implicates trademark considerations [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        },
        {
          "text": "Although the depiction is neutral, the existence of highly similar businesses in the exact same sector requires further review to assess the risk of consumer confusion [ev_bc9fe70091f0, TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [
            "ev_bc9fe70091f0"
          ],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        }
      ],
      "evidence_ids": [
        "ev_0c95495ca8f0",
        "ev_1c9526325394",
        "ev_5d7c248e275e",
        "ev_7d1041363d22",
        "ev_94b19641bb64",
        "ev_ade4a760edb2",
        "ev_b054ef314a76",
        "ev_bc9fe70091f0"
      ],
      "rule_outcomes": [
        {
          "rule_id": "TRADEMARK_NO_EXPIRY",
          "applied_facts": {
            "work_type": "TRADEMARK",
            "jurisdiction": "US",
            "authorship_type": "UNKNOWN",
            "trademark_status": "null"
          },
          "outcome": "NOT_APPLICABLE",
          "explanation": "Trade mark rights do not expire on a fixed term, so no term arithmetic applies. Registration status on the record: null. CAVEAT: Duration is not the operative question for a trade mark. Assess whether the on-screen use is nominative, whether it implies endorsement, and whether the depiction is disparaging.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "15 U.S.C. \u00a7\u00a7 1058, 1059 (Lanham Act renewal provisions)",
          "evaluated_at": "2026-09-08T11:19:14.787667Z"
        }
      ],
      "open_questions": [
        "Does the on-screen signage or logo for 'Valley Pawn & Loan' resemble the branding of any existing 'Valley Pawn' businesses?",
        "Is the fictional pawn shop located in a geographic area where a real 'Valley Pawn' operates?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "null",
      "generated_at": "2026-09-08T11:19:26.831646Z"
    },
    {
      "item_id": "item_4f29daeee2b1",
      "tier": "ESCALATE",
      "rationale": "The proposed name \"The Golden Bear Diner\" closely matches several real-world restaurants, including an active diner in Florida and a restaurant group in California [ev_ea09aa0ae082, ev_8731fb049f77]. Additionally, the term \"Golden Bear\" is a registered trademark associated with a living person, Jack Nicklaus [ev_1b0f1d89b26d]. Because trademark rights do not expire on a fixed term and the name appears on screen, the registration status and potential for consumer confusion must be evaluated [TRADEMARK_NO_EXPIRY]. While a historical chain by a similar name is defunct, the existence of current businesses requires further review of the on-screen usage [ev_b38844073a2f, TRADEMARK_NO_EXPIRY].",
      "claims": [
        {
          "text": "The proposed name \"The Golden Bear Diner\" closely matches several real-world restaurants, including an active diner in Florida and a restaurant group in California [ev_ea09aa0ae082, ev_8731fb049f77].",
          "evidence_ids": [
            "ev_ea09aa0ae082",
            "ev_8731fb049f77"
          ],
          "rule_ids": []
        },
        {
          "text": "Additionally, the term \"Golden Bear\" is a registered trademark associated with a living person, Jack Nicklaus [ev_1b0f1d89b26d].",
          "evidence_ids": [
            "ev_1b0f1d89b26d"
          ],
          "rule_ids": []
        },
        {
          "text": "Because trademark rights do not expire on a fixed term and the name appears on screen, the registration status and potential for consumer confusion must be evaluated [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        },
        {
          "text": "While a historical chain by a similar name is defunct, the existence of current businesses requires further review of the on-screen usage [ev_b38844073a2f, TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [
            "ev_b38844073a2f"
          ],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        }
      ],
      "evidence_ids": [
        "ev_16f32e053ff2",
        "ev_1b0f1d89b26d",
        "ev_76281707689f",
        "ev_7d73266f6c2a",
        "ev_8731fb049f77",
        "ev_8b2714120ec9",
        "ev_b38844073a2f",
        "ev_ea09aa0ae082"
      ],
      "rule_outcomes": [
        {
          "rule_id": "TRADEMARK_NO_EXPIRY",
          "applied_facts": {
            "work_type": "TRADEMARK",
            "jurisdiction": "US",
            "authorship_type": "UNKNOWN",
            "trademark_status": "UNKNOWN"
          },
          "outcome": "NOT_APPLICABLE",
          "explanation": "Trade mark rights do not expire on a fixed term, so no term arithmetic applies. Registration status on the record: UNKNOWN. CAVEAT: Duration is not the operative question for a trade mark. Assess whether the on-screen use is nominative, whether it implies endorsement, and whether the depiction is disparaging.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "15 U.S.C. \u00a7\u00a7 1058, 1059 (Lanham Act renewal provisions)",
          "evaluated_at": "2026-09-08T11:19:16.526591Z"
        }
      ],
      "open_questions": [
        "Does the on-screen depiction of 'The Golden Bear Diner' in scenes 3 and 9 imply endorsement by or create confusion with the existing Golden Bear Restaurant in Florida or Jack Nicklaus's trademarks?",
        "Is the on-screen use prominent enough to warrant greeking or digital alteration given the active real-world entities?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "GOLDEN BEAR FAMILY RESTAURANTS, INC.",
      "generated_at": "2026-09-08T11:19:34.133593Z"
    },
    {
      "item_id": "item_8558fc24473b",
      "tier": "ESCALATE",
      "rationale": "Multiple active businesses operate under the exact name \"Voss & Associates,\" including firms specializing in education marketing and structural engineering [ev_2e55a534d2dd] [ev_fb2c7f485c26]. Because trademark rights do not expire on a fixed term, the registration and protection status of these various entities' names must be evaluated [TRADEMARK_NO_EXPIRY]. The name appears on screen in the production, requiring further review to determine if the fictional use overlaps with the sectors of the real-world companies [ev_ac171889b52e].",
      "claims": [
        {
          "text": "Multiple active businesses operate under the exact name \"Voss & Associates,\" including firms specializing in education marketing and structural engineering [ev_2e55a534d2dd] [ev_fb2c7f485c26].",
          "evidence_ids": [
            "ev_2e55a534d2dd",
            "ev_fb2c7f485c26"
          ],
          "rule_ids": []
        },
        {
          "text": "Because trademark rights do not expire on a fixed term, the registration and protection status of these various entities' names must be evaluated [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        },
        {
          "text": "The name appears on screen in the production, requiring further review to determine if the fictional use overlaps with the sectors of the real-world companies [ev_ac171889b52e].",
          "evidence_ids": [
            "ev_ac171889b52e"
          ],
          "rule_ids": []
        }
      ],
      "evidence_ids": [
        "ev_041a684dc51e",
        "ev_053dd0377a83",
        "ev_1405649237ae",
        "ev_2e55a534d2dd",
        "ev_ac171889b52e",
        "ev_e8557cf9f6c3",
        "ev_eb0968ead146",
        "ev_fb2c7f485c26"
      ],
      "rule_outcomes": [
        {
          "rule_id": "TRADEMARK_NO_EXPIRY",
          "applied_facts": {
            "work_type": "TRADEMARK",
            "jurisdiction": "US",
            "authorship_type": "UNKNOWN",
            "trademark_status": "UNKNOWN"
          },
          "outcome": "NOT_APPLICABLE",
          "explanation": "Trade mark rights do not expire on a fixed term, so no term arithmetic applies. Registration status on the record: UNKNOWN. CAVEAT: Duration is not the operative question for a trade mark. Assess whether the on-screen use is nominative, whether it implies endorsement, and whether the depiction is disparaging.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "15 U.S.C. \u00a7\u00a7 1058, 1059 (Lanham Act renewal provisions)",
          "evaluated_at": "2026-09-08T11:19:14.688803Z"
        }
      ],
      "open_questions": [
        "What is the specific business sector or context of the fictional 'Voss & Associates' depicted in the script?",
        "Does the on-screen depiction visually resemble the branding or logos of any of the real-world entities?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "UNKNOWN",
      "generated_at": "2026-09-08T11:19:35.125494Z"
    },
    {
      "item_id": "item_c28c010c3064",
      "tier": "ESCALATE",
      "rationale": "The Chateau Marmont is a real hotel currently owned by Andr\u00e9 Balazs, and its name is an actively registered trademark owned by Group 99, LLC [ev_2b35279fc768, ev_c9feb5eee135, ev_e4620e565ec9]. Because trademark rights do not expire on a fixed term, the rule outcome indicates that term arithmetic is not applicable to this registered mark [TRADEMARK_NO_EXPIRY]. Since the active trademark appears on screen, this item requires escalation to assess whether the use is nominative, implies endorsement, or is disparaging [TRADEMARK_NO_EXPIRY].",
      "claims": [
        {
          "text": "The Chateau Marmont is a real hotel currently owned by Andr\u00e9 Balazs, and its name is an actively registered trademark owned by Group 99, LLC [ev_2b35279fc768, ev_c9feb5eee135, ev_e4620e565ec9].",
          "evidence_ids": [
            "ev_2b35279fc768",
            "ev_c9feb5eee135",
            "ev_e4620e565ec9"
          ],
          "rule_ids": []
        },
        {
          "text": "Because trademark rights do not expire on a fixed term, the rule outcome indicates that term arithmetic is not applicable to this registered mark [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        },
        {
          "text": "Since the active trademark appears on screen, this item requires escalation to assess whether the use is nominative, implies endorsement, or is disparaging [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        }
      ],
      "evidence_ids": [
        "ev_2b35279fc768",
        "ev_37752c018cf0",
        "ev_38f4be96839b",
        "ev_851fddca7185",
        "ev_9c12642b68bf",
        "ev_c9feb5eee135",
        "ev_e2d41eaba528",
        "ev_e4620e565ec9"
      ],
      "rule_outcomes": [
        {
          "rule_id": "TRADEMARK_NO_EXPIRY",
          "applied_facts": {
            "work_type": "TRADEMARK",
            "jurisdiction": "US",
            "authorship_type": "UNKNOWN",
            "trademark_status": "Registered"
          },
          "outcome": "NOT_APPLICABLE",
          "explanation": "Trade mark rights do not expire on a fixed term, so no term arithmetic applies. Registration status on the record: Registered. CAVEAT: Duration is not the operative question for a trade mark. Assess whether the on-screen use is nominative, whether it implies endorsement, and whether the depiction is disparaging.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "15 U.S.C. \u00a7\u00a7 1058, 1059 (Lanham Act renewal provisions)",
          "evaluated_at": "2026-09-08T11:19:47.024013Z"
        }
      ],
      "open_questions": [
        "Does the on-screen depiction of the Chateau Marmont imply endorsement or sponsorship by the trademark owner?",
        "Is a location release or filming permit required for the on-screen appearance of the hotel?",
        "Does the visual depiction of the hotel implicate any protected trade dress?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "Group 99, LLC",
      "generated_at": "2026-09-08T11:20:06.180243Z"
    },
    {
      "item_id": "item_0e21e763f3c2",
      "tier": "ESCALATE",
      "rationale": "Biographical sources establish that former U.S. President Bill Clinton was born in 1946 and is currently living [ev_fb45c813ebd2, ev_fa01acc14f2d]. Because the individual is alive, the right of publicity subsists in full [US_PUBLICITY_POSTMORTEM]. The right of publicity is governed by state law, which protects the identity of living persons [ev_51e531f7931f, US_PUBLICITY_POSTMORTEM].",
      "claims": [
        {
          "text": "Biographical sources establish that former U.S. President Bill Clinton was born in 1946 and is currently living [ev_fb45c813ebd2, ev_fa01acc14f2d].",
          "evidence_ids": [
            "ev_fb45c813ebd2",
            "ev_fa01acc14f2d"
          ],
          "rule_ids": []
        },
        {
          "text": "Because the individual is alive, the right of publicity subsists in full [US_PUBLICITY_POSTMORTEM].",
          "evidence_ids": [],
          "rule_ids": [
            "US_PUBLICITY_POSTMORTEM"
          ]
        },
        {
          "text": "The right of publicity is governed by state law, which protects the identity of living persons [ev_51e531f7931f, US_PUBLICITY_POSTMORTEM].",
          "evidence_ids": [
            "ev_51e531f7931f"
          ],
          "rule_ids": [
            "US_PUBLICITY_POSTMORTEM"
          ]
        }
      ],
      "evidence_ids": [
        "ev_3ea67e06becb",
        "ev_51e531f7931f",
        "ev_54b2db4c6022",
        "ev_7e128396ecf9",
        "ev_b89f61162cdb",
        "ev_f9a6076a6661",
        "ev_fa01acc14f2d",
        "ev_fb45c813ebd2"
      ],
      "rule_outcomes": [
        {
          "rule_id": "US_PUBLICITY_POSTMORTEM",
          "applied_facts": {
            "work_type": "PERSONA",
            "jurisdiction": "US",
            "authorship_type": "UNKNOWN",
            "is_person_living": true,
            "trademark_status": "UNKNOWN"
          },
          "outcome": "RIGHT_SUBSISTS",
          "explanation": "The individual is living, so the right of publicity subsists in full. No post-mortem term calculation applies. CAVEAT: Post-mortem duration varies from zero to 100 years by state and depends on domicile at death. Where domicile is unknown the outcome is INSUFFICIENT_FACTS; confirm domicile before relying on any term.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "State law; e.g. Cal. Civ. Code \u00a7 3344.1; N.Y. Civ. Rights Law \u00a7 50-f",
          "evaluated_at": "2026-09-08T11:19:47.332680Z"
        }
      ],
      "open_questions": [
        "Does the off-screen, neutral mention of this living individual require a release?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "UNKNOWN",
      "generated_at": "2026-09-08T11:20:06.383080Z"
    },
    {
      "item_id": "item_4ac4ea6f6480",
      "tier": "ESCALATE",
      "rationale": "The musical composition for \"Bye Bye Blackbird\" was written by Ray Henderson and Mort Dixon and published in 1926 [ev_b536f14a3852, ev_dffbc80fdb99]. Because it was published before 1978, the composition has entered the public domain, assuming its copyright was properly renewed [US_PUB_PRE_1978_95_YEARS]. However, the earliest sound recordings of the track also date to 1926 [ev_16854cdd30c6, ev_74bccb251fab]. Under the Music Modernization Act, a 1926 sound recording remains protected by copyright until 2027 [US_SOUND_RECORDING_MMA].",
      "claims": [
        {
          "text": "The musical composition for \"Bye Bye Blackbird\" was written by Ray Henderson and Mort Dixon and published in 1926 [ev_b536f14a3852, ev_dffbc80fdb99].",
          "evidence_ids": [
            "ev_b536f14a3852",
            "ev_dffbc80fdb99"
          ],
          "rule_ids": []
        },
        {
          "text": "Because it was published before 1978, the composition has entered the public domain, assuming its copyright was properly renewed [US_PUB_PRE_1978_95_YEARS].",
          "evidence_ids": [],
          "rule_ids": [
            "US_PUB_PRE_1978_95_YEARS"
          ]
        },
        {
          "text": "However, the earliest sound recordings of the track also date to 1926 [ev_16854cdd30c6, ev_74bccb251fab].",
          "evidence_ids": [
            "ev_16854cdd30c6",
            "ev_74bccb251fab"
          ],
          "rule_ids": []
        },
        {
          "text": "Under the Music Modernization Act, a 1926 sound recording remains protected by copyright until 2027 [US_SOUND_RECORDING_MMA].",
          "evidence_ids": [],
          "rule_ids": [
            "US_SOUND_RECORDING_MMA"
          ]
        }
      ],
      "evidence_ids": [
        "ev_16854cdd30c6",
        "ev_1a82bbe91f0c",
        "ev_212453f70202",
        "ev_4653b97db03f",
        "ev_559b8ef1eae3",
        "ev_5787d1b719f6",
        "ev_5baada63b1fa",
        "ev_74bccb251fab",
        "ev_7a6ecb951e33",
        "ev_a85df1967764",
        "ev_b536f14a3852",
        "ev_dffbc80fdb99",
        "ev_e18e96b922ef",
        "ev_e44691becb4b",
        "ev_fbd72be5b058",
        "ev_fd76428441b8"
      ],
      "rule_outcomes": [
        {
          "rule_id": "US_PUB_PRE_1978_95_YEARS",
          "applied_facts": {
            "work_type": "MUSICAL_COMPOSITION",
            "jurisdiction": "US",
            "publication_year": 1926,
            "creation_year": 1926,
            "authorship_type": "UNKNOWN",
            "trademark_status": "null"
          },
          "outcome": "PUBLIC_DOMAIN",
          "explanation": "Work published before 1978, so the 95-year publication term applies rather than a life-based term. First published 1926 + 95 year term = protection through 31 December 2021; the work enters the public domain on 1 January 2022. Evaluated as of 2026: the term has expired. CAVEAT: Works first published in the US between 1930 and 1963 required renewal in the 28th year. A substantial share were never renewed and are already in the public domain. This rule assumes renewal; confirm renewal status in the Copyright Office records before relying on an IN_COPYRIGHT outcome.",
          "missing_facts": [],
          "public_domain_year": 2022,
          "citation": "17 U.S.C. \u00a7 304(b); Sonny Bono Copyright Term Extension Act, Pub. L. 105-298",
          "evaluated_at": "2026-09-08T11:20:06.279392Z"
        },
        {
          "rule_id": "US_SOUND_RECORDING_MMA",
          "applied_facts": {
            "work_type": "SOUND_RECORDING",
            "jurisdiction": "US",
            "publication_year": 1926,
            "creation_year": 1926,
            "authorship_type": "UNKNOWN",
            "trademark_status": "null"
          },
          "outcome": "IN_COPYRIGHT",
          "explanation": "Applying the Classics Protection and Access Act schedule: Sound recording first published 1926 + 100 year term = protection through 31 December 2026; the work enters the public domain on 1 January 2027. Evaluated as of 2026: the term has not expired. CAVEAT: A public-domain sound recording does not imply a public-domain musical composition. The composition must be evaluated separately.",
          "missing_facts": [],
          "public_domain_year": 2027,
          "citation": "Music Modernization Act, Title II (Classics Protection and Access Act), 17 U.S.C. \u00a7 1401",
          "evaluated_at": "2026-09-08T11:20:06.279470Z"
        }
      ],
      "open_questions": [
        "Which specific sound recording of 'Bye Bye Blackbird' is being used in the scene?",
        "Was the copyright for the 1926 musical composition properly renewed?",
        "Who owns the master rights for the specific sound recording being used?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "Ray Henderson Music Co., Inc. and Bughouse Music o/b/o Olde Clover Leaf Music",
      "generated_at": "2026-09-08T11:20:20.881471Z"
    },
    {
      "item_id": "item_75ee3491ea73",
      "tier": "ESCALATE",
      "rationale": "The Neumann U87 is a studio microphone produced by Georg Neumann GmbH, and the \"NEUMANN\" mark is currently registered and live [ev_03d9e5fc4f52, ev_740673302798]. Trademark rights do not expire on a fixed term, so standard term arithmetic does not apply to this asset [TRADEMARK_NO_EXPIRY]. Because this is an active trademark appearing on screen, the item requires escalation to assess whether the positive depiction implies endorsement or qualifies as nominative use [TRADEMARK_NO_EXPIRY, ev_4abdea8e40e2].",
      "claims": [
        {
          "text": "The Neumann U87 is a studio microphone produced by Georg Neumann GmbH, and the \"NEUMANN\" mark is currently registered and live [ev_03d9e5fc4f52, ev_740673302798].",
          "evidence_ids": [
            "ev_03d9e5fc4f52",
            "ev_740673302798"
          ],
          "rule_ids": []
        },
        {
          "text": "Trademark rights do not expire on a fixed term, so standard term arithmetic does not apply to this asset [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        },
        {
          "text": "Because this is an active trademark appearing on screen, the item requires escalation to assess whether the positive depiction implies endorsement or qualifies as nominative use [TRADEMARK_NO_EXPIRY, ev_4abdea8e40e2].",
          "evidence_ids": [
            "ev_4abdea8e40e2"
          ],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        }
      ],
      "evidence_ids": [
        "ev_03d9e5fc4f52",
        "ev_4abdea8e40e2",
        "ev_543da2a42553",
        "ev_5e8673754003",
        "ev_740673302798",
        "ev_ca3cf668b74e",
        "ev_eb6bcd477691",
        "ev_f8f542f5c1cc"
      ],
      "rule_outcomes": [
        {
          "rule_id": "TRADEMARK_NO_EXPIRY",
          "applied_facts": {
            "work_type": "TRADEMARK",
            "jurisdiction": "US",
            "authorship_type": "UNKNOWN",
            "trademark_status": "REGISTERED"
          },
          "outcome": "NOT_APPLICABLE",
          "explanation": "Trade mark rights do not expire on a fixed term, so no term arithmetic applies. Registration status on the record: REGISTERED. CAVEAT: Duration is not the operative question for a trade mark. Assess whether the on-screen use is nominative, whether it implies endorsement, and whether the depiction is disparaging.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "15 U.S.C. \u00a7\u00a7 1058, 1059 (Lanham Act renewal provisions)",
          "evaluated_at": "2026-09-08T11:20:43.029698Z"
        }
      ],
      "open_questions": [
        "Does the on-screen depiction of the Neumann U87 microphone imply endorsement by Georg Neumann GmbH?",
        "Is the use of the microphone in scene 5 purely nominative?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "Georg Neumann GmbH",
      "generated_at": "2026-09-08T11:21:09.391180Z"
    },
    {
      "item_id": "item_fbbd96ccec77",
      "tier": "ESCALATE",
      "rationale": "Filming at Venice Beach requires permits from entities such as FilmLA, the Venice Beach Recreation Center, and the Los Angeles Department of Beaches and Harbors [ev_6e30724d887c, ev_f6a20db5dbe5, ev_89b3633f9211]. The famous \"VENICE\" sign is a federally registered trademark owned by the Venice Chamber of Commerce [ev_7564707128c4, ev_ead7d1212f9d]. Because trademark rights do not expire on a set schedule, the active status of this mark requires an assessment of whether its on-screen appearance implies endorsement [TRADEMARK_NO_EXPIRY]. A separate trademark for \"VENICE BEACH\" exists for apparel, which should be noted if any branded clothing appears in the scene [ev_7cb4dcfd7417].",
      "claims": [
        {
          "text": "Filming at Venice Beach requires permits from entities such as FilmLA, the Venice Beach Recreation Center, and the Los Angeles Department of Beaches and Harbors [ev_6e30724d887c, ev_f6a20db5dbe5, ev_89b3633f9211].",
          "evidence_ids": [
            "ev_6e30724d887c",
            "ev_f6a20db5dbe5",
            "ev_89b3633f9211"
          ],
          "rule_ids": []
        },
        {
          "text": "The famous \"VENICE\" sign is a federally registered trademark owned by the Venice Chamber of Commerce [ev_7564707128c4, ev_ead7d1212f9d].",
          "evidence_ids": [
            "ev_7564707128c4",
            "ev_ead7d1212f9d"
          ],
          "rule_ids": []
        },
        {
          "text": "Because trademark rights do not expire on a set schedule, the active status of this mark requires an assessment of whether its on-screen appearance implies endorsement [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        },
        {
          "text": "A separate trademark for \"VENICE BEACH\" exists for apparel, which should be noted if any branded clothing appears in the scene [ev_7cb4dcfd7417].",
          "evidence_ids": [
            "ev_7cb4dcfd7417"
          ],
          "rule_ids": []
        }
      ],
      "evidence_ids": [
        "ev_56889c8c452c",
        "ev_6e30724d887c",
        "ev_7564707128c4",
        "ev_7cb4dcfd7417",
        "ev_89b3633f9211",
        "ev_b40c749f9857",
        "ev_ead7d1212f9d",
        "ev_f6a20db5dbe5"
      ],
      "rule_outcomes": [
        {
          "rule_id": "TRADEMARK_NO_EXPIRY",
          "applied_facts": {
            "work_type": "TRADEMARK",
            "jurisdiction": "US",
            "authorship_type": "UNKNOWN",
            "trademark_status": "Registered"
          },
          "outcome": "NOT_APPLICABLE",
          "explanation": "Trade mark rights do not expire on a fixed term, so no term arithmetic applies. Registration status on the record: Registered. CAVEAT: Duration is not the operative question for a trade mark. Assess whether the on-screen use is nominative, whether it implies endorsement, and whether the depiction is disparaging.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "15 U.S.C. \u00a7\u00a7 1058, 1059 (Lanham Act renewal provisions)",
          "evaluated_at": "2026-09-08T11:21:25.022573Z"
        }
      ],
      "open_questions": [
        "Does the on-screen depiction of Venice Beach include the trademarked 'VENICE' sign?",
        "Has the production secured the necessary location filming permits from the relevant Los Angeles city and county departments?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "SCORETEX GmbH and Venice Chamber of Commerce Corporation",
      "generated_at": "2026-09-08T11:21:47.073503Z"
    },
    {
      "item_id": "item_e33955bfacfb",
      "tier": "ESCALATE",
      "rationale": "The Echoplex is a real live music venue in Los Angeles that was acquired by Live Nation Entertainment in 2019 [ev_b97feeda7896, ev_1113a2b99c29, ev_4e86828456df]. The name \"ECHOPLEX\" is currently a live and registered trademark [ev_15b0e50c78db, TRADEMARK_NO_EXPIRY]. Because an active trademark appears on screen, this item requires escalation to evaluate potential trade dress or trademark exposure [TRADEMARK_NO_EXPIRY, ev_28722a7c11a7]. Additionally, filming at or depicting the physical location typically involves securing a location release or film permit [ev_a865fe96590d, ev_b4ce7c072d67].",
      "claims": [
        {
          "text": "The Echoplex is a real live music venue in Los Angeles that was acquired by Live Nation Entertainment in 2019 [ev_b97feeda7896, ev_1113a2b99c29, ev_4e86828456df].",
          "evidence_ids": [
            "ev_b97feeda7896",
            "ev_1113a2b99c29",
            "ev_4e86828456df"
          ],
          "rule_ids": []
        },
        {
          "text": "The name \"ECHOPLEX\" is currently a live and registered trademark [ev_15b0e50c78db, TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [
            "ev_15b0e50c78db"
          ],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        },
        {
          "text": "Because an active trademark appears on screen, this item requires escalation to evaluate potential trade dress or trademark exposure [TRADEMARK_NO_EXPIRY, ev_28722a7c11a7].",
          "evidence_ids": [
            "ev_28722a7c11a7"
          ],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        },
        {
          "text": "Additionally, filming at or depicting the physical location typically involves securing a location release or film permit [ev_a865fe96590d, ev_b4ce7c072d67].",
          "evidence_ids": [
            "ev_a865fe96590d",
            "ev_b4ce7c072d67"
          ],
          "rule_ids": []
        }
      ],
      "evidence_ids": [
        "ev_1113a2b99c29",
        "ev_15b0e50c78db",
        "ev_28722a7c11a7",
        "ev_4e86828456df",
        "ev_a865fe96590d",
        "ev_b4ce7c072d67",
        "ev_b97feeda7896",
        "ev_c09bd782490e"
      ],
      "rule_outcomes": [
        {
          "rule_id": "TRADEMARK_NO_EXPIRY",
          "applied_facts": {
            "work_type": "TRADEMARK",
            "jurisdiction": "US",
            "authorship_type": "UNKNOWN",
            "trademark_status": "Live/Registered"
          },
          "outcome": "NOT_APPLICABLE",
          "explanation": "Trade mark rights do not expire on a fixed term, so no term arithmetic applies. Registration status on the record: Live/Registered. CAVEAT: Duration is not the operative question for a trade mark. Assess whether the on-screen use is nominative, whether it implies endorsement, and whether the depiction is disparaging.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "15 U.S.C. \u00a7\u00a7 1058, 1059 (Lanham Act renewal provisions)",
          "evaluated_at": "2026-09-08T11:21:28.408367Z"
        }
      ],
      "open_questions": [
        "Does the on-screen depiction of The Echoplex include any protected trade dress, signage, or logos?",
        "Is the use of the venue's name purely nominative, or does the context imply endorsement by Live Nation?",
        "Has production secured a location agreement or appropriate permit for the use of the venue?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "Live Nation Entertainment",
      "generated_at": "2026-09-08T11:21:42.018735Z"
    },
    {
      "item_id": "item_7901727b8f1f",
      "tier": "ESCALATE",
      "rationale": "Sources confirm that musician Joni Mitchell is a living individual [ev_f25684b61d30, ev_1d1923f39727]. Because she is alive, her right of publicity currently subsists in full [US_PUBLICITY_POSTMORTEM]. Although she is only mentioned off-screen in a positive context, the reviewer must evaluate whether this script reference requires further action [US_PUBLICITY_POSTMORTEM].",
      "claims": [
        {
          "text": "Sources confirm that musician Joni Mitchell is a living individual [ev_f25684b61d30, ev_1d1923f39727].",
          "evidence_ids": [
            "ev_f25684b61d30",
            "ev_1d1923f39727"
          ],
          "rule_ids": []
        },
        {
          "text": "Because she is alive, her right of publicity currently subsists in full [US_PUBLICITY_POSTMORTEM].",
          "evidence_ids": [],
          "rule_ids": [
            "US_PUBLICITY_POSTMORTEM"
          ]
        },
        {
          "text": "Although she is only mentioned off-screen in a positive context, the reviewer must evaluate whether this script reference requires further action [US_PUBLICITY_POSTMORTEM].",
          "evidence_ids": [],
          "rule_ids": [
            "US_PUBLICITY_POSTMORTEM"
          ]
        }
      ],
      "evidence_ids": [
        "ev_1d1923f39727",
        "ev_1fd1cc1576b0",
        "ev_29c8e2bb8862",
        "ev_76f2789bddbd",
        "ev_96fd067a5c24",
        "ev_adf239dc4003",
        "ev_d93819cd81b7",
        "ev_f25684b61d30"
      ],
      "rule_outcomes": [
        {
          "rule_id": "US_PUBLICITY_POSTMORTEM",
          "applied_facts": {
            "work_type": "PERSONA",
            "jurisdiction": "US",
            "authorship_type": "UNKNOWN",
            "is_person_living": true,
            "trademark_status": "null"
          },
          "outcome": "RIGHT_SUBSISTS",
          "explanation": "The individual is living, so the right of publicity subsists in full. No post-mortem term calculation applies. CAVEAT: Post-mortem duration varies from zero to 100 years by state and depends on domicile at death. Where domicile is unknown the outcome is INSUFFICIENT_FACTS; confirm domicile before relying on any term.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "State law; e.g. Cal. Civ. Code \u00a7 3344.1; N.Y. Civ. Rights Law \u00a7 50-f",
          "evaluated_at": "2026-09-08T11:21:31.524294Z"
        }
      ],
      "open_questions": [
        "Does the positive, off-screen mention of Joni Mitchell require any further action given her active right of publicity?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "null",
      "generated_at": "2026-09-08T11:21:52.468230Z"
    },
    {
      "item_id": "item_b1d796825054",
      "tier": "ESCALATE",
      "rationale": "Gibson Brands, Inc. holds multiple active trademark registrations for its brand name and guitar designs [ev_8296419488ca, ev_cb92229172af]. Because trademark rights do not expire on a fixed term and the marks remain actively registered, standard term arithmetic does not apply [TRADEMARK_NO_EXPIRY]. The brand is slated to appear on screen in a positive context during scene 14, requiring further review of the specific usage [TRADEMARK_NO_EXPIRY].",
      "claims": [
        {
          "text": "Gibson Brands, Inc. holds multiple active trademark registrations for its brand name and guitar designs [ev_8296419488ca, ev_cb92229172af].",
          "evidence_ids": [
            "ev_8296419488ca",
            "ev_cb92229172af"
          ],
          "rule_ids": []
        },
        {
          "text": "Because trademark rights do not expire on a fixed term and the marks remain actively registered, standard term arithmetic does not apply [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        },
        {
          "text": "The brand is slated to appear on screen in a positive context during scene 14, requiring further review of the specific usage [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        }
      ],
      "evidence_ids": [
        "ev_3669b7c8be52",
        "ev_52571de87657",
        "ev_8296419488ca",
        "ev_9f93503bf7cb",
        "ev_cb92229172af",
        "ev_d021b1d50374",
        "ev_e71edf32d283",
        "ev_fc04d0262bd2"
      ],
      "rule_outcomes": [
        {
          "rule_id": "TRADEMARK_NO_EXPIRY",
          "applied_facts": {
            "work_type": "TRADEMARK",
            "jurisdiction": "US",
            "authorship_type": "UNKNOWN",
            "trademark_status": "Registered"
          },
          "outcome": "NOT_APPLICABLE",
          "explanation": "Trade mark rights do not expire on a fixed term, so no term arithmetic applies. Registration status on the record: Registered. CAVEAT: Duration is not the operative question for a trade mark. Assess whether the on-screen use is nominative, whether it implies endorsement, and whether the depiction is disparaging.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "15 U.S.C. \u00a7\u00a7 1058, 1059 (Lanham Act renewal provisions)",
          "evaluated_at": "2026-09-08T11:21:52.062490Z"
        }
      ],
      "open_questions": [
        "Does the on-screen depiction of the Gibson brand imply endorsement or sponsorship by Gibson Brands, Inc.?",
        "Is the use of the trademark purely nominative within the context of scene 14?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "Gibson Brands, Inc.",
      "generated_at": "2026-09-08T11:22:04.548191Z"
    },
    {
      "item_id": "item_ceb6a70b34d4",
      "tier": "NEEDS_VERIFICATION",
      "rationale": "The sources indicate that the singer and songwriter Gene Austin died on January 24, 1972 [ev_bdac6887fcc8, ev_f9223125a450]. The post-mortem right of publicity analysis could not be completed because the subject's domicile state at death is missing [US_PUBLICITY_POSTMORTEM]. Additional obituaries found in the search results belong to other individuals with the same name [ev_daa708038656, ev_a666ca4ebdb3, ev_66a9773d0d55].",
      "claims": [
        {
          "text": "The sources indicate that the singer and songwriter Gene Austin died on January 24, 1972 [ev_bdac6887fcc8, ev_f9223125a450].",
          "evidence_ids": [
            "ev_bdac6887fcc8",
            "ev_f9223125a450"
          ],
          "rule_ids": []
        },
        {
          "text": "The post-mortem right of publicity analysis could not be completed because the subject's domicile state at death is missing [US_PUBLICITY_POSTMORTEM].",
          "evidence_ids": [],
          "rule_ids": [
            "US_PUBLICITY_POSTMORTEM"
          ]
        },
        {
          "text": "Additional obituaries found in the search results belong to other individuals with the same name [ev_daa708038656, ev_a666ca4ebdb3, ev_66a9773d0d55].",
          "evidence_ids": [
            "ev_daa708038656",
            "ev_a666ca4ebdb3",
            "ev_66a9773d0d55"
          ],
          "rule_ids": []
        }
      ],
      "evidence_ids": [
        "ev_0dcdee7c9e35",
        "ev_66a9773d0d55",
        "ev_a666ca4ebdb3",
        "ev_bdac6887fcc8",
        "ev_d7e087b965bf",
        "ev_daa708038656",
        "ev_f9223125a450",
        "ev_fde3361a1f3d"
      ],
      "rule_outcomes": [
        {
          "rule_id": "US_PUBLICITY_POSTMORTEM",
          "applied_facts": {
            "work_type": "PERSONA",
            "jurisdiction": "US",
            "authorship_type": "UNKNOWN",
            "is_person_living": false,
            "person_death_year": 1972,
            "trademark_status": "UNKNOWN"
          },
          "outcome": "INSUFFICIENT_FACTS",
          "explanation": "Cannot apply US_PUBLICITY_POSTMORTEM: required fact(s) not established by sourced evidence: domicile_state_at_death. No term has been calculated and no assumption has been substituted. There is no federal US right of publicity. Post-mortem duration is set by the state of domicile at death and ranges widely (CA=70yr, NY=40yr, IN_STATE_INDIANA=100yr, TN=10yr, TX=50yr), with some states recognising no post-mortem right at all. Domicile was not established by sourced evidence, so no term has been calculated.",
          "missing_facts": [
            "domicile_state_at_death"
          ],
          "public_domain_year": null,
          "citation": "State law; e.g. Cal. Civ. Code \u00a7 3344.1; N.Y. Civ. Rights Law \u00a7 50-f",
          "evaluated_at": "2026-09-08T11:19:10.670735Z"
        }
      ],
      "open_questions": [
        "In which US state was Gene Austin domiciled at the time of his death in 1972?",
        "Who is the current administrator or rights holder for Gene Austin's estate?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "UNKNOWN",
      "generated_at": "2026-09-08T11:19:34.656370Z"
    },
    {
      "item_id": "item_320649948473",
      "tier": "NEEDS_VERIFICATION",
      "rationale": "The sources confirm that \"SUBMARINER\" and \"ROLEX\" are active, registered trademarks owned by Rolex Watch U.S.A., Inc. for jewelry and watches [ev_da04c1380dd1, ev_c463af5c1ccb, ev_06febfc44f34]. Because trademark rights do not expire on a fixed term and the marks are registered and renewed, the standard term arithmetic does not apply [TRADEMARK_NO_EXPIRY]. Since the active trademark appears on screen in a neutral depiction, further review is needed to assess whether the use is nominative or implies endorsement [TRADEMARK_NO_EXPIRY].",
      "claims": [
        {
          "text": "The sources confirm that \"SUBMARINER\" and \"ROLEX\" are active, registered trademarks owned by Rolex Watch U.S.A., Inc. for jewelry and watches [ev_da04c1380dd1, ev_c463af5c1ccb, ev_06febfc44f34].",
          "evidence_ids": [
            "ev_da04c1380dd1",
            "ev_c463af5c1ccb",
            "ev_06febfc44f34"
          ],
          "rule_ids": []
        },
        {
          "text": "Because trademark rights do not expire on a fixed term and the marks are registered and renewed, the standard term arithmetic does not apply [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        },
        {
          "text": "Since the active trademark appears on screen in a neutral depiction, further review is needed to assess whether the use is nominative or implies endorsement [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        }
      ],
      "evidence_ids": [
        "ev_06febfc44f34",
        "ev_586d8f5c276a",
        "ev_6079744b37f3",
        "ev_6913bb163985",
        "ev_af6927b940ef",
        "ev_bc11d50387c6",
        "ev_c463af5c1ccb",
        "ev_da04c1380dd1"
      ],
      "rule_outcomes": [
        {
          "rule_id": "TRADEMARK_NO_EXPIRY",
          "applied_facts": {
            "work_type": "TRADEMARK",
            "jurisdiction": "US",
            "authorship_type": "UNKNOWN",
            "trademark_status": "Registered And Renewed"
          },
          "outcome": "NOT_APPLICABLE",
          "explanation": "Trade mark rights do not expire on a fixed term, so no term arithmetic applies. Registration status on the record: Registered And Renewed. CAVEAT: Duration is not the operative question for a trade mark. Assess whether the on-screen use is nominative, whether it implies endorsement, and whether the depiction is disparaging.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "15 U.S.C. \u00a7\u00a7 1058, 1059 (Lanham Act renewal provisions)",
          "evaluated_at": "2026-09-08T11:19:17.432605Z"
        }
      ],
      "open_questions": [
        "Is the on-screen use of the Rolex Submariner purely nominative?",
        "Does the depiction of the watch imply any endorsement or sponsorship by Rolex?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "Rolex Watch U.S.A., Inc.",
      "generated_at": "2026-09-08T11:19:30.440657Z"
    },
    {
      "item_id": "item_74eabfebbb60",
      "tier": "NEEDS_VERIFICATION",
      "rationale": "The Gibson ES-335 guitar and its distinctive body shape are protected by active trademarks owned by Gibson Brands, Inc. [ev_38e596a96a9a, ev_2179a05a38b9]. Trademark rights do not expire on a fixed term, meaning the registration remains active and term arithmetic is not applicable [TRADEMARK_NO_EXPIRY]. Because an active trademark appears on screen, this item is escalated for further review to evaluate the nature of the depiction [TRADEMARK_NO_EXPIRY].",
      "claims": [
        {
          "text": "The Gibson ES-335 guitar and its distinctive body shape are protected by active trademarks owned by Gibson Brands, Inc. [ev_38e596a96a9a, ev_2179a05a38b9].",
          "evidence_ids": [
            "ev_38e596a96a9a",
            "ev_2179a05a38b9"
          ],
          "rule_ids": []
        },
        {
          "text": "Trademark rights do not expire on a fixed term, meaning the registration remains active and term arithmetic is not applicable [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        },
        {
          "text": "Because an active trademark appears on screen, this item is escalated for further review to evaluate the nature of the depiction [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        }
      ],
      "evidence_ids": [
        "ev_2179a05a38b9",
        "ev_38e596a96a9a",
        "ev_39a0a8f3028c",
        "ev_793556b1afb0",
        "ev_9703537b4d05",
        "ev_9772ff056239",
        "ev_9e343d542d92",
        "ev_b92fc54bd7f2"
      ],
      "rule_outcomes": [
        {
          "rule_id": "TRADEMARK_NO_EXPIRY",
          "applied_facts": {
            "work_type": "TRADEMARK",
            "jurisdiction": "US",
            "creation_year": 1958,
            "authorship_type": "CORPORATE",
            "trademark_status": "Active"
          },
          "outcome": "NOT_APPLICABLE",
          "explanation": "Trade mark rights do not expire on a fixed term, so no term arithmetic applies. Registration status on the record: Active. CAVEAT: Duration is not the operative question for a trade mark. Assess whether the on-screen use is nominative, whether it implies endorsement, and whether the depiction is disparaging.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "15 U.S.C. \u00a7\u00a7 1058, 1059 (Lanham Act renewal provisions)",
          "evaluated_at": "2026-09-08T11:19:45.048615Z"
        }
      ],
      "open_questions": [
        "Is the on-screen use of the Gibson ES-335 nominative, or does it imply endorsement by the trademark owner?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "Gibson Brands, Inc.",
      "generated_at": "2026-09-08T11:19:56.246806Z"
    },
    {
      "item_id": "item_ab7298e47bca",
      "tier": "NEEDS_VERIFICATION",
      "rationale": "The Coca-Cola Company holds multiple active trademark registrations for the \"Coca-Cola\" mark across various classes, including beverages [ev_fc93b5f61002, ev_cd99a151f6a8]. Trademark rights do not expire on a fixed term, and the mark remains actively registered [TRADEMARK_NO_EXPIRY]. Because this active trademark appears on screen, the item requires further review to assess the nature of the depiction [TRADEMARK_NO_EXPIRY].",
      "claims": [
        {
          "text": "The Coca-Cola Company holds multiple active trademark registrations for the \"Coca-Cola\" mark across various classes, including beverages [ev_fc93b5f61002, ev_cd99a151f6a8].",
          "evidence_ids": [
            "ev_fc93b5f61002",
            "ev_cd99a151f6a8"
          ],
          "rule_ids": []
        },
        {
          "text": "Trademark rights do not expire on a fixed term, and the mark remains actively registered [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        },
        {
          "text": "Because this active trademark appears on screen, the item requires further review to assess the nature of the depiction [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        }
      ],
      "evidence_ids": [
        "ev_2964542f70ce",
        "ev_98b7bfe50f74",
        "ev_99c4ab0f0adb",
        "ev_baa513e991e6",
        "ev_cd99a151f6a8",
        "ev_e92672d9d659",
        "ev_ec8dd106497a",
        "ev_fc93b5f61002"
      ],
      "rule_outcomes": [
        {
          "rule_id": "TRADEMARK_NO_EXPIRY",
          "applied_facts": {
            "work_type": "TRADEMARK",
            "jurisdiction": "US",
            "authorship_type": "UNKNOWN",
            "trademark_status": "Active"
          },
          "outcome": "NOT_APPLICABLE",
          "explanation": "Trade mark rights do not expire on a fixed term, so no term arithmetic applies. Registration status on the record: Active. CAVEAT: Duration is not the operative question for a trade mark. Assess whether the on-screen use is nominative, whether it implies endorsement, and whether the depiction is disparaging.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "15 U.S.C. \u00a7\u00a7 1058, 1059 (Lanham Act renewal provisions)",
          "evaluated_at": "2026-09-08T11:19:43.146794Z"
        }
      ],
      "open_questions": [
        "Is the on-screen use of the Coca-Cola trademark nominative?",
        "Does the depiction imply endorsement or sponsorship by The Coca-Cola Company?",
        "Is the depiction disparaging to the brand?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "The Coca-Cola Company",
      "generated_at": "2026-09-08T11:19:58.034104Z"
    },
    {
      "item_id": "item_7999e01c917c",
      "tier": "NEEDS_VERIFICATION",
      "rationale": "The provided sources present conflicting information regarding the identity of Sunset Boulevard, identifying it variously as a Danish restaurant chain, a construction company, and a famous street in Los Angeles requiring specific filming permits [ev_467c4a1f7a4b, ev_417babcf1d3e, ev_3e6543595050]. If the on-screen depiction refers to the restaurant chain, trademark rights may be implicated, though the registration status is not established on the current record [TRADEMARK_NO_EXPIRY, ev_3c333bec9f59]. Alternatively, if the script depicts the actual street in West Hollywood, specific film permits and coordination with local authorities are necessary [ev_d283c270cc0c]. Further review is needed to determine exactly which entity or location is depicted on screen to assess the appropriate next steps [ev_56145537fbf2, TRADEMARK_NO_EXPIRY].",
      "claims": [
        {
          "text": "The provided sources present conflicting information regarding the identity of Sunset Boulevard, identifying it variously as a Danish restaurant chain, a construction company, and a famous street in Los Angeles requiring specific filming permits [ev_467c4a1f7a4b, ev_417babcf1d3e, ev_3e6543595050].",
          "evidence_ids": [
            "ev_467c4a1f7a4b",
            "ev_417babcf1d3e",
            "ev_3e6543595050"
          ],
          "rule_ids": []
        },
        {
          "text": "If the on-screen depiction refers to the restaurant chain, trademark rights may be implicated, though the registration status is not established on the current record [TRADEMARK_NO_EXPIRY, ev_3c333bec9f59].",
          "evidence_ids": [
            "ev_3c333bec9f59"
          ],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        },
        {
          "text": "Alternatively, if the script depicts the actual street in West Hollywood, specific film permits and coordination with local authorities are necessary [ev_d283c270cc0c].",
          "evidence_ids": [
            "ev_d283c270cc0c"
          ],
          "rule_ids": []
        },
        {
          "text": "Further review is needed to determine exactly which entity or location is depicted on screen to assess the appropriate next steps [ev_56145537fbf2, TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [
            "ev_56145537fbf2"
          ],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        }
      ],
      "evidence_ids": [
        "ev_3c333bec9f59",
        "ev_3e6543595050",
        "ev_417babcf1d3e",
        "ev_467c4a1f7a4b",
        "ev_56145537fbf2",
        "ev_d283c270cc0c"
      ],
      "rule_outcomes": [
        {
          "rule_id": "TRADEMARK_NO_EXPIRY",
          "applied_facts": {
            "work_type": "TRADEMARK",
            "jurisdiction": "US",
            "creation_year": 1996,
            "authorship_type": "UNKNOWN"
          },
          "outcome": "NOT_APPLICABLE",
          "explanation": "Trade mark rights do not expire on a fixed term, so no term arithmetic applies. Registration status on the record: not established. CAVEAT: Duration is not the operative question for a trade mark. Assess whether the on-screen use is nominative, whether it implies endorsement, and whether the depiction is disparaging.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "15 U.S.C. \u00a7\u00a7 1058, 1059 (Lanham Act renewal provisions)",
          "evaluated_at": "2026-09-08T11:19:52.250906Z"
        }
      ],
      "open_questions": [
        "Does the script depict the Danish restaurant chain, the construction company, or the physical street in Los Angeles?",
        "If the physical street is depicted, are there any identifiable storefronts, signage, or trade dress visible on screen?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "Cathrine Bang",
      "generated_at": "2026-09-08T11:20:12.014168Z"
    },
    {
      "item_id": "item_b6d84d21d91e",
      "tier": "NEEDS_VERIFICATION",
      "rationale": "The evidence confirms that \"Capitol Records\" is an actively registered trademark owned by Capitol Records, LLC [ev_bd4788c32882, ev_2bf04bad4387]. Because trademark rights do not expire on a fixed term, standard duration arithmetic does not apply to this property [TRADEMARK_NO_EXPIRY]. Since the active mark appears on screen in the scene, further review is required to evaluate whether the depiction implies endorsement or qualifies as nominative use [TRADEMARK_NO_EXPIRY].",
      "claims": [
        {
          "text": "The evidence confirms that \"Capitol Records\" is an actively registered trademark owned by Capitol Records, LLC [ev_bd4788c32882, ev_2bf04bad4387].",
          "evidence_ids": [
            "ev_bd4788c32882",
            "ev_2bf04bad4387"
          ],
          "rule_ids": []
        },
        {
          "text": "Because trademark rights do not expire on a fixed term, standard duration arithmetic does not apply to this property [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        },
        {
          "text": "Since the active mark appears on screen in the scene, further review is required to evaluate whether the depiction implies endorsement or qualifies as nominative use [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        }
      ],
      "evidence_ids": [
        "ev_29b0b80b0b19",
        "ev_2bf04bad4387",
        "ev_2fb0dab141dc",
        "ev_51df02565ddd",
        "ev_bd4788c32882",
        "ev_d5ffdcff3c55",
        "ev_dda03441ce99",
        "ev_f82956688fa2"
      ],
      "rule_outcomes": [
        {
          "rule_id": "TRADEMARK_NO_EXPIRY",
          "applied_facts": {
            "work_type": "TRADEMARK",
            "jurisdiction": "US",
            "authorship_type": "UNKNOWN",
            "trademark_status": "Registered"
          },
          "outcome": "NOT_APPLICABLE",
          "explanation": "Trade mark rights do not expire on a fixed term, so no term arithmetic applies. Registration status on the record: Registered. CAVEAT: Duration is not the operative question for a trade mark. Assess whether the on-screen use is nominative, whether it implies endorsement, and whether the depiction is disparaging.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "15 U.S.C. \u00a7\u00a7 1058, 1059 (Lanham Act renewal provisions)",
          "evaluated_at": "2026-09-08T11:20:09.045703Z"
        }
      ],
      "open_questions": [
        "Does the on-screen depiction of the Capitol Records logo imply endorsement or sponsorship by Capitol Records, LLC?",
        "Does the context of the logo's appearance in scene 4 qualify as nominative use?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "Capitol Records, LLC",
      "generated_at": "2026-09-08T11:20:22.764701Z"
    },
    {
      "item_id": "item_2763dcf7f352",
      "tier": "NEEDS_VERIFICATION",
      "rationale": "The FedEx logo is an active, registered trademark owned by Federal Express Corporation [ev_faf1b24367c5, ev_70c298c19cdd]. Trademark rights do not expire on a fixed term, so duration arithmetic does not apply [TRADEMARK_NO_EXPIRY]. Because this active trademark will appear on screen in a neutral depiction, further review is needed to assess whether the use is nominative or implies endorsement [TRADEMARK_NO_EXPIRY].",
      "claims": [
        {
          "text": "The FedEx logo is an active, registered trademark owned by Federal Express Corporation [ev_faf1b24367c5, ev_70c298c19cdd].",
          "evidence_ids": [
            "ev_faf1b24367c5",
            "ev_70c298c19cdd"
          ],
          "rule_ids": []
        },
        {
          "text": "Trademark rights do not expire on a fixed term, so duration arithmetic does not apply [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        },
        {
          "text": "Because this active trademark will appear on screen in a neutral depiction, further review is needed to assess whether the use is nominative or implies endorsement [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        }
      ],
      "evidence_ids": [
        "ev_2d2254a967d9",
        "ev_458e28b487a4",
        "ev_707e4060f431",
        "ev_70c298c19cdd",
        "ev_7f83cc50d847",
        "ev_9b384d8606ec",
        "ev_f4feb9c48911",
        "ev_faf1b24367c5"
      ],
      "rule_outcomes": [
        {
          "rule_id": "TRADEMARK_NO_EXPIRY",
          "applied_facts": {
            "work_type": "TRADEMARK",
            "jurisdiction": "US",
            "publication_year": 1994,
            "creation_year": 1994,
            "authorship_type": "UNKNOWN",
            "trademark_status": "Registered"
          },
          "outcome": "NOT_APPLICABLE",
          "explanation": "Trade mark rights do not expire on a fixed term, so no term arithmetic applies. Registration status on the record: Registered. CAVEAT: Duration is not the operative question for a trade mark. Assess whether the on-screen use is nominative, whether it implies endorsement, and whether the depiction is disparaging.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "15 U.S.C. \u00a7\u00a7 1058, 1059 (Lanham Act renewal provisions)",
          "evaluated_at": "2026-09-08T11:20:19.132242Z"
        }
      ],
      "open_questions": [
        "Does the on-screen use of the FedEx logo imply endorsement or sponsorship by Federal Express Corporation?",
        "Is the depiction strictly nominative in the context of scene 4?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "Federal Express Corporation",
      "generated_at": "2026-09-08T11:20:59.843975Z"
    },
    {
      "item_id": "item_81a717e2944d",
      "tier": "NEEDS_VERIFICATION",
      "rationale": "The Apple logo is an active, registered trademark owned by Apple Inc. [ev_1996131196a5], [ev_a62f92049f2b]. Because trademark rights do not expire on a fixed term, standard duration arithmetic does not apply to this property [TRADEMARK_NO_EXPIRY]. Furthermore, the brand's official guidelines explicitly state that their logo must not appear in third-party materials without express written permission [ev_a4221eddca8d]. Although the on-screen depiction is neutral, further review is required to determine if the usage implies endorsement or qualifies as nominative use [TRADEMARK_NO_EXPIRY].",
      "claims": [
        {
          "text": "The Apple logo is an active, registered trademark owned by Apple Inc. [ev_1996131196a5], [ev_a62f92049f2b].",
          "evidence_ids": [
            "ev_1996131196a5",
            "ev_a62f92049f2b"
          ],
          "rule_ids": []
        },
        {
          "text": "Because trademark rights do not expire on a fixed term, standard duration arithmetic does not apply to this property [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        },
        {
          "text": "Furthermore, the brand's official guidelines explicitly state that their logo must not appear in third-party materials without express written permission [ev_a4221eddca8d].",
          "evidence_ids": [
            "ev_a4221eddca8d"
          ],
          "rule_ids": []
        },
        {
          "text": "Although the on-screen depiction is neutral, further review is required to determine if the usage implies endorsement or qualifies as nominative use [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        }
      ],
      "evidence_ids": [
        "ev_1996131196a5",
        "ev_3fd88ebbd84e",
        "ev_422a4c9c2949",
        "ev_4952faea2f9e",
        "ev_74be6c1b6e2e",
        "ev_a4221eddca8d",
        "ev_a62f92049f2b",
        "ev_b2e0d8ccfad8"
      ],
      "rule_outcomes": [
        {
          "rule_id": "TRADEMARK_NO_EXPIRY",
          "applied_facts": {
            "work_type": "TRADEMARK",
            "jurisdiction": "US",
            "authorship_type": "UNKNOWN",
            "trademark_status": "Registered"
          },
          "outcome": "NOT_APPLICABLE",
          "explanation": "Trade mark rights do not expire on a fixed term, so no term arithmetic applies. Registration status on the record: Registered. CAVEAT: Duration is not the operative question for a trade mark. Assess whether the on-screen use is nominative, whether it implies endorsement, and whether the depiction is disparaging.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "15 U.S.C. \u00a7\u00a7 1058, 1059 (Lanham Act renewal provisions)",
          "evaluated_at": "2026-09-08T11:20:23.073039Z"
        }
      ],
      "open_questions": [
        "Does the on-screen appearance of the Apple logo imply sponsorship or endorsement by Apple Inc.?",
        "Does the specific context of the logo's use qualify as nominative use?",
        "Is it feasible to obtain express written permission from Apple, or should the logo be greeked/blurred?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "Apple Inc.",
      "generated_at": "2026-09-08T11:20:38.508155Z"
    },
    {
      "item_id": "item_3c88b902b2de",
      "tier": "NEEDS_VERIFICATION",
      "rationale": "The Starbucks name and siren logo are actively registered trademarks owned by Starbucks Corporation [ev_c1cf19354a33, ev_0c4dc6d4efae, ev_2ea8f23ef084]. Because trademark rights do not expire on a fixed term, the rule outcome indicates that duration arithmetic does not apply to these registered marks [TRADEMARK_NO_EXPIRY]. Furthermore, the corporate terms of use explicitly state that Starbucks marks may not be copied or used without prior written permission [ev_73d3b4110f77]. Since this active trademark appears on screen, the item requires escalation to evaluate whether the neutral depiction implies endorsement or qualifies as nominative use [TRADEMARK_NO_EXPIRY].",
      "claims": [
        {
          "text": "The Starbucks name and siren logo are actively registered trademarks owned by Starbucks Corporation [ev_c1cf19354a33, ev_0c4dc6d4efae, ev_2ea8f23ef084].",
          "evidence_ids": [
            "ev_c1cf19354a33",
            "ev_0c4dc6d4efae",
            "ev_2ea8f23ef084"
          ],
          "rule_ids": []
        },
        {
          "text": "Because trademark rights do not expire on a fixed term, the rule outcome indicates that duration arithmetic does not apply to these registered marks [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        },
        {
          "text": "Furthermore, the corporate terms of use explicitly state that Starbucks marks may not be copied or used without prior written permission [ev_73d3b4110f77].",
          "evidence_ids": [
            "ev_73d3b4110f77"
          ],
          "rule_ids": []
        },
        {
          "text": "Since this active trademark appears on screen, the item requires escalation to evaluate whether the neutral depiction implies endorsement or qualifies as nominative use [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        }
      ],
      "evidence_ids": [
        "ev_0c4dc6d4efae",
        "ev_2a7e11f6a523",
        "ev_2b170d1e16c5",
        "ev_2ea8f23ef084",
        "ev_3b35892b0502",
        "ev_47d10973d089",
        "ev_73d3b4110f77",
        "ev_c1cf19354a33"
      ],
      "rule_outcomes": [
        {
          "rule_id": "TRADEMARK_NO_EXPIRY",
          "applied_facts": {
            "work_type": "TRADEMARK",
            "jurisdiction": "US",
            "authorship_type": "UNKNOWN",
            "trademark_status": "REGISTERED"
          },
          "outcome": "NOT_APPLICABLE",
          "explanation": "Trade mark rights do not expire on a fixed term, so no term arithmetic applies. Registration status on the record: REGISTERED. CAVEAT: Duration is not the operative question for a trade mark. Assess whether the on-screen use is nominative, whether it implies endorsement, and whether the depiction is disparaging.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "15 U.S.C. \u00a7\u00a7 1058, 1059 (Lanham Act renewal provisions)",
          "evaluated_at": "2026-09-08T11:20:23.251599Z"
        }
      ],
      "open_questions": [
        "Does the on-screen appearance of the Starbucks logo imply endorsement or sponsorship by the brand?",
        "Is the depiction of the Starbucks mark considered a nominative use in the context of the scene?",
        "Has production secured written permission from Starbucks Corporation as outlined in their terms of use?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "Starbucks Corporation",
      "generated_at": "2026-09-08T11:20:37.889401Z"
    },
    {
      "item_id": "item_0dff9dbcaf39",
      "tier": "NEEDS_VERIFICATION",
      "rationale": "The trademark for Penguin Books is currently registered and active [ev_f372ca8b1789, ev_b396cc4ea1d5]. Trademark rights do not expire on a fixed term, so term arithmetic does not apply [TRADEMARK_NO_EXPIRY]. Because this is an active trademark appearing on screen, this item requires escalation for further review [TRADEMARK_NO_EXPIRY].",
      "claims": [
        {
          "text": "The trademark for Penguin Books is currently registered and active [ev_f372ca8b1789, ev_b396cc4ea1d5].",
          "evidence_ids": [
            "ev_f372ca8b1789",
            "ev_b396cc4ea1d5"
          ],
          "rule_ids": []
        },
        {
          "text": "Trademark rights do not expire on a fixed term, so term arithmetic does not apply [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        },
        {
          "text": "Because this is an active trademark appearing on screen, this item requires escalation for further review [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        }
      ],
      "evidence_ids": [
        "ev_1e4161777f64",
        "ev_2a777b065814",
        "ev_50b1d2fd9777",
        "ev_54d3df255064",
        "ev_a4e39daca27b",
        "ev_b396cc4ea1d5",
        "ev_f372ca8b1789",
        "ev_fd38a63767c8"
      ],
      "rule_outcomes": [
        {
          "rule_id": "TRADEMARK_NO_EXPIRY",
          "applied_facts": {
            "work_type": "TRADEMARK",
            "jurisdiction": "US",
            "authorship_type": "UNKNOWN",
            "trademark_status": "Live/Registered"
          },
          "outcome": "NOT_APPLICABLE",
          "explanation": "Trade mark rights do not expire on a fixed term, so no term arithmetic applies. Registration status on the record: Live/Registered. CAVEAT: Duration is not the operative question for a trade mark. Assess whether the on-screen use is nominative, whether it implies endorsement, and whether the depiction is disparaging.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "15 U.S.C. \u00a7\u00a7 1058, 1059 (Lanham Act renewal provisions)",
          "evaluated_at": "2026-09-08T11:20:35.618955Z"
        }
      ],
      "open_questions": [
        "Is the on-screen use of the Penguin Books trademark nominative?",
        "Does the depiction imply endorsement by or affiliation with Penguin Books?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "Penguin Books Limited",
      "generated_at": "2026-09-08T11:20:47.365954Z"
    },
    {
      "item_id": "item_cec43d334307",
      "tier": "NEEDS_VERIFICATION",
      "rationale": "The evidence identifies \"Pro Tools\" as a professional digital audio workstation software [ev_04c756949ffc]. Trademark search records show various registrations containing the phrase, but the exact registration details for the software brand are not fully established [ev_068fb58426fd, ev_81c0e7071434, TRADEMARK_NO_EXPIRY]. Since trademark rights do not expire on a fixed term and the item appears on screen, an assessment of the on-screen use is necessary [TRADEMARK_NO_EXPIRY].",
      "claims": [
        {
          "text": "The evidence identifies \"Pro Tools\" as a professional digital audio workstation software [ev_04c756949ffc].",
          "evidence_ids": [
            "ev_04c756949ffc"
          ],
          "rule_ids": []
        },
        {
          "text": "Trademark search records show various registrations containing the phrase, but the exact registration details for the software brand are not fully established [ev_068fb58426fd, ev_81c0e7071434, TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [
            "ev_068fb58426fd",
            "ev_81c0e7071434"
          ],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        },
        {
          "text": "Since trademark rights do not expire on a fixed term and the item appears on screen, an assessment of the on-screen use is necessary [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        }
      ],
      "evidence_ids": [
        "ev_04c756949ffc",
        "ev_068fb58426fd",
        "ev_2f2d5d254246",
        "ev_676f32fe70b4",
        "ev_81c0e7071434",
        "ev_870d90624526",
        "ev_9f8b09548f2b",
        "ev_cd24d36377a8"
      ],
      "rule_outcomes": [
        {
          "rule_id": "TRADEMARK_NO_EXPIRY",
          "applied_facts": {
            "work_type": "TRADEMARK",
            "jurisdiction": "US",
            "authorship_type": "UNKNOWN"
          },
          "outcome": "NOT_APPLICABLE",
          "explanation": "Trade mark rights do not expire on a fixed term, so no term arithmetic applies. Registration status on the record: not established. CAVEAT: Duration is not the operative question for a trade mark. Assess whether the on-screen use is nominative, whether it implies endorsement, and whether the depiction is disparaging.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "15 U.S.C. \u00a7\u00a7 1058, 1059 (Lanham Act renewal provisions)",
          "evaluated_at": "2026-09-08T11:20:45.608118Z"
        }
      ],
      "open_questions": [
        "What is the exact registration status of the Avid Pro Tools trademark?",
        "Is the on-screen use of the Pro Tools brand nominative?",
        "Does the on-screen depiction imply any endorsement by the trademark owner?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": null,
      "generated_at": "2026-09-08T11:21:01.868326Z"
    },
    {
      "item_id": "item_97d887b5109a",
      "tier": "NEEDS_VERIFICATION",
      "rationale": "Multiple sources confirm that the \"MARLBORO\" trademark is currently live and registered to Philip Morris USA Inc. for smoker's products [ev_82996f38def4], [ev_13443f88ae6b]. Trademark rights do not expire on a fixed term, so standard term arithmetic does not apply to this active registration [TRADEMARK_NO_EXPIRY]. Because the mark appears on screen, further review is required to determine if the depiction implies endorsement or qualifies as nominative use [TRADEMARK_NO_EXPIRY].",
      "claims": [
        {
          "text": "Multiple sources confirm that the \"MARLBORO\" trademark is currently live and registered to Philip Morris USA Inc. for smoker's products [ev_82996f38def4], [ev_13443f88ae6b].",
          "evidence_ids": [
            "ev_82996f38def4",
            "ev_13443f88ae6b"
          ],
          "rule_ids": []
        },
        {
          "text": "Trademark rights do not expire on a fixed term, so standard term arithmetic does not apply to this active registration [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        },
        {
          "text": "Because the mark appears on screen, further review is required to determine if the depiction implies endorsement or qualifies as nominative use [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        }
      ],
      "evidence_ids": [
        "ev_0329158dff2c",
        "ev_13443f88ae6b",
        "ev_1dac09d98b98",
        "ev_82996f38def4",
        "ev_883247a19937",
        "ev_899b2d699740",
        "ev_cbc6b479fb8c",
        "ev_d0f38b233625"
      ],
      "rule_outcomes": [
        {
          "rule_id": "TRADEMARK_NO_EXPIRY",
          "applied_facts": {
            "work_type": "TRADEMARK",
            "jurisdiction": "US",
            "authorship_type": "UNKNOWN",
            "trademark_status": "Live/Registered"
          },
          "outcome": "NOT_APPLICABLE",
          "explanation": "Trade mark rights do not expire on a fixed term, so no term arithmetic applies. Registration status on the record: Live/Registered. CAVEAT: Duration is not the operative question for a trade mark. Assess whether the on-screen use is nominative, whether it implies endorsement, and whether the depiction is disparaging.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "15 U.S.C. \u00a7\u00a7 1058, 1059 (Lanham Act renewal provisions)",
          "evaluated_at": "2026-09-08T11:21:00.244200Z"
        }
      ],
      "open_questions": [
        "Does the on-screen appearance of the Marlboro trademark in scene 6 imply endorsement or sponsorship by the trademark owner?",
        "Is the depiction purely nominative and artistically relevant to the scene?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "Philip Morris USA Inc.",
      "generated_at": "2026-09-08T11:21:25.556637Z"
    },
    {
      "item_id": "item_0a02db79809c",
      "tier": "NEEDS_VERIFICATION",
      "rationale": "The on-screen appearance of the Nike brand involves an active, registered trademark owned by Nike, Inc. [ev_9fa1aa74fc72] [ev_e5e4a8983d25]. Trademark rights do not expire on a fixed term, meaning standard term arithmetic does not apply to this live registration [TRADEMARK_NO_EXPIRY]. Because the mark appears on screen, further review is required to assess whether the use is nominative or implies endorsement [TRADEMARK_NO_EXPIRY].",
      "claims": [
        {
          "text": "The on-screen appearance of the Nike brand involves an active, registered trademark owned by Nike, Inc. [ev_9fa1aa74fc72] [ev_e5e4a8983d25].",
          "evidence_ids": [
            "ev_9fa1aa74fc72",
            "ev_e5e4a8983d25"
          ],
          "rule_ids": []
        },
        {
          "text": "Trademark rights do not expire on a fixed term, meaning standard term arithmetic does not apply to this live registration [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        },
        {
          "text": "Because the mark appears on screen, further review is required to assess whether the use is nominative or implies endorsement [TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        }
      ],
      "evidence_ids": [
        "ev_16b85fd261e4",
        "ev_1ae029c28955",
        "ev_8a9252a4a0b2",
        "ev_9fa1aa74fc72",
        "ev_a34cf9c51213",
        "ev_daeffefc089b",
        "ev_de80f131d181",
        "ev_e5e4a8983d25"
      ],
      "rule_outcomes": [
        {
          "rule_id": "TRADEMARK_NO_EXPIRY",
          "applied_facts": {
            "work_type": "TRADEMARK",
            "jurisdiction": "US",
            "authorship_type": "UNKNOWN",
            "trademark_status": "Live/Registered"
          },
          "outcome": "NOT_APPLICABLE",
          "explanation": "Trade mark rights do not expire on a fixed term, so no term arithmetic applies. Registration status on the record: Live/Registered. CAVEAT: Duration is not the operative question for a trade mark. Assess whether the on-screen use is nominative, whether it implies endorsement, and whether the depiction is disparaging.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "15 U.S.C. \u00a7\u00a7 1058, 1059 (Lanham Act renewal provisions)",
          "evaluated_at": "2026-09-08T11:20:55.232862Z"
        }
      ],
      "open_questions": [
        "Is the on-screen depiction of the Nike trademark nominative?",
        "Does the context of the scene imply any endorsement or sponsorship by Nike?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "Nike, Inc.",
      "generated_at": "2026-09-08T11:21:14.173750Z"
    },
    {
      "item_id": "item_ed4fb13eb46a",
      "tier": "CLEAR_ON_RECORD",
      "rationale": "Meridian Records is a real classical music label currently operated by Richard Hughes and Susanne Stanzeleit [ev_a86ad08bcb1a]. The name \"MERIDIAN\" is an actively registered trademark, and trademark rights do not expire on a fixed term [ev_a2a27e489ba0, TRADEMARK_NO_EXPIRY]. Because the business is only mentioned off-screen and the script's depiction is neutral, standard location release procedures are inapplicable to this occurrence [ev_b67915877a84].",
      "claims": [
        {
          "text": "Meridian Records is a real classical music label currently operated by Richard Hughes and Susanne Stanzeleit [ev_a86ad08bcb1a].",
          "evidence_ids": [
            "ev_a86ad08bcb1a"
          ],
          "rule_ids": []
        },
        {
          "text": "The name \"MERIDIAN\" is an actively registered trademark, and trademark rights do not expire on a fixed term [ev_a2a27e489ba0, TRADEMARK_NO_EXPIRY].",
          "evidence_ids": [
            "ev_a2a27e489ba0"
          ],
          "rule_ids": [
            "TRADEMARK_NO_EXPIRY"
          ]
        },
        {
          "text": "Because the business is only mentioned off-screen and the script's depiction is neutral, standard location release procedures are inapplicable to this occurrence [ev_b67915877a84].",
          "evidence_ids": [
            "ev_b67915877a84"
          ],
          "rule_ids": []
        }
      ],
      "evidence_ids": [
        "ev_006fd8f8c13b",
        "ev_5e7a70bea994",
        "ev_9e0d9558f28a",
        "ev_a2a27e489ba0",
        "ev_a4290a601335",
        "ev_a86ad08bcb1a",
        "ev_b67915877a84",
        "ev_feade378deda"
      ],
      "rule_outcomes": [
        {
          "rule_id": "TRADEMARK_NO_EXPIRY",
          "applied_facts": {
            "work_type": "TRADEMARK",
            "jurisdiction": "US",
            "authorship_type": "UNKNOWN",
            "trademark_status": "Registered"
          },
          "outcome": "NOT_APPLICABLE",
          "explanation": "Trade mark rights do not expire on a fixed term, so no term arithmetic applies. Registration status on the record: Registered. CAVEAT: Duration is not the operative question for a trade mark. Assess whether the on-screen use is nominative, whether it implies endorsement, and whether the depiction is disparaging.",
          "missing_facts": [],
          "public_domain_year": null,
          "citation": "15 U.S.C. \u00a7\u00a7 1058, 1059 (Lanham Act renewal provisions)",
          "evaluated_at": "2026-09-08T11:21:37.601823Z"
        }
      ],
      "open_questions": [
        "Are there any plans to change this from an off-screen mention to a visual depiction of the business or its logo?",
        "Does the dialogue in scene 7 imply any endorsement by or disparagement of the real Meridian Records?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "Scotsman Group LLC",
      "generated_at": "2026-09-08T11:22:01.935005Z"
    },
    {
      "item_id": "item_edaf252de2d5",
      "tier": "CLEAR_ON_RECORD",
      "rationale": "F. Scott Fitzgerald's novel \"The Great Gatsby\" was originally published in 1925 [ev_b9ccc1a79401]. Under the 95-year publication term for works published before 1978, the novel's copyright expired on January 1, 2021 [US_PUB_PRE_1978_95_YEARS, ev_8df4be1e389c]. Sources indicate that while the original text is in the public domain, specific visual designs from later film adaptations may still be protected [ev_3954e654a540].",
      "claims": [
        {
          "text": "F. Scott Fitzgerald's novel \"The Great Gatsby\" was originally published in 1925 [ev_b9ccc1a79401].",
          "evidence_ids": [
            "ev_b9ccc1a79401"
          ],
          "rule_ids": []
        },
        {
          "text": "Under the 95-year publication term for works published before 1978, the novel's copyright expired on January 1, 2021 [US_PUB_PRE_1978_95_YEARS, ev_8df4be1e389c].",
          "evidence_ids": [
            "ev_8df4be1e389c"
          ],
          "rule_ids": [
            "US_PUB_PRE_1978_95_YEARS"
          ]
        },
        {
          "text": "Sources indicate that while the original text is in the public domain, specific visual designs from later film adaptations may still be protected [ev_3954e654a540].",
          "evidence_ids": [
            "ev_3954e654a540"
          ],
          "rule_ids": []
        }
      ],
      "evidence_ids": [
        "ev_11a218847777",
        "ev_1e954957c5a4",
        "ev_3954e654a540",
        "ev_3f8ea5e5d8e1",
        "ev_850d4f0a9a6d",
        "ev_8c3a3916aa01",
        "ev_8df4be1e389c",
        "ev_b9ccc1a79401"
      ],
      "rule_outcomes": [
        {
          "rule_id": "US_PUB_PRE_1978_95_YEARS",
          "applied_facts": {
            "work_type": "LITERARY_WORK",
            "jurisdiction": "US",
            "publication_year": 1925,
            "author_death_year": 1940,
            "authorship_type": "UNKNOWN",
            "trademark_status": "null"
          },
          "outcome": "PUBLIC_DOMAIN",
          "explanation": "Work published before 1978, so the 95-year publication term applies rather than a life-based term. First published 1925 + 95 year term = protection through 31 December 2020; the work enters the public domain on 1 January 2021. Evaluated as of 2026: the term has expired. CAVEAT: Works first published in the US between 1930 and 1963 required renewal in the 28th year. A substantial share were never renewed and are already in the public domain. This rule assumes renewal; confirm renewal status in the Copyright Office records before relying on an IN_COPYRIGHT outcome.",
          "missing_facts": [],
          "public_domain_year": 2021,
          "citation": "17 U.S.C. \u00a7 304(b); Sonny Bono Copyright Term Extension Act, Pub. L. 105-298",
          "evaluated_at": "2026-09-08T11:21:22.155228Z"
        }
      ],
      "open_questions": [
        "Does the on-screen depiction rely solely on the 1925 text, or does it incorporate visual elements unique to later film adaptations?"
      ],
      "dropped_claims": [],
      "validated": true,
      "rights_holder_hint": "Fitzgerald's literary estate",
      "generated_at": "2026-09-08T11:21:41.505856Z"
    }
  ],
  "evidence_store": {
    "ev_c33049849ee7": {
      "evidence_id": "ev_c33049849ee7",
      "item_id": "item_4051d7cfe988",
      "source_url": "https://en.wikipedia.org/wiki/Meridian_Audio",
      "source_title": "Meridian Audio - Wikipedia",
      "retrieved_at": "2026-09-08T11:18:47.284621Z",
      "snippet": "The <strong>company</strong> opened its first shop in Bangkok, Thailand in November 2009, followed by three more retail outlets in Seoul, Santiago and Mexico and a U.K. branch in Oxford. In the same year, the organisation announced John Buchanan would take over from Tim Ireland as CEO. Since 2011, <strong>Meridian</strong> has developed a relationship with Jaguar Land Rover to deliver audio products for the entire portfolio of vehicles, including a new 3D surround <strong>sound</strong>",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_84ad0cc56a8c": {
      "evidence_id": "ev_84ad0cc56a8c",
      "item_id": "item_4051d7cfe988",
      "source_url": "https://trademarks.justia.com/872/95/meridian-87295833.html",
      "source_title": "MERIDIAN Trademark of MERIDIAN AUDIO LIMITED - Registration Number 5321298 - Serial Number 87295833 :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:47.284920Z",
      "snippet": "com/international-class-code/042) \\- Scientific and technological services and research and design relating thereto; industrial analysis and research services; design and development of computer hardware and software; legal services. - Scientific and technological services and research and design relating thereto; industrial analysis and research services; design and development of computer hardware and software; legal services.\n\n**US Class Codes**\n\n100, 101\n\n**Class Status Code**\n\n**6** \\- Active\n\n**Class Status Date**\n\n2017-01-17\n\n**Primary Code**\n\n042\n\n**Current Trademark Owners**\n\n**Party Name**\n\nMERIDIAN AUDIO LIMITED\n\n**Party Type**\n\n**30** \\- Original Registrant\n\n**Legal Entity Type**\n\n**99** \\- Other (limited company (ltd.)).\n\n**Address**\n\n_Please  with your Justia account to see this address._\n\n**Trademark Owner History**\n\n**Party Name**\n\nMERIDIAN AUDIO LIMITED\n\n**Party Type**\n\n**30** \\- Original Registrant\n\n**Legal Entity Typ",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_7e75af0e9178": {
      "evidence_id": "ev_7e75af0e9178",
      "item_id": "item_4051d7cfe988",
      "source_url": "https://www.meridian-audio.com/",
      "source_title": "Meridian Audio",
      "retrieved_at": "2026-09-08T11:18:47.284945Z",
      "snippet": "### The Sound Behind The Experience\n\nMeridian designs and applies advanced digital signal processing to shape how sound is experienced across a wide range of listening environments. Our technologies solve real-world acoustic challenges, improving clarity, balance and spatial realism so listeners can enjoy music and audio that feels natural, immersive and effortless, whether at home, in a vehicle or on the move.\n\nDiscover\n\n### Meridian Moments\n\nMeridian case studies, also known as Meridian Moments, show how our sound philosophy is realised in the real world across multiple sectors. Working closely with our partners and clients, we apply our audio engineering expertise beyond product design to deliver real-life projects and integrations, from private homes with Meridian cinemas to vehicle launches, brand activations and meaningful personal listening moments.\n\nDiscover\n\n### Meridian Gives You Goosebumps",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_479c6a767ca3": {
      "evidence_id": "ev_479c6a767ca3",
      "item_id": "item_4051d7cfe988",
      "source_url": "https://www.linkedin.com/company/meridian-audio-ltd",
      "source_title": "Meridian Audio Ltd | LinkedIn",
      "retrieved_at": "2026-09-08T11:18:47.284961Z",
      "snippet": "<strong>Meridian Audio is a multi-award winning British audio technology innovator best known for its elegant, high-performance home audio products, and its automotive business</strong>. Meridian&#x27;s goal is to create audio systems that are beautiful to look at,",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_ab07bca03a61": {
      "evidence_id": "ev_ab07bca03a61",
      "item_id": "item_4051d7cfe988",
      "source_url": "https://www.trademarkia.com/meridian-99030498",
      "source_title": "MERIDIAN Trademark | Trademarkia",
      "retrieved_at": "2026-09-08T11:18:47.284976Z",
      "snippet": "com/#) [Copyright Owner Search Browse through the owners of copyrights registered](https://www.copyrightable.com/search/owners?q=a)\n\n[Search Copyright by Category Browse through different categories of copyright works](https://www.copyrightable.com/search-copyright-by-category)\n\nIncorporations\n\nIncorporate your business today\n\nIncorporate your business with\n\nStart a Business\n\nLegal Forms for Business\n\n* * *\n\n[Form a LLC Popular option for business owners](https://www.incdecentral.com/) [Form a C Corporation Best for big business establishments](https://www.incdecentral.com/) [Form a S Corporation For growing businesses to save taxes](https://www.incdecentral.com/) [Form a Non Profit For business focused on helping the world](https://www.incdecentral.com/) Beneficial Ownership Information Registration Ownership registration to meet CTA compliance\n\nBusiness Forms Real Estate Forms Family and Personal Forms Legal Forms Directory\n\nDomains",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_719cac8d3c52": {
      "evidence_id": "ev_719cac8d3c52",
      "item_id": "item_4051d7cfe988",
      "source_url": "https://trademarks.justia.com/996/44/meridian-99644092.html",
      "source_title": "MERIDIAN Trademark Application of Meridian AI, Inc. - Serial Number 99644092 :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:47.284988Z",
      "snippet": "US Class Codes 100, 101 Class Status Code 6 - Active Class Status Date 2026-02-10 Primary Code 042 First Use Anywhere Date 2023-06-23 First Use In Commerce Date 2023-06-23 Current Trademark Owners Party Name Meridian AI, Inc. Party Type 10 - Original Applicant Legal Entity Type 03 - Corporation Address",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_837114466d44": {
      "evidence_id": "ev_837114466d44",
      "item_id": "item_4051d7cfe988",
      "source_url": "https://rangerover.com/en-us/stories/meridian-sound-system.html",
      "source_title": "Meridian Sound System",
      "retrieved_at": "2026-09-08T11:18:47.285000Z",
      "snippet": "Meridian is a registered trademark of <strong>Meridian Audio Ltd</strong>.",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_34aa0f1b3486": {
      "evidence_id": "ev_34aa0f1b3486",
      "item_id": "item_4051d7cfe988",
      "source_url": "https://trademarks.justia.com/864/58/meridian-86458985.html",
      "source_title": "MERIDIAN Trademark of Meridian Lightweight Technologies, Inc. - Registration Number 5319804 - Serial Number 86458985 :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:47.285012Z",
      "snippet": "**Party Type**\n\n**30** \\- Original Registrant\n\n**Legal Entity Type**\n\n**03** \\- Corporation\n\n**Address**\n\n_Please  with your Justia account to see this address._\n\n**Trademark Owner History**\n\n**Party Name**\n\nMeridian Lightweight Technologies, Inc.\n\n**Party Type**\n\n**30** \\- Original Registrant\n\n**Legal Entity Type**\n\n**03** \\- Corporation\n\n**Address**\n\n_Please  with your Justia account to see this address._\n\n**Party Name**\n\nMeridian Lightweight Technologies, Inc.\n\n**Party Type**\n\n**20** \\- Owner at Publication\n\n**Legal Entity Type**\n\n**03** \\- Corporation\n\n**Address**\n\n_Please  with your Justia account to see this address._\n\n**Party Name**\n\nMeridian Lightweight Technologies, Inc.\n\n**Party Type**\n\n**10** \\- Original Applicant\n\n**Legal Entity Type**\n\n**03** \\- Corporation\n\n**Address**\n\n_Please  with your Justia account to see this address._\n\n**Correspondences**\n\n**Name**\n\nKIMBERLY A. BERGER\n\n**Address**\n\n_Please  with your Justia account",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_1c9526325394": {
      "evidence_id": "ev_1c9526325394",
      "item_id": "item_ceb693738e73",
      "source_url": "https://thevalleypawn.com/",
      "source_title": "Valley Pawn - Trusted Pawn Shop in Virginia's Shenandoah Valley",
      "retrieved_at": "2026-09-08T11:18:50.453555Z",
      "snippet": "<strong>Valley Pawn offers fast, no-credit-check pawn loans and quality pre-owned merchandise across Waynesboro, Culpeper, Lexington, Harrisonburg, and Roanoke</strong>. Our team appraises every item fairly using real market data, and we stand behind everything",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_7d1041363d22": {
      "evidence_id": "ev_7d1041363d22",
      "item_id": "item_ceb693738e73",
      "source_url": "https://www.dnb.com/business-directory/company-profiles.sauk_valley_pawn__loan.16553aead85d45ff071f874971d28eb8.html",
      "source_title": "SAUK VALLEY PAWN & LOAN Company Profile | Sterling, IL | Competitors, Financials & Contacts - Dun & Bradstreet",
      "retrieved_at": "2026-09-08T11:18:50.453571Z",
      "snippet": "Industry: Nondepository Credit Intermediation , Credit Intermediation and Related Activities , Finance and Insurance , Pawnshop",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_b054ef314a76": {
      "evidence_id": "ev_b054ef314a76",
      "item_id": "item_ceb693738e73",
      "source_url": "https://www.trademarkia.com/valley-growth-capital-98315087",
      "source_title": "Trademark Search, Free, for Millions of Registered Trademarks with USPTO | Trademarkia",
      "retrieved_at": "2026-09-08T11:18:50.453578Z",
      "snippet": "com/#) [Copyright Owner Search Browse through the owners of copyrights registered](https://www.copyrightable.com/search/owners?q=a)\n\n[Search Copyright by Category Browse through different categories of copyright works](https://www.copyrightable.com/search-copyright-by-category)\n\nIncorporations\n\nIncorporate your business today\n\nIncorporate your business with\n\nStart a Business\n\nLegal Forms for Business\n\n* * *\n\n[Form a LLC Popular option for business owners](https://www.incdecentral.com/) [Form a C Corporation Best for big business establishments](https://www.incdecentral.com/) [Form a S Corporation For growing businesses to save taxes](https://www.incdecentral.com/) [Form a Non Profit For business focused on helping the world](https://www.incdecentral.com/) Beneficial Ownership Information Registration Ownership registration to meet CTA compliance\n\nBusiness Forms Real Estate Forms Family and Personal Forms Legal Forms Directory\n\nDomains\n\nSearch, register and resolve domain matters\n\n...\n\ncom/#) [Copyright Owner Search Browse through the owners of copyrights registered](https://www.copyrightable.com/search/owners?q=a)\n\n[Search Copyright by Category Browse through different categories o",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_5d7c248e275e": {
      "evidence_id": "ev_5d7c248e275e",
      "item_id": "item_ceb693738e73",
      "source_url": "https://uspto.report/TM/72027358",
      "source_title": "VALLEY - Valley Manufacturing Co., Inc. Trademark Registration",
      "retrieved_at": "2026-09-08T11:18:50.453583Z",
      "snippet": "|Mark Drawing Code |1000: Typeset: Word(s)/letter(s)/number(s) |\n|Attorney Name |Adam Airhart |\n|Attorney Docket Number |BBB-2006-T00 |\n\n### Timeline\n\n|1952-01-02 |Date of First Use |\n| --- | --- |\n|1957-04-01 |Application Filed |\n|1957-12-17 |Trademark Registered |\n|2007-12-17 |Renewal Date |\n|2009-10-07 |Location: GENERIC WEB UPDATE |\n|2009-10-07 |Status: Live/Registered |\n|2018-07-07 |Transaction Date |\n\n#### Trademark Applicants & Owners\n\n|Owner: |VALLEY MANUFACTURING CO., INC. |\n| --- | --- |\n|Address |333 MORTON ST. BAY CITY MI |\n|Legal Entity Type |Corporation |\n|Legal Entity State |TX |\n\n#### Documents\n\nClick the blue \"Refresh\" button to load certificates, specimines, application, and other documents.\n\n#### Attorney of Record\n\n#### Good, Services, and Codes\n\n|International Codes: |20 |\n| --- | --- |\n|U.S. Codes: |022 |\n\n|Type Code |Type |\n| --- | --- |\n|GS0221 |INDOOR SHUFFLEBOARD SETS, POOL TABLES, BUMPER POOL TABLES CUES, POKER TABLES, AND CHAIRS |",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_ade4a760edb2": {
      "evidence_id": "ev_ade4a760edb2",
      "item_id": "item_ceb693738e73",
      "source_url": "https://www.zoominfo.com/c/valley-pawn-llc/357681172",
      "source_title": "Valley Pawn - Overview, News & Similar companies | ZoomInfo.com",
      "retrieved_at": "2026-09-08T11:18:50.453589Z",
      "snippet": "Valley Pawn is experiencing very low activity levels compared to other companies in the Hospitality sector.",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_bc9fe70091f0": {
      "evidence_id": "ev_bc9fe70091f0",
      "item_id": "item_ceb693738e73",
      "source_url": "https://valley-pawn.wheree.com/",
      "source_title": "VALLEY PAWN - Reviews, Photos & Phone Number - Updated July 2026 - Jewelry Store in Bernalillo County, New Mexico (NM) - Wheree",
      "retrieved_at": "2026-09-08T11:18:50.453593Z",
      "snippet": "<strong>Valley Pawn is a prominent brand in the field of pawnbroking</strong>, offering its services to customers in a convenient location. With a strong presence on Google",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_94b19641bb64": {
      "evidence_id": "ev_94b19641bb64",
      "item_id": "item_ceb693738e73",
      "source_url": "https://www.yellowpages.com/el-monte-ca/mip/valley-jewelry-loan-company-10689380",
      "source_title": "Valley Jewelry & Loan Company - El Monte, CA 91732",
      "retrieved_at": "2026-09-08T11:18:50.453598Z",
      "snippet": "The Real Yellow Pages logo The Real Yellow Pages logo\n\nFind a business\n\nFind a business\n\nWhere?\n\n* Use my location\n\nFind\n\n \u2022 \n\nMore\n\nFind People Icon Find People [Explore Cities Icon Explore Cities](https://www.yellowpages.com/sitemap) [Get the App Icon Get the App!](https://www.yellowpages.com/yp-app) [Advertise with Us Icon Advertise with Us](https://www.yellowpages.com/marketing-services?from=advertise-with-us-YP)\n\nPlease note our privacy policy has changed. To view the policy, please go to <https://www.thryv.com/privacy/>\n\n1. Home\n2. CA\n3. El Monte\n4. [Pawnbrokers](https://www.yellowpages.com/el-monte-ca/pawnbrokers)\n5. Valley Jewelry & Loan Company\n\n[thumbnail](https://www.yellowpages.com/el-monte-ca/mip/valley-jewelry-loan-company-10689380/gallery?lid=10689380)\n\n# Valley Jewelry & Loan Company\n\nPawnbrokers , Jewelers , Jewelry Buyers\n\n(1)\n\nopen now\n\nToday: 9:00 am - 5:00 pm\n\nYears in Business icon\n\n**66 Years**\n\nin Business",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_0c95495ca8f0": {
      "evidence_id": "ev_0c95495ca8f0",
      "item_id": "item_ceb693738e73",
      "source_url": "https://www.yellowpages.com/staunton-va/valley-pawn",
      "source_title": "Best 6 Valley Pawn in Staunton, VA | The Real Yellow Pages\u00ae",
      "retrieved_at": "2026-09-08T11:18:50.453602Z",
      "snippet": "The Real Yellow Pages logo The Real Yellow Pages logo\n\nFind a business\n\nFind a business\n\nWhere?\n\n* Use my location\n\nFind\n\n \u2022 \n\nMore\n\nFind People Icon Find People [Explore Cities Icon Explore Cities](https://www.yellowpages.com/sitemap) [Get the App Icon Get the App!](https://www.yellowpages.com/yp-app) [Advertise with Us Icon Advertise with Us](https://www.yellowpages.com/marketing-services?from=advertise-with-us-YP)\n\nPlease note our privacy policy has changed. To view the policy, please go to <https://www.thryv.com/privacy/>\n\nHome VA Staunton Pawnbrokers\n\n# Valley Pawn in Staunton, VA\n\nSort: Default\n\n* Default\n* Distance\n* Rating\n* Name (A - Z)\n\nValley Pawn - Pawnbrokers\n\n## 1\\. Valley Pawn\n\n[Pawnbrokers](https://www.yellowpages.com/staunton-va/pawnbrokers)\n\n[Website](http://www.thevalleypawn.com)\n\nYears in Business Icon\n\n**28 Years**\n\nin Business\n\n(540) 885-0018\n\n817 Richmond Ave\n\nStaunton, VA 24401\n\nopen now\n\nValley Pawn - Pawnbrokers\n\n## 2\\. Valley Pawn\n\n[Pawnbrokers](https://www.",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_b38844073a2f": {
      "evidence_id": "ev_b38844073a2f",
      "item_id": "item_4f29daeee2b1",
      "source_url": "https://defunct-brands.fandom.com/wiki/Golden_Bear_Family_Restaurant",
      "source_title": "Golden Bear Family Restaurant | Defunct Brands Wiki | Fandom",
      "retrieved_at": "2026-09-08T11:18:47.286863Z",
      "snippet": "Golden Bear Family Restaurant | Defunct Brands Wiki | Fandom\nParent company Montgomery Ward, most likely due to financial issues and wanting to mainstream operations, announced plans to sell the entire Golden Bear chain",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_76281707689f": {
      "evidence_id": "ev_76281707689f",
      "item_id": "item_4f29daeee2b1",
      "source_url": "https://trademarks.justia.com/owners/golden-bear-family-restaurants-inc-106933/",
      "source_title": "GOLDEN BEAR FAMILY RESTAURANTS, INC. Trademarks :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:47.286892Z",
      "snippet": "[Individuals](https://www.justia.com/individuals/) Arrow\n\n* [Bankruptcy](https://www.justia.com/bankruptcy/)\n* [Criminal](https://www.justia.com/criminal/)\n* [Divorce](https://www.justia.com/family/divorce/)\n* [DUI](https://www.justia.com/criminal/drunk-driving-dui-dwi/)\n* [Estate Planning](https://www.justia.com/estate-planning/)\n* [Family Law](https://www.justia.com/family/)\n* [Personal Injury](https://www.justia.com/injury/)\n* [More...](https://www.justia.com/individuals/)\n\n[Business](https://www.justia.com/business/) Arrow\n\n* [Business Formation](https://www.justia.com/business-operations/starting-your-own-business/)\n* [Business Operations](https://www.justia.com/business-operations/)\n* [Employment](https://www.justia.com/employment/)\n* [Intellectual Property](https://www.justia.com/intellectual-property/)\n* [International Trade](https://www.justia.com/international-law/international-trade-law/)\n* [Real Estate](https://www.justia.",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_8731fb049f77": {
      "evidence_id": "ev_8731fb049f77",
      "item_id": "item_4f29daeee2b1",
      "source_url": "https://www.dnb.com/business-directory/company-profiles.golden_bear_restaurant_group.5a8e47f16b69b66d9a2db836eb34af16.html",
      "source_title": "Golden Bear Restaurant Group Company Profile | Redding, California | Competitors, Financials & Contacts - Dun & Bradstreet",
      "retrieved_at": "2026-09-08T11:18:47.286908Z",
      "snippet": "Find company research, competitor information, contact details &amp; financial data for Golden Bear Restaurant Group of Redding, California. Get the latest business insights from Dun &amp; Bradstreet.",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_1b0f1d89b26d": {
      "evidence_id": "ev_1b0f1d89b26d",
      "item_id": "item_4f29daeee2b1",
      "source_url": "https://trademarks.justia.com/741/66/golden-bear-74166954.html",
      "source_title": "GOLDEN BEAR Trademark - Serial Number 74166954",
      "retrieved_at": "2026-09-08T11:18:47.286921Z",
      "snippet": "GOLDEN BEAR Trademark - Serial Number 74166954\nGOLDEN BEAR is a trademark of GOLDEN BEAR INTERNATIONAL, INC.. \"GOLDEN BEAR\" is the nickname of Jack Nicklaus, a living",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_8b2714120ec9": {
      "evidence_id": "ev_8b2714120ec9",
      "item_id": "item_4f29daeee2b1",
      "source_url": "https://www.trademarkia.com/owners/golden-bear-family-restaurants-inc",
      "source_title": "Golden Bear Family Restaurants Inc.: details of the 13 ...",
      "retrieved_at": "2026-09-08T11:18:47.286932Z",
      "snippet": "com/#) [Copyright Owner Search Browse through the owners of copyrights registered](https://www.copyrightable.com/search/owners?q=a)\n\n[Search Copyright by Category Browse through different categories of copyright works](https://www.copyrightable.com/search-copyright-by-category)\n\nIncorporations\n\nIncorporate your business today\n\nIncorporate your business with\n\nStart a Business\n\nLegal Forms for Business\n\n* * *\n\n[Form a LLC Popular option for business owners](https://www.incdecentral.com/) [Form a C Corporation Best for big business establishments](https://www.incdecentral.com/) [Form a S Corporation For growing businesses to save taxes](https://www.incdecentral.com/) [Form a Non Profit For business focused on helping the world](https://www.incdecentral.com/) Beneficial Ownership Information Registration Ownership registration to meet CTA compliance\n\nBusiness Forms Real Estate Forms Family and Personal Forms Legal Forms Directory\n\nDomains\n\nSearch, register and resolve domain matters\n\n...\n\ncom/#) [Copyright Owner Search Browse through the owners of copyrights registered](https://www.copyrightable.com/search/owners?q=a)\n\n[Search Copyright by Category Browse through different categories o",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_16f32e053ff2": {
      "evidence_id": "ev_16f32e053ff2",
      "item_id": "item_4f29daeee2b1",
      "source_url": "https://www.trademarkia.com/golden-bear-72373324",
      "source_title": "GOLDEN BEAR Trademark | Trademarkia",
      "retrieved_at": "2026-09-08T11:18:47.286944Z",
      "snippet": "com/#) [Copyright Owner Search Browse through the owners of copyrights registered](https://www.copyrightable.com/search/owners?q=a)\n\n[Search Copyright by Category Browse through different categories of copyright works](https://www.copyrightable.com/search-copyright-by-category)\n\nIncorporations\n\nIncorporate your business today\n\nIncorporate your business with\n\nStart a Business\n\nLegal Forms for Business\n\n* * *\n\n[Form a LLC Popular option for business owners](https://www.incdecentral.com/) [Form a C Corporation Best for big business establishments](https://www.incdecentral.com/) [Form a S Corporation For growing businesses to save taxes](https://www.incdecentral.com/) [Form a Non Profit For business focused on helping the world](https://www.incdecentral.com/) Beneficial Ownership Information Registration Ownership registration to meet CTA compliance\n\nBusiness Forms Real Estate Forms Family and Personal Forms Legal Forms Directory\n\nDomains\n\nSearch, register and resolve domain matters\n\n...\n\ncom/#) [Copyright Owner Search Browse through the owners of copyrights registered](https://www.copyrightable.com/search/owners?q=a)\n\n[Search Copyright by Category Browse through different categories o",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_ea09aa0ae082": {
      "evidence_id": "ev_ea09aa0ae082",
      "item_id": "item_4f29daeee2b1",
      "source_url": "https://www.goldenbearlargo.com/",
      "source_title": "Golden Bear Restaurant | Discover Your Next Favorite Diner ...",
      "retrieved_at": "2026-09-08T11:18:47.286955Z",
      "snippet": "Golden Bear Restaurant | Discover Your Next Favorite Diner ...\nGolden Bear Restaurant is a family-owned breakfast and lunch diner on Starkey Road, serving homestyle American comfort food, bottomless coffee, and friendly",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_7d73266f6c2a": {
      "evidence_id": "ev_7d73266f6c2a",
      "item_id": "item_4f29daeee2b1",
      "source_url": "https://www.manta.com/c/mhhwqvs/golden-bear-restaurant-company-iii-llc",
      "source_title": "Golden Bear Restaurant Company Iii LLC - San Francisco ... Manta Business Directory https://www.manta.com \u203a ... \u203a Restaurants \u203a Restaurants",
      "retrieved_at": "2026-09-08T11:18:47.286966Z",
      "snippet": "Golden Bear Restaurant Company Iii LLC - San Francisco",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_fde3361a1f3d": {
      "evidence_id": "ev_fde3361a1f3d",
      "item_id": "item_ceb6a70b34d4",
      "source_url": "https://en.wikipedia.org/wiki/Gene_Austin",
      "source_title": "Gene Austin - Wikipedia",
      "retrieved_at": "2026-09-08T11:18:47.375854Z",
      "snippet": "Lemeul Eugene Lucas (June 24, 1900 ... name <strong>Gene</strong> <strong>Austin</strong>, was an American singer and songwriter, one of the early &quot;crooners&quot;. His recording of &quot;My Blue Heaven&quot; sold over 5 million copies and was for a while the largest selling record of all time. His 1920s compositions &quot;When My Sugar Walks Down the Street&quot; and &quot;The Lonesome Road&quot; became pop and jazz standards. <strong>Austin</strong> <strong>was</strong> <strong>born</strong> as Lemeul",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_d7e087b965bf": {
      "evidence_id": "ev_d7e087b965bf",
      "item_id": "item_ceb6a70b34d4",
      "source_url": "https://www.tshaonline.org/handbook/entries/austin-gene",
      "source_title": "Gene Austin: The Crooner of the 1920s and 1930s",
      "retrieved_at": "2026-09-08T11:18:47.375969Z",
      "snippet": "Through exhibitions, programs, educational initiatives, and community events across Texas, Texas America250 encourages celebration, reflection, and commemoration at both local and statewide levels. At the Texas State Historical Association, we are proud to support this important moment through our mission-driven work in history education and public engagement, including Texas History Day, and we invite students, educators, and communities to explore this milestone in meaningful ways.\n\n\u201c\n\n> On July 4, 2026, we will celebrate the 250th anniversary of the adoption of the Declaration of Independence and the birth of the greatest nation in the history of the world. \u201cWe hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.\u201d Long may these ideals live in the heart of every Texan and every American.",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_bdac6887fcc8": {
      "evidence_id": "ev_bdac6887fcc8",
      "item_id": "item_ceb6a70b34d4",
      "source_url": "https://syncopatedtimes.com/lemuel-eugene-lucas-austin/",
      "source_title": "Gene Austin - The Syncopated Times",
      "retrieved_at": "2026-09-08T11:18:47.375991Z",
      "snippet": "Gene Austin died on <strong>January 24, 1972</strong>.",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_daa708038656": {
      "evidence_id": "ev_daa708038656",
      "item_id": "item_ceb6a70b34d4",
      "source_url": "https://www.hollyfuneralhome.com/obituaries/gene-austin",
      "source_title": "Hollyfuneralhome",
      "retrieved_at": "2026-09-08T11:18:47.376009Z",
      "snippet": "---\ndescription: Read the obituary of Gene Austin from Waupaca, WI. Leave your condolences and send flowers to the family to show you care.\ntitle: Gene Austin\nimage: https://cdn.f1connect.net/photo/tributes/t/9/r/600x314/2026771/Gene-Austin-profile.jpg\n---\n\n![Gene Austin](https://cdn.f1connect.net/photo/tributes/t/8/2026771/Gene-Austin-profile.jpg?w=3840&h=0&q=75)\n\n# Gene Austin\n\nBirth date: Sep 24, 1937 \\- Death date: Feb 17, 2012\n\nGene (Geno) Austin Gene Austin died peacefully, surrounded by family, on Friday, February 17, 2012, at Theda Clark Medical Center in Neenah, Wisconsin after a courageous 12 year battle with cancer. Gene was born on September 24, 1 [Read Obituary](https://www.hollyfuneralhome.com/obituaries/gene-austin/obituary)\n\nLoading... Memories\n\nLoading... Contributors\n\nLoading... Trees Planted\n\nShare\n\n[Tribute Wall](https://www.hollyfuneralhome.com/obituaries/gene-austin)[Obituary](https://www.hollyfuneralhome.com/obituaries/gene-austin/obituary)[Events](https://www.",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_a666ca4ebdb3": {
      "evidence_id": "ev_a666ca4ebdb3",
      "item_id": "item_ceb6a70b34d4",
      "source_url": "https://www.legacy.com/obituaries/name/gene-austin-obituary?pid=185628934",
      "source_title": "Gene Austin Obituary (1938 - 2017) - Portland, OR - The Oregonian",
      "retrieved_at": "2026-09-08T11:18:47.376025Z",
      "snippet": "We'll help you find the right words to comfort your family member or loved one during this difficult time.\n\n[Read more](https://www.legacy.com/advice/funeral-flower-messages-what-to-say-in-a-sympathy-card/)\n\n[](https://www.legacy.com/advice/funeral-poems-for-loved-ones/)\n\n##### Poems of Mourning and Comfort\n\nThe best poems for funerals, memorial services, and cards.\n\n[Read more](https://www.legacy.com/advice/funeral-poems-for-loved-ones/)\n\n[View All](https://www.legacy.com/tag/offer-sympathy-and-support/)\n\n###### Resources to help you cope with loss\n\n[](https://www.legacy.com/advice/coping-with-grief-and-loss/)\n\n##### How to Cope With Grief\n\nInformation and advice to help you cope with the death of someone important to you.\n\n[Read more](https://www.legacy.com/advice/coping-with-grief-and-loss/)\n\n[](https://www.legacy.com/advice/estate-settlement-guide/)\n\n##### Estate Settlement Guide",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_0dcdee7c9e35": {
      "evidence_id": "ev_0dcdee7c9e35",
      "item_id": "item_ceb6a70b34d4",
      "source_url": "https://gov.texas.gov/music/page/misappropriation_and_right_of_publicity",
      "source_title": "Misappropriation and Right of Publicity",
      "retrieved_at": "2026-09-08T11:18:47.376043Z",
      "snippet": "* [Home](https://gov.texas.gov/music)\n* [Resources](https://gov.texas.gov/music/page/resources)\n* [Music Business Guides](https://gov.texas.gov/music/page/music_business_guides)\n* [Misappropriation and Right of Publicity](https://gov.texas.gov/music/page/misappropriation_and_right_of_publicity)\n\n# Misappropriation and Right of Publicity\n\nTexas Music Office\n\n# Misappropriation and Right of Publicity\n\nShort FAQ guide on misappropriation of name/likeness and Texas Right of Publicity.\n\nFAQ\n\nWhat is \u201cmisappropriation of name and likeness\u201d and how does it affect me?\n\nMisappropriation is using someone\u2019s identity (name, image, voice, or other recognizable traits) for an advantage\u2014most often in advertising or commercial promotion\u2014without permission.\n\nExample: using a sound-alike voice or a recognizable catchphrase to suggest endorsement. What can I recover in a misappropriation lawsuit?\nRecoveries can vary, but may include non-monetary harms (like mental anguish) and economic losses (like past/future wages), depending on the facts of the case. What is the Right of Publicity?\n\nIn Texas, the Right of Publicity is a property right connected to controlling commercial use of a deceased person\u2019s",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_f9223125a450": {
      "evidence_id": "ev_f9223125a450",
      "item_id": "item_ceb6a70b34d4",
      "source_url": "https://www.howold.co/person/gene-austin",
      "source_title": "Gene Austin - Age, Birthday, Biography, Movies, Albums & Facts | HowOld.co",
      "retrieved_at": "2026-09-08T11:18:47.376061Z",
      "snippet": "Gene Austin was born on June 24, 1900 (died on <strong>January 24, 1972</strong>, he was 71 years old) in as Lemeul Eugene Lucas. Gene Austin, American singer and songwriter (1900-1972) Texas, Cooke County Texas, Gainesville Texas, United ... No, he died on 01/24/1972, 53 years ago.",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_66a9773d0d55": {
      "evidence_id": "ev_66a9773d0d55",
      "item_id": "item_ceb6a70b34d4",
      "source_url": "https://www.beaconjournal.com/obituaries/pwoo1100078",
      "source_title": "Gene Austin Obituary - Akron Beacon Journal",
      "retrieved_at": "2026-09-08T11:18:47.376076Z",
      "snippet": "Gene Austin, 85 of Kenmore, was born on June 19, 1939, and passed away on <strong>February 19, 2025</strong>. The first half of his working career he drove a truck for the Teamsters for many years, and the second half he painted houses.",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_e8557cf9f6c3": {
      "evidence_id": "ev_e8557cf9f6c3",
      "item_id": "item_8558fc24473b",
      "source_url": "https://uspto.report/TM/78569965",
      "source_title": "VOSS - Voss Industries, Inc. Trademark Registration",
      "retrieved_at": "2026-09-08T11:18:47.459482Z",
      "snippet": "The mark is comprised the literal matter &quot;VOSS&quot; in blue lettering with black outline, and white horizontal lines cutting through the mark&#x27;s lettering.",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_2e55a534d2dd": {
      "evidence_id": "ev_2e55a534d2dd",
      "item_id": "item_8558fc24473b",
      "source_url": "https://leadiq.com/c/voss--associates/5a1dce6e2300005b00d5abcd",
      "source_title": "Voss & Associates Company Overview, Contact Details & Competitors | LeadIQ",
      "retrieved_at": "2026-09-08T11:18:47.459565Z",
      "snippet": "Education Sector Focus Voss &amp; Associates <strong>specializes exclusively in the education marketplace</strong>, providing tailored communication and marketing services to school districts, associations, and educational nonprofits, which presents opportunities for solutions targeting education-specific stakeholder",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_fb2c7f485c26": {
      "evidence_id": "ev_fb2c7f485c26",
      "item_id": "item_8558fc24473b",
      "source_url": "https://www.bbb.org/us/ne/lincoln/profile/professional-engineer/voss-associates-inc-0714-216001920",
      "source_title": "Voss & Associates, Inc. | BBB Business Profile | Better Business Bureau",
      "retrieved_at": "2026-09-08T11:18:47.459587Z",
      "snippet": "... This company <strong>provides architectural, professional and structural engineering, architectural restoration, blueprinting, construction document preparation and frozen pipe repair services</strong>.",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_ac171889b52e": {
      "evidence_id": "ev_ac171889b52e",
      "item_id": "item_8558fc24473b",
      "source_url": "https://www.crunchbase.com/organization/voss-and-associates",
      "source_title": "Voss and Associates - Crunchbase Company Profile & Funding",
      "retrieved_at": "2026-09-08T11:18:47.459605Z",
      "snippet": "Resources Advanced Search\n\nStart Free Trial Talk With Sales Pricing \n\n Voss and Associates CB Rank 3059707 Heat Score 60\n\nSave Actions\n\nVoss and Associates provides marketing, video production, and traditional media services.\n\nFounded obfuscated\n\nobfuscation Private Jacksonville , Florida , United States 1-10 [vossandassociates.net](https://vossandassociates.net \"vossandassociates.net\") [](https://www.facebook.com/communicatingeducation \"View on Facebook\") [](https://www.linkedin.com/company/be-there \"View on LinkedIn\")\n\nAdvertising Marketing Training Video\n\nVoss and Associates\n\nSection: Overview Actions\n\n* Overview\n* Predictions & Insights\n  \n  Growth Outlook\n* Market Intelligence\n* People\n  \n  Profiles & Contacts\n* Technology\n  \n  Tech Details\n* Lists Featuring This Company\n* Frequently Asked Questions\n\nOverview\n\nVoss and Associates\n\nHeat Score 60 Unlock best-in-class private company insights with Crunchbase Pro\n\n* Get real-time funding and financial data",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_1405649237ae": {
      "evidence_id": "ev_1405649237ae",
      "item_id": "item_8558fc24473b",
      "source_url": "https://www.linkedin.com/company/be-there",
      "source_title": "Voss & Associates",
      "retrieved_at": "2026-09-08T11:18:47.459622Z",
      "snippet": "With 25 years of experience exclusively in the education marketplace, Voss &amp; Associates has established a reputation as the foremost leader in communicating education. Connect with us today to learn more. vossandassociates.net EXPECT THESE KINDS OF RESULTS: GAIN PUBLIC SUPPORT. Solicit parent and business involvement, volunteerism, foundation dollars and support for policies that deal with discipline, testing and student codes.",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_041a684dc51e": {
      "evidence_id": "ev_041a684dc51e",
      "item_id": "item_8558fc24473b",
      "source_url": "https://vossandassociates.net/",
      "source_title": "Voss & Associates",
      "retrieved_at": "2026-09-08T11:18:47.459638Z",
      "snippet": "David R. Voss, President, and Melanie Snow, CEO, lead the company. ... Voss &amp; Associates has been <strong>communicating education since 1999</strong>, representing school districts, education associations, non-profit organizations and for-profit companies offering services and products to educators.",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_053dd0377a83": {
      "evidence_id": "ev_053dd0377a83",
      "item_id": "item_8558fc24473b",
      "source_url": "https://www.adrforum.com/domaindecisions/1114705.htm",
      "source_title": "Voss Signs, LLC. v Texas International Property Associates",
      "retrieved_at": "2026-09-08T11:18:47.459656Z",
      "snippet": "the stock and custom-printed signmarkets, these marks designate Voss Signs, LLC\nas the source of goods associated with the marks;\n\n\u00b7 Complainant owns and operates the website at\n<vosssigns.com> for commercial sales;\n\n\u00b7 The disputed domain name **<vossigns.com>** is\nconfusingly similar to Complainant\u2019s common law trademarks;\n\n\u00b7 Respondent has no rights or legitimate interests\nin respect of **<vossigns.com>** ;\n\n\u00b7 Respondent has registered **<vossigns.com>** in bad faith and is being used in bad\nfaith.\n\nB. Respondent\n\n\u00b7 Complainant has no registered trademark and has\nfailed to show that a common law right to the mark it is claiming existed at\nthe time of the registration of the disputed domain name;\n\n\u00b7 Disputed domain name **<vossigns.com>** is composed of two parts: the commonly used\nacronym \u201cVOS\u201d and the generic dictionary word \u201csigns.\u201d It is not the result of a typographical\nerror;\n\n\u00b7 Respondent has rights and a legitimate interest\nin respect of the domain name. Respondent\n\n...\n\nThere are two parts\nto the first element under Policy \u00b6 4(a )( i). Firstly, the Complainant must have rights in\na trademark or service mark. Secondly,\nthe domain name registered by the Respondent must be i",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_eb0968ead146": {
      "evidence_id": "ev_eb0968ead146",
      "item_id": "item_8558fc24473b",
      "source_url": "https://www.zoominfo.com/c/voss--associates-inc/345680973",
      "source_title": "VOSS & ASSOCIATES - Overview, News & Similar companies | ZoomInfo.com",
      "retrieved_at": "2026-09-08T11:18:47.459671Z",
      "snippet": "VOSS ASSOCIATES Inc. is a structural engineering firm based in Lincoln, NE, <strong>established in 1994</strong>. The company offers comprehensive structural design services for various building types, including schools, gymnasiums, commercial and heavy industrial buildings. With a team of experienced engineers",
      "relevance_note": "Retrieved to establish real_entity_exists, sector, trademark_status.",
      "confidence": null
    },
    "ev_da04c1380dd1": {
      "evidence_id": "ev_da04c1380dd1",
      "item_id": "item_320649948473",
      "source_url": "https://trademarks.justia.com/743/36/submariner-74336069.html",
      "source_title": "SUBMARINER Trademark of Rolex Watch U.S.A., Inc.",
      "retrieved_at": "2026-09-08T11:18:48.038970Z",
      "snippet": "[Justia](https://www.justia.com) Trademarks Categories Jewelry SUBMARINER - Trademark Details\n\n**SUBMARINER - Trademark Details**\n\n_Status:_ 800 - Registered And Renewed\n\nImage for trademark with serial number 74336069\n\n**Serial Number**\n\n74336069\n\n**Registration Number**\n\n1782604\n\n**Word Mark**\n\nSUBMARINER\n\n**Status**\n\n**800** \\- Registered And Renewed\n\n**Status Date**\n\n2013-07-02\n\n**Filing Date**\n\n1992-12-02\n\n**Registration Number**\n\n1782604\n\n**Registration Date**\n\n1993-07-20\n\n**Mark Drawing**\n\n**1000** \\- Typeset: Word(s)/letter(s)/number(s) Typeset\n\n**Published for Opposition Date**\n\n1993-04-27\n\n**Attorney Name**\n\n[Peter Cousins](https://lawyers.justia.com/search?query=Peter+Cousins&location=)\n\n**Law Office Assigned Location Code**\n\nJ70\n\n**Employee Name**\n\nDUBOIS, SUSAN L\n\n**Statements**\n\n**Goods and Services**\n\nwatches\n\n**Classification Information**\n\n**International Class**\n\n[**014**](https://trademarks.justia.\ncom/international-class-code/014) \\- Precious metals and their alloys and goods in precious metals or coated therewith, not included in other classes; jewellery, precious stones; horological and chronometric instruments. - Precious metals and their alloys and goods in",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_c463af5c1ccb": {
      "evidence_id": "ev_c463af5c1ccb",
      "item_id": "item_320649948473",
      "source_url": "https://www.trademarkia.com/rolex-86835280",
      "source_title": "Trademark Search, Free, for Millions of Registered Trademarks with USPTO | Trademarkia",
      "retrieved_at": "2026-09-08T11:18:48.039005Z",
      "snippet": "The **ROLEX** trademark is filed in the category of Jewelry Products. The company began using the mark in commerce on 30 th Dec 2016. As of 19 Feb 2023, the trademark remains Live/Registered, with a recent status, SECTION 8 & 15-ACCEPTED AND ACKNOWLEDGED. The mark is represented by attorney Stacey Foltz Stark of law firm Stacey Foltz Stark Rolex Watch U.S.A., Inc..\n\nLatest Updates\n\nLive/Registered\n\nTM\n\nLive\n\nStatus as of | 19 Feb 2023\n\nSECTION 8 & 15-ACCEPTED AND ACKNOWLEDGED\n\nView Filing History\n\nTrademark Classes\n\nOwner Contact Info\n\nCorrespondent Contact Info\n\nTrademark Details\n\nFiling History\n\ntrademark classes\n\nSuggest Additional Classes\n\nProduct Class\n\nClass 014\n\nJewelry Products\n\nFirst Use Date (General) 30Dec2016\n\nFirst Use Date (Commerce) 30Dec2016\n\n* * *\n\nWatchesandpartsthereof\n\nowner contact information\n\nView Docket Report\n\n#### R\n\nLast Applicant / Owned By\n\nRolex Watch U.S.A., Inc.\n\nLegal Entity Type\n\nCorporation\n\nUS flag\n\nOwner Address\n\n665 Fifth Avenue\n\nNew York\n\nUS\n\nNY",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_586d8f5c276a": {
      "evidence_id": "ev_586d8f5c276a",
      "item_id": "item_320649948473",
      "source_url": "https://tsdr.uspto.gov/",
      "source_title": "Trademark Status & Document Retrieval",
      "retrieved_at": "2026-09-08T11:18:48.039022Z",
      "snippet": "Registration No Registration Certificates\n\n* Status\n* Documents\n* Maintenance\n\nHelp\")\n\nDownload\n\nContent\n\nStatus\n\nDocuments\n\nPDF\n\nOriginal\n\nPrint Preview\n\nBack to Search\n\nPrint\n\n* \n* \n*\n\n[Download Adobe Reader](http://get.adobe.com/reader/)\n\n  \nIf you are the applicant or the applicant's attorney and have questions about this\nfile, please contact\nthe [Trademark Assistance Center](mailto:TrademarkAssistanceCenter@uspto.gov)\n\n|Image |Mark |Ser No |Reg No |Status |Filing |Owner |Class(es) |Goods and Services |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n|Image |Mark |Ser No |Reg No |Status |Filing |Owner |Class(es) |Goods and Services |\n\n|Image |Mark |IR No |IR Date |Ser No |Ref No |Owner |Class(es) |Goods and Services |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n|Image |Mark |IR No |IR Date |Ser No |Ref No |Owner |Class(es) |Goods and Services |\n\n|Reference No. |Filing Date |Intl Reg No. |Intl Reg Date |Status |\n| --- | --- | --- | --- | --- |\n|Reference No.",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_af6927b940ef": {
      "evidence_id": "ev_af6927b940ef",
      "item_id": "item_320649948473",
      "source_url": "https://www.thefashionlaw.com/trademark-board-says-rolex-gained-no-rights-from-public-use-of-milsub-2",
      "source_title": "Trademark Board Says No Rights for Rolex in \"MilSub ...",
      "retrieved_at": "2026-09-08T11:18:48.039043Z",
      "snippet": "In a recently-issued decision, the U.S. Patent and Trademark Office (\u201cUSPTO\u201d)\u2019s Trademark Trial and Appeal Board denied Rolex\u2019s bid to cancel watch brand Mark Kiger\u2019s registration for \u201cMILSUB\u201d for use on watches, finding that while the media and watch enthusiasts have referred to two of Rolex\u2019s Submariner models as \u201cMilSubs,\u201d the watch giant failed to establish sufficient rights in MILSUB to support a Section 2(d) claim under the Trademark Act since it has never actually used the mark in commerce.\n\nSetting the stage in its September 5 [decision](https://ttabvue.uspto.gov/ttabvue/v?pno=92072726) , the Trademark Trial and Appeal Board (\u201cTTAB\u201d) stated that on the heels of the USPTO rejecting Rolex\u2019s April 2019 [application](https://tsdr.uspto.gov/=88408841&caseType=SERIAL_NO&searchType=statusSearch) for registration for \u201cMILSUB\u201d for watches due to its similarity to Kiger\u2019s existing registration, Rolex sought to get Kiger\u2019s registration.",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_06febfc44f34": {
      "evidence_id": "ev_06febfc44f34",
      "item_id": "item_320649948473",
      "source_url": "https://trademarks.justia.com/710/78/rolex-71078904.html",
      "source_title": "ROLEX Trademark of ROLEX WATCH U.S.A., INC. - Registration Number 0101819 - Serial Number 71078904 :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:48.039059Z",
      "snippet": "ROLEX is a trademark of <strong>ROLEX WATCH U.S.A., INC.</strong>. Filed in June 8 (1914), the ROLEX covers WATCHES, CLOCKS, PARTS OF WATCHES AND CLOCKS, AND THEIR CASES",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_6913bb163985": {
      "evidence_id": "ev_6913bb163985",
      "item_id": "item_320649948473",
      "source_url": "https://www.lexology.com/library/detail.aspx?g=753b4281-36ac-450d-bcd0-0d70908feafa",
      "source_title": "Rolex on watch to sink Franck Muller's \u201cMARINER\u201d trade ...",
      "retrieved_at": "2026-09-08T11:18:48.039074Z",
      "snippet": "Nov 18, 2020 \u2014 The IP Adjudicator held that Rolex failed to clock up the requisite evidence to establish that its \u201c SUBMARINER \u201d mark was well-known in Singapore",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_6079744b37f3": {
      "evidence_id": "ev_6079744b37f3",
      "item_id": "item_320649948473",
      "source_url": "https://trademarks.justia.com/788/64/rolex-78864831.html",
      "source_title": "ROLEX Trademark of Rolex Watch USA, Inc. - Registration Number 3312062 - Serial Number 78864831 :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:48.039089Z",
      "snippet": "... 014 - <strong>Precious metals and their alloys and goods in precious metals or coated therewith, not included in other classes; jewellery, precious stones; horological and chronometric instruments</strong>.",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_bc11d50387c6": {
      "evidence_id": "ev_bc11d50387c6",
      "item_id": "item_320649948473",
      "source_url": "https://professionalwatches.com/rolex-milsub-trademark-registration-and-cancellation-rejected",
      "source_title": "Rolex \"MILSUB\" Trademark Registration and Cancellation Rejected | Professional Watches",
      "retrieved_at": "2026-09-08T11:18:48.039103Z",
      "snippet": "com/news/) [Rolex](https://professionalwatches.com/rolex/) [September 15, 2023](https://professionalwatches.com/rolex-milsub-trademark-registration-and-cancellation-rejected/)\n\n## Rolex \u201cMILSUB\u201d Trademark Registration and Cancellation Rejected\n\nT he USPTO (U.S. Patent and Trademark Office) rejected Rolex Watch U.S.A., Inc.\u2019s April 2019 application to register \u201cMILSUB\u201d as a trademark.\n\nAccording to _FashionLaw.com_ , the trademark was rejected because of its similarity to watch brand Mark Kiger\u2019s existing registration of the term. By November 2019, Rolex lawyers were officially trying to obtain Kiger\u2019s registration. The basis of the cancellation proceeding was that it maintains common law rights in the mark that predate Kiger\u2019s rights/registration, as consumers and the media refer to the two dive watch models that it crafted for the United Kingdom Ministry of Defense in the 1970s as \u201cMilSubs.\u201d\n\nThe Rolex Submariner Milsubs were produced in three references (Ref.",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_38e596a96a9a": {
      "evidence_id": "ev_38e596a96a9a",
      "item_id": "item_74eabfebbb60",
      "source_url": "https://guitar.com/features/opinion-analysis/gibson-es-335-trademark-legal-battle/",
      "source_title": "Is the ES-335 trademark fight Gibson's biggest legal battle yet?",
      "retrieved_at": "2026-09-08T11:18:48.648177Z",
      "snippet": "So over the course of the 1990s, ... 1996, Gibson also secured a trademark registration on the ES-335 body shape (<strong>US Trademark Reg No 2007277</strong>), however it was only able to obtain it on what\u2019s known as the Supplemental Register",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_793556b1afb0": {
      "evidence_id": "ev_793556b1afb0",
      "item_id": "item_74eabfebbb60",
      "source_url": "https://en.wikipedia.org/wiki/Gibson_ES-335",
      "source_title": "Gibson ES-335",
      "retrieved_at": "2026-09-08T11:18:48.648220Z",
      "snippet": "Gibson ES-335\nThe Gibson ES-335 is a semi-hollow body semi-acoustic guitar introduced by the Gibson Guitar Corporation as part of its ES (Electric Spanish) series in 1958.",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_39a0a8f3028c": {
      "evidence_id": "ev_39a0a8f3028c",
      "item_id": "item_74eabfebbb60",
      "source_url": "https://trademarks.justia.com/737/55/gibson-73755657.html",
      "source_title": "GIBSON Trademark of GIBSON BRANDS, INC. - Registration Number 1545311 - Serial Number 73755657 :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:48.648239Z",
      "snippet": "Class Status Date \u00b7 1988-10-18 \u00b7 Primary Code \u00b7 015 \u00b7 First Use Anywhere Date \u00b7 1890-01-01 \u00b7 First Use In Commerce Date \u00b7 1890-01-01 \u00b7 Current Trademark Owners \u00b7 Party Name \u00b7 GIBSON BRANDS, INC. Party Type \u00b7 32 - 2nd New Owner Entered After Registration \u00b7",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_9e343d542d92": {
      "evidence_id": "ev_9e343d542d92",
      "item_id": "item_74eabfebbb60",
      "source_url": "https://uspto.report/TM/90606654",
      "source_title": "GIBSON - Gibson Brands, Inc. Trademark Registration",
      "retrieved_at": "2026-09-08T11:18:48.648254Z",
      "snippet": "# GIBSON\n\n## Gibson Brands, Inc.\n\n1. [USPTO Trademarks](https://uspto.report/TM/)\n\u203a2. [Gibson Brands, Inc.](https://uspto.report/company/Gibson-Brands-Inc)\n\u203a3. [Gibson Application #90606654](https://uspto.report/TM/90606654/)\n\nApplication Filed: 2021-03-26\n\nTrademark Application Details\n\nTrademark Logo GIBSON\n\nThe mark consists of a three-dimensional configuration comprising the product design of the stylized word element GIBSON appearing on a uniquely-shaped guitar headstock, with a uniquely-shaped guitar body. Elements shown in broken lines are not part of the mark and serve only to show the position or placement of the mark.\n\nMark For: GIBSON\u00ae trademark registration is intended to cover the categories of musical instruments, namely, guitars.\n\n#### Status\n\n2021-03-31 UTC  \n\u27f3 Refresh\n\nLIVE APPLICATION Awaiting Examination\n\nThe trademark application has been accepted by the Office (has met the minimum filing requirements) and has not yet been assigned to an examiner.\n\n...\n\n| --- | --- | --- |\n|NEW APPLICATION ENTERED IN TRAM |2021-03-30 | |\n\n|Mark Image  \nRegistration | Serial |Company\n\nTrademark  \nApplication Date |\n| --- | --- |\n|GIBSON GIBSON 98653596 not registered Live/Pending",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_b92fc54bd7f2": {
      "evidence_id": "ev_b92fc54bd7f2",
      "item_id": "item_74eabfebbb60",
      "source_url": "https://trademarks.justia.com/736/75/n-73675665.html",
      "source_title": "Trademark of GIBSON GUITAR CORP. - Registration Number 1782606 - Serial Number 73675665 :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:48.648269Z",
      "snippet": "[Justia](https://www.justia.com) Trademarks Categories Musical Instruments Image Trademark with Serial Number 73675665\n\n**Image Trademark with Serial Number 73675665**\n\n_Status:_ 800 - Registered And Renewed\n\nImage for trademark with serial number 73675665\n\n**Serial Number**\n\n73675665\n\n**Registration Number**\n\n1782606\n\n**Word Mark**\n\n**Status**\n\n**800** \\- Registered And Renewed\n\n**Status Date**\n\n2013-05-04\n\n**Filing Date**\n\n1987-07-31\n\n**Registration Number**\n\n1782606\n\n**Registration Date**\n\n1993-07-20\n\n**Mark Drawing**\n\n**2T17** \\- Illustration: Drawing or design without any word(s)/letter(s)/ number(s) 50% Reduction\n\n**Design Searches**\n\n**220106** \\- Guitars, banjos, ukuleles.\n\n**Published for Opposition Date**\n\n1989-05-09\n\n**Attorney Name**\n\n[Andrea E. Bates](https://lawyers.justia.com/search?query=Andrea+Bates&location=)\n\n**Law Office Assigned Location Code**\n\nJ40\n\n**Employee Name**\n\nBRUCE, MARY F\n\n**Statements**\n\n**Indication of Colors claimed**\nColor is not claimed as a feature of the mark.\n\n**Description of Mark**\n\nTHE MARK CONSISTS OF A UNIQUELY SHAPED CONFIGURATION FOR THE BODY PORTION OF THE GUITAR AS ILLUSTRATED IN THE DRAWING BY THE SOLID LINES.\n\n**Goods and Services*",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_2179a05a38b9": {
      "evidence_id": "ev_2179a05a38b9",
      "item_id": "item_74eabfebbb60",
      "source_url": "https://trademarks.justia.com/745/70/n-74570078.html",
      "source_title": "Trademark of GIBSON BRANDS, INC. - Registration Number 2053805 - Serial Number 74570078 :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:48.648283Z",
      "snippet": "stringed instruments, namely guitars\n\n**Classification Information**\n\n**International Class**\n\n[**015**](https://trademarks.justia.com/international-class-code/015) \\- Musical instruments. - Musical instruments.\n\n**US Class Codes**\n\n036\n\n**Class Status Code**\n\n**6** \\- Active\n\n**Class Status Date**\n\n1994-12-19\n\n**Primary Code**\n\n015\n\n**First Use Anywhere Date**\n\n1958-12-31\n\n**First Use In Commerce Date**\n\n1958-12-31\n\n**Current Trademark Owners**\n\n**Party Name**\n\nGIBSON BRANDS, INC.\n\n**Party Type**\n\n**31** \\- 1st New Owner Entered After Registration\n\n**Legal Entity Type**\n\n**03** \\- Corporation\n\n**Address**\n\n_Please  with your Justia account to see this address._\n\n**Trademark Owner History**\n\n**Party Name**\n\nGIBSON BRANDS, INC.\n\n**Party Type**\n\n**31** \\- 1st New Owner Entered After Registration\n\n**Legal Entity Type**\n\n**03** \\- Corporation\n\n**Address**\n\n_Please  with your Justia account to see this address._\n\n**Party Name**\n\nGibson Guitar Corp.\n\n**Party Type**",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_9703537b4d05": {
      "evidence_id": "ev_9703537b4d05",
      "item_id": "item_74eabfebbb60",
      "source_url": "https://www.es-335.com/",
      "source_title": "The Gibson ES-335",
      "retrieved_at": "2026-09-08T11:18:48.648297Z",
      "snippet": "The Gibson ES-335\nA 335 could be described as an archtop but semi hollow archtops are another class of guitars altogether. These were the high end of the Gibson line",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_9772ff056239": {
      "evidence_id": "ev_9772ff056239",
      "item_id": "item_74eabfebbb60",
      "source_url": "https://uspto.report/TM/97220501",
      "source_title": "Gibson Brands, Inc. Trademark Registration",
      "retrieved_at": "2026-09-08T11:18:48.648311Z",
      "snippet": "# Trademark Filing\n\n## Gibson Brands, Inc.\n\n1. [USPTO Trademarks](https://uspto.report/TM/)\n\u203a2. [Gibson Brands, Inc.](https://uspto.report/company/Gibson-Brands-Inc)\n\u203a3. [Application #97220501](https://uspto.report/TM/97220501/)\n\nApplication Filed: 2022-01-14\n\nTrademark Application Details\n\nTrademark Logo \n\nThe mark consists of the uniquely shaped body portion of a guitar.\n\nMark For: This trademark registration is intended to cover the categories of downloadable multimedia file containing artwork, text, audio, and video relating to music and entertainment authenticated by non-fungible tokens. [[all]]()\n\n>Color is not claimed as a feature of the mark. The mark consists of the uniquely shaped body portion of a guitar.\n\n#### Status\n\n2022-01-31 UTC  \n\u27f3 Refresh\n\nLIVE APPLICATION Awaiting Examination\n\nThe trademark application has been accepted by the Office (has met the minimum filing requirements) and has not yet been assigned to an examiner.\n\n  \n  \n|Research |[](https://en.wikipedia.",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_fc93b5f61002": {
      "evidence_id": "ev_fc93b5f61002",
      "item_id": "item_ab7298e47bca",
      "source_url": "https://trademarks.justia.com/700/22/coca-70022406.html",
      "source_title": "COCA-COLA Trademark of Coca Cola Company, The",
      "retrieved_at": "2026-09-08T11:18:48.450072Z",
      "snippet": "com/international-class-code/032) \\- Beers; mineral and aerated waters and other non-alcoholic drinks; fruit drinks and fruit juices; syrups and other preparations for making beverages. - Beers; mineral and aerated waters and other non-alcoholic drinks; fruit drinks and fruit juices; syrups and other preparations for making beverages.\n\n**US Class Codes**\n\n045\n\n**Class Status Code**\n\n**6** \\- Active\n\n**Class Status Date**\n\n1999-11-02\n\n**Primary Code**\n\n045\n\n**First Use Anywhere Date**\n\n1887-06-28\n\n**First Use In Commerce Date**\n\n1887-06-28\n\n**Current Trademark Owners**\n\n**Party Name**\n\nCoca Cola Company, The\n\n**Party Type**\n\n**40** \\- 10th New Owner Entered After Registration\n\n**Legal Entity Type**\n\n**03** \\- Corporation\n\n**Address**\n\n_Please  with your Just",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_cd99a151f6a8": {
      "evidence_id": "ev_cd99a151f6a8",
      "item_id": "item_ab7298e47bca",
      "source_url": "https://trademarks.justia.com/720/69/coca-cola-72069873.html",
      "source_title": "COCA-COLA Trademark of COCA-COLA COMPANY, THE - Registration Number 0696147 - Serial Number 72069873 :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:48.450113Z",
      "snippet": "THE TRADEMARK CONSISTS OF THE DISTINCTIVELY SHAPED CONTOUR, OR CONFIRMATION, AND DESIGN OF THE BOTTLE AS SHOWN\n\n**Goods and Services**\n\nCARBONATED SOFT DRINK\n\n**Classification Information**\n\n**International Class**\n\n[**032**](https://trademarks.justia.com/international-class-code/032) \\- Beers; mineral and aerated waters and other non-alcoholic drinks; fruit drinks and fruit juices; syrups and other preparations for making beverages. - Beers; mineral and aerated waters and other non-alcoholic drinks; fruit drinks and fruit juices; syrups and other preparations for making beverages.\n\n**US Class Codes**\n\n045\n\n**Class Status Code**\n\n**6** \\- Active\n\n**Class Status Date**\n\n1999-11-02\n\n**Primary Code**\n\n045\n\n**First Use Anywhere Date**\n\n1916-07-08\n\n**First Use",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_ec8dd106497a": {
      "evidence_id": "ev_ec8dd106497a",
      "item_id": "item_ab7298e47bca",
      "source_url": "https://www.tramatm.com/trademark-hall-of-fame/coca-cola",
      "source_title": "Trademarks held by Coca-Cola | Trademark Hall of Fame",
      "retrieved_at": "2026-09-08T11:18:48.450131Z",
      "snippet": "Trademarks held by Coca-Cola | Trademark Hall of Fame\n.Coca-Cola's first trademark was registered on January 31, 1893. The trademark was for the distinctive script logo of the name \"Coca-Cola\" Registration number:",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_98b7bfe50f74": {
      "evidence_id": "ev_98b7bfe50f74",
      "item_id": "item_ab7298e47bca",
      "source_url": "http://trademarkia.com/coca-cola-78509545",
      "source_title": "COCA-COLA Trademark",
      "retrieved_at": "2026-09-08T11:18:48.450147Z",
      "snippet": "The **COCA-COLA** trademark is filed in the category of Light Beverage Products. The company began using the mark in commerce on 01 st Jan 2003. As of 21 Jun 2017, the trademark remains Live/Registered, with a recent status, REGISTERED AND RENEWED. The mark is represented by attorney Jessica Lewis.\n\nLatest Updates\n\nLive/Registered\n\nTM\n\nLive\n\nStatus as of | 21 Jun 2017\n\nREGISTERED AND RENEWED\n\nView Filing History\n\nTrademark Classes\n\nOwner Contact Info\n\nCorrespondent Contact Info\n\nTrademark Details\n\nFiling History\n\ntrademark classes\n\nSuggest Additional Classes\n\nProduct Class\n\nClass 032\n\nLight Beverage Products\n\nFirst Use Date (General) 15Dec2002\n\nFirst Use Date (Commerce) 01Jan2003\n\n* * *\n\nNon-alcoholic beverages,namely,softdrinks;andsyrupsand concentrates f",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_2964542f70ce": {
      "evidence_id": "ev_2964542f70ce",
      "item_id": "item_ab7298e47bca",
      "source_url": "http://uspto.report/TM/90602002",
      "source_title": "COCA-COLA - The Coca-Cola Company Trademark Registration",
      "retrieved_at": "2026-09-08T11:18:48.450161Z",
      "snippet": "The Coca-Cola Company [USPTO Trademarks](https://uspto.report/TM/) \u203a2. [The Coca-Cola Company](https://uspto.report/company/Coca-Cola-Co) \u203a3. [Coca-cola Application #90602002](https://uspto.report/TM/90602002/) Application Filed: 2021-03-25 Trademark Application Details Trademark Logo COCA-COLA ... Status 2021-12-12 UTC \u27f3 Refresh LIVE APPLICATION Published for Opposition A pending trademark application has been examined by the Office and has been published in a way that provides an opportunity for the public to oppose its registration. ... [OneLook](https://www.onelook.com/?w=%22COCA-COLA%22) [Acronym Finder](https://www.acronymfinder.com/~/search/af.aspx?Acronym=%22COCA-COLA%22&string=exact) | | Serial Number | 90602002 | | Registration Number | 6645905 |",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_99c4ab0f0adb": {
      "evidence_id": "ev_99c4ab0f0adb",
      "item_id": "item_ab7298e47bca",
      "source_url": "https://uspto.report/TM/85240503",
      "source_title": "COCA-COLA - The Coca-cola Company Trademark Registration",
      "retrieved_at": "2026-09-08T11:18:48.450175Z",
      "snippet": "|66A Current |No |\n|Current Basis |No |\n|No Basis |No |\n|Attorney Name |Jessica Lewis |\n|Attorney Docket Number |81209860 |\n|Law Office Assigned |L80 |\n|Employee Name |CARL III, FRED |\n\n### Timeline\n\n|2007-03-14 |Date of First Use |\n| --- | --- |\n|2007-03-14 |Date of Use In Commerce |\n|2011-02-11 |Application Filed |\n|2011-06-14 |Published |\n|2011-06-14 |Published for Opposition |\n|2011-08-30 |Trademark Registered |\n|2017-05-13 |Location: TMEG LAW OFFICE 108 |\n|2017-05-13 |Status: Live/Registered |\n|2018-07-08 |Transaction Date |\n|2021-11-02 |Location: GENERIC WEB UPDATE |\n|2021-11-02 |Status: The registration has been renewed. |\n|2030-08-30 |Maintenance Early File Date |\n|2031-09-02 |Maintenance On Time Date |\n|2032-03-01 |Maintenance Late Fee Date |\n\n###",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_e92672d9d659": {
      "evidence_id": "ev_e92672d9d659",
      "item_id": "item_ab7298e47bca",
      "source_url": "https://trademarks.justia.com/781/96/coca-78196491.html",
      "source_title": "Registration Number 3121372 - Serial Number 78196491",
      "retrieved_at": "2026-09-08T11:18:48.450188Z",
      "snippet": "**Primary Code**\n\n021\n\n**First Use Anywhere Date**\n\n2003-10-27\n\n**First Use In Commerce Date**\n\n2003-10-27\n\n**International Class**\n\n[**028**](https://trademarks.justia.com/international-class-code/028) \\- Games and playthings; gymnastic and sporting articles not included in other classes; decorations for Christmas trees. - Games and playthings; gymnastic and sporting articles not included in other classes; decorations for Christmas trees.\n\n**US Class Codes**\n\n022, 023, 038, 050\n\n**Class Status Code**\n\n**6** \\- Active\n\n**Class Status Date**\n\n2003-01-09\n\n**Primary Code**\n\n028\n\n**First Use Anywhere Date**\n\n2003-09-08\n\n**First Use In Commerce Date**\n\n2003-09-08\n\n**Current Trademark Owners**\n\n**Party Name**\n\nThe Coca-Cola Company\n\n**Party Type**\n\n**30** \\- Ori",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_baa513e991e6": {
      "evidence_id": "ev_baa513e991e6",
      "item_id": "item_ab7298e47bca",
      "source_url": "https://tmng-al.uspto.gov/resting2/api/casedoc/ts/cd/78196491/EXA20060521132353/1/webcontent",
      "source_title": "TRADEMARK APPLICATION NO. 78196491 - COCA-COLA",
      "retrieved_at": "2026-09-08T11:18:48.450202Z",
      "snippet": "TRADEMARK APPLICATION NO. 78196491 - COCA-COLA\nMay 21, 2006 \u2014 SERIAL NO: 78/196491. APPLICANT: The Coca-Cola Company. *78196491*. CORRESPONDENT ADDRESS: Caroline K. Pearlstein. The Coca-Cola Company.",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_3c333bec9f59": {
      "evidence_id": "ev_3c333bec9f59",
      "item_id": "item_7999e01c917c",
      "source_url": "https://www.visualvisitor.com/companies/134422/sunset_boulevard",
      "source_title": "Sunset Boulevard - Phone, Email, Employees, CEO, VP, 2024",
      "retrieved_at": "2026-09-08T11:18:48.770994Z",
      "snippet": "Owner And Operator \u00b7 <strong>Cathrine Bang</strong> \u00b7 Commercial Director \u00b7 What is Sunset Boulevard&#x27;s official website? Sunset Boulevard&#x27;s official website is https://www.sunset-boulevard.dk \u00b7 What is Sunset Boulevard&#x27;s Revenue?",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_467c4a1f7a4b": {
      "evidence_id": "ev_467c4a1f7a4b",
      "item_id": "item_7999e01c917c",
      "source_url": "https://en.wikipedia.org/wiki/Sunset_Boulevard_%28restaurant%29",
      "source_title": "Sunset Boulevard (restaurant)",
      "retrieved_at": "2026-09-08T11:18:48.771032Z",
      "snippet": "|[](https://en.wikipedia.org/wiki/File:Sunset_Boulevard_restaurant.JPG)\n\nA Sunset Boulevard restaurant in [Aarhus](https://en.wikipedia.org/wiki/Aarhus \"Aarhus\") , Denmark |\n| --- | --- |\n|Industry |[Restaurants](https://en.wikipedia.org/wiki/Restaurants \"Restaurants\") |\n|Founded |1996 ; 30 years ago in [Odense](https://en.wikipedia.org/wiki/Odense \"Odense\") , Denmark |\n|Headquarters |[Kolding](https://en.wikipedia.org/wiki/Kolding \"Kolding\") , Denmark |\n|Number of locations |50 (2025) |\n|Areas served |* [Denmark](https://en.wikipedia.org/wiki/Denmark \"Denmark\")\n* [Faroe Islands](https://en.wikipedia.org/wiki/Faroe_Islands \"Faroe Islands\")\n* [Greenland](https://en.wikipedia.org/wiki/Greenland \"Greenland\")\n* [Germany](https://en.wikipedia.org/wiki/Germany \"Germany\") |\n|Key people |Jens Baisner (CEO) |\n|Owner |KD Selskaberne |\n|Number of employees |1,600 (2025) |\n|Website |[sunset-boulevard .dk](https://sunset-boulevard.dk/) |\n**Sunset Boulevard** , also known as just **Sunset** , is a Danish-owned fast-food chain. Founded in 1996, the chain has 50 restaurants across [Denmark](https://en.wikipedia.org/wiki/Denmark \"Denmark\") , the [Faroe Islands](https://en.wikipedia.org/wiki/Faroe_I",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_56145537fbf2": {
      "evidence_id": "ev_56145537fbf2",
      "item_id": "item_7999e01c917c",
      "source_url": "https://sierraiplaw.com/trade-dress/",
      "source_title": "Trade Dress explainer by experienced Trademark Attorneys",
      "retrieved_at": "2026-09-08T11:18:48.771049Z",
      "snippet": "The elements of the restaurant that contributed to the trade dress included the exterior building design and decoration, the signage, and the interior layout and d\u00e9cor. A less tangible, but more famous example of trade dress is the three tones of the NBC chime - see US Trademark Registration No.",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_3e6543595050": {
      "evidence_id": "ev_3e6543595050",
      "item_id": "item_7999e01c917c",
      "source_url": "https://giggster.com/guide/filming/los-angeles",
      "source_title": "Filming in Los Angeles | Film Permits &amp; Locations | Giggster",
      "retrieved_at": "2026-09-08T11:18:48.771064Z",
      "snippet": "Filming In Los Angeles, CA\n\n# Complete Guide to Filming in Los Angeles: Permits, Locations & Requirements\n\n## Production Permit Fees\n\n* Film Permit Application fee: $795\n* Student Permit Fee: $114\n* Permit Rider Fee: $126\n* FilmLA Monitor Fee: $37 per hour\n\n## Minimum Insurance\n\n* General liability for filming\n* Employee liability\n* Watercraft liability\n* Vehicle liability\n* Aircraft liability\n\n## Additional Permits\n\n## Discounts\n\n## About Los Angeles\n\nThere's really nowhere more synonymous with the film industry than the Californian city of Los Angeles. The central nucleus of LA's film industry is of course Hollywood, which has been the epicenter of the film world since moving pictures were first projected onto a screen over a century ago.\nMany of the big-name film production companies have their studios in LA so it's not surprising that the city streets have been used time and time again over the decades as a filming location.\nFrom legendary classics like Sunset Boulevard in the 1950s to blockbuster movies like Die Hard and Blade Runner in the 1980s, The Big Lebowski in the 90s, and the recent smash hit musical, La La Land, Los Angeles has starred in them all.\nChoosing LA as the",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_d283c270cc0c": {
      "evidence_id": "ev_d283c270cc0c",
      "item_id": "item_7999e01c917c",
      "source_url": "https://www.weho.org/city-government/communications/west-hollywood-film-office/apply-for-a-film-permit/film-policies",
      "source_title": "Film Policies | City of West Hollywood",
      "retrieved_at": "2026-09-08T11:18:48.771079Z",
      "snippet": "Applications are also available for download on the Film Office webpage at www.weho.org/film The City\u2019s Film Coordinator will discuss the particulars of your production, and let you know what special conditions will apply, whether or not a Los Angeles County Sheriff\u2019s Deputy is required, and any other information needed to secure the permit.",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_417babcf1d3e": {
      "evidence_id": "ev_417babcf1d3e",
      "item_id": "item_7999e01c917c",
      "source_url": "https://www.bloomberg.com/profile/company/0966283D:US",
      "source_title": "8490 Sunset Boulevard WH Owner LLC - Company Profile and News - Bloomberg Markets",
      "retrieved_at": "2026-09-08T11:18:48.771094Z",
      "snippet": "8490 Sunset Boulevard WH Owner LLC provides construction services. The Company constructs non-residential buildings and other infrastructures.",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_37752c018cf0": {
      "evidence_id": "ev_37752c018cf0",
      "item_id": "item_c28c010c3064",
      "source_url": "https://en.wikipedia.org/wiki/Chateau_Marmont",
      "source_title": "Chateau Marmont",
      "retrieved_at": "2026-09-08T11:18:48.697638Z",
      "snippet": "Chateau Marmont\nSmith, co-founder of Vitagraph Studios, for $750,000. From about 1942 to 1963, the Chateau was owned by Erwin Brettauer, [22] a German banker",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_c9feb5eee135": {
      "evidence_id": "ev_c9feb5eee135",
      "item_id": "item_c28c010c3064",
      "source_url": "https://trademarks.justia.com/875/08/chateau-87508003.html",
      "source_title": "CHATEAU MARMONT Trademark of Group 99, LLC - Registration Number 5880550 - Serial Number 87508003 :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:48.697678Z",
      "snippet": "CHATEAU MARMONT is a trademark of <strong>Group 99, LLC</strong>. Filed in June 27 (2017), the CHATEAU MARMONT covers Hats; Wearable garments and clothing, namely, shirts",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_38f4be96839b": {
      "evidence_id": "ev_38f4be96839b",
      "item_id": "item_c28c010c3064",
      "source_url": "https://www.architecturaldigest.com/gallery/the-chateau-marmont-has-been-home-to-these-famous-guests",
      "source_title": "The Chateau Marmont Has Been Home to These Famous Guests | Architectural Digest",
      "retrieved_at": "2026-09-08T11:18:48.697685Z",
      "snippet": "The Chateau Marmont Has Been Home to These Famous",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_e4620e565ec9": {
      "evidence_id": "ev_e4620e565ec9",
      "item_id": "item_c28c010c3064",
      "source_url": "https://uspto.report/TM/87927540",
      "source_title": "CHATEAU MARMONT - Group 99, LLC Trademark Registration",
      "retrieved_at": "2026-09-08T11:18:48.697690Z",
      "snippet": "&gt;Color is not claimed as a feature of the mark. <strong>The mark consists of the wording &quot;Chateau Marmont&quot; in a stylized font</strong>. ... The trademark application has been registered with the Office.",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_e2d41eaba528": {
      "evidence_id": "ev_e2d41eaba528",
      "item_id": "item_c28c010c3064",
      "source_url": "https://www.justia.com/intellectual-property/trademarks/trade-dress",
      "source_title": "Trade Dress Under the Law | Intellectual Property Law Center",
      "retrieved_at": "2026-09-08T11:18:48.697695Z",
      "snippet": "Trade Dress Under the Law | Intellectual Property Law Center\nOct 15, 2025 \u2014 Only designs and shapes created solely for promotional purposes are protected as trade dress. For example, certain perfume bottles and the boxes",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_851fddca7185": {
      "evidence_id": "ev_851fddca7185",
      "item_id": "item_c28c010c3064",
      "source_url": "https://www.thefilmfund.co/how-to-get-film-permits-and-location-releases/",
      "source_title": "How to Get Film Permits and Location Releases \u2013 The Film Fund",
      "retrieved_at": "2026-09-08T11:18:48.697701Z",
      "snippet": "Categories\n\n[Pre-production](https://www.thefilmfund.co/category/pre-production/) [Producing](https://www.thefilmfund.co/category/producing/)\n\n# How to Get Film Permits and Location Releases\n\nMarch 9, 2020 by Thomas Verdi\n\n\u201cDo I need a film permit\u201d may be high up on your list of questions. Well, if you want to make sure everything is done by the book and avoid headaches or liability down the line, the answer is a resounding yes.\n\nGetting film permits or location releases represents a crucial part of pre-production for your film. It\u2019s always a good idea to adhere to a pre-production checklist, and this should definitely make the list.\n\nIf you\u2019re producing a low-budget short film, it\u2019s always easier to shoot on private property, particularly property that you own. Location is largely an expense you can control. But sometimes you just absolutely need that football stadium or scene in the dog park.\n\n## Contact your film commission.\n\nphiladelphia film commission city hall\nIf you need to film in a well-known, public, or historic site, you will likely need a permit. Your film commission is the first place to go, and they will recommend who specifically you should reach out to in order to",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_9c12642b68bf": {
      "evidence_id": "ev_9c12642b68bf",
      "item_id": "item_c28c010c3064",
      "source_url": "https://www.chateaumarmont.com/",
      "source_title": "Chateau Marmont",
      "retrieved_at": "2026-09-08T11:18:48.697706Z",
      "snippet": "At the legendary",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_2b35279fc768": {
      "evidence_id": "ev_2b35279fc768",
      "item_id": "item_c28c010c3064",
      "source_url": "https://www.hollywoodreporter.com/lifestyle/lifestyle-news/chateau-marmont-hotel-comeback-1235712361/",
      "source_title": "Chateau Marmont Is The Hotel Comeback Story of the Year",
      "retrieved_at": "2026-09-08T11:18:48.697710Z",
      "snippet": "Colman Domingo wondered aloud whether the legendary hotel, as has been reported, was now a private club \u2014 a la Soho House and San Vicente Bungalows. Nobody is more eager to clear up this narrative than owner <strong>Andr\u00e9 Balazs</strong>.",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_fb45c813ebd2": {
      "evidence_id": "ev_fb45c813ebd2",
      "item_id": "item_0e21e763f3c2",
      "source_url": "https://en.wikipedia.org/wiki/Bill_Clinton",
      "source_title": "Bill Clinton",
      "retrieved_at": "2026-09-08T11:18:49.164633Z",
      "snippet": "Bill Clinton\nClinton (n\u00e9 Blythe III; born August 19, 1946) is an American politician and lawyer who served as the 42nd president of the United States from 1993 to 2001.",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_fa01acc14f2d": {
      "evidence_id": "ev_fa01acc14f2d",
      "item_id": "item_0e21e763f3c2",
      "source_url": "https://www.britannica.com/biography/Bill-Clinton",
      "source_title": "Bill Clinton | Biography, Presidency, Impeachment, & Facts | Britannica",
      "retrieved_at": "2026-09-08T11:18:49.164667Z",
      "snippet": "(more)See all videos for this article \u00b7 Bill Clinton (born <strong>August 19, 1946</strong>, Hope, Arkansas, U.S.) is the 42nd president of the United States (1993\u20132001), who oversaw the country\u2019s longest peacetime economic expansion.",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_f9a6076a6661": {
      "evidence_id": "ev_f9a6076a6661",
      "item_id": "item_0e21e763f3c2",
      "source_url": "https://www.clintonlibrary.gov/research/clinton-biographies",
      "source_title": "Clinton Biographies | William J. Clinton ...",
      "retrieved_at": "2026-09-08T11:18:49.164685Z",
      "snippet": "Bill Clinton was born William Jefferson Blythe III on August 19, 1946, Clinton Hillary Diane Rodham was born on October 26, 1947, the first child of Dorothy",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_51e531f7931f": {
      "evidence_id": "ev_51e531f7931f",
      "item_id": "item_0e21e763f3c2",
      "source_url": "https://www.wealthmanagement.com/regulation-compliance/celebrity-estates-face-off-with-publicity-laws",
      "source_title": "Celebrity Estates Face Off With Publicity Laws",
      "retrieved_at": "2026-09-08T11:18:49.164701Z",
      "snippet": "Who profits from your image?\n\nMarilyn Monroe died in 1962 but only recently lost control of her likeness; James Brown just died in 2006 but may already lose control of his.\n\nThat\u2019s because states govern the right of publicity, and an individual's domicile at the time of death determines which state's law will govern. A federal court recently decided that Monroe was a resident of New York, not California, when she died, although she\u2019d spent a lot of time in both places. While California law allows the right of publicity to continue for 70 years after death, in New York \u2014 fuhgettaboutit \u2014 your right of publicity dies with you.\n\nThe winners in the Monroe case are a group of photographers and copyright owners who want to distribute photographs of the star.\n\nAs for James Joseph Brown, Jr.\n\n...\n\nOf the 30 recognizing the right of publicity, only 12 sanction posthumous rights, with coverage ranging from 10 years after death in Tennessee \u2014 to 100 years after death in Indiana and Oklahoma.\n\nWhere there is a right to publicity, it usually works to balance and check copyrights. A copyright holder cannot disseminate a work depicting a person without a license from that person, who has a right",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_3ea67e06becb": {
      "evidence_id": "ev_3ea67e06becb",
      "item_id": "item_0e21e763f3c2",
      "source_url": "https://clintonwhitehouse5.archives.gov/WH/EOP/OP/html/Hope.html",
      "source_title": "President Bill Clinton",
      "retrieved_at": "2026-09-08T11:18:49.164717Z",
      "snippet": "President Bill Clinton\nBill Clinton was born William Jefferson Blythe III on August 19, 1946, in the small town of Hope, Arkansas. He was named after his father, William Jefferson",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_b89f61162cdb": {
      "evidence_id": "ev_b89f61162cdb",
      "item_id": "item_0e21e763f3c2",
      "source_url": "https://ballotpedia.org/Bill_Clinton",
      "source_title": "Bill Clinton",
      "retrieved_at": "2026-09-08T11:18:49.164732Z",
      "snippet": "Bill Clinton\nWilliam Jefferson \"Bill\" Clinton (b. William Jefferson Blythe III on August 19, 1946, in Hope, AR) was the 42nd president of the United States.",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_54b2db4c6022": {
      "evidence_id": "ev_54b2db4c6022",
      "item_id": "item_0e21e763f3c2",
      "source_url": "https://actecfoundation.org/podcasts/understanding-rights-of-publicity-name-image-likeness-nil/",
      "source_title": "Understanding Rights of Publicity or Name, Image, Likeness (NIL)",
      "retrieved_at": "2026-09-08T11:18:49.164747Z",
      "snippet": "Its damages are determined by (1) the fair market value of the celebrity\u2019s identity, (2) the profits of the person infringing on that right, and (3) damages to the celebrity\u2019s licensing opportunities because of the infringement.\n\n## State Variation in Recognition and Protection\n\nBecause of this view that the right of publicity is a property right, in many states this right is freely transferable and descendible. On the other hand, right of privacy essentially dies with the death of the celebrity. In my research, at last count, upwards of 36 states currently recognize the right of publicity, 25 of them recognize a post-mortem right of publicity and some of the notable states include California, Florida, Hawaii, Illinois, Indiana, Kentucky, Massachusetts, Nebraska, Nevada, New York, Ohio, Oklahoma, Rhode Island, Tennessee, Texas, Utah, Virginia, and Washington.\n\n...\n\nSo, one of the famous personalities from Indiana, David Letterman, you can see how perhaps his mannerisms would be protected in Indiana.\n\n## State Variation in Duration and Enforcement\n\nAnother area in which the states vary in their right of publicity statutes is the duration of the enforcement. In Washington, they have",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_7e128396ecf9": {
      "evidence_id": "ev_7e128396ecf9",
      "item_id": "item_0e21e763f3c2",
      "source_url": "https://www.whitehousehistory.org/bios/william-clinton",
      "source_title": "William J. Clinton",
      "retrieved_at": "2026-09-08T11:18:49.164762Z",
      "snippet": "William J. Clinton\nThe son of a nurse, Clinton was born William Jefferson Blythe III in 1946 in Hope, Arkansas, three months after his father died in a car accident. (He later",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_4653b97db03f": {
      "evidence_id": "ev_4653b97db03f",
      "item_id": "item_4ac4ea6f6480",
      "source_url": "https://en.wikipedia.org/wiki/Bye_Bye_Blackbird",
      "source_title": "Bye Bye Blackbird",
      "retrieved_at": "2026-09-08T11:18:49.705829Z",
      "snippet": "This article is about the song. For other uses, see [Bye Bye Blackbird (disambiguation)](https://en.wikipedia.org/wiki/Bye_Bye_Blackbird_\\(disambiguation\\) \"Bye Bye Blackbird (disambiguation)\") .\n\n|\"Bye Bye Blackbird\" |\n| --- | --- |\n|[](https://en.wikipedia.org/wiki/File:Blackbird_1926.png)\n\nSheet music cover featuring the [Angelus Sisters](https://en.wikipedia.org/wiki/Tula_Belle \"Tula Belle\") , 1926 |\n|[Song](https://en.wikipedia.org/wiki/Song \"Song\") |\n|Published |1926 [[ 1 ]]() |\n|[Genre](https://en.wikipedia.org/wiki/Music_genre \"Music genre\") |[Jazz](https://en.wikipedia.org/wiki/Jazz \"Jazz\") |\n|[Composer](https://en.wikipedia.org/wiki/Composer \"Composer\") |[Ray Henderson](https://en.wikipedia.org/wiki/Ray_Henderson \"Ray Henderson\") |\n|[Lyricist](https://en.wikipedia.org/wiki/Lyricist \"Lyricist\") |[Mort Dixon](https://en.wikipedia.org/wiki/Mort_Dixon \"Mort Dixon\") |\n\n\" **Bye Bye Blackbird** \" is a 1926 song written by composer [Ray Henderson](https://en.wikipedia.",
      "relevance_note": "Retrieved to establish composer, publication_year, author_death_year, publisher [composition right].",
      "confidence": null
    },
    "ev_b536f14a3852": {
      "evidence_id": "ev_b536f14a3852",
      "item_id": "item_4ac4ea6f6480",
      "source_url": "https://www.songfacts.com/facts/eddie-cantor/bye-bye-blackbird",
      "source_title": "Bye Bye Blackbird by Eddie Cantor - Songfacts",
      "retrieved_at": "2026-09-08T11:18:49.705877Z",
      "snippet": "&quot;Bye Bye Blackbird&quot; is a feel-good song; it was written in 1926 by composer Ray Henderson and lyricist Mort Dixon. According to Don Tyler in his 2007 book Hit Songs 1900-1955: American Popular Music of the Pre-Rock Era, it was Henderson&#x27;s third hit of the year. First popularized by Eddie Cantor, this standard has been recorded by numerous artists. A full arrangement (by Jeff Muston) was published in London by Francis, Day &amp; Hunter at 3s6d, copyright 1954; the original was copyright 1926 by Jerome H.",
      "relevance_note": "Retrieved to establish composer, publication_year, author_death_year, publisher [composition right].",
      "confidence": null
    },
    "ev_fbd72be5b058": {
      "evidence_id": "ev_fbd72be5b058",
      "item_id": "item_4ac4ea6f6480",
      "source_url": "https://secondhandsongs.com/work/1939/all",
      "source_title": "Song: Bye Bye Blackbird written by Ray Henderson, Mort Dixon | SecondHandSongs",
      "retrieved_at": "2026-09-08T11:18:49.705896Z",
      "snippet": "Published by \u00b7 REDWOOD MUSIC LTD GEMA RAY HENDERSON MUSIC CO INC ASCAP OLDE CLOVER LEAF MUSIC ASCAP Remick Music Corp PRS \u00b7 Licensing \u00b7 Request a synchronization license \u00b7 Added by Bastien \u00b7 Add cover \u00b7 Report error \u00b7",
      "relevance_note": "Retrieved to establish composer, publication_year, author_death_year, publisher [composition right].",
      "confidence": null
    },
    "ev_16854cdd30c6": {
      "evidence_id": "ev_16854cdd30c6",
      "item_id": "item_4ac4ea6f6480",
      "source_url": "https://www.the-paulmccartney-project.com/song/bye-bye-blackbird/",
      "source_title": "Bye Bye Blackbird (song)",
      "retrieved_at": "2026-09-08T11:18:49.705913Z",
      "snippet": "\u201cBye, Bye, Blackbird\u201d is a <strong>1926</strong> song written by the American composer Ray Henderson and lyricist Mort Dixon. It is considered a popular standard and was first recorded by Gene Austin in <strong>1926</strong>.",
      "relevance_note": "Retrieved to establish composer, publication_year, author_death_year, publisher [composition right].",
      "confidence": null
    },
    "ev_dffbc80fdb99": {
      "evidence_id": "ev_dffbc80fdb99",
      "item_id": "item_4ac4ea6f6480",
      "source_url": "https://grokipedia.com/page/Bye_Bye_Blackbird",
      "source_title": "Bye Bye Blackbird \u2014 Grokipedia",
      "retrieved_at": "2026-09-08T11:18:49.705929Z",
      "snippet": "Search `\u2318K`\n\nSuggest Edit \n\n \n\n* Composition and Lyrics\n* Musical Structure and Analysis\n* Recording History\n* Cultural Impact\n* Reception and Legacy\n* References\n\nFact-checked by Grok 7 months ago\n\n# Bye Bye Blackbird\n\nAra Eve Leo Sal\n\n1x\n\n\"Bye Bye Blackbird\" is a song composed by Ray Henderson with lyrics by Mort Dixon, first published in sheet music form in 1926 by Jerome H. Remick & Co.  [[1]]() The tune was first recorded in March 1926 by Sam Lanin's Dance Orchestra featuring vocalist Arthur Hall.  [[2]]() Popularized early on by performer Eddie Cantor , it achieved widespread appeal as a feel-good number during the Jazz Age .  [[3]]() Over the decades, \"Bye Bye Blackbird\" evolved into a jazz standard , with notable recordings by artists such as Gene Austin in 1926 and later interpretations by jazz musicians that highlighted its improvisational potential, though it saw limited jazz adoption until the mid-20th century.  [[4]]()  [[5]]()\n\n## Composition and Lyrics\n### Origins and Publication\n\n\"Bye Bye Blackbird\" was composed by Ray Henderson with lyrics by Mort Dixon during their songwriting partnership, which spanned from 1923 to 1927.  [[4]]()  [[6]]() This collaboration produ",
      "relevance_note": "Retrieved to establish composer, publication_year, author_death_year, publisher [composition right].",
      "confidence": null
    },
    "ev_1a82bbe91f0c": {
      "evidence_id": "ev_1a82bbe91f0c",
      "item_id": "item_4ac4ea6f6480",
      "source_url": "https://natasyaelvira.bandcamp.com/track/bye-bye-blackbird",
      "source_title": "Bye Bye Blackbird | Composer: Ray Henderson, Lyricist: Mort Dixon | Natasya Elvira",
      "retrieved_at": "2026-09-08T11:18:49.705945Z",
      "snippet": "&quot;Bye Bye Blackbird&quot; is a composition by Ray Henderson with lyrics by Mort Dixon that was published in <strong>1926</strong>. At the time, the song was popular during the Great Depression and portrayed a time of darkness that needed to be left behind in order",
      "relevance_note": "Retrieved to establish composer, publication_year, author_death_year, publisher [composition right].",
      "confidence": null
    },
    "ev_a85df1967764": {
      "evidence_id": "ev_a85df1967764",
      "item_id": "item_4ac4ea6f6480",
      "source_url": "https://www.jazzstandards.com/compositions-1/byebyeblackbird.htm",
      "source_title": "Jazz Standards Songs and Instrumentals (Bye Bye Blackbird)",
      "retrieved_at": "2026-09-08T11:18:49.705960Z",
      "snippet": "Jazz Standards Songs and Instrumentals (Bye Bye Blackbird)\nDixon's lyric played on the \u201cblackbirds and bluebirds\u201d theme of the 1920s and is a happy pronouncement on the pleasures of returning home to a sweetheart who is",
      "relevance_note": "Retrieved to establish composer, publication_year, author_death_year, publisher [composition right].",
      "confidence": null
    },
    "ev_e44691becb4b": {
      "evidence_id": "ev_e44691becb4b",
      "item_id": "item_4ac4ea6f6480",
      "source_url": "https://www.easysong.com/search/songs/song-copyright-holder-information.aspx?s=91884",
      "source_title": "\"Bye Bye Blackbird\" | By Mort Dixon and Ray Henderson Arranged by Mort Dixon and Ray Henderson | Copyright Ray Henderson Music Co., Inc. and Bughouse Music o/b/o Olde Clover Leaf Music | Song Copyright Information | Easy Song",
      "retrieved_at": "2026-09-08T11:18:49.705975Z",
      "snippet": "FAQ Contact Us [Help Center](https://support.easysong.com/hc/en-us)\n\nSearch\n\nSearch\n\nSkip Navigation Links Home / Search / Songs / Copyright info\n\ncontact us\n\nSearch\n\n# Bye Bye Blackbird\n\nBy Mort Dixon and Ray Henderson\n\nArranged by Kris Berg\n\nCopyright Ray Henderson Music Co., Inc. and Bughouse Music o/b/o Olde Clover Leaf Music\n\nEasy Song ID\n\n91884\n\nGet permission to use the song \"Bye Bye Blackbird\"\n\nFind pre-approved recordings for your next project\n\nSong Information\n\nTitle\n\nBye Bye Blackbird\n\nAlternate titles\n\nComposed by\n\nMort Dixon and Ray Henderson\n\nArranged by\n\nKris Berg\n\nPublished by\n\nRay Henderson Music Co., Inc. and Bughouse Music o/b/o Olde Clover Leaf Music\n\nArtists\n\nPublisher's song ID\n\nSource\n\nUnknown\n\nCopyright Information\n\nMain contact\n\n[BMG Rights](https://www.easysong.com/search/publishers/music-publisher-contact-information.aspx?gt=BMG Rights&p=1727)\n\nOwners and splits\n\n| | |Physical |Digital |Streams |Updated |\n| --- | --- | --- | --- | --- | --- |\n|50\\.",
      "relevance_note": "Retrieved to establish composer, publication_year, author_death_year, publisher [composition right].",
      "confidence": null
    },
    "ev_5787d1b719f6": {
      "evidence_id": "ev_5787d1b719f6",
      "item_id": "item_4ac4ea6f6480",
      "source_url": "https://en.wikipedia.org/wiki/Bye_Bye_Blackbird",
      "source_title": "Bye Bye Blackbird",
      "retrieved_at": "2026-09-08T11:18:49.706477Z",
      "snippet": "Bye Bye Blackbird\n\"Bye Bye Blackbird\" is a 1926 song written by composer Ray Henderson and lyricist Mort Dixon and published by Jerome Remick. It is considered a popular standard",
      "relevance_note": "Retrieved to establish recording_artist, publication_year, label, master_owner [sound recording right].",
      "confidence": null
    },
    "ev_fd76428441b8": {
      "evidence_id": "ev_fd76428441b8",
      "item_id": "item_4ac4ea6f6480",
      "source_url": "https://secondhandsongs.com/license/request/new?work=1939",
      "source_title": "License inquiry for Bye Bye Blackbird written by Ray Henderson, Mort Dixon | SecondHandSongs",
      "retrieved_at": "2026-09-08T11:18:49.706502Z",
      "snippet": "Master-Use License: <strong>Grants the licensee the right to use a recording of an underlying composition for audio/visual projects, like film, TV, and commercials, among others</strong>.",
      "relevance_note": "Retrieved to establish recording_artist, publication_year, label, master_owner [sound recording right].",
      "confidence": null
    },
    "ev_212453f70202": {
      "evidence_id": "ev_212453f70202",
      "item_id": "item_4ac4ea6f6480",
      "source_url": "https://www.the-paulmccartney-project.com/song/bye-bye-blackbird",
      "source_title": "Bye Bye Blackbird (song)",
      "retrieved_at": "2026-09-08T11:18:49.706519Z",
      "snippet": "Bye Bye Blackbird (song)\nNov 1, 2020 \u2014 It is considered a popular standard and was first recorded by Gene Austin in 1926. Ringo Starr recorded it in 1970 for his album \u201cSentimental",
      "relevance_note": "Retrieved to establish recording_artist, publication_year, label, master_owner [sound recording right].",
      "confidence": null
    },
    "ev_74bccb251fab": {
      "evidence_id": "ev_74bccb251fab",
      "item_id": "item_4ac4ea6f6480",
      "source_url": "https://grokipedia.com/page/Bye_Bye_Blackbird",
      "source_title": "Bye Bye Blackbird \u2014 Grokipedia",
      "retrieved_at": "2026-09-08T11:18:49.706535Z",
      "snippet": "The first recording of &quot;Bye Bye Blackbird&quot; was by <strong>Sam Lanin&#x27;s Dance Orchestra featuring vocal chorus by Arthur Hall, captured on March 19, 1926</strong>, for Okeh Records.[8] This version, characterized by orchestral accompaniment typical of dance bands",
      "relevance_note": "Retrieved to establish recording_artist, publication_year, label, master_owner [sound recording right].",
      "confidence": null
    },
    "ev_e18e96b922ef": {
      "evidence_id": "ev_e18e96b922ef",
      "item_id": "item_4ac4ea6f6480",
      "source_url": "https://eclecticvo.com/2025/01/22/bye-bye-blackbird-1926",
      "source_title": "Bye Bye Blackbird (1926)",
      "retrieved_at": "2026-09-08T11:18:49.706551Z",
      "snippet": "Bye Bye Blackbird (1926)\nJan 22, 2025 \u2014 \u201cBye Bye Blackbird\u201d, written in 1926 by composer Ray Henderson with lyrics by Mort Dixon, has been covered by countless artists over the years,",
      "relevance_note": "Retrieved to establish recording_artist, publication_year, label, master_owner [sound recording right].",
      "confidence": null
    },
    "ev_7a6ecb951e33": {
      "evidence_id": "ev_7a6ecb951e33",
      "item_id": "item_4ac4ea6f6480",
      "source_url": "https://www.easysong.com/search/songs/song-copyright-holder-information.aspx?s=91884",
      "source_title": "\"Bye Bye Blackbird\" | By Mort Dixon and Ray Henderson Arranged by Mort Dixon and Ray Henderson | Copyright Ray Henderson Music Co., Inc. and Bughouse Music o/b/o Olde Clover Leaf Music | Song Copyright Information | Easy Song",
      "retrieved_at": "2026-09-08T11:18:49.706565Z",
      "snippet": "Find pre-approved recordings for your next project \u00b7 Song Information \u00b7 Title \u00b7 Bye Bye Blackbird \u00b7 Alternate titles \u00b7 Composed by \u00b7 Mort Dixon and Ray Henderson \u00b7 Arranged by \u00b7 Kris Berg \u00b7 Published by \u00b7 Ray Henderson Music Co., Inc. and Bughouse Music o/b/o Olde Clover Leaf Music \u00b7 Artists \u00b7 Publisher&#x27;s song ID \u00b7 Source \u00b7 Unknown \u00b7 Copyright Information \u00b7 Main contact \u00b7 BMG Rights \u00b7 Owners and splits \u00b7",
      "relevance_note": "Retrieved to establish recording_artist, publication_year, label, master_owner [sound recording right].",
      "confidence": null
    },
    "ev_559b8ef1eae3": {
      "evidence_id": "ev_559b8ef1eae3",
      "item_id": "item_4ac4ea6f6480",
      "source_url": "https://secondhandsongs.com/work/1939",
      "source_title": "Original versions of Bye Bye Blackbird written by Ray Henderson, Mort Dixon | SecondHandSongs",
      "retrieved_at": "2026-09-08T11:18:49.706580Z",
      "snippet": "The song Bye Bye Blackbird was written by Ray Henderson and Mort Dixon and was first recorded by <strong>Sam Lanin&#x27;s Dance Orchestra - Vocal Chorus Arthur Hall in 1926</strong>. It was covered by Larry Vuckovich with Jon Hendricks, Gloria Smyth, The Berets, New York Allstars and other artists.",
      "relevance_note": "Retrieved to establish recording_artist, publication_year, label, master_owner [sound recording right].",
      "confidence": null
    },
    "ev_5baada63b1fa": {
      "evidence_id": "ev_5baada63b1fa",
      "item_id": "item_4ac4ea6f6480",
      "source_url": "https://www.jazzstandards.com/compositions-1/byebyeblackbird.htm",
      "source_title": "Jazz Standards Songs and Instrumentals (Bye Bye Blackbird)",
      "retrieved_at": "2026-09-08T11:18:49.706593Z",
      "snippet": "JazzStandards.com: The premier site for the history and analysis of the standards jazz musicians play the most.",
      "relevance_note": "Retrieved to establish recording_artist, publication_year, label, master_owner [sound recording right].",
      "confidence": null
    },
    "ev_bd4788c32882": {
      "evidence_id": "ev_bd4788c32882",
      "item_id": "item_b6d84d21d91e",
      "source_url": "https://trademarks.justia.com/876/43/capitol-87643473.html",
      "source_title": "CAPITOL RECORDS Trademark of Capitol Records, LLC - Registration Number 5970060 - Serial Number 87643473 :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:49.976087Z",
      "snippet": "CAPITOL RECORDS is a trademark of <strong>Capitol Records, LLC</strong>. Filed in October 12 (2017), the CAPITOL RECORDS covers Entertainment and record label services in the nature of recording, production, and post-production services in the field of music;",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_51df02565ddd": {
      "evidence_id": "ev_51df02565ddd",
      "item_id": "item_b6d84d21d91e",
      "source_url": "https://uspto.report/company/Capitol-Records-L-L-C",
      "source_title": "Capitol Records L L C Trademarks & Logos",
      "retrieved_at": "2026-09-08T11:18:49.976113Z",
      "snippet": "<strong>All official trademark data, including owner information, should be verified by visiting the official USPTO website at www.uspto.gov</strong>. This site is not intended to replace professional legal advice and should not be used as a substitute for consulting with a legal professional who is knowledgeable",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_dda03441ce99": {
      "evidence_id": "ev_dda03441ce99",
      "item_id": "item_b6d84d21d91e",
      "source_url": "https://www.trademarkia.com/capitol-records-74801863",
      "source_title": "CAPITOL RECORDS Trademark | Trademarkia",
      "retrieved_at": "2026-09-08T11:18:49.976120Z",
      "snippet": "com/services/Provisional-Patents) [File a Design Patent Protects invention\u2019s design and visual aspects](https://www.patentexpress.com/design-patents) [File a Utility Patent Protects new machines, methods, processes of the invention](https://www.patentexpress.com/utility-patents)\n\n[Expedited Design Patent Best for faster and efficient protection for your design inventions](https://www.patentexpress.com/services/Expedited-Design-Patents) [Accelerated Utility Patent Quickly file patent applications for your ideas and inventions](https://www.patentexpress.com/services/Accelerated-Utility-Patents) [International Patents (PCT) Protect your ideas and inventions globally](https://www.patentexpress.com/services/pct-international-patent)\n\nCopyrights\n\nSafeguard your creative ideas\n\nRegister your creative ideas with\n\nStart a Copyright Application\n\n* * *\n\n[Register your Copyright Protect your work or creations with us](https://www.copyrightable.\ncom/copyright/register/0) [Free Copyright Search Search through 33 Million+ Copyright records](https://www.copyrightable.com/#) [Copyright Owner Search Browse through the owners of copyrights registered](https://www.copyrightable.com/search/owners?q=a)",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_2bf04bad4387": {
      "evidence_id": "ev_2bf04bad4387",
      "item_id": "item_b6d84d21d91e",
      "source_url": "https://uspto.report/TM/85851305",
      "source_title": "CAPITOL - Capitol Records, LLC Trademark Registration",
      "retrieved_at": "2026-09-08T11:18:49.976126Z",
      "snippet": "Trademark registration by Capitol Records, LLC for the trademark CAPITOL.",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_f82956688fa2": {
      "evidence_id": "ev_f82956688fa2",
      "item_id": "item_b6d84d21d91e",
      "source_url": "https://uspto.report/TM/87877757",
      "source_title": "CAPITOL360 - Capitol Records, LLC Trademark Registration",
      "retrieved_at": "2026-09-08T11:18:49.976130Z",
      "snippet": "Trademark registration by Capitol Records, LLC for the trademark CAPITOL360.",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_d5ffdcff3c55": {
      "evidence_id": "ev_d5ffdcff3c55",
      "item_id": "item_b6d84d21d91e",
      "source_url": "https://uspto.report/TM/87501533",
      "source_title": "PRIORITY RECORDS - Capitol Records, LLC Trademark Registration",
      "retrieved_at": "2026-09-08T11:18:49.976135Z",
      "snippet": "# PRIORITY RECORDS\n\n## Capitol Records, LLC\n\n1. [USPTO Trademarks](https://uspto.report/TM/)\n\u203a2. [Capitol Records, LLC](https://uspto.report/company/Capitol-Records-L-L-C)\n\u203a3. [Priority Records Application #87501533](https://uspto.report/TM/87501533/)\n\nApplication Filed: 2017-06-22\n\nTrademark Application Details\n\nTrademark Logo PRIORITY RECORDS",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_2fb0dab141dc": {
      "evidence_id": "ev_2fb0dab141dc",
      "item_id": "item_b6d84d21d91e",
      "source_url": "https://www.trademarkia.com/-UK00001253345",
      "source_title": "Logo Trademark | Trademarkia",
      "retrieved_at": "2026-09-08T11:18:49.976140Z",
      "snippet": "... Dead\n\non 30 Oct 1985\n\nLast Applicant/ Owned by\n\nCapitol Records, LLC\n\n150 5th Avenue, New York, NY 10011, United ... \n\nUK00001253345 filed on 30 <sup>th</sup> Oct1985\n\nRegistration Number\n\nUK00001253345 registered on  \n30 <sup>th</sup> Oct1985 ..",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_29b0b80b0b19": {
      "evidence_id": "ev_29b0b80b0b19",
      "item_id": "item_b6d84d21d91e",
      "source_url": "https://logos.fandom.com/wiki/Capitol_Records",
      "source_title": "Capitol Records | Logopedia | Fandom",
      "retrieved_at": "2026-09-08T11:18:49.976144Z",
      "snippet": "* Vivendi\n* EMI\n* Capitol Music Group\n* Record labels of the United States\n* 1942\n* 1940s\n* United States\n* California\n\n# Capitol Records\n\n[Sign In to Save Save](https://auth.fandom.com/signin?redirect=https%3A%2F%2Flogos.fandom.com%2Fwiki%2FCapitol_Records%3Fcollections%3Dsave&uselang=en&metadata=collections-save-button \"Sign In to Save\") [Edit](https://auth.fandom.com/signin?redirect=https%3A%2F%2Flogos.fandom.com%2Fwiki%2FCapitol_Records%3Fveaction%3Dedit&uselang=en&metadata=article-registration-edit-article)\n\n* [History](https://logos.fandom.com/wiki/Capitol_Records?action=history)\n* [Purge](https://logos.fandom.com/wiki/Capitol_Records?action=purge)\n* [Talk (0)](https://logos.fandom.com/wiki/Talk:Capitol_Records?action=edit&redlink=1)\n\n| |\n| --- | --- | --- | --- | --- | --- |\n|1942\u2013present |1942\u20131983 |1953\u20132002, 2013\u2013present |1969\u20131978, 2017\u2013present |1993\u20132002 |2017\u2013present |\n\n...\n\nThe 1969 logo was reintroduced in 2017, with its wordmark replaced with an unmodified treatment of modern digital Helvetica.\n\n|V \u2022 T \u2022 [E](https://logos.fandom.com/wiki/Template:Universal_Music_Group?action=edit)\n\nUniversal Music Group |\n| --- |\n|**Owners:** Tencent (20%) | Pershing Square Holdings",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_faf1b24367c5": {
      "evidence_id": "ev_faf1b24367c5",
      "item_id": "item_2763dcf7f352",
      "source_url": "https://trademarks.justia.com/860/30/fedex-86030341.html",
      "source_title": "FEDEX Trademark of Federal Express Corporation - Registration Number ...",
      "retrieved_at": "2026-09-08T11:18:49.879358Z",
      "snippet": "FEDEX is a trademark of Federal Express Corporation. The mark consists of the word \"FEDEX\" with the \"FED\" in purple and the \"EX\" in orange.",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_70c298c19cdd": {
      "evidence_id": "ev_70c298c19cdd",
      "item_id": "item_2763dcf7f352",
      "source_url": "https://www.trademarkia.com/fedex-87565158",
      "source_title": "FEDEX Trademark | Trademarkia",
      "retrieved_at": "2026-09-08T11:18:49.879402Z",
      "snippet": "FEDEX is a registered trademark (<strong>Registration #5484324</strong>) owned by Federal Express Corporation, a Memphis based entity located in TN. The trademark was filed on 11 Aug 2017 with serial number (#87565158) and registered on 05 Jun 2018.",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_458e28b487a4": {
      "evidence_id": "ev_458e28b487a4",
      "item_id": "item_2763dcf7f352",
      "source_url": "https://uspto.report/TM/75902270",
      "source_title": "FEDEX - Federal Express Corporation Trademark Registration",
      "retrieved_at": "2026-09-08T11:18:49.879420Z",
      "snippet": "Trademark registration by Federal Express Corporation for the trademark FEDEX.",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_2d2254a967d9": {
      "evidence_id": "ev_2d2254a967d9",
      "item_id": "item_2763dcf7f352",
      "source_url": "https://www.designyourway.net/blog/fedex-logo/",
      "source_title": "The FedEx Logo History, Colors, Font, And Meaning",
      "retrieved_at": "2026-09-08T11:18:49.879438Z",
      "snippet": "The current logo iteration counts as the second major design in company history, though multiple color variations exist for different service divisions.\n\n## What Is the FedEx Logo?\n\nThe FedEx logo is a wordmark featuring the company name in bold, custom typography with a hidden right-pointing arrow formed in the negative space between the letters E and x. Lindon Leader designed it in 1994 while working at Landor Associates. The arrow symbolizes speed, precision, and forward momentum.\n\n### Design Attributes\n\n* **Design Type:** Wordmark with hidden symbol\n* **Primary Elements:** Custom letterforms, negative space arrow\n* **Official Introduction:** June 23, 1994\n* **Designer:** Lindon Leader, Landor Associates\n* **Trademark Status:** Registered trademark of FedEx Corporation\n* **Color Palette:** Purple () and Orange () for primary brand\n* **Usage Context:** Vehicles, aircraft, uniforms, packaging, signage, digital platforms\n\n## How Has the FedEx Logo Evolved Over Time?\n\n...\n\n* **Clear Space:** Height of the letter \u201ce\u201d on all sides minimum\n* **File Formats:** Available in [vector graphics](https://www.designyourway.net/blog/what-are-vector-graphics/) (EPS, AI, SVG) and raster formats",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_707e4060f431": {
      "evidence_id": "ev_707e4060f431",
      "item_id": "item_2763dcf7f352",
      "source_url": "https://trademarks.justia.com/857/83/fedex-85783084.html",
      "source_title": "FEDEX EXPRESS Trademark of Federal Express Corporation - Registration Number 4515657 - Serial Number 85783084 :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:49.879453Z",
      "snippet": "FEDEX EXPRESS - Trademark Details \u00b7 Status: <strong>702 - Section 8 &amp; 15-Accepted And Acknowledged</strong> \u00b7 Serial Number \u00b7 85783084 \u00b7 Registration Number \u00b7 4515657 \u00b7 Word Mark \u00b7 FEDEX EXPRESS \u00b7 Status \u00b7 <strong>702 - Section 8 &amp; 15-Accepted And Acknowledged</strong>",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_f4feb9c48911": {
      "evidence_id": "ev_f4feb9c48911",
      "item_id": "item_2763dcf7f352",
      "source_url": "https://www.tramatm.com/trademark-hall-of-fame/fedex",
      "source_title": "Trademarks held by FedEx | Trademark Hall of Fame",
      "retrieved_at": "2026-09-08T11:18:49.879468Z",
      "snippet": "0&screen_name=tramaTrademarks)\n    + [Youtube icon](https://www.youtube.com/@Tramatm)\n\nPayment methods\n\n* visa logo\n* mastercard logo\n* amex logo\n\nRevolut logo\n\nOffices\n\n* United Kingdom\n  \n  86-90 Paul Street\n  \n  London EC2A 4NE\n  \n  [(+44) 74 8888 2146](tel:\\(+44\\) 74 8888 2146)\n* United States\n  \n  1178 Broadway, Floor 3\n  \n  New York 10001\n  \n  [(+1) 929-810-2266](tel:\\(+1\\) 929-810-2266)\n* Canada\n  \n  3465 Platinum Drive, Unit 238 PMB1082\n  \n  Mississauga, ON L5M 2S1\n* European Union\n  \n  Bottova 2A\n  \n  811 09 Bratislava\n  \n  [(+421) 2 3345 6574](tel:\\(+421\\) 2 3345 6574)\n* Australia\n  \n  526/368 Sussex St\n  \n  Sydney NSW 2000\n  \n  [(+61) (08) 9106 9499](tel:\\(+61\\) \\(08\\) 9106 9499)\n\nPartners\n\n* [Vacuumlabs logo](https://vacuumlabs.com)\n* [Sparring logo](https://sparring.io)\n* [Eagle Labs Logo](https://labs.uk.barclays)\n* [SaaSHub Logo](https://www.saashub.com/)\n* [Revolut Logo](https://www.revolut.com/)\n\n* Legal notice\n* Privacy Policy\n\n[](https://www.trustpilot.",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_7f83cc50d847": {
      "evidence_id": "ev_7f83cc50d847",
      "item_id": "item_2763dcf7f352",
      "source_url": "https://www.trademarkia.com/fedex-fast-facts-75190298",
      "source_title": "FEDEX FAST FACTS Trademark | Trademarkia",
      "retrieved_at": "2026-09-08T11:18:49.879482Z",
      "snippet": "FEDEX FAST FACTS is a registered trademark (<strong>Registration #2186575)</strong> owned by Federal Express Corporation, a Memphis based entity located in TN. The trademark was filed on 31 Oct 1996 with serial number (#75190298) and registered on 01 Sep 1998.",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_9b384d8606ec": {
      "evidence_id": "ev_9b384d8606ec",
      "item_id": "item_2763dcf7f352",
      "source_url": "https://uspto.report/TM/88490306",
      "source_title": "FEDEX ROXO - Federal Express Corporation Trademark Registration",
      "retrieved_at": "2026-09-08T11:18:49.879497Z",
      "snippet": "Trademark registration by Federal Express Corporation for the trademark FEDEX ROXO.",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_a4221eddca8d": {
      "evidence_id": "ev_a4221eddca8d",
      "item_id": "item_81a717e2944d",
      "source_url": "https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html",
      "source_title": "Apple Legal - Legal - Copyright and Trademark Guidelines - Apple",
      "retrieved_at": "2026-09-08T11:18:50.642197Z",
      "snippet": "d. The Apple logo or any other Apple-owned graphic symbol, logo, icon or image does not appear on or in the publication or on any materials related to the publication, seminar, or conference without <strong>express written permission from Apple</strong>. e. A disclaimer of sponsorship, affiliation, or endorsement",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_b2e0d8ccfad8": {
      "evidence_id": "ev_b2e0d8ccfad8",
      "item_id": "item_81a717e2944d",
      "source_url": "https://www.apple.com/legal/intellectual-property/trademark/appletmlist.html",
      "source_title": "Legal - Trademark List - Apple",
      "retrieved_at": "2026-09-08T11:18:50.642255Z",
      "snippet": "Ping is a registered trademark of Karsten Manufacturing Corporation and is used in the U.S. under license.\n\nPowerCD\u2122 is a trademark of ZCI, Inc., Dallas, Texas.\n\nPowerForms\u2122 is a trademark of Sestra, Inc., a division of HealthCare Communications.\n\nPowerPC\u2122 and the PowerPC logo\u2122 are trademarks of International Business Machines Corporation, used under license therefrom.\n\nRealAudio\u2122 and the RealAudio logo\u2122 are trademarks of Progressive Networks, Inc.\n\nThe \"Signalling disc watch design\" is owned by Swiss Federal Railways SFR, spezialgesetzliche Aktiengesellschaft, Berne, Switzerland.\n\nSmalltalk-80\u2122 is a trademark of ParcPlace Systems.\n\nSMART\u2122 and the SMART logos are trademarks of The Children's Medical Center Corporation.  Used with permission.\n\nSoftWindows\u2122: Windows is a registered trademark of Microsoft Corporation and SoftWindows is a trademark used under license by Insignia from Microsoft Corporation.\n\n...\n\nUCB (ftpd) code from UC Berkeley and others for Mac OS X and/or Mac OS X Server: All advertising materials mentioning features or use of this software must include the following acknowledgement: \"This product includes software developed by the University of California, Berkeley",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_1996131196a5": {
      "evidence_id": "ev_1996131196a5",
      "item_id": "item_81a717e2944d",
      "source_url": "https://support.apple.com/guide/tvapp/copyright-and-trademarks-atv8eb3f66e6/web",
      "source_title": "Copyright and trademarks - Apple Support",
      "retrieved_at": "2026-09-08T11:18:50.642276Z",
      "snippet": "Apple, the Apple logo, Apple TV, Apple Vision Pro, iPad, iPhone, iTunes, and Mac are trademarks of Apple Inc., <strong>registered in the U.S.</strong>",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_4952faea2f9e": {
      "evidence_id": "ev_4952faea2f9e",
      "item_id": "item_81a717e2944d",
      "source_url": "https://trademarks.justia.com/771/72/apple-77172511.html",
      "source_title": "Registration Number 3928818 - Serial Number 77172511",
      "retrieved_at": "2026-09-08T11:18:50.642292Z",
      "snippet": "9 E-MAILED.",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_3fd88ebbd84e": {
      "evidence_id": "ev_3fd88ebbd84e",
      "item_id": "item_81a717e2944d",
      "source_url": "https://trademarks.justia.com/850/36/n-85036990.html",
      "source_title": "  Trademark of Apple Inc. - Registration Number 4277914 - Serial Number 85036990 :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:50.642308Z",
      "snippet": "Apple Inc. filed this Retail store services featuring computers, computer software, computer peripherals, mobile phones, consumer electronics and related accessories, and demonstration of products relating thereto image mark.",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_422a4c9c2949": {
      "evidence_id": "ev_422a4c9c2949",
      "item_id": "item_81a717e2944d",
      "source_url": "https://uspto.report/TM/85036986",
      "source_title": "Apple Inc. Trademark Registration",
      "retrieved_at": "2026-09-08T11:18:50.642323Z",
      "snippet": "# Trademark Filing\n\n## Apple Inc.\n\n1. [USPTO Trademarks](https://uspto.report/TM/)\n\u203a2. [Apple Inc.](https://uspto.report/company/Apple-Inc)\n\u203a3. [Application #85036986](https://uspto.report/TM/85036986/)\n\nApplication Filed: 2010-05-12\n\nTrademark Application Details\n\nTrademark Logo \n\n#### Status\n\n  \n\u27f3 Refresh\n\n702\n\nLive/Registered\n\nSECTION 8 & 15-ACCEPTED AND ACKNOWLEDGED\n\n|Serial Number |85036986 |\n| --- | --- |\n|Registration Number |4277913 |\n|Mark Drawing Code |2000: Illustration: Drawing or design without any word(s)/letter(s)/ number(s) |\n|Attorney Name |Thomas R. La Perle |\n|Law Office Assigned |M70 |\n|Employee Name |BAIRD, MICHAEL |\n\n### Timeline\n\n|2006-09-00 |Date of First Use |\n| --- | --- |\n|2010-05-12 |Application Filed |\n|2012-06-05 |Published for Opposition |\n|2013-01-22 |Trademark Registered |\n|2018-11-24 |Location: TMO LAW OFFICE 116 |\n|2018-11-24 |Status: Live/Registered |\n|2018-11-24 |Transaction Date |\n\n#### Trademark Applicants & Owners\n\n|Owner: |Apple Inc. |",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_74be6c1b6e2e": {
      "evidence_id": "ev_74be6c1b6e2e",
      "item_id": "item_81a717e2944d",
      "source_url": "https://www.trademarkelite.com/uk/trademark/trademark-detail/UK00909783978/APPLE",
      "source_title": "APPLE United Kingdom Trademark Information",
      "retrieved_at": "2026-09-08T11:18:50.642337Z",
      "snippet": "APPLE United Kingdom Trademark Information\nThe current status of the APPLE trademark is Registered. Use this page to review UK trademark search data, filing details, trademark classes, owner information, and registration information for the APPLE mark.",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_a62f92049f2b": {
      "evidence_id": "ev_a62f92049f2b",
      "item_id": "item_81a717e2944d",
      "source_url": "https://www.trademarkia.com/apple-73300046",
      "source_title": "APPLE Trademark | Trademarkia",
      "retrieved_at": "2026-09-08T11:18:50.642352Z",
      "snippet": "APPLE is a registered trademark (<strong>Registration #1200280)</strong> owned by Apple Computer, Inc., a Cupertino based entity located in CA. The trademark was filed on 06 Mar 1981 with serial number (#73300046) and registered on 06 Jul 1982.",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_2b170d1e16c5": {
      "evidence_id": "ev_2b170d1e16c5",
      "item_id": "item_3c88b902b2de",
      "source_url": "https://www.trademarkia.com/owners/starbucks-corporation",
      "source_title": "Starbucks Corporation: details of the 496 owned trademarks",
      "retrieved_at": "2026-09-08T11:18:50.757399Z",
      "snippet": "tm logo\n\nServices\n\nCategories\n\nTrademarks\n\nProtect your brand today\n\nProtect your brand with\n\ntm logo\n\nRegister your Trademark\n\nPost Filing Services\n\nTrademark Protection\n\n* * *\n\nTrademark Registration Free Trademark Search Comprehensive Search International Trademarks Privacy Guard\n\nTrademark Renewal Trademark Revival Trademark Office Actions Trademark Statement of Use Trademark Extension of Use Trademark Oppositions Trademark Litigations\n\nBrand Monitoring Trademark Ownership Transfer Cease and Desist Letter Trademark Certificate Trademarkia Marketplace Name, Image & Likeness Business Reviews Brand Protection\n\nPatents\n\nFile a patent today\n\nPatent your Inventions with\n\nStart a Patent Application\n\nAdditional Patent Services\n\n* * *\n\n[File a Provisional Patent For temporary protection upto 1 year from USPTO](https://www.patentexpress.com/services/Provisional-Patents) [File a Design Patent Protects invention\u2019s design and visual aspects](https://www.patentexpress.",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_73d3b4110f77": {
      "evidence_id": "ev_73d3b4110f77",
      "item_id": "item_3c88b902b2de",
      "source_url": "https://www.starbucks.com/terms/starbucks-terms-of-use/",
      "source_title": "Terms of Use: Starbucks Coffee Company",
      "retrieved_at": "2026-09-08T11:18:50.757445Z",
      "snippet": "Starbucks Coffee Company, Starbucks, the Starbucks logo, and other Starbucks trademarks, service marks, graphics, and logos used in connection with the Sites are trade names, trademarks or registered trademarks of Starbucks Corporation (collectively \u201cStarbucks Marks\u201d). Other trademarks, service marks, graphics and logos used in connection with the Sites are the trademarks or registered trademarks of their respective owners (collectively \u201cThird Party Marks\u201d). The Starbucks Marks and Third-Party Marks may not be copied, imitated, or used, in whole or in part, without the prior written permission of Starbucks or the applicable trademark holder. The Sites and the Content are protected by copyright, trademark, patent, trade secret, international treaties, state and federal laws, and other proprietary rights and also may have security components that protect digital information only as authorized by Starbucks or the owner of the Content. All rights not expressly granted are reserved.",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_c1cf19354a33": {
      "evidence_id": "ev_c1cf19354a33",
      "item_id": "item_3c88b902b2de",
      "source_url": "https://trademarks.justia.com/737/01/starbucks-coffee-73701713.html",
      "source_title": "STARBUCKS COFFEE - Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:50.757463Z",
      "snippet": "STARBUCKS COFFEE - Justia Trademarks\nSTARBUCKS COFFEE is a trademark of STARBUCKS CORPORATION. Filed in January 11 (1988), the STARBUCKS COFFEE covers [ COFFEE ]",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_0c4dc6d4efae": {
      "evidence_id": "ev_0c4dc6d4efae",
      "item_id": "item_3c88b902b2de",
      "source_url": "https://uspto.report/TM/98137935",
      "source_title": "STARBUCKS COFFEE - Starbucks Corporation Trademark Registration",
      "retrieved_at": "2026-09-08T11:18:50.757483Z",
      "snippet": "STARBUCKS COFFEE - Starbucks Corporation Trademark Registration\nTrademark Application Details The mark consists of the wording \"Starbucks Coffee\" in a circular seal with two stars, and design of a siren (a two-tailed mermaid) wearing a crown.",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_2a7e11f6a523": {
      "evidence_id": "ev_2a7e11f6a523",
      "item_id": "item_3c88b902b2de",
      "source_url": "https://uspto.report/TM/97842829",
      "source_title": "STARBUCKS - Starbucks Corporation Trademark Registration",
      "retrieved_at": "2026-09-08T11:18:50.757511Z",
      "snippet": "Trademark registration for Starbucks Corporation. The mark consists of a concentric circle design with the word",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_3b35892b0502": {
      "evidence_id": "ev_3b35892b0502",
      "item_id": "item_3c88b902b2de",
      "source_url": "https://www.tramatm.com/trademark-hall-of-fame/starbucks",
      "source_title": "Trademarks held by Starbucks | Trademark Hall of Fame",
      "retrieved_at": "2026-09-08T11:18:50.757528Z",
      "snippet": "io)\n* [Eagle Labs Logo](https://labs.uk.barclays)\n* [SaaSHub Logo](https://www.saashub.com/)\n* [Revolut Logo](https://www.revolut.com/)\n\n* Legal notice\n* Privacy Policy\n\n[](https://www.trustpilot.com/review/tramatm.com)\n\ndomain\n\ntramatm.com",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_47d10973d089": {
      "evidence_id": "ev_47d10973d089",
      "item_id": "item_3c88b902b2de",
      "source_url": "https://uspto.report/TM/90127284",
      "source_title": "STARBUCKS COFFEE - Starbucks Corporation Trademark Registration",
      "retrieved_at": "2026-09-08T11:18:50.757542Z",
      "snippet": "STARBUCKS COFFEE - Starbucks Corporation Trademark Registration\nThe mark consists of the wording \"STARBUCKS COFFEE\" in white inside a green circular seal containing two white stars and the design of a siren (a two-tailed mermaid) wearing a crown in black and white.",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_2ea8f23ef084": {
      "evidence_id": "ev_2ea8f23ef084",
      "item_id": "item_3c88b902b2de",
      "source_url": "https://uspto.report/TM/90749326",
      "source_title": "Starbucks Corporation Trademark Registration",
      "retrieved_at": "2026-09-08T11:18:50.757556Z",
      "snippet": "Trademark registration for Starbucks Corporation. The mark consists of <strong>a circular seal with the design of a siren (a two-tailed mermaid) wearing a crown with a five-point star in the middle of the crown</strong>.",
      "relevance_note": "Retrieved to establish mark_owner, trademark_status, usage_policy.",
      "confidence": null
    },
    "ev_50b1d2fd9777": {
      "evidence_id": "ev_50b1d2fd9777",
      "item_id": "item_0dff9dbcaf39",
      "source_url": "https://uspto.report/TM/85718022",
      "source_title": "Penguin Books Limited Trademark Registration - USPTO .report",
      "retrieved_at": "2026-09-08T11:18:50.847157Z",
      "snippet": "# PENGUIN\n\n## Penguin Books Limited\n\n1. [USPTO Trademarks](https://uspto.report/TM/)\n\u203a2. [Penguin Books Limited](https://uspto.report/company/Penguin-Books-L-T-D)\n\u203a3. [Penguin Application #85718022](https://uspto.report/TM/85718022/)\n\nApplication Filed: 2012-08-31\n\nTrademark Application Details\n\nTrademark Logo PENGUIN\n\nMark For: PENGUIN\u00ae trademark registration is intended to cover the categories of downloadable electronic publications in the nature of books in the fields of fiction and non-fiction on a variety of topics; downloadable electronic publications, namely, works of fiction and non-fiction on a variety of topics which are shorter than book length; audiobooks in the fields of fiction and non-fiction on a variety of topics; downloadable software in the nature of mobile applications for reading, viewing, listening to or interacting with electronic, digital, audio, video or multimedia books; electronic game software for wireless devices.\n\n#### Status\n\n2021-07-25 UTC",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_b396cc4ea1d5": {
      "evidence_id": "ev_b396cc4ea1d5",
      "item_id": "item_0dff9dbcaf39",
      "source_url": "https://trademarks.justia.com/857/18/penguin-85718022.html",
      "source_title": "PENGUIN Trademark of Penguin Books Limited - Registration Number 4471900 - Serial Number 85718022 :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:50.847229Z",
      "snippet": "US Class Codes \u00b7 <strong>021, 023, 026, 036, 038</strong> \u00b7 Class Status Code \u00b7 6 - Active \u00b7 Class Status Date \u00b7 2012-09-07 \u00b7 Primary Code \u00b7 009 \u00b7 First Use Anywhere Date \u00b7 1997-00-00 \u00b7 First Use In Commerce Date \u00b7 1997-00-00 \u00b7 Current Trademark",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_f372ca8b1789": {
      "evidence_id": "ev_f372ca8b1789",
      "item_id": "item_0dff9dbcaf39",
      "source_url": "https://www.trademarkia.com/penguin-76333015",
      "source_title": "Trademark Search, Free, for Millions of Registered Trademarks with USPTO | Trademarkia",
      "retrieved_at": "2026-09-08T11:18:50.847249Z",
      "snippet": "Leave us a message\n\n[Text Us](https://wa.me/+18777949511)\n\nGuest\n\nsearch\n\nsearch\n\n[USPTO](https://tsdr.uspto.gov/=76333015&caseType=SERIAL_NO&searchType=statusSearch)\n\nTrademark Search Trademark Classes Computer & Software Services & Scientific Services PENGUIN\n\nTrademark Search PENGUIN\n\n* * *\n\nPENGUIN\n\nSuggest Logos Suggest Slogans\n\n# PENGUIN\n\nBy PENGUIN BOOKS LIMITED\n\nView Docket Report\n\nStatus Live/Registered\n\nRegistered On 03 Dec 2002\n\nFirst Use Date (General) 30Nov1939\n\nSerial Number 76333015\n\nPrevious slide\n\n### Short slogan that captures PENGUIN 's purpose\n\nTrademark slogan available for reserve\n\nCustomize Now\n\n### Logo ideas modeled on USPTO designs for PENGUIN\n\nLogo concepts inspired by USPTO-registered marks\n\nGenerate Logos\n\nNext slide\n\nsummary\n\nMonitor This Mark\n\n**PENGUIN** is a registered trademark (Registration #2656258) owned by PENGUIN BOOKS LIMITED, a London based entity.",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_1e4161777f64": {
      "evidence_id": "ev_1e4161777f64",
      "item_id": "item_0dff9dbcaf39",
      "source_url": "https://trademarks.justia.com/857/32/n-85732954.html",
      "source_title": "Trademark of Penguin Books Limited - Registration Number 4324443 - Serial Number 85732954 :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:50.847265Z",
      "snippet": "US Class Codes \u00b7 <strong>021, 023, 026, 036, 038</strong> \u00b7 Class Status Code \u00b7 6 - Active \u00b7 Class Status Date \u00b7 2012-09-24 \u00b7 Primary Code \u00b7 009 \u00b7 First Use Anywhere Date \u00b7 2004-10-00 \u00b7 First Use In Commerce Date \u00b7 2004-10-00 \u00b7 Current Trademark",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_a4e39daca27b": {
      "evidence_id": "ev_a4e39daca27b",
      "item_id": "item_0dff9dbcaf39",
      "source_url": "https://uspto.report/TM/73549677",
      "source_title": "Penguin Random House Llc Trademark Registration",
      "retrieved_at": "2026-09-08T11:18:50.847280Z",
      "snippet": "Mark For: This trademark registration is intended to cover the category of books. [all] ... The trademark application has been registered with the Office. *multiple parties listed, check assignment documents for ownership information",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_fd38a63767c8": {
      "evidence_id": "ev_fd38a63767c8",
      "item_id": "item_0dff9dbcaf39",
      "source_url": "https://www.trademarkia.com/owners/penguin-books-usa-inc",
      "source_title": "Penguin Books Usa Inc.: details of the 15 owned trademarks",
      "retrieved_at": "2026-09-08T11:18:50.847294Z",
      "snippet": "Leave us a message\n\n[Text Us](https://wa.me/+18777949511)\n\nGuest\n\nSearch\n\nTrademark Search Owners Penguin Books Usa Inc.\n\n# 15 Trademarks found that are owned by Penguin Books Usa Inc.\n\nStill want to file?\n\nFilters\n\nCheck Registrability\n\nAI\n\n71550817\n\nDead/Cancelled\n\non **15 Oct 2021**\n\n## MENTOR\n\nPENGUIN BOOKS USA INC.\n\n71550817 \u00b7 28 Feb 1948\n\n038\n\nClass 038\n\nCommunications Services\n\nBOOKS, CONTAINING PRINTED LITERARY AND ARTISTIC WORKS\n\nBOOKS, CONTAINING PRINTED LITERARY AND ARTISTIC WORKS,BOOKS, CONTAININ...\n\nView\n\n73577912\n\nDead/Cancelled\n\non **19 Apr 2008**\n\n## WOMEN OF OUR TIME\n\nPENGUIN BOOKS USA INC.\n\n73577912 \u00b7 16 Jan 1986\n\n016\n\nClass 016\n\nPaper Goods and Printed Material\n\nCHILDREN'S BOOKS\n\nCHILDREN'S BOOKS,CHILDREN'S BOOKS\n\nView\n\n73084199\n\nDead/Expired\n\non **22 Sep 2007**\n\n## A PIED PIPER BOOK\n\nPENGUIN BOOKS USA INC.\n\n73084199 \u00b7 16 Apr 1976\n\n016\n\nClass 016\n\nPaper Goods and Printed Material\n\nNO CLAIM IS MADE TO THE WORD \"BOOK\" APART FROM THE MARK AS SHOWN.\nNO CLAIM IS MADE TO THE WORD \"BOOK\" APART FROM THE MARK AS SHOWN.,NO C...\n\nView\n\n75107542\n\nDead/Cancelled\n\non **11 Sep 2004**\n\n## EYE TO EYE\n\nPENGUIN BOOKS USA INC.\n\n75107542 \u00b7 21 May 1996\n\n016\n\nClass 016\n\nPaper Goods and",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_2a777b065814": {
      "evidence_id": "ev_2a777b065814",
      "item_id": "item_0dff9dbcaf39",
      "source_url": "https://www.trademarkia.com/owners/Penguin%20Random%20House%20LLC",
      "source_title": "Penguin Random House Llc: details of the 336 owned trademarks",
      "retrieved_at": "2026-09-08T11:18:50.847309Z",
      "snippet": "Trademark SearchOwners \u00b7 Penguin Random House Llc \u00b7 Still want to file? FiltersCheck Registrability \u00b7 AI \u00b7 Live/Registered \u00b7 on 18 Aug 2026 \u00b7 Penguin Random House LLC \u00b7 98200073 \u00b7 27 Sep 2023 \u00b7 18 Aug 2032 \u00b7 009 \u00b7 Class 009 \u00b7 Computer &amp; Software Products &amp; Electrical &amp; Scientific Products \u00b7 Color is not claimed as a feature of the mark. 016 \u00b7 Class 016 \u00b7 Paper Goods and Printed Material \u00b7 Downloadable non-fiction books on a variety of topics, excluding books in the fields of maritime navigation, maritime and marine simulation, vessel traffic, fleet management and aviation; Downloadable non-fiction e-books on a variety of topics, excluding e-books in the fields of maritime navigation, maritime and marine simulation, vessel traffic, fleet management and aviation \u00b7",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_54d3df255064": {
      "evidence_id": "ev_54d3df255064",
      "item_id": "item_0dff9dbcaf39",
      "source_url": "https://uspto.report/TM/72307070",
      "source_title": "Penguin Random House Llc Trademark Registration",
      "retrieved_at": "2026-09-08T11:18:50.847323Z",
      "snippet": "... at your own risk. Any reliance you place on such information is therefore strictly at your own risk.\n\nAll official trademark data, including owner information, should be verified by visiting the official USPTO website at www.uspto.gov. This site",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_f8f542f5c1cc": {
      "evidence_id": "ev_f8f542f5c1cc",
      "item_id": "item_75ee3491ea73",
      "source_url": "https://product-registration.neumann.com/",
      "source_title": "Product Registration - Neumann",
      "retrieved_at": "2026-09-08T11:18:51.091127Z",
      "snippet": "Register your Neumann products (including historical models) and Merging products to access these services: \u00b7 Please note: This login is separate from your neumann.com account and requires its own credentials",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_5e8673754003": {
      "evidence_id": "ev_5e8673754003",
      "item_id": "item_75ee3491ea73",
      "source_url": "https://tsdr.uspto.gov/",
      "source_title": "Trademark Status & Document Retrieval",
      "retrieved_at": "2026-09-08T11:18:51.091166Z",
      "snippet": "Registration No Registration Certificates\n\n* Status\n* Documents\n* Maintenance\n\nHelp\")\n\nDownload\n\nContent\n\nStatus\n\nDocuments\n\nPDF\n\nOriginal\n\nPrint Preview\n\nBack to Search\n\nPrint\n\n* \n* \n*\n\n[Download Adobe Reader](http://get.adobe.com/reader/)\n\n  \nIf you are the applicant or the applicant's attorney and have questions about this\nfile, please contact\nthe [Trademark Assistance Center](mailto:TrademarkAssistanceCenter@uspto.gov)\n\n|Image |Mark |Ser No |Reg No |Status |Filing |Owner |Class(es) |Goods and Services |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n|Image |Mark |Ser No |Reg No |Status |Filing |Owner |Class(es) |Goods and Services |\n\n|Image |Mark |IR No |IR Date |Ser No |Ref No |Owner |Class(es) |Goods and Services |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n|Image |Mark |IR No |IR Date |Ser No |Ref No |Owner |Class(es) |Goods and Services |\n\n|Reference No. |Filing Date |Intl Reg No. |Intl Reg Date |Status |\n| --- | --- | --- | --- | --- |\n|Reference No.",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_03d9e5fc4f52": {
      "evidence_id": "ev_03d9e5fc4f52",
      "item_id": "item_75ee3491ea73",
      "source_url": "https://en.wikipedia.org/wiki/Neumann_U_87",
      "source_title": "Neumann U 87 - Wikipedia",
      "retrieved_at": "2026-09-08T11:18:51.091184Z",
      "snippet": "[\"Neumann U 87A studio microphone in the test\"](https://www-soundandrecording-de.translate.goog/equipment/neumann-u-87a-studiomikrofon-im-test/?_x_tr_sl=de&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=sc) . _Sound & Recording_ . Retrieved 24 January 2024 .\n3. \u2191 [\"TECnology Hall of Fame 2006 Inductees Announced\"](https://www.mixonline.com/technology/tecnology-hall-fame-2006-inductees-announced-382123) . _MIX_ . Future plc. 16 June 2006 . Retrieved 17 January 2024 .\n4. 1 2 3 [\"1967 Neumann U87\"](https://www.mixonline.com/technology/1967-neumann-u87-383659) . _MIX_ . Future plc. 1 September 2006 . Retrieved 17 January 2024 .\n5. \u2191 Inglis, Sam (December 2017). [\"Warm Audio WA-87\"](https://www.soundonsound.com/reviews/warm-audio-wa-87) . _Sound On Sound_ . SOS Publications Group . Retrieved 15 January 2024 .\n6. 1 2 3 4 Robjohns, Hugh (May 2016). [\"Peluso P-87\"](https://www.soundonsound.com/reviews/peluso-p-87) . _Sound On Sound_ . SOS Publications Group . Retrieved 15 January 2024 .\n7.",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_543da2a42553": {
      "evidence_id": "ev_543da2a42553",
      "item_id": "item_75ee3491ea73",
      "source_url": "https://www.uspto.gov/trademarks",
      "source_title": "Search trademarks",
      "retrieved_at": "2026-09-08T11:18:51.091200Z",
      "snippet": "Search trademarks",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_4abdea8e40e2": {
      "evidence_id": "ev_4abdea8e40e2",
      "item_id": "item_75ee3491ea73",
      "source_url": "https://www.trademarkia.com/neumann-79416948",
      "source_title": "NEUMANN Trademark | Trademarkia",
      "retrieved_at": "2026-09-08T11:18:51.091214Z",
      "snippet": "The **NEUMANN** trademark is filed in the category of Personal & Legal & Social Services. The mark is not being used in commerce yet. As of 24 Feb 2026, the trademark remains Live/Registered, with a recent status, REGISTERED. The mark is represented by attorney Christina M. Licursi of law firm Christina M. Licursi Wolf, Greenfield & Sacks, P.C.,.\n\nLatest Updates\n\nLive/Registered\n\nTM\n\nLive\n\nStatus as of | 24 Feb 2026\n\nREGISTERED\n\nView Filing History\n\nTrademark Classes\n\nOwner Contact Info\n\nCorrespondent Contact Info\n\nTrademark Details\n\nFiling History\n\ntrademark classes\n\nSuggest Additional Classes\n\nService Class\n\nClass 045\n\nPersonal & Legal & Social Services\n\nFirst Use Date (General) N/A\n\nFirst Use Date (Commerce) N/A\n\n* * *\n\nLicensingauthorityservices,namely,licensingofaudio recordings; licensingindustrialpropertyrights,namely,licensingof intellectual property;licensingoftechnologybeingaudiosoftware;licensingof trademarks; legalservices,namely,lice...\n\nRead more\n\nService Class",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_740673302798": {
      "evidence_id": "ev_740673302798",
      "item_id": "item_75ee3491ea73",
      "source_url": "https://www.trademarkia.com/neumann-79419289",
      "source_title": "NEUMANN Trademark | Trademarkia",
      "retrieved_at": "2026-09-08T11:18:51.091229Z",
      "snippet": "Leave us a message\n\n[Text Us](https://wa.me/+18777949511)\n\nGuest\n\nsearch\n\nsearch\n\n[USPTO](https://tsdr.uspto.gov/=79419289&caseType=SERIAL_NO&searchType=statusSearch)\n\nTrademark Search Trademark Classes Personal & Legal & Social Services NEUMANN\n\nTrademark Search NEUMANN\n\n* * *\n\nNEUMANN\n\nSuggest Slogans\n\n# NEUMANN\n\nBy Georg Neumann GmbH\n\nView Docket Report\n\nStatus Live/Registered\n\nRegistered On 24 Feb 2026\n\nFirst Use Date (General) N/A\n\nSerial Number 79419289\n\nPrevious slide\n\n### Short slogan that captures NEUMANN 's purpose\n\nTrademark slogan available for reserve\n\nCustomize Now\n\n### Logo ideas modeled on USPTO designs for NEUMANN\n\nLogo concepts inspired by USPTO-registered marks\n\nGenerate Logos\n\nNext slide\n\nsummary\n\nMonitor This Mark\n\n**NEUMANN** is a registered trademark (Registration #8147765) owned by Georg Neumann GmbH. The trademark was filed on 15 Oct 2024 with serial number (# **79419289** ) and registered on 24 Feb 2026.\nThe **NEUMANN** trademark is filed in the category of Personal & Legal & Social Services. The mark is not being used in commerce yet. As of 24 Feb 2026, the trademark remains Live/Registered, with a recent status, REGISTERED. The mark is represented by att",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_ca3cf668b74e": {
      "evidence_id": "ev_ca3cf668b74e",
      "item_id": "item_75ee3491ea73",
      "source_url": "https://www.trademarkia.com/neumann-79416947",
      "source_title": "NEUMANN Trademark | Trademarkia",
      "retrieved_at": "2026-09-08T11:18:51.091243Z",
      "snippet": "...  for Trademark](/trademark/trademark-registration/step1)\n\nsearch\n\nsearch\n\n[USPTO](https://tsdr.uspto.gov/#caseNumber ... searchType=statusSearch)\n\n[Trademark Search](/trademark/search) [Trademark ... personal-legal-social-services) NEUMANN\n\n[Trad",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_eb6bcd477691": {
      "evidence_id": "ev_eb6bcd477691",
      "item_id": "item_75ee3491ea73",
      "source_url": "https://libguides.rutgers.edu/trademarks/databases",
      "source_title": "DATABASES - Trademarks - Research Guides at Rutgers University",
      "retrieved_at": "2026-09-08T11:18:51.091256Z",
      "snippet": "Use TSDR (Trademark Status &amp; Documents Retrieval) to retrieve status information and view and download documents for pending and registered trademarks. TSDR also displays information contained in the USPTO records regarding International Registrations and applications for International Registration filed under the Madrid system through the U.S.A.",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_870d90624526": {
      "evidence_id": "ev_870d90624526",
      "item_id": "item_cec43d334307",
      "source_url": "https://tsdr.uspto.gov/",
      "source_title": "Trademark Status & Document Retrieval - USPTO",
      "retrieved_at": "2026-09-08T11:18:51.479100Z",
      "snippet": "Trademark Status & Document Retrieval - USPTO\nKeeping your registration aliveForms to fileChecking registration status & viewing documentsEnforcing your trademark rights/trademark litigationTransferring",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_04c756949ffc": {
      "evidence_id": "ev_04c756949ffc",
      "item_id": "item_cec43d334307",
      "source_url": "https://www.avid.com/pro-tools",
      "source_title": "Pro Tools | Professional DAW for Recording, Editing, and Mixing",
      "retrieved_at": "2026-09-08T11:18:51.479151Z",
      "snippet": "Create immersive spatial audio mixes for music, film, TV, and streaming with the built-in Dolby Atmos\u00ae renderer.",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_cd24d36377a8": {
      "evidence_id": "ev_cd24d36377a8",
      "item_id": "item_cec43d334307",
      "source_url": "https://www.uspto.gov/trademarks/basics/online-tools",
      "source_title": "Online trademark tools | USPTO",
      "retrieved_at": "2026-09-08T11:18:51.479170Z",
      "snippet": "<strong>The Trademark Status and Document Retrieval (TSDR) system allows you to access a trademark application or registration file using the serial or registration number</strong>. You can use TSDR to check the status of your application or registration at",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_068fb58426fd": {
      "evidence_id": "ev_068fb58426fd",
      "item_id": "item_cec43d334307",
      "source_url": "https://www.trademarkia.com/owners/ate-pro-tools",
      "source_title": "Ate Pro Tools: details of the 1 owned trademark",
      "retrieved_at": "2026-09-08T11:18:51.479187Z",
      "snippet": "Need a quick help? Leave us a message\n\n[Text Us](https://wa.me/+18777949511)\n\nGuest\n\nSearch\n\nTrademark Search Owners Ate Pro Tools\n\n# 1 Trademark found that are owned by Ate Pro Tools\n\nStill want to file?\n\nFilters\n\nCheck Registrability\n\nAI\n\n88182056\n\nLive/Registered\n\non **30 Jul 2025**\n\n## ATE PRO. USA\n\nATE Pro Tools\n\n88182056 \u00b7 05 Nov 2018\n\n30 Jul 2029\n\n008\n\nClass 008\n\nHand Tool Products\n\nEmergency and survival tents and canopies, tarpaulins, shade nets, cargo nets, bungee cords, ratchet tie downs, locking tie downs, ratchet straps,rubber ties, cable ties, cargo ties down and straps, lashing straps\n\n022\n\nClass 022\n\nRopes, Cordage and Fiber Products\n\n\"PRO. USA\"\n\n\"PRO. USA\",Emergency and survival tents and canopies, tarpaulins, shad...\n\nView\n\nEnd of search results\n\nPage 1 of 1\n\nFilters\n\nStatus\n\nAll\n\nRegistered\n\nPending\n\nAbandoned\n\nOther\n\nCategories\n\nClass 8 (1)\n\nClass 22 (1)\n\nCorrespondents\n\nAte pro tools (1)\n\nApply for Trademark\n\nSelect countries to protect your logo trademark\n\n* * *",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_81c0e7071434": {
      "evidence_id": "ev_81c0e7071434",
      "item_id": "item_cec43d334307",
      "source_url": "https://www.trademarkia.com/pro-tool-85906237",
      "source_title": "PRO-TOOL Trademark | Trademarkia",
      "retrieved_at": "2026-09-08T11:18:51.479202Z",
      "snippet": "... , starting at\n$9.99\nGet Your Domain\nSecure your Brand's Domain at Trademarkia\nTM\nRegister your Trademark\nFiled by experienced attorneys at Trademarkia\n$499\nper class +govt fee\nApply for Trademark\nUSPTO\n\u00a9 2026 reserved by Trademarkia\nDisclaimer: T",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_676f32fe70b4": {
      "evidence_id": "ev_676f32fe70b4",
      "item_id": "item_cec43d334307",
      "source_url": "https://www.uspto.gov/trademarks/basics",
      "source_title": "Trademark basics - USPTO",
      "retrieved_at": "2026-09-08T11:18:51.479218Z",
      "snippet": "Trademark basics - USPTO\nMar 31, 2021 \u00b7 Learn how to protect your trademark through the federal registration process.",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_2f2d5d254246": {
      "evidence_id": "ev_2f2d5d254246",
      "item_id": "item_cec43d334307",
      "source_url": "https://trademarkregistrationagency.com/tools/trademark-search-tool/",
      "source_title": "Free Trademark Search Tool | USPTO Trademark Lookup | Trademark Registration Agency",
      "retrieved_at": "2026-09-08T11:18:51.479232Z",
      "snippet": "# Trademark Search Tool\n\nFree Trademark Search Tool | USPTO Trademark Lookup\n\n\u26a1 Free Tool \u2014 No Sign-up Required\n\n# Free Trademark Search Tool  \nSearch the USPTO Database\n\nInstantly check if your brand name is already trademarked. Search millions of USPTO trademark records by name, status, owner, or class \u2014 all in one place.\n\n**12M+** Trademark Records\n\n**140+** Years of Data\n\n**Free** No Account Needed\n\n## Search USPTO Trademark Database\n\nSearch\n\nAll Statuses \u2705 Registered / Live \ud83d\udd35 Pending \u274c Abandoned / Cancelled All Classes Class 9 \u2014 Electronics & Software Class 25 \u2014 Clothing & Apparel Class 35 \u2014 Business & Advertising Class 42 \u2014 Technology Services Class 41 \u2014 Education & Entertainment Class 44 \u2014 Medical & Beauty Class 36 \u2014 Finance & Insurance Class 43 \u2014 Food & Restaurant Class 3 \u2014 Cosmetics Class 5 \u2014 Pharmaceuticals\n\n\ud83d\udd0e\n\n### Search for Any Trademark\n\nType a brand name above to search the USPTO trademark database. Check if your name is taken before you file.\n\n...\n\nA trademark search is the process of checking whether a brand name, logo, or slogan is already registered or pending registration with the United States Patent and Trademark Office (USPTO). Before filing a trademark applic",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_9f8b09548f2b": {
      "evidence_id": "ev_9f8b09548f2b",
      "item_id": "item_cec43d334307",
      "source_url": "https://www.trademarkia.com/dia-pro-tools-78765564",
      "source_title": "DIA-PRO TOOLS Trademark | Trademarkia",
      "retrieved_at": "2026-09-08T11:18:51.479247Z",
      "snippet": "... Suggest Additional Classes\nProduct Class\nClass 007\nMachinery Products\nFirst Use Date ... -operated tilesaws; power-operated tools,namely,anglegrinders;diamondbladesforpowersaws ... \nSAINT CLOUD, MN 56387-1086\nTM trademark details\nMark Filed on\n02",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_82996f38def4": {
      "evidence_id": "ev_82996f38def4",
      "item_id": "item_97d887b5109a",
      "source_url": "https://trademarks.justia.com/710/30/marlboro-71030646.html",
      "source_title": "MARLBORO Trademark of Philip Morris USA Inc. - Registration Number 0068502 - Serial Number 71030646 :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:51.658236Z",
      "snippet": "MARLBORO - Trademark Details \u00b7 Status: <strong>800 - Registered And Renewed</strong> \u00b7 Serial Number \u00b7 71030646 \u00b7 Registration Number \u00b7 0068502 \u00b7 Word Mark \u00b7 MARLBORO \u00b7 Status \u00b7 <strong>800 - Registered And Renewed</strong> \u00b7 Status Date \u00b7 2018-04-14 \u00b7 Filing Date",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_13443f88ae6b": {
      "evidence_id": "ev_13443f88ae6b",
      "item_id": "item_97d887b5109a",
      "source_url": "https://www.trademarkia.com/marlboro-87488244",
      "source_title": "Trademark Search, Free, for Millions of Registered Trademarks with USPTO | Trademarkia",
      "retrieved_at": "2026-09-08T11:18:51.658286Z",
      "snippet": "The **MARLBORO** trademark is filed in the category of Smoker's Products. The company began using the mark in commerce on 30 th Nov 1882. As of 26 Jul 2024, the trademark remains Live/Registered, with a recent status, SECTION 8 & 15-ACCEPTED AND ACKNOWLEDGED. The mark is represented by attorney Robyn Ettricks of law firm Robyn Ettricks ALTRIA CLIENT SERVICES LLC.\n\nLatest Updates\n\nLive/Registered\n\nTM\n\nLive\n\nStatus as of | 26 Jul 2024\n\nSECTION 8 & 15-ACCEPTED AND ACKNOWLEDGED\n\nView Filing History\n\nTrademark Classes\n\nOwner Contact Info\n\nCorrespondent Contact Info\n\nTrademark Details\n\nFiling History\n\ntrademark classes\n\nSuggest Additional Classes\n\nProduct Class\n\nClass 034\n\nSmoker's Products\n\nFirst Use Date (General) 30Nov1882\n\nFirst Use Date (Commerce) 30Nov1882\n\n* * *\n\nTobaccoProducts,namely,Cigarettes\n\nowner contact information\n\nView Docket Report\n\n#### P\n\nLast Applicant / Owned By\n\nPhilip Morris USA Inc.\n\nLegal Entity Type\n\nCorporation\n\nOwner Address\n\n6601 West Broad Street\n\nRichmond\n\nVA",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_d0f38b233625": {
      "evidence_id": "ev_d0f38b233625",
      "item_id": "item_97d887b5109a",
      "source_url": "https://www.wipo.int/amc/en/domains/decisions/text/2017/d2017-2408.html",
      "source_title": "WIPO Domain Name Decision: D2017-2408",
      "retrieved_at": "2026-09-08T11:18:51.658304Z",
      "snippet": "The Panel therefore accepts that <strong>the Complainant</strong> is the owner of a number of trademark registrations within the United States of the trademark MARLBORO the first of which was registered on April 14, 1908. These include the trademark MARLBORO registered at the USPTO with Registration numbers",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_cbc6b479fb8c": {
      "evidence_id": "ev_cbc6b479fb8c",
      "item_id": "item_97d887b5109a",
      "source_url": "https://trademarks.justia.com/724/40/marlboro-72440508.html",
      "source_title": "MARLBORO Trademark - Registration Number 0999971 - Serial Number 72440508 :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:51.658319Z",
      "snippet": "... scientific apparatus MARLBORO - Trademark Details\nMARLBORO - Trademark Details\nStatus: 900 - Expired\nSerial Number\n72440508\nRegistration Number\n0999971\nWord Mark\nMARLBORO\nStatus\n900 - Expired\nStatus Date\n1995-09-25\nFiling Date ... SIGNAL MODIFYIN",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_899b2d699740": {
      "evidence_id": "ev_899b2d699740",
      "item_id": "item_97d887b5109a",
      "source_url": "https://www.uspto.gov/trademarks/search",
      "source_title": "Search our trademark database | USPTO",
      "retrieved_at": "2026-09-08T11:18:51.658333Z",
      "snippet": "A search you complete before applying for a trademark registration to make sure your trademark is available to register for your particular goods or services, and to make sure that no other trademark conflicts with it.",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_883247a19937": {
      "evidence_id": "ev_883247a19937",
      "item_id": "item_97d887b5109a",
      "source_url": "https://www.trademarkia.com/marlboro-72271170",
      "source_title": "MARLBORO Trademark | Trademarkia",
      "retrieved_at": "2026-09-08T11:18:51.658347Z",
      "snippet": "... Apply for Trademark](/trademark/trademark-registration/step1)\n\nsearch\n\nsearch\n\n[USPTO](https://tsdr.uspto.gov/#caseNumber ... =statusSearch)\n\n[Trademark Search](/trademark/search) [Trademark ... category) [052](/category/052) MARLBORO\n\n[Trademark",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_0329158dff2c": {
      "evidence_id": "ev_0329158dff2c",
      "item_id": "item_97d887b5109a",
      "source_url": "https://www.trademarkelite.com/europe/trademark/trademark-detail/019340162/Marlboro-TOUCH-S-LINE",
      "source_title": "\n\tMarlboro TOUCH S-LINE EU Trademark Filing & Registration | European Union Trademark Search\n",
      "retrieved_at": "2026-09-08T11:18:51.658362Z",
      "snippet": "com/europe/trademark/trademark-detail/019340162/Marlboro-TOUCH-S-LINE&linkname=Marlboro TOUCH S-LINE EU Trademark Filing and Registration Details) |\n| --- | --- |\n\nThe **Marlboro TOUCH S-LINE** trademark is a European Union trademark record filed with the European Union Intellectual Property Office (EUIPO) by Philip Morris Brands S\u00e0rl.\n\nThis EU trademark filing is listed under EUTM application number **019340162** . The current status of the Marlboro TOUCH S-LINE trademark is **Registered** .\n\nUse this page to review European Union trademark search data, EUIPO filing details, trademark classes, owner information, status history, and registration information for the Marlboro TOUCH S-LINE mark.\n\nApplication No. **019340162**\n\nStatus **Registered**\n\nFiling Date **Tuesday, March 31, 2026**\n\nThe Marlboro TOUCH S-LINE trademark was assigned an Application Number # 019340162 \\- by the EU Intellectual Property Office (EUIPO).\n\n...\n\ncom, and add all of your trademarks from one convenient dashboard, and receive free status-updates any time when the status is changed!\n\n## European Union Trademark Search, Filing, and Registration Information\n\nHelpful answers based on this EU trademark record a",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_1dac09d98b98": {
      "evidence_id": "ev_1dac09d98b98",
      "item_id": "item_97d887b5109a",
      "source_url": "https://www.trademarkia.com/marlboro-72242030",
      "source_title": "MARLBORO Trademark | Trademarkia",
      "retrieved_at": "2026-09-08T11:18:51.658377Z",
      "snippet": "The trademark was filed on 28 Mar 1966 with serial number (# **72242030** ) and registered on 21 Mar 1967. The **MARLBORO** trademark is filed in the category of Yarns and Threads. The company began using the mark in commerce on 17 th Feb 1966. As of 27 Jun 2012, the trademark remains Dead/Cancelled, with a recent status, CANCELLED - SECTION 8. The mark is represented by attorney Timothy G. Hofmeyer.\n\nLatest Updates\n\nDead/Cancelled\n\nTM\n\nDead\n\nStatus as of | 27 Jun 2012\n\nCANCELLED - SECTION 8\n\nView Filing History\n\nTrademark Classes\n\nOwner Contact Info\n\nCorrespondent Contact Info\n\nTrademark Details\n\nFiling History\n\ntrademark classes\n\nSuggest Additional Classes\n\nProduct Class\n\nClass 023\n\nYarns and Threads\n\nFirst Use Date (General) 17Feb1966\n\nFirst Use Date (Commerce) 17Feb1966\n\n* * *\n\nRAZORS,RAZORBLADES,ANDBLADECONTAINERDISPENSER\n\nowner contact information\n\nView Docket Report\n\n#### P\n\nLast Applicant / Owned By\n\nPHILIP MORRIS INCORPORATED\n\nLegal Entity Type\n\nCorporation\n\nOwner Address",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_a34cf9c51213": {
      "evidence_id": "ev_a34cf9c51213",
      "item_id": "item_0a02db79809c",
      "source_url": "https://tsdr.uspto.gov/",
      "source_title": "Trademark Status & Document Retrieval - USPTO",
      "retrieved_at": "2026-09-08T11:18:52.053130Z",
      "snippet": "Registration No Registration Certificates\n\n* Status\n* Documents\n* Maintenance\n\nHelp\")\n\nDownload\n\nContent\n\nStatus\n\nDocuments\n\nPDF\n\nOriginal\n\nPrint Preview\n\nBack to Search\n\nPrint\n\n* \n* \n*\n\n[Download Adobe Reader](http://get.adobe.com/reader/)\n\n  \nIf you are the applicant or the applicant's attorney and have questions about this\nfile, please contact\nthe [Trademark Assistance Center](mailto:TrademarkAssistanceCenter@uspto.gov)\n\n|Image |Mark |Ser No |Reg No |Status |Filing |Owner |Class(es) |Goods and Services |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n|Image |Mark |Ser No |Reg No |Status |Filing |Owner |Class(es) |Goods and Services |\n\n|Image |Mark |IR No |IR Date |Ser No |Ref No |Owner |Class(es) |Goods and Services |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n|Image |Mark |IR No |IR Date |Ser No |Ref No |Owner |Class(es) |Goods and Services |\n\n|Reference No. |Filing Date |Intl Reg No. |Intl Reg Date |Status |\n| --- | --- | --- | --- | --- |\n|Reference No.",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_8a9252a4a0b2": {
      "evidence_id": "ev_8a9252a4a0b2",
      "item_id": "item_0a02db79809c",
      "source_url": "https://trademarks.justia.com/736/24/nike-73624522.html",
      "source_title": "NIKE Trademark - Registration Number 1441334 - Serial Number 73624522 :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:52.053187Z",
      "snippet": "SPORTS BALLS\n\n**Classification Information**\n\n**International Class**\n\n[**028**](https://trademarks.justia.com/international-class-code/028) \\- Games and playthings; gymnastic and sporting articles not included in other classes; decorations for Christmas trees. - Games and playthings; gymnastic and sporting articles not included in other classes; decorations for Christmas trees.\n\n**US Class Codes**\n\n022\n\n**Class Status Code**\n\n**2** \\- Sec. 8 - Entire Registration\n\n**Class Status Date**\n\n1993-12-06\n\n**Primary Code**\n\n028\n\n**First Use Anywhere Date**\n\n1984-09-24\n\n**First Use In Commerce Date**\n\n1984-09-24\n\n**Correspondences**\n\n**Name**\n\nKATHY J. MCKNIGHT\n\n**Address**\n\n_Please  with your Justia account to see this address._\n\n**Prior Registrations**\n\n|**Relationship Type** |**Reel Number** |\n| --- | --- |\n|Prior Registration |0977190 |\n|Prior Registration |0978952 |\n|Prior Registration |1145473 |\n|Prior Registration |1153938 |\n|Prior Registration |1214930 |\n|Prior Registration |1237469 |",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_16b85fd261e4": {
      "evidence_id": "ev_16b85fd261e4",
      "item_id": "item_0a02db79809c",
      "source_url": "https://www.slideshare.net/slideshow/nike-brand-guidelines/266124553",
      "source_title": "Nike Brand Guidelines | PDF - SlideShare",
      "retrieved_at": "2026-09-08T11:18:52.053206Z",
      "snippet": "Nike Brand Guidelines | PDF - SlideShare\nNike Brand Guidelines 1. N I K E , I N C . C H E R R E L L E R Y A L S J A N U A R Y 2 0 2 4 2. M I S S I O N To bring inspiration and innovation to every athlete* in the world. P U R P O S E Our purpose is to move the world forward through the power of sport.",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_1ae029c28955": {
      "evidence_id": "ev_1ae029c28955",
      "item_id": "item_0a02db79809c",
      "source_url": "http://trademarks.justia.com/724/14/nike-72414176.html",
      "source_title": "http://trademarks.justia.com/724/14/nike-72414176.html",
      "retrieved_at": "2026-09-08T11:18:52.053222Z",
      "snippet": "[Justia](https://www.justia.com) Trademarks Categories Clothing NIKE - Trademark Details\n\n**NIKE - Trademark Details**\n\n_Status:_ 800 - Registered And Renewed\n\nImage for trademark with serial number 72414176\n\n**Serial Number**\n\n72414176\n\n**Registration Number**\n\n0978952\n\n**Word Mark**\n\nNIKE\n\n**Status**\n\n**800** \\- Registered And Renewed\n\n**Status Date**\n\n2014-01-17\n\n**Filing Date**\n\n1972-01-31\n\n**Registration Number**\n\n0978952\n\n**Registration Date**\n\n1974-02-19\n\n**Mark Drawing**\n\n**1000** \\- Typeset: Word(s)/letter(s)/number(s) Typeset\n\n**Attorney Name**\n\n[Jaime M. Lemons](https://lawyers.justia.com/search?query=Jaime+Lemons&location=)\n\n**Statements**\n\n**Goods and Services**\n\nATHLETIC SHOES WITH SPIKES AND ATHLETIC UNIFORMS FOR USE WITH SUCH SHOES\n\n**Goods and Services**\n\nATHLETIC SHOES WITHOUT SPIKES AND ATHLETIC UNIFORMS FOR USE WITH SUCH SHOES\n\n**Classification Information**\n\n**International Class**\n\n[**025**](https://trademarks.justia.\ncom/international-class-code/025) \\- Clothing, footwear, headgear. - Clothing, footwear, headgear.",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_9fa1aa74fc72": {
      "evidence_id": "ev_9fa1aa74fc72",
      "item_id": "item_0a02db79809c",
      "source_url": "https://www.trademarkia.com/owners/nike-inc",
      "source_title": "Nike Inc.: details of the 960 owned trademarks",
      "retrieved_at": "2026-09-08T11:18:52.053237Z",
      "snippet": "Leave us a message\n\n[Text Us](https://wa.me/+18777949511)\n\nGuest\n\nSearch\n\nTrademark Search Owners Nike Inc.\n\n# 965 Trademarks found that are owned by Nike Inc.\n\nStill want to file?\n\nFilters\n\nCheck Registrability\n\nAI\n\n90086076\n\nLive/Registered\n\non **03 Sep 2026**\n\n## Logo Mark\n\nNike, Inc.\n\n90086076 \u00b7 31 Jul 2020\n\n02 Jun 2031\n\n025\n\nClass 025\n\nClothing Products\n\nFootwear\n\nFootwear,The mark consists of a three-dimensional configuration compri...\n\nView\n\n90086080\n\nLive/Registered\n\non **02 Sep 2026**\n\n## Logo Mark\n\nNike, Inc.\n\n90086080 \u00b7 31 Jul 2020\n\n01 Jun 2027\n\n025\n\nClass 025\n\nClothing Products\n\nFootwear\n\nFootwear,The mark consists of a three-dimensional configuration compri...\n\nView\n\n99505727\n\nLive/Registered\n\non **01 Sep 2026**\n\n## NIKE MIND\n\nNike, Inc.\n\n99505727 \u00b7 19 Nov 2025\n\n01 Sep 2032\n\n025\n\nClass 025\n\nClothing Products\n\nFootwear\n\nFootwear\n\nView\n\n97637155\n\nLive/Registered\n\non **04 Aug 2026**\n\n## AIR JORDAN\n\nNIKE, Inc\n\n97637155 \u00b7 18 Oct 2022\n\n04 Aug 2032\n\n018\n\nClass 018",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_e5e4a8983d25": {
      "evidence_id": "ev_e5e4a8983d25",
      "item_id": "item_0a02db79809c",
      "source_url": "https://www.trademarkia.com/nike-98029846",
      "source_title": "NIKE Trademark",
      "retrieved_at": "2026-09-08T11:18:52.053252Z",
      "snippet": "Leave us a message\n\n[Text Us](https://wa.me/+18777949511)\n\nGuest\n\nsearch\n\nsearch\n\n[USPTO](https://tsdr.uspto.gov/=98029846&caseType=SERIAL_NO&searchType=statusSearch)\n\nTrademark Search Trademark Classes Lace, Ribbons & Embroidery and Fancy Goods NIKE\n\nTrademark Search NIKE\n\n* * *\n\nNIKE\n\nSuggest Logos Suggest Slogans\n\n# NIKE\n\nBy Nike, Inc.\n\nView Docket Report\n\nStatus Live/Registered\n\nRegistered On 28 May 2024\n\nFirst Use Date (General) 29Feb1972\n\nSerial Number 98029846\n\nPrevious slide\n\n### Short slogan that captures NIKE 's purpose\n\nTrademark slogan available for reserve\n\nCustomize Now\n\n### Logo ideas modeled on USPTO designs for NIKE\n\nLogo concepts inspired by USPTO-registered marks\n\nGenerate Logos\n\nNext slide\n\nsummary\n\nMonitor This Mark\n\n**NIKE** is a registered trademark (Registration #7401694) owned by Nike, Inc., a Beaverton based entity located in OR. The trademark was filed on 06 Jun 2023 with serial number (# **98029846** ) and registered on 28 May 2024.",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_daeffefc089b": {
      "evidence_id": "ev_daeffefc089b",
      "item_id": "item_0a02db79809c",
      "source_url": "https://uspto.report/TM/97096366",
      "source_title": "NIKE - Nike, Inc. Trademark Registration - USPTO .report",
      "retrieved_at": "2026-09-08T11:18:52.053267Z",
      "snippet": "Trademark registration for Nike, Inc.. The mark consists of a stylized curved line design with the word",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_de80f131d181": {
      "evidence_id": "ev_de80f131d181",
      "item_id": "item_0a02db79809c",
      "source_url": "https://tmng-al.uspto.gov/resting2/api/casedoc/ts/cd/85215162/APP20110114072245/1/webcontent",
      "source_title": "Trademark/Service Mark Application, Principal Register",
      "retrieved_at": "2026-09-08T11:18:52.053281Z",
      "snippet": "Trademark/Service Mark Application, Principal Register\nINFORMATION *OWNER OF MARK Nike, Inc. PHONE 503-671-6453 FAX 503-646-6926. EMAIL ADDRESS Nike.Trademark@Nike.com. United States requests registration of the",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_a2a27e489ba0": {
      "evidence_id": "ev_a2a27e489ba0",
      "item_id": "item_ed4fb13eb46a",
      "source_url": "https://www.trademarkia.com/meridian-86489481",
      "source_title": "Trademark Search, Free, for Millions of Registered Trademarks with USPTO | Trademarkia",
      "retrieved_at": "2026-09-08T11:18:52.293935Z",
      "snippet": "MERIDIAN is a registered trademark (<strong>Registration #4952376</strong>) owned by Scotsman Group LLC, a Wilmington based entity located in DE. The trademark was filed on 23 Dec 2014 with serial number (#86489481) and registered on 03 May 2016.",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_9e0d9558f28a": {
      "evidence_id": "ev_9e0d9558f28a",
      "item_id": "item_ed4fb13eb46a",
      "source_url": "https://www.axiomlaw.com/practice-areas/trademarks/idaho/meridian",
      "source_title": "Meridian, ID Trademark Lawyers | Axiom Law",
      "retrieved_at": "2026-09-08T11:18:52.294022Z",
      "snippet": "Axiom helps you find &amp; engage the right business-oriented trademark lawyers in Meridian, throughout the United States, and globally on a full-time, part-time, or as-needed basis at affordable rates.",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_feade378deda": {
      "evidence_id": "ev_feade378deda",
      "item_id": "item_ed4fb13eb46a",
      "source_url": "https://www.thefilmfund.co/how-to-get-film-permits-and-location-releases/",
      "source_title": "How to Get Film Permits and Location Releases \u2013 The Film Fund",
      "retrieved_at": "2026-09-08T11:18:52.294042Z",
      "snippet": "If you need to film in a well-known, public, or historic site, you will likely need a permit. Your film commission is the first place to go, and they will recommend who specifically you should reach out to in order to get the paperwork you need.\n\nIf you don\u2019t necessarily need a public place, it can be a lot easier to shoot on private property, as all you will need is written permission from the property owner. Your film commission may also have resources for location scouting. For example The Greater Philadelphia Film Office has a [Locations Finder](https://philly.reel-scout.com/loc_results.aspx) built right into their website!\n\n## **Start the** **process early** .\n\nman with notebook on location nature\n\nSometimes governments have extremely strict policies about shooting on their spaces, especially if the location is a state park or otherwise protected area. While not impossible, some governments will require you to fill out their applications months before the production is set to occur.\n\n...\n\nBecause the permit process varies so widely, it\u2019s always a good idea to ask fellow filmmakers in your area about locations they\u2019ve filmed at and what the process for getting permits is like.",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_b67915877a84": {
      "evidence_id": "ev_b67915877a84",
      "item_id": "item_ed4fb13eb46a",
      "source_url": "https://www.peerspace.com/resources/location-release-form/",
      "source_title": "Everything You Need to Know About Getting a Location Release Form - Peerspace",
      "retrieved_at": "2026-09-08T11:18:52.294059Z",
      "snippet": "* The time of the shoot\n* The specific [location of the shoot](https://www.peerspace.com/plan/filming)\n* Compensation for the property owner\n* Restrictions set by the owner\n* Signatures from the producer and the property owner agreeing to those terms\n\nBe sure to include the permission to access the location, record on the location, and own the footage recorded on the location, thus releasing the rights from the owner. If there is a chance you might need to return to the location for additional filming, mention it in the location release.\n\nAlso, include a note about giving more time to shoot than predicted so as to not have a chance of going over time. Going over the allotted amount of time could be a nuisance for the owner, especially if it is a popular property that might have to get back to its regular uses.\n\nAnother possible addition to the location release form is detailing what the project is that is taking place. Is it a short film for school? Is it a [music video](https://www.\n\n...\n\n### Identifies the location with an address\n\nThis grants permission to enter the property and record. Then, list the dates required for the production.\n\nRemember to add a provision in case of a n",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_a4290a601335": {
      "evidence_id": "ev_a4290a601335",
      "item_id": "item_ed4fb13eb46a",
      "source_url": "https://axenfeldlaw.com/city/trademark-and-patent-and-intellectual-property-law-services-in-meridian-id/",
      "source_title": "Trademark and Patent Attorney in Meridian, ID",
      "retrieved_at": "2026-09-08T11:18:52.294073Z",
      "snippet": "Secondly, they allow inventors to begin commercially promoting their invention immediately without fear of having it stolen. Thirdly, a provisional patent application serves as the effective date of filing for the invention, allowing inventors twelve additional months on the term of their patent grant and the right to use the term \"patent pending.\"\n\n## How do I protect my Meridian, ID brand?\n\nBrands can be protected by trademarks and trade dress. \u201cWord marks\u201d are a form of trademark that can protect the actual wording of a brand name, while \u201cdesign marks\u201d are trademarks that protect the stylization or graphical elements of your brand name. Additionally, trade dress can protect the design, shape, or appearance of you protect, such as a distinctive bottle or textile pattern. You can obtain a federal trademark or trade dress by registering with the U.S. Patent and Trademark Office (USPTO).\nA trademark attorney can help you search existing trademarks and trade dresses to ensure your brand is unique, and then file a trademark application on your behalf. If approved, you will have the legal right to exclude anyone else from trying to mimic your brand, whether by appropriating the words o",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_006fd8f8c13b": {
      "evidence_id": "ev_006fd8f8c13b",
      "item_id": "item_ed4fb13eb46a",
      "source_url": "https://mpcca.com/news",
      "source_title": "News & Updates | Meridian",
      "retrieved_at": "2026-09-08T11:18:52.294107Z",
      "snippet": "PHOENIX, Ariz. \u2013 Meridian, a full-service owner, operator, and investor of healthcare real estate, is pleased to announce that the company has closed escrow on the sale of Grunow Memorial Medical Center.",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_a86ad08bcb1a": {
      "evidence_id": "ev_a86ad08bcb1a",
      "item_id": "item_ed4fb13eb46a",
      "source_url": "https://www.classicalmusicdaily.com/articles/r/m/meridian-records.htm",
      "source_title": "Meridian Records - Classical Music Daily",
      "retrieved_at": "2026-09-08T11:18:52.294124Z",
      "snippet": "The label is known for its &#x27;natural sound&#x27; recording technique which reproduces the concert-hall experience as closely as possible using only two microphones. The company is currently run by managing director, chief sound engineer and editor <strong>Richard Hughes and producer and editor Susanne Stanzeleit</strong>",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_5e7a70bea994": {
      "evidence_id": "ev_5e7a70bea994",
      "item_id": "item_ed4fb13eb46a",
      "source_url": "https://www.nyc.gov/site/mome/permits/permits.page",
      "source_title": "Filming Permits - MOME",
      "retrieved_at": "2026-09-08T11:18:52.294139Z",
      "snippet": "The Film Office is accepting Film Permit applications for production activity. Media production activity in New York City is subject to requirements in New York State and City laws, directives, and guidance. For more information see: \u00b7 The Film Office looks to support film and television",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_7cb4dcfd7417": {
      "evidence_id": "ev_7cb4dcfd7417",
      "item_id": "item_fbbd96ccec77",
      "source_url": "https://trademarks.justia.com/790/65/venice-79065005.html",
      "source_title": "VENICE BEACH Trademark of SCORETEX GmbH - Registration Number 3821967 - Serial Number 79065005 :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:52.217465Z",
      "snippet": "Clothing, namely, tops, shirts, t-shirts, [ polo shirts, ] sport shirts, sports jerseys, jackets, sweaters, pants, yoga pants, leggings, sport trousers, exercise shorts, shorts, skirts, dresses, jogging suits, [ lounge suits, shoulder wraps, belts, socks, leg warmers, ] swimsuits, bikinis, swim shorts, bathrobes [, sports gloves, namely, bicycling gloves, head scarves, nightwear and underwear; footwear, namely, sporting footwear, shoes, slippers, beach slippers, headgear, namely, visors and caps ]\n\n**Pseudo Mark**\n\nV VENICE BEACH\n\n**Pseudo Mark**\n\nV VENICE BEACH\n\n**Classification Information**\n\n**International Class**\n\n[**025**](https://trademarks.justia.com/international-class-code/025) \\- Clothing, footwear, headgear. - Clothing, footwear, headgear.\n\n**US Class Codes**\n\n022, 039\n\n**Class Status Code**\n\n**6** \\- Active\n\n**Class Status Date**\n\n2009-03-02\n\n**Primary Code**\n\n025\n\n**Current Trademark Owners**\n\n**Party Name**\n\nSCORETEX GmbH\n\n**Party Type**\n**31** \\- 1st New Owner Entered After Registration\n\n**Legal Entity Type**\n\n**27**\n\n**Address**\n\n_Please  with your Justia account to see this address._\n\n**Trademark Owner History**\n\n**Party Name**\n\nSCORETEX GmbH\n\n**Party Type**\n\n**31",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_6e30724d887c": {
      "evidence_id": "ev_6e30724d887c",
      "item_id": "item_fbbd96ccec77",
      "source_url": "https://giggster.com/guide/filming/venice",
      "source_title": "Filming in Venice Beach: Complete Location Guide | Giggster",
      "retrieved_at": "2026-09-08T11:18:52.217565Z",
      "snippet": "... film. Once you secure approval from the school administration, just go ahead with the FilmLA permit application process, get your permit, and start filming.\n\n### Filming At Venice Beach\n\nThe famous Venice Beach, which draws visitors from around t",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_f6a20db5dbe5": {
      "evidence_id": "ev_f6a20db5dbe5",
      "item_id": "item_fbbd96ccec77",
      "source_url": "https://www.visitveniceca.com/2020/05/09/venicefilmpermits/",
      "source_title": "Filming permits. Filming & Photography Shoot Permit Information",
      "retrieved_at": "2026-09-08T11:18:52.217583Z",
      "snippet": "Contact Film LA Inc. at 213-977-8600 for a film or photo shoot permit.\n    3. Once the date is reserved, please contact the Venice Beach Recreation Center office at 310-396-6764 for rates, fees, and on site location availability.\n    4. Payment for filming on Venice Beach park grounds must be made 48 hours prior to the production or photo shoot date. Filming is permitted Monday to Friday only, no weekends or holidays.\n    5. The Venice Beach Recreation Center office does not issue film or photo shoot permits for the Venice Beach Boardwalk, Venice Pier or the sand portion of the beach. If you are interested in filming or a photo shoot on the Venice Beach Boardwalk or Pier, please call the Park Film Office at 323-644-6220. For Filming on the sand portions of the beach, call Film LA at 213-977-8600.\n    \n    \\_\\_\\_\\_\\_\\_\n    \n    **1\\. The Venice Sign** \u2013 The sign is a federally registered trademark of the Venice Chamber of Commerce.",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_7564707128c4": {
      "evidence_id": "ev_7564707128c4",
      "item_id": "item_fbbd96ccec77",
      "source_url": "https://trademarks.justia.com/872/51/venice-87251374.html",
      "source_title": "VENICE Trademark of Venice Chamber of Commerce Corporation - Registration Number 5408569 - Serial Number 87251374 :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:52.217599Z",
      "snippet": "The mark consists of <strong>a three-dimensional configuration of a sign with the stylized word &quot;VENICE&quot; on the sign</strong>. The solid lines depict the mark.",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_ead7d1212f9d": {
      "evidence_id": "ev_ead7d1212f9d",
      "item_id": "item_fbbd96ccec77",
      "source_url": "https://venicechamber.net/venice-sign/",
      "source_title": "Venice Sign | Venice Chamber of Commerce",
      "retrieved_at": "2026-09-08T11:18:52.217615Z",
      "snippet": "<strong>The VENICE Sign</strong> is a federally registered trademark of the Venice Chamber of Commerce.",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_56889c8c452c": {
      "evidence_id": "ev_56889c8c452c",
      "item_id": "item_fbbd96ccec77",
      "source_url": "https://beaches.lacounty.gov/film-photo-permit/",
      "source_title": "Film & Photo Permit \u2013 Beaches & Harbors",
      "retrieved_at": "2026-09-08T11:18:52.217629Z",
      "snippet": "The Los Angeles County Department of Beaches and Harbors requires that any persons engaged in the business or activity of filming, videotaping, or otherwise producing motion pictures or still photography for television or public exhibition at any place, must obtain a Film Permit.",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_b40c749f9857": {
      "evidence_id": "ev_b40c749f9857",
      "item_id": "item_fbbd96ccec77",
      "source_url": "https://www.visitveniceca.com/2018/03/01/filmpermits/",
      "source_title": "Venice Beach Filming & Photography Shoot Permit Information",
      "retrieved_at": "2026-09-08T11:18:52.217644Z",
      "snippet": "4. Payment for filming on Venice Beach park grounds must be made 48 hours prior to the production or photo shoot date. <strong>Filming is permitted Monday to Friday only, no weekends or holidays</strong>.",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_89b3633f9211": {
      "evidence_id": "ev_89b3633f9211",
      "item_id": "item_fbbd96ccec77",
      "source_url": "https://recreation.parks.lacity.gov/venice/filming-photography-shoot-permit-information.html",
      "source_title": "Filming & Photography Shoot Permit Information | Venice Beach | City of Los Angeles Department of Recreation and Parks",
      "retrieved_at": "2026-09-08T11:18:52.217658Z",
      "snippet": "television or public exhibition at any place within Venice Beach, must **_first_** obtain a permit from the\nDepartment\u2019s Park Film Office.\n\nFilming on the Venice Beach Sand area will require an additional permit; please contact the Los\nAngeles Department of Beaches and Harbors at (213) 977-8600\n\nFor more information regarding obtaining a filming and/or photography permit, please call the Venice\nBeach Recreation Center at (310) 396-6764\n\n## Contact Info\n\n1800 Ocean Front Walk  \nVenice, CA 90291\n\nPhone: (310) 396\u20116764\n\nFax: (310) 577\u20111046\n\nVeniceBeach.RecreationCenter@lacity.org\n\n## Facility Hours of Operation\n\n**Recreation Center Hours of Operation:**  \n8\u202fam\u202f\u2013\u202f6\u202fpm Mon\u2011Friday  \n8\u202fam\u202f\u2013\u202f4\u202fpm Saturdays  \nClosed Sundays  \nThis Facility is CLOSED on City Observed Holidays\n\n**Muscle Beach Gym Hours of Operation:**  \nOctober 1st - April 30th: 8:00 am - 5:00 pm  \nMay 1st - September 30th: 8:00 am - 6:00 pm",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_11a218847777": {
      "evidence_id": "ev_11a218847777",
      "item_id": "item_edaf252de2d5",
      "source_url": "https://www.fourstateshomepage.com/news/national/great-gatsby-and-other-classics-copyrights-expire/",
      "source_title": "'Great Gatsby' and other classics' copyrights expire",
      "retrieved_at": "2026-09-08T11:18:52.505079Z",
      "snippet": "The copyright term was increased to <strong>70 years</strong> following the author\u2019s death, or 95 years after the work\u2019s publication date for corporate authors. \u201cThe Great Gatsby,\u201d along with many other 1925 works entering public domain now, were signed",
      "relevance_note": "Retrieved to establish author, publication_year, author_death_year, authorship_type, rights_holder.",
      "confidence": null
    },
    "ev_3f8ea5e5d8e1": {
      "evidence_id": "ev_3f8ea5e5d8e1",
      "item_id": "item_edaf252de2d5",
      "source_url": "https://time.com/5923279/great-gatsby-copyright-expires/",
      "source_title": "What 'The Great Gatsby' Copyright Expiration Means for Its Legacy",
      "retrieved_at": "2026-09-08T11:18:52.505174Z",
      "snippet": "When the copyright for Fitzgerald\u2019s classic novel of greed, desire and betrayal expires, anyone will be able to publish the book and adapt it without permission from his literary estate, which has controlled the text for the <strong>80 years</strong> since his",
      "relevance_note": "Retrieved to establish author, publication_year, author_death_year, authorship_type, rights_holder.",
      "confidence": null
    },
    "ev_8c3a3916aa01": {
      "evidence_id": "ev_8c3a3916aa01",
      "item_id": "item_edaf252de2d5",
      "source_url": "https://porterhousereview.org/?articles=bourne-back-ceaselessly-into-the-public-domain-the-great-gatsbys-copyright-protection-reaches-an-ending",
      "source_title": "Borne Back Ceaselessly into the Public Domain: The Great Gatsby\u2019s Copyright Protection Reaches an Ending | Porter House Review",
      "retrieved_at": "2026-09-08T11:18:52.505201Z",
      "snippet": "# Borne Back Ceaselessly into the Public Domain: The Great Gatsby\u2019s Copyright Protection Reaches an Ending\n\nBook cover of 'The Great Gatsby'\n\nMar 01 \u25cf BY [Molly Yingling](https://porterhousereview.org/?authors=molly-yingling)\n\n_\u201cA day will come, when, in the eye of the law, literary property will be as_ _sacred as whiskey, or any other of the necessaries of life.\u201d \u2014 Mark Twain_\n\nBubbling to the surface on New Year\u2019s Eve 2019 was the nostalgic promise of a second wave of the Roaring Twenties, a decade defined by excess\u2014jazz, mass consumerism, and social and economic change\u2014and exemplified in the writings of F. Scott Fitzgerald. While the promise of 2020 itself was largely undone by unpredictable catastrophic events, one certainty remained: the decade still held the return of Gatsby.\n\n95 years after its publication and 81 years after the death of its author, _The Great Gatsby_ at last entered the public domain on January 1, 2021.\n\n...\n\n[[1]]() Given the continual amendment and legislative lengthening of the copyright term, the date upon which a work will enter the public domain can be a difficult to predict, ever-changing horizon.\n\nAs a general matter, a copyright term\u2019s length hinge",
      "relevance_note": "Retrieved to establish author, publication_year, author_death_year, authorship_type, rights_holder.",
      "confidence": null
    },
    "ev_8df4be1e389c": {
      "evidence_id": "ev_8df4be1e389c",
      "item_id": "item_edaf252de2d5",
      "source_url": "https://ew.com/books/the-great-gatsby-public-domain",
      "source_title": "The Great Gatsby and other works from 1925 are now public domain",
      "retrieved_at": "2026-09-08T11:18:52.505224Z",
      "snippet": "The Great Gatsby and other works from 1925 are now public domain\nNow that we're in 2021, copyrights for books published in 1925 are lifting, including ones on F. Scott Fitzgerald 's The Great Gatsby.",
      "relevance_note": "Retrieved to establish author, publication_year, author_death_year, authorship_type, rights_holder.",
      "confidence": null
    },
    "ev_b9ccc1a79401": {
      "evidence_id": "ev_b9ccc1a79401",
      "item_id": "item_edaf252de2d5",
      "source_url": "https://en.wikipedia.org/wiki/The_Great_Gatsby",
      "source_title": "The Great Gatsby - Wikipedia",
      "retrieved_at": "2026-09-08T11:18:52.505247Z",
      "snippet": "The Great Gatsby - Wikipedia\nThe Great Gatsby (/ \u0261\u00e6tsbi\u02d0 / \u24d8) is a 1925 tragedy novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway 's interactions with Jay Gatsby, a mysterious millionaire obsessed with reuniting with his former lover, Daisy Buchanan. The novel was inspired by a youthful romance Fitzgerald had",
      "relevance_note": "Retrieved to establish author, publication_year, author_death_year, authorship_type, rights_holder.",
      "confidence": null
    },
    "ev_3954e654a540": {
      "evidence_id": "ev_3954e654a540",
      "item_id": "item_edaf252de2d5",
      "source_url": "https://www.vondranlegal.com/public-domain-examples-the-great-gatsby",
      "source_title": "Public domain examples, the Great Gatsby | Vondran Legal",
      "retrieved_at": "2026-09-08T11:18:52.505269Z",
      "snippet": "While the original 1925 novel is in the public domain, adaptations like the 1974 or 2013 films, their soundtracks, or specific visual designs (e.g., Leonardo DiCaprio's Gatsby) may still be under copyright. Do not use imagery, dialogue, or elements unique to these adaptations in your projects without permission or licensing.\n2. **International Copyright Variations**  \n   Public domain status is U.S.-specific. In other countries, copyright terms may differ (e.g., life of the author plus 70 years in the EU, where Fitzgerald died in 1940, so the novel may be protected until 2031). If selling or distributing internationally, check local copyright laws to ensure compliance.\n3. **Trademark Protections**  \n   Certain elements associated with _The Great Gatsby_ (e.g., character names or the title) could be trademarked for specific uses, such as merchandise or branding. For example, the Fitzgerald estate might hold trademarks on \u201cThe Great Gatsby\u201d for certain products.",
      "relevance_note": "Retrieved to establish author, publication_year, author_death_year, authorship_type, rights_holder.",
      "confidence": null
    },
    "ev_850d4f0a9a6d": {
      "evidence_id": "ev_850d4f0a9a6d",
      "item_id": "item_edaf252de2d5",
      "source_url": "https://en.wikisource.org/wiki/The_Great_Gatsby_(1925)",
      "source_title": "The Great Gatsby (1925) - Wikisource, the free online library",
      "retrieved_at": "2026-09-08T11:18:52.505292Z",
      "snippet": "The longest-living author of this work died in <strong>1940</strong>, so this work is in the public domain in countries and areas where the copyright term is the author&#x27;s life plus 85 years or less.",
      "relevance_note": "Retrieved to establish author, publication_year, author_death_year, authorship_type, rights_holder.",
      "confidence": null
    },
    "ev_1e954957c5a4": {
      "evidence_id": "ev_1e954957c5a4",
      "item_id": "item_edaf252de2d5",
      "source_url": "https://copyrightlately.com/great-gatsby-public-domain",
      "source_title": "\"The Great Gatsby\" and other 1925 Works Will Soon Enter the ...",
      "retrieved_at": "2026-09-08T11:18:52.505314Z",
      "snippet": "Scott Fitzgerald and trustee of the author\u2019s literary estate, stated, \u201cWe\u2019re just very grateful to have had it under copyright, not just for the rather obvious benefits, but to try and safeguard the text, to guide certain projects and try to avoid unfortunate ones.\u201d\n\nBut starting on January 1, 2021, even the unfortunate ones are fair game.\n\n## Running Down the Clock\n\nEstates of famous authors have sometimes attempted to enforce their rights in works soon to enter the public domain up until the last minute\u2014or even beyond. A few months ago, I wrote about an [ongoing legal battle by heirs of \u201cSherlock Holmes\u201d author Sir Arthur Conan Doyle](https://copyrightlately.com/enola-holmes-copyright-infringement-case/) , who have sued Netflix and others for copyright infringement.",
      "relevance_note": "Retrieved to establish author, publication_year, author_death_year, authorship_type, rights_holder.",
      "confidence": null
    },
    "ev_c09bd782490e": {
      "evidence_id": "ev_c09bd782490e",
      "item_id": "item_e33955bfacfb",
      "source_url": "https://www.trademarkia.com/echoplex-76088323",
      "source_title": "Trademark Search, Free, for Millions of Registered Trademarks with USPTO | Trademarkia",
      "retrieved_at": "2026-09-08T11:18:52.956934Z",
      "snippet": "The trademark was filed on 12 Jul 2000 with <strong>serial number (#76088323)</strong> . The ECHOPLEX trademark is filed in the category of Computer &amp; Software Products &amp; Electrical &amp; Scientific Products.",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_b4ce7c072d67": {
      "evidence_id": "ev_b4ce7c072d67",
      "item_id": "item_e33955bfacfb",
      "source_url": "https://film.ca.gov/state-permits/permit-faq/",
      "source_title": "Permit FAQ - California Film Commission - CA.gov",
      "retrieved_at": "2026-09-08T11:18:52.957018Z",
      "snippet": "<strong>The State considers an approved, issued CFC film permit to be your legal approval to use the state locations and images in your project in perpetuity. The CFC film permit, in most instances*, takes the place of a location agreement or signed release</strong>.",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_15b0e50c78db": {
      "evidence_id": "ev_15b0e50c78db",
      "item_id": "item_e33955bfacfb",
      "source_url": "https://www.trademarkia.com/search/trademarks?query=ECHOPLEX",
      "source_title": "12 Trademark Results found for \"ECHOPLEX\" | Trademarkia",
      "retrieved_at": "2026-09-08T11:18:52.957036Z",
      "snippet": "Trademarks \u00b7 Owners \u00b7 Logos \u00b7 Internet Brand Search \u00b7 \u00a9 \u00b7 Copyrights \u00b7 Domains \u00b7 Filters \u00b7 AI \u00b7 Also try searching for: <strong>ECHOPLEX* ECHO* *LEX \u00b7 EC*EX</strong> \u00b7 Live/Registered \u00b7 on 01 Mar 2024 \u00b7 Dunlop Manufacturing, Inc.",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_b97feeda7896": {
      "evidence_id": "ev_b97feeda7896",
      "item_id": "item_e33955bfacfb",
      "source_url": "https://en.wikipedia.org/wiki/The_Echo_(venue)",
      "source_title": "The Echo (venue) - Wikipedia",
      "retrieved_at": "2026-09-08T11:18:52.957052Z",
      "snippet": "In 2019, it was announced that Spaceland Productions, <strong>who</strong> <strong>owned</strong> <strong>and</strong> <strong>operated</strong> <strong>The</strong> Echo, <strong>The</strong> <strong>Echoplex</strong>, and other venues, was sold to Live Nation Entertainment.",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_1113a2b99c29": {
      "evidence_id": "ev_1113a2b99c29",
      "item_id": "item_e33955bfacfb",
      "source_url": "https://en.wikipedia.org/wiki/Echoplex_(venue)",
      "source_title": "Echoplex (venue) - Wikipedia",
      "retrieved_at": "2026-09-08T11:18:52.957066Z",
      "snippet": "<strong>Echoplex</strong> is a live music venue located in the Echo Park neighborhood of Los Angeles, California. It is <strong>owned</strong> <strong>and</strong> <strong>operated</strong> by the same people as the Echo, and the two are considered sister venues. It is located and commonly described as being &quot;below the Echo&quot;, leading some to erroneously believe",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_a865fe96590d": {
      "evidence_id": "ev_a865fe96590d",
      "item_id": "item_e33955bfacfb",
      "source_url": "https://www.thefilmfund.co/how-to-get-film-permits-and-location-releases/",
      "source_title": "How to Get Film Permits and Location Releases \u2013 The Film Fund",
      "retrieved_at": "2026-09-08T11:18:52.957081Z",
      "snippet": "Categories\n\n[Pre-production](https://www.thefilmfund.co/category/pre-production/) [Producing](https://www.thefilmfund.co/category/producing/)\n\n# How to Get Film Permits and Location Releases\n\nMarch 9, 2020 by Thomas Verdi\n\n\u201cDo I need a film permit\u201d may be high up on your list of questions. Well, if you want to make sure everything is done by the book and avoid headaches or liability down the line, the answer is a resounding yes.\n\nGetting film permits or location releases represents a crucial part of pre-production for your film. It\u2019s always a good idea to adhere to a pre-production checklist, and this should definitely make the list.\n\nIf you\u2019re producing a low-budget short film, it\u2019s always easier to shoot on private property, particularly property that you own. Location is largely an expense you can control. But sometimes you just absolutely need that football stadium or scene in the dog park.\n\n## Contact your film commission.\n\nphiladelphia film commission city hall\nIf you need to film in a well-known, public, or historic site, you will likely need a permit. Your film commission is the first place to go, and they will recommend who specifically you should reach out to in order to",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_28722a7c11a7": {
      "evidence_id": "ev_28722a7c11a7",
      "item_id": "item_e33955bfacfb",
      "source_url": "https://sierraiplaw.com/trade-dress/",
      "source_title": "Trade Dress explainer by experienced Trademark Attorneys",
      "retrieved_at": "2026-09-08T11:18:52.957095Z",
      "snippet": "The elements of the restaurant that contributed to the trade dress included the exterior building design and decoration, the signage, and the interior layout and d\u00e9cor. A less tangible, but more famous example of trade dress is the three tones of the NBC chime - see US Trademark Registration No.",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_4e86828456df": {
      "evidence_id": "ev_4e86828456df",
      "item_id": "item_e33955bfacfb",
      "source_url": "https://grokipedia.com/page/echoplex_venue",
      "source_title": "Echoplex (venue) \u2014 Grokipedia",
      "retrieved_at": "2026-09-08T11:18:52.957110Z",
      "snippet": "The Echoplex is a renowned live ... artists from around the world.[1] Owned initially by Spaceland Presents and acquired by <strong>Live Nation</strong> in 2019, the venue has become a cornerstone of Los Angeles&#x27; vibrant music scene, emphasizing",
      "relevance_note": "Retrieved to establish owner, permit_required, trademark_status.",
      "confidence": null
    },
    "ev_f25684b61d30": {
      "evidence_id": "ev_f25684b61d30",
      "item_id": "item_7901727b8f1f",
      "source_url": "https://www.britannica.com/biography/Joni-Mitchell",
      "source_title": "Joni Mitchell | Biography, Songs, Blue, Albums, Big Yellow ...",
      "retrieved_at": "2026-09-08T11:18:53.586420Z",
      "snippet": "Jul 9, 2026 \u2014 Joni Mitchell, born on November 7, 1943, is a Canadian singer-songwriter known for her experimental style and significant influence on folk",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_1d1923f39727": {
      "evidence_id": "ev_1d1923f39727",
      "item_id": "item_7901727b8f1f",
      "source_url": "https://en.wikipedia.org/wiki/Joni_Mitchell",
      "source_title": "Joni Mitchell",
      "retrieved_at": "2026-09-08T11:18:53.586657Z",
      "snippet": "Joni Mitchell\n\"Joni\" Mitchell (n\u00e9e Anderson; born 7 November 1943) is a Canadian singer-songwriter, multi-instrumentalist, and painter. Born Roberta Joan Anderson (1943-11-",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_d93819cd81b7": {
      "evidence_id": "ev_d93819cd81b7",
      "item_id": "item_7901727b8f1f",
      "source_url": "https://rightofpublicity.com/",
      "source_title": "Right Of Publicity - The leading online Right of Publicity resource.",
      "retrieved_at": "2026-09-08T11:18:53.586680Z",
      "snippet": "# Right of Publicity\n\n## The leading online Right of Publicity resource.\n\n# Welcome to RightOfPublicity.com\n\nThe Right of Publicity is a state-based right which continues to evolve through case law and legislation. The Right of Publicity (and NIL) consistently demonstrates the critical role it fulfills, providing recourse for infringement and structure for licensing of living and deceased personalities, estate tax, and infringement valuations, as well as a blueprint for emerging technology concerning AI, NFTs, deep fakes, and NIL. Even though recognition varies from state to state, the Right of Publicity is not indecipherable. Though often misunderstood or misrepresented, one can discern consistency and policy underpinnings in the Right of Publicity. Similarly, with a qualified valuation expert witness, the Right of Publicity can be valued accurately.\n\nRightOfPublicity.\ncom provides news, Right of Publicity statutes, landmark cases, and other information, often with the perspective of someone who has represented notable rights owners for decades and has served as an expert witness in significant Right of Publicity disputes and valuations. The author, Jonathan Faber, teaches this su",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_adf239dc4003": {
      "evidence_id": "ev_adf239dc4003",
      "item_id": "item_7901727b8f1f",
      "source_url": "https://en.necropedia.org/obituary/Joni_Mitchell",
      "source_title": "Joni Mitchell's obituary - Necropedia",
      "retrieved_at": "2026-09-08T11:18:53.586696Z",
      "snippet": "##### What is an anticipated obituary?\n\n> An anticipated obituary is, by definition, an obituary written BEFORE the death of a person. It is common for news agencies to keep pre-written obituary for public figures, famous and high-profile people who are still alive.\n> **It is by no means a death announcement** nor an anticipation of death.\n\n#### About\n\nEncyclopedia of Death and Dying \u00bb\n\n##### Most Popular\n\n* [Man submits fake obituary of mom to get day off work](https://en.necropedia.org/about/Fake_obituary_for_living_mother \"Man submits fake obituary of mom to get day off work\")\n  \n  [Man submits fake obituary of mom to get day off work](https://en.necropedia.org/about/Fake_obituary_for_living_mother \"Man submits fake obituary of mom to get day off work\")\n  \n  [2012-08-01]\n* [Quotations about Death](https://en.necropedia.org/about/Quotations_about_Death \"Quotations about Death\")\n  \n  [Quotations about Death](https://en.necropedia.org/about/Quotations_about_Death \"Quotations about Death\")",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_1fd1cc1576b0": {
      "evidence_id": "ev_1fd1cc1576b0",
      "item_id": "item_7901727b8f1f",
      "source_url": "https://jonimitchell.com/permissions.cfm",
      "source_title": "Joni Mitchell - Permissions",
      "retrieved_at": "2026-09-08T11:18:53.586711Z",
      "snippet": "# Joni Mitchell\n\n### MENU\n\n# Permissions\n\nJoni Mitchell\n\nPhoto: Kevin Mazur\n\n## Permissions Contacts\n\nNOTE: _email addresses below may have spam-inhibiting spaces built in. Remove all spaces before sending._\n\nIf you'd like to **request an interview** or desire **press material** , please direct these inquiries to [Rhino Records Publicity](mailto:JoniPR @ rhino.com) .\n\n#### For any of the following...\n\n> * The use of one of Joni's songs (her recording, her voice) in a film, on TV, in a live stage production, or some other form of media.\n> * Creation of a new version of an existing composition.\n> * Selling your original arrangement of an existing composition.\n> * Use of lyrics in a publication (eg. books, periodicals, and other printed media).\n> * An audio recording of a composition on a tape, CD, or Digital Download format.\n> * A video recording of a composition on a video tape, DVD, or Digital Download format.\n> * A broadcast of a recorded performance for television, film and radio.",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_96fd067a5c24": {
      "evidence_id": "ev_96fd067a5c24",
      "item_id": "item_7901727b8f1f",
      "source_url": "https://en.m.wikipedia.org/wiki/Joni_Mitchell",
      "source_title": "Joni Mitchell - Wikipedia",
      "retrieved_at": "2026-09-08T11:18:53.586726Z",
      "snippet": "Joni Mitchell - Wikipedia\nRoberta Joan Mitchell (n\u00e9e Anderson; born 7 November 1943) is a Canadian singer-songwriter, multi-instrumentalist, and painter.",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_29c8e2bb8862": {
      "evidence_id": "ev_29c8e2bb8862",
      "item_id": "item_7901727b8f1f",
      "source_url": "https://www.biography.com/musicians/joni-mitchell",
      "source_title": "Joni Mitchell: Biography, Musician, 2024 Grammy Winner/Performer",
      "retrieved_at": "2026-09-08T11:18:53.586741Z",
      "snippet": "FULL NAME: Roberta Joan Mitchell BORN: <strong>November 7, 1943</strong> BIRTHPLACE: For Macleod, Canada SPOUSES: Chuck Mitchell (1965-1967) and Larry Klein (1982-1994) CHILD: Kilauren ASTROLOGICAL SIGN: Scorpio \u00b7 Singer-songwriter Joni Mitchell was born Roberta",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_76f2789bddbd": {
      "evidence_id": "ev_76f2789bddbd",
      "item_id": "item_7901727b8f1f",
      "source_url": "https://rightofpublicity.com/notable-cases",
      "source_title": "Select Right of Publicity Cases - Right Of Publicity",
      "retrieved_at": "2026-09-08T11:18:53.586756Z",
      "snippet": "# Right of Publicity\n\n## The leading online Right of Publicity resource.\n\n# Select Right of Publicity Cases\n\nCase law concerning the Right of Publicity often provides fascinating fact patterns and memorable reading. Through careful review of statutory and judicial resources, it is possible to comprehend the Right of Publicity as a doctrine with discernible standards and a critical mission. Still, it is an evolving doctrine. In the context of Right of Publicity valuations, cases that involve damages awards and insight on how remedies were assessed (typically with a Right of Publicity expert witness valuation) can be useful.\n\n* * *\n\nThe selected cases below are sortable by plaintiff, date, or state. To sort the cases by one of these criteria, select the title at the top of that column.\n\n|PLAINTIFF |DATE |STATE |\n| --- | --- | --- |\n|[Abdul Jabbar v. GM](https://rightofpublicity.com/pdf/cases/abduljabbar.pdf) |1996 |California |\n|[Allison](https://rightofpublicity.com/pdf/cases/allison.",
      "relevance_note": "Retrieved to establish is_person_living, person_death_year, domicile_state_at_death, estate_administrator.",
      "confidence": null
    },
    "ev_e71edf32d283": {
      "evidence_id": "ev_e71edf32d283",
      "item_id": "item_b1d796825054",
      "source_url": "https://www.trademarkia.com/gibson-90606642",
      "source_title": "Trademark Search, Free, for Millions of Registered Trademarks with USPTO | Trademarkia",
      "retrieved_at": "2026-09-08T11:18:53.567418Z",
      "snippet": "... GIBSON is a <strong>registered trademark (Registration #6653144)</strong> owned by GIBSON, INC., a NASHVILLE based entity located in TN. The trademark was filed on 26 Mar 2021 with serial number (#90606642) and registered on 22 Feb 2022.",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_8296419488ca": {
      "evidence_id": "ev_8296419488ca",
      "item_id": "item_b1d796825054",
      "source_url": "https://www.trademarkia.com/owners/gibson-brands-inc",
      "source_title": "Gibson Brands Inc.: details of the 246 owned trademarks",
      "retrieved_at": "2026-09-08T11:18:53.567505Z",
      "snippet": "Leave us a message\n\n[Text Us](https://wa.me/+18777949511)\n\nGuest\n\nSearch\n\nTrademark Search Owners Gibson Brands Inc.\n\n# 246 Trademarks found that are owned by Gibson Brands Inc.\n\nStill want to file?\n\nFilters\n\nCheck Registrability\n\nAI\n\n88841797\n\nLive/Registered\n\non **16 Jul 2024**\n\n## LES PAUL\n\nGibson Brands, Inc.\n\n88841797 \u00b7 20 Mar 2020\n\n16 Jul 2030\n\n009\n\nClass 009\n\nComputer & Software Products & Electrical & Scientific Products\n\nCell phone covers; Cell phone faceplates; Cell phone cases\n\n014\n\nClass 014\n\nJewelry Products\n\nMusical toys; Toy figures; Toy model guitars; Toy models\n\n...\n\nClass 016\n\nPaper Goods and Printed Material\n\nBumper stickers; Pens; Posters\n\n* * *\n\nClass 020\n\nFurniture Products\n\nHorological and chronometric instruments and cases therefor; Horological and chronometric instruments and parts thereof; Jewelry; Key chains for use as jewelry; Key chains of precious metal\n\n* * *\n\nClass 021\n\nHouseware and Glass Products\n\nBeverage glassware\n\n* * *\n\nClass 028\n\n...\n\n## Logo Mark\n\nGibson Brands, Inc.\n\n86168793 \u00b7 17 Jan 2014\n\n015\n\nClass 015\n\nMusical Instrument Products\n\nColor is not claimed as a feature of the mark.\n\nColor is not claimed as a feature of the mark.,stringed musi",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_d021b1d50374": {
      "evidence_id": "ev_d021b1d50374",
      "item_id": "item_b1d796825054",
      "source_url": "https://trademarks.justia.com/745/70/n-74570078.html",
      "source_title": "Trademark of GIBSON BRANDS, INC. - Registration Number 2053805 - Serial Number 74570078 :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:53.567524Z",
      "snippet": "stringed instruments, namely guitars\n\n**Classification Information**\n\n**International Class**\n\n[**015**](https://trademarks.justia.com/international-class-code/015) \\- Musical instruments. - Musical instruments.\n\n**US Class Codes**\n\n036\n\n**Class Status Code**\n\n**6** \\- Active\n\n**Class Status Date**\n\n1994-12-19\n\n**Primary Code**\n\n015\n\n**First Use Anywhere Date**\n\n1958-12-31\n\n**First Use In Commerce Date**\n\n1958-12-31\n\n**Current Trademark Owners**\n\n**Party Name**\n\nGIBSON BRANDS, INC.\n\n**Party Type**\n\n**31** \\- 1st New Owner Entered After Registration\n\n**Legal Entity Type**\n\n**03** \\- Corporation\n\n**Address**\n\n_Please  with your Justia account to see this address._\n\n**Trademark Owner History**\n\n**Party Name**\n\nGIBSON BRANDS, INC.\n\n**Party Type**\n\n**31** \\- 1st New Owner Entered After Registration\n\n**Legal Entity Type**\n\n**03** \\- Corporation\n\n**Address**\n\n_Please  with your Justia account to see this address._\n\n**Party Name**\n\nGibson Guitar Corp.\n\n**Party Type**",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_9f93503bf7cb": {
      "evidence_id": "ev_9f93503bf7cb",
      "item_id": "item_b1d796825054",
      "source_url": "https://uspto.report/TM/88841797",
      "source_title": "LES PAUL - Gibson Brands, Inc. Trademark Registration",
      "retrieved_at": "2026-09-08T11:18:53.567539Z",
      "snippet": "Trademark registration by Gibson Brands, Inc. for the trademark LES PAUL.",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_fc04d0262bd2": {
      "evidence_id": "ev_fc04d0262bd2",
      "item_id": "item_b1d796825054",
      "source_url": "https://www.gibson.com/pages/trademarks-of-gibson-inc",
      "source_title": "Trademarks of Gibson Inc",
      "retrieved_at": "2026-09-08T11:18:53.567554Z",
      "snippet": "NOTICE: The following Trademarks are owned by Gibson Inc. (\u00ae based on U.S. Registrations but many of the marks are registered in other countries)",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_3669b7c8be52": {
      "evidence_id": "ev_3669b7c8be52",
      "item_id": "item_b1d796825054",
      "source_url": "https://uspto.report/TM/90606642",
      "source_title": "GIBSON - Gibson Brands, Inc. Trademark Registration",
      "retrieved_at": "2026-09-08T11:18:53.567569Z",
      "snippet": "# GIBSON\n\n## Gibson Brands, Inc.\n\n1. [USPTO Trademarks](https://uspto.report/TM/)\n\u203a2. [Gibson Brands, Inc.](https://uspto.report/company/Gibson-Brands-Inc)\n\u203a3. [Gibson Application #90606642](https://uspto.report/TM/90606642/)\n\nApplication Filed: 2021-03-26\n\nTrademark Application Details\n\nTrademark Logo GIBSON\n\nThe mark consists of a three-dimensional configuration comprising the product design of the stylized word element GIBSON appearing on a uniquely-shaped guitar headstock, with a uniquely-shaped guitar body. Elements shown in broken lines are not part of the mark and serve only to show the position or placement of the mark.\n\nMark For: GIBSON\u00ae trademark registration is intended to cover the categories of musical instruments, namely, guitars.\n\n#### Status\n\n2021-03-31 UTC  \n\u27f3 Refresh\n\nLIVE APPLICATION Awaiting Examination\n\nThe trademark application has been accepted by the Office (has met the minimum filing requirements) and has not yet been assigned to an examiner.\n\n...\n\n|Description |Date |Proceeding Number |\n| --- | --- | --- |\n|NEW APPLICATION ENTERED IN TRAM |2021-03-30 | |\n\n|Mark Image  \nRegistration | Serial |Company\n\nTrademark  \nApplication Date |\n| --- | --- |\n|GIBSON GIB",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_52571de87657": {
      "evidence_id": "ev_52571de87657",
      "item_id": "item_b1d796825054",
      "source_url": "https://trademarks.justia.com/852/16/n-85216721.html",
      "source_title": "  Trademark of Gibson Brands, Inc. - Registration Number 3976202 - Serial Number 85216721 :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:53.567589Z",
      "snippet": "**Indication of Colors claimed**\n\nColor is not claimed as a feature of the mark.\n\n**Description of Mark**\n\nThe mark consists of the three dimensional configuration of a guitar peg head.\n\n**Goods and Services**\n\nStringed instruments, namely, guitars and electric guitars\n\n**Classification Information**\n\n**International Class**\n\n[**015**](https://trademarks.justia.com/international-class-code/015) \\- Musical instruments. - Musical instruments.\n\n**US Class Codes**\n\n002, 021, 036\n\n**Class Status Code**\n\n**6** \\- Active\n\n**Class Status Date**\n\n2011-01-18\n\n**Primary Code**\n\n015\n\n**First Use Anywhere Date**\n\n1958-12-31\n\n**First Use In Commerce Date**\n\n1958-12-31\n\n**Current Trademark Owners**\n\n**Party Name**\n\nGibson Brands, Inc.\n\n**Party Type**\n\n**31** \\- 1st New Owner Entered After Registration\n\n**Legal Entity Type**\n\n**03** \\- Corporation\n\n**Address**\n\n_Please  with your Justia account to see this address._\n\n**Trademark Owner History**\n\n**Party Name**\n\nGibson Brands, Inc.\n\n**Party Type**",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    },
    "ev_cb92229172af": {
      "evidence_id": "ev_cb92229172af",
      "item_id": "item_b1d796825054",
      "source_url": "https://trademarks.justia.com/737/55/gibson-73755657.html",
      "source_title": "GIBSON Trademark of GIBSON BRANDS, INC. - Registration Number 1545311 - Serial Number 73755657 :: Justia Trademarks",
      "retrieved_at": "2026-09-08T11:18:53.567604Z",
      "snippet": "Class Status Date \u00b7 1988-10-18 \u00b7 Primary Code \u00b7 015 \u00b7 First Use Anywhere Date \u00b7 1890-01-01 \u00b7 First Use In Commerce Date \u00b7 1890-01-01 \u00b7 Current Trademark Owners \u00b7 Party Name \u00b7 GIBSON BRANDS, INC. Party Type \u00b7 32 - 2nd New Owner Entered After Registration \u00b7",
      "relevance_note": "Retrieved to establish registrant, registration_status, nice_classes, usage_policy.",
      "confidence": null
    }
  },
  "review_states": {
    "item_4051d7cfe988": {
      "item_id": "item_4051d7cfe988",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_ceb693738e73": {
      "item_id": "item_ceb693738e73",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_4f29daeee2b1": {
      "item_id": "item_4f29daeee2b1",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_ceb6a70b34d4": {
      "item_id": "item_ceb6a70b34d4",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_8558fc24473b": {
      "item_id": "item_8558fc24473b",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_320649948473": {
      "item_id": "item_320649948473",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_74eabfebbb60": {
      "item_id": "item_74eabfebbb60",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_ab7298e47bca": {
      "item_id": "item_ab7298e47bca",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_7999e01c917c": {
      "item_id": "item_7999e01c917c",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_c28c010c3064": {
      "item_id": "item_c28c010c3064",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_0e21e763f3c2": {
      "item_id": "item_0e21e763f3c2",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_4ac4ea6f6480": {
      "item_id": "item_4ac4ea6f6480",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_b6d84d21d91e": {
      "item_id": "item_b6d84d21d91e",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_2763dcf7f352": {
      "item_id": "item_2763dcf7f352",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_81a717e2944d": {
      "item_id": "item_81a717e2944d",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_3c88b902b2de": {
      "item_id": "item_3c88b902b2de",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_0dff9dbcaf39": {
      "item_id": "item_0dff9dbcaf39",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_75ee3491ea73": {
      "item_id": "item_75ee3491ea73",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_cec43d334307": {
      "item_id": "item_cec43d334307",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_97d887b5109a": {
      "item_id": "item_97d887b5109a",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_0a02db79809c": {
      "item_id": "item_0a02db79809c",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_ed4fb13eb46a": {
      "item_id": "item_ed4fb13eb46a",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_fbbd96ccec77": {
      "item_id": "item_fbbd96ccec77",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_edaf252de2d5": {
      "item_id": "item_edaf252de2d5",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_e33955bfacfb": {
      "item_id": "item_e33955bfacfb",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_7901727b8f1f": {
      "item_id": "item_7901727b8f1f",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    },
    "item_b1d796825054": {
      "item_id": "item_b1d796825054",
      "decision": "PENDING",
      "reviewer_note": "",
      "reviewer": null,
      "decided_at": null
    }
  },
  "audit_log": [
    {
      "entry_id": "log_ac79bde21f12",
      "timestamp": "2026-09-08T11:17:04.224595Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "INGEST",
      "tool": "gemini.parse_scenes",
      "input_summary": "7 pages, 6692 chars",
      "output_summary": "15 scenes segmented",
      "latency_ms": 17243.62049996853,
      "token_cost": 8497,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "model": "gemini-flash-latest"
      }
    },
    {
      "entry_id": "log_f313c34f7125",
      "timestamp": "2026-09-08T11:17:04.228675Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "INGEST",
      "tool": "parser.parse_script",
      "input_summary": "the_last_good_year.pdf (7 pages)",
      "output_summary": "15 scenes, 0 parser notes",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "parser_notes": []
      }
    },
    {
      "entry_id": "log_097a0a49ce73",
      "timestamp": "2026-09-08T11:17:35.532349Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "EXTRACT",
      "tool": "gemini.extract_items",
      "input_summary": "scenes 10-15 (5852 chars)",
      "output_summary": "9 raw mentions",
      "latency_ms": 31252.601499669254,
      "token_cost": 5017,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "model": "gemini-3.1-pro-preview",
        "scene_range": "scenes 10-15"
      }
    },
    {
      "entry_id": "log_52a3fd1a0c43",
      "timestamp": "2026-09-08T11:18:46.053907Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "EXTRACT",
      "tool": "gemini.extract_items",
      "input_summary": "scenes 1-9 (8870 chars)",
      "output_summary": "27 raw mentions",
      "latency_ms": 101773.14708288759,
      "token_cost": 17161,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "model": "gemini-3.1-pro-preview",
        "scene_range": "scenes 1-9"
      }
    },
    {
      "entry_id": "log_4326aca4583b",
      "timestamp": "2026-09-08T11:18:46.058068Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "EXTRACT",
      "tool": "extractor.extract_items",
      "input_summary": "15 scenes in 2 chunks, concurrency=6",
      "output_summary": "36 raw mentions before deduplication (2 chunks in 101795 ms wall clock)",
      "latency_ms": 101794.68616703525,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "chunk_count": 2,
        "chunk_size": 9,
        "concurrency": 6,
        "empty_chunks": []
      }
    },
    {
      "entry_id": "log_21bad09e766c",
      "timestamp": "2026-09-08T11:18:46.059697Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "DEDUPLICATE",
      "tool": "extractor.deduplicate",
      "input_summary": "36 raw mentions",
      "output_summary": "27 distinct items (0 skipped, 9 mentions merged) -> 27 research tasks instead of 36",
      "latency_ms": 1.4694579876959324,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "skipped": [],
        "raw_mentions": 36,
        "distinct_items": 27
      }
    },
    {
      "entry_id": "log_01571b7646f0",
      "timestamp": "2026-09-08T11:18:46.060426Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "config.preflight",
      "input_summary": "27 items queued for research",
      "output_summary": "PARALLEL_API_KEY resolved (length=40, source=.env file or Secret Manager)",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "name": "PARALLEL_API_KEY",
        "present": true,
        "length": 40,
        "source": ".env file or Secret Manager",
        "env_shadowing_dotenv": false
      }
    },
    {
      "entry_id": "log_42b0f0e35ebe",
      "timestamp": "2026-09-08T11:18:47.285076Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "MERIDIAN SOUND [NAME_COLLISION]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 1142.8051670081913,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_4051d7cfe988",
        "aspect": "GENERAL",
        "facts_sought": [
          "real_entity_exists",
          "sector",
          "trademark_status"
        ],
        "objective": "The screenplay uses 'Meridian Sound' as a fictional name. Determine whether a real company, organisation or notable person of that name exists, and if so in what sector and territory, whether the name is registered as a trademark, and whether the real entity operates in a field close enough to the f",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_e029c39a0a63",
      "timestamp": "2026-09-08T11:18:47.287000Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "THE GOLDEN BEAR DINER [NAME_COLLISION]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 1146.0762498900294,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_4f29daeee2b1",
        "aspect": "GENERAL",
        "facts_sought": [
          "real_entity_exists",
          "sector",
          "trademark_status"
        ],
        "objective": "The screenplay uses 'The Golden Bear Diner' as a fictional name. Determine whether a real company, organisation or notable person of that name exists, and if so in what sector and territory, whether the name is registered as a trademark, and whether the real entity operates in a field close enough t",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_da9afdfa15db",
      "timestamp": "2026-09-08T11:18:47.376131Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "Gene Austin [REAL_PERSON]",
      "output_summary": "8 evidence from 9 sources",
      "latency_ms": 1235.064750071615,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_ceb6a70b34d4",
        "aspect": "GENERAL",
        "facts_sought": [
          "is_person_living",
          "person_death_year",
          "domicile_state_at_death",
          "estate_administrator"
        ],
        "objective": "Establish the right-of-publicity position for 'Gene Austin'. Determine: whether they are living or deceased; the exact year of death if deceased; their state or country of domicile at death, because post-mortem publicity terms are set by domicile and range from none to 100 years; who administers the",
        "sources_without_url": 1
      }
    },
    {
      "entry_id": "log_ab90550df9e8",
      "timestamp": "2026-09-08T11:18:47.459723Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "VOSS & ASSOCIATES [NAME_COLLISION]",
      "output_summary": "8 evidence from 9 sources",
      "latency_ms": 1318.20062501356,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_8558fc24473b",
        "aspect": "GENERAL",
        "facts_sought": [
          "real_entity_exists",
          "sector",
          "trademark_status"
        ],
        "objective": "The screenplay uses 'Voss & Associates' as a fictional name. Determine whether a real company, organisation or notable person of that name exists, and if so in what sector and territory, whether the name is registered as a trademark, and whether the real entity operates in a field close enough to th",
        "sources_without_url": 1
      }
    },
    {
      "entry_id": "log_b8377489b5dc",
      "timestamp": "2026-09-08T11:18:48.039151Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "Rolex Submariner [BRAND_TRADEMARK]",
      "output_summary": "8 evidence from 9 sources",
      "latency_ms": 1895.260791759938,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_320649948473",
        "aspect": "GENERAL",
        "facts_sought": [
          "registrant",
          "registration_status",
          "nice_classes",
          "usage_policy"
        ],
        "objective": "Establish the trademark position of 'Rolex Submariner'. Identify: the current registered proprietor or registrant; whether the registration is live, cancelled, abandoned or expired; the Nice classes the registration covers; and whether the owner publishes a brand-usage, trademark or film-clearance p",
        "sources_without_url": 1
      }
    },
    {
      "entry_id": "log_8f98598ece33",
      "timestamp": "2026-09-08T11:18:48.450249Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "COCA-COLA [BRAND_TRADEMARK]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 2301.2887919321656,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_ab7298e47bca",
        "aspect": "GENERAL",
        "facts_sought": [
          "registrant",
          "registration_status",
          "nice_classes",
          "usage_policy"
        ],
        "objective": "Establish the trademark position of 'Coca-Cola'. Identify: the current registered proprietor or registrant; whether the registration is live, cancelled, abandoned or expired; the Nice classes the registration covers; and whether the owner publishes a brand-usage, trademark or film-clearance policy g",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_d7bdd7e3e3ca",
      "timestamp": "2026-09-08T11:18:48.648349Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "Gibson ES-335 [BRAND_TRADEMARK]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 2499.3429169990122,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_74eabfebbb60",
        "aspect": "GENERAL",
        "facts_sought": [
          "registrant",
          "registration_status",
          "nice_classes",
          "usage_policy"
        ],
        "objective": "Establish the trademark position of 'Gibson ES-335'. Identify: the current registered proprietor or registrant; whether the registration is live, cancelled, abandoned or expired; the Nice classes the registration covers; and whether the owner publishes a brand-usage, trademark or film-clearance poli",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_3b1620d656f4",
      "timestamp": "2026-09-08T11:18:48.697725Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "CHATEAU MARMONT [REAL_LOCATION_BUSINESS]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 2541.2168754264712,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_c28c010c3064",
        "aspect": "GENERAL",
        "facts_sought": [
          "owner",
          "permit_required",
          "trademark_status"
        ],
        "objective": "Establish the filming and depiction position for 'Chateau Marmont'. Identify: the current owner or operator; whether a location release or filming permit is customarily required to depict or film there; whether the name, signage or trade dress is registered as a trademark; and any reported dispute o",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_5f5482f86b0a",
      "timestamp": "2026-09-08T11:18:48.771131Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "SUNSET BOULEVARD [REAL_LOCATION_BUSINESS]",
      "output_summary": "6 evidence from 6 sources",
      "latency_ms": 2622.1159580163658,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_7999e01c917c",
        "aspect": "GENERAL",
        "facts_sought": [
          "owner",
          "permit_required",
          "trademark_status"
        ],
        "objective": "Establish the filming and depiction position for 'Sunset Boulevard'. Identify: the current owner or operator; whether a location release or filming permit is customarily required to depict or film there; whether the name, signage or trade dress is registered as a trademark; and any reported dispute ",
        "sources_without_url": 0
      }
    },
    {
      "entry_id": "log_9921c65aecd5",
      "timestamp": "2026-09-08T11:18:49.164804Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "Clinton [REAL_PERSON]",
      "output_summary": "8 evidence from 9 sources",
      "latency_ms": 3015.64879110083,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_0e21e763f3c2",
        "aspect": "GENERAL",
        "facts_sought": [
          "is_person_living",
          "person_death_year",
          "domicile_state_at_death",
          "estate_administrator"
        ],
        "objective": "Establish the right-of-publicity position for 'Bill Clinton'. Determine: whether they are living or deceased; the exact year of death if deceased; their state or country of domicile at death, because post-mortem publicity terms are set by domicile and range from none to 100 years; who administers th",
        "sources_without_url": 1
      }
    },
    {
      "entry_id": "log_ccd23148f0c8",
      "timestamp": "2026-09-08T11:18:49.706024Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "\"BYE BYE BLACKBIRD.\" [MUSIC/COMPOSITION]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 3489.0187922865152,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_4ac4ea6f6480",
        "aspect": "COMPOSITION",
        "facts_sought": [
          "composer",
          "publication_year",
          "author_death_year",
          "publisher"
        ],
        "objective": "Research the MUSICAL COMPOSITION (the underlying song, not any particular recording) of 'Bye Bye Blackbird'. Identify: the composer and lyricist; the year of first publication of the composition; the composer's year of death if deceased; and the current music publisher or administrator controlling t",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_9bc3779434d8",
      "timestamp": "2026-09-08T11:18:49.706625Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "\"BYE BYE BLACKBIRD.\" [MUSIC/SOUND_RECORDING]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 3556.6680836491287,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_4ac4ea6f6480",
        "aspect": "SOUND_RECORDING",
        "facts_sought": [
          "recording_artist",
          "publication_year",
          "label",
          "master_owner"
        ],
        "objective": "Research SOUND RECORDINGS of 'Bye Bye Blackbird' (specific masters, not the underlying composition). Identify: notable recording artists and the year each recording was first released; the record label or current owner of the master; and who controls master-use licensing. A public-domain composition",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_931682be9d38",
      "timestamp": "2026-09-08T11:18:49.879545Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "FEDEX [LOGO_PROP]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 3729.896374978125,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_2763dcf7f352",
        "aspect": "GENERAL",
        "facts_sought": [
          "mark_owner",
          "trademark_status",
          "usage_policy"
        ],
        "objective": "'FedEx' appears on screen as a logo, signage or branded prop. Identify the owner of the mark or design, whether the logo is separately registered as a trademark or protected by copyright as an artistic work, and any published policy on depicting the logo in film.",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_fdf4fc1fa404",
      "timestamp": "2026-09-08T11:18:49.976161Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "CAPITOL RECORDS [LOGO_PROP]",
      "output_summary": "8 evidence from 8 sources",
      "latency_ms": 3827.1969999186695,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_b6d84d21d91e",
        "aspect": "GENERAL",
        "facts_sought": [
          "mark_owner",
          "trademark_status",
          "usage_policy"
        ],
        "objective": "'Capitol Records' appears on screen as a logo, signage or branded prop. Identify the owner of the mark or design, whether the logo is separately registered as a trademark or protected by copyright as an artistic work, and any published policy on depicting the logo in film.",
        "sources_without_url": 0
      }
    },
    {
      "entry_id": "log_833836a0d4bd",
      "timestamp": "2026-09-08T11:18:50.453617Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "VALLEY PAWN & LOAN [NAME_COLLISION]",
      "output_summary": "8 evidence from 9 sources",
      "latency_ms": 4313.873874954879,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_ceb693738e73",
        "aspect": "GENERAL",
        "facts_sought": [
          "real_entity_exists",
          "sector",
          "trademark_status"
        ],
        "objective": "The screenplay uses 'Valley Pawn & Loan' as a fictional name. Determine whether a real company, organisation or notable person of that name exists, and if so in what sector and territory, whether the name is registered as a trademark, and whether the real entity operates in a field close enough to t",
        "sources_without_url": 1
      }
    },
    {
      "entry_id": "log_bb8557b265d7",
      "timestamp": "2026-09-08T11:18:50.642401Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "APPLE [LOGO_PROP]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 4492.289375048131,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_81a717e2944d",
        "aspect": "GENERAL",
        "facts_sought": [
          "mark_owner",
          "trademark_status",
          "usage_policy"
        ],
        "objective": "'Apple Inc.' appears on screen as a logo, signage or branded prop. Identify the owner of the mark or design, whether the logo is separately registered as a trademark or protected by copyright as an artistic work, and any published policy on depicting the logo in film.",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_2737e80586ec",
      "timestamp": "2026-09-08T11:18:50.757593Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "STARBUCKS [LOGO_PROP]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 4607.950791250914,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_3c88b902b2de",
        "aspect": "GENERAL",
        "facts_sought": [
          "mark_owner",
          "trademark_status",
          "usage_policy"
        ],
        "objective": "'Starbucks' appears on screen as a logo, signage or branded prop. Identify the owner of the mark or design, whether the logo is separately registered as a trademark or protected by copyright as an artistic work, and any published policy on depicting the logo in film.",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_7a19b366fd1e",
      "timestamp": "2026-09-08T11:18:50.847364Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "Penguin [BRAND_TRADEMARK]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 4697.320125065744,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_0dff9dbcaf39",
        "aspect": "GENERAL",
        "facts_sought": [
          "registrant",
          "registration_status",
          "nice_classes",
          "usage_policy"
        ],
        "objective": "Establish the trademark position of 'Penguin Books'. Identify: the current registered proprietor or registrant; whether the registration is live, cancelled, abandoned or expired; the Nice classes the registration covers; and whether the owner publishes a brand-usage, trademark or film-clearance poli",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_952f528b250c",
      "timestamp": "2026-09-08T11:18:51.091294Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "NEUMANN U 87 [BRAND_TRADEMARK]",
      "output_summary": "8 evidence from 9 sources",
      "latency_ms": 4941.5609166026115,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_75ee3491ea73",
        "aspect": "GENERAL",
        "facts_sought": [
          "registrant",
          "registration_status",
          "nice_classes",
          "usage_policy"
        ],
        "objective": "Establish the trademark position of 'Neumann U87'. Identify: the current registered proprietor or registrant; whether the registration is live, cancelled, abandoned or expired; the Nice classes the registration covers; and whether the owner publishes a brand-usage, trademark or film-clearance policy",
        "sources_without_url": 1
      }
    },
    {
      "entry_id": "log_075204bf137d",
      "timestamp": "2026-09-08T11:18:51.479305Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "PRO TOOLS [BRAND_TRADEMARK]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 5329.2106250301,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_cec43d334307",
        "aspect": "GENERAL",
        "facts_sought": [
          "registrant",
          "registration_status",
          "nice_classes",
          "usage_policy"
        ],
        "objective": "Establish the trademark position of 'Pro Tools'. Identify: the current registered proprietor or registrant; whether the registration is live, cancelled, abandoned or expired; the Nice classes the registration covers; and whether the owner publishes a brand-usage, trademark or film-clearance policy g",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_a2971109bb48",
      "timestamp": "2026-09-08T11:18:51.658417Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "MARLBORO [BRAND_TRADEMARK]",
      "output_summary": "8 evidence from 9 sources",
      "latency_ms": 5508.193624671549,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_97d887b5109a",
        "aspect": "GENERAL",
        "facts_sought": [
          "registrant",
          "registration_status",
          "nice_classes",
          "usage_policy"
        ],
        "objective": "Establish the trademark position of 'Marlboro'. Identify: the current registered proprietor or registrant; whether the registration is live, cancelled, abandoned or expired; the Nice classes the registration covers; and whether the owner publishes a brand-usage, trademark or film-clearance policy go",
        "sources_without_url": 1
      }
    },
    {
      "entry_id": "log_21fb99c878cf",
      "timestamp": "2026-09-08T11:18:52.053327Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "NIKE [BRAND_TRADEMARK]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 5903.137625195086,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_0a02db79809c",
        "aspect": "GENERAL",
        "facts_sought": [
          "registrant",
          "registration_status",
          "nice_classes",
          "usage_policy"
        ],
        "objective": "Establish the trademark position of 'Nike'. Identify: the current registered proprietor or registrant; whether the registration is live, cancelled, abandoned or expired; the Nice classes the registration covers; and whether the owner publishes a brand-usage, trademark or film-clearance policy govern",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_4602d62f1334",
      "timestamp": "2026-09-08T11:18:52.217711Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "VENICE BEACH [REAL_LOCATION_BUSINESS]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 6068.426415789872,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_fbbd96ccec77",
        "aspect": "GENERAL",
        "facts_sought": [
          "owner",
          "permit_required",
          "trademark_status"
        ],
        "objective": "Establish the filming and depiction position for 'Venice Beach'. Identify: the current owner or operator; whether a location release or filming permit is customarily required to depict or film there; whether the name, signage or trade dress is registered as a trademark; and any reported dispute over",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_98358b1fb3f7",
      "timestamp": "2026-09-08T11:18:52.294190Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "Meridian Records [REAL_LOCATION_BUSINESS]",
      "output_summary": "8 evidence from 9 sources",
      "latency_ms": 6144.897833000869,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_ed4fb13eb46a",
        "aspect": "GENERAL",
        "facts_sought": [
          "owner",
          "permit_required",
          "trademark_status"
        ],
        "objective": "Establish the filming and depiction position for 'Meridian Records'. Identify: the current owner or operator; whether a location release or filming permit is customarily required to depict or film there; whether the name, signage or trade dress is registered as a trademark; and any reported dispute ",
        "sources_without_url": 1
      }
    },
    {
      "entry_id": "log_e45ed9aeacd7",
      "timestamp": "2026-09-08T11:18:52.505387Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "THE GREAT GATSBY [PUBLISHED_WORK]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 6355.885499622673,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_edaf252de2d5",
        "aspect": "GENERAL",
        "facts_sought": [
          "author",
          "publication_year",
          "author_death_year",
          "authorship_type",
          "rights_holder"
        ],
        "objective": "Establish the copyright position of the published work 'The Great Gatsby'. Identify: the author; the year of first publication; the author's year of death if deceased; whether the work was a work made for hire or published anonymously; and the current rights holder or literary estate. These facts de",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_e98e80a61899",
      "timestamp": "2026-09-08T11:18:52.957162Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "THE ECHO PLEX [REAL_LOCATION_BUSINESS]",
      "output_summary": "8 evidence from 9 sources",
      "latency_ms": 6807.709124870598,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_e33955bfacfb",
        "aspect": "GENERAL",
        "facts_sought": [
          "owner",
          "permit_required",
          "trademark_status"
        ],
        "objective": "Establish the filming and depiction position for 'The Echoplex'. Identify: the current owner or operator; whether a location release or filming permit is customarily required to depict or film there; whether the name, signage or trade dress is registered as a trademark; and any reported dispute over",
        "sources_without_url": 1
      }
    },
    {
      "entry_id": "log_4eb525a2742f",
      "timestamp": "2026-09-08T11:18:53.567658Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "Gibson [BRAND_TRADEMARK]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 7418.052124790847,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_b1d796825054",
        "aspect": "GENERAL",
        "facts_sought": [
          "registrant",
          "registration_status",
          "nice_classes",
          "usage_policy"
        ],
        "objective": "Establish the trademark position of 'Gibson Brands, Inc.'. Identify: the current registered proprietor or registrant; whether the registration is live, cancelled, abandoned or expired; the Nice classes the registration covers; and whether the owner publishes a brand-usage, trademark or film-clearanc",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_f776fa988be8",
      "timestamp": "2026-09-08T11:18:53.586798Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "JONI MITCHELL [REAL_PERSON]",
      "output_summary": "8 evidence from 9 sources",
      "latency_ms": 7437.072917353362,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_7901727b8f1f",
        "aspect": "GENERAL",
        "facts_sought": [
          "is_person_living",
          "person_death_year",
          "domicile_state_at_death",
          "estate_administrator"
        ],
        "objective": "Establish the right-of-publicity position for 'Joni Mitchell'. Determine: whether they are living or deceased; the exact year of death if deceased; their state or country of domicile at death, because post-mortem publicity terms are set by domicile and range from none to 100 years; who administers t",
        "sources_without_url": 1
      }
    },
    {
      "entry_id": "log_8bd8c4c31340",
      "timestamp": "2026-09-08T11:18:53.589008Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "researcher.research_items",
      "input_summary": "27 items, concurrency=6",
      "output_summary": "222 evidence across 27/27 items (28 Parallel calls, 7450 ms wall clock)",
      "latency_ms": 7450.001041870564,
      "token_cost": null,
      "task_cost": 28,
      "level": "INFO",
      "detail": {
        "items_with_no_evidence": [],
        "crashed_items": []
      }
    },
    {
      "entry_id": "log_0f5aaf48ec09",
      "timestamp": "2026-09-08T11:19:04.595318Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "MERIDIAN SOUND (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Active'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 10980.267208069563,
      "token_cost": 3267,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4051d7cfe988",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_837114466d44",
          "ev_84ad0cc56a8c"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_255d34e5597c",
      "timestamp": "2026-09-08T11:19:04.614377Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "MERIDIAN SOUND: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Active'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 17.658833414316177,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4051d7cfe988",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_661838733c40",
      "timestamp": "2026-09-08T11:19:10.666530Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "Gene Austin (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.PERSONA: 'PERSONA'>, 'is_person_living': False, 'person_death_year': 1972, 'trademark_status': 'UNKNOWN'}; not found: ['jurisdiction', 'publication_year', 'creation_year', 'author_death_year', 'authorship_type', 'trademark_status', 'rights_holder', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 17042.45025012642,
      "token_cost": 3835,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ceb6a70b34d4",
        "facts_not_found": [
          "jurisdiction",
          "publication_year",
          "creation_year",
          "author_death_year",
          "authorship_type",
          "trademark_status",
          "rights_holder",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_bdac6887fcc8",
          "ev_f9223125a450"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_ea8a0daf8979",
      "timestamp": "2026-09-08T11:19:10.670773Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "Gene Austin: {'work_type': 'PERSONA', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'is_person_living': False, 'person_death_year': 1972, 'trademark_status': 'UNKNOWN'}",
      "output_summary": "US_PUBLICITY_POSTMORTEM=INSUFFICIENT_FACTS missing ['domicile_state_at_death']",
      "latency_ms": 0.2570422366261482,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ceb6a70b34d4",
        "deterministic": true,
        "rule_ids": [
          "US_PUBLICITY_POSTMORTEM"
        ]
      }
    },
    {
      "entry_id": "log_dc77ef853729",
      "timestamp": "2026-09-08T11:19:14.687008Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "VOSS & ASSOCIATES (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'UNKNOWN'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'trademark_status', 'rights_holder', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 21061.119500081986,
      "token_cost": 4089,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_8558fc24473b",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "trademark_status",
          "rights_holder",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_ac171889b52e",
          "ev_fb2c7f485c26"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_11a1d87cff16",
      "timestamp": "2026-09-08T11:19:14.688869Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "VOSS & ASSOCIATES: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'UNKNOWN'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.3953329287469387,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_8558fc24473b",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_b3de6802dc8c",
      "timestamp": "2026-09-08T11:19:14.786483Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "VALLEY PAWN & LOAN (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'null'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'trademark_status', 'rights_holder', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 21165.96012469381,
      "token_cost": 4224,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ceb693738e73",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "trademark_status",
          "rights_holder",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_1c9526325394",
          "ev_7d1041363d22",
          "ev_94b19641bb64"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_6a1c0b44fb9e",
      "timestamp": "2026-09-08T11:19:14.787735Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "VALLEY PAWN & LOAN: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'null'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.1715831458568573,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ceb693738e73",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_d7d8c388cdf8",
      "timestamp": "2026-09-08T11:19:16.525606Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "THE GOLDEN BEAR DINER (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'UNKNOWN'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'trademark_status', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 22903.012457769364,
      "token_cost": 4435,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4f29daeee2b1",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "trademark_status",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_76281707689f",
          "ev_8731fb049f77",
          "ev_7d73266f6c2a"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_f7172f9eea75",
      "timestamp": "2026-09-08T11:19:16.526658Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "THE GOLDEN BEAR DINER: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'UNKNOWN'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.14283321797847748,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4f29daeee2b1",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_2e903d4d88a8",
      "timestamp": "2026-09-08T11:19:17.431903Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "Rolex Submariner (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Registered And Renewed'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 23804.574999958277,
      "token_cost": 4310,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_320649948473",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_da04c1380dd1",
          "ev_af6927b940ef"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_9fe82267d77d",
      "timestamp": "2026-09-08T11:19:17.432653Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "Rolex Submariner: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Registered And Renewed'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.10491674765944481,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_320649948473",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_99047e529d97",
      "timestamp": "2026-09-08T11:19:25.915101Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "MERIDIAN SOUND (1 rule outcomes)",
      "output_summary": "tier=ESCALATE, 3 open questions",
      "latency_ms": 21298.654166981578,
      "token_cost": 4147,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4051d7cfe988",
        "model_tier": "ESCALATE",
        "compelled_tier": null
      }
    },
    {
      "entry_id": "log_f669710c300a",
      "timestamp": "2026-09-08T11:19:25.917361Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_4051d7cfe988: 4 claims",
      "output_summary": "4 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4051d7cfe988",
        "kept": 4,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_7f570423ccdf",
      "timestamp": "2026-09-08T11:19:26.829353Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "VALLEY PAWN & LOAN (1 rule outcomes)",
      "output_summary": "tier=ESCALATE, 2 open questions",
      "latency_ms": 12040.623540990055,
      "token_cost": 3980,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ceb693738e73",
        "model_tier": "ESCALATE",
        "compelled_tier": null
      }
    },
    {
      "entry_id": "log_33682da6623f",
      "timestamp": "2026-09-08T11:19:26.832099Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_ceb693738e73: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ceb693738e73",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_08e7768a8350",
      "timestamp": "2026-09-08T11:19:30.439509Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "Rolex Submariner (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION (COMPELLED by facts; model proposed ESCALATE), 2 open questions",
      "latency_ms": 13006.086874753237,
      "token_cost": 4105,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_320649948473",
        "model_tier": "ESCALATE",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_8aa6b7dff3ad",
      "timestamp": "2026-09-08T11:19:30.441194Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_320649948473: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_320649948473",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_b16388689635",
      "timestamp": "2026-09-08T11:19:34.132732Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "THE GOLDEN BEAR DINER (1 rule outcomes)",
      "output_summary": "tier=ESCALATE, 2 open questions",
      "latency_ms": 17604.57962518558,
      "token_cost": 4240,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4f29daeee2b1",
        "model_tier": "ESCALATE",
        "compelled_tier": null
      }
    },
    {
      "entry_id": "log_623221c48a69",
      "timestamp": "2026-09-08T11:19:34.133870Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_4f29daeee2b1: 4 claims",
      "output_summary": "4 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4f29daeee2b1",
        "kept": 4,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_8463974b7eb9",
      "timestamp": "2026-09-08T11:19:34.655522Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "Gene Austin (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION, 2 open questions",
      "latency_ms": 23983.715208247304,
      "token_cost": 4465,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ceb6a70b34d4",
        "model_tier": "NEEDS_VERIFICATION",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_d2c72657a391",
      "timestamp": "2026-09-08T11:19:34.656827Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_ceb6a70b34d4: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ceb6a70b34d4",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_2722b5ae73be",
      "timestamp": "2026-09-08T11:19:35.124789Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "VOSS & ASSOCIATES (1 rule outcomes)",
      "output_summary": "tier=ESCALATE, 2 open questions",
      "latency_ms": 20434.96166728437,
      "token_cost": 4345,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_8558fc24473b",
        "model_tier": "ESCALATE",
        "compelled_tier": null
      }
    },
    {
      "entry_id": "log_7761b4167d80",
      "timestamp": "2026-09-08T11:19:35.125845Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_8558fc24473b: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_8558fc24473b",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_6926e768793e",
      "timestamp": "2026-09-08T11:19:43.143425Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "COCA-COLA (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Active'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 16309.559209272265,
      "token_cost": 4691,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ab7298e47bca",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_fc93b5f61002",
          "ev_cd99a151f6a8",
          "ev_98b7bfe50f74",
          "ev_2964542f70ce",
          "ev_99c4ab0f0adb",
          "ev_e92672d9d659",
          "ev_baa513e991e6"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_1a5c30514f96",
      "timestamp": "2026-09-08T11:19:43.146905Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "COCA-COLA: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Active'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.5203750915825367,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ab7298e47bca",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_6734cc139b60",
      "timestamp": "2026-09-08T11:19:45.047314Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "Gibson ES-335 (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'creation_year': 1958, 'trademark_status': 'Active'}; not found: ['publication_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 19128.84091725573,
      "token_cost": 4666,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_74eabfebbb60",
        "facts_not_found": [
          "publication_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_2179a05a38b9",
          "ev_38e596a96a9a",
          "ev_39a0a8f3028c",
          "ev_793556b1afb0",
          "ev_b92fc54bd7f2"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_aefe5bdba4cd",
      "timestamp": "2026-09-08T11:19:45.048689Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "Gibson ES-335: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'creation_year': 1958, 'authorship_type': 'CORPORATE', 'trademark_status': 'Active'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.14008302241563797,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_74eabfebbb60",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_c0147db79128",
      "timestamp": "2026-09-08T11:19:47.023170Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "CHATEAU MARMONT (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Registered'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 12888.850457966328,
      "token_cost": 2878,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_c28c010c3064",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_c9feb5eee135",
          "ev_e4620e565ec9"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_c701b2937d3b",
      "timestamp": "2026-09-08T11:19:47.024068Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "CHATEAU MARMONT: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Registered'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.120542012155056,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_c28c010c3064",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_5d28c98c3adf",
      "timestamp": "2026-09-08T11:19:47.331778Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "Clinton (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.PERSONA: 'PERSONA'>, 'is_person_living': True, 'trademark_status': 'UNKNOWN'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'person_death_year', 'trademark_status', 'rights_holder', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 12674.06512517482,
      "token_cost": 3141,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0e21e763f3c2",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "person_death_year",
          "trademark_status",
          "rights_holder",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_fb45c813ebd2",
          "ev_fa01acc14f2d"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_42b8ba014271",
      "timestamp": "2026-09-08T11:19:47.332735Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "Clinton: {'work_type': 'PERSONA', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'is_person_living': True, 'trademark_status': 'UNKNOWN'}",
      "output_summary": "US_PUBLICITY_POSTMORTEM=RIGHT_SUBSISTS",
      "latency_ms": 0.1532081514596939,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0e21e763f3c2",
        "deterministic": true,
        "rule_ids": [
          "US_PUBLICITY_POSTMORTEM"
        ]
      }
    },
    {
      "entry_id": "log_a0f627d3c1a2",
      "timestamp": "2026-09-08T11:19:52.248970Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "SUNSET BOULEVARD (6 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'creation_year': 1996}; not found: ['work_type', 'jurisdiction', 'publication_year', 'author_death_year', 'authorship_type', 'is_person_living', 'person_death_year', 'trademark_status', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 21806.95145763457,
      "token_cost": 3842,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_7999e01c917c",
        "facts_not_found": [
          "work_type",
          "jurisdiction",
          "publication_year",
          "author_death_year",
          "authorship_type",
          "is_person_living",
          "person_death_year",
          "trademark_status",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_3c333bec9f59",
          "ev_467c4a1f7a4b"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_058b7f774605",
      "timestamp": "2026-09-08T11:19:52.250992Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "SUNSET BOULEVARD: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'creation_year': 1996, 'authorship_type': 'UNKNOWN'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.1572086475789547,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_7999e01c917c",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_41cedfc5237f",
      "timestamp": "2026-09-08T11:19:56.245204Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "Gibson ES-335 (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION (COMPELLED by facts; model proposed ESCALATE), 1 open questions",
      "latency_ms": 11195.754291955382,
      "token_cost": 3697,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_74eabfebbb60",
        "model_tier": "ESCALATE",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_28457db1ec80",
      "timestamp": "2026-09-08T11:19:56.247254Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_74eabfebbb60: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_74eabfebbb60",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_8bae8b535c04",
      "timestamp": "2026-09-08T11:19:58.033561Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "COCA-COLA (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION (COMPELLED by facts; model proposed ESCALATE), 3 open questions",
      "latency_ms": 14886.006915941834,
      "token_cost": 4381,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ab7298e47bca",
        "model_tier": "ESCALATE",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_ddb320007729",
      "timestamp": "2026-09-08T11:19:58.034355Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_ab7298e47bca: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ab7298e47bca",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_4c627f7978b3",
      "timestamp": "2026-09-08T11:20:06.178875Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "CHATEAU MARMONT (1 rule outcomes)",
      "output_summary": "tier=ESCALATE, 3 open questions",
      "latency_ms": 19154.311292339116,
      "token_cost": 3838,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_c28c010c3064",
        "model_tier": "ESCALATE",
        "compelled_tier": null
      }
    },
    {
      "entry_id": "log_502363c8c9b7",
      "timestamp": "2026-09-08T11:20:06.180689Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_c28c010c3064: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_c28c010c3064",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_423c46f13619",
      "timestamp": "2026-09-08T11:20:06.278131Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "\"BYE BYE BLACKBIRD.\" (16 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.MUSICAL_COMPOSITION: 'MUSICAL_COMPOSITION'>, 'publication_year': 1926, 'creation_year': 1926, 'trademark_status': 'null'}; not found: ['author_death_year', 'is_person_living', 'person_death_year', 'trademark_status']",
      "latency_ms": 31151.808833237737,
      "token_cost": 6431,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4ac4ea6f6480",
        "facts_not_found": [
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "trademark_status"
        ],
        "supporting_evidence": [
          "ev_4653b97db03f",
          "ev_b536f14a3852",
          "ev_16854cdd30c6",
          "ev_dffbc80fdb99",
          "ev_e44691becb4b",
          "ev_74bccb251fab"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_7bacf5919c9e",
      "timestamp": "2026-09-08T11:20:06.279548Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "\"BYE BYE BLACKBIRD.\": {'work_type': 'MUSICAL_COMPOSITION', 'jurisdiction': 'US', 'publication_year': 1926, 'creation_year': 1926, 'authorship_type': 'UNKNOWN', 'trademark_status': 'null'}",
      "output_summary": "US_PUB_PRE_1978_95_YEARS=PUBLIC_DOMAIN (PD 2022); US_SOUND_RECORDING_MMA=IN_COPYRIGHT (PD 2027)",
      "latency_ms": 0.38004107773303986,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4ac4ea6f6480",
        "deterministic": true,
        "rule_ids": [
          "US_PUB_PRE_1978_95_YEARS",
          "US_SOUND_RECORDING_MMA"
        ]
      }
    },
    {
      "entry_id": "log_1f94c6d86027",
      "timestamp": "2026-09-08T11:20:06.382029Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "Clinton (1 rule outcomes)",
      "output_summary": "tier=ESCALATE, 1 open questions",
      "latency_ms": 19048.810250125825,
      "token_cost": 4057,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0e21e763f3c2",
        "model_tier": "ESCALATE",
        "compelled_tier": "ESCALATE"
      }
    },
    {
      "entry_id": "log_6612e5cf2561",
      "timestamp": "2026-09-08T11:20:06.383446Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_0e21e763f3c2: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0e21e763f3c2",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_f4a88b33b691",
      "timestamp": "2026-09-08T11:20:09.044339Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "CAPITOL RECORDS (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Registered'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 12796.152332797647,
      "token_cost": 3245,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_b6d84d21d91e",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_bd4788c32882",
          "ev_2bf04bad4387",
          "ev_29b0b80b0b19"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_61b8b536dab1",
      "timestamp": "2026-09-08T11:20:09.045772Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "CAPITOL RECORDS: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Registered'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.2159997820854187,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_b6d84d21d91e",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_c1d547b6e54e",
      "timestamp": "2026-09-08T11:20:12.013488Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "SUNSET BOULEVARD (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION, 2 open questions",
      "latency_ms": 19761.994916945696,
      "token_cost": 4433,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_7999e01c917c",
        "model_tier": "NEEDS_VERIFICATION",
        "compelled_tier": null
      }
    },
    {
      "entry_id": "log_34b1d8c486c9",
      "timestamp": "2026-09-08T11:20:12.014515Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_7999e01c917c: 4 claims",
      "output_summary": "4 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_7999e01c917c",
        "kept": 4,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_5319bf69d928",
      "timestamp": "2026-09-08T11:20:19.130750Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "FEDEX (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'publication_year': 1994, 'creation_year': 1994, 'trademark_status': 'Registered'}; not found: ['author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 21096.02487506345,
      "token_cost": 4263,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_2763dcf7f352",
        "facts_not_found": [
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_faf1b24367c5",
          "ev_70c298c19cdd",
          "ev_2d2254a967d9"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_ef3145fd526c",
      "timestamp": "2026-09-08T11:20:19.132309Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "FEDEX: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'publication_year': 1994, 'creation_year': 1994, 'authorship_type': 'UNKNOWN', 'trademark_status': 'Registered'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.20624976605176926,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_2763dcf7f352",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_08d8462721dd",
      "timestamp": "2026-09-08T11:20:20.880557Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "\"BYE BYE BLACKBIRD.\" (2 rule outcomes)",
      "output_summary": "tier=ESCALATE, 3 open questions",
      "latency_ms": 14600.636791903526,
      "token_cost": 4999,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4ac4ea6f6480",
        "model_tier": "ESCALATE",
        "compelled_tier": "ESCALATE"
      }
    },
    {
      "entry_id": "log_0a0e34ee14b6",
      "timestamp": "2026-09-08T11:20:20.881811Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_4ac4ea6f6480: 4 claims",
      "output_summary": "4 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4ac4ea6f6480",
        "kept": 4,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_9b09297b791a",
      "timestamp": "2026-09-08T11:20:22.763900Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "CAPITOL RECORDS (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION (COMPELLED by facts; model proposed ESCALATE), 2 open questions",
      "latency_ms": 13715.76387481764,
      "token_cost": 3652,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_b6d84d21d91e",
        "model_tier": "ESCALATE",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_f1d0b7791648",
      "timestamp": "2026-09-08T11:20:22.764978Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_b6d84d21d91e: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_b6d84d21d91e",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_e2c0a27c8858",
      "timestamp": "2026-09-08T11:20:23.071057Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "APPLE (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Registered'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 16889.654249884188,
      "token_cost": 3891,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_81a717e2944d",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_1996131196a5",
          "ev_3fd88ebbd84e",
          "ev_422a4c9c2949",
          "ev_a62f92049f2b"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_21b483010262",
      "timestamp": "2026-09-08T11:20:23.073123Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "APPLE: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Registered'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.15441607683897018,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_81a717e2944d",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_5f3982c9248b",
      "timestamp": "2026-09-08T11:20:23.250811Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "STARBUCKS (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'REGISTERED'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 16866.7147080414,
      "token_cost": 3681,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_3c88b902b2de",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_0c4dc6d4efae",
          "ev_2a7e11f6a523",
          "ev_2ea8f23ef084",
          "ev_47d10973d089",
          "ev_73d3b4110f77",
          "ev_c1cf19354a33"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_7c9452862012",
      "timestamp": "2026-09-08T11:20:23.251645Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "STARBUCKS: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'REGISTERED'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.1088329590857029,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_3c88b902b2de",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_65b393412930",
      "timestamp": "2026-09-08T11:20:35.617066Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "Penguin (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Live/Registered'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 23601.913291029632,
      "token_cost": 5043,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0dff9dbcaf39",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_50b1d2fd9777",
          "ev_b396cc4ea1d5",
          "ev_f372ca8b1789"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_82719056ab5e",
      "timestamp": "2026-09-08T11:20:35.619044Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "Penguin: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Live/Registered'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.15570782124996185,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0dff9dbcaf39",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_d5fbf741f065",
      "timestamp": "2026-09-08T11:20:37.888734Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "STARBUCKS (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION (COMPELLED by facts; model proposed ESCALATE), 3 open questions",
      "latency_ms": 14636.332124937326,
      "token_cost": 3582,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_3c88b902b2de",
        "model_tier": "ESCALATE",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_d820c4ee5f4b",
      "timestamp": "2026-09-08T11:20:37.889765Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_3c88b902b2de: 4 claims",
      "output_summary": "4 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_3c88b902b2de",
        "kept": 4,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_9c04f74c824e",
      "timestamp": "2026-09-08T11:20:38.507249Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "APPLE (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION (COMPELLED by facts; model proposed ESCALATE), 3 open questions",
      "latency_ms": 15433.639834169298,
      "token_cost": 3688,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_81a717e2944d",
        "model_tier": "ESCALATE",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_7593e33e6379",
      "timestamp": "2026-09-08T11:20:38.508534Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_81a717e2944d: 4 claims",
      "output_summary": "4 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_81a717e2944d",
        "kept": 4,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_55d0b9f8a298",
      "timestamp": "2026-09-08T11:20:43.028415Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "NEUMANN U 87 (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'REGISTERED'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 22145.723916124552,
      "token_cost": 4573,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_75ee3491ea73",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_4abdea8e40e2",
          "ev_740673302798"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_2a96e50a98e7",
      "timestamp": "2026-09-08T11:20:43.029774Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "NEUMANN U 87: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'REGISTERED'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.4627923481166363,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_75ee3491ea73",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_b70d9610eceb",
      "timestamp": "2026-09-08T11:20:45.607132Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "PRO TOOLS (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>}; not found: ['jurisdiction', 'publication_year', 'creation_year', 'author_death_year', 'authorship_type', 'is_person_living', 'person_death_year', 'trademark_status', 'rights_holder', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 22841.865499969572,
      "token_cost": 3641,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_cec43d334307",
        "facts_not_found": [
          "jurisdiction",
          "publication_year",
          "creation_year",
          "author_death_year",
          "authorship_type",
          "is_person_living",
          "person_death_year",
          "trademark_status",
          "rights_holder",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_04c756949ffc"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_49d5aba827c5",
      "timestamp": "2026-09-08T11:20:45.608173Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "PRO TOOLS: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.10762503370642662,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_cec43d334307",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_a8a7da487b97",
      "timestamp": "2026-09-08T11:20:47.365106Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "Penguin (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION (COMPELLED by facts; model proposed ESCALATE), 2 open questions",
      "latency_ms": 11745.591707993299,
      "token_cost": 3920,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0dff9dbcaf39",
        "model_tier": "ESCALATE",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_bea884caa2d7",
      "timestamp": "2026-09-08T11:20:47.366377Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_0dff9dbcaf39: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0dff9dbcaf39",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_6e67ed3cb0bb",
      "timestamp": "2026-09-08T11:20:55.230559Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "NIKE (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Live/Registered'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 16721.357624977827,
      "token_cost": 4363,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0a02db79809c",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_1ae029c28955",
          "ev_9fa1aa74fc72",
          "ev_e5e4a8983d25",
          "ev_daeffefc089b",
          "ev_de80f131d181"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_567908c3d110",
      "timestamp": "2026-09-08T11:20:55.232939Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "NIKE: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Live/Registered'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.4091248847544193,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0a02db79809c",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_18da60b8dff0",
      "timestamp": "2026-09-08T11:20:59.842602Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "FEDEX (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION (COMPELLED by facts; model proposed ESCALATE), 2 open questions",
      "latency_ms": 40709.95679171756,
      "token_cost": 3778,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_2763dcf7f352",
        "model_tier": "ESCALATE",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_f8289f965807",
      "timestamp": "2026-09-08T11:20:59.844414Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_2763dcf7f352: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_2763dcf7f352",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_0f57a0a93f87",
      "timestamp": "2026-09-08T11:21:00.243305Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "MARLBORO (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Live/Registered'}; not found: ['authorship_type', 'publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 22352.84575028345,
      "token_cost": 4773,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_97d887b5109a",
        "facts_not_found": [
          "authorship_type",
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_82996f38def4",
          "ev_13443f88ae6b",
          "ev_d0f38b233625"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_62cc385aec7d",
      "timestamp": "2026-09-08T11:21:00.244268Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "MARLBORO: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Live/Registered'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.2648336812853813,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_97d887b5109a",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_53ec55b15ae5",
      "timestamp": "2026-09-08T11:21:01.867372Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "PRO TOOLS (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION (COMPELLED by facts; model proposed ESCALATE), 3 open questions",
      "latency_ms": 16258.895749691874,
      "token_cost": 3808,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_cec43d334307",
        "model_tier": "ESCALATE",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_346344ef70c7",
      "timestamp": "2026-09-08T11:21:01.868591Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_cec43d334307: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_cec43d334307",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_833a508ca9c6",
      "timestamp": "2026-09-08T11:21:09.389508Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "NEUMANN U 87 (1 rule outcomes)",
      "output_summary": "tier=ESCALATE, 2 open questions",
      "latency_ms": 26359.32999989018,
      "token_cost": 4083,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_75ee3491ea73",
        "model_tier": "ESCALATE",
        "compelled_tier": "ESCALATE"
      }
    },
    {
      "entry_id": "log_1339d8724802",
      "timestamp": "2026-09-08T11:21:09.391694Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_75ee3491ea73: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_75ee3491ea73",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_84ced56b7853",
      "timestamp": "2026-09-08T11:21:14.172915Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "NIKE (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION (COMPELLED by facts; model proposed ESCALATE), 2 open questions",
      "latency_ms": 18939.575375057757,
      "token_cost": 4122,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0a02db79809c",
        "model_tier": "ESCALATE",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_8c8e9743185e",
      "timestamp": "2026-09-08T11:21:14.174017Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_0a02db79809c: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0a02db79809c",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_6040525ff25f",
      "timestamp": "2026-09-08T11:21:22.153418Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "THE GREAT GATSBY (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.LITERARY_WORK: 'LITERARY_WORK'>, 'publication_year': 1925, 'author_death_year': 1940, 'trademark_status': 'null'}; not found: ['creation_year', 'is_person_living', 'person_death_year', 'trademark_status', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 20284.245165996253,
      "token_cost": 4298,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_edaf252de2d5",
        "facts_not_found": [
          "creation_year",
          "is_person_living",
          "person_death_year",
          "trademark_status",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_1e954957c5a4",
          "ev_3954e654a540",
          "ev_3f8ea5e5d8e1",
          "ev_850d4f0a9a6d",
          "ev_8df4be1e389c",
          "ev_b9ccc1a79401"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_039219c1027e",
      "timestamp": "2026-09-08T11:21:22.155310Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "THE GREAT GATSBY: {'work_type': 'LITERARY_WORK', 'jurisdiction': 'US', 'publication_year': 1925, 'author_death_year': 1940, 'authorship_type': 'UNKNOWN', 'trademark_status': 'null'}",
      "output_summary": "US_PUB_PRE_1978_95_YEARS=PUBLIC_DOMAIN (PD 2021)",
      "latency_ms": 0.2899589017033577,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_edaf252de2d5",
        "deterministic": true,
        "rule_ids": [
          "US_PUB_PRE_1978_95_YEARS"
        ]
      }
    },
    {
      "entry_id": "log_607ce84eb2c9",
      "timestamp": "2026-09-08T11:21:25.021551Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "VENICE BEACH (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Registered'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 25176.496374886483,
      "token_cost": 4622,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_fbbd96ccec77",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_7cb4dcfd7417",
          "ev_7564707128c4",
          "ev_ead7d1212f9d",
          "ev_89b3633f9211"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_4c12ec47815d",
      "timestamp": "2026-09-08T11:21:25.022657Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "VENICE BEACH: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Registered'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.23195799440145493,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_fbbd96ccec77",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_9a8273a5d424",
      "timestamp": "2026-09-08T11:21:25.556077Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "MARLBORO (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION (COMPELLED by facts; model proposed ESCALATE), 2 open questions",
      "latency_ms": 25311.036999803036,
      "token_cost": 4176,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_97d887b5109a",
        "model_tier": "ESCALATE",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_73f77fb636e6",
      "timestamp": "2026-09-08T11:21:25.556939Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_97d887b5109a: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_97d887b5109a",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_59d39a1bf76d",
      "timestamp": "2026-09-08T11:21:28.406662Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "THE ECHO PLEX (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Live/Registered'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'authorship_type', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 19014.062374830246,
      "token_cost": 3964,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_e33955bfacfb",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "authorship_type",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_1113a2b99c29",
          "ev_15b0e50c78db",
          "ev_4e86828456df",
          "ev_b97feeda7896",
          "ev_c09bd782490e"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_b9b2f83ef62b",
      "timestamp": "2026-09-08T11:21:28.408454Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "THE ECHO PLEX: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Live/Registered'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.36012521013617516,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_e33955bfacfb",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_9086e2e8611e",
      "timestamp": "2026-09-08T11:21:31.523095Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "JONI MITCHELL (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.PERSONA: 'PERSONA'>, 'is_person_living': True, 'trademark_status': 'null'}; not found: ['jurisdiction', 'publication_year', 'creation_year', 'author_death_year', 'authorship_type', 'person_death_year', 'trademark_status', 'rights_holder', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 17348.66729239002,
      "token_cost": 3990,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_7901727b8f1f",
        "facts_not_found": [
          "jurisdiction",
          "publication_year",
          "creation_year",
          "author_death_year",
          "authorship_type",
          "person_death_year",
          "trademark_status",
          "rights_holder",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_f25684b61d30",
          "ev_adf239dc4003"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_94edd8f08b9d",
      "timestamp": "2026-09-08T11:21:31.524383Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "JONI MITCHELL: {'work_type': 'PERSONA', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'is_person_living': True, 'trademark_status': 'null'}",
      "output_summary": "US_PUBLICITY_POSTMORTEM=RIGHT_SUBSISTS",
      "latency_ms": 0.2060001716017723,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_7901727b8f1f",
        "deterministic": true,
        "rule_ids": [
          "US_PUBLICITY_POSTMORTEM"
        ]
      }
    },
    {
      "entry_id": "log_2370d809fccc",
      "timestamp": "2026-09-08T11:21:37.599822Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "Meridian Records (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Registered'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'authorship_type', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 50233.334416057914,
      "token_cost": 5300,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ed4fb13eb46a",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "authorship_type",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_a2a27e489ba0"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_32a1b1f41c69",
      "timestamp": "2026-09-08T11:21:37.601891Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "Meridian Records: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Registered'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.288916751742363,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ed4fb13eb46a",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_1b6edbfe5ae6",
      "timestamp": "2026-09-08T11:21:41.504791Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "THE GREAT GATSBY (1 rule outcomes)",
      "output_summary": "tier=CLEAR_ON_RECORD, 1 open questions",
      "latency_ms": 19348.583582788706,
      "token_cost": 4387,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_edaf252de2d5",
        "model_tier": "CLEAR_ON_RECORD",
        "compelled_tier": null
      }
    },
    {
      "entry_id": "log_32dd05ca9175",
      "timestamp": "2026-09-08T11:21:41.506265Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_edaf252de2d5: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_edaf252de2d5",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_85b85663b5d6",
      "timestamp": "2026-09-08T11:21:42.016759Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "THE ECHO PLEX (1 rule outcomes)",
      "output_summary": "tier=ESCALATE, 3 open questions",
      "latency_ms": 13607.138541992754,
      "token_cost": 3835,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_e33955bfacfb",
        "model_tier": "ESCALATE",
        "compelled_tier": null
      }
    },
    {
      "entry_id": "log_a78ed7d97ef8",
      "timestamp": "2026-09-08T11:21:42.019079Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_e33955bfacfb: 4 claims",
      "output_summary": "4 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_e33955bfacfb",
        "kept": 4,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_4c956eba6483",
      "timestamp": "2026-09-08T11:21:47.072192Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "VENICE BEACH (1 rule outcomes)",
      "output_summary": "tier=ESCALATE, 2 open questions",
      "latency_ms": 22048.91337500885,
      "token_cost": 4668,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_fbbd96ccec77",
        "model_tier": "ESCALATE",
        "compelled_tier": null
      }
    },
    {
      "entry_id": "log_869454e6350a",
      "timestamp": "2026-09-08T11:21:47.073931Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_fbbd96ccec77: 4 claims",
      "output_summary": "4 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_fbbd96ccec77",
        "kept": 4,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_ac16a4d46a43",
      "timestamp": "2026-09-08T11:21:52.059855Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "Gibson (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Registered'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 26502.67920875922,
      "token_cost": 5632,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_b1d796825054",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_e71edf32d283",
          "ev_8296419488ca",
          "ev_d021b1d50374",
          "ev_fc04d0262bd2",
          "ev_3669b7c8be52"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_b76fe094abaa",
      "timestamp": "2026-09-08T11:21:52.062632Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "Gibson: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Registered'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.6230832077562809,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_b1d796825054",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_aef7d4ed8f34",
      "timestamp": "2026-09-08T11:21:52.465933Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "JONI MITCHELL (1 rule outcomes)",
      "output_summary": "tier=ESCALATE, 1 open questions",
      "latency_ms": 20941.151625011116,
      "token_cost": 4478,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_7901727b8f1f",
        "model_tier": "ESCALATE",
        "compelled_tier": "ESCALATE"
      }
    },
    {
      "entry_id": "log_6d664a650c87",
      "timestamp": "2026-09-08T11:21:52.468651Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_7901727b8f1f: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_7901727b8f1f",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_ff95fc570525",
      "timestamp": "2026-09-08T11:22:01.932815Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "Meridian Records (1 rule outcomes)",
      "output_summary": "tier=CLEAR_ON_RECORD, 2 open questions",
      "latency_ms": 24329.806541558355,
      "token_cost": 4525,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ed4fb13eb46a",
        "model_tier": "CLEAR_ON_RECORD",
        "compelled_tier": null
      }
    },
    {
      "entry_id": "log_48e9b570ddb7",
      "timestamp": "2026-09-08T11:22:01.935497Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_ed4fb13eb46a: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ed4fb13eb46a",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_b901d64dbc5a",
      "timestamp": "2026-09-08T11:22:04.547502Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "Gibson (1 rule outcomes)",
      "output_summary": "tier=ESCALATE, 2 open questions",
      "latency_ms": 12484.124958980829,
      "token_cost": 3882,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_b1d796825054",
        "model_tier": "ESCALATE",
        "compelled_tier": "ESCALATE"
      }
    },
    {
      "entry_id": "log_639b43aec932",
      "timestamp": "2026-09-08T11:22:04.548523Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_b1d796825054: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_b1d796825054",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_b9c0c68ef534",
      "timestamp": "2026-09-08T11:22:04.549223Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "assembler.assemble_findings",
      "input_summary": "27 items",
      "output_summary": "27 findings: {'ESCALATE': 12, 'NEEDS_VERIFICATION': 13, 'CLEAR_ON_RECORD': 2}",
      "latency_ms": 190935.31550001353,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "tier_counts": {
          "ESCALATE": 12,
          "NEEDS_VERIFICATION": 13,
          "CLEAR_ON_RECORD": 2
        }
      }
    },
    {
      "entry_id": "log_a972cbc5fa29",
      "timestamp": "2026-09-08T11:22:04.550975Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ORCHESTRATOR",
      "tool": "run_pipeline",
      "input_summary": "the_last_good_year.pdf",
      "output_summary": "state=COMPLETE items=27 evidence=222 findings=27 tiers={'CLEAR_ON_RECORD': 2, 'NEEDS_VERIFICATION': 13, 'ESCALATE': 12}",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "entries": 145,
        "warnings": 0,
        "errors": 0,
        "safety_blocks": 0,
        "total_latency_ms": 1632495.7,
        "total_tokens": 257034,
        "total_parallel_tasks": 56
      }
    }
  ]
};

export const MOCK_TRACE = {
  "report_id": "rpt_demo_the_last_good_year",
  "entries": [
    {
      "entry_id": "log_ac79bde21f12",
      "timestamp": "2026-09-08T11:17:04.224595Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "INGEST",
      "tool": "gemini.parse_scenes",
      "input_summary": "7 pages, 6692 chars",
      "output_summary": "15 scenes segmented",
      "latency_ms": 17243.62049996853,
      "token_cost": 8497,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "model": "gemini-flash-latest"
      }
    },
    {
      "entry_id": "log_f313c34f7125",
      "timestamp": "2026-09-08T11:17:04.228675Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "INGEST",
      "tool": "parser.parse_script",
      "input_summary": "the_last_good_year.pdf (7 pages)",
      "output_summary": "15 scenes, 0 parser notes",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "parser_notes": []
      }
    },
    {
      "entry_id": "log_097a0a49ce73",
      "timestamp": "2026-09-08T11:17:35.532349Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "EXTRACT",
      "tool": "gemini.extract_items",
      "input_summary": "scenes 10-15 (5852 chars)",
      "output_summary": "9 raw mentions",
      "latency_ms": 31252.601499669254,
      "token_cost": 5017,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "model": "gemini-3.1-pro-preview",
        "scene_range": "scenes 10-15"
      }
    },
    {
      "entry_id": "log_52a3fd1a0c43",
      "timestamp": "2026-09-08T11:18:46.053907Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "EXTRACT",
      "tool": "gemini.extract_items",
      "input_summary": "scenes 1-9 (8870 chars)",
      "output_summary": "27 raw mentions",
      "latency_ms": 101773.14708288759,
      "token_cost": 17161,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "model": "gemini-3.1-pro-preview",
        "scene_range": "scenes 1-9"
      }
    },
    {
      "entry_id": "log_4326aca4583b",
      "timestamp": "2026-09-08T11:18:46.058068Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "EXTRACT",
      "tool": "extractor.extract_items",
      "input_summary": "15 scenes in 2 chunks, concurrency=6",
      "output_summary": "36 raw mentions before deduplication (2 chunks in 101795 ms wall clock)",
      "latency_ms": 101794.68616703525,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "chunk_count": 2,
        "chunk_size": 9,
        "concurrency": 6,
        "empty_chunks": []
      }
    },
    {
      "entry_id": "log_21bad09e766c",
      "timestamp": "2026-09-08T11:18:46.059697Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "DEDUPLICATE",
      "tool": "extractor.deduplicate",
      "input_summary": "36 raw mentions",
      "output_summary": "27 distinct items (0 skipped, 9 mentions merged) -> 27 research tasks instead of 36",
      "latency_ms": 1.4694579876959324,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "skipped": [],
        "raw_mentions": 36,
        "distinct_items": 27
      }
    },
    {
      "entry_id": "log_01571b7646f0",
      "timestamp": "2026-09-08T11:18:46.060426Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "config.preflight",
      "input_summary": "27 items queued for research",
      "output_summary": "PARALLEL_API_KEY resolved (length=40, source=.env file or Secret Manager)",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "name": "PARALLEL_API_KEY",
        "present": true,
        "length": 40,
        "source": ".env file or Secret Manager",
        "env_shadowing_dotenv": false
      }
    },
    {
      "entry_id": "log_42b0f0e35ebe",
      "timestamp": "2026-09-08T11:18:47.285076Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "MERIDIAN SOUND [NAME_COLLISION]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 1142.8051670081913,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_4051d7cfe988",
        "aspect": "GENERAL",
        "facts_sought": [
          "real_entity_exists",
          "sector",
          "trademark_status"
        ],
        "objective": "The screenplay uses 'Meridian Sound' as a fictional name. Determine whether a real company, organisation or notable person of that name exists, and if so in what sector and territory, whether the name is registered as a trademark, and whether the real entity operates in a field close enough to the f",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_e029c39a0a63",
      "timestamp": "2026-09-08T11:18:47.287000Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "THE GOLDEN BEAR DINER [NAME_COLLISION]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 1146.0762498900294,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_4f29daeee2b1",
        "aspect": "GENERAL",
        "facts_sought": [
          "real_entity_exists",
          "sector",
          "trademark_status"
        ],
        "objective": "The screenplay uses 'The Golden Bear Diner' as a fictional name. Determine whether a real company, organisation or notable person of that name exists, and if so in what sector and territory, whether the name is registered as a trademark, and whether the real entity operates in a field close enough t",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_da9afdfa15db",
      "timestamp": "2026-09-08T11:18:47.376131Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "Gene Austin [REAL_PERSON]",
      "output_summary": "8 evidence from 9 sources",
      "latency_ms": 1235.064750071615,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_ceb6a70b34d4",
        "aspect": "GENERAL",
        "facts_sought": [
          "is_person_living",
          "person_death_year",
          "domicile_state_at_death",
          "estate_administrator"
        ],
        "objective": "Establish the right-of-publicity position for 'Gene Austin'. Determine: whether they are living or deceased; the exact year of death if deceased; their state or country of domicile at death, because post-mortem publicity terms are set by domicile and range from none to 100 years; who administers the",
        "sources_without_url": 1
      }
    },
    {
      "entry_id": "log_ab90550df9e8",
      "timestamp": "2026-09-08T11:18:47.459723Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "VOSS & ASSOCIATES [NAME_COLLISION]",
      "output_summary": "8 evidence from 9 sources",
      "latency_ms": 1318.20062501356,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_8558fc24473b",
        "aspect": "GENERAL",
        "facts_sought": [
          "real_entity_exists",
          "sector",
          "trademark_status"
        ],
        "objective": "The screenplay uses 'Voss & Associates' as a fictional name. Determine whether a real company, organisation or notable person of that name exists, and if so in what sector and territory, whether the name is registered as a trademark, and whether the real entity operates in a field close enough to th",
        "sources_without_url": 1
      }
    },
    {
      "entry_id": "log_b8377489b5dc",
      "timestamp": "2026-09-08T11:18:48.039151Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "Rolex Submariner [BRAND_TRADEMARK]",
      "output_summary": "8 evidence from 9 sources",
      "latency_ms": 1895.260791759938,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_320649948473",
        "aspect": "GENERAL",
        "facts_sought": [
          "registrant",
          "registration_status",
          "nice_classes",
          "usage_policy"
        ],
        "objective": "Establish the trademark position of 'Rolex Submariner'. Identify: the current registered proprietor or registrant; whether the registration is live, cancelled, abandoned or expired; the Nice classes the registration covers; and whether the owner publishes a brand-usage, trademark or film-clearance p",
        "sources_without_url": 1
      }
    },
    {
      "entry_id": "log_8f98598ece33",
      "timestamp": "2026-09-08T11:18:48.450249Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "COCA-COLA [BRAND_TRADEMARK]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 2301.2887919321656,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_ab7298e47bca",
        "aspect": "GENERAL",
        "facts_sought": [
          "registrant",
          "registration_status",
          "nice_classes",
          "usage_policy"
        ],
        "objective": "Establish the trademark position of 'Coca-Cola'. Identify: the current registered proprietor or registrant; whether the registration is live, cancelled, abandoned or expired; the Nice classes the registration covers; and whether the owner publishes a brand-usage, trademark or film-clearance policy g",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_d7bdd7e3e3ca",
      "timestamp": "2026-09-08T11:18:48.648349Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "Gibson ES-335 [BRAND_TRADEMARK]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 2499.3429169990122,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_74eabfebbb60",
        "aspect": "GENERAL",
        "facts_sought": [
          "registrant",
          "registration_status",
          "nice_classes",
          "usage_policy"
        ],
        "objective": "Establish the trademark position of 'Gibson ES-335'. Identify: the current registered proprietor or registrant; whether the registration is live, cancelled, abandoned or expired; the Nice classes the registration covers; and whether the owner publishes a brand-usage, trademark or film-clearance poli",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_3b1620d656f4",
      "timestamp": "2026-09-08T11:18:48.697725Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "CHATEAU MARMONT [REAL_LOCATION_BUSINESS]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 2541.2168754264712,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_c28c010c3064",
        "aspect": "GENERAL",
        "facts_sought": [
          "owner",
          "permit_required",
          "trademark_status"
        ],
        "objective": "Establish the filming and depiction position for 'Chateau Marmont'. Identify: the current owner or operator; whether a location release or filming permit is customarily required to depict or film there; whether the name, signage or trade dress is registered as a trademark; and any reported dispute o",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_5f5482f86b0a",
      "timestamp": "2026-09-08T11:18:48.771131Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "SUNSET BOULEVARD [REAL_LOCATION_BUSINESS]",
      "output_summary": "6 evidence from 6 sources",
      "latency_ms": 2622.1159580163658,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_7999e01c917c",
        "aspect": "GENERAL",
        "facts_sought": [
          "owner",
          "permit_required",
          "trademark_status"
        ],
        "objective": "Establish the filming and depiction position for 'Sunset Boulevard'. Identify: the current owner or operator; whether a location release or filming permit is customarily required to depict or film there; whether the name, signage or trade dress is registered as a trademark; and any reported dispute ",
        "sources_without_url": 0
      }
    },
    {
      "entry_id": "log_9921c65aecd5",
      "timestamp": "2026-09-08T11:18:49.164804Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "Clinton [REAL_PERSON]",
      "output_summary": "8 evidence from 9 sources",
      "latency_ms": 3015.64879110083,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_0e21e763f3c2",
        "aspect": "GENERAL",
        "facts_sought": [
          "is_person_living",
          "person_death_year",
          "domicile_state_at_death",
          "estate_administrator"
        ],
        "objective": "Establish the right-of-publicity position for 'Bill Clinton'. Determine: whether they are living or deceased; the exact year of death if deceased; their state or country of domicile at death, because post-mortem publicity terms are set by domicile and range from none to 100 years; who administers th",
        "sources_without_url": 1
      }
    },
    {
      "entry_id": "log_ccd23148f0c8",
      "timestamp": "2026-09-08T11:18:49.706024Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "\"BYE BYE BLACKBIRD.\" [MUSIC/COMPOSITION]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 3489.0187922865152,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_4ac4ea6f6480",
        "aspect": "COMPOSITION",
        "facts_sought": [
          "composer",
          "publication_year",
          "author_death_year",
          "publisher"
        ],
        "objective": "Research the MUSICAL COMPOSITION (the underlying song, not any particular recording) of 'Bye Bye Blackbird'. Identify: the composer and lyricist; the year of first publication of the composition; the composer's year of death if deceased; and the current music publisher or administrator controlling t",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_9bc3779434d8",
      "timestamp": "2026-09-08T11:18:49.706625Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "\"BYE BYE BLACKBIRD.\" [MUSIC/SOUND_RECORDING]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 3556.6680836491287,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_4ac4ea6f6480",
        "aspect": "SOUND_RECORDING",
        "facts_sought": [
          "recording_artist",
          "publication_year",
          "label",
          "master_owner"
        ],
        "objective": "Research SOUND RECORDINGS of 'Bye Bye Blackbird' (specific masters, not the underlying composition). Identify: notable recording artists and the year each recording was first released; the record label or current owner of the master; and who controls master-use licensing. A public-domain composition",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_931682be9d38",
      "timestamp": "2026-09-08T11:18:49.879545Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "FEDEX [LOGO_PROP]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 3729.896374978125,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_2763dcf7f352",
        "aspect": "GENERAL",
        "facts_sought": [
          "mark_owner",
          "trademark_status",
          "usage_policy"
        ],
        "objective": "'FedEx' appears on screen as a logo, signage or branded prop. Identify the owner of the mark or design, whether the logo is separately registered as a trademark or protected by copyright as an artistic work, and any published policy on depicting the logo in film.",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_fdf4fc1fa404",
      "timestamp": "2026-09-08T11:18:49.976161Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "CAPITOL RECORDS [LOGO_PROP]",
      "output_summary": "8 evidence from 8 sources",
      "latency_ms": 3827.1969999186695,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_b6d84d21d91e",
        "aspect": "GENERAL",
        "facts_sought": [
          "mark_owner",
          "trademark_status",
          "usage_policy"
        ],
        "objective": "'Capitol Records' appears on screen as a logo, signage or branded prop. Identify the owner of the mark or design, whether the logo is separately registered as a trademark or protected by copyright as an artistic work, and any published policy on depicting the logo in film.",
        "sources_without_url": 0
      }
    },
    {
      "entry_id": "log_833836a0d4bd",
      "timestamp": "2026-09-08T11:18:50.453617Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "VALLEY PAWN & LOAN [NAME_COLLISION]",
      "output_summary": "8 evidence from 9 sources",
      "latency_ms": 4313.873874954879,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_ceb693738e73",
        "aspect": "GENERAL",
        "facts_sought": [
          "real_entity_exists",
          "sector",
          "trademark_status"
        ],
        "objective": "The screenplay uses 'Valley Pawn & Loan' as a fictional name. Determine whether a real company, organisation or notable person of that name exists, and if so in what sector and territory, whether the name is registered as a trademark, and whether the real entity operates in a field close enough to t",
        "sources_without_url": 1
      }
    },
    {
      "entry_id": "log_bb8557b265d7",
      "timestamp": "2026-09-08T11:18:50.642401Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "APPLE [LOGO_PROP]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 4492.289375048131,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_81a717e2944d",
        "aspect": "GENERAL",
        "facts_sought": [
          "mark_owner",
          "trademark_status",
          "usage_policy"
        ],
        "objective": "'Apple Inc.' appears on screen as a logo, signage or branded prop. Identify the owner of the mark or design, whether the logo is separately registered as a trademark or protected by copyright as an artistic work, and any published policy on depicting the logo in film.",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_2737e80586ec",
      "timestamp": "2026-09-08T11:18:50.757593Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "STARBUCKS [LOGO_PROP]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 4607.950791250914,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_3c88b902b2de",
        "aspect": "GENERAL",
        "facts_sought": [
          "mark_owner",
          "trademark_status",
          "usage_policy"
        ],
        "objective": "'Starbucks' appears on screen as a logo, signage or branded prop. Identify the owner of the mark or design, whether the logo is separately registered as a trademark or protected by copyright as an artistic work, and any published policy on depicting the logo in film.",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_7a19b366fd1e",
      "timestamp": "2026-09-08T11:18:50.847364Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "Penguin [BRAND_TRADEMARK]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 4697.320125065744,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_0dff9dbcaf39",
        "aspect": "GENERAL",
        "facts_sought": [
          "registrant",
          "registration_status",
          "nice_classes",
          "usage_policy"
        ],
        "objective": "Establish the trademark position of 'Penguin Books'. Identify: the current registered proprietor or registrant; whether the registration is live, cancelled, abandoned or expired; the Nice classes the registration covers; and whether the owner publishes a brand-usage, trademark or film-clearance poli",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_952f528b250c",
      "timestamp": "2026-09-08T11:18:51.091294Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "NEUMANN U 87 [BRAND_TRADEMARK]",
      "output_summary": "8 evidence from 9 sources",
      "latency_ms": 4941.5609166026115,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_75ee3491ea73",
        "aspect": "GENERAL",
        "facts_sought": [
          "registrant",
          "registration_status",
          "nice_classes",
          "usage_policy"
        ],
        "objective": "Establish the trademark position of 'Neumann U87'. Identify: the current registered proprietor or registrant; whether the registration is live, cancelled, abandoned or expired; the Nice classes the registration covers; and whether the owner publishes a brand-usage, trademark or film-clearance policy",
        "sources_without_url": 1
      }
    },
    {
      "entry_id": "log_075204bf137d",
      "timestamp": "2026-09-08T11:18:51.479305Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "PRO TOOLS [BRAND_TRADEMARK]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 5329.2106250301,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_cec43d334307",
        "aspect": "GENERAL",
        "facts_sought": [
          "registrant",
          "registration_status",
          "nice_classes",
          "usage_policy"
        ],
        "objective": "Establish the trademark position of 'Pro Tools'. Identify: the current registered proprietor or registrant; whether the registration is live, cancelled, abandoned or expired; the Nice classes the registration covers; and whether the owner publishes a brand-usage, trademark or film-clearance policy g",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_a2971109bb48",
      "timestamp": "2026-09-08T11:18:51.658417Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "MARLBORO [BRAND_TRADEMARK]",
      "output_summary": "8 evidence from 9 sources",
      "latency_ms": 5508.193624671549,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_97d887b5109a",
        "aspect": "GENERAL",
        "facts_sought": [
          "registrant",
          "registration_status",
          "nice_classes",
          "usage_policy"
        ],
        "objective": "Establish the trademark position of 'Marlboro'. Identify: the current registered proprietor or registrant; whether the registration is live, cancelled, abandoned or expired; the Nice classes the registration covers; and whether the owner publishes a brand-usage, trademark or film-clearance policy go",
        "sources_without_url": 1
      }
    },
    {
      "entry_id": "log_21fb99c878cf",
      "timestamp": "2026-09-08T11:18:52.053327Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "NIKE [BRAND_TRADEMARK]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 5903.137625195086,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_0a02db79809c",
        "aspect": "GENERAL",
        "facts_sought": [
          "registrant",
          "registration_status",
          "nice_classes",
          "usage_policy"
        ],
        "objective": "Establish the trademark position of 'Nike'. Identify: the current registered proprietor or registrant; whether the registration is live, cancelled, abandoned or expired; the Nice classes the registration covers; and whether the owner publishes a brand-usage, trademark or film-clearance policy govern",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_4602d62f1334",
      "timestamp": "2026-09-08T11:18:52.217711Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "VENICE BEACH [REAL_LOCATION_BUSINESS]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 6068.426415789872,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_fbbd96ccec77",
        "aspect": "GENERAL",
        "facts_sought": [
          "owner",
          "permit_required",
          "trademark_status"
        ],
        "objective": "Establish the filming and depiction position for 'Venice Beach'. Identify: the current owner or operator; whether a location release or filming permit is customarily required to depict or film there; whether the name, signage or trade dress is registered as a trademark; and any reported dispute over",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_98358b1fb3f7",
      "timestamp": "2026-09-08T11:18:52.294190Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "Meridian Records [REAL_LOCATION_BUSINESS]",
      "output_summary": "8 evidence from 9 sources",
      "latency_ms": 6144.897833000869,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_ed4fb13eb46a",
        "aspect": "GENERAL",
        "facts_sought": [
          "owner",
          "permit_required",
          "trademark_status"
        ],
        "objective": "Establish the filming and depiction position for 'Meridian Records'. Identify: the current owner or operator; whether a location release or filming permit is customarily required to depict or film there; whether the name, signage or trade dress is registered as a trademark; and any reported dispute ",
        "sources_without_url": 1
      }
    },
    {
      "entry_id": "log_e45ed9aeacd7",
      "timestamp": "2026-09-08T11:18:52.505387Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "THE GREAT GATSBY [PUBLISHED_WORK]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 6355.885499622673,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_edaf252de2d5",
        "aspect": "GENERAL",
        "facts_sought": [
          "author",
          "publication_year",
          "author_death_year",
          "authorship_type",
          "rights_holder"
        ],
        "objective": "Establish the copyright position of the published work 'The Great Gatsby'. Identify: the author; the year of first publication; the author's year of death if deceased; whether the work was a work made for hire or published anonymously; and the current rights holder or literary estate. These facts de",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_e98e80a61899",
      "timestamp": "2026-09-08T11:18:52.957162Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "THE ECHO PLEX [REAL_LOCATION_BUSINESS]",
      "output_summary": "8 evidence from 9 sources",
      "latency_ms": 6807.709124870598,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_e33955bfacfb",
        "aspect": "GENERAL",
        "facts_sought": [
          "owner",
          "permit_required",
          "trademark_status"
        ],
        "objective": "Establish the filming and depiction position for 'The Echoplex'. Identify: the current owner or operator; whether a location release or filming permit is customarily required to depict or film there; whether the name, signage or trade dress is registered as a trademark; and any reported dispute over",
        "sources_without_url": 1
      }
    },
    {
      "entry_id": "log_4eb525a2742f",
      "timestamp": "2026-09-08T11:18:53.567658Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "Gibson [BRAND_TRADEMARK]",
      "output_summary": "8 evidence from 10 sources",
      "latency_ms": 7418.052124790847,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_b1d796825054",
        "aspect": "GENERAL",
        "facts_sought": [
          "registrant",
          "registration_status",
          "nice_classes",
          "usage_policy"
        ],
        "objective": "Establish the trademark position of 'Gibson Brands, Inc.'. Identify: the current registered proprietor or registrant; whether the registration is live, cancelled, abandoned or expired; the Nice classes the registration covers; and whether the owner publishes a brand-usage, trademark or film-clearanc",
        "sources_without_url": 2
      }
    },
    {
      "entry_id": "log_f776fa988be8",
      "timestamp": "2026-09-08T11:18:53.586798Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "parallel.search",
      "input_summary": "JONI MITCHELL [REAL_PERSON]",
      "output_summary": "8 evidence from 9 sources",
      "latency_ms": 7437.072917353362,
      "token_cost": null,
      "task_cost": 1,
      "level": "INFO",
      "detail": {
        "item_id": "item_7901727b8f1f",
        "aspect": "GENERAL",
        "facts_sought": [
          "is_person_living",
          "person_death_year",
          "domicile_state_at_death",
          "estate_administrator"
        ],
        "objective": "Establish the right-of-publicity position for 'Joni Mitchell'. Determine: whether they are living or deceased; the exact year of death if deceased; their state or country of domicile at death, because post-mortem publicity terms are set by domicile and range from none to 100 years; who administers t",
        "sources_without_url": 1
      }
    },
    {
      "entry_id": "log_8bd8c4c31340",
      "timestamp": "2026-09-08T11:18:53.589008Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RESEARCH",
      "tool": "researcher.research_items",
      "input_summary": "27 items, concurrency=6",
      "output_summary": "222 evidence across 27/27 items (28 Parallel calls, 7450 ms wall clock)",
      "latency_ms": 7450.001041870564,
      "token_cost": null,
      "task_cost": 28,
      "level": "INFO",
      "detail": {
        "items_with_no_evidence": [],
        "crashed_items": []
      }
    },
    {
      "entry_id": "log_0f5aaf48ec09",
      "timestamp": "2026-09-08T11:19:04.595318Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "MERIDIAN SOUND (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Active'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 10980.267208069563,
      "token_cost": 3267,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4051d7cfe988",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_837114466d44",
          "ev_84ad0cc56a8c"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_255d34e5597c",
      "timestamp": "2026-09-08T11:19:04.614377Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "MERIDIAN SOUND: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Active'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 17.658833414316177,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4051d7cfe988",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_661838733c40",
      "timestamp": "2026-09-08T11:19:10.666530Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "Gene Austin (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.PERSONA: 'PERSONA'>, 'is_person_living': False, 'person_death_year': 1972, 'trademark_status': 'UNKNOWN'}; not found: ['jurisdiction', 'publication_year', 'creation_year', 'author_death_year', 'authorship_type', 'trademark_status', 'rights_holder', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 17042.45025012642,
      "token_cost": 3835,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ceb6a70b34d4",
        "facts_not_found": [
          "jurisdiction",
          "publication_year",
          "creation_year",
          "author_death_year",
          "authorship_type",
          "trademark_status",
          "rights_holder",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_bdac6887fcc8",
          "ev_f9223125a450"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_ea8a0daf8979",
      "timestamp": "2026-09-08T11:19:10.670773Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "Gene Austin: {'work_type': 'PERSONA', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'is_person_living': False, 'person_death_year': 1972, 'trademark_status': 'UNKNOWN'}",
      "output_summary": "US_PUBLICITY_POSTMORTEM=INSUFFICIENT_FACTS missing ['domicile_state_at_death']",
      "latency_ms": 0.2570422366261482,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ceb6a70b34d4",
        "deterministic": true,
        "rule_ids": [
          "US_PUBLICITY_POSTMORTEM"
        ]
      }
    },
    {
      "entry_id": "log_dc77ef853729",
      "timestamp": "2026-09-08T11:19:14.687008Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "VOSS & ASSOCIATES (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'UNKNOWN'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'trademark_status', 'rights_holder', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 21061.119500081986,
      "token_cost": 4089,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_8558fc24473b",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "trademark_status",
          "rights_holder",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_ac171889b52e",
          "ev_fb2c7f485c26"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_11a1d87cff16",
      "timestamp": "2026-09-08T11:19:14.688869Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "VOSS & ASSOCIATES: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'UNKNOWN'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.3953329287469387,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_8558fc24473b",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_b3de6802dc8c",
      "timestamp": "2026-09-08T11:19:14.786483Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "VALLEY PAWN & LOAN (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'null'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'trademark_status', 'rights_holder', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 21165.96012469381,
      "token_cost": 4224,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ceb693738e73",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "trademark_status",
          "rights_holder",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_1c9526325394",
          "ev_7d1041363d22",
          "ev_94b19641bb64"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_6a1c0b44fb9e",
      "timestamp": "2026-09-08T11:19:14.787735Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "VALLEY PAWN & LOAN: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'null'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.1715831458568573,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ceb693738e73",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_d7d8c388cdf8",
      "timestamp": "2026-09-08T11:19:16.525606Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "THE GOLDEN BEAR DINER (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'UNKNOWN'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'trademark_status', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 22903.012457769364,
      "token_cost": 4435,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4f29daeee2b1",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "trademark_status",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_76281707689f",
          "ev_8731fb049f77",
          "ev_7d73266f6c2a"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_f7172f9eea75",
      "timestamp": "2026-09-08T11:19:16.526658Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "THE GOLDEN BEAR DINER: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'UNKNOWN'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.14283321797847748,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4f29daeee2b1",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_2e903d4d88a8",
      "timestamp": "2026-09-08T11:19:17.431903Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "Rolex Submariner (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Registered And Renewed'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 23804.574999958277,
      "token_cost": 4310,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_320649948473",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_da04c1380dd1",
          "ev_af6927b940ef"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_9fe82267d77d",
      "timestamp": "2026-09-08T11:19:17.432653Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "Rolex Submariner: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Registered And Renewed'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.10491674765944481,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_320649948473",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_99047e529d97",
      "timestamp": "2026-09-08T11:19:25.915101Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "MERIDIAN SOUND (1 rule outcomes)",
      "output_summary": "tier=ESCALATE, 3 open questions",
      "latency_ms": 21298.654166981578,
      "token_cost": 4147,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4051d7cfe988",
        "model_tier": "ESCALATE",
        "compelled_tier": null
      }
    },
    {
      "entry_id": "log_f669710c300a",
      "timestamp": "2026-09-08T11:19:25.917361Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_4051d7cfe988: 4 claims",
      "output_summary": "4 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4051d7cfe988",
        "kept": 4,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_7f570423ccdf",
      "timestamp": "2026-09-08T11:19:26.829353Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "VALLEY PAWN & LOAN (1 rule outcomes)",
      "output_summary": "tier=ESCALATE, 2 open questions",
      "latency_ms": 12040.623540990055,
      "token_cost": 3980,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ceb693738e73",
        "model_tier": "ESCALATE",
        "compelled_tier": null
      }
    },
    {
      "entry_id": "log_33682da6623f",
      "timestamp": "2026-09-08T11:19:26.832099Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_ceb693738e73: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ceb693738e73",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_08e7768a8350",
      "timestamp": "2026-09-08T11:19:30.439509Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "Rolex Submariner (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION (COMPELLED by facts; model proposed ESCALATE), 2 open questions",
      "latency_ms": 13006.086874753237,
      "token_cost": 4105,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_320649948473",
        "model_tier": "ESCALATE",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_8aa6b7dff3ad",
      "timestamp": "2026-09-08T11:19:30.441194Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_320649948473: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_320649948473",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_b16388689635",
      "timestamp": "2026-09-08T11:19:34.132732Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "THE GOLDEN BEAR DINER (1 rule outcomes)",
      "output_summary": "tier=ESCALATE, 2 open questions",
      "latency_ms": 17604.57962518558,
      "token_cost": 4240,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4f29daeee2b1",
        "model_tier": "ESCALATE",
        "compelled_tier": null
      }
    },
    {
      "entry_id": "log_623221c48a69",
      "timestamp": "2026-09-08T11:19:34.133870Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_4f29daeee2b1: 4 claims",
      "output_summary": "4 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4f29daeee2b1",
        "kept": 4,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_8463974b7eb9",
      "timestamp": "2026-09-08T11:19:34.655522Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "Gene Austin (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION, 2 open questions",
      "latency_ms": 23983.715208247304,
      "token_cost": 4465,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ceb6a70b34d4",
        "model_tier": "NEEDS_VERIFICATION",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_d2c72657a391",
      "timestamp": "2026-09-08T11:19:34.656827Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_ceb6a70b34d4: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ceb6a70b34d4",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_2722b5ae73be",
      "timestamp": "2026-09-08T11:19:35.124789Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "VOSS & ASSOCIATES (1 rule outcomes)",
      "output_summary": "tier=ESCALATE, 2 open questions",
      "latency_ms": 20434.96166728437,
      "token_cost": 4345,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_8558fc24473b",
        "model_tier": "ESCALATE",
        "compelled_tier": null
      }
    },
    {
      "entry_id": "log_7761b4167d80",
      "timestamp": "2026-09-08T11:19:35.125845Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_8558fc24473b: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_8558fc24473b",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_6926e768793e",
      "timestamp": "2026-09-08T11:19:43.143425Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "COCA-COLA (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Active'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 16309.559209272265,
      "token_cost": 4691,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ab7298e47bca",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_fc93b5f61002",
          "ev_cd99a151f6a8",
          "ev_98b7bfe50f74",
          "ev_2964542f70ce",
          "ev_99c4ab0f0adb",
          "ev_e92672d9d659",
          "ev_baa513e991e6"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_1a5c30514f96",
      "timestamp": "2026-09-08T11:19:43.146905Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "COCA-COLA: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Active'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.5203750915825367,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ab7298e47bca",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_6734cc139b60",
      "timestamp": "2026-09-08T11:19:45.047314Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "Gibson ES-335 (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'creation_year': 1958, 'trademark_status': 'Active'}; not found: ['publication_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 19128.84091725573,
      "token_cost": 4666,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_74eabfebbb60",
        "facts_not_found": [
          "publication_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_2179a05a38b9",
          "ev_38e596a96a9a",
          "ev_39a0a8f3028c",
          "ev_793556b1afb0",
          "ev_b92fc54bd7f2"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_aefe5bdba4cd",
      "timestamp": "2026-09-08T11:19:45.048689Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "Gibson ES-335: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'creation_year': 1958, 'authorship_type': 'CORPORATE', 'trademark_status': 'Active'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.14008302241563797,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_74eabfebbb60",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_c0147db79128",
      "timestamp": "2026-09-08T11:19:47.023170Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "CHATEAU MARMONT (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Registered'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 12888.850457966328,
      "token_cost": 2878,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_c28c010c3064",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_c9feb5eee135",
          "ev_e4620e565ec9"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_c701b2937d3b",
      "timestamp": "2026-09-08T11:19:47.024068Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "CHATEAU MARMONT: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Registered'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.120542012155056,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_c28c010c3064",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_5d28c98c3adf",
      "timestamp": "2026-09-08T11:19:47.331778Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "Clinton (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.PERSONA: 'PERSONA'>, 'is_person_living': True, 'trademark_status': 'UNKNOWN'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'person_death_year', 'trademark_status', 'rights_holder', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 12674.06512517482,
      "token_cost": 3141,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0e21e763f3c2",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "person_death_year",
          "trademark_status",
          "rights_holder",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_fb45c813ebd2",
          "ev_fa01acc14f2d"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_42b8ba014271",
      "timestamp": "2026-09-08T11:19:47.332735Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "Clinton: {'work_type': 'PERSONA', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'is_person_living': True, 'trademark_status': 'UNKNOWN'}",
      "output_summary": "US_PUBLICITY_POSTMORTEM=RIGHT_SUBSISTS",
      "latency_ms": 0.1532081514596939,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0e21e763f3c2",
        "deterministic": true,
        "rule_ids": [
          "US_PUBLICITY_POSTMORTEM"
        ]
      }
    },
    {
      "entry_id": "log_a0f627d3c1a2",
      "timestamp": "2026-09-08T11:19:52.248970Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "SUNSET BOULEVARD (6 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'creation_year': 1996}; not found: ['work_type', 'jurisdiction', 'publication_year', 'author_death_year', 'authorship_type', 'is_person_living', 'person_death_year', 'trademark_status', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 21806.95145763457,
      "token_cost": 3842,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_7999e01c917c",
        "facts_not_found": [
          "work_type",
          "jurisdiction",
          "publication_year",
          "author_death_year",
          "authorship_type",
          "is_person_living",
          "person_death_year",
          "trademark_status",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_3c333bec9f59",
          "ev_467c4a1f7a4b"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_058b7f774605",
      "timestamp": "2026-09-08T11:19:52.250992Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "SUNSET BOULEVARD: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'creation_year': 1996, 'authorship_type': 'UNKNOWN'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.1572086475789547,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_7999e01c917c",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_41cedfc5237f",
      "timestamp": "2026-09-08T11:19:56.245204Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "Gibson ES-335 (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION (COMPELLED by facts; model proposed ESCALATE), 1 open questions",
      "latency_ms": 11195.754291955382,
      "token_cost": 3697,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_74eabfebbb60",
        "model_tier": "ESCALATE",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_28457db1ec80",
      "timestamp": "2026-09-08T11:19:56.247254Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_74eabfebbb60: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_74eabfebbb60",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_8bae8b535c04",
      "timestamp": "2026-09-08T11:19:58.033561Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "COCA-COLA (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION (COMPELLED by facts; model proposed ESCALATE), 3 open questions",
      "latency_ms": 14886.006915941834,
      "token_cost": 4381,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ab7298e47bca",
        "model_tier": "ESCALATE",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_ddb320007729",
      "timestamp": "2026-09-08T11:19:58.034355Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_ab7298e47bca: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ab7298e47bca",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_4c627f7978b3",
      "timestamp": "2026-09-08T11:20:06.178875Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "CHATEAU MARMONT (1 rule outcomes)",
      "output_summary": "tier=ESCALATE, 3 open questions",
      "latency_ms": 19154.311292339116,
      "token_cost": 3838,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_c28c010c3064",
        "model_tier": "ESCALATE",
        "compelled_tier": null
      }
    },
    {
      "entry_id": "log_502363c8c9b7",
      "timestamp": "2026-09-08T11:20:06.180689Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_c28c010c3064: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_c28c010c3064",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_423c46f13619",
      "timestamp": "2026-09-08T11:20:06.278131Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "\"BYE BYE BLACKBIRD.\" (16 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.MUSICAL_COMPOSITION: 'MUSICAL_COMPOSITION'>, 'publication_year': 1926, 'creation_year': 1926, 'trademark_status': 'null'}; not found: ['author_death_year', 'is_person_living', 'person_death_year', 'trademark_status']",
      "latency_ms": 31151.808833237737,
      "token_cost": 6431,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4ac4ea6f6480",
        "facts_not_found": [
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "trademark_status"
        ],
        "supporting_evidence": [
          "ev_4653b97db03f",
          "ev_b536f14a3852",
          "ev_16854cdd30c6",
          "ev_dffbc80fdb99",
          "ev_e44691becb4b",
          "ev_74bccb251fab"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_7bacf5919c9e",
      "timestamp": "2026-09-08T11:20:06.279548Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "\"BYE BYE BLACKBIRD.\": {'work_type': 'MUSICAL_COMPOSITION', 'jurisdiction': 'US', 'publication_year': 1926, 'creation_year': 1926, 'authorship_type': 'UNKNOWN', 'trademark_status': 'null'}",
      "output_summary": "US_PUB_PRE_1978_95_YEARS=PUBLIC_DOMAIN (PD 2022); US_SOUND_RECORDING_MMA=IN_COPYRIGHT (PD 2027)",
      "latency_ms": 0.38004107773303986,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4ac4ea6f6480",
        "deterministic": true,
        "rule_ids": [
          "US_PUB_PRE_1978_95_YEARS",
          "US_SOUND_RECORDING_MMA"
        ]
      }
    },
    {
      "entry_id": "log_1f94c6d86027",
      "timestamp": "2026-09-08T11:20:06.382029Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "Clinton (1 rule outcomes)",
      "output_summary": "tier=ESCALATE, 1 open questions",
      "latency_ms": 19048.810250125825,
      "token_cost": 4057,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0e21e763f3c2",
        "model_tier": "ESCALATE",
        "compelled_tier": "ESCALATE"
      }
    },
    {
      "entry_id": "log_6612e5cf2561",
      "timestamp": "2026-09-08T11:20:06.383446Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_0e21e763f3c2: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0e21e763f3c2",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_f4a88b33b691",
      "timestamp": "2026-09-08T11:20:09.044339Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "CAPITOL RECORDS (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Registered'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 12796.152332797647,
      "token_cost": 3245,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_b6d84d21d91e",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_bd4788c32882",
          "ev_2bf04bad4387",
          "ev_29b0b80b0b19"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_61b8b536dab1",
      "timestamp": "2026-09-08T11:20:09.045772Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "CAPITOL RECORDS: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Registered'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.2159997820854187,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_b6d84d21d91e",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_c1d547b6e54e",
      "timestamp": "2026-09-08T11:20:12.013488Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "SUNSET BOULEVARD (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION, 2 open questions",
      "latency_ms": 19761.994916945696,
      "token_cost": 4433,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_7999e01c917c",
        "model_tier": "NEEDS_VERIFICATION",
        "compelled_tier": null
      }
    },
    {
      "entry_id": "log_34b1d8c486c9",
      "timestamp": "2026-09-08T11:20:12.014515Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_7999e01c917c: 4 claims",
      "output_summary": "4 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_7999e01c917c",
        "kept": 4,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_5319bf69d928",
      "timestamp": "2026-09-08T11:20:19.130750Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "FEDEX (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'publication_year': 1994, 'creation_year': 1994, 'trademark_status': 'Registered'}; not found: ['author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 21096.02487506345,
      "token_cost": 4263,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_2763dcf7f352",
        "facts_not_found": [
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_faf1b24367c5",
          "ev_70c298c19cdd",
          "ev_2d2254a967d9"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_ef3145fd526c",
      "timestamp": "2026-09-08T11:20:19.132309Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "FEDEX: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'publication_year': 1994, 'creation_year': 1994, 'authorship_type': 'UNKNOWN', 'trademark_status': 'Registered'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.20624976605176926,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_2763dcf7f352",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_08d8462721dd",
      "timestamp": "2026-09-08T11:20:20.880557Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "\"BYE BYE BLACKBIRD.\" (2 rule outcomes)",
      "output_summary": "tier=ESCALATE, 3 open questions",
      "latency_ms": 14600.636791903526,
      "token_cost": 4999,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4ac4ea6f6480",
        "model_tier": "ESCALATE",
        "compelled_tier": "ESCALATE"
      }
    },
    {
      "entry_id": "log_0a0e34ee14b6",
      "timestamp": "2026-09-08T11:20:20.881811Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_4ac4ea6f6480: 4 claims",
      "output_summary": "4 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_4ac4ea6f6480",
        "kept": 4,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_9b09297b791a",
      "timestamp": "2026-09-08T11:20:22.763900Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "CAPITOL RECORDS (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION (COMPELLED by facts; model proposed ESCALATE), 2 open questions",
      "latency_ms": 13715.76387481764,
      "token_cost": 3652,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_b6d84d21d91e",
        "model_tier": "ESCALATE",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_f1d0b7791648",
      "timestamp": "2026-09-08T11:20:22.764978Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_b6d84d21d91e: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_b6d84d21d91e",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_e2c0a27c8858",
      "timestamp": "2026-09-08T11:20:23.071057Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "APPLE (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Registered'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 16889.654249884188,
      "token_cost": 3891,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_81a717e2944d",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_1996131196a5",
          "ev_3fd88ebbd84e",
          "ev_422a4c9c2949",
          "ev_a62f92049f2b"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_21b483010262",
      "timestamp": "2026-09-08T11:20:23.073123Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "APPLE: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Registered'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.15441607683897018,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_81a717e2944d",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_5f3982c9248b",
      "timestamp": "2026-09-08T11:20:23.250811Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "STARBUCKS (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'REGISTERED'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 16866.7147080414,
      "token_cost": 3681,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_3c88b902b2de",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_0c4dc6d4efae",
          "ev_2a7e11f6a523",
          "ev_2ea8f23ef084",
          "ev_47d10973d089",
          "ev_73d3b4110f77",
          "ev_c1cf19354a33"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_7c9452862012",
      "timestamp": "2026-09-08T11:20:23.251645Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "STARBUCKS: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'REGISTERED'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.1088329590857029,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_3c88b902b2de",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_65b393412930",
      "timestamp": "2026-09-08T11:20:35.617066Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "Penguin (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Live/Registered'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 23601.913291029632,
      "token_cost": 5043,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0dff9dbcaf39",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_50b1d2fd9777",
          "ev_b396cc4ea1d5",
          "ev_f372ca8b1789"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_82719056ab5e",
      "timestamp": "2026-09-08T11:20:35.619044Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "Penguin: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Live/Registered'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.15570782124996185,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0dff9dbcaf39",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_d5fbf741f065",
      "timestamp": "2026-09-08T11:20:37.888734Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "STARBUCKS (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION (COMPELLED by facts; model proposed ESCALATE), 3 open questions",
      "latency_ms": 14636.332124937326,
      "token_cost": 3582,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_3c88b902b2de",
        "model_tier": "ESCALATE",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_d820c4ee5f4b",
      "timestamp": "2026-09-08T11:20:37.889765Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_3c88b902b2de: 4 claims",
      "output_summary": "4 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_3c88b902b2de",
        "kept": 4,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_9c04f74c824e",
      "timestamp": "2026-09-08T11:20:38.507249Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "APPLE (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION (COMPELLED by facts; model proposed ESCALATE), 3 open questions",
      "latency_ms": 15433.639834169298,
      "token_cost": 3688,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_81a717e2944d",
        "model_tier": "ESCALATE",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_7593e33e6379",
      "timestamp": "2026-09-08T11:20:38.508534Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_81a717e2944d: 4 claims",
      "output_summary": "4 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_81a717e2944d",
        "kept": 4,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_55d0b9f8a298",
      "timestamp": "2026-09-08T11:20:43.028415Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "NEUMANN U 87 (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'REGISTERED'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 22145.723916124552,
      "token_cost": 4573,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_75ee3491ea73",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_4abdea8e40e2",
          "ev_740673302798"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_2a96e50a98e7",
      "timestamp": "2026-09-08T11:20:43.029774Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "NEUMANN U 87: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'REGISTERED'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.4627923481166363,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_75ee3491ea73",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_b70d9610eceb",
      "timestamp": "2026-09-08T11:20:45.607132Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "PRO TOOLS (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>}; not found: ['jurisdiction', 'publication_year', 'creation_year', 'author_death_year', 'authorship_type', 'is_person_living', 'person_death_year', 'trademark_status', 'rights_holder', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 22841.865499969572,
      "token_cost": 3641,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_cec43d334307",
        "facts_not_found": [
          "jurisdiction",
          "publication_year",
          "creation_year",
          "author_death_year",
          "authorship_type",
          "is_person_living",
          "person_death_year",
          "trademark_status",
          "rights_holder",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_04c756949ffc"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_49d5aba827c5",
      "timestamp": "2026-09-08T11:20:45.608173Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "PRO TOOLS: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.10762503370642662,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_cec43d334307",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_a8a7da487b97",
      "timestamp": "2026-09-08T11:20:47.365106Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "Penguin (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION (COMPELLED by facts; model proposed ESCALATE), 2 open questions",
      "latency_ms": 11745.591707993299,
      "token_cost": 3920,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0dff9dbcaf39",
        "model_tier": "ESCALATE",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_bea884caa2d7",
      "timestamp": "2026-09-08T11:20:47.366377Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_0dff9dbcaf39: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0dff9dbcaf39",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_6e67ed3cb0bb",
      "timestamp": "2026-09-08T11:20:55.230559Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "NIKE (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Live/Registered'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 16721.357624977827,
      "token_cost": 4363,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0a02db79809c",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_1ae029c28955",
          "ev_9fa1aa74fc72",
          "ev_e5e4a8983d25",
          "ev_daeffefc089b",
          "ev_de80f131d181"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_567908c3d110",
      "timestamp": "2026-09-08T11:20:55.232939Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "NIKE: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Live/Registered'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.4091248847544193,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0a02db79809c",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_18da60b8dff0",
      "timestamp": "2026-09-08T11:20:59.842602Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "FEDEX (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION (COMPELLED by facts; model proposed ESCALATE), 2 open questions",
      "latency_ms": 40709.95679171756,
      "token_cost": 3778,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_2763dcf7f352",
        "model_tier": "ESCALATE",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_f8289f965807",
      "timestamp": "2026-09-08T11:20:59.844414Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_2763dcf7f352: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_2763dcf7f352",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_0f57a0a93f87",
      "timestamp": "2026-09-08T11:21:00.243305Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "MARLBORO (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Live/Registered'}; not found: ['authorship_type', 'publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 22352.84575028345,
      "token_cost": 4773,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_97d887b5109a",
        "facts_not_found": [
          "authorship_type",
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_82996f38def4",
          "ev_13443f88ae6b",
          "ev_d0f38b233625"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_62cc385aec7d",
      "timestamp": "2026-09-08T11:21:00.244268Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "MARLBORO: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Live/Registered'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.2648336812853813,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_97d887b5109a",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_53ec55b15ae5",
      "timestamp": "2026-09-08T11:21:01.867372Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "PRO TOOLS (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION (COMPELLED by facts; model proposed ESCALATE), 3 open questions",
      "latency_ms": 16258.895749691874,
      "token_cost": 3808,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_cec43d334307",
        "model_tier": "ESCALATE",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_346344ef70c7",
      "timestamp": "2026-09-08T11:21:01.868591Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_cec43d334307: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_cec43d334307",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_833a508ca9c6",
      "timestamp": "2026-09-08T11:21:09.389508Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "NEUMANN U 87 (1 rule outcomes)",
      "output_summary": "tier=ESCALATE, 2 open questions",
      "latency_ms": 26359.32999989018,
      "token_cost": 4083,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_75ee3491ea73",
        "model_tier": "ESCALATE",
        "compelled_tier": "ESCALATE"
      }
    },
    {
      "entry_id": "log_1339d8724802",
      "timestamp": "2026-09-08T11:21:09.391694Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_75ee3491ea73: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_75ee3491ea73",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_84ced56b7853",
      "timestamp": "2026-09-08T11:21:14.172915Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "NIKE (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION (COMPELLED by facts; model proposed ESCALATE), 2 open questions",
      "latency_ms": 18939.575375057757,
      "token_cost": 4122,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0a02db79809c",
        "model_tier": "ESCALATE",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_8c8e9743185e",
      "timestamp": "2026-09-08T11:21:14.174017Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_0a02db79809c: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_0a02db79809c",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_6040525ff25f",
      "timestamp": "2026-09-08T11:21:22.153418Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "THE GREAT GATSBY (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.LITERARY_WORK: 'LITERARY_WORK'>, 'publication_year': 1925, 'author_death_year': 1940, 'trademark_status': 'null'}; not found: ['creation_year', 'is_person_living', 'person_death_year', 'trademark_status', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 20284.245165996253,
      "token_cost": 4298,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_edaf252de2d5",
        "facts_not_found": [
          "creation_year",
          "is_person_living",
          "person_death_year",
          "trademark_status",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_1e954957c5a4",
          "ev_3954e654a540",
          "ev_3f8ea5e5d8e1",
          "ev_850d4f0a9a6d",
          "ev_8df4be1e389c",
          "ev_b9ccc1a79401"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_039219c1027e",
      "timestamp": "2026-09-08T11:21:22.155310Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "THE GREAT GATSBY: {'work_type': 'LITERARY_WORK', 'jurisdiction': 'US', 'publication_year': 1925, 'author_death_year': 1940, 'authorship_type': 'UNKNOWN', 'trademark_status': 'null'}",
      "output_summary": "US_PUB_PRE_1978_95_YEARS=PUBLIC_DOMAIN (PD 2021)",
      "latency_ms": 0.2899589017033577,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_edaf252de2d5",
        "deterministic": true,
        "rule_ids": [
          "US_PUB_PRE_1978_95_YEARS"
        ]
      }
    },
    {
      "entry_id": "log_607ce84eb2c9",
      "timestamp": "2026-09-08T11:21:25.021551Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "VENICE BEACH (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Registered'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 25176.496374886483,
      "token_cost": 4622,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_fbbd96ccec77",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_7cb4dcfd7417",
          "ev_7564707128c4",
          "ev_ead7d1212f9d",
          "ev_89b3633f9211"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_4c12ec47815d",
      "timestamp": "2026-09-08T11:21:25.022657Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "VENICE BEACH: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Registered'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.23195799440145493,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_fbbd96ccec77",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_9a8273a5d424",
      "timestamp": "2026-09-08T11:21:25.556077Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "MARLBORO (1 rule outcomes)",
      "output_summary": "tier=NEEDS_VERIFICATION (COMPELLED by facts; model proposed ESCALATE), 2 open questions",
      "latency_ms": 25311.036999803036,
      "token_cost": 4176,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_97d887b5109a",
        "model_tier": "ESCALATE",
        "compelled_tier": "NEEDS_VERIFICATION"
      }
    },
    {
      "entry_id": "log_73f77fb636e6",
      "timestamp": "2026-09-08T11:21:25.556939Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_97d887b5109a: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_97d887b5109a",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_59d39a1bf76d",
      "timestamp": "2026-09-08T11:21:28.406662Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "THE ECHO PLEX (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Live/Registered'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'authorship_type', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 19014.062374830246,
      "token_cost": 3964,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_e33955bfacfb",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "authorship_type",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_1113a2b99c29",
          "ev_15b0e50c78db",
          "ev_4e86828456df",
          "ev_b97feeda7896",
          "ev_c09bd782490e"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_b9b2f83ef62b",
      "timestamp": "2026-09-08T11:21:28.408454Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "THE ECHO PLEX: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Live/Registered'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.36012521013617516,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_e33955bfacfb",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_9086e2e8611e",
      "timestamp": "2026-09-08T11:21:31.523095Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "JONI MITCHELL (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.PERSONA: 'PERSONA'>, 'is_person_living': True, 'trademark_status': 'null'}; not found: ['jurisdiction', 'publication_year', 'creation_year', 'author_death_year', 'authorship_type', 'person_death_year', 'trademark_status', 'rights_holder', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 17348.66729239002,
      "token_cost": 3990,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_7901727b8f1f",
        "facts_not_found": [
          "jurisdiction",
          "publication_year",
          "creation_year",
          "author_death_year",
          "authorship_type",
          "person_death_year",
          "trademark_status",
          "rights_holder",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_f25684b61d30",
          "ev_adf239dc4003"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_94edd8f08b9d",
      "timestamp": "2026-09-08T11:21:31.524383Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "JONI MITCHELL: {'work_type': 'PERSONA', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'is_person_living': True, 'trademark_status': 'null'}",
      "output_summary": "US_PUBLICITY_POSTMORTEM=RIGHT_SUBSISTS",
      "latency_ms": 0.2060001716017723,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_7901727b8f1f",
        "deterministic": true,
        "rule_ids": [
          "US_PUBLICITY_POSTMORTEM"
        ]
      }
    },
    {
      "entry_id": "log_2370d809fccc",
      "timestamp": "2026-09-08T11:21:37.599822Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "Meridian Records (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Registered'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'authorship_type', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 50233.334416057914,
      "token_cost": 5300,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ed4fb13eb46a",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "authorship_type",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_a2a27e489ba0"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_32a1b1f41c69",
      "timestamp": "2026-09-08T11:21:37.601891Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "Meridian Records: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Registered'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.288916751742363,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ed4fb13eb46a",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_1b6edbfe5ae6",
      "timestamp": "2026-09-08T11:21:41.504791Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "THE GREAT GATSBY (1 rule outcomes)",
      "output_summary": "tier=CLEAR_ON_RECORD, 1 open questions",
      "latency_ms": 19348.583582788706,
      "token_cost": 4387,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_edaf252de2d5",
        "model_tier": "CLEAR_ON_RECORD",
        "compelled_tier": null
      }
    },
    {
      "entry_id": "log_32dd05ca9175",
      "timestamp": "2026-09-08T11:21:41.506265Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_edaf252de2d5: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_edaf252de2d5",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_85b85663b5d6",
      "timestamp": "2026-09-08T11:21:42.016759Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "THE ECHO PLEX (1 rule outcomes)",
      "output_summary": "tier=ESCALATE, 3 open questions",
      "latency_ms": 13607.138541992754,
      "token_cost": 3835,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_e33955bfacfb",
        "model_tier": "ESCALATE",
        "compelled_tier": null
      }
    },
    {
      "entry_id": "log_a78ed7d97ef8",
      "timestamp": "2026-09-08T11:21:42.019079Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_e33955bfacfb: 4 claims",
      "output_summary": "4 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_e33955bfacfb",
        "kept": 4,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_4c956eba6483",
      "timestamp": "2026-09-08T11:21:47.072192Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "VENICE BEACH (1 rule outcomes)",
      "output_summary": "tier=ESCALATE, 2 open questions",
      "latency_ms": 22048.91337500885,
      "token_cost": 4668,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_fbbd96ccec77",
        "model_tier": "ESCALATE",
        "compelled_tier": null
      }
    },
    {
      "entry_id": "log_869454e6350a",
      "timestamp": "2026-09-08T11:21:47.073931Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_fbbd96ccec77: 4 claims",
      "output_summary": "4 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_fbbd96ccec77",
        "kept": 4,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_ac16a4d46a43",
      "timestamp": "2026-09-08T11:21:52.059855Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.extract_facts",
      "input_summary": "Gibson (8 evidence)",
      "output_summary": "facts sourced: {'work_type': <WorkType.TRADEMARK: 'TRADEMARK'>, 'trademark_status': 'Registered'}; not found: ['publication_year', 'creation_year', 'author_death_year', 'is_person_living', 'person_death_year', 'recording_publication_year', 'recording_rights_holder']",
      "latency_ms": 26502.67920875922,
      "token_cost": 5632,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_b1d796825054",
        "facts_not_found": [
          "publication_year",
          "creation_year",
          "author_death_year",
          "is_person_living",
          "person_death_year",
          "recording_publication_year",
          "recording_rights_holder"
        ],
        "supporting_evidence": [
          "ev_e71edf32d283",
          "ev_8296419488ca",
          "ev_d021b1d50374",
          "ev_fc04d0262bd2",
          "ev_3669b7c8be52"
        ],
        "unresolved_citations": []
      }
    },
    {
      "entry_id": "log_b76fe094abaa",
      "timestamp": "2026-09-08T11:21:52.062632Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "RULES",
      "tool": "rules_engine.evaluate",
      "input_summary": "Gibson: {'work_type': 'TRADEMARK', 'jurisdiction': 'US', 'authorship_type': 'UNKNOWN', 'trademark_status': 'Registered'}",
      "output_summary": "TRADEMARK_NO_EXPIRY=NOT_APPLICABLE",
      "latency_ms": 0.6230832077562809,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_b1d796825054",
        "deterministic": true,
        "rule_ids": [
          "TRADEMARK_NO_EXPIRY"
        ]
      }
    },
    {
      "entry_id": "log_aef7d4ed8f34",
      "timestamp": "2026-09-08T11:21:52.465933Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "JONI MITCHELL (1 rule outcomes)",
      "output_summary": "tier=ESCALATE, 1 open questions",
      "latency_ms": 20941.151625011116,
      "token_cost": 4478,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_7901727b8f1f",
        "model_tier": "ESCALATE",
        "compelled_tier": "ESCALATE"
      }
    },
    {
      "entry_id": "log_6d664a650c87",
      "timestamp": "2026-09-08T11:21:52.468651Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_7901727b8f1f: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_7901727b8f1f",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_ff95fc570525",
      "timestamp": "2026-09-08T11:22:01.932815Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "Meridian Records (1 rule outcomes)",
      "output_summary": "tier=CLEAR_ON_RECORD, 2 open questions",
      "latency_ms": 24329.806541558355,
      "token_cost": 4525,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ed4fb13eb46a",
        "model_tier": "CLEAR_ON_RECORD",
        "compelled_tier": null
      }
    },
    {
      "entry_id": "log_48e9b570ddb7",
      "timestamp": "2026-09-08T11:22:01.935497Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_ed4fb13eb46a: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_ed4fb13eb46a",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_b901d64dbc5a",
      "timestamp": "2026-09-08T11:22:04.547502Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "gemini.synthesize",
      "input_summary": "Gibson (1 rule outcomes)",
      "output_summary": "tier=ESCALATE, 2 open questions",
      "latency_ms": 12484.124958980829,
      "token_cost": 3882,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_b1d796825054",
        "model_tier": "ESCALATE",
        "compelled_tier": "ESCALATE"
      }
    },
    {
      "entry_id": "log_639b43aec932",
      "timestamp": "2026-09-08T11:22:04.548523Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "VALIDATE",
      "tool": "citations.validate_finding",
      "input_summary": "item_b1d796825054: 3 claims",
      "output_summary": "3 kept, 0 dropped",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "item_id": "item_b1d796825054",
        "kept": 3,
        "dropped": 0
      }
    },
    {
      "entry_id": "log_b9c0c68ef534",
      "timestamp": "2026-09-08T11:22:04.549223Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ASSEMBLE",
      "tool": "assembler.assemble_findings",
      "input_summary": "27 items",
      "output_summary": "27 findings: {'ESCALATE': 12, 'NEEDS_VERIFICATION': 13, 'CLEAR_ON_RECORD': 2}",
      "latency_ms": 190935.31550001353,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "tier_counts": {
          "ESCALATE": 12,
          "NEEDS_VERIFICATION": 13,
          "CLEAR_ON_RECORD": 2
        }
      }
    },
    {
      "entry_id": "log_a972cbc5fa29",
      "timestamp": "2026-09-08T11:22:04.550975Z",
      "report_id": "rpt_demo_the_last_good_year",
      "stage": "ORCHESTRATOR",
      "tool": "run_pipeline",
      "input_summary": "the_last_good_year.pdf",
      "output_summary": "state=COMPLETE items=27 evidence=222 findings=27 tiers={'CLEAR_ON_RECORD': 2, 'NEEDS_VERIFICATION': 13, 'ESCALATE': 12}",
      "latency_ms": null,
      "token_cost": null,
      "task_cost": null,
      "level": "INFO",
      "detail": {
        "entries": 145,
        "warnings": 0,
        "errors": 0,
        "safety_blocks": 0,
        "total_latency_ms": 1632495.7,
        "total_tokens": 257034,
        "total_parallel_tasks": 56
      }
    }
  ],
  "totals": {
    "entries": 146,
    "warnings": 0,
    "errors": 0,
    "safety_blocks": 0,
    "total_latency_ms": 1632495.7,
    "total_tokens": 257034,
    "total_parallel_tasks": 56
  }
};

export const MOCK_REPORTS = [
  {
    "report_id": "rpt_demo_the_last_good_year",
    "script_name": "The Last Good Year",
    "pipeline_state": "COMPLETE",
    "status": "DRAFT",
    "items": 27,
    "tier_counts": {
      "CLEAR_ON_RECORD": 2,
      "NEEDS_VERIFICATION": 13,
      "ESCALATE": 12
    },
    "pending": 27,
    "created_at": "2026-09-08T11:16:46.472263Z"
  }
];
