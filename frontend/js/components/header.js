/**
 * Global Header Component
 * Contains branding and top-level navigation.
 */
import { store } from "../store.js";

export function renderHeader(container) {
  const { health, disclaimer, view, currentReport, demoMode } = store.state;
  const pendingCount = store.getPendingCount();
  const totalCount = currentReport ? currentReport.items.length : 0;
  const reviewedCount = totalCount - pendingCount;

  container.innerHTML = `
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-700/60 bg-gray-900/95 backdrop-blur-lg">
      <!-- Left: Logo & Navigation Tabs -->
      <div class="flex items-center gap-8">
        <div class="flex items-center gap-3 cursor-pointer" id="navBrand">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/25 text-sm">
            CF
          </div>
          <div>
            <span class="font-bold text-base tracking-tight text-white">ClearFrame</span>
            <div class="text-sm text-gray-400">Legal Clearance &amp; Triage</div>
          </div>
        </div>

        <nav class="flex items-center gap-1 bg-gray-800/80 p-1.5 rounded-xl border border-gray-700/60">
          <button id="tabDashboard" class="px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            view === "dashboard" ? "bg-blue-600 text-white shadow-sm" : "text-gray-400 hover:text-white"
          }">
            Dashboard
          </button>
          <button id="tabWorkspace" ${!currentReport ? "disabled" : ""} class="px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            view === "workspace" ? "bg-blue-600 text-white shadow-sm" : "text-gray-400 hover:text-white disabled:opacity-40 disabled:hover:text-gray-400"
          }">
            Review Workspace ${currentReport ? `<span class="ml-1.5 px-2 py-0.5 rounded-full text-xs ${pendingCount === 0 ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}">${reviewedCount}/${totalCount}</span>` : ""}
          </button>
          <button id="tabTrace" ${!currentReport ? "disabled" : ""} class="px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            view === "trace" ? "bg-blue-600 text-white shadow-sm" : "text-gray-400 hover:text-white disabled:opacity-40 disabled:hover:text-gray-400"
          }">
            Agent Audit Trace
          </button>
        </nav>
      </div>

      <!-- Right: Action Controls -->
      <div class="flex items-center gap-3">
        <!-- Demo Mode Quick Loader -->
        <button id="btnDemoPreset" class="px-3 py-2 rounded-lg border border-blue-500/30 bg-blue-950/30 hover:bg-blue-900/50 text-blue-300 text-sm font-medium flex items-center gap-2 transition-all">
          <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          ${demoMode ? "Reset Demo" : "Load Demo"}
        </button>

        <!-- Tour Guide Button -->
        <button id="btnStartTour" class="px-3 py-2 rounded-lg border border-gray-600 hover:border-gray-500 bg-gray-800 text-gray-200 text-sm font-medium flex items-center gap-2 transition-all">
          <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Tour
        </button>

        <!-- New Script Upload Button -->
        <button id="btnOpenUpload" class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-md shadow-blue-600/25 flex items-center gap-2 transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
          New Script
        </button>
      </div>
    </div>
  `;

  // Attach event handlers
  container.querySelector("#navBrand").onclick = () => store.setState({ view: "dashboard" });
  container.querySelector("#tabDashboard").onclick = () => store.setState({ view: "dashboard" });
  container.querySelector("#tabWorkspace").onclick = () => {
    if (store.state.currentReport) store.setState({ view: "workspace" });
  };
  container.querySelector("#tabTrace").onclick = () => {
    if (store.state.currentReport) store.setState({ view: "trace" });
  };

  container.querySelector("#btnDemoPreset").onclick = () => {
    store.loadDemoReport();
  };

  container.querySelector("#btnStartTour").onclick = () => {
    window.dispatchEvent(new CustomEvent("start-demo-tour"));
  };

  container.querySelector("#btnOpenUpload").onclick = () => {
    store.setState({ uploadModalOpen: true });
  };
}
