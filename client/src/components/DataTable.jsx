import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";

export default function DataTable({ columns, rows }) {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: "rgba(0,0,0,0.03)" }}>
            {columns.map((column) => (
              <TableCell key={column.key}>
                <Typography variant="overline" sx={{ letterSpacing: "0.3em" }}>
                  {column.label}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} hover>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.render ? column.render(row) : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
