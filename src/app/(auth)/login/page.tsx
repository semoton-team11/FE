"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ── 이미지 위치 조정 ──────────────────────────
const IMG_SCALE = 2.1;       // 확대 배율 (클수록 확대)
const IMG_X = "50%";         // 좌우: 0% 왼쪽 ↔ 100% 오른쪽
const IMG_Y = "38%";         // 상하: 0% 위 ↔ 100% 아래
// ─────────────────────────────────────────────

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Supabase auth 연동
      console.log("login", form);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "var(--font-roboto), sans-serif" }}>

      {/* ── 왼쪽 폼 영역 ── */}
      <div
        style={{
          width: "50%",
          backgroundColor: "#F5F5F7",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 40px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "320px" }}>

          {/* 로고 */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
            <div
              style={{
                width: "48px",
                height: "32px",
                backgroundColor: "#D1D5DB",
                borderRadius: "6px",
              }}
            />
          </div>

          {/* 타이틀 */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#9A001F",
                lineHeight: 1.4,
                marginBottom: "8px",
              }}
            >
              Khunnect에 오신 것을{"\n"}환영합니다
            </h1>
            <p style={{ fontSize: "13px", color: "#6B7280", marginTop: "8px" }}>
              당신의 학업 여정을 스마트하게 설계하세요
            </p>
          </div>

          {/* 폼 */}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            {/* 이메일 */}
            <div>
              <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "6px" }}>이메일 (Email)</p>
              <input
                name="email"
                type="email"
                placeholder="example@university.ac.kr"
                value={form.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1.5px solid #D1D5DB",
                  padding: "6px 0",
                  fontSize: "14px",
                  color: "#1F1A1A",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#9A001F")}
                onBlur={(e) => (e.currentTarget.style.borderBottomColor = "#D1D5DB")}
              />
            </div>

            {/* 비밀번호 */}
            <div>
              <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "6px" }}>비밀번호 (Password)</p>
              <div style={{ position: "relative" }}>
                <input
                  name="password"
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1.5px solid #D1D5DB",
                    padding: "6px 32px 6px 0",
                    fontSize: "14px",
                    color: "#1F1A1A",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#9A001F")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "#D1D5DB")}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "2px",
                    color: "#9CA3AF",
                  }}
                >
                  {showPw ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "14px 0",
                border: "1.5px solid #9A001F",
                borderRadius: "8px",
                backgroundColor: "transparent",
                color: "#9A001F",
                fontSize: "15px",
                fontWeight: 600,
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.6 : 1,
                transition: "background-color 150ms ease, color 150ms ease",
                marginTop: "8px",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#9A001F";
                  (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "#9A001F";
              }}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </button>
          </form>

          {/* 회원가입 링크 */}
          <p style={{ textAlign: "center", marginTop: "24px", fontSize: "13px", color: "#6B7280" }}>
            계정이 없으신가요?{" "}
            <Link href="/signup" style={{ color: "#9A001F", fontWeight: 500 }}>
              회원가입
            </Link>
          </p>

        </div>
      </div>

      {/* ── 오른쪽 이미지 영역 ── */}
      <div style={{ width: "50%", position: "relative", overflow: "hidden" }}>
        <Image
          src="/campus.png"
          alt="캠퍼스"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "65% 53%",
            transform: "scale(2.8)",
            transformOrigin: "65% 53%",
          }}
          priority
        />
        {/* 어두운 오버레이 — opacity로 밝기 조절 (0 = 없음, 1 = 완전 검정) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "black",
            opacity: 0.25,
            pointerEvents: "none",
          }}
        />
      </div>

    </div>
  );
}
