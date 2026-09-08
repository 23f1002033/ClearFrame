/**
 * Central state store for ClearFrame.
 * Provides pub/sub subscriptions for UI components.
 */

import { MOCK_REPORT, MOCK_REPORTS, MOCK_TRACE } from "./mock_data.js";
import { api } from "./api.js";

class Store {
  constructor() {
    this.state = {
      view: "dashboard", // "dashboard" | "workspace" | "trace"
      reports: [],
      currentReport: null,
      currentTrace: null,
      selectedItemId: null,
      health: { status: "checking", gemini_configured: false, parallel_configured: false },
      disclaimer: "Research output for review by qualified counsel. Not legal advice. ClearFrame never marks an item as cleared.",
      demoMode: false,
      searchQuery: "",
      tierFilter: "ALL",
      categoryFilter: "ALL",
      decisionFilter: "ALL",
      gateModalOpen: false,
      gatePendingItems: [],
      exportModalOpen: false,
      exportData: null,
      uploadModalOpen: false,
      uploadProgress: null, // { stage, percent, log }
      safetyWarningDismissed: false
    };
    this.listeners = new Set();
  }

  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  setState(updates) {
    this.state = { ...this.state, ...updates };
    this.notify();
  }

  // Getters & Helpers
  get currentReport() {
    return this.state.currentReport;
  }

  get selectedItem() {
    if (!this.state.currentReport || !this.state.selectedItemId) return null;
    return this.state.currentReport.items.find(i => i.item_id === this.state.selectedItemId) || null;
  }

  get selectedFinding() {
    if (!this.state.currentReport || !this.state.selectedItemId) return null;
    return this.state.currentReport.findings.find(f => f.item_id === this.state.selectedItemId) || null;
  }

  getItemDecision(itemId) {
    return this.state.currentReport?.review_states?.[itemId]?.decision || "PENDING";
  }

  getPendingCount() {
    if (!this.state.currentReport) return 0;
    return this.state.currentReport.items.filter(
      item => this.getItemDecision(item.item_id) === "PENDING"
    ).length;
  }

  getReviewedCount() {
    if (!this.state.currentReport) return 0;
    return this.state.currentReport.items.length - this.getPendingCount();
  }

  getTierCounts() {
    const counts = { ESCALATE: 0, NEEDS_VERIFICATION: 0, CLEAR_ON_RECORD: 0 };
    if (!this.state.currentReport) return counts;
    for (const f of this.state.currentReport.findings) {
      if (counts[f.tier] !== undefined) counts[f.tier]++;
    }
    return counts;
  }

  // Actions
  async init() {
    const [rootData, healthData] = await Promise.all([
      api.getRoot().catch(() => null),
      api.getHealth().catch(() => null)
    ]);

    if (rootData?.disclaimer) {
      this.state.disclaimer = rootData.disclaimer;
    }
    if (healthData) {
      this.state.health = healthData;
    }

    await this.refreshReports();

    // Check URL parameters for ?report=
    const params = new URLSearchParams(window.location.search);
    const reportParam = params.get("report");
    if (reportParam) {
      await this.loadReport(reportParam);
    } else if (this.state.reports.length === 0) {
      // If no reports exist on backend, prompt demo mode or load mock
      this.notify();
    }
  }

  async refreshReports() {
    if (this.state.demoMode) {
      // Derived from the fixture, never hardcoded: literal counts here drifted
      // from the fixture and the dashboard advertised 8 tiered items for a
      // 27-item report.
      this.setState({ reports: MOCK_REPORTS });
      return;
    }

    try {
      const reports = await api.listReports();
      this.setState({ reports });
    } catch (err) {
      console.warn("Could not fetch reports from backend:", err);
    }
  }

  /**
   * True only for the bundled offline demo report.
   *
   * Demo mode must never be inferred from a report id matching the fixture's,
   * because the fixture is generated from a real pipeline run and therefore
   * carries a real-looking id. When those collided, loadReport() served the
   * stale mock instead of the live report: decisions appeared to save but no
   * PATCH was ever sent, and export never reached the backend's 409 gate.
   * The fixture now uses a reserved "rpt_demo_" prefix that the pipeline
   * cannot produce.
   */
  isDemoReportId(reportId) {
    return typeof reportId === "string" && reportId.startsWith("rpt_demo_");
  }

  async loadReport(reportId) {
    if (this.state.demoMode || this.isDemoReportId(reportId)) {
      // Use cloned mock report
      const cloned = JSON.parse(JSON.stringify(MOCK_REPORT));
      const firstItemId = cloned.findings[0]?.item_id || cloned.items[0]?.item_id;
      this.setState({
        currentReport: cloned,
        currentTrace: MOCK_TRACE,
        selectedItemId: firstItemId,
        view: "workspace",
        demoMode: true
      });
      window.history.replaceState(null, "", `?report=${cloned.report_id}`);
      return;
    }

    try {
      const [report, trace] = await Promise.all([
        api.getReport(reportId),
        api.getTrace(reportId).catch(() => null)
      ]);

      const firstItemId = report.findings[0]?.item_id || report.items[0]?.item_id;
      this.setState({
        currentReport: report,
        currentTrace: trace,
        selectedItemId: firstItemId,
        view: "workspace",
        demoMode: false
      });
      window.history.replaceState(null, "", `?report=${reportId}`);
    } catch (err) {
      console.error("Failed to load report:", err);
      alert(`Could not load report: ${err.message}`);
    }
  }

