"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MegaDropdown from "./_components/MegaDropdown";
import { SENIORS_MEGA_MENU, ROADMAP_MEGA_MENU } from "./_lib/constants";
import { loadAvatarVariant, type AvatarVariant } from "@/lib/avatarVariants";
import { signOut } from "@/services/auth";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<AvatarVariant>({ bg: "#F1F5F9", stroke: "#64748B" });

  useEffect(() => {
    setAvatar(loadAvatarVariant());
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md"
      style={{
        borderBottom: "1.5px solid rgba(241,245,249,0.5)",
        boxShadow: "0 2px 12px 0 rgba(0,0,0,0.06)",
      }}
      onMouseLeave={() => setOpenMenu(null)}
    >
      {/* ── 네비게이션 바 본체 ── */}
      <div className="max-w-[1280px] mx-auto px-6 h-[64px] flex items-center justify-between">

        {/* ── 로고 + 메뉴 ── */}
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-lg text-foreground">
            LOGO
          </Link>

          <div className="flex items-center gap-1">

            {/* 커리큘럼 계산기 */}
            <Link
              href="/curriculum"
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                pathname.startsWith("/curriculum")
                  ? "text-[var(--color-brand)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              커리큘럼 계산기
            </Link>

            {/* 선배와의 연결 — 드롭다운 트리거 */}
            <div onMouseEnter={() => setOpenMenu("seniors")}>
              <button
                onClick={() => setOpenMenu(openMenu === "seniors" ? null : "seniors")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  pathname.startsWith("/seniors") || openMenu === "seniors"
                    ? "text-[#094F7A]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                선배와의 연결
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  style={{
                    transition: "transform 280ms ease",
                    transform: openMenu === "seniors" ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* 커리어 로드맵 — 드롭다운 트리거 */}
            <div onMouseEnter={() => setOpenMenu("roadmap")}>
              <button
                onClick={() => setOpenMenu(openMenu === "roadmap" ? null : "roadmap")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  pathname.startsWith("/roadmap") || openMenu === "roadmap"
                    ? "text-[var(--color-brand)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                커리어 로드맵
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  style={{
                    transition: "transform 280ms ease",
                    transform: openMenu === "roadmap" ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* 메시지함 */}
            <Link
              href="/messages"
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                pathname.startsWith("/messages")
                  ? "text-[var(--color-brand)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              메시지함
            </Link>

          </div>
        </div>

        {/* ── 우측 액션 ── */}
        <div className="flex items-center gap-3">

          <button
            onClick={async () => {
              await signOut();
              router.push("/login");
            }}
            style={{
              display: "flex",
              width: "78px",
              height: "34.5px",
              flexDirection: "column",
              justifyContent: "center",
              color: "#64748B",
              textAlign: "center",
              fontFamily: "var(--font-roboto), sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "normal",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            로그아웃
          </button>

          <Link href="/messages">
            <button
              style={{
                display: "flex",
                padding: "8px 20px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "14998.5px",
                background: "#9A001F",
                color: "#FFFFFF",
                fontFamily: "var(--font-roboto), sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 14px 0 rgba(154,0,31,0.35)",
                transition: "opacity 180ms ease",
              }}
            >
              메시지함
            </button>
          </Link>

          {/* 구분선 */}
          <div
            style={{
              width: "1.5px",
              height: "48px",
              flexShrink: 0,
              background: "#E2E8F0",
            }}
          />

          <Link href="/mypage">
            <div style={{
              width: "32px", height: "32px", borderRadius: "50%",
              backgroundColor: avatar.bg, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={avatar.stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </div>
          </Link>

        </div>
      </div>

      {/* ── 선배와의 연결 메가 드롭다운 ── */}
      <MegaDropdown
        isOpen={openMenu === "seniors"}
        menu={SENIORS_MEGA_MENU}
        onLinkClick={() => setOpenMenu(null)}
      />

      {/* ── 커리어 로드맵 메가 드롭다운 ── */}
      <MegaDropdown
        isOpen={openMenu === "roadmap"}
        menu={ROADMAP_MEGA_MENU}
        onLinkClick={() => setOpenMenu(null)}
      />

    </nav>
  );
}
