"use client";

import { useParams } from "next/navigation";
import { DEPT_EN, DEPT_FIELDS, DEFAULT_FIELDS } from "./_lib/constants";
import DeptHero from "./_components/DeptHero";
import FieldCard from "./_components/FieldCard";

export default function RoadmapDeptPage() {
  const { dept } = useParams<{ dept: string }>();
  const deptName = decodeURIComponent(dept);
  const deptEn = DEPT_EN[deptName] ?? "";
  const fields = DEPT_FIELDS[deptName] ?? DEFAULT_FIELDS;

  return (
    <div style={{ fontFamily: "var(--font-roboto), sans-serif" }}>

      <DeptHero deptName={deptName} deptEn={deptEn} />

      {/* ── 본문 ── */}
      <div style={{
        marginLeft: "calc(-50vw + 50%)",
        width: "100vw",
      }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 24px 100px" }}>

        {/* 세부 분야 탐색 */}
        <div style={{ marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "48px",
              fontWeight: 400,
              fontStyle: "normal",
              color: "#1F1A1A",
              lineHeight: "48px",
              letterSpacing: "-1.2px",
              fontFamily: "var(--font-roboto), sans-serif",
              marginBottom: "12px",
            }}
          >
            세부 분야 탐색
          </h2>
          <p style={{ fontSize: "18px", fontWeight: 400, fontStyle: "normal", color: "#5C3F3F", lineHeight: "28px", fontFamily: "var(--font-roboto), sans-serif", marginBottom: "40px" }}>
            우리의 환경, 디지털 경험, 그리고 미래의 모빌리티를 형성하는 구체적인 학문 분야를 깊이 있게 살펴보세요.
          </p>

          {/* 분야 카드 그리드 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
          >
            {fields.map((field) => (
              <FieldCard key={field.name} field={field} deptName={deptName} />
            ))}
          </div>
        </div>

      </div>
      </div>
    </div>
  );
}
