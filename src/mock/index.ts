import type {
  College,
  Department,
  Field,
  Job,
  Senior,
  User,
  ConnectionRequest,
  Message,
} from "@/types";

// ============================================================
// 단과대학
// ============================================================
export const MOCK_COLLEGES: College[] = [
  { id: "col-1", name: "공과대학" },
  { id: "col-2", name: "경영대학" },
  { id: "col-3", name: "자연과학대학" },
];

// ============================================================
// 학과
// ============================================================
export const MOCK_DEPARTMENTS: Department[] = [
  { id: "dept-1", collegeId: "col-1", name: "컴퓨터공학과" },
  { id: "dept-2", collegeId: "col-1", name: "전기전자공학과" },
  { id: "dept-3", collegeId: "col-2", name: "경영학과" },
  { id: "dept-4", collegeId: "col-3", name: "수학과" },
];

// ============================================================
// 세부 분야
// ============================================================
export const MOCK_FIELDS: Field[] = [
  {
    id: "field-1",
    name: "프론트엔드",
    description: "웹 UI/UX 개발, React/Next.js 등",
    departmentIds: ["dept-1"],
  },
  {
    id: "field-2",
    name: "백엔드",
    description: "서버, API, 데이터베이스 설계 및 개발",
    departmentIds: ["dept-1", "dept-2"],
  },
  {
    id: "field-3",
    name: "AI/ML",
    description: "머신러닝, 딥러닝, 데이터 사이언스",
    departmentIds: ["dept-1", "dept-4"],
  },
  {
    id: "field-4",
    name: "금융공학",
    description: "핀테크, 퀀트, 금융 데이터 분석",
    departmentIds: ["dept-3", "dept-4"],
  },
];

// ============================================================
// 직무
// ============================================================
export const MOCK_JOBS: Job[] = [
  {
    id: "job-1",
    fieldId: "field-1",
    title: "프론트엔드 개발자",
    description: "React/Next.js 기반 웹 서비스를 개발합니다.",
    requiredSkills: ["React", "TypeScript", "CSS", "Next.js"],
  },
  {
    id: "job-2",
    fieldId: "field-2",
    title: "백엔드 개발자",
    description: "API 서버 설계 및 데이터베이스 관리를 담당합니다.",
    requiredSkills: ["Node.js", "PostgreSQL", "Docker", "AWS"],
  },
  {
    id: "job-3",
    fieldId: "field-3",
    title: "ML 엔지니어",
    description: "모델 학습, 배포, 데이터 파이프라인을 구축합니다.",
    requiredSkills: ["Python", "PyTorch", "MLflow", "SQL"],
  },
];

// ============================================================
// 선배 프로필
// ============================================================
export const MOCK_SENIORS: Senior[] = [
  {
    id: "senior-1",
    name: "강대균",
    departmentId: "dept-1",
    fieldId: "field-1",
    company: "카카오",
    jobTitle: "UX 디자인 석사",
    skills: ["Python", "User Research"],
    profileImage: null,
    bio: "사용자 중심 설계를 추구하는 디자이너입니다.",
    tips: "포트폴리오는 완성도보다 설명 능력이 중요해요. 왜 이 기술을 썼는지 말할 수 있어야 해요.",
    timetable: [
      {
        semester: "2021-1",
        courses: [
          { id: "c-1", name: "자료구조", credits: 3, type: "전공필수", semester: "2021-1", grade: "A+" },
          { id: "c-2", name: "웹프로그래밍", credits: 3, type: "전공선택", semester: "2021-1", grade: "A0" },
          { id: "c-3", name: "선형대수학", credits: 3, type: "전공기초", semester: "2021-1", grade: "B+" },
        ],
      },
      {
        semester: "2021-2",
        courses: [
          { id: "c-4", name: "알고리즘", credits: 3, type: "전공필수", semester: "2021-2", grade: "A+" },
          { id: "c-5", name: "UI/UX 디자인", credits: 3, type: "전공선택", semester: "2021-2", grade: "A+" },
        ],
      },
    ],
    isAvailable: true,
    scheduledSession: {
      datetime: "내일 오전 10:00",
      title: "대균 선배님과 함께하는 포폴 리뷰",
    },
  },
  {
    id: "senior-2",
    name: "이수연",
    departmentId: "dept-1",
    fieldId: "field-3",
    company: "네이버",
    jobTitle: "ML 엔지니어",
    skills: ["Python", "PyTorch", "MLflow"],
    profileImage: null,
    bio: "AI로 세상을 바꾸고 싶은 엔지니어입니다.",
    tips: "수학 기초가 정말 중요합니다. 선형대수, 확률통계는 확실히 잡고 가세요.",
    timetable: [
      {
        semester: "2020-2",
        courses: [
          { id: "c-6", name: "확률과통계", credits: 3, type: "전공기초", semester: "2020-2", grade: "A+" },
          { id: "c-7", name: "기계학습", credits: 3, type: "전공선택", semester: "2020-2", grade: "A0" },
        ],
      },
    ],
    isAvailable: false,
  },
  {
    id: "senior-3",
    name: "박민준",
    departmentId: "dept-1",
    fieldId: "field-2",
    company: "토스",
    jobTitle: "백엔드 개발자",
    skills: ["Node.js", "PostgreSQL", "Docker"],
    profileImage: null,
    bio: "안정적인 시스템을 좋아하는 서버 개발자입니다.",
    tips: "데이터베이스 설계를 깊게 공부해두면 어디서든 인정받아요.",
    timetable: [
      {
        semester: "2021-1",
        courses: [
          { id: "c-8", name: "운영체제", credits: 3, type: "전공필수", semester: "2021-1", grade: "A0" },
          { id: "c-9", name: "데이터베이스", credits: 3, type: "전공필수", semester: "2021-1", grade: "A+" },
        ],
      },
    ],
    isAvailable: true,
  },
];

