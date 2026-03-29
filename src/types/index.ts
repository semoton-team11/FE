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

// ============================================================
// 커리어 로드맵
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
  departmentId: string;
  fieldId: string;          // 세부 분야
  company: string;          // 현재 재직 중인 회사
  jobTitle: string;
  skills: string[];         // 보유 스킬 태그
  profileImage: string | null;
  bio: string;              // 한 줄 소개
  tips: string;             // 후배들에게 남기는 팁
  timetable: TimetableEntry[]; // 대학 시절 수강 시간표
  isAvailable: boolean;     // 커피챗/멘토링 가능 여부
  scheduledSession?: { datetime: string; title: string }; // 예정된 세션
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
