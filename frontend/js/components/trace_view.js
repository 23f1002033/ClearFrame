/**
 * Multi-Agent Trace & Audit Explorer Component
 * Visualizes the complete tool execution timeline, token costs, latencies, and safety blocks.
 */
import { store } from "../store.js";

export function renderTraceView(container) {
  const { currentReport, currentTrace } = store.state;

  if (!currentReport) {
    container.innerHTML = `
      <div class="h-full flex items-center justify-center p-8 text-center">
        <div>
          <h2 class="text-xl font-bold text-white mb-3">No Active Trace Loaded</h2>
          <p class="text-sm text-gray-400 mb-5">Select a report to inspect its agent execution trace.</p>
        </div>
      </div>
    `;
    return;
  }

  const entries = currentTrace?.entries || currentReport.audit_log || [];
  const totals = currentTrace?.totals || {
    entries: entries.length,
    warnings: entries.filter(e => e.level === "WARNING").length,
    errors: entries.filter(e => e.level === "ERROR").length,
    safety_blocks: entries.filter(e => e.detail?.safety_blocked).length,
    total_latency_ms: entries.reduce((acc, e) => acc + (e.latency_ms || 0), 0),
    total_tokens: entries.reduce((acc, e) => acc + (e.token_cost || 0), 0),
    total_parallel_tasks: entries.reduce((acc, e) => acc + (e.task_cost || 0), 0)
  };

  const hasSafetyBlocks = totals.safety_blocks > 0;

  container.innerHTML = `
    <div class="h-[calc(100vh-65px)] overflow-y-auto p-10 max-w-7xl mx-auto space-y-8">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-4">
            <h1 class="text-3xl font-bold text-white tracking-tight">Agent Audit Trace</h1>
            <span class="text-sm font-mono px-3 py-1 rounded-lg bg-gray-800 text-blue-400 border border-gray-700">
              ${currentReport.report_id}
            </span>
          </div>
          <p class="text-sm text-gray-400 mt-2">
            Step-by-step execution log of agent actions, research calls, and statutory rule evaluations.
          </p>
        </div>
      </div>

      <!-- Critical Safety Block Warning Banner -->
      ${
        hasSafetyBlocks
          ? `
        <div class="p-5 rounded-xl border border-red-500/30 bg-red-950/20 flex items-start gap-4 shadow-lg animate-pulse-subtle">
          <div class="p-2.5 rounded-xl bg-red-500/15 text-red-400 mt-0.5">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <div>
            <h3 class="text-sm font-bold text-red-300">Safety Block Detected — Unanalysed Script Span</h3>
            <p class="text-sm text-gray-300 mt-1 leading-relaxed">
              One or more spans in this screenplay triggered an automated model safety block. 
              Counsel must manually review unparsed scenes for potential unverified clearance exposure.
            </p>
          </div>
        </div>
      `
          : ""
      }

      <!-- Performance & Cost Totals Ribbon -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div class="p-5 rounded-2xl bg-gray-800/80 border border-gray-700/60">
          <div class="text-sm text-gray-400 font-medium">Pipeline Steps</div>
          <div class="text-2xl font-bold text-white mt-2">${totals.entries}</div>
        </div>
        <div class="p-5 rounded-2xl bg-gray-800/80 border border-gray-700/60">
          <div class="text-sm text-gray-400 font-medium">Total Latency</div>
          <div class="text-2xl font-bold text-white mt-2">${(totals.total_latency_ms / 1000).toFixed(1)}s</div>
        </div>
        <div class="p-5 rounded-2xl bg-gray-800/80 border border-gray-700/60">
          <div class="text-sm text-gray-400 font-medium">Tokens Used</div>
          <div class="text-2xl font-bold text-blue-400 mt-2">${totals.total_tokens.toLocaleString()}</div>
        </div>
        <div class="p-5 rounded-2xl bg-gray-800/80 border border-gray-700/60">
          <div class="text-sm text-gray-400 font-medium">Parallel Tasks</div>
          <div class="text-2xl font-bold text-blue-400 mt-2">${totals.total_parallel_tasks}</div>
        </div>
        <div class="p-5 rounded-2xl bg-gray-800/80 border border-gray-700/60">
          <div class="text-sm text-amber-400 font-medium">Warnings</div>
          <div class="text-2xl font-bold text-amber-400 mt-2">${totals.warnings}</div>
        </div>
        <div class="p-5 rounded-2xl bg-gray-800/80 border border-gray-700/60">
          <div class="text-sm text-red-400 font-medium">Safety Blocks</div>
          <div class="text-2xl font-bold text-red-400 mt-2">${totals.safety_blocks}</div>
        </div>
      </div>

      <!-- Audit Log Timeline Table -->
      <div class="rounded-xl border border-gray-700/60 bg-gray-800/40 overflow-hidden shadow-sm">
        <div class="p-5 border-b border-gray-700/60 bg-gray-800/70 flex items-center justify-between">
          <h2 class="text-base font-semibold text-white">Execution Timeline</h2>
          <span class="text-sm text-gray-500 font-mono">${entries.length} recorded events</span>
        </div>

        <table class="w-full text-left text-sm">
          <thead class="bg-gray-900 text-gray-400 border-b border-gray-700/60">
            <tr>
              <th class="py-3 px-5 font-semibold">Time</th>
              <th class="py-3 px-5 font-semibold">Stage</th>
              <th class="py-3 px-5 font-semibold">Tool Invocation</th>
              <th class="py-3 px-5 font-semibold">Latency</th>
              <th class="py-3 px-5 font-semibold">Result Summary</th>
              <th class="py-3 px-5 font-semibold text-right">Level</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700/40">
            ${
              entries.length === 0
                ? `<tr><td colspan="6" class="p-8 text-center text-gray-500 text-sm">No trace entries logged.</td></tr>`
                : entries
                    .map(entry => {
                      const isWarn = entry.level === "WARNING";
                      const isErr = entry.level === "ERROR";
                      const isSafety = entry.detail?.safety_blocked;

                      return `
                  <tr class="hover:bg-gray-700/30 transition-colors ${
                    isSafety ? "bg-red-950/15" : ""
                  }">
                    <td class="py-3 px-5 font-mono text-gray-500 text-xs whitespace-nowrap">
                      ${entry.timestamp ? entry.timestamp.slice(11, 19) : "—"}
                    </td>
                    <td class="py-3 px-5">
                      <span class="px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-gray-700 text-gray-300">
                        ${entry.stage}
                      </span>
                    </td>
                    <td class="py-3 px-5 font-mono font-semibold text-blue-400 text-sm">
                      ${entry.tool}
                    </td>
                    <td class="py-3 px-5 font-mono text-gray-400 text-xs">
                      ${entry.latency_ms ? Math.round(entry.latency_ms) + " ms" : "—"}
                    </td>
                    <td class="py-3 px-5 text-gray-200 text-sm leading-relaxed max-w-md">
                      <div>${escapeHtml(entry.output_summary || entry.input_summary || "")}</div>
                      ${
                        isSafety
                          ? `<span class="inline-block mt-1.5 px-2.5 py-1 rounded-lg text-xs font-bold uppercase bg-red-500/15 text-red-300 border border-red-500/30">SAFETY BLOCKED</span>`
                          : ""
                      }
                    </td>
                    <td class="py-3 px-5 text-right">
                      <span class="px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase ${
                        isErr
                          ? "bg-red-500/15 text-red-300"
                          : isWarn
                          ? "bg-amber-500/15 text-amber-300"
                          : "bg-gray-700 text-gray-400"
                      }">
                        ${entry.level}
                      </span>
                    </td>
                  </tr>
                `;
                    })
                    .join("")
            }
          </tbody>
        </table>
      </div>
    </div>
  `;
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
