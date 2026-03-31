// 현재 로그인 유저 / 연결 요청 / 메시지 mock 데이터
import type { User, ConnectionRequest, Message } from "@/types";

export const MOCK_USER: User = {
  id: "user-1",
  name: "홍길동",
  email: "hong@university.ac.kr",
  departmentId: "dept-5", // 산업디자인학과 (mock 테스트용)
  interestedFields: ["field-1", "field-3"],
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
  scrapedSeniorIds: ["senior-1"],
  scrapedCourseIds: ["c-1", "c-5"],
};

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
