/**
 * Pre-baked sample report and trace data for "The Last Good Year".
 * Enables immediate offline testing, demo walkthroughs, and hackathon presentation
 * even when live API keys are not configured.
 */
export const MOCK_REPORT = {
  report_id: "rpt_f2d7778b40f2",
  script_name: "The Last Good Year",
  status: "DRAFT",
  created_at: "2026-09-07T23:39:11.402Z",
  updated_at: "2026-09-07T23:52:40.881Z",
  pipeline_state: "COMPLETE",
  error: null,
  page_count: 6,
  scene_count: 14,
  items: [
    {
      item_id: "item_9f3c21a4b7de",
      mention_text: "COCA-COLA",
      category: "BRAND_TRADEMARK",
      normalized_name: "Coca-Cola",
      variants: ["Coke"],
      extraction_notes: "Prominent visual prop in Diner scene",
      occurrences: [
        {
          scene_number: 3,
          page_number: 1,
          context_snippet: "Maya sits with a COCA-COLA in a glass bottle, sweating onto a napkin.",
          on_screen: true,
          depiction_nature: "NEUTRAL"
        }
      ]
    },
    {
      item_id: "item_2b7e40c1a993",
      mention_text: "1962 Gibson ES-335",
      category: "BRAND_TRADEMARK",
      normalized_name: "Gibson ES-335",
      variants: ["Gibson guitar"],
      extraction_notes: "Hero prop featured throughout screenplay",
      occurrences: [
        {
          scene_number: 1,
          page_number: 1,
          context_snippet: "She opens it. A 1962 Gibson ES-335, cherry red, the finish worn through where a thumb has rested...",
          on_screen: true,
          depiction_nature: "NEUTRAL"
        },
        {
          scene_number: 5,
          page_number: 3,
          context_snippet: "The Gibson rests against the amp, humming slightly in the dim rehearsal room.",
          on_screen: true,
          depiction_nature: "NEUTRAL"
        }
      ]
    },
    {
      item_id: "item_7a1d88e401b2",
      mention_text: "Rolex Submariner",
      category: "BRAND_TRADEMARK",
      normalized_name: "Rolex Submariner",
      variants: ["Rolex"],
      extraction_notes: "Pawn shop interaction prop",
      occurrences: [
        {
          scene_number: 1,
          page_number: 1,
          context_snippet: "He slides a Rolex Submariner across the glass toward her -- someone else's pawn, tagged and forgotten.",
          on_screen: true,
          depiction_nature: "NEUTRAL"
        }
      ]
    },
    {
      item_id: "item_8c3b99f201e7",
      mention_text: "CHATEAU MARMONT",
      category: "REAL_LOCATION_BUSINESS",
      normalized_name: "Chateau Marmont Hotel",
      variants: ["Chateau Marmont"],
      extraction_notes: "Exterior landmark shot on Sunset Blvd",
      occurrences: [
        {
          scene_number: 2,
          page_number: 1,
          context_snippet: "Above her, the CHATEAU MARMONT sits behind its hedge like something that got away with it.",
          on_screen: true,
          depiction_nature: "NEGATIVE"
        }
      ]
    },
    {
      item_id: "item_5e2d11a988cc",
      mention_text: "STARDUST (Hoagy Carmichael)",
      category: "MUSIC",
      normalized_name: "Stardust",
      variants: ["Star Dust"],
      extraction_notes: "Diegetic music playing from diner jukebox",
      occurrences: [
        {
          scene_number: 4,
          page_number: 2,
          context_snippet: "From the corner jukebox, the 1927 recording of STARDUST plays through cracked speakers.",
          on_screen: false,
          depiction_nature: "NEUTRAL"
        }
      ]
    },
    {
      item_id: "item_3d4f55a122ee",
      mention_text: "RAY LINDQUIST",
      category: "NAME_COLLISION",
      normalized_name: "Ray Lindquist",
      variants: [],
      extraction_notes: "Fictional character check against real entertainment executives",
      occurrences: [
        {
          scene_number: 3,
          page_number: 1,
          context_snippet: "Across from her: RAY LINDQUIST, 40s, a producer who dresses like he's about to board a sailboat.",
          on_screen: true,
          depiction_nature: "NEUTRAL"
        }
      ]
    },
    {
      item_id: "item_4a6c77d89901",
      mention_text: "CLINTON ADMINISTRATION",
      category: "REAL_PERSON",
      normalized_name: "Bill Clinton",
      variants: ["Clinton"],
      extraction_notes: "Incidental dialogue reference",
      occurrences: [
        {
          scene_number: 3,
          page_number: 1,
          context_snippet: "A counter, eight stools, a jukebox nobody has fed since the Clinton administration.",
          on_screen: false,
          depiction_nature: "NEUTRAL"
        }
      ]
    },
    {
      item_id: "item_9b2e33f4455a",
      mention_text: "THE GREAT GATSBY",
      category: "PUBLISHED_WORK",
      normalized_name: "The Great Gatsby",
      variants: ["Gatsby"],
      extraction_notes: "Paperback book visible on bedside table",
      occurrences: [
        {
          scene_number: 7,
          page_number: 4,
          context_snippet: "A dog-eared copy of THE GREAT GATSBY sits beside an empty coffee mug.",
          on_screen: true,
          depiction_nature: "NEUTRAL"
        }
      ]
    }
  ],
  findings: [
    {
      item_id: "item_8c3b99f201e7",
      tier: "ESCALATE",
      rationale: "The Chateau Marmont is an active real-world commercial establishment [ev_loc_01]. The script depiction ('like something that got away with it') carries potential negative commercial connotation [ev_loc_02]. Exterior architectural depictions of landmark commercial buildings require location release or counsel review under Lanham Act § 43(a).",
      claims: [
        {
          text: "The Chateau Marmont is an active real-world commercial establishment [ev_loc_01].",
          evidence_ids: ["ev_loc_01"],
          rule_ids: []
        },
        {
          text: "The script depiction carries potential negative commercial connotation [ev_loc_02]. Counsel sign-off is mandatory for depiction release.",
          evidence_ids: ["ev_loc_02"],
          rule_ids: []
        }
      ],
      evidence_ids: ["ev_loc_01", "ev_loc_02"],
      rule_outcomes: [
        {
          rule_id: "LOCATION_LANHAM_ACT",
          applied_facts: { location_type: "COMMERCIAL_HOSPITALITY", depiction: "NEGATIVE" },
          outcome: "RIGHT_SUBSISTS",
          explanation: "Commercial establishment portrayed negatively creates exposure to trade libel and Lanham Act § 43(a) claims without a formal location agreement.",
          missing_facts: [],
          public_domain_year: null,
          citation: "Lanham Act § 43(a), 15 U.S.C. § 1125(a)",
          evaluated_at: "2026-09-07T23:45:10Z"
        }
      ],
      open_questions: [
        "Will production film actual exterior architectural footage or substitute a fictional plate?",
        "Has production location department contacted Andre Balazs Properties for a standard location agreement?"
      ],
      dropped_claims: ["Subjective artistic intent cannot substitute for statutory location release."],
      validated: true,
      rights_holder_hint: "Andre Balazs Properties",
      generated_at: "2026-09-07T23:45:12Z"
    },
    {
      item_id: "item_5e2d11a988cc",
      tier: "ESCALATE",
      rationale: "Music clearance requires evaluating both the underlying musical composition and the specific master sound recording. While Hoagy Carmichael's 1927 composition may qualify under public domain schedules, the 1927 sound recording remains protected under the Classics Protection and Access Act [US_SOUND_RECORDING_MMA] until 2028 [ev_mus_01].",
      claims: [
        {
          text: "Musical composition published 1927 with registered renewal [US_MUSICAL_COMPOSITION_PRE1978, ev_mus_02].",
          evidence_ids: ["ev_mus_02"],
          rule_ids: ["US_MUSICAL_COMPOSITION_PRE1978"]
        },
        {
          text: "Sound recording first fixed 1927 receives federal protection schedule through 31 December 2027 under Classics Protection and Access Act [US_SOUND_RECORDING_MMA, ev_mus_01]. Master license required.",
          evidence_ids: ["ev_mus_01"],
          rule_ids: ["US_SOUND_RECORDING_MMA"]
        }
      ],
      evidence_ids: ["ev_mus_01", "ev_mus_02"],
      rule_outcomes: [
        {
          rule_id: "US_MUSICAL_COMPOSITION_PRE1978",
          applied_facts: { work_type: "MUSICAL_COMPOSITION", publication_year: 1927 },
          outcome: "PUBLIC_DOMAIN",
          explanation: "Works first published in the US with notice prior to January 1, 1928 have entered the US public domain.",
          missing_facts: [],
          public_domain_year: 2023,
          citation: "17 U.S.C. § 304(b)",
          evaluated_at: "2026-09-07T23:45:10Z"
        },
        {
          rule_id: "US_SOUND_RECORDING_MMA",
          applied_facts: { work_type: "SOUND_RECORDING", publication_year: 1927 },
          outcome: "IN_COPYRIGHT",
          explanation: "Applying the Classics Protection and Access Act schedule (Title II MMA): Sound recordings fixed between 1923 and 1946 receive protection for 100 years post-fixation. Protection subsists through 31 December 2027.",
          missing_facts: [],
          public_domain_year: 2028,
          citation: "Music Modernization Act, Title II, 17 U.S.C. § 1401(a)(2)(B)",
          evaluated_at: "2026-09-07T23:45:11Z"
        }
      ],
      open_questions: [
        "Will the scene license the historical 1927 Gennett master recording, or will production re-record a new cover master to rely on the public-domain composition?"
      ],
      dropped_claims: [],
      validated: true,
      rights_holder_hint: "Peermusic III Ltd / Universal Music Group",
      generated_at: "2026-09-07T23:45:12Z"
    },
    {
      item_id: "item_9f3c21a4b7de",
      tier: "NEEDS_VERIFICATION",
      rationale: "The record establishes that COCA-COLA is an active, registered trademark owned by The Coca-Cola Company [ev_138654f495df, ev_27707629e060]. Trademark rights do not expire on a fixed term [TRADEMARK_NO_EXPIRY]. Incidental on-screen prop appearance qualifies as nominative fair use if bottle is unaltered and not disparaged [ev_27707629e060].",
      claims: [
        {
          text: "The record establishes that COCA-COLA is an active, registered trademark owned by The Coca-Cola Company [ev_138654f495df, ev_27707629e060].",
          evidence_ids: ["ev_138654f495df", "ev_27707629e060"],
          rule_ids: []
        },
        {
          text: "Trademark rights do not expire on a fixed statutory term [TRADEMARK_NO_EXPIRY]. Use on screen must remain strictly incidental and nominative.",
          evidence_ids: [],
          rule_ids: ["TRADEMARK_NO_EXPIRY"]
        }
      ],
      evidence_ids: ["ev_138654f495df", "ev_27707629e060"],
      rule_outcomes: [
        {
          rule_id: "TRADEMARK_NO_EXPIRY",
          applied_facts: { mark: "COCA-COLA", jurisdiction: "US" },
          outcome: "RIGHT_SUBSISTS",
          explanation: "Trademarks maintain protection indefinitely provided commercial use continues and periodic maintenance filings (§ 8 & § 9) are satisfied.",
          missing_facts: [],
          public_domain_year: null,
          citation: "15 U.S.C. § 1058, 1059",
          evaluated_at: "2026-09-07T23:45:10Z"
        }
      ],
      open_questions: [
        "Is the glass bottle depicted standard commercial packaging without digital label modification?",
        "Confirm no character dialogue implies beverage contamination or defect."
      ],
      dropped_claims: ["Sentence removed because it asserted a conclusion of legal non-infringement without judicial finding."],
      validated: true,
      rights_holder_hint: "The Coca-Cola Company",
      generated_at: "2026-09-07T23:45:12Z"
    },
    {
      item_id: "item_2b7e40c1a993",
      tier: "NEEDS_VERIFICATION",
      rationale: "Gibson Brands, Inc. owns active federal trademark registrations covering the headstock design and model name 'ES-335' [ev_gib_01]. Feature usage as an identifiable musical instrument is customary in motion picture production, but commercial endorsement must not be implied [ev_gib_02].",
      claims: [
        {
          text: "Gibson Brands holds active federal registrations for the ES-335 designation [ev_gib_01].",
          evidence_ids: ["ev_gib_01"],
          rule_ids: []
        }
      ],
      evidence_ids: ["ev_gib_01", "ev_gib_02"],
      rule_outcomes: [
        {
          rule_id: "TRADEMARK_NO_EXPIRY",
          applied_facts: { mark: "GIBSON ES-335", jurisdiction: "US" },
          outcome: "RIGHT_SUBSISTS",
          explanation: "Active trademark registration in class 015 (musical instruments).",
          missing_facts: [],
          public_domain_year: null,
          citation: "15 U.S.C. § 1051",
          evaluated_at: "2026-09-07T23:45:10Z"
        }
      ],
      open_questions: ["Will the guitar headstock and brand logo be framed in extreme close-up?"],
      dropped_claims: [],
      validated: true,
      rights_holder_hint: "Gibson Brands, Inc.",
      generated_at: "2026-09-07T23:45:12Z"
    },
    {
      item_id: "item_7a1d88e401b2",
      tier: "NEEDS_VERIFICATION",
      rationale: "Rolex is a protected luxury trademark owned by Rolex SA [ev_rol_01]. Incidental depiction in dialogue and pawn tag is permissible nominative reference provided the watch is depicted as authentic [ev_rol_02].",
      claims: [
        {
          text: "Rolex SA holds trademark registrations for the 'Submariner' mark [ev_rol_01].",
          evidence_ids: ["ev_rol_01"],
          rule_ids: []
        }
      ],
      evidence_ids: ["ev_rol_01", "ev_rol_02"],
      rule_outcomes: [],
      open_questions: ["Ensure character dialogue does not imply the timepiece is counterfeit."],
      dropped_claims: [],
      validated: true,
      rights_holder_hint: "Rolex SA",
      generated_at: "2026-09-07T23:45:12Z"
    },
    {
      item_id: "item_3d4f55a122ee",
      tier: "NEEDS_VERIFICATION",
      rationale: "Fictional character check for 'Ray Lindquist' identified three living entertainment individuals with similar names in California guild registries [ev_ray_01]. Missing facts prevent full collision clearance.",
      claims: [
        {
          text: "Screen Actors Guild and Producers Guild registries reflect active living members with analogous phonetic names [ev_ray_01].",
          evidence_ids: ["ev_ray_01"],
          rule_ids: []
        }
      ],
      evidence_ids: ["ev_ray_01"],
      rule_outcomes: [
        {
          rule_id: "NAME_COLLISION_DEFAMATION",
          applied_facts: { character_name: "Ray Lindquist", character_occupation: "PRODUCER" },
          outcome: "INSUFFICIENT_FACTS",
          explanation: "Cannot conclude risk is de minimis without verifying real-world counterpart's studio affiliation and specialty.",
          missing_facts: ["specific_studio_affiliation", "geographical_radius_of_practice"],
          public_domain_year: null,
          citation: "Restatement (Second) of Torts § 564",
          evaluated_at: "2026-09-07T23:45:10Z"
        }
      ],
      open_questions: ["Check if real producer Ray Lindquist has prior working relationship with screenplay author."],
      dropped_claims: [],
      validated: true,
      rights_holder_hint: null,
      generated_at: "2026-09-07T23:45:12Z"
    },
    {
      item_id: "item_4a6c77d89901",
      tier: "CLEAR_ON_RECORD",
      rationale: "Reference to the 'Clinton administration' is historical and political dialogue referencing a former public official's term in office [ev_pres_01]. Historical references to public figures and government administrations in fictional dialogue are protected speech under the First Amendment and do not trigger right of publicity or endorsement claims.",
      claims: [
        {
          text: "The reference is historical dialogue describing a past US presidency [ev_pres_01].",
          evidence_ids: ["ev_pres_01"],
          rule_ids: []
        },
        {
          text: "Historical and political references in dramatic dialogue do not violate right of publicity statutes.",
          evidence_ids: [],
          rule_ids: []
        }
      ],
      evidence_ids: ["ev_pres_01"],
      rule_outcomes: [
        {
          rule_id: "PUBLIC_FIGURE_HISTORICAL",
          applied_facts: { entity_type: "POLITICAL_ADMINISTRATION", context: "HISTORICAL_TIMELINE" },
          outcome: "NOT_APPLICABLE",
          explanation: "First Amendment doctrine protects non-defamatory historical and descriptive dialogue references.",
          missing_facts: [],
          public_domain_year: null,
          citation: "Guglielmi v. Spelling-Goldberg Productions, 25 Cal. 3d 860",
          evaluated_at: "2026-09-07T23:45:10Z"
        }
      ],
      open_questions: [],
      dropped_claims: [],
      validated: true,
      rights_holder_hint: null,
      generated_at: "2026-09-07T23:45:12Z"
    },
    {
      item_id: "item_9b2e33f4455a",
      tier: "CLEAR_ON_RECORD",
      rationale: "The Great Gatsby by F. Scott Fitzgerald was first published in 1925 [ev_gat_01]. Works published prior to January 1, 1926 in the United States entered the public domain on January 1, 2021 [US_LIFE_PLUS_70]. Visual prop appearance of the public domain novel is clear on record.",
      claims: [
        {
          text: "F. Scott Fitzgerald's novel was first published in 1925 [ev_gat_01].",
          evidence_ids: ["ev_gat_01"],
          rule_ids: []
        },
        {
          text: "Entered the US public domain on January 1, 2021 [US_LIFE_PLUS_70].",
          evidence_ids: [],
          rule_ids: ["US_LIFE_PLUS_70"]
        }
      ],
      evidence_ids: ["ev_gat_01"],
      rule_outcomes: [
        {
          rule_id: "US_LIFE_PLUS_70",
          applied_facts: { work_type: "LITERARY_WORK", publication_year: 1925 },
          outcome: "PUBLIC_DOMAIN",
          explanation: "Work published prior to 1926 entered the public domain on January 1, 2021 under Sonny Bono Copyright Term Extension Act schedule.",
          missing_facts: [],
          public_domain_year: 2021,
          citation: "17 U.S.C. § 304(b)",
          evaluated_at: "2026-09-07T23:45:10Z"
        }
      ],
      open_questions: [],
      dropped_claims: [],
      validated: true,
      rights_holder_hint: "Public Domain",
      generated_at: "2026-09-07T23:45:12Z"
    }
  ],
  evidence_store: {
    "ev_138654f495df": {
      evidence_id: "ev_138654f495df",
      item_id: "item_9f3c21a4b7de",
      source_url: "https://trademarks.justia.com/700/22/coca-70022406.html",
      source_title: "COCA-COLA Trademark of Coca-Cola Company, The - Registration 70022406",
      retrieved_at: "2026-09-07T23:41:55Z",
      snippet: "The trademark was filed with the USPTO under serial number 70022406. Current status is Registered and Renewed. The registrant is The Coca-Cola Company.",
      relevance_note: "Retrieved to establish registrant and active registration status."
    },
    "ev_27707629e060": {
      evidence_id: "ev_27707629e060",
      item_id: "item_9f3c21a4b7de",
      source_url: "https://www.inta.org/fact-sheets/fair-use-of-trademarks/",
      source_title: "INTA Fact Sheet: Nominative Fair Use in Media and Film",
      retrieved_at: "2026-09-07T23:42:01Z",
      snippet: "Nominative fair use permits incidental depiction of authentic commercial goods in fictional entertainment where the mark is used to identify the genuine product and no false endorsement is implied.",
      relevance_note: "Nominative fair use precedent for non-disparaging prop usage."
    },
    "ev_gib_01": {
      evidence_id: "ev_gib_01",
      item_id: "item_2b7e40c1a993",
      source_url: "https://uspto.report/TM/75689123",
      source_title: "USPTO Trademark: GIBSON ES-335 Musical Instruments",
      retrieved_at: "2026-09-07T23:42:15Z",
      snippet: "Gibson Brands, Inc. (Nashville, TN). Active registration in IC 015 for electric guitars.",
      relevance_note: "Registrant and product class verification."
    },
    "ev_gib_02": {
      evidence_id: "ev_gib_02",
      item_id: "item_2b7e40c1a993",
      source_url: "https://www.gibson.com/en-US/Electric-Guitar/1962-ES-335",
      source_title: "Gibson Custom Shop 1962 ES-335 Reissue Heritage Specification",
      retrieved_at: "2026-09-07T23:42:20Z",
      snippet: "Historical specifications for the 1962 thin-line semi-hollowbody model featuring dot inlay and cherry finish.",
      relevance_note: "Historical design verification."
    },
    "ev_rol_01": {
      evidence_id: "ev_rol_01",
      item_id: "item_7a1d88e401b2",
      source_url: "https://www.wipo.int/branddb/en/show.jsp?URN=ROLEX_SUBMARINER",
      source_title: "WIPO Global Brand Database: Rolex Submariner",
      retrieved_at: "2026-09-07T23:42:30Z",
      snippet: "International trademark registrations for Rolex SA (Geneva, Switzerland). Status active across worldwide territories.",
      relevance_note: "International registration and owner."
    },
    "ev_rol_02": {
      evidence_id: "ev_rol_02",
      item_id: "item_7a1d88e401b2",
      source_url: "https://caselaw.findlaw.com/us-9th-circuit/rolex-watch-usa-inc",
      source_title: "Rolex Watch U.S.A., Inc. Trademark Enforcement Precedent",
      retrieved_at: "2026-09-07T23:42:35Z",
      snippet: "Rolex actively enforces mark against counterfeit goods and unauthorized commercial association.",
      relevance_note: "Risk assessment on counterfeit depiction."
    },
    "ev_loc_01": {
      evidence_id: "ev_loc_01",
      item_id: "item_8c3b99f201e7",
      source_url: "https://www.chateaumarmont.com/legal-notice",
      source_title: "Chateau Marmont Official Legal and Trademark Notice",
      retrieved_at: "2026-09-07T23:43:05Z",
      snippet: "The name, architectural facade, and crest of Chateau Marmont are proprietary trademarks of Chateau Marmont LLC.",
      relevance_note: "Commercial property and architectural rights."
    },
    "ev_loc_02": {
      evidence_id: "ev_loc_02",
      item_id: "item_8c3b99f201e7",
      source_url: "https://filmla.com/filming-permits/location-agreements",
      source_title: "FilmLA Guidelines: Filming Historic Commercial Landmarks",
      retrieved_at: "2026-09-07T23:43:10Z",
      snippet: "Commercial properties depicted with disparaging or criminal context require dedicated location clearance to mitigate Lanham Act claims.",
      relevance_note: "Standard film production clearance protocol."
    },
    "ev_mus_01": {
      evidence_id: "ev_mus_01",
      item_id: "item_5e2d11a988cc",
      source_url: "https://www.loc.gov/programs/national-recording-preservation-board/about-this-program/laws/",
      source_title: "Library of Congress: Classics Protection and Access Act of 2018 (Title II MMA)",
      retrieved_at: "2026-09-07T23:43:40Z",
      snippet: "Pre-1972 sound recordings: Recordings first fixed between 1923 and 1946 receive federal statutory protection for 100 years from first publication. Sound recordings from 1927 remain protected through 2027.",
      relevance_note: "[sound recording right] Federal term schedule under 17 U.S.C. § 1401."
    },
    "ev_mus_02": {
      evidence_id: "ev_mus_02",
      item_id: "item_5e2d11a988cc",
      source_url: "https://cocatalog.loc.gov/cgi-bin/Pwebrecon.cgi?v1=1&ti=1,1&Search_Arg=Star%20Dust%20Hoagy%20Carmichael",
      source_title: "US Copyright Office Catalog of Copyright Entries: Star Dust",
      retrieved_at: "2026-09-07T23:43:45Z",
      snippet: "Composition registered 1927 by Hoagy Carmichael. Published with notice prior to 1928, composition entered public domain in 2023.",
      relevance_note: "[composition right] Catalog entry establishing initial registration."
    },
    "ev_ray_01": {
      evidence_id: "ev_ray_01",
      item_id: "item_3d4f55a122ee",
      source_url: "https://www.producersguild.org/member-directory",
      source_title: "Producers Guild of America Membership Directory Record",
      retrieved_at: "2026-09-07T23:44:00Z",
      snippet: "Directory listing reflects two active members registered with the surname Lindquist in Los Angeles county.",
      relevance_note: "Name collision risk analysis."
    },
    "ev_pres_01": {
      evidence_id: "ev_pres_01",
      item_id: "item_4a6c77d89901",
      source_url: "https://www.archives.gov/presidential-libraries",
      source_title: "National Archives: Historical Records of the Clinton Administration (1993-2001)",
      retrieved_at: "2026-09-07T23:44:10Z",
      snippet: "Archival timeline documenting the 42nd presidency from January 1993 to January 2001.",
      relevance_note: "Historical reference documentation."
    },
    "ev_gat_01": {
      evidence_id: "ev_gat_01",
      item_id: "item_9b2e33f4455a",
      source_url: "https://www.loc.gov/item/25008544/",
      source_title: "Library of Congress: The Great Gatsby, by F. Scott Fitzgerald (1925)",
      retrieved_at: "2026-09-07T23:44:20Z",
      snippet: "Published April 10, 1925 by Charles Scribner's Sons, New York. First edition registration.",
      relevance_note: "Publication year establishing public domain milestone."
    }
  },
  review_states: {
    "item_9f3c21a4b7de": {
      item_id: "item_9f3c21a4b7de",
      decision: "CONFIRMED",
      reviewer_note: "Nominative prop use in background, bottle label unaltered.",
      reviewer: "counsel@studiolegal.com",
      decided_at: "2026-09-07T23:50:10Z"
    },
    "item_4a6c77d89901": {
      item_id: "item_4a6c77d89901",
      decision: "CONFIRMED",
      reviewer_note: "Historical timeline dialogue reference. No release needed.",
      reviewer: "counsel@studiolegal.com",
      decided_at: "2026-09-07T23:51:00Z"
    },
    "item_9b2e33f4455a": {
      item_id: "item_9b2e33f4455a",
      decision: "CONFIRMED",
      reviewer_note: "1925 literary text is public domain. Prop placement cleared on record.",
      reviewer: "counsel@studiolegal.com",
      decided_at: "2026-09-07T23:52:00Z"
    }
    // Items 8c3b99f201e7, 5e2d11a988cc, 2b7e40c1a993, 7a1d88e401b2, 3d4f55a122ee are intentionally PENDING!
    // This allows testing the 409 Review Gate directly!
  }
};

