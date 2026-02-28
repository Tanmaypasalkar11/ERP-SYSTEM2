import React from "react";
import { Paper, Stack, Typography } from "@mui/material";

export default function StatCard({ title, value, change, meta }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="overline" sx={{ letterSpacing: "0.3em" }}>
        {title}
      </Typography>
      <Stack direction="row" alignItems="flex-end" justifyContent="space-between" sx={{ mt: 2 }}>
        <Typography variant="h3">{value}</Typography>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {change}
        </Typography>
      </Stack>
      {meta && (
        <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
          {meta}
        </Typography>
      )}
    </Paper>
  );
}
