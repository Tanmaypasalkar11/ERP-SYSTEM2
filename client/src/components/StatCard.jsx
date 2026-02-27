import React from "react";

export default function StatCard({ title, value, change, meta }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-card">
      <p className="text-xs uppercase tracking-[0.3em] text-white/50">{title}</p>
      <div className="mt-4 flex items-end justify-between">
        <h3 className="text-3xl font-semibold text-white">{value}</h3>
        <span className="text-sm text-aqua-400">{change}</span>
      </div>
      {meta && <p className="mt-2 text-xs text-white/60">{meta}</p>}
    </div>
  );
}