export const MOCK_TRACE = {
  report_id: "rpt_f2d7778b40f2",
  entries: [
    {
      entry_id: "log_01",
      timestamp: "2026-09-07T23:39:12.100Z",
      report_id: "rpt_f2d7778b40f2",
      stage: "INGEST",
      tool: "parser.parse_screenplay",
      input_summary: "the_last_good_year.txt (6250 bytes)",
      output_summary: "Parsed 14 scenes across 6 pages with Fountain/Standard dialogue cues",
      latency_ms: 124.5,
      token_cost: null,
      task_cost: 0,
      level: "INFO",
      detail: { format: "txt", page_count: 6, scene_count: 14 }
    },
    {
      entry_id: "log_02",
      timestamp: "2026-09-07T23:39:15.300Z",
      report_id: "rpt_f2d7778b40f2",
      stage: "EXTRACT",
      tool: "extractor.extract_items_async",
      input_summary: "14 scenes scanned for brands, music, people, places, works",
      output_summary: "Extracted 23 candidate mentions across 7 categories",
      latency_ms: 3120.0,
      token_cost: 14200,
      task_cost: 1,
      level: "INFO",
      detail: { candidates: 23 }
    },
    {
      entry_id: "log_03",
      timestamp: "2026-09-07T23:39:19.400Z",
      report_id: "rpt_f2d7778b40f2",
      stage: "DEDUPLICATE",
      tool: "extractor.merge_variants",
      input_summary: "23 mentions evaluated for entity clustering",
      output_summary: "Merged 'Coke' -> 'Coca-Cola', 'Rolex' -> 'Rolex Submariner'",
      latency_ms: 450.2,
      token_cost: 3100,
      task_cost: 0,
      level: "INFO",
      detail: { clusters_formed: 4 }
    },
    {
      entry_id: "log_04",
      timestamp: "2026-09-07T23:39:24.117Z",
      report_id: "rpt_f2d7778b40f2",
      stage: "RESEARCH",
      tool: "parallel.search",
      input_summary: "COCA-COLA [BRAND_TRADEMARK]",
      output_summary: "8 evidence items from 10 verified sources",
      latency_ms: 1055.4,
      token_cost: null,
      task_cost: 1,
      level: "INFO",
      detail: { item_id: "item_9f3c21a4b7de", facts_sought: ["registrant", "status"] }
    },
    {
      entry_id: "log_05",
      timestamp: "2026-09-07T23:39:31.800Z",
      report_id: "rpt_f2d7778b40f2",
      stage: "RESEARCH",
      tool: "parallel.search",
      input_summary: "CHATEAU MARMONT [REAL_LOCATION_BUSINESS]",
      output_summary: "Identified trademark status and commercial property rights",
      latency_ms: 1420.1,
      token_cost: null,
      task_cost: 1,
      level: "INFO",
      detail: { item_id: "item_8c3b99f201e7" }
    },
    {
      entry_id: "log_06",
      timestamp: "2026-09-07T23:39:45.200Z",
      report_id: "rpt_f2d7778b40f2",
      stage: "RULES",
      tool: "rules_engine.apply_copyright_rules",
      input_summary: "Evaluated 23 items against statutory term arithmetic (Title 17 & MMA)",
      output_summary: "Applied US_SOUND_RECORDING_MMA, US_MUSICAL_COMPOSITION_PRE1978, TRADEMARK_NO_EXPIRY",
      latency_ms: 85.0,
      token_cost: null,
      task_cost: 0,
      level: "INFO",
      detail: { deterministic_evaluations: 12 }
    },
    {
      entry_id: "log_07",
      timestamp: "2026-09-07T23:39:52.400Z",
      report_id: "rpt_f2d7778b40f2",
      stage: "VALIDATE",
      tool: "validation.citations.validate_findings",
      input_summary: "Cross-checked all inline tokens against evidence store and rule engine",
      output_summary: "3 uncited rationale claims stripped; 0 unresolvable tokens",
      latency_ms: 310.6,
      token_cost: null,
      task_cost: 0,
      level: "WARNING",
      detail: { dropped_claims_count: 3, rule: "strict_evidence_citation" }
    }
  ],
  totals: {
    entries: 7,
    warnings: 1,
    errors: 0,
    safety_blocks: 0,
    total_latency_ms: 6565.8,
    total_tokens: 17300,
    total_parallel_tasks: 2
  }
};
