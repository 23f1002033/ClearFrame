/**
 * ClearFrame Frontend Application Bootstrap
 * Orchestrates views, subscriptions, modal managers, and keyboard shortcuts.
 */
import { store } from "./store.js";
import { renderHeader } from "./components/header.js";
import { renderDashboard } from "./components/dashboard.js";
import { renderWorkspace } from "./components/workspace.js";
import { renderTraceView } from "./components/trace_view.js";
import { renderUploadModal } from "./components/upload_modal.js";
import { renderGateModal } from "./components/gate_modal.js";
import { renderExportModal } from "./components/export_modal.js";
import { initDemoTour } from "./components/demo_tour.js";

function mountApp() {
  const headerContainer = document.getElementById("appHeader");
  const mainContainer = document.getElementById("appMain");
  const modalContainer = document.getElementById("appModals");

  function renderAll() {
    renderHeader(headerContainer);

    // Mount active view
    const currentView = store.state.view;
    if (currentView === "dashboard") {
      renderDashboard(mainContainer);
    } else if (currentView === "workspace") {
      renderWorkspace(mainContainer);
    } else if (currentView === "trace") {
      renderTraceView(mainContainer);
    }

    // Render modals
    renderModals();
  }

  function renderModals() {
    modalContainer.innerHTML = `
      <div id="uploadModalMount"></div>
      <div id="gateModalMount"></div>
      <div id="exportModalMount"></div>
    `;

    renderUploadModal(document.getElementById("uploadModalMount"));
    renderGateModal(document.getElementById("gateModalMount"));
    renderExportModal(document.getElementById("exportModalMount"));
  }

  // Subscribe to state changes
  store.subscribe(() => {
    renderAll();
  });

  // Global Keyboard Shortcuts
  window.addEventListener("keydown", e => {
    // If typing in input, textarea, or contenteditable, do not trigger shortcuts
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA" || activeEl.isContentEditable)) {
      return;
    }

    const { view, gateModalOpen, exportModalOpen, uploadModalOpen } = store.state;

    // ESC closes open modals
    if (e.key === "Escape") {
      if (gateModalOpen || exportModalOpen || uploadModalOpen) {
        store.setState({ gateModalOpen: false, exportModalOpen: false, uploadModalOpen: false });
        return;
      }
    }

    // Workspace-only decision hotkeys
    if (view === "workspace") {
      if (e.key.toLowerCase() === "c") {
        store.decideCurrentItem("CONFIRMED");
      } else if (e.key.toLowerCase() === "r") {
        store.decideCurrentItem("REJECTED");
      } else if (e.key.toLowerCase() === "e") {
        store.decideCurrentItem("ESCALATED");
      } else if (e.key.toLowerCase() === "x") {
        store.decideCurrentItem("PENDING");
      } else if (e.key.toLowerCase() === "j" || e.key === "ArrowDown") {
        e.preventDefault();
        store.selectNextItem();
      } else if (e.key.toLowerCase() === "k" || e.key === "ArrowUp") {
        e.preventDefault();
        store.selectPrevItem();
      }
    }
  });

  // Initialize store and demo tour
  initDemoTour();
  store.init();
}

document.addEventListener("DOMContentLoaded", mountApp);
