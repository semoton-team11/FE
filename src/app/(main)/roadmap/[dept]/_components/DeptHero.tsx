"use client";

import type { CSSProperties } from "react";

type DeptHeroProps = {
  deptName: string;
  deptEn: string;
};

const heroStyle: CSSProperties = {
  backgroundColor: "#FFF8F7",
  padding: "80px 0 100px",
  textAlign: "center",
  marginLeft: "calc(-50vw + 50%)",
  marginTop: "calc(-49.54px)",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
};

const headingStyle: CSSProperties = {
  fontSize: "40px",
  fontWeight: 700,
  color: "#1F1A1A",
};

const subheadingStyle: CSSProperties = {
  fontSize: "15px",
  color: "#9A001F",
  fontWeight: 400,
};

export default function DeptHero({ deptName, deptEn }: DeptHeroProps) {
  return (
    <div style={heroStyle}>
      <h1 style={headingStyle}>
        {deptName}
      </h1>
      {deptEn && (
        <p style={subheadingStyle}>
          {deptEn}
        </p>
      )}
    </div>
  );
}
