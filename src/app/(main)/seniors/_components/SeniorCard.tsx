"use client";

import Link from "next/link";
import type { Senior } from "@/types";
import { getAvatarVariantForId } from "@/lib/avatarVariants";

export default function SeniorCard({ senior }: { senior: Senior }) {
  const avatarVariant = getAvatarVariantForId(senior.id);
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "20px",
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        width: "340px",
        height: "450px",
      }}
    >

      {/* ── 1행: 아바타 + 상담 가능 뱃지 ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>

        {/* 아바타 */}
        <div
          style={{
            width: "76px",
            height: "76px",
            borderRadius: "14px",
            backgroundColor: senior.profileImage ? "#00000033" : avatarVariant.bg,
            overflow: "hidden",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {senior.profileImage ? (
            <img src={senior.profileImage} alt={senior.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={avatarVariant.stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          )}
        </div>

        {/* 상태 뱃지 */}
        <span
          style={{
            display: "flex",
            padding: "6px 16px",
            flexDirection: "column",
            alignItems: "flex-start",
            borderRadius: "9999px",
            fontSize: "12px",
            fontWeight: 400,
            backgroundColor: senior.isAvailable ? "#2E67934D" : "#FCF1F1",
            color: senior.isAvailable ? "#094F7A" : "#5C3F3F",
          }}
        >
          {senior.isAvailable ? "상담 가능" : "상담 중"}
        </span>
      </div>

      {/* ── 2행: 이름 ── */}
      <p style={{ fontSize: "30px", fontWeight: 400, fontStyle: "normal", color: "#1F1A1A", lineHeight: "36px", fontFamily: "var(--font-roboto), sans-serif" }}>
        {senior.name}
      </p>

      {/* ── 3행: 학과 · 졸업연도 ── */}
      <p style={{ fontSize: "16px", fontWeight: 440, fontStyle: "normal", color: "#9A001F", lineHeight: "24px", fontFamily: "var(--font-roboto), sans-serif", marginTop: "-8px" }}>
        {senior.department} · {senior.graduationYear}년 졸업
      </p>

      {/* ── 4행: 전문 분야 + 스킬 태그 ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px" }}>
        <p style={{ fontSize: "12px", fontWeight: 400, fontStyle: "normal", color: "#916F6E", lineHeight: "16px", fontFamily: "var(--font-roboto), sans-serif", letterSpacing: "1.2px", textTransform: "uppercase" }}>전문 분야</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {senior.skills.map((skill) => (
            <span
              key={skill}
              style={{
                display: "flex",
                height: "36px",
                padding: "8px 16px",
                flexDirection: "column",
                alignItems: "flex-start",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 480,
                backgroundColor: "#F6EBEB",
                color: "#5C3F3F",
                boxSizing: "border-box",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* ── 5행: 프로필 보기 버튼 ── */}
      <Link
        href={`/seniors/${senior.id}`}
        style={{
          display: "flex",
          width: "301.33px",
          padding: "20px 0",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "auto",
          backgroundColor: "#9A001F",
          color: "#FFFFFF",
          borderRadius: "16px",
          fontSize: "14px",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        프로필 보기
      </Link>

    </div>
  );
}
