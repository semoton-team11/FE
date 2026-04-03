"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCatalogCourses, getCurriculumRequirement } from "@/services/curriculum";
import { getCurrentUser } from "@/services/user";
import type { CatalogCourse, CurriculumRequirement } from "@/types";

const CATEGORY_ORDER = ["전공기초", "전공필수", "전공선택"] as const;
type CategoryType = (typeof CATEGORY_ORDER)[number];

export default function CurriculumSummaryPage() {
  const router = useRouter();
  const [catalog, setCatalog] = useState<CatalogCourse[]>([]);
  const [requirement, setRequirement] = useState<CurriculumRequirement | null>(null);
  const [plannedCourses, setPlannedCourses] = useState<CatalogCourse[]>([]);
  const [prevCheckedIds, setPrevCheckedIds] = useState<Set<string>>(new Set());
  const [userId, setUserId] = useState("");

  useEffect(() => {
    getCurrentUser().then(async (user) => {
      setUserId(user.id);
      const [courses, req] = await Promise.all([
        getCatalogCourses(),
        getCurriculumRequirement(),
      ]);
      setCatalog(courses);
      setRequirement(req);

      // 이번에 추가한 과목
      const plannedRaw = localStorage.getItem(`last_planned_${user.id}`);
      const plannedIds: string[] = plannedRaw ? JSON.parse(plannedRaw) : [];
      setPlannedCourses(courses.filter(c => plannedIds.includes(c.id)));

      // 이전 체크 = 현재 저장된 것에서 planned 빼기
      const checkedRaw = localStorage.getItem(`checked_courses_${user.id}`);
      const checkedIds: string[] = checkedRaw ? JSON.parse(checkedRaw) : [];
      const prevIds = checkedIds.filter(id => !plannedIds.includes(id));
      setPrevCheckedIds(new Set(prevIds));
    });
  }, []);

  if (!requirement) return null;

  const reqByType: Record<CategoryType, number> = {
    "전공기초": requirement.basic,
    "전공필수": requirement.required,
    "전공선택": requirement.elective,
  };

  // 이전 학점 (planned 제외)
  const prevByType = CATEGORY_ORDER.reduce((acc, type) => {
    acc[type] = catalog
      .filter(c => c.type === type && prevCheckedIds.has(c.id))
      .reduce((s, c) => s + c.credits, 0);
    return acc;
  }, {} as Record<CategoryType, number>);

  // 현재 학점 (planned 포함)
  const allCheckedIds = new Set([
    ...prevCheckedIds,
    ...plannedCourses.map(c => c.id),
  ]);
  const currByType = CATEGORY_ORDER.reduce((acc, type) => {
    acc[type] = catalog
      .filter(c => c.type === type && allCheckedIds.has(c.id))
      .reduce((s, c) => s + c.credits, 0);
    return acc;
  }, {} as Record<CategoryType, number>);

  return (
    <div style={{ fontFamily: "var(--font-roboto), sans-serif", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px 100px" }}>

        {/* ── 헤더 ── */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "48px" }}>
          <div style={{ width: "6px", backgroundColor: "#9A001F", flexShrink: 0 }} />
          <div>
            <span style={{
              display: "inline-block", padding: "4px 14px", borderRadius: "999px",
              backgroundColor: "#FCF1F1", border: "1px solid rgba(154,0,31,0.15)",
              fontSize: "12px", fontWeight: 600, color: "#5C3F3F", marginBottom: "16px",
            }}>
              3학년 1학기
            </span>
            <h1 style={{ fontSize: "40px", fontWeight: 700, color: "#1F1A1A", marginBottom: "12px", lineHeight: 1.2 }}>
              커리큘럼 계획 요약
            </h1>
            <p style={{ fontSize: "14px", color: "#5C3F3F", lineHeight: 1.8, fontWeight: 600 }}>
              머리 아픈 학점 계산은 khunnect한테 맡겨요.<br />
              khunnect가 그려준 지도와 함께 이번 학기도 잘 해낼 수 있을 거예요!
            </p>
          </div>
        </div>

        {/* ── 메인 콘텐츠 ── */}
        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>

          {/* 왼쪽: 담은 강의 내역 */}
          <div style={{ flex: 1, backgroundColor: "#FFFFFF", borderRadius: "20px", padding: "32px 36px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9.6 14.4H14.4V12H9.6V14.4ZM9.6 10.8H19.2V8.4H9.6V10.8ZM9.6 7.2H19.2V4.8H9.6V7.2ZM7.2 19.2C6.54 19.2 5.975 18.965 5.505 18.495C5.035 18.025 4.8 17.46 4.8 16.8V2.4C4.8 1.74 5.035 1.175 5.505 0.705C5.975 0.235 6.54 0 7.2 0H21.6C22.26 0 22.825 0.235 23.295 0.705C23.765 1.175 24 1.74 24 2.4V16.8C24 17.46 23.765 18.025 23.295 18.495C22.825 18.965 22.26 19.2 21.6 19.2H7.2ZM7.2 16.8H21.6V2.4H7.2V16.8ZM2.4 24C1.74 24 1.175 23.765 0.705 23.295C0.235 22.825 0 22.26 0 21.6V4.8H2.4V21.6H19.2V24H2.4Z" fill="#5C3F3F"/>
              </svg>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1F1A1A" }}>담은 강의 내역</h2>
            </div>

            <div style={{ borderTop: "1px solid #E6BDBB", paddingTop: "16px" }}>
              <div style={{ backgroundColor: "#FCF1F1", borderRadius: "12px", padding: "20px 20px" }}>
                {plannedCourses.length === 0 ? (
                  <p style={{ padding: "16px 0", fontSize: "14px", color: "#A8A29E", textAlign: "center" }}>추가한 과목이 없습니다.</p>
                ) : (
                  plannedCourses.map((course, idx) => (
                    <div key={course.id} style={{
                      display: "flex", alignItems: "center",
                      padding: "14px 16px",
                      marginBottom: idx < plannedCourses.length - 1 ? "8px" : 0,
                      backgroundColor: "#FFFFFF", borderRadius: "10px",
                    }}>
                      <span style={{ flex: 2, fontSize: "15px", fontWeight: 600, color: "#1F1A1A" }}>{course.name}</span>
                      <span style={{ flex: 1, fontSize: "13px", color: "#5C3F3F" }}>{course.type}</span>
                      <span style={{ flex: 0, fontSize: "15px", fontWeight: 700, color: "#9A001F", width: "40px", textAlign: "center" }}>{course.credits}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* 오른쪽: 학점 요약 */}
          <div style={{ width: "280px", flexShrink: 0, backgroundColor: "#FCF1F1", borderRadius: "20px", padding: "32px 28px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>

            {/* 건물 아이콘 */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1F1A1A" }}>학점 요약</h2>
              <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 100 100" fill="none">
                <path d="M15 80V45H25V80H15ZM45 80V45H55V80H45ZM0 100V90H100V100H0ZM75 80V45H85V80H75ZM0 35V25L50 0L100 25V35H0ZM22.25 25H50H77.75H22.25ZM22.25 25H77.75L50 11.25L22.25 25Z" fill="#9A001F" opacity="0.15"/>
              </svg>
            </div>
            <div style={{ borderBottom: "1px solid #E6BDBB", margin: "-24px 0 20px" }} />

            <div style={{ display: "flex", flexDirection: "column" }}>
              {CATEGORY_ORDER.map((type, idx) => {
                const prev = prevByType[type];
                const curr = currByType[type];
                const total = reqByType[type];
                const changed = curr !== prev;
                return (
                  <div key={type} style={{
                    paddingTop: idx === 0 ? 0 : "14px",
                    paddingBottom: idx === CATEGORY_ORDER.length - 1 ? 0 : "14px",
                    borderBottom: idx === CATEGORY_ORDER.length - 1 ? "none" : "1px solid rgba(154,0,31,0.12)",
                  }}>
                    <p style={{ fontSize: "12px", color: "#5C3F3F", marginBottom: "6px" }}>{type}</p>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                      {changed && (
                        <span style={{ fontSize: "14px", fontWeight: 500, color: "#C4B5B5", textDecoration: "line-through" }}>{String(prev).padStart(2, "0")}</span>
                      )}
                      <span style={{ fontSize: "28px", fontWeight: 700, color: "#9A001F" }}>{String(curr).padStart(2, "0")}</span>
                      <span style={{ fontSize: "14px", color: "#C4B5B5" }}>/ {total}</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* ── 하단 버튼 ── */}
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "40px", marginTop: "48px" }}>
          <button
            onClick={() => router.push("/curriculum/result")}
            style={{ background: "none", border: "none", fontSize: "15px", color: "#5C3F3F", fontWeight: 500, cursor: "pointer" }}
          >
            돌아가기
          </button>
          <button
            onClick={() => router.push("/")}
            style={{
              display: "flex", alignItems: "center", gap: "16px",
              padding: "14px 32px", borderRadius: "999px",
              backgroundColor: "#9A001F", color: "#FFFFFF",
              border: "none", fontSize: "15px", fontWeight: 600, cursor: "pointer",
              boxShadow: "0 4px 14px rgba(154,0,31,0.35)",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M8.6 14.6L15.65 7.55L14.25 6.15L8.6 11.8L5.75 8.95L4.35 10.35L8.6 14.6ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="white"/>
            </svg>
            확인하기
          </button>
        </div>

      </div>
    </div>
  );
}
