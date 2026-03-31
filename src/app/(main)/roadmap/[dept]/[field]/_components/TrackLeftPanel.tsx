"use client";

import Link from "next/link";
import type { TrackMeta } from "../_lib/constants";

type TrackLeftPanelProps = {
  track: TrackMeta;
  deptName: string;
};

export default function TrackLeftPanel({ track, deptName }: TrackLeftPanelProps) {
  return (
    <div
      style={{
        width: "320px",
        flexShrink: 0,
        backgroundColor: "#FFFFFF",
        borderRadius: "20px",
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {/* 제목 */}
      <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#1F1A1A", lineHeight: "1.3" }}>
        {track.title}
      </h2>

      {/* JOB DEFINITION */}
      <div>
        <p style={{ fontSize: "12px", fontWeight: 600, color: "#78716C", letterSpacing: "0.6px", textTransform: "uppercase", lineHeight: "16px", marginBottom: "8px" }}>
          Job Definition
        </p>
        <p style={{ fontSize: "16px", color: "#292524", fontWeight: 400, lineHeight: "26px" }}>
          {track.jobDefinition}
        </p>
      </div>

      {/* CORE SKILLS */}
      <div>
        <p style={{ fontSize: "12px", fontWeight: 600, color: "#78716C", letterSpacing: "0.6px", textTransform: "uppercase", lineHeight: "16px", marginBottom: "10px" }}>
          Core Skills
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {track.coreSkills.map((skill) => (
            <span
              key={skill}
              style={{
                padding: "6px 14px",
                borderRadius: "6px",
                border: "1.5px solid #E5E7EB",
                fontSize: "12px",
                color: "#44403C",
                fontWeight: 600,
                lineHeight: "16px",
                textAlign: "center",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* DATA INSIGHTS */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M9 12V6.75H12V12H9ZM4.5 12V0H7.5V12H4.5ZM0 12V3.75H3V12H0Z" fill="#9A001F"/>
          </svg>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#1F1A1A" }}>
            Data Insights: 선배들의 필수 강의
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {track.dataInsights.map((item) => (
            <div key={item.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ fontSize: "10px", color: "#78716C", fontWeight: 400, lineHeight: "15px" }}>{item.label}</span>
                <span style={{ fontSize: "10px", color: "#78716C", fontWeight: 600, lineHeight: "15px" }}>{item.percent}%</span>
              </div>
              <div style={{ height: "4px", backgroundColor: "#E7E5E4", borderRadius: "9999px" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${item.percent}%`,
                    backgroundColor: "#9A001F",
                    borderRadius: "9999px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 선배에게 질문하기 버튼 */}
      <Link
        href="/seniors"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "16px 0",
          backgroundColor: "#094F7A",
          color: "#FFF",
          borderRadius: "12px",
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "24px",
          textAlign: "center",
          textDecoration: "none",
        }}
      >
        선배에게 질문하기
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z" fill="white"/>
        </svg>
      </Link>
    </div>
  );
}
