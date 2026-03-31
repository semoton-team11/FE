"use client";

import Link from "next/link";
import { PRIORITY_COURSES } from "../_lib/constants";

export default function PriorityCoursesCard({ isZeroState }: { isZeroState?: boolean }) {
  const GraduationIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21L5 17.2V11.2L1 9L12 3L23 9V17H21V10.1L19 11.2V17.2L12 21ZM12 12.7L18.85 9L12 5.3L5.15 9L12 12.7ZM12 18.725L17 16.025V12.25L12 15L7 12.25V16.025L12 18.725Z" fill="#9A001F"/>
    </svg>
  );

  return (
    <div
      className="flex-1 border border-border bg-white flex flex-col gap-4"
      style={{
        height: isZeroState ? "450px" : "646.052px",
        borderRadius: "32px",
        padding: "41.281px",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <GraduationIcon />
          <span style={{ color: "#5C3F3F", fontFamily: "Roboto", fontSize: "22px", fontWeight: 700, lineHeight: "100%" }}>
            커리큘럼 계획
          </span>
        </div>
        {!isZeroState && (
          <Link href="/curriculum" className="text-xs text-muted-foreground hover:text-foreground">
            전체 보기
          </Link>
        )}
      </div>

      {isZeroState ? (
        /* ── Zero state ── */
        <div className="flex flex-col items-center justify-center flex-1 gap-4 text-center">
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "#FCF1F1", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.33333 18.6667H8V12H5.33333V18.6667ZM16 18.6667H18.6667V5.33333H16V18.6667ZM10.6667 18.6667H13.3333V14.6667H10.6667V18.6667ZM10.6667 12H13.3333V9.33333H10.6667V12ZM2.66667 24C1.93333 24 1.30556 23.7389 0.783333 23.2167C0.261111 22.6944 0 22.0667 0 21.3333V2.66667C0 1.93333 0.261111 1.30556 0.783333 0.783333C1.30556 0.261111 1.93333 0 2.66667 0H21.3333C22.0667 0 22.6944 0.261111 23.2167 0.783333C23.7389 1.30556 24 1.93333 24 2.66667V21.3333C24 22.0667 23.7389 22.6944 23.2167 23.2167C22.6944 23.7389 22.0667 24 21.3333 24H2.66667ZM2.66667 21.3333H21.3333V2.66667H2.66667V21.3333Z" fill="#9A001F"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: "16px", fontWeight: 700, color: "#1F1A1A", marginBottom: "8px" }}>학점 데이터가 비어있습니다</p>
            <p style={{ fontSize: "13px", color: "#916F6E", lineHeight: 1.6 }}>
              직접 수강한 강의를 입력하여 나의<br />학업 진행도와 계획을 한눈에 파악해보세요
            </p>
          </div>
        </div>
      ) : (
        /* ── 과목 목록 ── */
        <div className="flex flex-col flex-1">
          {PRIORITY_COURSES.map((course) => (
            <div key={course.code} className="flex items-center gap-3 py-4 border-b border-border last:border-0">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: course.iconBg }}>
                {course.icon}
              </div>
              <div>
                <p className="text-sm font-semibold">{course.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{course.code} · {course.credits}학점 · {course.professor} 교수님</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link href="/curriculum">
        <button
          style={{ width: "100%", border: "2.064px solid rgba(154, 0, 31, 0.10)", borderRadius: "16px", height: "56px", fontSize: "14px", fontWeight: 700, color: "#9A001F", backgroundColor: "transparent", cursor: "pointer", transition: "background-color 150ms ease" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#9A001F"; e.currentTarget.style.color = "#FFFFFF"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#9A001F"; }}
        >
          {isZeroState ? "커리큘럼 계산 시작하기" : "과목 추가하기"}
        </button>
      </Link>
    </div>
  );
}
