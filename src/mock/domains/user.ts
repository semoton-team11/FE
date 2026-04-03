// 현재 로그인 유저 / 연결 요청 / 메시지 mock 데이터
import type { User, ConnectionRequest, Message } from "@/types";

export const MOCK_USER: User = {
  id: "user-1",
  name: "이연수",
  email: "yeonsu@khu.ac.kr",
  department: "dept-5", // 산업디자인학과
  student_id: 2022110182,
  created_at: "2025.04.01",
  is_graduated: false,
  grade: 3,
  interestedFields: ["field-5", "field-6"],
  profileImage: null,
  courses: [
    { id: "u-c-1", name: "자료구조",       credits: 3, type: "전공필수", semester: "2023-1", grade: "A+" },
    { id: "u-c-2", name: "알고리즘",       credits: 3, type: "전공필수", semester: "2023-2", grade: "A0" },
    { id: "u-c-3", name: "웹프로그래밍",   credits: 3, type: "전공선택", semester: "2023-1", grade: "B+" },
    { id: "u-c-4", name: "선형대수학",     credits: 3, type: "전공기초", semester: "2022-2", grade: "A0" },
    { id: "u-c-5", name: "영어회화",       credits: 2, type: "교양",     semester: "2022-1", grade: "A+" },
    { id: "u-c-6", name: "공학수학",       credits: 3, type: "전공기초", semester: "2022-1", grade: "B0" },
    { id: "u-c-7", name: "소프트웨어공학", credits: 3, type: "전공필수", semester: "2024-1", grade: null },
    { id: "u-c-8", name: "캡스톤디자인",   credits: 3, type: "전공선택", semester: "2024-1", grade: null },
  ],
  scrapedSeniorIds: ["senior-1", "senior-2"],
  scrapedCourseIds: ["c-1", "c-5"],
};

export const MOCK_CONNECTIONS: ConnectionRequest[] = [
  {
    id: "conn-2",
    fromUserId: "user-1",
    toSeniorId: "senior-2",
    type: "멘토링",
    message: "AI/ML 분야로 취업을 준비 중인데 조언 부탁드립니다.",
    status: "accepted",
    createdAt: "2024-03-15T14:00:00Z",
  },
  {
    id: "conn-3",
    fromUserId: "user-1",
    toSeniorId: "senior-3",
    type: "커피챗",
    message: "디자인 커리어에 대해 여쭤보고 싶습니다!",
    status: "accepted",
    createdAt: "2024-03-20T10:00:00Z",
  },
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: "msg-1",
    connectionId: "conn-2",
    senderId: "user-1",
    content: "안녕하세요! 멘토링 요청드립니다.",
    createdAt: "2024-03-15T14:30:00Z",
  },
  {
    id: "msg-2",
    connectionId: "conn-2",
    senderId: "senior-2",
    content: "다음 주 화요일 예대 1층 어떠신가요?",
    createdAt: "2024-03-15T15:00:00Z",
  },
  {
    id: "msg-3",
    connectionId: "conn-3",
    senderId: "user-1",
    content: "안녕하세요! 커피챗 요청드립니다.",
    createdAt: "2024-03-20T10:30:00Z",
  },
  {
    id: "msg-4",
    connectionId: "conn-3",
    senderId: "user-1",
    content: "감사합니다!",
    createdAt: "2024-03-20T11:00:00Z",
  },
];
