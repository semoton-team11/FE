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
import { apiRequest } from "@/lib/api";
import { MOCK_CATALOG_COURSES, MOCK_CURRICULUM_REQUIREMENTS_BY_DEPT } from "@/mock";

// 백엔드 응답 타입

interface CourseInfo {
  course_name: string;
  course_type: string;
  credits: number;
  college_name: string;
  dept_name: string;
}

interface CurriculumItem {
  id: string;
  course_id: string;
  semester: string;
  grade: string | null;
  completed: boolean;
  courses_master: CourseInfo;
}

interface CoursesResponse {
  course_id: string;
  college_name: string;
  dept_name: string | null;
  course_name: string;
  course_type: string;
  credits: number | null;
}

interface CategoryCredit {
  category: string;
  completed: number;
  required: number;
  remaining: number;
}

interface GraduationResponse {
  categories: CategoryCredit[];
  total_completed: number;
  total_required: number;
  total_remaining: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// 공통 헤더 (토큰 포함)
const getHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// ──────────────────────────────────────────────────────────────
// getUserCourses  — 사용자가 이수한 과목 목록 반환
// GET /curriculum/{user_id}
// DB 테이블 : user_courses JOIN catalog_courses
// ──────────────────────────────────────────────────────────────
export async function getUserCourses(userId: string): Promise<Course[]> {
  const data = await apiRequest<CurriculumItem[]>(`/curriculum/${userId}`);
  return data.map((c) => ({
    id: c.course_id,
    name: c.courses_master.course_name,
    credits: c.courses_master.credits,
    type: c.courses_master.course_type as Course["type"],
    semester: c.semester,
    grade: c.grade,
  }));
}

// ──────────────────────────────────────────────────────────────
// getCurriculumStatus  — 졸업 요건 대비 이수 현황 계산
// (getCheckedCourses + getCatalogCourses 기반 집계)
// ──────────────────────────────────────────────────────────────
export async function getCurriculumStatus(
  userId: string,
): Promise<CurriculumStatus> {
  const response = await apiRequest<GraduationResponse>(
    `/curriculum/${userId}/graduation`
  );

  const data = (response as any).data || response;

  if (!data || !data.categories) {
    console.error("졸업 요건 데이터를 불러오지 못했습니다.", data);
    return {
      required: { total: 0, completed: 0 },
      elective: { total: 0, completed: 0 },
      basic: { total: 0, completed: 0 },
    };
  }

  const findCat = (categoryName: string) =>
    data.categories.find((c: any) => c.category.trim() === categoryName);

  const majorRequired = findCat("전공필수");
  const majorElective = findCat("전공선택");
  const majorBasic = findCat("전공기초");

  return {
    required: { 
      total: majorRequired?.required ?? 0, 
      completed: majorRequired?.completed ?? 0 
    },
    elective: { 
      total: majorElective?.required ?? 0, 
      completed: majorElective?.completed ?? 0 
    },
    basic: { 
      total: majorBasic?.required ?? 0, 
      completed: majorBasic?.completed ?? 0 
    },
  };
}



// ──────────────────────────────────────────────────────────────
// getCatalogCourses  — 학과별 과목 카탈로그 반환
// GET /courses/departments/{dept_name}
// DB 테이블 : catalog_courses WHERE department_id = ?
// ──────────────────────────────────────────────────────────────
export async function getCatalogCourses(): Promise<CatalogCourse[]> {
  try {
    return await apiRequest<CatalogCourse[]>(`/curriculum/courses`);
  } catch {
    return MOCK_CATALOG_COURSES;
  }
}

// ──────────────────────────────────────────────────────────────
// getCurriculumRequirement  — 학과별 졸업 요건 반환
// GET /curriculum/{user_id}/graduation
// DB 테이블 : curriculum_requirements WHERE department_id = ?
// ──────────────────────────────────────────────────────────────
export async function getCurriculumRequirement(): Promise<CurriculumRequirement> {
  try {
    const response = await fetch(`${API_URL}/curriculum/requirements`, {
      method: "GET",
      headers: getHeaders(),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "요건 정보를 가져오지 못했습니다.");
    }

    // 💡 백엔드 응답(result.data)을 FE 타입(CurriculumRequirement)으로 매핑
    const { dept_name, required, elective, basic, liberal, total } = result.data;

    return {
      departmentId: dept_name,
      required: required, 
      elective: elective, 
      basic: basic,           
      liberal: liberal,
    };
  } catch {
    const fallback = MOCK_CURRICULUM_REQUIREMENTS_BY_DEPT["dept-5"]
      ?? { required: 36, elective: 21, basic: 12, liberal: 12 };
    return { departmentId: "dept-5", ...fallback };
  }
}


// ──────────────────────────────────────────────────────────────
// getCheckedCourses  — 이수 체크된 과목 ID 목록 조회
// GET /curriculum/{user_id}
// DB 테이블 : user_courses WHERE user_id = ?
// 현재     : localStorage  (키: checked_courses_{userId})
// ──────────────────────────────────────────────────────────────
export async function getCheckedCourses(userId: string): Promise<Set<string>> {
  try {
    const data = await apiRequest<CurriculumItem[]>(`/curriculum/${userId}`);
    return new Set(
      data.filter((item) => item.completed).map((item) => item.course_id)
    );
  } catch {
    // API 미연결 시 localStorage 저장값 사용 (디자인 리뷰 모드)
    if (typeof window === "undefined") return new Set();
    const raw = localStorage.getItem(`checked_courses_${userId}`);
    return new Set(raw ? JSON.parse(raw) : []);
  }
}

// ──────────────────────────────────────────────────────────────
// saveCheckedCourses  — 이수 체크 과목 ID 목록 저장
// DB 테이블 : user_courses (delete + bulk insert)
// ──────────────────────────────────────────────────────────────
export async function saveCheckedCourses(
  userId: string,
  checkedIds: string[]
): Promise<void> {
  try {
    const current = await apiRequest<CurriculumItem[]>(`/curriculum/${userId}`);
    const currentCourseIds = new Set(current.map((c) => c.course_id));
    const checkedSet = new Set(checkedIds);

    // 1. 새로 체크된 과목 → POST (DB에 없는 것만 추가)
    const toAdd = checkedIds.filter((id) => !currentCourseIds.has(id));

    // 2. 체크 해제된 과목 → DELETE (DB에는 있지만 체크 해제된 것)
    const toDelete = current.filter((c) => !checkedSet.has(c.course_id));

    await Promise.all([
      ...toAdd.map((courseId) =>
        apiRequest(`/curriculum/${userId}`, {
          method: "POST",
          body: JSON.stringify({
            course_id: courseId,
            semester: "2024-1", // 기본 학기 설정
            grade: "P",        // 기본 성적 설정
            completed: true,
          }),
        })
      ),
      ...toDelete.map((c) =>
        apiRequest(`/curriculum/${userId}/${c.id}`, {
          method: "DELETE",
        })
      ),
    ]);
  } catch (error) {
    console.error("저장 중 에러 발생, 로컬 스토리지를 사용합니다.", error);
    if (typeof window !== "undefined") {
      localStorage.setItem(`checked_courses_${userId}`, JSON.stringify(checkedIds));
      localStorage.setItem(`last_planned_${userId}`, JSON.stringify(checkedIds));
    }
  }
}

// ──────────────────────────────────────────────────────────────
// getPlannedCourses  — 홈화면 우선순위 과목 표시용
// ──────────────────────────────────────────────────────────────
export async function getPlannedCourses(userId: string): Promise<Set<string>> {
  if (typeof window === "undefined") return new Set();
  const raw = localStorage.getItem(`last_planned_${userId}`);
  return new Set(raw ? JSON.parse(raw) : []);
}

// ──────────────────────────────────────────────────────────────
// addCourse  — 수강 과목 추가 (임시 ID 부여)
// POST /curriculum/{user_id}
// DB 테이블 : user_courses
// ──────────────────────────────────────────────────────────────
export async function addCourse(
  userId: string,
  course: Omit<Course, "id">
): Promise<Course> {
  const data = await apiRequest<CurriculumItem>(`/curriculum/${userId}`, {
    method: "POST",
    body: JSON.stringify({
      course_id: (course as any).courseId,
      semester: course.semester ?? "",
      grade: course.grade,
      completed: course.grade !== null,
    }),
  });
  return {
    id: data.course_id,
    name: data.courses_master.course_name,
    credits: data.courses_master.credits,
    type: data.courses_master.course_type as Course["type"],
    semester: data.semester,
    grade: data.grade,
  };
}