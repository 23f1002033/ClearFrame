/**
 * Production Clearance Dashboard Component
 * Displays multi-script portfolio overview, triage meters, and script cards.
 */
import { store } from "../store.js";

export function renderDashboard(container) {
  const { reports, demoMode } = store.state;

  // Compute aggregate stats across reports
  const totalReports = reports.length;
  const totalItems = reports.reduce((acc, r) => acc + (r.items || 0), 0);
  const totalEscalations = reports.reduce((acc, r) => acc + (r.tier_counts?.ESCALATE || 0), 0);
  const signedOffCount = reports.filter(r => r.status === "SIGNED_OFF").length;

  container.innerHTML = `
    <div class="h-full overflow-y-auto p-8 max-w-7xl mx-auto">
      <!-- Welcome & Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-2xl font-bold text-white tracking-tight">Production Clearance Dashboard</h1>
          <p class="text-sm text-slate-400 mt-1">
            Active screenplays, counsel review workflows, and statutory clearance logs.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button id="dashBtnUpload" class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-md shadow-blue-600/25 flex items-center gap-2 transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            Upload Screenplay
          </button>
          <button id="dashBtnDemo" class="px-3.5 py-2 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-800 text-slate-200 text-sm font-medium transition-all">
            Load Sample Script
          </button>
        </div>
      </div>

      <!-- Aggregate Metric Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm">
          <div class="text-xs font-medium text-slate-400 uppercase tracking-wider">Screenplays</div>
          <div class="text-2xl font-bold text-white mt-1">${totalReports}</div>
          <div class="text-xs text-slate-500 mt-1">Under legal triage</div>
        </div>
        <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm">
          <div class="text-xs font-medium text-slate-400 uppercase tracking-wider">Clearance Items</div>
          <div class="text-2xl font-bold text-white mt-1">${totalItems}</div>
          <div class="text-xs text-slate-500 mt-1">Extracted &amp; researched</div>
        </div>
        <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm">
          <div class="text-xs font-medium text-rose-400 uppercase tracking-wider">Escalate Required</div>
          <div class="text-2xl font-bold text-rose-400 mt-1">${totalEscalations}</div>
          <div class="text-xs text-slate-500 mt-1">Priority counsel attention</div>
        </div>
        <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm">
          <div class="text-xs font-medium text-emerald-400 uppercase tracking-wider">Signed-Off Logs</div>
          <div class="text-2xl font-bold text-emerald-400 mt-1">${signedOffCount}</div>
          <div class="text-xs text-slate-500 mt-1">Ready for production export</div>
        </div>
      </div>

      <!-- Screenplay Portfolio List -->
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-white tracking-tight">Active Projects</h2>
        <span class="text-xs text-slate-400">${reports.length} report(s) found</span>
      </div>

      ${
        reports.length === 0
          ? `
        <div class="text-center py-16 px-4 rounded-2xl border border-dashed border-slate-800 bg-slate-950/40">
          <div class="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <h3 class="text-base font-semibold text-white">No clearance reports loaded</h3>
          <p class="text-sm text-slate-400 max-w-md mx-auto mt-1 mb-6">
            Upload a .pdf, .txt, or .fountain screenplay to run multi-agent extraction, deep research, and copyright arithmetic.
          </p>
          <div class="flex items-center justify-center gap-3">
            <button id="emptyUploadBtn" class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-md transition-all">
              Upload Script
            </button>
            <button id="emptyDemoBtn" class="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-all">
              Load Sample Script (The Last Good Year)
            </button>
          </div>
        </div>
      `
          : `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${reports
            .map(r => {
              const total = r.items || 0;
              const pending = r.pending !== undefined ? r.pending : total;
              const reviewed = total - pending;
              const percentReviewed = total > 0 ? Math.round((reviewed / total) * 100) : 0;
              const escCount = r.tier_counts?.ESCALATE || 0;
              const verCount = r.tier_counts?.NEEDS_VERIFICATION || 0;
              const clrCount = r.tier_counts?.CLEAR_ON_RECORD || 0;
              const isSignedOff = r.status === "SIGNED_OFF";

              return `
            <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md">
              <div>
                <div class="flex items-start justify-between gap-3 mb-2">
                  <h3 class="text-base font-bold text-white group-hover:text-blue-400 transition-colors cursor-pointer card-title" data-id="${r.report_id}">
                    ${r.script_name}
                  </h3>
                  <span class="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase ${
                    isSignedOff
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-slate-800 text-slate-300 border border-slate-700"
                  }">
                    ${r.status}
                  </span>
                </div>
                
                <div class="text-xs text-slate-400 mb-4 font-mono">
                  ${r.report_id} · ${r.created_at ? new Date(r.created_at).toLocaleDateString() : "Just now"}
                </div>

                <!-- Review Completion Progress -->
                <div class="mb-4">
                  <div class="flex items-center justify-between text-xs mb-1.5">
                    <span class="text-slate-400">Review Progress</span>
                    <span class="font-medium text-white">${reviewed}/${total} decided (${percentReviewed}%)</span>
                  </div>
                  <div class="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500" style="width: ${percentReviewed}%"></div>
                  </div>
                </div>

                <!-- Tier Breakdown Pills -->
                <div class="flex items-center gap-1.5 flex-wrap mb-4">
                  <span class="px-2 py-0.5 rounded text-[11px] font-medium badge-ESCALATE">
                    ${escCount} Escalate
                  </span>
                  <span class="px-2 py-0.5 rounded text-[11px] font-medium badge-NEEDS_VERIFICATION">
                    ${verCount} Needs verify
                  </span>
                  <span class="px-2 py-0.5 rounded text-[11px] font-medium badge-CLEAR_ON_RECORD">
                    ${clrCount} Clear on record
                  </span>
                </div>
              </div>

              <!-- Card Actions -->
              <div class="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button class="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 btn-open-report" data-id="${r.report_id}">
                  Open Workspace
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>

                <div class="flex items-center gap-2">
                  <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 font-mono">
                    ${r.pipeline_state}
                  </span>
                </div>
              </div>
            </div>
          `;
            })
            .join("")}
        </div>
      `
      }
    </div>
  `;

  // Attach event handlers
  const handleOpen = reportId => {
    store.loadReport(reportId);
  };

  container.querySelectorAll(".card-title, .btn-open-report").forEach(el => {
    el.onclick = () => handleOpen(el.dataset.id);
  });

  const uploadBtn = container.querySelector("#dashBtnUpload");
  if (uploadBtn) uploadBtn.onclick = () => store.setState({ uploadModalOpen: true });

  const demoBtn = container.querySelector("#dashBtnDemo");
  if (demoBtn) demoBtn.onclick = () => store.loadDemoReport();

  const emptyUpload = container.querySelector("#emptyUploadBtn");
  if (emptyUpload) emptyUpload.onclick = () => store.setState({ uploadModalOpen: true });

  const emptyDemo = container.querySelector("#emptyDemoBtn");
  if (emptyDemo) emptyDemo.onclick = () => store.loadDemoReport();
}
