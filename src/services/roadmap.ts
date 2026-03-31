// ╔══════════════════════════════════════════════════════════════╗
// ║  서비스: 커리어 로드맵 (roadmap)                              ║
// ║  현재 모드 : MOCK                                             ║
// ║  연동 대상 : Supabase — colleges, departments, fields,        ║
// ║             jobs, roadmap_courses 테이블                     ║
// ║  교체 방법 : 각 함수 안의 SUPABASE 블록 주석 해제 후           ║
// ║             MOCK 블록 삭제                                    ║
// ╠══════════════════════════════════════════════════════════════╣
// ║  Supabase 테이블 구조                                         ║
// ║                                                              ║
// ║  [colleges]                                                  ║
// ║    id   uuid PK · name text                                  ║
// ║                                                              ║
// ║  [departments]                                               ║
// ║    id uuid PK · college_id uuid · name text                  ║
// ║                                                              ║
// ║  [fields]                                                    ║
// ║    id uuid PK · name text · department_ids text[]            ║
// ║                                                              ║
// ║  [jobs]                                                      ║
// ║    id uuid PK · field_id uuid · name text                    ║
// ║                                                              ║
// ║  [roadmap_courses]                                           ║
// ║    id       uuid PK                                          ║
// ║    dept     text  (학과 식별자)                               ║
// ║    field    text  (분야 식별자)                               ║
// ║    name     text                                             ║
// ║    name_en  text                                             ║
// ║    type     text  '전공필수'|'전공선택'|'전공기초'|'교양'      ║
// ║    year     int   (1~4)                                      ║
// ║    semester int   (1|2)                                      ║
// ╚══════════════════════════════════════════════════════════════╝

import type { College, Department, Field, Job, RoadmapCourse, TrackYear } from "@/types";
import {
  MOCK_COLLEGES,
  MOCK_DEPARTMENTS,
  MOCK_FIELDS,
  MOCK_JOBS,
  MOCK_ROADMAP_COURSES,
} from "@/mock";
// import { supabase } from "@/lib/supabase";

// ──────────────────────────────────────────────────────────────
// getColleges  — 대학(단과대) 목록 전체 조회
// DB 테이블 : colleges
// ──────────────────────────────────────────────────────────────
export async function getColleges(): Promise<College[]> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // const { data, error } = await supabase.from("colleges").select("*");
  // if (error) throw error;
  // return data ?? [];
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  return MOCK_COLLEGES;
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}

// ──────────────────────────────────────────────────────────────
// getDepartments  — 학과 목록 조회 (단과대 필터 옵션)
// DB 테이블 : departments WHERE college_id = ?
// ──────────────────────────────────────────────────────────────
export async function getDepartments(collegeId?: string): Promise<Department[]> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // let query = supabase.from("departments").select("*");
  // if (collegeId) query = query.eq("college_id", collegeId);
  // const { data, error } = await query;
  // if (error) throw error;
  // return data ?? [];
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (collegeId) return MOCK_DEPARTMENTS.filter((d) => d.collegeId === collegeId);
  return MOCK_DEPARTMENTS;
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}

// ──────────────────────────────────────────────────────────────
// getFields  — 분야(진로) 목록 조회 (학과 필터 옵션)
// DB 테이블 : fields (WHERE department_id IN department_ids)
// ──────────────────────────────────────────────────────────────
export async function getFields(departmentId?: string): Promise<Field[]> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // let query = supabase.from("fields").select("*");
  // if (departmentId) query = query.contains("department_ids", [departmentId]);
  // const { data, error } = await query;
  // if (error) throw error;
  // return data ?? [];
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (departmentId) return MOCK_FIELDS.filter((f) => f.departmentIds.includes(departmentId));
  return MOCK_FIELDS;
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}

// ──────────────────────────────────────────────────────────────
// getJobs  — 직무 목록 조회 (분야 필터 옵션)
// DB 테이블 : jobs WHERE field_id = ?
// ──────────────────────────────────────────────────────────────
export async function getJobs(fieldId?: string): Promise<Job[]> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // let query = supabase.from("jobs").select("*");
  // if (fieldId) query = query.eq("field_id", fieldId);
  // const { data, error } = await query;
  // if (error) throw error;
  // return data ?? [];
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (fieldId) return MOCK_JOBS.filter((j) => j.fieldId === fieldId);
  return MOCK_JOBS;
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}

// ──────────────────────────────────────────────────────────────
// getTrackCourses  — 학과 + 분야로 로드맵 과목 조회
// DB 테이블 : roadmap_courses WHERE dept = ? AND field = ?
// ──────────────────────────────────────────────────────────────
export async function getTrackCourses(dept: string, field: string): Promise<RoadmapCourse[]> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // const { data, error } = await supabase
  //   .from("roadmap_courses")
  //   .select("*")
  //   .eq("dept", dept)
  //   .eq("field", field);
  // if (error) throw error;
  // return data ?? [];
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  return MOCK_ROADMAP_COURSES.filter((c) => c.dept === dept && c.field === field);
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}

// ──────────────────────────────────────────────────────────────
// buildTrackFromCourses  — flat 과목 배열 → UI 학년/학기 중첩 구조 변환
// ★ 순수 변환 함수 (mock/Supabase 무관 — 교체 불필요)
// ──────────────────────────────────────────────────────────────
export function buildTrackFromCourses(courses: RoadmapCourse[]): TrackYear[] {
  return ([1, 2, 3, 4] as const).map((y) => ({
    year: `YEAR ${y}`,
    semesters: ([1, 2] as const).map((s) => ({
      sem: `SEM 0${s}`,
      courses: courses
        .filter((c) => c.year === y && c.semester === s)
        .map((c) => ({ name: c.name, sub: c.nameEn, type: c.type })),
    })),
  }));
}
