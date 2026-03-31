// ============================================================
// Next.js Middleware — 라우트 보호
// 현재: mock 모드라 통과 처리
// Supabase 연동 시: 세션 검사 활성화
// ============================================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 로그인 없이 접근 가능한 경로
const PUBLIC_PATHS = ["/login", "/signup", "/auth/callback"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 공개 경로는 통과
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // ── Supabase 연동 시 아래 코드로 교체 ──────────────────────
  // import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
  //
  // export async function middleware(request: NextRequest) {
  //   const response = NextResponse.next();
  //   const supabase = createMiddlewareClient({ req: request, res: response });
  //   const { data: { session } } = await supabase.auth.getSession();
  //
  //   if (!session && !PUBLIC_PATHS.some((p) => request.nextUrl.pathname.startsWith(p))) {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }
  //   return response;
  // }
  // ────────────────────────────────────────────────────────────

  // 현재: mock 모드 — 모든 경로 통과
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