// ============================================================
// 현재 로그인 유저 (mock)
// ============================================================
export const MOCK_USER: User = {
  id: "user-1",
  name: "홍길동",
  email: "hong@university.ac.kr",
  departmentId: "dept-1",
  interestedFields: ["field-1", "field-3"],
  profileImage: null,
  courses: [
    { id: "u-c-1", name: "자료구조", credits: 3, type: "전공필수", semester: "2023-1", grade: "A+" },
    { id: "u-c-2", name: "알고리즘", credits: 3, type: "전공필수", semester: "2023-2", grade: "A0" },
    { id: "u-c-3", name: "웹프로그래밍", credits: 3, type: "전공선택", semester: "2023-1", grade: "B+" },
    { id: "u-c-4", name: "선형대수학", credits: 3, type: "전공기초", semester: "2022-2", grade: "A0" },
    { id: "u-c-5", name: "영어회화", credits: 2, type: "교양", semester: "2022-1", grade: "A+" },
    { id: "u-c-6", name: "공학수학", credits: 3, type: "전공기초", semester: "2022-1", grade: "B0" },
    { id: "u-c-7", name: "소프트웨어공학", credits: 3, type: "전공필수", semester: "2024-1", grade: null },
    { id: "u-c-8", name: "캡스톤디자인", credits: 3, type: "전공선택", semester: "2024-1", grade: null },
  ],
  scrapedSeniorIds: ["senior-1"],
  scrapedCourseIds: ["c-1", "c-5"],
};

// ============================================================
// 연결 요청
// ============================================================
export const MOCK_CONNECTIONS: ConnectionRequest[] = [
  {
    id: "conn-1",
    fromUserId: "user-1",
    toSeniorId: "senior-1",
    type: "커피챗",
    message: "프론트엔드 커리어에 대해 여쭤보고 싶습니다!",
    status: "accepted",
    createdAt: "2024-03-10T10:00:00Z",
    meetingLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "conn-2",
    fromUserId: "user-1",
    toSeniorId: "senior-2",
    type: "멘토링",
    message: "AI/ML 분야로 취업을 준비 중인데 조언 부탁드립니다.",
    status: "pending",
    createdAt: "2024-03-15T14:00:00Z",
  },
];

// ============================================================
// 메시지
// ============================================================
export const MOCK_MESSAGES: Message[] = [
  {
    id: "msg-1",
    connectionId: "conn-1",
    senderId: "user-1",
    content: "안녕하세요! 커피챗 수락해 주셔서 감사합니다.",
    createdAt: "2024-03-11T09:00:00Z",
  },
  {
    id: "msg-2",
    connectionId: "conn-1",
    senderId: "senior-1",
    content: "네, 반갑습니다! 미팅 링크 공유해 드릴게요.",
    createdAt: "2024-03-11T09:30:00Z",
  },
];

// ============================================================
// 커리큘럼 요건 (학교/학과별로 백엔드에서 받아올 데이터)
// 연동 시 services/curriculum.ts에서 교체
// ============================================================
export const MOCK_CURRICULUM_REQUIREMENTS = {
  departmentId: "dept-1",
  required: 36,    // 전공필수 졸업요건 학점
  elective: 21,    // 전공선택 졸업요건 학점
  basic: 12,       // 전공기초 졸업요건 학점
  liberal: 12,     // 교양 졸업요건 학점
};
