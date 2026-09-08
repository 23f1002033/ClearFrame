/**
 * Signed-Off Export Modal Component
 * Previews the generated clearance markdown log, enables clipboard copy and file download.
 */
import { store } from "../store.js";

export function renderExportModal(container) {
  const { exportModalOpen, exportData, currentReport } = store.state;

  if (!exportModalOpen || !exportData) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div class="bg-gray-800 border border-emerald-500/30 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col p-8 shadow-2xl relative overflow-hidden">
        <!-- Close icon -->
        <button id="closeExportModal" class="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <!-- Header -->
        <div class="flex items-center gap-4 mb-5">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-white tracking-tight">Clearance Research Log Signed Off</h2>
            <div class="text-sm text-emerald-400 font-medium">Status: SIGNED_OFF · ${exportData.filename}</div>
          </div>
        </div>

        <!-- Summary text -->
        <div class="p-4 bg-gray-900 border border-gray-700 rounded-xl text-sm text-gray-300 font-mono leading-relaxed mb-5">
          ${escapeHtml(exportData.summary)}
        </div>

        <!-- Markdown preview box -->
        <div class="flex-1 overflow-y-auto rounded-xl border border-gray-700 bg-gray-900/70 p-5 font-mono text-sm text-gray-300 leading-relaxed whitespace-pre-wrap mb-8 select-all">
${escapeHtml(exportData.markdown)}
        </div>

        <!-- Footer actions -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-700">
          <span class="text-sm text-gray-500">Ready for production binder &amp; insurance carrier review.</span>
          <div class="flex items-center gap-3">
            <button id="btnCopyMarkdown" class="px-5 py-2.5 rounded-xl border border-gray-600 hover:border-gray-500 bg-gray-700 text-gray-200 text-sm font-semibold flex items-center gap-2 transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
              <span id="copyBtnText">Copy Markdown</span>
            </button>
            <button id="btnDownloadMarkdown" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-md shadow-emerald-600/25 flex items-center gap-2 transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Download .md File
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Handlers
  const close = () => store.setState({ exportModalOpen: false });

  const closeBtn = container.querySelector("#closeExportModal");
  if (closeBtn) closeBtn.onclick = close;

  const copyBtn = container.querySelector("#btnCopyMarkdown");
  const copyText = container.querySelector("#copyBtnText");
  if (copyBtn) {
    copyBtn.onclick = async () => {
      await navigator.clipboard.writeText(exportData.markdown);
      copyText.textContent = "Copied!";
      setTimeout(() => (copyText.textContent = "Copy Markdown"), 2000);
    };
  }

  const downloadBtn = container.querySelector("#btnDownloadMarkdown");
  if (downloadBtn) {
    downloadBtn.onclick = () => {
      const blob = new Blob([exportData.markdown], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = exportData.filename || "clearance-log.md";
      a.click();
      URL.revokeObjectURL(url);
    };
  }
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