  loadDemoReport() {
    const cloned = JSON.parse(JSON.stringify(MOCK_REPORT));
    const firstItemId = cloned.findings[0]?.item_id || cloned.items[0]?.item_id;
    this.setState({
      currentReport: cloned,
      currentTrace: MOCK_TRACE,
      selectedItemId: firstItemId,
      view: "workspace",
      demoMode: true
    });
    window.history.replaceState(null, "", `?report=${cloned.report_id}`);
  }

  selectItem(itemId) {
    this.setState({ selectedItemId: itemId });
  }

  async decideCurrentItem(decision, note = "") {
    if (!this.state.currentReport || !this.state.selectedItemId) return;
    const itemId = this.state.selectedItemId;
    const reportId = this.state.currentReport.report_id;

    if (this.state.demoMode) {
      // Local optimistic update
      this.state.currentReport.review_states[itemId] = {
        item_id: itemId,
        decision,
        reviewer_note: note,
        reviewer: "counsel@studiolegal.com",
        decided_at: new Date().toISOString()
      };
      this.notify();
      return;
    }

    try {
      const updatedState = await api.setDecision(reportId, itemId, {
        decision,
        reviewer_note: note,
        reviewer: "counsel@studiolegal.com"
      });
      this.state.currentReport.review_states[itemId] = updatedState;
      this.notify();
    } catch (err) {
      alert(`Failed to save decision: ${err.message}`);
    }
  }

  async export() {
    if (!this.state.currentReport) return;
    const reportId = this.state.currentReport.report_id;

    if (this.state.demoMode) {
      const pendingCount = this.getPendingCount();
      if (pendingCount > 0) {
        // Trigger simulated 409 Review Gate
        const pendingItems = this.state.currentReport.items
          .filter(i => this.getItemDecision(i.item_id) === "PENDING")
          .map(i => ({
            item_id: i.item_id,
            mention_text: i.mention_text,
            category: i.category,
            tier: this.state.currentReport.findings.find(f => f.item_id === i.item_id)?.tier || "NEEDS_VERIFICATION",
            pages: i.occurrences.map(o => o.page_number)
          }));

        this.setState({
          gateModalOpen: true,
          gatePendingItems: pendingItems
        });
        return;
      }

      // Simulated export success
      const sampleMarkdown = `# Clearance Research Log — *${this.state.currentReport.script_name}*\n\n> **Research output for review by qualified counsel. Not legal advice.**\n\nGenerated: ${new Date().toISOString()}\nTotal items: ${this.state.currentReport.items.length}\nAll items signed off by counsel.`;
      this.setState({
        exportModalOpen: true,
        exportData: {
          report_id: reportId,
          filename: `clearance-log-${this.state.currentReport.script_name.toLowerCase().replace(/\s+/g, "-")}.md`,
          markdown: sampleMarkdown,
          summary: `${this.state.currentReport.script_name}: All items decided and signed off.`
        }
      });
      this.state.currentReport.status = "SIGNED_OFF";
      this.notify();
      return;
    }

    try {
      const exportRes = await api.exportReport(reportId, "markdown");
      this.setState({
        exportModalOpen: true,
        exportData: exportRes
      });
      this.state.currentReport.status = "SIGNED_OFF";
      this.notify();
    } catch (err) {
      if (err.status === 409 && err.pendingData) {
        // Backend 409 review gate!
        this.setState({
          gateModalOpen: true,
          gatePendingItems: err.pendingData.pending_items || []
        });
      } else {
        alert(err.message || "Export error");
      }
    }
  }

  /**
   * Ids of the rows the workspace is currently showing, in display order.
   *
   * Read from the DOM so keyboard navigation always follows what the reviewer
   * can see. Walking `findings` instead moved the selection to rows hidden by
   * the active search or tier filter, which looked like the selection vanishing.
   */
  visibleItemIds() {
    const rows = document.querySelectorAll(".item-row");
    if (rows.length) return [...rows].map(r => r.dataset.id);
    // Fall back to findings order when the list is not mounted (e.g. trace view).
    return this.state.currentReport ? this.state.currentReport.findings.map(f => f.item_id) : [];
  }

  // Keyboard navigation
  selectNextItem() {
    if (!this.state.currentReport) return;
    const items = this.visibleItemIds();
    const currentIndex = items.indexOf(this.state.selectedItemId);
    if (currentIndex === -1 && items.length) {
      this.selectItem(items[0]);
    } else if (currentIndex < items.length - 1) {
      this.selectItem(items[currentIndex + 1]);
    }
  }

  selectPrevItem() {
    if (!this.state.currentReport) return;
    const items = this.visibleItemIds();
    const currentIndex = items.indexOf(this.state.selectedItemId);
    if (currentIndex === -1 && items.length) {
      this.selectItem(items[0]);
    } else if (currentIndex > 0) {
      this.selectItem(items[currentIndex - 1]);
    }
  }
}

export const store = new Store();
