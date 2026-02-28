import React from "react";
import { Paper, Stack, Typography } from "@mui/material";

export default function SectionCard({ title, subtitle, children }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Stack spacing={0.5}>
        <Typography variant="h6">{title}</Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Stack>
      <div className="mt-6">{children}</div>
    </Paper>
  );
}
