// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  curriculum/result/page.tsx — 커리큘럼 결과 페이지                         ║
// ║                                                                          ║
// ║  역할:                                                                    ║
// ║    이전 페이지(curriculum/page.tsx)에서 체크한 수강 내역을 바탕으로         ║
// ║    졸업 사정 현황과 추가 수강 계획(planned) 시뮬레이터를 제공하는 페이지.    ║
// ║                                                                          ║
// ║  상태 변수:                                                                ║
// ║    userId      — 현재 사용자 ID                                            ║
// ║    catalog     — 전체 과목 목록                                             ║
// ║    requirement — 졸업 요건 학점                                             ║
// ║    checked     — 수강 완료 과목 ID Set (이전 페이지에서 저장한 값)           ║
// ║    planned     — 수강 계획 과목 ID Set (이 페이지에서 추가 선택)             ║
// ║    status      — 커리큘럼 상태 데이터 (현재 미사용)                          ║
// ║                                                                          ║
// ║  데이터 흐름:                                                              ║
// ║    getCurrentUser() → getCatalogCourses(), getCurriculumRequirement(),    ║
// ║                       getCheckedCourses(), getCurriculumStatus()          ║
// ║    → completedByType, plannedByType 계산                                  ║
// ║    → GraduationStatusCard (sticky 히어로) + CourseSection + SimulatorPanel ║
// ║    "기록하기": localStorage에 planned 저장 → /curriculum/result/summary    ║
// ║                                                                          ║
// ║  의존성:                                                                  ║
// ║    - @/services/curriculum       : 5개 API                               ║
// ║    - ./_lib/constants            : CATEGORY_ORDER                        ║
// ║    - GraduationStatusCard        : 상단 스티키 졸업 현황 카드               ║
// ║    - CourseSection               : 카테고리별 과목 목록 (체크/계획 토글)     ║
// ║    - SimulatorPanel              : 우측 수강 계획 시뮬레이터 패널            ║
// ╚══════════════════════════════════════════════════════════════════════════╝

"use client";

// React 훅
import { useState, useEffect, useRef } from "react";
// Next.js 라우터 — "기록하기" 클릭 시 summary 페이지로 이동
import { useRouter } from "next/navigation";
// 커리큘럼 API 서비스
import { getCurriculumStatus, getCatalogCourses, getCurriculumRequirement, getCheckedCourses, saveCheckedCourses } from "@/services/curriculum";
// 현재 사용자 조회
import { getCurrentUser } from "@/services/user";
// 타입 정의
import type { CatalogCourse, CurriculumRequirement } from "@/types";
// 카테고리 순서 상수 ["전공기초", "전공필수", "전공선택"]
import { CATEGORY_ORDER } from "./_lib/constants";
import type { CategoryType } from "./_lib/constants";
// 하위 컴포넌트들
import { GraduationStatusCard } from "./_components/GraduationStatusCard";
import { CourseSection } from "./_components/CourseSection";
import { SimulatorPanel } from "./_components/SimulatorPanel";

/**
 * CurriculumResultPage
 *
 * 커리큘럼 결과 페이지.
 * 수강 완료 현황을 졸업 요건과 비교하여 보여주고,
 * 추가 수강 계획(planned)을 선택할 수 있는 시뮬레이터를 제공한다.
 */
