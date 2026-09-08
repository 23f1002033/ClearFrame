/**
 * Review Gatekeeper Modal Component
 * Handles server-enforced 409 Conflict when attempting to export
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
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div class="bg-gray-800 border border-red-500/30 rounded-2xl max-w-2xl w-full p-8 shadow-2xl relative overflow-hidden">
        <!-- Close icon -->
        <button id="closeGateModal" class="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <!-- Warning Header -->
        <div class="flex items-center gap-4 mb-5">
          <div class="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 border border-red-500/25 flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-white tracking-tight">Export Blocked</h2>
            <div class="text-sm text-red-300 font-medium">All items must be reviewed before an export can be generated.</div>
          </div>
        </div>

        <p class="text-sm text-gray-300 leading-relaxed mb-6 bg-red-950/15 border border-red-500/15 rounded-xl p-4">
          <b>Strict Legal Precaution:</b> ClearFrame refuses to generate an export while any item remains unreviewed. 
          A clearance log cannot leave the building without human counsel sign-off on every item.
        </p>

        <div class="flex items-center justify-between text-sm font-semibold text-gray-300 mb-3">
          <span>Unresolved Items (${gatePendingItems.length} of ${totalItems} pending)</span>
          <span class="text-gray-400">Click any item to jump and decide</span>
        </div>

        <!-- Jump-List Container -->
        <div class="max-h-72 overflow-y-auto rounded-xl border border-gray-700 divide-y divide-gray-700/40 bg-gray-900/50 mb-8">
          ${gatePendingItems
            .map(
              item => `
            <div class="p-4 hover:bg-gray-700/40 transition-colors flex items-center justify-between gap-3 gate-item-row cursor-pointer" data-id="${item.item_id}">
              <div class="flex items-center gap-3 truncate">
                <span class="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider badge-${item.tier || "NEEDS_VERIFICATION"}">
                  ${(item.tier || "NEEDS_VERIFICATION").replace(/_/g, " ")}
                </span>
                <span class="font-semibold text-sm text-white truncate max-w-xs">
                  ${escapeHtml(item.mention_text)}
                </span>
                <span class="text-xs text-gray-400 font-mono">
                  ${item.pages?.length ? `p. ${item.pages.join(", ")}` : ""}
                </span>
              </div>

              <button class="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-sm font-medium transition-all flex items-center gap-1.5">
                Review
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-3">
          <button id="dismissGateModal" class="px-5 py-2.5 rounded-xl bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm font-semibold transition-all">
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
