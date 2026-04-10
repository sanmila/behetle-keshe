import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth-server";
import prisma from "@/lib/prisma";

export async function GET() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  if (!authToken) return NextResponse.json({ user: null });

  const payload = verifyToken(authToken);
  if (!payload) return NextResponse.json({ user: null });

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, name: true, isAdmin: true },
  });
  return NextResponse.json({ user });
}
