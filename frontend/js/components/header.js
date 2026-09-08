/**
 * Global Header Component
 * Contains branding, system health indicators, disclaimer, and top-level navigation.
 */
import { store } from "../store.js";

export function renderHeader(container) {
  const { health, disclaimer, view, currentReport, demoMode } = store.state;
  const pendingCount = store.getPendingCount();
  const totalCount = currentReport ? currentReport.items.length : 0;
  const reviewedCount = totalCount - pendingCount;

  container.innerHTML = `
    <div class="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <!-- Left: Logo & Navigation Tabs -->
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-2 cursor-pointer" id="navBrand">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
            CF
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-base tracking-tight text-white">ClearFrame</span>
              <span class="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-blue-950/80 text-blue-400 border border-blue-800/60">Studio 0.1</span>
            </div>
            <div class="text-[11px] text-slate-400">Legal Clearance &amp; Triage</div>
          </div>
        </div>

        <nav class="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
          <button id="tabDashboard" class="px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            view === "dashboard" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
          }">
            Dashboard
          </button>
          <button id="tabWorkspace" ${!currentReport ? "disabled" : ""} class="px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            view === "workspace" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white disabled:opacity-40 disabled:hover:text-slate-400"
          }">
            Review Workspace ${currentReport ? `<span class="ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${pendingCount === 0 ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}">${reviewedCount}/${totalCount}</span>` : ""}
          </button>
          <button id="tabTrace" ${!currentReport ? "disabled" : ""} class="px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            view === "trace" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white disabled:opacity-40 disabled:hover:text-slate-400"
          }">
            Agent Audit Trace
          </button>
        </nav>
      </div>

      <!-- Center: Canonical Disclaimer -->
      <div class="hidden xl:flex items-center max-w-xl text-[11.5px] leading-relaxed text-slate-400 border-l-2 border-amber-500/80 pl-3 py-0.5">
        <span>${disclaimer}</span>
      </div>

      <!-- Right: System Status & Action Controls -->
      <div class="flex items-center gap-3">
        <!-- Live System Health Pills -->
        <div class="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px]">
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full ${health.gemini_configured ? "bg-emerald-500" : "bg-amber-500"}"></span>
            <span class="text-slate-300 font-mono">Gemini</span>
          </span>
          <span class="text-slate-700">|</span>
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full ${health.parallel_configured ? "bg-emerald-500" : "bg-amber-500"}"></span>
            <span class="text-slate-300 font-mono">Parallel</span>
          </span>
        </div>

        <!-- Demo Mode Quick Loader -->
        <button id="btnDemoPreset" class="px-2.5 py-1.5 rounded-lg border border-indigo-500/40 bg-indigo-950/40 hover:bg-indigo-900/60 text-indigo-300 text-xs font-medium flex items-center gap-1.5 transition-all">
          <svg class="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          ${demoMode ? "Reset Demo" : "Load Demo Script"}
        </button>

        <!-- Tour Guide Button -->
        <button id="btnStartTour" class="px-2.5 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-800 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-all">
          <svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Tour
        </button>

        <!-- New Script Clearance Upload Button -->
        <button id="btnOpenUpload" class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 flex items-center gap-1.5 transition-all">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
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
