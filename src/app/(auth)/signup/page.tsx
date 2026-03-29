"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ── 이미지 위치 조정 ──────────────────────────
const IMG_SCALE = 2.0;       // 확대 배율 (클수록 확대)
const IMG_X = "65%";         // 좌우: 0% 왼쪽 ↔ 100% 오른쪽
const IMG_Y = "30%";         // 상하: 0% 위 ↔ 100% 아래
// ─────────────────────────────────────────────

export default function SignupPage() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    studentId: "",
    department: "",
    status: "current" as "current" | "graduate",
  });
  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    setIsLoading(true);
    try {
      // TODO: Supabase auth 연동
      console.log("signup", form);
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
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "450px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "68px",
          }}
        >
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
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
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
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* 이메일 */}
            <UnderlineField
              label="이메일 (Email)"
              name="email"
              type="email"
              placeholder="example@university.ac.kr"
              value={form.email}
              onChange={handleChange}
            />

            {/* 이름 */}
            <UnderlineField
              label="이름 (Name)"
              name="name"
              placeholder="홍길동"
              value={form.name}
              onChange={handleChange}
            />

            {/* 비밀번호 */}
            <UnderlineField
              label="비밀번호 (Password)"
              name="password"
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              rightIcon={
                <EyeButton show={showPw} onToggle={() => setShowPw((v) => !v)} />
              }
            />

            {/* 비밀번호 확인 */}
            <UnderlineField
              label="비밀번호 확인 (Verify Password)"
              name="passwordConfirm"
              type={showPwConfirm ? "text" : "password"}
              placeholder="••••••••"
              value={form.passwordConfirm}
              onChange={handleChange}
              rightIcon={
                <EyeButton show={showPwConfirm} onToggle={() => setShowPwConfirm((v) => !v)} />
              }
            />

            {/* 학번 + 학과 */}
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <UnderlineField
                  label="학번 (Student ID)"
                  name="studentId"
                  placeholder="20240001"
                  value={form.studentId}
                  onChange={handleChange}
                />
              </div>
              <div style={{ flex: 1 }}>
                <UnderlineField
                  label="학과 (Department)"
                  name="department"
                  placeholder="경영학과"
                  value={form.department}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* 재학/졸업 토글 */}
            <div>
              <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "8px" }}>
                재학/졸업 여부 (Status)
              </p>
              <div
                style={{
                  display: "flex",
                  border: "1px solid #9A001F",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, status: "current" }))}
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    fontSize: "13px",
                    fontWeight: 500,
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: form.status === "current" ? "#9A001F" : "transparent",
                    color: form.status === "current" ? "#FFFFFF" : "#9A001F",
                    transition: "all 150ms ease",
                  }}
                >
                  재학 (Current)
                </button>
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, status: "graduate" }))}
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    fontSize: "13px",
                    fontWeight: 500,
                    border: "none",
                    borderLeft: "1px solid #9A001F",
                    cursor: "pointer",
                    backgroundColor: form.status === "graduate" ? "#9A001F" : "transparent",
                    color: form.status === "graduate" ? "#FFFFFF" : "#9A001F",
                    transition: "all 150ms ease",
                  }}
                >
                  졸업 (Graduate)
                </button>
              </div>
            </div>

            {/* 회원가입 버튼 */}
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
                marginTop: "4px",
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
              {isLoading ? "처리 중..." : "회원가입"}
            </button>
          </form>

          {/* 로그인 링크 */}
          <p style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: "#6B7280" }}>
            이미 계정이 있으신가요?{" "}
            <Link href="/login" style={{ color: "#9A001F", fontWeight: 500 }}>
              로그인
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

// ============================================================
// 공통 컴포넌트
// ============================================================

function UnderlineField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  rightIcon,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightIcon?: React.ReactNode;
}) {
  return (
    <div>
      <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "6px" }}>{label}</p>
      <div style={{ position: "relative" }}>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
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
        {rightIcon && (
          <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}>
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}

function EyeButton({ show, onToggle }: { show: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "2px",
        color: "#9CA3AF",
      }}
    >
      {show ? (
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
  );
}
