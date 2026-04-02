"use client";

import { CSSProperties, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/services/auth";
import { getRandomAvatarIdx, saveAvatarIdx } from "@/lib/avatarVariants";
import UnderlineField from "./_components/UnderlineField";
import EyeButton from "./_components/EyeButton";
import StatusToggle from "./_components/StatusToggle";
import SignupCampusImage from "./_components/SignupCampusImage";

const rootStyle: CSSProperties = {
  display: "flex",
  height: "100vh",
  fontFamily: "var(--font-roboto), sans-serif",
};

const leftPanelStyle: CSSProperties = {
  width: "50%",
  backgroundColor: "#F5F5F7",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "48px 40px",
  overflowY: "auto",
};

const formContainerStyle: CSSProperties = {
  display: "flex",
  width: "450px",
  flexDirection: "column",
  alignItems: "center",
  gap: "32px",
};

const headerSectionStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
  width: "100%",
};

const logoStyle: CSSProperties = {
  width: "48px",
  height: "32px",
  backgroundColor: "#D1D5DB",
  borderRadius: "6px",
};

const titleStyle: CSSProperties = {
  fontSize: "24px",
  fontWeight: 700,
  color: "#9A001F",
  lineHeight: 1.4,
  marginBottom: "8px",
};

const subtitleStyle: CSSProperties = {
  fontSize: "13px",
  color: "#5C3F3F",
  fontWeight: 700,
};

const formStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
};

const idDeptRowStyle: CSSProperties = {
  display: "flex",
  gap: "16px",
};

const idDeptColStyle: CSSProperties = {
  flex: 1,
};

const errorStyle: CSSProperties = {
  fontSize: "13px",
  color: "#9A001F",
  textAlign: "center",
};

const submitButtonBaseStyle: CSSProperties = {
  width: "100%",
  padding: "10px 0",
  border: "1.5px solid #9A001F",
  boxShadow: "0 6px 8px -2px rgba(154,0,31,0.25)",
  borderRadius: "8px",
  backgroundColor: "transparent",
  color: "#9A001F",
  fontSize: "15px",
  fontWeight: 600,
  transition: "background-color 150ms ease, color 150ms ease",
  marginTop: "4px",
};

const loginLinkRowStyle: CSSProperties = {
  textAlign: "center",
  fontSize: "13px",
  color: "#6B7280",
};

const loginLinkStyle: CSSProperties = {
  color: "#9A001F",
  fontWeight: 500,
};

function getSubmitButtonStyle(isLoading: boolean): CSSProperties {
  return {
    ...submitButtonBaseStyle,
    cursor: isLoading ? "not-allowed" : "pointer",
    opacity: isLoading ? 0.6 : 1,
  };
}

function handleSubmitMouseEnter(
  e: React.MouseEvent<HTMLButtonElement>,
  isLoading: boolean
) {
  if (!isLoading) {
    e.currentTarget.style.backgroundColor = "#9A001F";
    e.currentTarget.style.color = "#FFFFFF";
  }
}

function handleSubmitMouseLeave(e: React.MouseEvent<HTMLButtonElement>) {
  e.currentTarget.style.backgroundColor = "transparent";
  e.currentTarget.style.color = "#9A001F";
}

function SignupHeader() {
  return (
    <div style={headerSectionStyle}>
      <div style={logoStyle} />
      <div style={{ textAlign: "center" }}>
        <h1 style={titleStyle}>Khunnect에 오신 것을 환영합니다</h1>
        <p style={subtitleStyle}>당신의 학업 여정을 스마트하게 설계하세요</p>
      </div>
    </div>
  );
}

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
    <div style={rootStyle}>
      <div style={leftPanelStyle}>
        <div style={formContainerStyle}>
          <SignupHeader />

          <form onSubmit={handleSubmit} style={formStyle}>
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

            <div style={idDeptRowStyle}>
              <div style={idDeptColStyle}>
                <UnderlineField
                  label="학번 (Student ID)"
                  name="studentId"
                  placeholder="20240001"
                  value={form.studentId}
                  onChange={handleChange}
                />
              </div>
              <div style={idDeptColStyle}>
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

            {error && <p style={errorStyle}>{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              style={getSubmitButtonStyle(isLoading)}
              onMouseEnter={(e) => handleSubmitMouseEnter(e, isLoading)}
              onMouseLeave={handleSubmitMouseLeave}
            >
              {isLoading ? "처리 중..." : "회원가입"}
            </button>

            <p style={loginLinkRowStyle}>
              이미 계정이 있으신가요?{" "}
              <Link href="/login" style={loginLinkStyle}>
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
