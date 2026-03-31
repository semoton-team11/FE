// ╔══════════════════════════════════════════════════════════════╗
// ║  서비스: 커리큘럼 계산기 (curriculum)                         ║
// ║  현재 모드 : MOCK                                             ║
// ║  연동 대상 : Supabase — catalog_courses, curriculum_requirements, ║
// ║             user_courses 테이블                              ║
// ║  교체 방법 : 각 함수 안의 SUPABASE 블록 주석 해제 후           ║
// ║             MOCK 블록 삭제                                    ║
// ╠══════════════════════════════════════════════════════════════╣
// ║  Supabase 테이블 구조                                         ║
// ║                                                              ║
// ║  [catalog_courses]  ← 학과별 제공 과목 (관리자 등록)           ║
// ║    id            uuid PK                                     ║
// ║    department_id uuid → departments(id)                      ║
// ║    name          text                                        ║
// ║    credits       int                                         ║
// ║    code          text                                        ║
// ║    type          text  '전공기초'|'전공필수'|'전공선택'|'교양' ║
// ║                                                              ║
// ║  [curriculum_requirements]  ← 학과별 졸업 요건               ║
// ║    department_id uuid PK → departments(id)                   ║
// ║    required      int   (전공필수 이수 학점)                   ║
// ║    elective      int   (전공선택 이수 학점)                   ║
// ║    basic         int   (전공기초 이수 학점)                   ║
// ║    liberal       int   (교양 이수 학점)                       ║
// ║                                                              ║
// ║  [user_courses]  ← 사용자 이수 체크 과목                      ║
// ║    id                uuid PK                                 ║
// ║    user_id           uuid → profiles(id) ON DELETE CASCADE   ║
// ║    catalog_course_id uuid → catalog_courses(id)              ║
// ║    created_at        timestamp default now()                 ║
// ║    UNIQUE(user_id, catalog_course_id)                        ║
// ╚══════════════════════════════════════════════════════════════╝

import type { CatalogCourse, Course, CurriculumRequirement, CurriculumStatus } from "@/types";
import {
  MOCK_USER,
  MOCK_CURRICULUM_REQUIREMENTS,
  MOCK_CATALOG_COURSES,
  MOCK_CURRICULUM_REQUIREMENTS_BY_DEPT,
} from "@/mock";
// import { supabase } from "@/lib/supabase";

// ──────────────────────────────────────────────────────────────
// getUserCourses  — 사용자가 이수한 과목 목록 반환
// DB 테이블 : user_courses JOIN catalog_courses
// ──────────────────────────────────────────────────────────────
export async function getUserCourses(userId: string): Promise<Course[]> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // const { data, error } = await supabase
  //   .from("user_courses")
  //   .select("catalog_courses(*)")
  //   .eq("user_id", userId);
  // if (error) throw error;
  // return data?.map((row) => row.catalog_courses) ?? [];
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  void userId;
  return MOCK_USER.courses;
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}

// ──────────────────────────────────────────────────────────────
// getCurriculumStatus  — 졸업 요건 대비 이수 현황 계산
// (getCheckedCourses + getCatalogCourses 기반 집계)
// ──────────────────────────────────────────────────────────────
export async function getCurriculumStatus(userId: string, departmentId: string): Promise<CurriculumStatus> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // const { data, error } = await supabase
  //   .from("user_courses")
  //   .select("catalog_courses(credits, type)")
  //   .eq("user_id", userId);
  // if (error) throw error;
  // const courses = data?.map((r) => r.catalog_courses) ?? [];
  // const req = await getCurriculumRequirement(departmentId);
  // const sum = (type: string) => courses.filter((c) => c.type === type).reduce((a, c) => a + c.credits, 0);
  // return {
  //   required: { total: req.required, completed: sum("전공필수") },
  //   elective: { total: req.elective, completed: sum("전공선택") },
  //   basic:    { total: req.basic,    completed: sum("전공기초") },
  // };
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const [checkedIds, catalog, req] = await Promise.all([
    getCheckedCourses(userId),
    getCatalogCourses(departmentId),
    getCurriculumRequirement(departmentId),
  ]);

  const checkedCourses = catalog.filter((c) => checkedIds.has(c.id));
  const sum = (type: CatalogCourse["type"]) =>
    checkedCourses.filter((c) => c.type === type).reduce((a, c) => a + c.credits, 0);

  return {
    required: { total: req.required, completed: sum("전공필수") },
    elective: { total: req.elective, completed: sum("전공선택") },
    basic:    { total: req.basic,    completed: sum("전공기초") },
  };
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}

