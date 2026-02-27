import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function requireAuth(req, res, next) {
  const header = req.header("authorization");
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing token" });
  }

  const token = header.replace("Bearer ", "").trim();
  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = {
      id: decoded.sub,
      role: decoded.role,
      email: decoded.email,
      name: decoded.name
    };
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export function requireRole(allowed = []) {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!role) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (allowed.length > 0 && !allowed.includes(role)) {
      return res.status(403).json({ error: "Access denied" });
    }
    return next();
  };
}
