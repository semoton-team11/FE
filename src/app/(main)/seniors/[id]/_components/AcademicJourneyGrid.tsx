"use client";

import type { CSSProperties } from "react";
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

const scrollContainerStyle: CSSProperties = {
  overflowX: "auto",
  paddingBottom: "8px",
};

const innerRowStyle: CSSProperties = {
  display: "flex",
  gap: "12px",
  minWidth: "max-content",
};

const yearColumnStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  width: "180px",
  flexShrink: 0,
};

const semesterCardStyle: CSSProperties = {
  backgroundColor: "#FFFFFF",
  borderRadius: "14px",
  padding: "16px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
};

const semesterLabelStyle: CSSProperties = {
  fontSize: "11px",
  color: "#9CA3AF",
  marginBottom: "10px",
};

const courseListStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const courseNameStyle: CSSProperties = {
  fontSize: "13px",
  fontWeight: 500,
  color: "#1F1A1A",
};

function SectionHeader() {
  return (
    <div style={sectionHeaderStyle}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F1A1A" strokeWidth="2">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
      <h2 style={sectionTitleStyle}>학업 여정 그리드</h2>
    </div>
  );
}

function YearColumnBlock({ col }: { col: YearColumn }) {
  return (
    <div style={yearColumnStyle}>
      {col.semesters.map((sem) => (
        <div key={sem.label} style={semesterCardStyle}>
          <p style={semesterLabelStyle}>{sem.label}</p>
          <div style={courseListStyle}>
            {sem.courses.map((course) => (
              <p key={course.id} style={courseNameStyle}>
                {course.name}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AcademicJourneyGrid({ yearColumns }: AcademicJourneyGridProps) {
  return (
    <section>
      <SectionHeader />

      {/* 가로 스크롤 — 학년이 많아질 경우 대응 */}
      <div style={scrollContainerStyle}>
        <div style={innerRowStyle}>
          {yearColumns.map((col) => (
            <YearColumnBlock key={col.yearLabel} col={col} />
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
