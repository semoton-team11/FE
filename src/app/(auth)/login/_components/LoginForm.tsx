"use client";

import { useState } from "react";
import Link from "next/link";

type LoginFormProps = {
  form: { email: string; password: string };
  errors: { email?: string; password?: string };
  showPw: boolean;
  isLoading: boolean;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleShowPw: () => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function LoginForm({
  form,
  errors,
  showPw,
  isLoading,
  onFormChange,
  onToggleShowPw,
  onSubmit,
}: LoginFormProps) {
  return (
    <div style={{ width: "100%", maxWidth: "320px", display: "flex", flexDirection: "column", gap: "0px" }}>

      {/* 로고 */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
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
      <h1
        style={{
          fontSize: "24px",
          fontWeight: 700,
          color: "#1F1A1A",
          textAlign: "center",
          marginBottom: "28px",
        }}
      >
        Welcome back
      </h1>

      {/* 구글 로그인 버튼 */}
      <button
        type="button"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "12px 0",
          border: "1.5px solid #E6BDBB",
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
          fontSize: "14px",
          fontWeight: 500,
          color: "#1F1A1A",
          cursor: "pointer",
          marginBottom: "20px",
          transition: "background-color 150ms ease, color 150ms ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#9A001F";
          (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FFFFFF";
          (e.currentTarget as HTMLButtonElement).style.color = "#1F1A1A";
        }}
      >
        {/* 구글 아이콘 */}
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
        구글로 계속하기
      </button>

      {/* 또는 구분선 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <div style={{ flex: 1, height: "1px", backgroundColor: "#EBE0E0" }} />
        <span style={{ fontSize: "12px", color: "#916F6E" }}>또는</span>
        <div style={{ flex: 1, height: "1px", backgroundColor: "#EBE0E0" }} />
      </div>

      {/* 폼 */}
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        {/* 이메일 */}
        <div>
          <p style={{ fontSize: "12px", color: "#5C3F3F", marginBottom: "6px" }}>이메일 주소</p>
          <input
            className="auth-input"
            name="email"
            type="email"
            placeholder="example@university.ac.kr"
            value={form.email}
            onChange={onFormChange}
            style={{
              width: "100%",
              background: "transparent",
              border: errors.email ? "1.5px solid #9A001F" : "none",
              borderBottom: errors.email ? "1.5px solid #9A001F" : "1.5px solid #E6BDBB99",
              borderRadius: errors.email ? "6px" : "0",
              padding: errors.email ? "6px 10px" : "6px 0",
              fontSize: "14px",
              color: "#1F1A1A",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 200ms ease",
            }}
            onFocus={(e) => {
              if (!errors.email) e.currentTarget.style.borderBottomColor = "#9A001F";
            }}
            onBlur={(e) => {
              if (!errors.email && !e.currentTarget.value) {
                e.currentTarget.style.borderBottomColor = "#E6BDBB99";
              }
            }}
          />
          {errors.email && (
            <p style={{ fontSize: "12px", color: "#9A001F", marginTop: "6px" }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* 비밀번호 */}
        <div>
          <p style={{ fontSize: "12px", color: "#5C3F3F", marginBottom: "6px" }}>비밀번호 (Password)</p>
          <div style={{ position: "relative" }}>
            <input
              className="auth-input"
              name="password"
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              value={form.password}
              onChange={onFormChange}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                borderBottom: errors.password ? "1.5px solid #9A001F" : "1.5px solid #E6BDBB99",
                padding: "6px 32px 6px 0",
                fontSize: "14px",
                color: "#1F1A1A",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-bottom-color 200ms ease",
              }}
              onFocus={(e) => {
                if (!errors.password) e.currentTarget.style.borderBottomColor = "#9A001F";
              }}
              onBlur={(e) => {
                if (!errors.password && !e.currentTarget.value) {
                  e.currentTarget.style.borderBottomColor = "#E6BDBB99";
                }
              }}
            />
            <button
              type="button"
              onClick={onToggleShowPw}
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
          {errors.password && (
            <p style={{ fontSize: "12px", color: "#9A001F", marginTop: "6px" }}>
              {errors.password}
            </p>
          )}
        </div>

        {/* 로그인 버튼 */}
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "14px 0",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#9A001F",
            color: "#FFFFFF",
            fontSize: "15px",
            fontWeight: 600,
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.7 : 1,
            transition: "opacity 150ms ease",
            marginTop: "4px",
            boxShadow: "0 6px 8px -2px rgba(154,0,31,0.25)",
          }}
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>

      {/* 하단 링크 3개 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "24px",
        }}
      >
        <div style={{ display: "flex", gap: "20px" }}>
          <Link href="/signup" style={{ fontSize: "13px", color: "#5C3F3F", textDecoration: "none" }}>
            회원가입
          </Link>
          <Link href="/forgot-password" style={{ fontSize: "13px", color: "#5C3F3F", textDecoration: "none" }}>
            비밀번호 찾기
          </Link>
        </div>
        <Link href="/support" style={{ fontSize: "13px", color: "#5C3F3F", textDecoration: "none" }}>
          고객 센터
        </Link>
      </div>

    </div>
  );
}