export default function CurriculumResultPage() {
  const router = useRouter();

  // userId: localStorage 접근 및 API 호출에 사용
  const [userId, setUserId] = useState("");
  // catalog: 전체 과목 목록 — type별 필터링으로 CourseSection에 전달
  const [catalog, setCatalog] = useState<CatalogCourse[]>([]);
  // requirement: {basic, required, elective} — 카테고리별 요건 학점
  const [requirement, setRequirement] = useState<CurriculumRequirement | null>(null);
  // checked: 이전 페이지에서 수강 완료로 체크한 과목 ID Set
  const [checked, setChecked] = useState<Set<string>>(new Set());
  // planned: 이 페이지에서 추가로 수강 계획한 과목 ID Set
  //          checked와 별도로 관리 — "앞으로 들을 강의" 시뮬레이션용
  const [planned, setPlanned] = useState<Set<string>>(new Set());
  // status: getCurriculumStatus 응답 (현재 미사용 — 향후 활용 예정)
  const [status, setStatus] = useState<any>(null);

  // ── 스크롤 기반 border-radius ────────────────────────────────
  // heroRef      : sticky 히어로 카드 wrapper — bottom 위치 추적용
  // courseCardRef: 좌측 과목 카드 — top 위치 추적용
  // cardTopRadius: 과목 카드 상단 border-radius (20 → 0, 히어로 카드 아래로 들어갈수록 감소)
  const heroRef = useRef<HTMLDivElement>(null);
  const courseCardRef = useRef<HTMLDivElement>(null);
  const [cardTopRadius, setCardTopRadius] = useState(20);

  // ── 스크롤 이벤트 — 과목 카드 상단 radius 보간 ───────────────
  useEffect(() => {
    const TRANSITION_RANGE = 20; // hero bottom과 card top 사이 거리 20px 구간에서 보간
    const RADIUS_MAX = 20;

    function handleScroll() {
      if (!heroRef.current || !courseCardRef.current) return;
      const heroBottom = heroRef.current.getBoundingClientRect().bottom;
      const cardTop   = courseCardRef.current.getBoundingClientRect().top;
      // diff > 0  : 카드가 히어로 아래에 있음 (정상)
      // diff <= 0 : 카드 상단이 히어로 아래로 들어간 상태
      const diff = cardTop - heroBottom;

      if (diff >= TRANSITION_RANGE) {
        setCardTopRadius(RADIUS_MAX);
      } else if (diff <= 0) {
        setCardTopRadius(0);
      } else {
        // TRANSITION_RANGE → 0 구간을 RADIUS_MAX → 0 으로 선형 보간
        setCardTopRadius(Math.round((diff / TRANSITION_RANGE) * RADIUS_MAX));
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // 초기 위치 계산
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── 데이터 로드 ──────────────────────────────────────────────
  useEffect(() => {
    getCurrentUser().then(async (user) => {
      if (!user) return;
<<<<<<< HEAD
      setUserId(user.id);

      const [courses, req, savedChecked, calcStatus] = await Promise.all([
=======

      setUserId(user.id);
      // 병렬 API 호출 — getCurriculumStatus는 실패해도 진행 (catch)
      const [courses, req, savedChecked] = await Promise.all([
>>>>>>> bbda612 (fix:update)
        getCatalogCourses(),
        getCurriculumRequirement(),
        getCheckedCourses(user.id),
        // getCurriculumStatus 실패 시 null 반환 (데이터 없어도 페이지 동작)
        getCurriculumStatus(user.id).catch(() => null),
      ]);
      setCatalog(courses);
      setRequirement(req);
      setChecked(savedChecked);
      setStatus(calcStatus);
    });
  }, []);

<<<<<<< HEAD
  if (!status) return null;
=======
  // requirement가 로드되기 전에는 렌더하지 않음 (null 방지)
  if (!requirement) return null;
>>>>>>> bbda612 (fix:update)

  // ── 학점 계산 ─────────────────────────────────────────────────

  /** 카테고리별 졸업 요건 학점 맵 */
  const reqByType: Record<CategoryType, number> = {
    "전공기초": status.basic.total,
    "전공필수": status.required.total,
    "전공선택": status.elective.total,
  };

<<<<<<< HEAD
  const completedByType: Record<CategoryType, number> = {
    "전공기초": status.basic.completed,
    "전공필수": status.required.completed,
    "전공선택": status.elective.completed,
  };
=======
  /**
   * completedByType: 카테고리별 수강 완료 학점 합산
   * catalog에서 type이 일치하고 checked에 포함된 과목들의 credits 합
   */
  const completedByType = CATEGORY_ORDER.reduce((acc, type) => {
    acc[type] = catalog
      .filter(c => c.type === type && checked.has(c.id))
      .reduce((s, c) => s + c.credits, 0);
    return acc;
  }, {} as Record<CategoryType, number>);
>>>>>>> bbda612 (fix:update)

  /**
   * plannedByType: 카테고리별 수강 계획 학점 합산
   * planned에 있고, checked에는 없는 과목 (중복 카운트 방지)
   */
  const plannedByType = CATEGORY_ORDER.reduce((acc, type) => {
    acc[type] = catalog
      .filter(c => c.type === type && planned.has(c.id) && !checked.has(c.id))
      .reduce((s, c) => s + c.credits, 0);
    return acc;
  }, {} as Record<CategoryType, number>);

<<<<<<< HEAD
  let total = 120
  if (requirement) {
    total = requirement?.basic+ requirement?.elective + requirement?.required
  }

  const totalRequired = total; // 또는 status.total_required (서비스 함수에서 추가해줬을 경우)
  const totalCompleted = status.basic.completed + status.required.completed + status.elective.completed;
=======
  // 전체 요건 학점 합
  const totalRequired = Object.values(reqByType).reduce((a, b) => a + b, 0);
  // 전체 완료 학점 합
  const totalCompleted = Object.values(completedByType).reduce((a, b) => a + b, 0);
  // 남은 요건 학점 (음수가 되면 초과 달성)
>>>>>>> bbda612 (fix:update)
  const remaining = totalRequired - totalCompleted;
  // const totalRequired = Object.values(reqByType).reduce((a, b) => a + b, 0);
  // const totalCompleted = Object.values(completedByType).reduce((a, b) => a + b, 0);
  // const remaining = totalRequired - totalCompleted;

  // ── 핸들러 ───────────────────────────────────────────────────

  /**
   * togglePlanned
   *
   * 수강 계획(planned) 과목 토글.
   * checked와 독립적으로 관리 — 완료된 과목도 planned에 추가 가능하지만
   * plannedByType 계산 시 !checked.has(c.id) 조건으로 중복 제외.
   */
  function togglePlanned(id: string) {
    setPlanned(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  /**
   * handleRecord
   *
   * "기록하기" 버튼 핸들러.
   * planned 데이터를 localStorage에 저장 후 summary 페이지로 이동.
   * (localStorage 사용 이유: 페이지 이동 시 상태가 사라지므로 임시 저장)
   */
  async function handleRecord() {
    if (!userId) return;
    // summary 페이지에서 읽어갈 planned 과목 ID 배열을 localStorage에 저장
    localStorage.setItem(`last_planned_${userId}`, JSON.stringify([...planned]));
    router.push("/curriculum/result/summary");
  }

  // ── 렌더 ─────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "var(--font-roboto), sans-serif", minHeight: "100vh", backgroundColor: "transparent" }}>

      {/* ── 히어로 카드 (sticky) ── */}
      {/* containerRef: sticky div에 직접 연결 — wrapper 없이 bottom 위치 추적 */}
      <GraduationStatusCard
        remaining={remaining}
        totalCompleted={totalCompleted}
        totalRequired={totalRequired}
        completedByType={completedByType}
        plannedByType={plannedByType}
        reqByType={reqByType}
        containerRef={heroRef}
      />

      {/* ── 본문 ── */}
      <div style={{ maxWidth: "1064px", margin: "0 auto", padding: "0 24px 0", marginBottom: "-30px" }}>
        <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", justifyContent: "center", paddingBottom: "0" }}>

          {/* ── 좌측: 카테고리별 과목 목록 카드 ── */}
          <div style={{ width: "700px", flexShrink: 0, backgroundColor: "#FFFFFF", borderRadius: "20px", padding: "32px 36px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
            {/* 각 카테고리(전공기초/필수/선택)를 순서대로 렌더 */}
            {CATEGORY_ORDER.map((type, idx) => (
              <CourseSection
                key={type}
                type={type}
                // 해당 카테고리 과목만 필터링하여 전달
                courses={catalog.filter(c => c.type === type)}
                completed={completedByType[type]}
                total={reqByType[type]}
                checked={checked}
                planned={planned}
                onTogglePlanned={togglePlanned}
                // 마지막 카테고리 여부 — 구분선 렌더 제어
                isLast={idx === CATEGORY_ORDER.length - 1}
              />
            ))}
          </div>

          {/* ── 우측: 수강 계획 시뮬레이터 패널 ── */}
          <SimulatorPanel
            remaining={remaining}
            planned={planned}
            catalog={catalog}
            onRecord={handleRecord}
          />

        </div>
      </div>
    </div>
  );
}
