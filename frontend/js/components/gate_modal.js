/**
 * 409 Review Gatekeeper Modal Component
 * Directly handles server-enforced 409 Conflict when attempting to export
 * with pending items, rendering an interactive jump-list of unresolved items.
 */
import { store } from "../store.js";

export function renderGateModal(container) {
  const { gateModalOpen, gatePendingItems, currentReport } = store.state;

  if (!gateModalOpen) {
    container.innerHTML = "";
    return;
  }

  const totalItems = currentReport?.items?.length || gatePendingItems.length;

  container.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div class="bg-slate-900 border border-rose-500/40 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative overflow-hidden">
        <!-- Close icon -->
        <button id="closeGateModal" class="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <!-- Warning Header -->
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <div>
            <h2 class="text-lg font-bold text-white tracking-tight">Review Gatekeeper: Export Blocked</h2>
            <div class="text-xs text-rose-300 font-medium">HTTP 409 Conflict — Mandatory Counsel Sign-Off Incomplete</div>
          </div>
        </div>

        <p class="text-xs text-slate-300 leading-relaxed mb-4 bg-rose-950/20 border border-rose-500/20 rounded-xl p-3">
          <b>Strict Legal Precaution:</b> ClearFrame refuses server-side to generate an export while any item remains unreviewed. 
          A clearance log cannot leave the building without human counsel sign-off on every item.
        </p>

        <div class="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
          <span>Unresolved Items (${gatePendingItems.length} of ${totalItems} pending)</span>
          <span class="text-slate-400">Click any item to jump and decide</span>
        </div>

        <!-- Jump-List Container -->
        <div class="max-h-72 overflow-y-auto rounded-xl border border-slate-800 divide-y divide-slate-800 bg-slate-950/60 mb-6">
          ${gatePendingItems
            .map(
              item => `
            <div class="p-3 hover:bg-slate-800/60 transition-colors flex items-center justify-between gap-3 gate-item-row" data-id="${item.item_id}">
              <div class="flex items-center gap-3 truncate">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider badge-${item.tier || "NEEDS_VERIFICATION"}">
                  ${(item.tier || "NEEDS_VERIFICATION").replace(/_/g, " ")}
                </span>
                <span class="font-semibold text-xs text-white truncate max-w-xs">
                  ${escapeHtml(item.mention_text)}
                </span>
                <span class="text-[11px] text-slate-400 font-mono">
                  ${item.pages?.length ? `p. ${item.pages.join(", ")}` : ""}
                </span>
              </div>

              <button class="px-2.5 py-1 rounded bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-medium transition-all flex items-center gap-1">
                Review
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-3">
          <button id="dismissGateModal" class="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all">
            Return to Review
          </button>
        </div>
      </div>
    </div>
  `;

  // Handlers
  const close = () => store.setState({ gateModalOpen: false });

  const closeBtn = container.querySelector("#closeGateModal");
  if (closeBtn) closeBtn.onclick = close;

  const dismissBtn = container.querySelector("#dismissGateModal");
  if (dismissBtn) dismissBtn.onclick = close;

  container.querySelectorAll(".gate-item-row").forEach(row => {
    row.onclick = () => {
      const itemId = row.dataset.id;
      store.setState({
        selectedItemId: itemId,
        gateModalOpen: false,
        view: "workspace"
      });
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
