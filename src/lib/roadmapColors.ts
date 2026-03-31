import type { RoadmapCourseType } from "@/types";

/** 전공 유형별 색상 — 과목 카드 border, 범례 dot에 자동 연동 */
export const COURSE_TYPE_COLORS: Record<RoadmapCourseType, { dot: string; label: string }> = {
  기초: { dot: "#094F7A", label: "전공기초" },
  필수: { dot: "#735B24", label: "전공필수" },
  선택: { dot: "#9A001F", label: "전공선택" },
};
