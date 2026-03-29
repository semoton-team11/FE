// ============================================================
// 선배 서비스
// 현재: mock 데이터 반환
// Supabase 연동 시: 아래 주석 처리된 코드로 교체
// ============================================================

import type { Senior } from "@/types";
import { MOCK_SENIORS } from "@/mock";

export async function getSeniors(filters?: {
  departmentId?: string;
  fieldId?: string;
}): Promise<Senior[]> {
  // TODO: Supabase 연동 시 교체
  // let query = supabase.from("seniors").select("*");
  // if (filters?.departmentId) query = query.eq("department_id", filters.departmentId);
  // if (filters?.fieldId) query = query.eq("field_id", filters.fieldId);
  // const { data } = await query;
  // return data ?? [];

  let result = MOCK_SENIORS;

  if (filters?.departmentId) {
    result = result.filter((s) => s.departmentId === filters.departmentId);
  }

  if (filters?.fieldId) {
    result = result.filter((s) => s.fieldId === filters.fieldId);
  }

  return result;
}

export async function getSeniorById(id: string): Promise<Senior | null> {
  // TODO: Supabase 연동 시 교체
  // const { data } = await supabase.from("seniors").select("*").eq("id", id).single();
  // return data;

  return MOCK_SENIORS.find((s) => s.id === id) ?? null;
}