// ──────────────────────────────────────────────────────────────
// getCatalogCourses  — 학과별 과목 카탈로그 반환
// DB 테이블 : catalog_courses WHERE department_id = ?
// ──────────────────────────────────────────────────────────────
export async function getCatalogCourses(departmentId: string): Promise<CatalogCourse[]> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // const { data, error } = await supabase
  //   .from("catalog_courses")
  //   .select("*")
  //   .eq("department_id", departmentId);
  // if (error) throw error;
  // return data ?? [];
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  return MOCK_CATALOG_COURSES.filter((c) => c.departmentId === departmentId);
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}

// ──────────────────────────────────────────────────────────────
// getCurriculumRequirement  — 학과별 졸업 요건 반환
// DB 테이블 : curriculum_requirements WHERE department_id = ?
// ──────────────────────────────────────────────────────────────
export async function getCurriculumRequirement(
  departmentId: string
): Promise<CurriculumRequirement> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // const { data, error } = await supabase
  //   .from("curriculum_requirements")
  //   .select("*")
  //   .eq("department_id", departmentId)
  //   .single();
  // if (error) throw error;
  // return data;
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const req = MOCK_CURRICULUM_REQUIREMENTS_BY_DEPT[departmentId]
    ?? { required: 36, elective: 21, basic: 12, liberal: 12 };
  return { departmentId, ...req };
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}

// ──────────────────────────────────────────────────────────────
// getCheckedCourses  — 이수 체크된 과목 ID 목록 조회
// DB 테이블 : user_courses WHERE user_id = ?
// 현재     : localStorage  (키: checked_courses_{userId})
// ──────────────────────────────────────────────────────────────
export async function getCheckedCourses(userId: string): Promise<Set<string>> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // const { data, error } = await supabase
  //   .from("user_courses")
  //   .select("catalog_course_id")
  //   .eq("user_id", userId);
  // if (error) throw error;
  // return new Set(data?.map((r) => r.catalog_course_id) ?? []);
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중 — localStorage) ━━━━━━━━━━━━━━━━━━━━
  if (typeof window === "undefined") return new Set();
  const raw = localStorage.getItem(`checked_courses_${userId}`);
  return new Set(raw ? JSON.parse(raw) : []);
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}

// ──────────────────────────────────────────────────────────────
// saveCheckedCourses  — 이수 체크 과목 ID 목록 저장
// DB 테이블 : user_courses (delete + bulk insert)
// 현재     : localStorage
// ──────────────────────────────────────────────────────────────
export async function saveCheckedCourses(
  userId: string,
  checkedIds: string[]
): Promise<void> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // // 기존 이수 목록 전체 삭제 후 재삽입 (upsert 대신 단순 replace)
  // const { error: deleteError } = await supabase
  //   .from("user_courses")
  //   .delete()
  //   .eq("user_id", userId);
  // if (deleteError) throw deleteError;
  //
  // if (checkedIds.length > 0) {
  //   const { error: insertError } = await supabase
  //     .from("user_courses")
  //     .insert(checkedIds.map((id) => ({ user_id: userId, catalog_course_id: id })));
  //   if (insertError) throw insertError;
  // }
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중 — localStorage) ━━━━━━━━━━━━━━━━━━━━
  if (typeof window === "undefined") return;
  localStorage.setItem(`checked_courses_${userId}`, JSON.stringify(checkedIds));
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}

// ──────────────────────────────────────────────────────────────
// addCourse  — 수강 과목 추가 (임시 ID 부여)
// DB 테이블 : user_courses
// ──────────────────────────────────────────────────────────────
export async function addCourse(
  userId: string,
  course: Omit<Course, "id">
): Promise<Course> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // const { data, error } = await supabase
  //   .from("user_courses")
  //   .insert({ ...course, user_id: userId })
  //   .select()
  //   .single();
  // if (error) throw error;
  // return data;
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  void userId;
  return { ...course, id: `temp-${Date.now()}` };
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}
