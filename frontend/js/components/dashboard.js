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
    <div class="h-full overflow-y-auto p-10 max-w-7xl mx-auto">
      <!-- Welcome & Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 class="text-3xl font-bold text-white tracking-tight">Production Clearance Dashboard</h1>
          <p class="text-sm text-gray-400 mt-2">
            Active screenplays, counsel review workflows, and statutory clearance logs.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button id="dashBtnUpload" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-md shadow-blue-600/25 flex items-center gap-2 transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            Upload Screenplay
          </button>
          <button id="dashBtnDemo" class="px-4 py-2.5 rounded-xl border border-gray-600 hover:border-gray-500 bg-gray-800 text-gray-200 text-sm font-medium transition-all">
            Load Sample Script
          </button>
        </div>
      </div>

      <!-- Aggregate Metric Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div class="p-6 rounded-2xl bg-gray-800/80 border border-gray-700/60">
          <div class="text-sm font-medium text-gray-400 uppercase tracking-wider">Screenplays</div>
          <div class="text-3xl font-bold text-white mt-2">${totalReports}</div>
          <div class="text-sm text-gray-500 mt-1">Under legal triage</div>
        </div>
        <div class="p-6 rounded-2xl bg-gray-800/80 border border-gray-700/60">
          <div class="text-sm font-medium text-gray-400 uppercase tracking-wider">Clearance Items</div>
          <div class="text-3xl font-bold text-white mt-2">${totalItems}</div>
          <div class="text-sm text-gray-500 mt-1">Extracted &amp; researched</div>
        </div>
        <div class="p-6 rounded-2xl bg-gray-800/80 border border-gray-700/60">
          <div class="text-sm font-medium text-red-400 uppercase tracking-wider">Escalate Required</div>
          <div class="text-3xl font-bold text-red-400 mt-2">${totalEscalations}</div>
          <div class="text-sm text-gray-500 mt-1">Priority counsel attention</div>
        </div>
        <div class="p-6 rounded-2xl bg-gray-800/80 border border-gray-700/60">
          <div class="text-sm font-medium text-emerald-400 uppercase tracking-wider">Signed-Off Logs</div>
          <div class="text-3xl font-bold text-emerald-400 mt-2">${signedOffCount}</div>
          <div class="text-sm text-gray-500 mt-1">Ready for production export</div>
        </div>
      </div>

      <!-- Screenplay Portfolio List -->
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-xl font-semibold text-white tracking-tight">Active Projects</h2>
        <span class="text-sm text-gray-400">${reports.length === 1 ? "1 report" : `${reports.length} reports`}</span>
      </div>

      ${
        reports.length === 0
          ? `
        <div class="text-center py-20 px-6 rounded-2xl border-2 border-dashed border-gray-700 bg-gray-800/30">
          <div class="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <h3 class="text-xl font-semibold text-white">No clearance reports loaded</h3>
          <p class="text-base text-gray-400 max-w-md mx-auto mt-2 mb-8">
            Upload a .pdf, .txt, or .fountain screenplay to run multi-agent extraction, deep research, and copyright arithmetic.
          </p>
          <div class="flex items-center justify-center gap-4">
            <button id="emptyUploadBtn" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-md transition-all">
              Upload Script
            </button>
            <button id="emptyDemoBtn" class="px-5 py-2.5 rounded-xl border border-gray-600 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-medium transition-all">
              Load Sample Script
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
            <div class="p-6 rounded-2xl bg-gray-800/80 border border-gray-700/60 border-l-4 border-l-blue-500 hover:border-gray-600 transition-all flex flex-col justify-between group shadow-sm hover:shadow-lg">
              <div>
                <div class="flex items-start justify-between gap-3 mb-3">
                  <h3 class="text-lg font-bold text-white group-hover:text-blue-400 transition-colors cursor-pointer card-title" data-id="${r.report_id}">
                    ${r.script_name}
                  </h3>
                  <span class="px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide uppercase ${
                    isSignedOff
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25"
                      : "bg-gray-700 text-gray-300 border border-gray-600"
                  }">
                    ${r.status}
                  </span>
                </div>
                
                <div class="text-sm text-gray-400 mb-5 font-mono">
                  ${r.report_id} · ${r.created_at ? new Date(r.created_at).toLocaleDateString() : "Just now"}
                </div>

                <!-- Review Completion Progress -->
                <div class="mb-5">
                  <div class="flex items-center justify-between text-sm mb-2">
                    <span class="text-gray-400">Review Progress</span>
                    <span class="font-medium text-white">${reviewed}/${total} decided (${percentReviewed}%)</span>
                  </div>
                  <div class="w-full h-2.5 rounded-full bg-gray-700 overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500" style="width: ${percentReviewed}%"></div>
                  </div>
                </div>

                <!-- Tier Breakdown Pills -->
                <div class="flex items-center gap-2 flex-wrap mb-5">
                  <span class="px-2.5 py-1 rounded-lg text-xs font-medium badge-ESCALATE">
                    ${escCount} Escalate
                  </span>
                  <span class="px-2.5 py-1 rounded-lg text-xs font-medium badge-NEEDS_VERIFICATION">
                    ${verCount} Needs verify
                  </span>
                  <span class="px-2.5 py-1 rounded-lg text-xs font-medium badge-CLEAR_ON_RECORD">
                    ${clrCount} Clear on record
                  </span>
                </div>
              </div>

              <!-- Card Actions -->
              <div class="pt-5 border-t border-gray-700/60 flex items-center justify-between">
                <button class="text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-2 btn-open-report" data-id="${r.report_id}">
                  Open Workspace
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>

                <div class="flex items-center gap-2">
                  <span class="text-xs px-2.5 py-1 rounded-lg bg-gray-700/80 text-gray-400 font-mono">
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
