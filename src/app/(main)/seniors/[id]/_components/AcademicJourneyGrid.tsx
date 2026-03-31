"use client";

import type { Senior } from "@/types";

type YearColumn = {
  yearLabel: string;
  semesters: {
    label: string;
    courses: { id: string; name: string }[];
  }[];
};

type AcademicJourneyGridProps = {
  yearColumns: YearColumn[];
};

export default function AcademicJourneyGrid({ yearColumns }: AcademicJourneyGridProps) {
  return (
    <section>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F1A1A" strokeWidth="2">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1F1A1A" }}>
          학업 여정 그리드
        </h2>
      </div>

      {/* 가로 스크롤 — 학년이 많아질 경우 대응 */}
      <div style={{ overflowX: "auto", paddingBottom: "8px" }}>
        <div
          style={{
            display: "flex",
            gap: "12px",
            minWidth: "max-content",
          }}
        >
          {yearColumns.map((col) => (
            <div
              key={col.yearLabel}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                width: "180px",
                flexShrink: 0,
              }}
            >
              {col.semesters.map((sem) => (
                <div
                  key={sem.label}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "14px",
                    padding: "16px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  }}
                >
                  <p style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "10px" }}>
                    {sem.label}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {sem.courses.map((course) => (
                      <p key={course.id} style={{ fontSize: "13px", fontWeight: 500, color: "#1F1A1A" }}>
                        {course.name}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 학년별 시간표 그룹화 helper (page에서 사용) ──
export function buildYearColumns(timetable: Senior["timetable"]) {
  const sortedTimetable = [...timetable].sort((a, b) =>
    a.semester.localeCompare(b.semester)
  );
  const yearKeys = Array.from(new Set(sortedTimetable.map((e) => e.semester.split("-")[0])));
  return yearKeys.map((year, yearIdx) => {
    const semesters = sortedTimetable
      .filter((e) => e.semester.split("-")[0] === year)
      .map((e) => ({
        label: `${yearIdx + 1}학년 ${e.semester.split("-")[1]}학기`,
        courses: e.courses,
      }));
    return { yearLabel: `${yearIdx + 1}학년`, semesters };
  });
}
