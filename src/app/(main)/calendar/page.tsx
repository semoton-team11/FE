"use client";

import { useState, useEffect } from "react";
import { addRecentActivity } from "@/lib/recentActivity";
import type { CSSProperties } from "react";

const MONTH_NAMES = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];
const DAY_LABELS  = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

export default function CalendarPage() {
  useEffect(() => {
    addRecentActivity({
      id: "calendar",
      label: "멘토링 캘린더",
      sub: "일정 및 메모",
      href: "/calendar",
      type: "calendar",
    });
  }, []);

  const todayReal = new Date();
  todayReal.setHours(0, 0, 0, 0);

  const [viewDate, setViewDate]     = useState(new Date(todayReal.getFullYear(), todayReal.getMonth(), 1));
  const [selectedDate, setSelected] = useState<Date | null>(null);
  const [memo, setMemo]             = useState("");

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isToday = (day: number) => {
    const d = new Date(year, month, day);
    return d.getTime() === todayReal.getTime();
  };

  const isSelected = (day: number) =>
    selectedDate
      ? selectedDate.getFullYear() === year &&
        selectedDate.getMonth() === month &&
        selectedDate.getDate() === day
      : false;

  const formatSelectedDate = () => {
    if (!selectedDate) return null;
    return `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`;
  };

  /* ── styles ── */
  const pageStyle: CSSProperties = {
    fontFamily: "var(--font-roboto), sans-serif",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  };

  const wrapStyle: CSSProperties = {
    display: "flex",
    gap: "24px",
    alignItems: "flex-start",
  };

  const calCardStyle: CSSProperties = {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: "20px",
    padding: "28px 24px 150px 24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  };

  const calHeaderStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "48px",
  };

  const calTitleStyle: CSSProperties = {
    fontSize: "30px",
    fontWeight: 700,
    color: "#1F1A1A",
  };

  const navBtnStyle: CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "6px",
    display: "flex",
    alignItems: "center",
  };

  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "12px 0",
  };

  const dayLabelStyle: CSSProperties = {
    textAlign: "center",
    fontSize: "13px",
    fontWeight: 600,
    color: "#9CA3AF",
    paddingBottom: "20px",
  };

  const rightPanelStyle: CSSProperties = {
    width: "280px",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const dateLabelStyle: CSSProperties = {
    fontSize: "18px",
    fontWeight: 700,
    color: "#1F1A1A",
    borderLeft: "3px solid #9A001F",
    paddingLeft: "12px",
  };

  const memoCardStyle: CSSProperties = {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const textareaStyle: CSSProperties = {
    width: "100%",
    minHeight: "140px",
    border: "none",
    outline: "none",
    resize: "none",
    fontSize: "14px",
    color: "#1F1A1A",
    fontFamily: "inherit",
    backgroundColor: "transparent",
    boxSizing: "border-box",
  };

  const saveBtnStyle: CSSProperties = {
    alignSelf: "flex-end",
    backgroundColor: "#C7002B",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "10px",
    padding: "8px 20px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  };

  return (
    <div style={pageStyle}>
      <style>{`.cal-memo::placeholder { color: #5C3F3F80; }`}</style>
      {/* 타이틀 */}
      <div>
        <p style={{ fontSize: "11px", fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.08em", marginBottom: "6px" }}>
          CALENDAR
        </p>
        <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#1F1A1A" }}>
          멘토링 일정 및 메모
        </h1>
      </div>

      <div style={wrapStyle}>
        {/* ── 달력 ── */}
        <div style={calCardStyle}>
          <div style={calHeaderStyle}>
            <button style={navBtnStyle} onClick={() => setViewDate(new Date(year, month - 1, 1))}>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                <path d="M7.5 15L0 7.5L7.5 0L9.25 1.75L3.5 7.5L9.25 13.25L7.5 15Z" fill="#5C3F3F"/>
              </svg>
            </button>
            <span style={calTitleStyle}>{year}년 {MONTH_NAMES[month]}</span>
            <button style={navBtnStyle} onClick={() => setViewDate(new Date(year, month + 1, 1))}>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none" style={{ transform: "rotate(180deg)" }}>
                <path d="M7.5 15L0 7.5L7.5 0L9.25 1.75L3.5 7.5L9.25 13.25L7.5 15Z" fill="#5C3F3F"/>
              </svg>
            </button>
          </div>

          {/* 요일 헤더 */}
          <div style={gridStyle}>
            {DAY_LABELS.map((d) => (
              <div key={d} style={dayLabelStyle}>{d}</div>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div style={gridStyle}>
            {cells.map((day, i) => {
              const today = day !== null && isToday(day);
              const sel   = day !== null && isSelected(day);

              return (
                <div key={i} style={{ display: "flex", justifyContent: "center", paddingBottom: "4px" }}>
                  <button
                    onClick={() => day !== null && setSelected(new Date(year, month, day))}
                    disabled={day === null}
                    style={{
                      width: "75px",
                      height: "75px",
                      borderRadius: "12px",
                      border: today && !sel ? "1.5px solid #9A001F" : "none",
                      cursor: day !== null ? "pointer" : "default",
                      fontSize: "16px",
                      fontWeight: 600,
                      backgroundColor: sel ? "#9A001F" : "transparent",
                      color: sel ? "#FFFFFF" : day ? "#1F1A1A" : "transparent",
                      transition: "background-color 150ms ease",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      paddingTop: "18px",
                    }}
                  >
                    {day ?? ""}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 메모 패널 ── */}
        <div style={rightPanelStyle}>
          <p style={dateLabelStyle}>
            {formatSelectedDate() ?? `${year}년 ${MONTH_NAMES[month]}`}
          </p>

          <div style={memoCardStyle}>
            <textarea
              className="cal-memo"
              style={textareaStyle}
              placeholder="새로운 메모를 작성하세요..."
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
            <button style={saveBtnStyle}>저장하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
