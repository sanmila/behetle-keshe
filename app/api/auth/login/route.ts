import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyPassword, createToken, setAuthCookie } from "@/lib/auth-server";
import { shouldUseSecureCookies } from "@/lib/request-cookie-security";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = createToken(user.id, user.isAdmin);
    const cookie = setAuthCookie(token, shouldUseSecureCookies(req));

    const response = NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name, isAdmin: user.isAdmin },
    });
    response.cookies.set(cookie);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
