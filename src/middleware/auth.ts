import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../setup";

export interface AuthPayload {
  userId: string;
  role: "user" | "admin";
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = header.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, config.jwtSecret) as AuthPayload;
    (req as any).auth = payload;
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const auth = (req as any).auth as AuthPayload | undefined;
  if (!auth) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (auth.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  return next();
}
