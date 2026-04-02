"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/services/auth";
import LoginForm from "./_components/LoginForm";
import CampusImage from "./_components/CampusImage";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // 입력 시 해당 필드 에러 초기화
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!validateEmail(form.email)) {
      newErrors.email = "유효한 이메일 주소를 입력하세요";
    }
    if (form.password.length < 6) {
      newErrors.password = "비밀번호를 잘못 입력하셨습니다";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Supabase auth 연동
      // const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
      // if (error) {
      //   setErrors({ password: "비밀번호를 잘못 입력하셨습니다" });
      //   return;
      // }
      const result = await signIn(form.email, form.password);

      if (result.success) {
        router.push("/"); 
      } else {
        setErrors({ 
          email: " ",
          password: result.error || "이메일 또는 비밀번호를 확인하세요" 
        });
      }
      // console.log("login", form);
    } catch (e) {
      setErrors({ password: "로그인 중 서버 오류가 발생했습니다." });
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
          backgroundColor: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 40px",
        }}
      >
        <LoginForm
          form={form}
          errors={errors}
          showPw={showPw}
          isLoading={isLoading}
          onFormChange={handleChange}
          onToggleShowPw={() => setShowPw((v) => !v)}
          onSubmit={handleSubmit}
        />
      </div>

      <CampusImage />

    </div>
  );
}
