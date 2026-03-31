"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { getTrackCourses, buildTrackFromCourses } from "@/services/roadmap";
import { TRACK_META, DEFAULT_META } from "./_lib/constants";
import type { TrackYear } from "@/types";
import TrackBreadcrumb from "./_components/TrackBreadcrumb";
import TrackLeftPanel from "./_components/TrackLeftPanel";
import TrackCurriculum from "./_components/TrackCurriculum";

export default function RoadmapFieldPage() {
  const { dept } = useParams<{ dept: string; field: string }>();
  const deptName = decodeURIComponent(dept);
  const fieldId = decodeURIComponent(useParams<{ dept: string; field: string }>().field ?? "");
  const meta = TRACK_META[fieldId] ?? DEFAULT_META;

  const [years, setYears] = useState<TrackYear[]>([]);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set());

  // 과목 데이터 로드 (mock → Supabase 교체 시 getTrackCourses 내부만 변경)
  useEffect(() => {
    getTrackCourses(deptName, fieldId).then((courses) => {
      setYears(buildTrackFromCourses(courses));
    });
  }, [deptName, fieldId]);

  const track = { ...meta, years };

  function toggleCourse(key: string) {
    setSelectedCourses((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  const scrollRef = useRef<HTMLDivElement>(null);
  const tabScrollRef = useRef<HTMLDivElement>(null);

  // スクロール 위치에 따라 탭 색상 실시간 업데이트
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, offsetWidth } = container;
      // 각 year는 50% 너비 → year index = scrollLeft / (offsetWidth / 2)
      const yearIndex = Math.round(scrollLeft / (offsetWidth / 2));
      const clampedIdx = Math.max(0, Math.min(yearIndex, track.years.length - 1));
      setSelectedYear(clampedIdx);

      // 탭 바도 동기화
      const tabContainer = tabScrollRef.current;
      if (tabContainer) {
        const page = Math.floor(clampedIdx / 2);
        tabContainer.scrollTo({ left: page * tabContainer.offsetWidth, behavior: "smooth" });
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [track.years.length]);

  function scrollToYear(idx: number) {
    setSelectedYear(idx);
    // 2개씩 페이지 단위로 이동 (0,1 → page 0 / 2,3 → page 1)
    const page = Math.floor(idx / 2);
    const container = scrollRef.current;
    if (container) {
      container.scrollTo({ left: page * container.offsetWidth, behavior: "smooth" });
    }
    const tabContainer = tabScrollRef.current;
    if (tabContainer) {
      tabContainer.scrollTo({ left: page * tabContainer.offsetWidth, behavior: "smooth" });
    }
  }

  return (
    <div style={{ fontFamily: "var(--font-roboto), sans-serif" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px 100px" }}>

        {/* ── 브레드크럼 + 제목 + 저장 버튼 ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
          <div>
            <TrackBreadcrumb deptName={deptName} breadcrumbField={track.breadcrumbField} />
            <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#1F1A1A" }}>
              커리어 로드맵
            </h1>
          </div>

          {/* 저장 버튼 */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 20px",
              backgroundColor: "#094F7A",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
            내 로드맵으로 저장
          </button>
        </div>

        {/* ── 메인 콘텐츠 ── */}
        <div style={{ display: "flex", gap: "24px", alignItems: "stretch" }}>
          <TrackLeftPanel track={track} deptName={deptName} />
          <TrackCurriculum
            years={track.years}
            selectedYear={selectedYear}
            selectedCourses={selectedCourses}
            scrollRef={scrollRef}
            tabScrollRef={tabScrollRef}
            onScrollToYear={scrollToYear}
            onToggleCourse={toggleCourse}
          />
        </div>

      </div>
    </div>
  );
}
