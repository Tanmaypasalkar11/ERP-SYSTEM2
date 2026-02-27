export function errorHandler(err, req, res, next) {
  if (err?.name === "ZodError") {
    return res.status(400).json({ error: err.issues?.[0]?.message || "Invalid request" });
  }
  const status = err.status || 500;
  return res.status(status).json({ error: err.message || "Server error" });
}
