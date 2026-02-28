import React from "react";
import { Chip } from "@mui/material";

const statusMap = {
  "In Production": { bg: "rgba(199,155,59,0.18)", border: "rgba(199,155,59,0.45)" },
  "Ready to Dispatch": { bg: "rgba(47,143,138,0.2)", border: "rgba(47,143,138,0.45)" },
  Pending: { bg: "rgba(0,0,0,0.08)", border: "rgba(0,0,0,0.2)" },
  Approved: { bg: "rgba(47,143,138,0.2)", border: "rgba(47,143,138,0.45)" },
  Delayed: { bg: "rgba(234, 84, 85, 0.18)", border: "rgba(234, 84, 85, 0.45)" },
  RUNNING: { bg: "rgba(199,155,59,0.18)", border: "rgba(199,155,59,0.45)" },
  PLANNED: { bg: "rgba(0,0,0,0.08)", border: "rgba(0,0,0,0.2)" },
  IN_PRODUCTION: { bg: "rgba(199,155,59,0.18)", border: "rgba(199,155,59,0.45)" },
  READY_TO_DISPATCH: { bg: "rgba(47,143,138,0.2)", border: "rgba(47,143,138,0.45)" },
  DISPATCHED: { bg: "rgba(47,143,138,0.2)", border: "rgba(47,143,138,0.45)" },
  PENDING: { bg: "rgba(0,0,0,0.08)", border: "rgba(0,0,0,0.2)" },
  APPROVED: { bg: "rgba(47,143,138,0.2)", border: "rgba(47,143,138,0.45)" },
  IN_TRANSIT: { bg: "rgba(199,155,59,0.18)", border: "rgba(199,155,59,0.45)" },
  RECEIVED: { bg: "rgba(47,143,138,0.2)", border: "rgba(47,143,138,0.45)" },
  CANCELLED: { bg: "rgba(234, 84, 85, 0.18)", border: "rgba(234, 84, 85, 0.45)" },
  COMPLETED: { bg: "rgba(47,143,138,0.2)", border: "rgba(47,143,138,0.45)" }
};

export default function StatusPill({ value }) {
  const label = typeof value === "string" ? value.replaceAll("_", " ") : value;
  const style = statusMap[value] || { bg: "rgba(0,0,0,0.08)", border: "rgba(0,0,0,0.2)" };
  return (
    <Chip
      size="small"
      label={label}
      sx={{
        backgroundColor: style.bg,
        border: `1px solid ${style.border}`,
        color: "text.primary",
        fontSize: "0.65rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        px: 0.5
      }}
    />
  );
}
