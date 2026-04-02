"use client";

import { useParams } from "next/navigation";
import type { CSSProperties } from "react";
import { DEPT_EN, DEPT_FIELDS, DEFAULT_FIELDS } from "./_lib/constants";
import DeptHero from "./_components/DeptHero";
import FieldCard from "./_components/FieldCard";

const pageStyle: CSSProperties = {
  fontFamily: "var(--font-roboto), sans-serif",
};

const fullWidthStyle: CSSProperties = {
  marginLeft: "calc(-50vw + 50%)",
  width: "100vw",
};

const contentStyle: CSSProperties = {
  maxWidth: "1280px",
  margin: "0 auto",
  padding: "80px 24px 100px",
};

const sectionStyle: CSSProperties = {
  marginBottom: "60px",
};

const sectionHeadingStyle: CSSProperties = {
  fontSize: "48px",
  fontWeight: 400,
  fontStyle: "normal",
  color: "#1F1A1A",
  lineHeight: "48px",
  letterSpacing: "-1.2px",
  fontFamily: "var(--font-roboto), sans-serif",
  marginBottom: "12px",
};

const sectionDescStyle: CSSProperties = {
  fontSize: "18px",
  fontWeight: 400,
  fontStyle: "normal",
  color: "#5C3F3F",
  lineHeight: "28px",
  fontFamily: "var(--font-roboto), sans-serif",
  marginBottom: "40px",
};

const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "16px",
};

export default function RoadmapDeptPage() {
  const { dept } = useParams<{ dept: string }>();
  const deptName = decodeURIComponent(dept);
  const deptEn = DEPT_EN[deptName] ?? "";
  const fields = DEPT_FIELDS[deptName] ?? DEFAULT_FIELDS;

  return (
    <div style={pageStyle}>
      <DeptHero deptName={deptName} deptEn={deptEn} />

      <div style={fullWidthStyle}>
        <div style={contentStyle}>
          <div style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>
              세부 분야 탐색
            </h2>
            <p style={sectionDescStyle}>
              우리의 환경, 디지털 경험, 그리고 미래의 모빌리티를 형성하는 구체적인 학문 분야를 깊이 있게 살펴보세요.
            </p>

            <div style={gridStyle}>
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
