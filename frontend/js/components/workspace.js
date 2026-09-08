/**
 * Counsel Review & Triage Workspace Component
 * Dual-pane workstation: Item Matrix on left, Deep Review Inspector on right.
 */
import { store } from "../store.js";

export function renderWorkspace(container) {
  const { currentReport, selectedItemId, searchQuery, tierFilter, categoryFilter, decisionFilter } = store.state;

  if (!currentReport) {
    container.innerHTML = `
      <div class="h-full flex items-center justify-center p-8 text-center">
        <div>
          <h2 class="text-lg font-bold text-white mb-2">No Screenplay Loaded</h2>
          <p class="text-sm text-slate-400 mb-4">Please return to the dashboard or upload a script.</p>
          <button id="wsGoDashboard" class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold">
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

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchMention = item.mention_text.toLowerCase().includes(q);
      const matchNorm = (item.normalized_name || "").toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      if (!matchMention && !matchNorm && !matchCat) return false;
    }

    // Tier filter
    if (tierFilter !== "ALL" && finding?.tier !== tierFilter) return false;

    // Category filter
    if (categoryFilter !== "ALL" && item.category !== categoryFilter) return false;

    // Decision filter
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
  const isAllDecided = pendingCount === 0;

  // Selected item occurrences, sources, rules
  const occurrences = selectedItem?.occurrences || [];
  const evidenceList = selectedItem
    ? Object.values(currentReport.evidence_store).filter(e => e.item_id === selectedItem.item_id)
    : [];
  const ruleOutcomes = selectedFinding?.rule_outcomes || [];
  const currentDecision = selectedItem ? store.getItemDecision(selectedItem.item_id) : "PENDING";
  const currentNote = selectedItem ? (currentReport.review_states?.[selectedItem.item_id]?.reviewer_note || "") : "";

  // Helper for rendering claims with interactive citation tokens
  function renderClaimsWithCitations(claims) {
    if (!claims || claims.length === 0) {
      return `<p class="text-sm text-slate-400 italic">No citable rationale survived backend validation.</p>`;
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

        return `<p class="text-sm leading-relaxed text-slate-200 mb-2">${textWithChips}</p>`;
      })
      .join("");
  }

  container.innerHTML = `
    <div class="h-[calc(100vh-57px)] flex overflow-hidden">
      <!-- Left Pane: Item Matrix & Triage List (380px) -->
      <div class="w-96 flex-shrink-0 flex flex-col border-r border-slate-800 bg-slate-950/60">
        <!-- Matrix Top Bar -->
        <div class="p-4 border-b border-slate-800 bg-slate-900/40">
          <div class="flex items-center justify-between mb-3">
            <div>
              <h2 class="text-sm font-bold text-white tracking-tight">${currentReport.script_name}</h2>
              <div class="text-[11px] text-slate-400 mt-0.5">
                ${totalCount} items · <b class="${isAllDecided ? "text-emerald-400" : "text-amber-400"}">${reviewedCount}/${totalCount} decided</b>
              </div>
            </div>
            <button id="wsBtnExport" class="px-3 py-1.5 rounded-lg ${
              isAllDecided
                ? "bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/30 text-white font-semibold"
                : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium"
            } text-xs flex items-center gap-1.5 transition-all">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              Export Log
            </button>
          </div>

          <!-- Search Input -->
          <div class="relative mb-2.5">
            <input type="text" id="wsSearchInput" placeholder="Filter items, categories, scenes..." value="${escapeHtml(searchQuery)}"
              class="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 text-white rounded-lg pl-8 pr-3 py-1.5 text-xs placeholder:text-slate-500 transition-all outline-none">
            <svg class="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>

          <!-- Tier Quick Filters -->
          <div class="flex items-center gap-1">
            <button class="filter-tier px-2 py-1 rounded text-[11px] font-medium transition-all ${
              tierFilter === "ALL" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
            }" data-tier="ALL">All</button>
            <button class="filter-tier px-2 py-1 rounded text-[11px] font-medium transition-all ${
              tierFilter === "ESCALATE" ? "bg-rose-500/20 text-rose-300 border border-rose-500/40" : "text-slate-400 hover:text-rose-300"
            }" data-tier="ESCALATE">Escalate</button>
            <button class="filter-tier px-2 py-1 rounded text-[11px] font-medium transition-all ${
              tierFilter === "NEEDS_VERIFICATION" ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "text-slate-400 hover:text-amber-300"
            }" data-tier="NEEDS_VERIFICATION">Needs verify</button>
            <button class="filter-tier px-2 py-1 rounded text-[11px] font-medium transition-all ${
              tierFilter === "CLEAR_ON_RECORD" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "text-slate-400 hover:text-emerald-300"
            }" data-tier="CLEAR_ON_RECORD">Clear on record</button>
          </div>
        </div>

        <!-- Scrollable Item List -->
        <div class="flex-1 overflow-y-auto divide-y divide-slate-800/60" id="itemList">
          ${
            filteredItems.length === 0
              ? `<div class="p-8 text-center text-xs text-slate-500">No items match the current filters.</div>`
              : filteredItems
                  .map(item => {
                    const finding = currentReport.findings.find(f => f.item_id === item.item_id);
                    const decision = store.getItemDecision(item.item_id);
                    const isSelected = selectedItem?.item_id === item.item_id;
                    const tier = finding?.tier || "NEEDS_VERIFICATION";
                    const pageNums = item.occurrences.map(o => o.page_number).filter((v, i, a) => a.indexOf(v) === i);

                    return `
              <div class="p-3 cursor-pointer transition-all item-row ${
                isSelected
                  ? "bg-slate-800/90 border-l-4 border-blue-500 pl-2.5 shadow-sm"
                  : "hover:bg-slate-900/60"
              }" data-id="${item.item_id}">
                <div class="flex items-center justify-between gap-2 mb-1">
                  <span class="font-semibold text-xs text-white truncate max-w-[200px]" title="${escapeHtml(item.mention_text)}">
                    ${escapeHtml(item.mention_text)}
                  </span>
                  <span class="px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase badge-${tier}">
                    ${tier.replace(/_/g, " ")}
                  </span>
                </div>
                <div class="flex items-center justify-between text-[11px] text-slate-400">
                  <span class="truncate max-w-[170px]">${item.category.replace(/_/g, " ").toLowerCase()} · p.${pageNums.join(", ")}</span>
                  <span class="px-1.5 py-0.5 rounded-full text-[9.5px] font-mono uppercase font-semibold border ${
                    decision !== "PENDING" ? "decision-" + decision : "text-slate-500 border-slate-800"
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
        <div class="p-2.5 border-t border-slate-800 bg-slate-950 text-[10.5px] text-slate-500 flex items-center justify-between">
          <span>Hotkeys:</span>
          <span class="flex items-center gap-1">
            <span class="kbd-chip">C</span> Confirm
            <span class="kbd-chip">R</span> Reject
            <span class="kbd-chip">E</span> Escalate
            <span class="kbd-chip">J/K</span> Nav
          </span>
        </div>
      </div>

      <!-- Right Pane: Deep Review Inspector -->
      <div class="flex-1 flex flex-col overflow-hidden bg-slate-950">
        ${
          !selectedItem
            ? `
          <div class="h-full flex items-center justify-center text-slate-500 text-sm">
            Select an item from the matrix to inspect clearance research.
          </div>
        `
            : `
          <!-- Inspector Top Header & Review Decision Bar -->
          <div class="p-5 border-b border-slate-800 bg-slate-900/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-3">
                <h1 class="text-xl font-bold text-white tracking-tight">${escapeHtml(selectedItem.mention_text)}</h1>
                <span class="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide badge-${selectedFinding?.tier}">
                  ${selectedFinding?.tier.replace(/_/g, " ")}
                </span>
                <span class="text-xs text-slate-400 font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                  ${selectedItem.category.replace(/_/g, " ").toLowerCase()}
                </span>
              </div>
              <div class="text-xs text-slate-400 mt-1 flex items-center gap-3">
                ${
                  selectedItem.normalized_name &&
                  selectedItem.normalized_name.toLowerCase() !== selectedItem.mention_text.toLowerCase()
                    ? `<span>Resolved entity: <b class="text-slate-200">${escapeHtml(selectedItem.normalized_name)}</b></span>`
                    : ""
                }
                ${
                  selectedItem.variants?.length
                    ? `<span>Also appears as: <i class="text-slate-300">${selectedItem.variants.map(escapeHtml).join(", ")}</i></span>`
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
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xs text-slate-400 mr-1">Decision:</span>
              <button class="btn-decide px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentDecision === "CONFIRMED"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                  : "bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700"
              }" data-decision="CONFIRMED">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Confirm
              </button>

              <button class="btn-decide px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentDecision === "REJECTED"
                  ? "bg-slate-600 text-white shadow-md"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              }" data-decision="REJECTED">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                Reject
              </button>

              <button class="btn-decide px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentDecision === "ESCALATED"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                  : "bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700"
              }" data-decision="ESCALATED">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                Escalate
              </button>

              ${
                currentDecision !== "PENDING"
                  ? `
                <button class="btn-decide px-2.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800" data-decision="PENDING" title="Reset to Pending">
                  Reset
                </button>
              `
                  : ""
              }
            </div>
          </div>

          <!-- Counsel Note Row -->
          <div class="px-5 py-2.5 bg-slate-900/30 border-b border-slate-800/80 flex items-center gap-3">
            <label for="reviewerNoteInput" class="text-xs text-slate-400 flex items-center gap-1 whitespace-nowrap">
              <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              Counsel Note:
            </label>
            <input type="text" id="reviewerNoteInput" placeholder="Add rationale or instructions for production legal binder (optional)..."
              value="${escapeHtml(currentNote)}"
              class="flex-1 bg-slate-950 border border-slate-800 focus:border-blue-500 text-white rounded px-3 py-1 text-xs outline-none transition-all">
          </div>

          <!-- Inspector Scrollable Body -->
          <div class="flex-1 overflow-y-auto p-6 space-y-6">
            <!-- 1. Script Occurrences -->
            <div>
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                Screenplay Occurrences (${occurrences.length})
              </h3>
              <div class="rounded-xl border border-slate-800 overflow-hidden bg-slate-900/40">
                <table class="w-full text-left text-xs">
                  <thead class="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th class="py-2.5 px-3 font-semibold">Scene</th>
                      <th class="py-2.5 px-3 font-semibold">Page</th>
                      <th class="py-2.5 px-3 font-semibold">On-Screen</th>
                      <th class="py-2.5 px-3 font-semibold">Depiction</th>
                      <th class="py-2.5 px-3 font-semibold">Context Snippet</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-800/60">
                    ${occurrences
                      .map(
                        occ => `
                      <tr class="hover:bg-slate-800/30">
                        <td class="py-2.5 px-3 font-mono text-slate-300">Sc. ${occ.scene_number}</td>
                        <td class="py-2.5 px-3 font-mono font-bold text-blue-400">p. ${occ.page_number}</td>
                        <td class="py-2.5 px-3">
                          <span class="px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                            occ.on_screen ? "bg-indigo-500/20 text-indigo-300" : "bg-slate-800 text-slate-400"
                          }">
                            ${occ.on_screen ? "Visual Prop" : "Dialogue only"}
                          </span>
                        </td>
                        <td class="py-2.5 px-3">
                          <span class="px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                            occ.depiction_nature === "NEGATIVE"
                              ? "bg-rose-500/20 text-rose-300"
                              : occ.depiction_nature === "POSITIVE"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-slate-800 text-slate-400"
                          }">
                            ${occ.depiction_nature.toLowerCase()}
                          </span>
                        </td>
                        <td class="py-2.5 px-3 text-slate-300 leading-relaxed font-sans max-w-lg">
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
            <div>
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Synthesized Assessment &amp; Citations
              </h3>
              <div class="p-4 rounded-xl border border-slate-800 bg-slate-900/60 shadow-sm">
                ${renderClaimsWithCitations(selectedFinding?.claims)}
              </div>
            </div>

            <!-- 3. Music Dual-Rights Comparison (if Music) -->
            ${
              selectedItem.category === "MUSIC" || ruleOutcomes.length >= 2
                ? `
              <div>
                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
                  Music Dual-Rights Analysis (Independent Evaluation)
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  ${ruleOutcomes
                    .map(r => {
                      const isPD = r.outcome === "PUBLIC_DOMAIN";
                      return `
                    <div class="p-4 rounded-xl border ${
                      isPD ? "border-emerald-500/30 bg-emerald-950/20" : "border-rose-500/30 bg-rose-950/20"
                    }">
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-xs font-mono font-bold text-white">${r.rule_id}</span>
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          isPD ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
                        }">${r.outcome}</span>
                      </div>
                      <div class="text-xs text-slate-300 leading-relaxed mb-3">${escapeHtml(r.explanation)}</div>
                      <div class="text-[11px] text-slate-400 font-mono border-t border-slate-800/80 pt-2 flex items-center justify-between">
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
              selectedItem.category !== "MUSIC" && ruleOutcomes.length > 0
                ? `
              <div>
                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                  Deterministic Rule Outcomes (Python Arithmetic)
                </h3>
                <div class="space-y-3">
                  ${ruleOutcomes
                    .map(r => {
                      const isInsuf = r.outcome === "INSUFFICIENT_FACTS";
                      return `
                    <div class="p-3.5 rounded-xl border border-slate-800 bg-slate-900/50 border-l-4 border-l-purple-500">
                      <div class="flex items-center justify-between mb-1">
                        <span class="text-xs font-bold text-white font-mono">${r.rule_id}</span>
                        <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          isInsuf
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                            : "bg-slate-800 text-slate-300"
                        }">
                          ${r.outcome}
                        </span>
                      </div>
                      <p class="text-xs text-slate-300 leading-relaxed">${escapeHtml(r.explanation)}</p>
                      ${
                        r.missing_facts?.length
                          ? `
                        <div class="mt-2.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300">
                          <b>Actionable Research Task:</b> Missing required fact(s): <code>${r.missing_facts.join(", ")}</code>
                        </div>
                      `
                          : ""
                      }
                      ${r.citation ? `<div class="mt-2 text-[11px] text-slate-400 font-mono">${escapeHtml(r.citation)}</div>` : ""}
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
              <div>
                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Counsel Clearance Inquiries
                </h3>
                <div class="p-4 rounded-xl border border-slate-800 bg-slate-900/50">
                  <ul class="space-y-2 text-xs text-slate-300 list-disc list-inside">
                    ${selectedFinding.open_questions.map(q => `<li>${escapeHtml(q)}</li>`).join("")}
                  </ul>
                </div>
              </div>
            `
                : ""
            }

            <!-- 6. Verified Evidence Sources -->
            <div>
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                Evidence Vault (${evidenceList.length} sources)
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3" id="evidenceCardsContainer">
                ${
                  evidenceList.length === 0
                    ? `<div class="col-span-2 p-4 rounded-xl border border-rose-500/30 bg-rose-950/20 text-xs text-rose-300">
                        No sources retrieved. This item has not been researched.
                      </div>`
                    : evidenceList
                        .map(
                          ev => `
                      <div class="p-3.5 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-slate-700 transition-all flex flex-col justify-between" id="card-${ev.evidence_id}">
                        <div>
                          <div class="flex items-center justify-between gap-2 mb-1.5">
                            <span class="text-[11px] font-mono text-blue-400 font-semibold truncate">${ev.evidence_id}</span>
                            <span class="text-[10px] text-slate-500 font-mono">Retrieved ${ev.retrieved_at ? ev.retrieved_at.slice(0, 10) : "N/A"}</span>
                          </div>
                          <a href="${escapeHtml(ev.source_url)}" target="_blank" rel="noopener" class="text-xs font-semibold text-white hover:text-blue-400 transition-colors line-clamp-1 mb-1">
                            ${escapeHtml(ev.source_title || ev.source_url)}
                          </a>
                          <p class="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-2">${escapeHtml(ev.snippet)}</p>
                        </div>
                        <div class="text-[10px] text-slate-500 border-t border-slate-800/80 pt-2 truncate font-mono">
                          ${escapeHtml(ev.relevance_note || "Source reference")}
                        </div>
                      </div>
                    `
                        )
                        .join("")
                }
              </div>
            </div>

            <!-- 7. Dropped Claims Disclosure (Validation Transparency) -->
            ${
              selectedFinding?.dropped_claims?.length
                ? `
              <details class="rounded-xl border border-slate-800 bg-slate-900/30 p-3.5 text-xs text-slate-400">
                <summary class="cursor-pointer font-medium text-slate-300 hover:text-white flex items-center justify-between">
                  <span>${selectedFinding.dropped_claims.length} claim(s) stripped in backend validation</span>
                  <span class="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800">Guardrail Audit</span>
                </summary>
                <div class="mt-3 pt-3 border-t border-slate-800 space-y-1.5 text-slate-400 italic">
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
  // 1. Search filter input
  const searchInput = container.querySelector("#wsSearchInput");
  if (searchInput) {
    searchInput.oninput = e => {
      store.setState({ searchQuery: e.target.value });
    };
  }

  // 2. Tier filter buttons
  container.querySelectorAll(".filter-tier").forEach(btn => {
    btn.onclick = () => {
      store.setState({ tierFilter: btn.dataset.tier });
    };
  });

  // 3. Item row clicks
  container.querySelectorAll(".item-row").forEach(row => {
    row.onclick = () => {
      store.selectItem(row.dataset.id);
    };
  });

  // 4. Decision buttons
  container.querySelectorAll(".btn-decide").forEach(btn => {
    btn.onclick = () => {
      const decision = btn.dataset.decision;
      const noteInput = container.querySelector("#reviewerNoteInput");
      const note = noteInput ? noteInput.value : "";
      store.decideCurrentItem(decision, note);
    };
  });

  // 5. Reviewer note change
  const noteInput = container.querySelector("#reviewerNoteInput");
  if (noteInput) {
    noteInput.onchange = e => {
      const currentDec = store.getItemDecision(selectedItem.item_id);
      store.decideCurrentItem(currentDec, e.target.value);
    };
  }

  // 6. Export button
  const exportBtn = container.querySelector("#wsBtnExport");
  if (exportBtn) {
    exportBtn.onclick = () => {
      store.export();
    };
  }

  // 7. Citation clicks -> Scroll to evidence card or highlight
  container.querySelectorAll(".cite-token").forEach(chip => {
    chip.onclick = () => {
      const evId = chip.dataset.evId;
      if (evId) {
        const card = container.querySelector(`#card-${evId}`);
        if (card) {
          card.scrollIntoView({ behavior: "smooth", block: "center" });
          card.classList.add("ring-2", "ring-blue-500");
          setTimeout(() => card.classList.remove("ring-2", "ring-blue-500"), 2000);
        }
      }
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
  return escaped.replace(regex, `<mark class="bg-blue-500/30 text-blue-200 px-1 rounded font-semibold">$1</mark>`);
}

function escapeRegex(string) {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
}
