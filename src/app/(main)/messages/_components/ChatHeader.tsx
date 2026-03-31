"use client";

import type { Senior } from "@/types";
import IconButton from "./IconButton";

type ChatHeaderProps = {
  senior: Senior | null;
};

export default function ChatHeader({ senior }: ChatHeaderProps) {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #F1F5F9",
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {/* 아바타 + 온라인 표시 */}
      <div style={{ position: "relative" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "#E5E7EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: 700,
            color: "#9CA3AF",
          }}
        >
          {senior?.name[0] ?? "?"}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "2px",
            right: "2px",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: senior?.isAvailable ? "#22C55E" : "#FF5464",
            border: "2px solid white",
          }}
        />
      </div>

      {/* 이름 + 상태 */}
      <div>
        <p style={{ fontSize: "15px", fontWeight: 700, color: "#1F1A1A" }}>
          {senior?.name ?? "선배님"} 선배님
        </p>
        <p style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "2px" }}>
          {senior?.isAvailable ? "온라인" : "오프라인"} · {senior?.jobTitle ?? ""}
        </p>
      </div>

      {/* 우측 아이콘 */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "20px" }}>
        <IconButton>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </IconButton>
        <IconButton>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
        </IconButton>
        <IconButton>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </IconButton>
      </div>
    </div>
  );
}
