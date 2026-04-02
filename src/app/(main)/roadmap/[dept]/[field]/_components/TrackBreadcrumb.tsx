"use client";

import Link from "next/link";
import type { CSSProperties } from "react";

type TrackBreadcrumbProps = {
  deptName: string;
  breadcrumbField: string;
};

const wrapperStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "8px",
};

const linkStyle: CSSProperties = {
  fontSize: "12px",
  color: "#9CA3AF",
  textDecoration: "none",
  letterSpacing: "1px",
  fontWeight: 500,
};

const separatorStyle: CSSProperties = {
  fontSize: "12px",
  color: "#9CA3AF",
};

const currentStyle: CSSProperties = {
  fontSize: "12px",
  color: "#9A001F",
  letterSpacing: "1px",
  fontWeight: 600,
};

export default function TrackBreadcrumb({ deptName, breadcrumbField }: TrackBreadcrumbProps) {
  return (
    <div style={wrapperStyle}>
      <Link href={`/roadmap/${encodeURIComponent(deptName)}`} style={linkStyle}>
        CAREER PATHS
      </Link>
      <span style={separatorStyle}>/</span>
      <span style={currentStyle}>
        {breadcrumbField}
      </span>
    </div>
  );
}
