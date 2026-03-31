// ╔══════════════════════════════════════════════════════════════╗
// ║  서비스: 선배 프로필 (seniors)                                ║
// ║  현재 모드 : MOCK                                             ║
// ║  연동 대상 : Supabase — seniors 테이블                        ║
// ║  교체 방법 : 각 함수 안의 SUPABASE 블록 주석 해제 후           ║
// ║             MOCK 블록 삭제                                    ║
// ╠══════════════════════════════════════════════════════════════╣
// ║  Supabase 테이블 구조                                         ║
// ║                                                              ║
// ║  [seniors]                                                   ║
// ║    id              uuid PK                                   ║
// ║    name            text                                      ║
// ║    department_id   uuid → departments(id)                    ║
// ║    department      text  (표시용 문자열, 복수학과 가능)        ║
// ║    graduation_year int                                       ║
// ║    company         text                                      ║
// ║    job_title       text                                      ║
// ║    skills          text[]                                    ║
// ║    profile_image   text  nullable                            ║
// ║    bio             text                                      ║
// ║    tips            text                                      ║
// ║    is_available    boolean                                   ║
// ║    timetable       jsonb  (SemesterTimetable[] 구조)          ║
// ╚══════════════════════════════════════════════════════════════╝

import type { Senior } from "@/types";
import { MOCK_SENIORS } from "@/mock";
// import { supabase } from "@/lib/supabase";

// ──────────────────────────────────────────────────────────────
// getSeniors  — 선배 목록 조회 (필터 옵션)
// DB 테이블 : seniors
// ★ mock: departmentId 필터 없으면 빈 배열 반환 (의도된 동작)
// ──────────────────────────────────────────────────────────────
export async function getSeniors(filters?: {
  departmentId?: string;
  fieldId?: string;
}): Promise<Senior[]> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // let query = supabase.from("seniors").select("*");
  // if (filters?.departmentId) query = query.eq("department_id", filters.departmentId);
  // if (filters?.fieldId)      query = query.eq("field_id", filters.fieldId);
  // const { data, error } = await query;
  // if (error) throw error;
  // return data ?? [];
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (!filters?.departmentId) return [];
  return MOCK_SENIORS.filter((s) => s.departmentId === filters.departmentId);
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}

// ──────────────────────────────────────────────────────────────
// getSeniorById  — 선배 단건 조회
// DB 테이블 : seniors WHERE id = ?
// ──────────────────────────────────────────────────────────────
export async function getSeniorById(id: string): Promise<Senior | null> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // const { data, error } = await supabase
  //   .from("seniors")
  //   .select("*")
  //   .eq("id", id)
  //   .single();
  // if (error) throw error;
  // return data;
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  return MOCK_SENIORS.find((s) => s.id === id) ?? null;
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}
