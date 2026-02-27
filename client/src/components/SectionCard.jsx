import React from "react";

export default function SectionCard({ title, subtitle, children }) {
  return (
    <section className="rounded-3xl border border-white/20 bg-ink-800/70 p-6 shadow-card">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-carbon-900">{title}</h3>
        {subtitle && <p className="text-sm text-carbon-300">{subtitle}</p>}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
