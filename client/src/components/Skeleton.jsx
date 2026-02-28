import React from "react";
import { Paper, Skeleton, Stack } from "@mui/material";

export function SkeletonLine({ height = 12 }) {
  return <Skeleton variant="rounded" height={height} />;
}

export function SkeletonCard({ lines = 3 }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Stack spacing={1.5}>
        {Array.from({ length: lines }).map((_, index) => (
          <SkeletonLine key={index} height={index === 0 ? 18 : 12} />
        ))}
      </Stack>
    </Paper>
  );
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <Paper sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
      <Stack spacing={1.5} sx={{ p: 3 }}>
        {Array.from({ length: rows }).map((_, index) => (
          <SkeletonLine key={index} height={14} />
        ))}
      </Stack>
    </Paper>
  );
}
