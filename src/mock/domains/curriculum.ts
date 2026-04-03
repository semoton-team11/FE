// 커리큘럼 요건 / 과목 카탈로그 mock 데이터
// Supabase 연동 시 services/curriculum.ts에서 교체
import type { CatalogCourse } from "@/types";

// ── 졸업 요건 (학과별) ───────────────────────────────────────

export const MOCK_CURRICULUM_REQUIREMENTS = {
  departmentId: "dept-1",
  required: 36,
  elective: 21,
  basic: 12,
  liberal: 12,
};

export const MOCK_CURRICULUM_REQUIREMENTS_BY_DEPT: Record<
  string,
  { required: number; elective: number; basic: number; liberal: number }
> = {
  "dept-5": { required: 21, elective: 28, basic: 18, liberal: 12 },
  "dept-1": { required: 36, elective: 21, basic: 12, liberal: 12 },
};

// ── 과목 카탈로그 (학과별) ────────────────────────────────────

export const MOCK_CATALOG_COURSES: CatalogCourse[] = [
  // ── 산업디자인학과 (dept-5) ──────────────────────────────────

  // 전공기초
  { id: "fd101", department: "산업디자인학과", name: "드로잉",              credits: 3, code: "FD101", type: "전공기초" },
  { id: "fd103", department: "산업디자인학과", name: "평면디자인",           credits: 3, code: "FD103", type: "전공기초" },
  { id: "fd105", department: "산업디자인학과", name: "디지털디자인",         credits: 3, code: "FD105", type: "전공기초" },
  { id: "fd109", department: "산업디자인학과", name: "현대미술사",           credits: 3, code: "FD109", type: "전공기초" },
  { id: "fd110", department: "산업디자인학과", name: "예술과 디자인의 이해", credits: 3, code: "FD110", type: "전공기초" },
  { id: "fd111", department: "산업디자인학과", name: "입체디자인",           credits: 3, code: "FD111", type: "전공기초" },
  { id: "fd112", department: "산업디자인학과", name: "산업디자인리서치",     credits: 3, code: "FD112", type: "전공기초" },

  // 전공필수
  { id: "id2020", department: "산업디자인학과", name: "디자인 프로토타입",  credits: 3, code: "ID2020", type: "전공필수" },
  { id: "id2013", department: "산업디자인학과", name: "조형디자인 1",       credits: 3, code: "ID2013", type: "전공필수" },
  { id: "id2014", department: "산업디자인학과", name: "조형디자인 2",       credits: 3, code: "ID2014", type: "전공필수" },
  { id: "id3010", department: "산업디자인학과", name: "디자인 비즈니스",    credits: 3, code: "ID3010", type: "전공필수" },
  { id: "id2003", department: "산업디자인학과", name: "기초산업디자인 1",   credits: 3, code: "ID2003", type: "전공필수" },
  { id: "id2004", department: "산업디자인학과", name: "기초산업디자인 2",   credits: 3, code: "ID2004", type: "전공필수" },
  { id: "id3012", department: "산업디자인학과", name: "UX 디자인",          credits: 3, code: "ID3012", type: "전공필수" },
  { id: "id4012", department: "산업디자인학과", name: "졸업논문",           credits: 3, code: "ID4012", type: "전공필수" },

  // 전공선택
  { id: "id2001", department: "산업디자인학과", name: "산업디자인사",         credits: 3, code: "ID2001", type: "전공선택" },
  { id: "id2002", department: "산업디자인학과", name: "디지털이미징",         credits: 3, code: "ID2002", type: "전공선택" },
  { id: "id2019", department: "산업디자인학과", name: "디지털입체디자인1",    credits: 3, code: "ID2019", type: "전공선택" },
  { id: "id2022", department: "산업디자인학과", name: "디지털입체디자인2",    credits: 3, code: "ID2022", type: "전공선택" },
  { id: "id2023", department: "산업디자인학과", name: "리빙제품디자인",       credits: 3, code: "ID2023", type: "전공선택" },
  { id: "id3013", department: "산업디자인학과", name: "모빌리티디자인 1",     credits: 3, code: "ID3013", type: "전공선택" },
  { id: "id3014", department: "산업디자인학과", name: "실내공간디자인 1",     credits: 3, code: "ID3014", type: "전공선택" },
  { id: "id3015", department: "산업디자인학과", name: "이노베이티브디자인 1", credits: 3, code: "ID3015", type: "전공선택" },
  { id: "id3017", department: "산업디자인학과", name: "서비스디자인",         credits: 3, code: "ID3017", type: "전공선택" },
  { id: "id3018", department: "산업디자인학과", name: "모빌리티디자인 2",     credits: 3, code: "ID3018", type: "전공선택" },
  { id: "id3019", department: "산업디자인학과", name: "실내공간디자인 2",     credits: 3, code: "ID3019", type: "전공선택" },
  { id: "id3020", department: "산업디자인학과", name: "이노베이티브디자인 2", credits: 3, code: "ID3020", type: "전공선택" },
  { id: "id4014", department: "산업디자인학과", name: "인공지능증강디자인 1", credits: 3, code: "ID4014", type: "전공선택" },
  { id: "id4015", department: "산업디자인학과", name: "스마트융합디자인 1",   credits: 3, code: "ID4015", type: "전공선택" },
  { id: "id4017", department: "산업디자인학과", name: "미래공간디자인 1",     credits: 3, code: "ID4017", type: "전공선택" },
  { id: "id4019", department: "산업디자인학과", name: "산업디자인종합설계 1", credits: 3, code: "ID4019", type: "전공선택" },
  { id: "id4020", department: "산업디자인학과", name: "인공지능증강디자인 2", credits: 3, code: "ID4020", type: "전공선택" },
  { id: "id4021", department: "산업디자인학과", name: "스마트융합디자인 2",   credits: 3, code: "ID4021", type: "전공선택" },
  { id: "id4023", department: "산업디자인학과", name: "미래공간디자인 2",     credits: 3, code: "ID4023", type: "전공선택" },
  { id: "id4024", department: "산업디자인학과", name: "산업디자인종합설계 2", credits: 3, code: "ID4024", type: "전공선택" },
];
