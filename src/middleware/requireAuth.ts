import type { Request, Response, NextFunction } from "express";
const { verifyJwt } = require("../utils/jwt");

function requireAuth(req: Request, res: Response, next: NextFunction) {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : undefined;
  if (!token) return res.status(401).json({ message: "Missing token" });
  try {
    (req as any).user = verifyJwt(token);
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = requireAuth;
