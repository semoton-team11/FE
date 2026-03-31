"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/services/auth";
import { getRandomAvatarIdx, saveAvatarIdx } from "@/lib/avatarVariants";
import UnderlineField from "./_components/UnderlineField";
import EyeButton from "./_components/EyeButton";
import StatusToggle from "./_components/StatusToggle";
import SignupCampusImage from "./_components/SignupCampusImage";

export default function SignupPage() {
  const router = useRouter();
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
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!form.department.trim()) {
      setError("학과를 입력해주세요.");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      // signUp 내부에서:
      //   1. supabase.auth.signUp() → 계정 생성
      //   2. departments 테이블에서 학과명으로 department_id 조회
      //   3. profiles 테이블에 { name, student_id, department_id, is_graduated } 저장
      // → 이 department_id가 커리큘럼 과목 조회의 기준이 됨
      const result = await signUp({
        email: form.email,
        password: form.password,
        name: form.name,
        studentId: form.studentId,
        department: form.department,
        isGraduated: form.status === "graduate",
      });
      if (!result.success) {
        setError(result.error ?? "회원가입 중 오류가 발생했습니다.");
        return;
      }
      saveAvatarIdx(getRandomAvatarIdx());
      router.push("/login");
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
            alignItems: "center",
            gap: "32px",
          }}
        >

          {/* ── 헤더 섹션: 로고 + 타이틀 ── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", width: "100%" }}>

            {/* 로고 */}
            <div
              style={{
                width: "48px",
                height: "32px",
                backgroundColor: "#D1D5DB",
                borderRadius: "6px",
              }}
            />

            {/* 타이틀 */}
            <div style={{ textAlign: "center" }}>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#9A001F",
                  lineHeight: 1.4,
                  marginBottom: "8px",
                }}
              >
                Khunnect에 오신 것을 환영합니다
              </h1>
              <p style={{ fontSize: "13px", color: "#5C3F3F", fontWeight: 700 }}>
                당신의 학업 여정을 스마트하게 설계하세요
              </p>
            </div>
          </div>

          {/* ── 폼 섹션 ── */}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}
          >
            <UnderlineField
              label="이메일 (Email)"
              name="email"
              type="email"
              placeholder="example@university.ac.kr"
              value={form.email}
              onChange={handleChange}
            />

            <UnderlineField
              label="이름 (Name)"
              name="name"
              placeholder="홍길동"
              value={form.name}
              onChange={handleChange}
            />

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

            <StatusToggle
              status={form.status}
              onStatusChange={(status) => setForm((p) => ({ ...p, status }))}
            />

            {/* 에러 메시지 */}
            {error && (
              <p style={{ fontSize: "13px", color: "#9A001F", textAlign: "center" }}>{error}</p>
            )}

            {/* 회원가입 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "10px 0",
                border: "1.5px solid #9A001F",
                boxShadow: "0 6px 8px -2px rgba(154,0,31,0.25)",
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

            {/* 로그인 링크 */}
            <p style={{ textAlign: "center", fontSize: "13px", color: "#6B7280" }}>
              이미 계정이 있으신가요?{" "}
              <Link href="/login" style={{ color: "#9A001F", fontWeight: 500 }}>
                로그인
              </Link>
            </p>

          </form>

        </div>
      </div>

      <SignupCampusImage />

    </div>
  );
}
