/**
 * ClearFrame REST API client.
 * Implements the contract in docs/api-contract.md.
 */

const BASE_URL = window.location.origin;

export const api = {
  async getRoot() {
    try {
      const res = await fetch(`${BASE_URL}/`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn("Failed to fetch root metadata:", err);
      return {
        disclaimer: "Research output for review by qualified counsel. Not legal advice. ClearFrame never marks an item as cleared."
      };
    }
  },

  async getHealth() {
    try {
      const res = await fetch(`${BASE_URL}/api/health`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn("Backend health check failed:", err);
      return {
        status: "unreachable",
        version: "0.1.0",
        gemini_configured: false,
        parallel_configured: false
      };
    }
  },

  async listReports() {
    const res = await fetch(`${BASE_URL}/api/reports`);
    if (!res.ok) throw new Error(`Failed to list reports: HTTP ${res.status}`);
    return await res.json();
  },

  async getReport(reportId) {
    const res = await fetch(`${BASE_URL}/api/reports/${reportId}`);
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody.detail || `Failed to fetch report ${reportId}`);
    }
    return await res.json();
  },

  async getTrace(reportId) {
    const res = await fetch(`${BASE_URL}/api/reports/${reportId}/trace`);
    if (!res.ok) throw new Error(`Failed to fetch trace: HTTP ${res.status}`);
    return await res.json();
  },

  async uploadScript(file) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${BASE_URL}/api/scripts`, {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody.detail || `Upload failed with status ${res.status}`);
    }
    return await res.json();
  },

  async setDecision(reportId, itemId, { decision, reviewer_note, reviewer }) {
    const res = await fetch(`${BASE_URL}/api/reports/${reportId}/items/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        decision,
        reviewer_note: reviewer_note || "",
        reviewer: reviewer || "counsel@studiolegal.com"
      })
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody.detail || `Decision update failed`);
    }
    return await res.json();
  },

  async exportReport(reportId, format = "markdown") {
    const res = await fetch(`${BASE_URL}/api/reports/${reportId}/export?format=${format}`, {
      method: "POST"
    });

    if (res.status === 409) {
      // Hard backend review gate error
      const pendingData = await res.json();
      const err = new Error("Review Gatekeeper: Unresolved items remain.");
      err.status = 409;
      err.pendingData = pendingData;
      throw err;
    }

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      const err = new Error(errBody.detail || `Export failed with status ${res.status}`);
      err.status = res.status;
      throw err;
    }

    if (format === "raw") {
      return await res.text();
    }
    return await res.json();
  }
};
