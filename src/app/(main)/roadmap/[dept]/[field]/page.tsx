"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import type { CSSProperties } from "react";
import { getTrackCourses, buildTrackFromCourses } from "@/services/roadmap";
import { TRACK_META, DEFAULT_META } from "./_lib/constants";
import type { TrackYear } from "@/types";
import TrackBreadcrumb from "./_components/TrackBreadcrumb";
import TrackLeftPanel from "./_components/TrackLeftPanel";
import TrackCurriculum from "./_components/TrackCurriculum";
import { addRecentActivity } from "@/lib/recentActivity";

const pageStyle: CSSProperties = {
  fontFamily: "var(--font-roboto), sans-serif",
};

const contentStyle: CSSProperties = {
  maxWidth: "1280px",
  margin: "0 auto",
  padding: "48px 24px 100px",
};

const pageHeaderStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "32px",
};

const pageTitleStyle: CSSProperties = {
  fontSize: "32px",
  fontWeight: 700,
  color: "#1F1A1A",
};

const saveButtonStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  padding: "12px 20px",
  minWidth: "180px",
  backgroundColor: "#094F7A",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
};

const mainContentStyle: CSSProperties = {
  display: "flex",
  gap: "24px",
  alignItems: "stretch",
};

export default function RoadmapFieldPage() {
  const { dept } = useParams<{ dept: string; field: string }>();
  const deptName = decodeURIComponent(dept);
  const fieldId = decodeURIComponent(useParams<{ dept: string; field: string }>().field ?? "");
  const meta = TRACK_META[fieldId] ?? DEFAULT_META;

  const [years, setYears] = useState<TrackYear[]>([]);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getTrackCourses(deptName, fieldId).then((courses) => {
      setYears(buildTrackFromCourses(courses));
    });
    addRecentActivity({
      id: `roadmap-${fieldId}`,
      label: meta.title,
      sub: deptName,
      href: `/roadmap/${encodeURIComponent(dept)}/${encodeURIComponent(fieldId)}`,
      type: "roadmap",
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

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, offsetWidth } = container;
      const yearIndex = Math.round(scrollLeft / (offsetWidth / 2));
      const clampedIdx = Math.max(0, Math.min(yearIndex, track.years.length - 1));
      setSelectedYear(clampedIdx);

      const tabContainer = tabScrollRef.current;
      if (tabContainer) {
        tabContainer.scrollTo({ left: clampedIdx * (tabContainer.offsetWidth / 2), behavior: "smooth" });
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [track.years.length]);

  function scrollToYear(idx: number) {
    setSelectedYear(idx);
    const container = scrollRef.current;
    if (container) {
      container.scrollTo({ left: idx * (container.offsetWidth / 2), behavior: "smooth" });
    }
    const tabContainer = tabScrollRef.current;
    if (tabContainer) {
      tabContainer.scrollTo({ left: idx * (tabContainer.offsetWidth / 2), behavior: "smooth" });
    }
  }

  return (
    <div style={pageStyle}>
      <div style={contentStyle}>
        <div style={pageHeaderStyle}>
          <div>
            <TrackBreadcrumb deptName={deptName} breadcrumbField={track.breadcrumbField} />
            <h1 style={pageTitleStyle}>
              커리어 로드맵
            </h1>
          </div>

          <button
            style={{
              ...saveButtonStyle,
              backgroundColor: saved ? "#FFFFFF" : "#094F7A",
              color: saved ? "#094F7A" : "#FFFFFF",
              border: saved ? "1px solid #094F7A" : "none",
            }}
            onClick={() => {
              setSaved(true);
              setTimeout(() => setSaved(false), 3000);
            }}
          >
            {saved ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M2.25 12C2.25 6.61704 6.61704 2.25 12 2.25C17.383 2.25 21.75 6.61704 21.75 12C21.75 17.383 17.383 21.75 12 21.75C6.61704 21.75 2.25 17.383 2.25 12ZM12 3.75C7.44546 3.75 3.75 7.44546 3.75 12C3.75 16.5545 7.44546 20.25 12 20.25C16.5545 20.25 20.25 16.5545 20.25 12C20.25 7.44546 16.5545 3.75 12 3.75Z" fill="#094F7A"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M16.9824 7.67574C17.2996 7.94216 17.3407 8.41525 17.0743 8.73241L10.7743 16.2324C10.6347 16.3986 10.4299 16.4962 10.2128 16.4999C9.99576 16.5036 9.78776 16.4131 9.64254 16.2517L6.94254 13.2517C6.66544 12.9439 6.6904 12.4696 6.99828 12.1925C7.30617 11.9155 7.78038 11.9404 8.05748 12.2483L10.1805 14.6072L15.9257 7.76762C16.1921 7.45046 16.6652 7.40932 16.9824 7.67574Z" fill="#094F7A"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            )}
            {saved ? "저장되었습니다!" : "내 로드맵으로 저장"}
          </button>
        </div>

        <div style={mainContentStyle}>
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
