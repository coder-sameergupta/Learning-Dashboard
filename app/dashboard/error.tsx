"use client";

import { AlertTriangle } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-screen items-center justify-center" style={{ background: "var(--bg-base)" }}>
      <div className="text-center space-y-4 max-w-sm px-6">
        <div
          className="inline-flex items-center justify-center w-12 h-12 rounded-xl"
          style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}
        >
          <AlertTriangle size={20} />
        </div>
        <h2 className="text-lg font-semibold" style={{ fontFamily: "Syne, sans-serif" }}>
          Something went wrong
        </h2>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          {error.message || "An unexpected error occurred loading the dashboard."}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{
            background: "var(--bg-elevated)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-muted)",
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
