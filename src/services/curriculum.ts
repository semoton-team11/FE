// ============================================================
// 커리큘럼 계산기 서비스
// 현재: mock 데이터 반환
// Supabase 연동 시: 아래 주석 처리된 코드로 교체
// ============================================================

import type { Course, CurriculumStatus } from "@/types";
import { MOCK_USER, MOCK_CURRICULUM_REQUIREMENTS } from "@/mock";

export async function getUserCourses(userId: string): Promise<Course[]> {
  // TODO: Supabase 연동 시 교체
  // const { data } = await supabase.from("courses").select("*").eq("user_id", userId);
  // return data ?? [];

  void userId;
  return MOCK_USER.courses;
}

export async function getCurriculumStatus(userId: string): Promise<CurriculumStatus> {
  const courses = await getUserCourses(userId);
  const completedCourses = courses.filter((c) => c.grade !== null);
  const req = MOCK_CURRICULUM_REQUIREMENTS;

  const sum = (type: Course["type"]) =>
    completedCourses.filter((c) => c.type === type).reduce((acc, c) => acc + c.credits, 0);

  return {
    required: { total: req.required, completed: sum("전공필수") },
    elective: { total: req.elective, completed: sum("전공선택") },
    basic: { total: req.basic, completed: sum("전공기초") },
  };
}

export async function addCourse(userId: string, course: Omit<Course, "id">): Promise<Course> {
  // TODO: Supabase 연동 시 교체
  // const { data } = await supabase.from("courses").insert({ ...course, user_id: userId }).select().single();
  // return data;

  void userId;
  return { ...course, id: `temp-${Date.now()}` };
}
