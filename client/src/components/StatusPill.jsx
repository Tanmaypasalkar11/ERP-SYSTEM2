import React from "react";
import clsx from "clsx";

const statusMap = {
  "In Production": "bg-sun-500/15 text-carbon-900 border-sun-500/40",
  "Ready to Dispatch": "bg-aqua-600/20 text-carbon-900 border-aqua-600/40",
  Pending: "bg-black/10 text-carbon-900 border-black/20",
  Approved: "bg-aqua-600/20 text-carbon-900 border-aqua-600/40",
  Delayed: "bg-rose-500/20 text-carbon-900 border-rose-500/40",
  RUNNING: "bg-sun-500/15 text-carbon-900 border-sun-500/40",
  PLANNED: "bg-black/10 text-carbon-900 border-black/20",
  IN_PRODUCTION: "bg-sun-500/15 text-carbon-900 border-sun-500/40",
  READY_TO_DISPATCH: "bg-aqua-600/20 text-carbon-900 border-aqua-600/40",
  DISPATCHED: "bg-aqua-600/20 text-carbon-900 border-aqua-600/40",
  PENDING: "bg-black/10 text-carbon-900 border-black/20",
  APPROVED: "bg-aqua-600/20 text-carbon-900 border-aqua-600/40",
  IN_TRANSIT: "bg-sun-500/15 text-carbon-900 border-sun-500/40",
  RECEIVED: "bg-aqua-600/20 text-carbon-900 border-aqua-600/40",
  CANCELLED: "bg-rose-500/20 text-carbon-900 border-rose-500/40",
  COMPLETED: "bg-aqua-600/20 text-carbon-900 border-aqua-600/40"
};

export default function StatusPill({ value }) {
  const label = typeof value === "string" ? value.replaceAll("_", " ") : value;
  return (
    <span
      className={clsx(
        "rounded-full border px-3 py-1 text-xs",
        statusMap[value] || "bg-black/10 text-carbon-900 border-black/20"
      )}
    >
      {label}
    </span>
  );
}
