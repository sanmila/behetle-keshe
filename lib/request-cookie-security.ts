import type { NextRequest } from "next/server";

type RequestLike = Pick<NextRequest, "headers" | "nextUrl">;

export function shouldUseSecureCookies(request: RequestLike): boolean {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  if (forwardedProto) {
    return forwardedProto.split(",")[0]?.trim() === "https";
  }

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      return new URL(origin).protocol === "https:";
    } catch {
      // Ignore malformed origins and fall back to the request URL.
    }
  }

  return request.nextUrl.protocol === "https:";
}
