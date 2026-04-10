import { NextRequest, NextResponse } from "next/server";
import { shouldUseSecureCookies } from "@/lib/request-cookie-security";

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: shouldUseSecureCookies(req),
    expires: new Date(0),
    path: "/",
  });
  return response;
}
