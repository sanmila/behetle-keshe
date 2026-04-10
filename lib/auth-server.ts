import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getJwtSecret } from "@/lib/runtime-config";

export function verifyToken(token: string): { userId: string; isAdmin: boolean } | null {
  try {
    const payload = jwt.verify(token, getJwtSecret()) as { userId: string; isAdmin?: boolean };
    return { userId: payload.userId, isAdmin: payload.isAdmin || false };
  } catch {
    return null;
  }
}

export function createToken(userId: string, isAdmin: boolean): string {
  return jwt.sign({ userId, isAdmin }, getJwtSecret(), { expiresIn: "7d" });
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function setAuthCookie(token: string, secure: boolean) {
  return {
    name: "auth_token",
    value: token,
    httpOnly: true,
    secure,
    sameSite: "strict" as const,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  };
}

export const COOKIE_NAME = "auth_token";
