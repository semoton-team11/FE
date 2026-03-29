"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getSeniors } from "@/services/seniors";
import { getDepartments } from "@/services/roadmap";
import type { Senior, Department } from "@/types";
import Link from "next/link";

// ── 학과명 영문 매핑 ──
const DEPT_EN: Record<string, string> = {
  "기계공학부": "Department of Mechanical Engineering",
  "산업경영공학과": "Department of Industrial & Management Engineering",
  "원자력공학과": "Department of Nuclear Engineering",
  "화학공학과": "Department of Chemical Engineering",
  "신소재공학과": "Department of Advanced Materials Engineering",
  "사회기반시스템공학과": "Department of Civil & Environmental Engineering",
  "건축공학과": "Department of Architectural Engineering",
  "환경학및환경공학과": "Department of Environmental Science & Engineering",
  "건축학과": "Department of Architecture",
  "산업디자인학과": "Department of Industrial Design",
  "시각디자인학과": "Department of Visual Communication Design",
  "환경조경디자인학과": "Department of Environmental Landscape Design",
  "디지털콘텐츠학과": "Department of Digital Contents",
  "도예학과": "Department of Ceramic Arts",
  "연극영화학화학과": "Department of Theater & Film",
  "PostModern음악과": "Department of PostModern Music",
  "컴퓨터공학과": "Department of Computer Science & Engineering",
  "소프트웨어융합학과": "Department of Software Convergence",
  "인공지능학과": "Department of Artificial Intelligence",
};

// ============================================================
// SeniorsPage
// ============================================================

export default function SeniorsPage() {
  const searchParams = useSearchParams();
  const deptName = searchParams.get("dept");

  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  // ── 학과 목록 로드 ──
  useEffect(() => {
    getDepartments().then(setDepartments);
  }, []);

  // ── 선배 목록 로드 (학과 필터 적용) ──
  useEffect(() => {
    if (departments.length === 0) return;

    if (deptName) {
      const dept = departments.find((d) => d.name === deptName);
      getSeniors({ departmentId: dept?.id }).then(setSeniors);
    } else {
      getSeniors().then(setSeniors);
    }
  }, [deptName, departments]);

  const deptEn = deptName ? DEPT_EN[deptName] ?? "" : "";

  return (
    <div className="flex flex-col gap-10">

      {/* ── 헤더 ── */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 700,
            color: "#1F1A1A",
            letterSpacing: "-0.5px",
          }}
        >
          {deptName ?? "선배와의 연결"}
        </h1>
        {deptEn && (
          <p style={{ fontSize: "14px", fontWeight: 400, color: "#9CA3AF" }}>
            {deptEn}
          </p>
        )}
      </div>

      {/* ── 카드 그리드 ── */}
      {seniors.length === 0 ? (
        <p className="text-center" style={{ color: "#9CA3AF", fontSize: "15px" }}>
          조건에 맞는 선배가 없습니다.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
        >
          {seniors.map((senior) => (
            <SeniorCard key={senior.id} senior={senior} />
          ))}
        </div>
      )}

    </div>
  );
}

// ============================================================
// SeniorCard
// ============================================================

function SeniorCard({ senior }: { senior: Senior }) {
  return (
    <Link href={`/seniors/${senior.id}`} style={{ display: "block" }}>
      <div
        style={{
          aspectRatio: "1 / 1",
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 20px 24px 20px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 1px 4px 0 rgba(0,0,0,0.06)",
          cursor: "pointer",
          transition: "box-shadow 200ms ease, transform 200ms ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 6px 20px 0 rgba(0,0,0,0.12)";
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 1px 4px 0 rgba(0,0,0,0.06)";
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        }}
      >
        {/* 아바타 */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -68%)",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "#F6EBEB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            fontWeight: 700,
            color: "#9A001F",
          }}
        >
          {senior.name[0]}
        </div>

        {/* 이름 + 직함 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#1F1A1A",
            }}
          >
            {senior.name}
          </span>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 400,
              color: "#9CA3AF",
            }}
          >
            {senior.company} · {senior.jobTitle}
          </span>

          {/* 가용 여부 뱃지 */}
          <div
            style={{
              marginTop: "8px",
              padding: "3px 10px",
              borderRadius: "9999px",
              backgroundColor: senior.isAvailable ? "#FFF8F7" : "#F3F4F6",
              color: senior.isAvailable ? "#9A001F" : "#9CA3AF",
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            {senior.isAvailable ? "커피챗 가능" : "현재 불가"}
          </div>
        </div>

      </div>
    </Link>
  );
}
