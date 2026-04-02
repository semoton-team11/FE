"use client";

import type { CSSProperties } from "react";
import { MOCK_SLOTS, MOCK_AVAILABLE_DAY_INDICES, DAY_LABELS } from "../_lib/constants";
import { getWeekDates } from "../_lib/utils";

type MentoringScheduleProps = {
  selectedDate: number | null;
  onSelectDate: (date: number) => void;
};

const sectionHeaderStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "20px",
};

const sectionTitleStyle: CSSProperties = {
  fontSize: "20px",
  fontWeight: 700,
  color: "#1F1A1A",
};

const cardStyle: CSSProperties = {
  backgroundColor: "#FFFFFF",
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
};

const calendarGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "6px",
  marginBottom: "24px",
};

const dayLabelCellStyle: CSSProperties = {
  textAlign: "center",
};

const dayLabelTextStyle: CSSProperties = {
  fontSize: "12px",
  color: "#9CA3AF",
  marginBottom: "8px",
};

const slotListStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const slotItemStyle: CSSProperties = {
  padding: "16px 20px",
  backgroundColor: "#F9FAFB",
  borderRadius: "10px",
  fontSize: "14px",
  fontWeight: 500,
  color: "#1F1A1A",
};

function getDayButtonStyle(
  date: Date,
  today: number,
  todayStart: Date,
  selectedDate: number | null,
  dayIndex: number
): CSSProperties {
  const dateNum = date.getDate();
  const isPast = date < todayStart;
  const isSelected = selectedDate === dateNum;
  const isToday = dateNum === today;
  const isAvailable = MOCK_AVAILABLE_DAY_INDICES.has(dayIndex);

  return {
    width: "100%",
    aspectRatio: "1",
    borderRadius: "10px",
    border: isToday && !isSelected ? "2px solid #9A001F" : "none",
    cursor: isPast ? "default" : "pointer",
    fontSize: "14px",
    fontWeight: 600,
    transition: "background-color 200ms ease, color 200ms ease, box-shadow 200ms ease",
    backgroundColor: isSelected
      ? "#9A001F"
      : isToday
      ? "#FFFFFF"
      : "#FFF8F7",
    color: isSelected
      ? "#FFFFFF"
      : isToday
      ? "#9A001F"
      : isPast
      ? "#D1C4C4"
      : "#916F6E",
    boxShadow: "none",
  };
}

export default function MentoringSchedule({ selectedDate, onSelectDate }: MentoringScheduleProps) {
  const weekDates = getWeekDates();
  const today = new Date().getDate();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  return (
    <section>
      <div style={sectionHeaderStyle}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F1A1A" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <h2 style={sectionTitleStyle}>멘토링 가능 시간</h2>
      </div>

      <div style={cardStyle}>
        {/* 주간 달력 */}
        <div style={calendarGridStyle}>
          {DAY_LABELS.map((label, i) => (
            <div key={label} style={dayLabelCellStyle}>
              <p style={dayLabelTextStyle}>{label}</p>
              <button
                onClick={() =>
                  !weekDates[i] || weekDates[i] < todayStart
                    ? undefined
                    : onSelectDate(weekDates[i].getDate())
                }
                style={getDayButtonStyle(weekDates[i], today, todayStart, selectedDate, i)}
              >
                {weekDates[i].getDate()}
              </button>
            </div>
          ))}
        </div>

        {/* 시간 슬롯 */}
        <div style={slotListStyle}>
          {MOCK_SLOTS.map((slot) => (
            <div key={slot} style={slotItemStyle}>
              {slot}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
