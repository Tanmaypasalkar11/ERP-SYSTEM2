import React from "react";

export default function DataTable({ columns, rows }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-black/5 text-xs uppercase tracking-[0.3em] text-carbon-900">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-3 font-medium">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-black/10 dark:divide-white/10">
          {rows.map((row) => (
            <tr key={row.id} className="bg-ink-900/40 dark:bg-ink-800/70">
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 text-carbon-900">
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
