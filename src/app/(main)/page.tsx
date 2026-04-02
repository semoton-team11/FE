"use client";

import { useEffect, useRef, useState } from "react";
import { getCurrentUser } from "@/services/user";
import { MOCK_USER } from "@/mock";
import { getPlannedCourses, getCatalogCourses, getCheckedCourses, getCurriculumRequirement, getCurriculumStatus } from "@/services/curriculum";
import { getSeniors } from "@/services/seniors";
import type { User, CurriculumStatus, Senior, CatalogCourse } from "@/types";
import { Badge } from "@/components/ui/badge";
import AcademicStatusCard from "./_components/AcademicStatusCard";
import PriorityCoursesCard from "./_components/PriorityCoursesCard";
import RecommendedSeniorCard from "./_components/RecommendedSeniorCard";
import RecentActivities from "./_components/RecentActivities";
import HomeFooter from "./_components/HomeFooter";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<CurriculumStatus | null>(null);
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [checkedCourses, setCheckedCourses] = useState<CatalogCourse[]>([]);
  const [seniorIndex, setSeniorIndex] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");

  // ── 데이터 로드 ──
  useEffect(() => {
    getCurrentUser().catch(() => MOCK_USER).then(async (u) => {
      setUser(u);
      const [fetchedSeniors, checkedIds, plannedIds, catalog, req, calcStatus] = await Promise.all([
        getSeniors({ departmentId: u.departmentId }),
        getCheckedCourses(u.id),
        getPlannedCourses(u.id),
        getCatalogCourses().catch(() => []),
        getCurriculumRequirement().catch(() => null),
        getCurriculumStatus(u.id)
      ]);
      setSeniors(fetchedSeniors);
      // 커리큘럼 계획 카드: 시뮬레이터에서 기록한 과목
      setCheckedCourses(catalog.filter((c) => plannedIds.has(c.id)));
      // 학업 현황 카드: 체크된 과목으로 수료율 직접 계산
      if (calcStatus) {
        setStatus(calcStatus);
      }
    });
  }, []);

  // ── 추천 선배 슬라이드 ──
  const goToSenior = (index: number) => {
    if (index === seniorIndex || sliding) return;
    setSlideDir(index > seniorIndex ? "left" : "right");
    setSliding(true);
    setTimeout(() => {
      setSeniorIndex(index);
      setSliding(false);
    }, 250);
  };

  const dragStartX = useRef<number | null>(null);

  const handleDragStart = (clientX: number) => {
    dragStartX.current = clientX;
  };

  const handleDragEnd = (clientX: number) => {
    if (dragStartX.current === null) return;
    const delta = clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) {
      goToSenior(Math.min(seniorIndex + 1, seniors.length - 1));
    } else {
      goToSenior(Math.max(seniorIndex - 1, 0));
    }
  };

  // ── 전체 수료율 계산 ──
  const totalCompleted = status
    ? status.required.completed + status.elective.completed + status.basic.completed
    : 0;
  const totalRequired = status
    ? status.required.total + status.elective.total + status.basic.total
    : 1;
  const overallPct = Math.round((totalCompleted / totalRequired) * 100);
  const isZeroState = false;
  const isPlanZeroState = checkedCourses.length === 0;

  return (
    <div className="flex flex-col gap-[49.54px]" style={{ fontFamily: "var(--font-roboto), sans-serif" }}>

      {/* ── 인사말 ── */}
      <section>
        <div className="flex items-center gap-3 mb-2">
          <h1
            style={{
              fontSize: "49.54px",
              fontWeight: 600,
              letterSpacing: "-2.48px",
              lineHeight: "100%",
              color: "#1F1A1A",
            }}
          >
            반가워요, {user?.name ?? "..."}님.
          </h1>
          <Badge
            variant="outline"
            className="rounded-full border-none text-sm px-3 py-1 shrink-0"
            style={{ backgroundColor: "#FFF8F7", color: "#5C3F3F" }}
          >
            3학년 1학기
          </Badge>
        </div>
        <p
          style={{
            fontSize: "18.58px",
            lineHeight: "28.9px",
            color: "#5C3F3F",
          }}
        >
          현재 전공 과정을 {overallPct}% 달성하셨네요!
        </p>
      </section>

      {/* ── 메인 카드 3개 ── */}
      <section className="flex flex-wrap" style={{ gap: "33.02px" }}>
        <AcademicStatusCard status={status} overallPct={overallPct} isZeroState={isZeroState} />
        <PriorityCoursesCard isZeroState={isPlanZeroState} checkedCourses={checkedCourses} />
        <RecommendedSeniorCard
          seniors={seniors}
          seniorIndex={seniorIndex}
          sliding={sliding}
          slideDir={slideDir}
          dragStartX={dragStartX}
          onGoToSenior={goToSenior}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          isZeroState={isZeroState}
        />
      </section>

      <RecentActivities />

      <HomeFooter />

    </div>
  );
}
