// ============================================================
// 커리어 로드맵 서비스
// 현재: mock 데이터 반환
// Supabase 연동 시: 아래 주석 처리된 코드로 교체
// ============================================================

import type { College, Department, Field, Job } from "@/types";
import { MOCK_COLLEGES, MOCK_DEPARTMENTS, MOCK_FIELDS, MOCK_JOBS } from "@/mock";

export async function getColleges(): Promise<College[]> {
  // TODO: Supabase 연동 시 교체
  // const { data } = await supabase.from("colleges").select("*");
  // return data ?? [];

  return MOCK_COLLEGES;
}

export async function getDepartments(collegeId?: string): Promise<Department[]> {
  // TODO: Supabase 연동 시 교체
  // let query = supabase.from("departments").select("*");
  // if (collegeId) query = query.eq("college_id", collegeId);
  // const { data } = await query;
  // return data ?? [];

  if (collegeId) return MOCK_DEPARTMENTS.filter((d) => d.collegeId === collegeId);
  return MOCK_DEPARTMENTS;
}

export async function getFields(departmentId?: string): Promise<Field[]> {
  // TODO: Supabase 연동 시 교체
  // const { data } = await supabase.from("fields").select("*");
  // return data ?? [];

  if (departmentId) return MOCK_FIELDS.filter((f) => f.departmentIds.includes(departmentId));
  return MOCK_FIELDS;
}

export async function getJobs(fieldId?: string): Promise<Job[]> {
  // TODO: Supabase 연동 시 교체
  // let query = supabase.from("jobs").select("*");
  // if (fieldId) query = query.eq("field_id", fieldId);
  // const { data } = await query;
  // return data ?? [];

  if (fieldId) return MOCK_JOBS.filter((j) => j.fieldId === fieldId);
  return MOCK_JOBS;
}
