"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getSeniors } from "@/services/seniors";
import { getDepartments } from "@/services/roadmap";
import type { Senior, Department } from "@/types";
import SeniorsHero from "./_components/SeniorsHero";
import SeniorCard from "./_components/SeniorCard";

function SeniorsPageInner() {
  const searchParams = useSearchParams();
  const deptName = searchParams.get("dept");

  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  // ── 학과 목록 로드 ──
  useEffect(() => {
    getDepartments().then(setDepartments);
  }, []);

  // ── 선배 목록 로드 ──
  useEffect(() => {
    if (departments.length === 0) return;
    if (!deptName) { setSeniors([]); return; }
    const dept = departments.find((d) => d.name === deptName);
    getSeniors({ departmentId: dept?.id }).then(setSeniors);
  }, [deptName, departments]);

  return (
    <div style={{ fontFamily: "var(--font-roboto), sans-serif" }}>

      <SeniorsHero />

      {/* ── 본문 ── */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 80px" }}>

        {/* 학과명 헤더 */}
        <h2
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#1F1A1A",
            marginBottom: "20px",
          }}
        >
          {deptName ?? "전체 선배"}
        </h2>

        {/* 선배 카드 그리드 */}
        {seniors.length === 0 ? (
          <p style={{ color: "#9CA3AF", fontSize: "15px" }}>
            조건에 맞는 선배가 없습니다.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            {seniors.map((senior) => (
              <SeniorCard key={senior.id} senior={senior} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SeniorsPage() {
  return (
    <Suspense fallback={<div />}>
      <SeniorsPageInner />
    </Suspense>
  );
}
