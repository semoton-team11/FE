"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const SENIORS_MEGA_MENU = [
  {
    college: "공과대학",
    departments: [
      "기계공학부", "산업경영공학과", "원자력공학과", "화학공학과",
      "신소재공학과", "사회기반시스템공학과", "건축공학과", "환경학및환경공학과", "건축학과",
    ],
  },
  {
    college: "예술디자인대학",
    departments: [
      "산업디자인학과", "시각디자인학과", "환경조경디자인학과",
      "디지털콘텐츠학과", "도예학과", "연극영화학화학과", "PostModern음악과",
    ],
  },
  {
    college: "소프트웨어융합대학",
    departments: ["컴퓨터공학과", "소프트웨어융합학과", "인공지능학과"],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <nav
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md"
      style={{
        borderBottom: "1.5px solid rgba(241,245,249,0.5)",
        boxShadow: "0 2px 12px 0 rgba(0,0,0,0.06)",
        position: "relative",
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

            {/* 커리어 로드맵 */}
            <Link
              href="/roadmap"
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                pathname.startsWith("/roadmap")
                  ? "text-[var(--color-brand)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              커리어 로드맵
            </Link>

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
            <Avatar className="w-8 h-8 cursor-pointer">
              <AvatarFallback className="bg-muted text-xs font-bold">나</AvatarFallback>
            </Avatar>
          </Link>

        </div>
      </div>

      {/* ── 전체 너비 메가 드롭다운 — nav 기준 absolute ── */}
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          backgroundColor: "white",
          borderBottom: "1.5px solid rgba(241,245,249,0.8)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.10)",
          transformOrigin: "top center",
          transform: openMenu === "seniors"
            ? "translateY(0) scaleY(1)"
            : "translateY(-12px) scaleY(0.96)",
          opacity: openMenu === "seniors" ? 1 : 0,
          pointerEvents: openMenu === "seniors" ? "auto" : "none",
          transition: "opacity 320ms cubic-bezier(0.16,1,0.3,1), transform 320ms cubic-bezier(0.16,1,0.3,1)",
          zIndex: 40,
        }}
      >
        <div
          className="max-w-[1280px] mx-auto"
          style={{
            paddingTop: "36px",
            paddingBottom: "36px",
            paddingLeft: "100px",
            paddingRight: "24px",
          }}
        >
          <div className="grid grid-cols-3 gap-6">
            {SENIORS_MEGA_MENU.map((col, colIdx) => (
              <div key={col.college} className="flex flex-col gap-4">

                {/* 단과대학명 */}
                <p
                  className="text-xs font-semibold text-[#9CA3AF] tracking-widest uppercase"
                  style={{
                    transition: `opacity 300ms ease ${colIdx * 60}ms, transform 300ms ease ${colIdx * 60}ms`,
                    opacity: openMenu === "seniors" ? 1 : 0,
                    transform: openMenu === "seniors" ? "translateY(0)" : "translateY(-10px)",
                  }}
                >
                  {col.college}
                </p>

                {/* 학과 목록 */}
                <div className="flex flex-col gap-2">
                  {col.departments.map((dept, deptIdx) => (
                    <Link
                      key={dept}
                      href={`/seniors?dept=${encodeURIComponent(dept)}`}
                      className="text-sm text-[#1F1A1A] hover:text-[#9A001F] transition-colors"
                      style={{
                        transition: `opacity 280ms ease ${colIdx * 60 + deptIdx * 25 + 80}ms, transform 280ms ease ${colIdx * 60 + deptIdx * 25 + 80}ms`,
                        opacity: openMenu === "seniors" ? 1 : 0,
                        transform: openMenu === "seniors" ? "translateY(0)" : "translateY(-8px)",
                      }}
                      onClick={() => setOpenMenu(null)}
                    >
                      {dept}
                    </Link>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
