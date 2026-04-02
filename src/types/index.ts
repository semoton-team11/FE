// ============================================================
// 공통 타입
// ============================================================

export type College = {
  id: string;
  name: string; // 단과대학명
};

export type Department = {
  id: string;
  collegeId: string;
  name: string; // 학과명
};

export type Field = {
  id: string;
  name: string;        // 세부 분야 (ex: 프론트엔드, AI, 금융공학)
  description: string;
  departmentIds: string[]; // 해당 분야로 갈 수 있는 학과
};

// ============================================================
// 커리큘럼 계산기
// ============================================================

export type CourseType = "전공필수" | "전공선택" | "전공기초" | "교양" | "기타";

export type Course = {
  id: string;
  name: string;
  credits: number;
  type: CourseType;
  semester: string;    // ex: "2024-1"
  grade: string | null; // ex: "A+", "B0", null(미이수)
};

export type CurriculumStatus = {
  required: { total: number; completed: number }; // 전공필수
  elective: { total: number; completed: number }; // 전공선택
  basic: { total: number; completed: number };    // 전공기초
};

/** 학과에서 제공하는 과목 카탈로그 단위 */
export type CatalogCourse = {
  id: string;
  name: string;
  credits: number;
  code: string;          // 과목 코드 (예: "FD101")
  type: CourseType;
  department: string;
};

/** 학과별 졸업 요건 */
export type CurriculumRequirement = {
  departmentId: string;
  required: number;   // 전공필수 총 이수 학점
  elective: number;   // 전공선택 총 이수 학점
  basic: number;      // 전공기초 총 이수 학점
  liberal: number;    // 교양 총 이수 학점
};

// ============================================================
// 커리어 로드맵 — 과목 구조
// ============================================================

export type RoadmapCourseType = "기초" | "필수" | "선택";

/** 백엔드에서 받는 로드맵 과목 단위 */
export type RoadmapCourse = {
  id: string;
  name: string;       // 한국어 과목명
  nameEn: string;     // 영어 부제
  type: RoadmapCourseType;
  year: 1 | 2 | 3 | 4;
  semester: 1 | 2;
  dept: string;       // 학과명 (ex: "컴퓨터공학과")
  field: string;      // 분야명 (ex: "프론트엔드")
};

/** UI에서 사용하는 학기 단위 */
export type TrackSemester = {
  sem: string;
  courses: { name: string; sub: string; type: RoadmapCourseType }[];
};

/** UI에서 사용하는 학년 단위 */
export type TrackYear = {
  year: string;
  semesters: TrackSemester[];
};

// ============================================================
// 커리어 로드맵 — 직무
// ============================================================

export type Job = {
  id: string;
  fieldId: string;
  title: string;        // 직무명
  description: string;
  requiredSkills: string[];
};

// ============================================================
// 선배 프로필
// ============================================================

export type Senior = {
  id: string;
  name: string;
  departmentId: string;     // 첫 번째 전공 기준 (필터링용)
  department: string;       // 카드 표시용 (예: "산업디자인학과, 경제학과")
  graduationYear: number;
  company: string;          // 재직 회사
  jobTitle: string;
  skills: string[];         // 전문 분야 태그
  profileImage: string | null;
  bio: string;
  tips: string;
  timetable: TimetableEntry[];
  isAvailable: boolean;
  scheduledSession?: { datetime: string; title: string; description?: string };
};

export type TimetableEntry = {
  semester: string; // ex: "2021-1"
  courses: Course[];
};

// ============================================================
// 메시지 / 연결 요청
// ============================================================

export type ConnectionStatus = "pending" | "accepted" | "rejected";

export type ConnectionRequest = {
  id: string;
  fromUserId: string;
  toSeniorId: string;
  type: "커피챗" | "멘토링";
  message: string;
  status: ConnectionStatus;
  createdAt: string;
  meetingLink?: string;
};

export type Message = {
  id: string;
  connectionId: string;
  senderId: string;
  content: string;
  createdAt: string;
};

// ============================================================
// 유저 (마이페이지)
// ============================================================

export type User = {
  id: string;
  name: string;
  email: string;
  departmentId: string;
  interestedFields: string[]; // fieldId[]
  profileImage: string | null;
  courses: Course[];           // 내가 수강한 과목들
  scrapedSeniorIds: string[];
  scrapedCourseIds: string[];
};
