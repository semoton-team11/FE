"use client";

import { useRef } from "react";
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
    <div
      style={{
        flex: 1,
        minWidth: 0,
        overflow: "hidden",
        backgroundColor: "#FFF8F7",
        borderRadius: "20px",
        padding: "28px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {/* 헤더 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#1F1A1A" }}>
          Timeline Curriculum
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {Object.values(COURSE_TYPE_COLORS).map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: item.dot }} />
              <span style={{ fontSize: "12px", color: "#5C3F3F" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* YEAR 탭 — 한 번에 2개만 보임, 콘텐츠와 동기화 스크롤 */}
      <div
        ref={tabScrollRef}
        style={{
          display: "flex",
          overflowX: "hidden",
          marginBottom: "24px",
        }}
      >
        {years.map((y, idx) => (
          <button
            key={y.year}
            onClick={() => onScrollToYear(idx)}
            style={{
              flex: "0 0 50%",
              padding: "12px 0",
              backgroundColor: "transparent",
              border: "none",
              borderBottom: selectedYear === idx ? "2px solid #9A001F" : "2px solid #E5E7EB",
              fontSize: "14px",
              fontWeight: selectedYear === idx ? 700 : 400,
              color: selectedYear === idx ? "#9A001F" : "#9CA3AF",
              cursor: "pointer",
              transition: "color 200ms ease, border-color 200ms ease, font-weight 200ms ease",
            }}
          >
            {y.year}
          </button>
        ))}
      </div>

      {/* 스크롤 래퍼 + 화살표 버튼 */}
      <div style={{ position: "relative" }}>
        {/* 이전 버튼 */}
        {selectedYear > 0 && (
          <button
            onClick={() => onScrollToYear(selectedYear - 1)}
            style={{
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
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5C3F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
        )}

        {/* 다음 버튼 */}
        {selectedYear < years.length - 1 && (
          <button
            onClick={() => onScrollToYear(selectedYear + 1)}
            style={{
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
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5C3F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        )}

        {/* 가로 스크롤 — YEAR 2개씩 한 페이지, 각 YEAR = 탭 너비(50%) */}
        <div
          ref={scrollRef}
          style={{
            width: "100%",
            overflowX: "scroll",
            scrollSnapType: "x mandatory",
            display: "flex",
            flexWrap: "nowrap",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {years.map((year, idx) => (
            <div
              key={year.year}
              style={{
                flex: "0 0 50%",
                scrollSnapAlign: idx % 2 === 0 ? "start" : "none",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                paddingRight: idx % 2 === 0 ? "8px" : "0",
                paddingLeft: idx % 2 === 1 ? "8px" : "0",
                borderLeft: idx % 2 === 1 ? "1px solid #E9DEDE" : "none",
              }}
            >
              {/* 두 학기 나란히 */}
              <div style={{ display: "flex", gap: "8px", flex: 1 }}>
                {year.semesters.map((sem) => (
                  <div key={sem.sem} style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: "11px",
                      color: "#9CA3AF",
                      marginBottom: "10px",
                      letterSpacing: "0.4px",
                    }}>
                      {sem.sem}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {sem.courses.map((course) => {
                        const courseKey = `${year.year}-${sem.sem}-${course.name}`;
                        const isSelected = selectedCourses.has(courseKey);
                        return (
                          <div
                            key={course.name}
                            onClick={() => onToggleCourse(courseKey)}
                            style={{
                              backgroundColor: isSelected ? "#9A001F" : "#FFFFFF",
                              borderRadius: "8px",
                              padding: "14px 10px",
                              borderLeft: `4px solid ${isSelected ? "#9A001F" : ((COURSE_TYPE_COLORS as Record<string, { dot: string; label: string }>)[course.type]?.dot ?? "#9CA3AF")}`,
                              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                              cursor: "pointer",
                              transition: "background-color 150ms ease, border-color 150ms ease",
                            }}
                          >
                            <p style={{ fontSize: "11px", fontWeight: 600, color: isSelected ? "#FFFFFF" : "#1F1A1A", marginBottom: "2px", lineHeight: "1.4" }}>
                              {course.name}
                            </p>
                            <p style={{ fontSize: "10px", color: isSelected ? "#FFFFFF" : "#9CA3AF", lineHeight: "1.3" }}>
                              {course.sub}
                            </p>
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
      </div> {/* 스크롤 래퍼 닫기 */}
    </div>
  );
}
