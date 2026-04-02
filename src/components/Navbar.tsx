"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MegaDropdown from "./_components/MegaDropdown";
import { SENIORS_MEGA_MENU, ROADMAP_MEGA_MENU } from "./_lib/constants";
import { loadAvatarVariant, AvatarIcon, AVATAR_VARIANTS, type AvatarVariant } from "@/lib/avatarVariants";
import { signOut } from "@/services/auth";

// ── 인라인 스타일 상수 ──────────────────────────────────────────────────────
const navStyle: React.CSSProperties = {
  borderBottom: "1.5px solid rgba(241,245,249,0.5)",
  boxShadow: "0 1px 4px 0 rgba(0,0,0,0.06)",
};

const chevronStyle = (isOpen: boolean): React.CSSProperties => ({
  transition: "transform 280ms ease",
  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
});

const logoutBtnStyle: React.CSSProperties = {
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
};

const messagesBtnStyle: React.CSSProperties = {
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
};

const dividerStyle: React.CSSProperties = {
  width: "1.5px",
  height: "36px",
  flexShrink: 0,
  background: "#E2E8F0",
};

const avatarWrapStyle = (bg: string): React.CSSProperties => ({
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  backgroundColor: bg,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
});

// ── 메인 컴포넌트 ───────────────────────────────────────────────────────────
export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<AvatarVariant>(AVATAR_VARIANTS[0]);

  useEffect(() => {
    setAvatar(loadAvatarVariant());
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 bg-white"
      style={navStyle}
      onMouseLeave={() => setOpenMenu(null)}
    >
      {/* ── 네비게이션 바 본체 ── */}
      <div className="relative w-full h-[64px] flex items-center">

        {/* ── 로고 (화면 제일 왼쪽) ── */}
        <div className="absolute left-6">
          <Link href="/" className="font-bold text-lg text-foreground">
            LOGO
          </Link>
        </div>

        {/* ── 메뉴 + 우측 액션 (본문 영역에 맞춤) ── */}
        <div className="max-w-[1280px] mx-auto w-full px-6 flex items-center justify-between">

          {/* ── 메뉴 ── */}
          <div className="flex items-center gap-[50px] ml-[100px]">

            {/* 커리큘럼 계산기 */}
            <Link
              href="/curriculum"
              className={`px-3 py-1.5 rounded-md text-base font-medium transition-colors ${
                pathname.startsWith("/curriculum")
                  ? "text-[var(--color-brand)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              커리큘럼 계산기
            </Link>

            {/* 선배와의 연결 — 드롭다운 트리거 */}
            <div className="ml-[30px]" onMouseEnter={() => setOpenMenu("seniors")}>
              <button
                onClick={() => setOpenMenu(openMenu === "seniors" ? null : "seniors")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-base font-medium transition-colors ${
                  pathname.startsWith("/seniors") || openMenu === "seniors"
                    ? "text-[#094F7A]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                선배와의 연결
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={chevronStyle(openMenu === "seniors")}>
                  <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* 커리어 로드맵 — 드롭다운 트리거 */}
            <div className="ml-[30px]" onMouseEnter={() => setOpenMenu("roadmap")}>
              <button
                onClick={() => setOpenMenu(openMenu === "roadmap" ? null : "roadmap")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-base font-medium transition-colors ${
                  pathname.startsWith("/roadmap") || openMenu === "roadmap"
                    ? "text-[var(--color-brand)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                커리어 로드맵
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={chevronStyle(openMenu === "roadmap")}>
                  <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* ── 우측 액션 ── */}
        <div className="flex items-center gap-3 mr-6">

          <button
            onClick={async () => {
              await signOut();
              router.push("/login");
            }}
            style={logoutBtnStyle}
          >
            로그아웃
          </button>

          <Link href="/messages">
            <button style={messagesBtnStyle}>메시지함</button>
          </Link>

          {/* 구분선 */}
          <div className="mx-3" style={dividerStyle} />

          <Link href="/mypage">
            <div style={avatarWrapStyle(avatar.bg)}>
              <AvatarIcon fill={avatar.fill} bodyPath={avatar.bodyPath} size={28} />
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
