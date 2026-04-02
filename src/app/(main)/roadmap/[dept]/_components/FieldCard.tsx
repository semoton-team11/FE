"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { DeptField } from "../_lib/constants";

type FieldCardProps = {
  field: DeptField;
  deptName: string;
};

const cardStyle: CSSProperties = {
  backgroundColor: "#FFFFFF",
  borderRadius: "16px",
  display: "flex",
  height: "360px",
  padding: "24px",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  alignSelf: "start",
  justifySelf: "stretch",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  boxSizing: "border-box",
};

const iconWrapStyle: CSSProperties = {
  display: "flex",
  width: "64px",
  height: "64px",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
  borderRadius: "12px",
  backgroundColor: "#FCF1F1",
  fontSize: "28px",
  color: "#9A001F",
};

const fieldNameStyle: CSSProperties = {
  fontSize: "24px",
  fontWeight: 600,
  fontStyle: "normal",
  color: "#1F1A1A",
  lineHeight: "100%",
  fontFamily: "var(--font-roboto), sans-serif",
  alignSelf: "stretch",
};

const descriptionStyle: CSSProperties = {
  fontSize: "16px",
  fontWeight: 400,
  fontStyle: "normal",
  color: "#5C3F3F",
  lineHeight: "26px",
  fontFamily: "var(--font-roboto), sans-serif",
  alignSelf: "stretch",
};

const roadmapLinkStyle: CSSProperties = {
  display: "flex",
  alignSelf: "stretch",
  padding: "18px 0",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#9A001F",
  color: "#FFFFFF",
  borderRadius: "8px",
  fontSize: "13px",
  fontWeight: 600,
  textDecoration: "none",
  boxShadow: "0 4px 12px rgba(154,0,31,0.25)",
};

export default function FieldCard({ field, deptName }: FieldCardProps) {
  return (
    <div style={cardStyle}>
      <div style={iconWrapStyle}>
        {field.icon as React.ReactNode}
      </div>

      <p style={fieldNameStyle}>
        {field.name}
      </p>

      <p style={descriptionStyle}>
        {field.description}
      </p>

      <Link
        href={`/roadmap/${encodeURIComponent(deptName)}/${field.fieldId}`}
        style={roadmapLinkStyle}
      >
        로드맵 보기
      </Link>
    </div>
  );
}
