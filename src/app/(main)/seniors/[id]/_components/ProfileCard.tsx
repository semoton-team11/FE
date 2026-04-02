"use client";

import type { Senior } from "@/types";

type ProfileCardProps = {
  senior: Senior;
  isSending: boolean;
  onConnect: () => void;
};

export default function ProfileCard({ senior, isSending, onConnect }: ProfileCardProps) {
  const imageSrc = senior.profileImage ?? "/profile-default-blue.svg";

  return (
    <div style={{ width: "368px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "20px" }}>

      <div style={{ width: "368px", height: "371px", borderRadius: "35px", overflow: "hidden" }}>
        <img
          src={imageSrc}
          alt={senior.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", border: "none", outline: "none" }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#1F1A1A" }}>{senior.name}</h1>
        <button style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#9A001F", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      </div>

      <p style={{ fontSize: "14px", color: "#9A001F", fontWeight: 400, marginTop: "-12px" }}>
        {senior.company} · {senior.jobTitle}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <svg width="56" height="40" viewBox="0 0 30 22" fill="#D1D5DB">
          <path d="M0 22V13.2C0 9.73333 0.733333 6.8 2.2 4.4C3.66667 2 6 0.266667 9.2 0L10.4 2C8.13333 2.4 6.4 3.46667 5.2 5.2C4.13333 6.93333 3.6 8.86667 3.6 11H7.6V22H0ZM17.6 22V13.2C17.6 9.73333 18.3333 6.8 19.8 4.4C21.2667 2 23.6 0.266667 26.8 0L28 2C25.7333 2.4 24 3.46667 22.8 5.2C21.7333 6.93333 21.2 8.86667 21.2 11H25.2V22H17.6Z" />
        </svg>
        <p style={{ fontSize: "14px", color: "#5C3F3F", lineHeight: 1.7 }}>{senior.bio}</p>
      </div>

      <button
        onClick={onConnect}
        disabled={isSending || !senior.isAvailable}
        style={{
          width: "100%",
          padding: "16px 0",
          backgroundColor: senior.isAvailable ? "#9A001F" : "#E5E7EB",
          color: senior.isAvailable ? "#FFFFFF" : "#9CA3AF",
          border: "none",
          borderRadius: "12px",
          fontSize: "15px",
          fontWeight: 600,
          cursor: senior.isAvailable ? "pointer" : "not-allowed",
          marginTop: "8px",
        }}
      >
        {isSending ? "연결 중..." : "선배와 연결하기"}
      </button>

    </div>
  );
}
