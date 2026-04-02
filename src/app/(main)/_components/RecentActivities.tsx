"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRecentActivities, formatTimeAgo, type RecentActivity } from "@/lib/recentActivity";
import type { CSSProperties } from "react";

const TYPE_COLORS: Record<RecentActivity["type"], string> = {
  senior:     "#9A001F",
  roadmap:    "#094F7A",
  curriculum: "#4A7FC1",
  messages:   "#E67E22",
  mypage:     "#735B24",
  calendar:   "#4CAF50",
};

const TYPE_ICONS: Record<RecentActivity["type"], string> = {
  senior:     "👤",
  roadmap:    "🗺",
  curriculum: "📋",
  messages:   "✉",
  mypage:     "⚙",
  calendar:   "📅",
};

export default function RecentActivities() {
  const [activities, setActivities] = useState<RecentActivity[]>([]);

  useEffect(() => {
    setActivities(getRecentActivities());
  }, []);

  const titleStyle: CSSProperties = {
    fontSize: "20px",
    fontWeight: 700,
    color: "#1F1A1A",
    marginBottom: "16px",
  };

  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
  };

  const emptyStyle: CSSProperties = {
    fontSize: "14px",
    color: "#9CA3AF",
    padding: "24px 0",
  };

  return (
    <section>
      <h2 style={titleStyle}>최근 활동</h2>
      {activities.length === 0 ? (
        <p style={emptyStyle}>아직 최근 활동이 없습니다.</p>
      ) : (
        <div style={gridStyle}>
          {activities.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              style={{
                border: "1px solid #EBE0E0",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                backgroundColor: "#FFFFFF",
                textDecoration: "none",
                transition: "box-shadow 150ms ease",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: TYPE_COLORS[item.type],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                }}
              >
                {TYPE_ICONS[item.type]}
              </div>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 500, color: "#1F1A1A" }}>
                  {item.label}
                </p>
                <p style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "2px" }}>
                  {item.sub} · {formatTimeAgo(item.timestamp)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
