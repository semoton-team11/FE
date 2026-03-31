"use client";

import { MOCK_SLOTS, MOCK_AVAILABLE_DAY_INDICES, DAY_LABELS } from "../_lib/constants";
import { getWeekDates } from "../_lib/utils";

type MentoringScheduleProps = {
  selectedDate: number | null;
  onSelectDate: (date: number) => void;
};

export default function MentoringSchedule({ selectedDate, onSelectDate }: MentoringScheduleProps) {
  const weekDates = getWeekDates();
  const today = new Date().getDate();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  return (
    <section>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F1A1A" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1F1A1A" }}>
          멘토링 가능 시간
        </h2>
      </div>

      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        {/* 주간 달력 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "6px",
            marginBottom: "24px",
          }}
        >
          {DAY_LABELS.map((label, i) => (
            <div key={label} style={{ textAlign: "center" }}>
              <p style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "8px" }}>
                {label}
              </p>
              <button
                onClick={() => !weekDates[i] || weekDates[i] < todayStart ? undefined : onSelectDate(weekDates[i].getDate())}
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  borderRadius: "10px",
                  border: "none",
                  cursor: weekDates[i] < todayStart ? "default" : "pointer",
                  fontSize: "14px",
                  fontWeight: weekDates[i].getDate() === today ? 700 : 400,
                  transition: "background-color 200ms ease, color 200ms ease, box-shadow 200ms ease",
                  backgroundColor:
                    selectedDate === weekDates[i].getDate()
                      ? "#9A001F"
                      : weekDates[i].getDate() === today
                      ? "#FFFFFF"
                      : MOCK_AVAILABLE_DAY_INDICES.has(i)
                      ? "#FFF8F7"
                      : "transparent",
                  color:
                    selectedDate === weekDates[i].getDate()
                      ? "#FFFFFF"
                      : weekDates[i] < todayStart
                      ? "#D1C4C4"
                      : "#916F6E",
                  boxShadow:
                    weekDates[i].getDate() === today && selectedDate !== weekDates[i].getDate()
                      ? "0 0 0 1.5px #E5E7EB"
                      : "none",
                }}
              >
                {weekDates[i].getDate()}
              </button>
            </div>
          ))}
        </div>

        {/* 시간 슬롯 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {MOCK_SLOTS.map((slot) => (
            <div
              key={slot}
              style={{
                padding: "16px 20px",
                backgroundColor: "#F9FAFB",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#1F1A1A",
              }}
            >
              {slot}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
