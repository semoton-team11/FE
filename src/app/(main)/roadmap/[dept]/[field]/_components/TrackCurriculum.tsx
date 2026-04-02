"use client";

import { useRef } from "react";
import type { CSSProperties } from "react";
import { COURSE_TYPE_COLORS } from "@/lib/roadmapColors";

type Course = {
  name: string;
  sub: string;
  type: string;
};

type Semester = {
  sem: string;
  courses: Course[];
};

type Year = {
  year: string;
  semesters: Semester[];
};

type TrackCurriculumProps = {
  years: Year[];
  selectedYear: number;
  selectedCourses: Set<string>;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  tabScrollRef: React.RefObject<HTMLDivElement | null>;
  onScrollToYear: (idx: number) => void;
  onToggleCourse: (key: string) => void;
};

const wrapperStyle: CSSProperties = {
  flex: 1,
  minWidth: 0,
  overflow: "hidden",
  backgroundColor: "#FFF8F7",
  borderRadius: "20px",
  padding: "28px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
};

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const headingStyle: CSSProperties = {
  fontSize: "20px",
  fontWeight: 700,
  color: "#1F1A1A",
};

const legendStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const legendItemStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
};

const legendDotStyle = (color: string): CSSProperties => ({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: color,
});

const legendLabelStyle: CSSProperties = {
  fontSize: "12px",
  color: "#5C3F3F",
};

const tabScrollStyle: CSSProperties = {
  display: "flex",
  overflowX: "hidden",
  marginBottom: "24px",
};

const tabButtonStyle = (isSelected: boolean): CSSProperties => ({
  flex: "0 0 50%",
  padding: "12px 0",
  backgroundColor: "transparent",
  border: "none",
  borderBottom: isSelected ? "2px solid #9A001F" : "2px solid #E5E7EB",
  fontSize: "14px",
  fontWeight: isSelected ? 700 : 400,
  color: isSelected ? "#9A001F" : "#9CA3AF",
  cursor: "pointer",
  transition: "color 200ms ease, border-color 200ms ease, font-weight 200ms ease",
});

const scrollWrapperStyle: CSSProperties = {
  position: "relative",
};

const prevButtonStyle: CSSProperties = {
  position: "absolute",
  left: "-16px",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  backgroundColor: "#FFFFFF",
  border: "1px solid #E9DEDE",
  boxShadow: "0 2px 6px rgba(0,0,0,0.10)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

const nextButtonStyle: CSSProperties = {
  position: "absolute",
  right: "-16px",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  backgroundColor: "#FFFFFF",
  border: "1px solid #E9DEDE",
  boxShadow: "0 2px 6px rgba(0,0,0,0.10)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

const contentScrollStyle: CSSProperties = {
  width: "100%",
  overflowX: "scroll",
  scrollSnapType: "x mandatory",
  display: "flex",
  flexWrap: "nowrap",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
};

const yearColumnStyle = (idx: number): CSSProperties => ({
  flex: "0 0 50%",
  scrollSnapAlign: "start",
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  paddingRight: "8px",
  paddingLeft: idx > 0 ? "8px" : "0",
  borderLeft: idx > 0 ? "1px solid #E9DEDE" : "none",
});

const semestersRowStyle: CSSProperties = {
  display: "flex",
  gap: "8px",
  flex: 1,
};

const semesterColStyle: CSSProperties = {
  flex: 1,
  minWidth: 0,
};

const semLabelStyle: CSSProperties = {
  fontSize: "11px",
  color: "#9CA3AF",
  marginBottom: "10px",
  letterSpacing: "0.4px",
};

const coursesColStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const courseCardStyle = (isSelected: boolean, dotColor: string): CSSProperties => ({
  backgroundColor: isSelected ? "#9A001F" : "#FFFFFF",
  borderRadius: "8px",
  padding: "14px 10px",
  borderLeft: `4px solid ${isSelected ? "#9A001F" : dotColor}`,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  cursor: "pointer",
  transition: "background-color 150ms ease, border-color 150ms ease",
});

const courseNameStyle = (isSelected: boolean): CSSProperties => ({
  fontSize: "11px",
  fontWeight: 600,
  color: isSelected ? "#FFFFFF" : "#1F1A1A",
  marginBottom: "2px",
  lineHeight: "1.4",
});

const courseSubStyle = (isSelected: boolean): CSSProperties => ({
  fontSize: "10px",
  color: isSelected ? "#FFFFFF" : "#9CA3AF",
  lineHeight: "1.3",
});

export default function TrackCurriculum({
  years,
  selectedYear,
  selectedCourses,
  scrollRef,
  tabScrollRef,
  onScrollToYear,
  onToggleCourse,
}: TrackCurriculumProps) {
  return (
    <div style={wrapperStyle}>
      <div style={headerStyle}>
        <h3 style={headingStyle}>
          Timeline Curriculum
        </h3>
        <div style={legendStyle}>
          {Object.values(COURSE_TYPE_COLORS).map((item) => (
            <div key={item.label} style={legendItemStyle}>
              <div style={legendDotStyle(item.dot)} />
              <span style={legendLabelStyle}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div ref={tabScrollRef} style={tabScrollStyle}>
        {years.map((y, idx) => (
          <button
            key={y.year}
            onClick={() => onScrollToYear(idx)}
            style={tabButtonStyle(selectedYear === idx)}
          >
            {y.year}
          </button>
        ))}
      </div>

      <div style={scrollWrapperStyle}>
        {selectedYear > 0 && (
          <button onClick={() => onScrollToYear(selectedYear - 1)} style={prevButtonStyle}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5C3F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
        )}

        {selectedYear < years.length - 1 && (
          <button onClick={() => onScrollToYear(selectedYear + 1)} style={nextButtonStyle}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5C3F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        )}

        <div ref={scrollRef} style={contentScrollStyle}>
          {years.map((year, idx) => (
            <div key={year.year} style={yearColumnStyle(idx)}>
              <div style={semestersRowStyle}>
                {year.semesters.map((sem) => (
                  <div key={sem.sem} style={semesterColStyle}>
                    <p style={semLabelStyle}>{sem.sem}</p>
                    <div style={coursesColStyle}>
                      {sem.courses.map((course) => {
                        const courseKey = `${year.year}-${sem.sem}-${course.name}`;
                        const isSelected = selectedCourses.has(courseKey);
                        const dotColor = (COURSE_TYPE_COLORS as Record<string, { dot: string; label: string }>)[course.type]?.dot ?? "#9CA3AF";
                        return (
                          <div
                            key={course.name}
                            onClick={() => onToggleCourse(courseKey)}
                            style={courseCardStyle(isSelected, dotColor)}
                          >
                            <p style={courseNameStyle(isSelected)}>{course.name}</p>
                            <p style={courseSubStyle(isSelected)}>{course.sub}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
