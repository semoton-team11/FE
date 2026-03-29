"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const PAGES = [
  { label: "홈", href: "/" },
  { label: "커리큘럼", href: "/curriculum" },
  { label: "로드맵", href: "/roadmap" },
  { label: "선배 목록", href: "/seniors" },
  { label: "선배 상세", href: "/seniors/senior-1" },
  { label: "마이페이지", href: "/mypage" },
  { label: "메시지", href: "/messages" },
  { label: "로그인", href: "/login" },
  { label: "회원가입", href: "/signup" },
];

export default function DevNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <>
      {/* 토글 버튼 — 항상 표시 */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "fixed",
          left: open ? "144px" : "0px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 51,
          backgroundColor: "#18181b",
          color: "#a1a1aa",
          border: "none",
          borderRadius: "0 6px 6px 0",
          padding: "8px 4px",
          cursor: "pointer",
          fontSize: "10px",
          transition: "left 200ms ease",
          lineHeight: 1,
        }}
        title={open ? "DevNav 닫기" : "DevNav 열기"}
      >
        {open ? "◀" : "▶"}
      </button>

      {/* 패널 */}
      <nav
        style={{
          position: "fixed",
          left: open ? "0px" : "-144px",
          top: 0,
          height: "100%",
          width: "144px",
          transition: "left 200ms ease",
          zIndex: 50,
        }}
        className="bg-zinc-900 text-zinc-100 text-xs flex flex-col gap-1 p-2 pt-4 overflow-y-auto"
      >
        <p className="text-zinc-500 font-semibold mb-2 px-1">DEV NAV</p>
        {PAGES.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className={`px-2 py-1.5 rounded transition-colors hover:bg-zinc-700 ${
              pathname === page.href ? "bg-zinc-700 text-white" : "text-zinc-400"
            }`}
          >
            {page.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
