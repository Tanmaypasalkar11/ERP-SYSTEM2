import React from "react";

export default function StatCard({ title, value, change, meta }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-black/5 p-6 shadow-card">
      <p className="text-xs uppercase tracking-[0.3em] text-carbon-900">{title}</p>
      <div className="mt-4 flex items-end justify-between">
        <h3 className="text-3xl font-semibold text-carbon-900">{value}</h3>
        <span className="text-sm text-carbon-900">{change}</span>
      </div>
      {meta && <p className="mt-2 text-xs text-carbon-900">{meta}</p>}
    </div>
  );
}
