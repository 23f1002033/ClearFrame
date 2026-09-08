/**
 * Screenplay Upload & Ingestion Modal Component
 * Features drag-and-drop, format validation, and live pipeline stage visualizer.
 */
import { store } from "../store.js";
import { api } from "../api.js";

export function renderUploadModal(container) {
  if (!store.state.uploadModalOpen) {
    container.innerHTML = "";
    return;
  }

  const { uploadProgress } = store.state;

  container.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative overflow-hidden">
        <!-- Close button -->
        <button id="closeUploadModal" class="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <h2 class="text-xl font-bold text-white tracking-tight mb-1">Upload Screenplay</h2>
        <p class="text-xs text-slate-400 mb-6">
          Accepted formats: <code class="text-blue-400">.pdf</code>, <code class="text-blue-400">.txt</code>, <code class="text-blue-400">.fountain</code> (max 25 MB).
        </p>

        ${
          !uploadProgress
            ? `
          <!-- Dropzone -->
          <div id="dropZone" class="border-2 border-dashed border-slate-700 hover:border-blue-500/80 rounded-xl p-8 text-center bg-slate-950/50 hover:bg-slate-950/80 cursor-pointer transition-all mb-6">
            <input type="file" id="fileInput" accept=".pdf,.txt,.fountain" class="hidden">
            <div class="w-12 h-12 rounded-full bg-blue-600/10 text-blue-400 flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            </div>
            <div class="text-sm font-semibold text-white mb-1">Click to browse or drag screenplay here</div>
            <div class="text-xs text-slate-500">Fast multi-agent extraction and copyright term analysis</div>
            <div id="selectedFileName" class="mt-3 text-xs font-mono text-blue-400 hidden"></div>
          </div>

          <div class="flex items-center justify-between">
            <button id="btnLoadSampleTxt" class="text-xs text-slate-400 hover:text-blue-400 underline transition-colors">
              Or use sample: The Last Good Year (.txt)
            </button>
            <button id="btnStartUpload" disabled class="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white text-sm font-semibold shadow-md shadow-blue-600/25 transition-all">
              Start Clearance Run
            </button>
          </div>
        `
            : `
          <!-- Live Pipeline Progress Tracker -->
          <div class="space-y-6">
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div class="flex items-center justify-between text-xs font-medium text-slate-300 mb-2">
                <span class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                  <span>Pipeline State: <b class="text-white uppercase font-mono">${uploadProgress.stage}</b></span>
                </span>
                <span class="text-slate-400 font-mono">${uploadProgress.elapsedSec || 0}s elapsed</span>
              </div>
              
              <!-- Multi-Stage Stepper -->
              <div class="grid grid-cols-4 gap-1.5 my-3">
                ${["INGEST", "EXTRACT", "RESEARCH", "RULES"]
                  .map(stg => {
                    const isDone = uploadProgress.completedStages?.includes(stg);
                    const isCurrent = uploadProgress.stage === stg;
                    return `
                  <div class="h-1.5 rounded-full ${
                    isDone
                      ? "bg-emerald-500"
                      : isCurrent
                      ? "bg-blue-500 animate-pulse"
                      : "bg-slate-800"
                  }"></div>
                `;
                  })
                  .join("")}
              </div>

              <div class="text-xs text-slate-400 mt-2 font-mono truncate">
                ${uploadProgress.lastLog || "Initializing pipeline agents..."}
              </div>
            </div>

            <div class="text-center text-xs text-slate-500">
              Analysis typically takes 2–4 minutes for standard scripts. Polling audit trace...
            </div>
          </div>
        `
        }
      </div>
    </div>
  `;

  // Attach handlers
  const closeBtn = container.querySelector("#closeUploadModal");
  if (closeBtn) {
    closeBtn.onclick = () => store.setState({ uploadModalOpen: false, uploadProgress: null });
  }

  const dropZone = container.querySelector("#dropZone");
  const fileInput = container.querySelector("#fileInput");
  const selectedName = container.querySelector("#selectedFileName");
  const startBtn = container.querySelector("#btnStartUpload");
  let chosenFile = null;

  if (dropZone && fileInput) {
    dropZone.onclick = () => fileInput.click();

    dropZone.ondragover = e => {
      e.preventDefault();
      dropZone.classList.add("border-blue-500", "bg-slate-950/80");
    };
    dropZone.ondragleave = () => {
      dropZone.classList.remove("border-blue-500", "bg-slate-950/80");
    };
    dropZone.ondrop = e => {
      e.preventDefault();
      dropZone.classList.remove("border-blue-500", "bg-slate-950/80");
      if (e.dataTransfer.files?.length) {
        handleFileSelected(e.dataTransfer.files[0]);
      }
    };

    fileInput.onchange = e => {
      if (e.target.files?.length) {
        handleFileSelected(e.target.files[0]);
      }
    };
  }

  function handleFileSelected(file) {
    const validExtensions = [".pdf", ".txt", ".fountain"];
    const ext = "." + file.name.split(".").pop().toLowerCase();
    if (!validExtensions.includes(ext)) {
      alert(`Invalid format: ${ext}. Please select a .pdf, .txt, or .fountain script.`);
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      alert(`File exceeds 25 MB limit.`);
      return;
    }
    chosenFile = file;
    selectedName.textContent = `Selected: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    selectedName.classList.remove("hidden");
    startBtn.disabled = false;
  }

  const sampleBtn = container.querySelector("#btnLoadSampleTxt");
  if (sampleBtn) {
    sampleBtn.onclick = () => {
      store.setState({ uploadModalOpen: false });
      store.loadDemoReport();
    };
  }

  if (startBtn) {
    startBtn.onclick = async () => {
      if (!chosenFile) return;
      startBtn.disabled = true;
      startBtn.textContent = "Uploading...";

      try {
        const uploadRes = await api.uploadScript(chosenFile);
        const reportId = uploadRes.report_id;

        // Enter live progress polling mode
        const startTime = Date.now();
        const completedStages = [];

        store.setState({
          uploadProgress: {
            stage: "QUEUED",
            completedStages: [],
            elapsedSec: 0,
            lastLog: "Script accepted. Starting pipeline..."
          }
        });

        const pollInterval = setInterval(async () => {
          const elapsed = Math.round((Date.now() - startTime) / 1000);
          try {
            const [report, trace] = await Promise.all([
              api.getReport(reportId),
              api.getTrace(reportId).catch(() => null)
            ]);

            const lastEntry = trace?.entries?.[trace.entries.length - 1];
            const currentStage = lastEntry?.stage || report.pipeline_state;

            if (lastEntry?.stage && !completedStages.includes(lastEntry.stage)) {
              completedStages.push(lastEntry.stage);
            }

            store.setState({
              uploadProgress: {
                stage: report.pipeline_state === "COMPLETE" ? "COMPLETE" : currentStage,
                completedStages,
                elapsedSec: elapsed,
                lastLog: lastEntry ? `${lastEntry.tool}: ${lastEntry.output_summary}` : "Analyzing..."
              }
            });

            if (report.pipeline_state === "COMPLETE") {
              clearInterval(pollInterval);
              setTimeout(() => {
                store.setState({ uploadModalOpen: false, uploadProgress: null });
                store.loadReport(reportId);
              }, 1200);
            } else if (report.pipeline_state === "FAILED") {
              clearInterval(pollInterval);
              alert(`Pipeline failed: ${report.error}`);
              store.setState({ uploadProgress: null });
            }
          } catch (err) {
            console.warn("Polling error:", err);
          }
        }, 2500);
      } catch (err) {
        alert(`Upload failed: ${err.message}`);
        startBtn.disabled = false;
        startBtn.textContent = "Start Clearance Run";
      }
    };
  }
}
