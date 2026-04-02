"use client";

import { useState } from "react";
import Link from "next/link";
import type { CSSProperties } from "react";

const MOCK_EVENTS = [
  { date: "2026-04-05", time: "오전 10:00", title: "대균 선배와 함께 하는 포폴 리뷰, 1층 예디대 건물" },
  { date: "2026-04-15", time: "오후 2:00",  title: "김성백 선배 커피챗" },
  { date: "2026-04-20", time: "오전 11:00", title: "포트폴리오 피드백 미팅" },
];

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

const MONTH_NAMES = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

function formatEventDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function getRelativeLabel(dateStr: string, today: Date) {
  const d = new Date(dateStr);
  const diff = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "오늘";
  if (diff === 1) return "내일";
  return `${diff}일 후`;
}

export default function CalendarSection() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(() => new Date());

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay     = new Date(year, month, 1).getDay();
  const daysInMonth  = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const eventDateSet = new Set(
    MOCK_EVENTS
      .filter(e => {
        const d = new Date(e.date);
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .map(e => new Date(e.date).getDate())
  );

  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const nextEvent = MOCK_EVENTS.find(e => e.date >= todayStr);

  const containerStyle: CSSProperties = {
    flex: 1,
    backgroundColor: "#FCF1F1",
    borderRadius: "20px",
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const titleStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "16px",
    fontWeight: 700,
    color: "#1F1A1A",
  };

  const navStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "14px",
    color: "#1F1A1A",
    fontWeight: 500,
  };

  const navBtnStyle: CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#5C3F3F",
    fontSize: "14px",
    padding: "2px 6px",
    display: "flex",
    alignItems: "center",
  };

  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "4px 0",
  };

  const dayLabelStyle: CSSProperties = {
    textAlign: "center",
    fontSize: "11px",
    color: "#9CA3AF",
    fontWeight: 500,
    paddingBottom: "8px",
  };

  const eventCardStyle: CSSProperties = {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    padding: "14px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    border: "1.5px solid rgba(0, 0, 0, 0.05)",
  };

  const eventDateLabelStyle: CSSProperties = {
    fontSize: "12px",
    fontWeight: 600,
    color: "#4CAF50",
  };

  const eventTimeStyle: CSSProperties = {
    fontSize: "13px",
    color: "#1F1A1A",
    fontWeight: 500,
  };

  const eventTitleStyle: CSSProperties = {
    fontSize: "13px",
    color: "#1F1A1A",
  };

  return (
    <div style={containerStyle}>
      {/* 헤더 */}
      <div style={headerStyle}>
        <div style={titleStyle}>
          <Link href="/calendar" style={{ display: "flex", alignItems: "center", color: "inherit", textDecoration: "none" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
              <path d="M2.22222 22C1.61111 22 1.08796 21.7846 0.652778 21.3538C0.217593 20.9229 0 20.405 0 19.8V4.4C0 3.795 0.217593 3.27708 0.652778 2.84625C1.08796 2.41542 1.61111 2.2 2.22222 2.2H3.33333V0H5.55556V2.2H14.4444V0H16.6667V2.2H17.7778C18.3889 2.2 18.912 2.41542 19.3472 2.84625C19.7824 3.27708 20 3.795 20 4.4V19.8C20 20.405 19.7824 20.9229 19.3472 21.3538C18.912 21.7846 18.3889 22 17.7778 22H2.22222ZM2.22222 19.8H17.7778V8.8H2.22222V19.8ZM2.22222 6.6H17.7778V4.4H2.22222V6.6ZM10 13.2C9.68518 13.2 9.4213 13.0946 9.20833 12.8837C8.99537 12.6729 8.88889 12.4117 8.88889 12.1C8.88889 11.7883 8.99537 11.5271 9.20833 11.3162C9.4213 11.1054 9.68518 11 10 11C10.3148 11 10.5787 11.1054 10.7917 11.3162C11.0046 11.5271 11.1111 11.7883 11.1111 12.1C11.1111 12.4117 11.0046 12.6729 10.7917 12.8837C10.5787 13.0946 10.3148 13.2 10 13.2ZM5.55556 13.2C5.24074 13.2 4.97685 13.0946 4.76389 12.8837C4.55093 12.6729 4.44444 12.4117 4.44444 12.1C4.44444 11.7883 4.55093 11.5271 4.76389 11.3162C4.97685 11.1054 5.24074 11 5.55556 11C5.87037 11 6.13426 11.1054 6.34722 11.3162C6.56018 11.5271 6.66667 11.7883 6.66667 12.1C6.66667 12.4117 6.56018 12.6729 6.34722 12.8837C6.13426 13.0946 5.87037 13.2 5.55556 13.2ZM14.4444 13.2C14.1296 13.2 13.8657 13.0946 13.6528 12.8837C13.4398 12.6729 13.3333 12.4117 13.3333 12.1C13.3333 11.7883 13.4398 11.5271 13.6528 11.3162C13.8657 11.1054 14.1296 11 14.4444 11C14.7593 11 15.0231 11.1054 15.2361 11.3162C15.4491 11.5271 15.5556 11.7883 15.5556 12.1C15.5556 12.4117 15.4491 12.6729 15.2361 12.8837C15.0231 13.0946 14.7593 13.2 14.4444 13.2ZM10 17.6C9.68518 17.6 9.4213 17.4946 9.20833 17.2837C8.99537 17.0729 8.88889 16.8117 8.88889 16.5C8.88889 16.1883 8.99537 15.9271 9.20833 15.7163C9.4213 15.5054 9.68518 15.4 10 15.4C10.3148 15.4 10.5787 15.5054 10.7917 15.7163C11.0046 15.9271 11.1111 16.1883 11.1111 16.5C11.1111 16.8117 11.0046 17.0729 10.7917 17.2837C10.5787 17.4946 10.3148 17.6 10 17.6ZM5.55556 17.6C5.24074 17.6 4.97685 17.4946 4.76389 17.2837C4.55093 17.0729 4.44444 16.8117 4.44444 16.5C4.44444 16.1883 4.55093 15.9271 4.76389 15.7163C4.97685 15.5054 5.24074 15.4 5.55556 15.4C5.87037 15.4 6.13426 15.5054 6.34722 15.7163C6.56018 15.9271 6.66667 16.1883 6.66667 16.5C6.66667 16.8117 6.56018 17.0729 6.34722 17.2837C6.13426 17.4946 5.87037 17.6 5.55556 17.6ZM14.4444 17.6C14.1296 17.6 13.8657 17.4946 13.6528 17.2837C13.4398 17.0729 13.3333 16.8117 13.3333 16.5C13.3333 16.1883 13.4398 15.9271 13.6528 15.7163C13.8657 15.5054 14.1296 15.4 14.4444 15.4C14.7593 15.4 15.0231 15.5054 15.2361 15.7163C15.4491 15.9271 15.5556 16.1883 15.5556 16.5C15.5556 16.8117 15.4491 17.0729 15.2361 17.2837C15.0231 17.4946 14.7593 17.6 14.4444 17.6Z" fill="#9A001F"/>
            </svg>
          </Link>
          캘린더
        </div>
        <div style={navStyle}>
          <button style={navBtnStyle} onClick={() => setViewDate(new Date(year, month - 1, 1))}>
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M6 12L0 6L6 0L7.4 1.4L2.8 6L7.4 10.6L6 12Z" fill="#5C3F3F"/>
            </svg>
          </button>
          <span>{MONTH_NAMES[month]} {year}</span>
          <button style={navBtnStyle} onClick={() => setViewDate(new Date(year, month + 1, 1))}>
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none" style={{ transform: "rotate(180deg)" }}>
              <path d="M6 12L0 6L6 0L7.4 1.4L2.8 6L7.4 10.6L6 12Z" fill="#5C3F3F"/>
            </svg>
          </button>
        </div>
      </div>

      {/* 요일 헤더 */}
      <div style={gridStyle}>
        {DAY_LABELS.map((d, i) => (
          <div key={i} style={dayLabelStyle}>{d}</div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div style={gridStyle}>
        {cells.map((day, i) => {
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const hasEvent = day !== null && eventDateSet.has(day);

          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", paddingBottom: "4px" }}>
              <div style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: isToday ? "#22C55E" : hasEvent ? "#4CAF501A" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                color: isToday ? "#FFFFFF" : day ? "#1F1A1A" : "transparent",
                fontWeight: isToday ? 700 : 400,
              }}>
                {day ?? ""}
              </div>
              {hasEvent && (
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#4CAF50", marginTop: "-5px" }} />
              )}
            </div>
          );
        })}
      </div>

      {/* 이벤트 상세 */}
      {nextEvent && (
        <div style={eventCardStyle}>
          <p style={eventDateLabelStyle}>
            {getRelativeLabel(nextEvent.date, today)} · {formatEventDate(nextEvent.date)}
          </p>
          <p style={eventTimeStyle}>{nextEvent.time}</p>
          <p style={eventTitleStyle}>{nextEvent.title}</p>
        </div>
      )}
    </div>
  );
}
