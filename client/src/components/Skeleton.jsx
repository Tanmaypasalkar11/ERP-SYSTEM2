import React from "react";
import clsx from "clsx";

export function SkeletonLine({ className }) {
  return (
    <div
      className={clsx(
        "h-3 w-full animate-pulse rounded-full bg-black/10 dark:bg-white/10",
        className
      )}
    />
  );
}

export function SkeletonCard({ lines = 3 }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-black/5 p-6 shadow-card dark:border-white/10 dark:bg-white/5">
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <SkeletonLine key={index} className={index === 0 ? "h-4" : "h-3"} />
        ))}
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
      <div className="divide-y divide-black/10 dark:divide-white/10">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="px-4 py-4">
            <SkeletonLine className="h-3" />
          </div>
        ))}
      </div>
    </div>
  );
}
