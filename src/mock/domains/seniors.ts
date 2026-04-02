// 선배 프로필 mock 데이터
import type { Senior } from "@/types";

export const MOCK_SENIORS: Senior[] = [
  {
    id: "senior-1",
    name: "강대균",
    departmentId: "dept-5",
    department: "산업디자인학과",
    graduationYear: 2023,
    company: "카카오",
    jobTitle: "UX 디자인 석사",
    skills: ["UX리서치", "인지 심리학", "학술 논문 작성"],
    profileImage: "/profile-kang.svg",
    bio: "저는 대학교 3학년 때부터 백엔드 개발에 관심을 가지고 관련 과목들을 집중적으로 수강했습니다. 특히 데이터베이스와 네트워크 과목이 실무에 많은 도움이 되었습니다.",
    tips: "포트폴리오는 완성도보다 설명 능력이 중요해요. 왜 이 기술을 썼는지 말할 수 있어야 해요.",
    timetable: [
      {
        semester: "2021-1",
        courses: [
          { id: "c-1", name: "자료구조",    credits: 3, type: "전공필수", semester: "2021-1", grade: "A+" },
          { id: "c-2", name: "웹프로그래밍", credits: 3, type: "전공선택", semester: "2021-1", grade: "A0" },
          { id: "c-3", name: "선형대수학",   credits: 3, type: "전공기초", semester: "2021-1", grade: "B+" },
        ],
      },
      {
        semester: "2021-2",
        courses: [
          { id: "c-4", name: "알고리즘",     credits: 3, type: "전공필수", semester: "2021-2", grade: "A+" },
          { id: "c-5", name: "UI/UX 디자인", credits: 3, type: "전공선택", semester: "2021-2", grade: "A+" },
        ],
      },
    ],
    isAvailable: true,
    scheduledSession: { datetime: "2026-04-05 10:00", title: "내일 - 4월 5일", description: "오전 10:00 대균 선배와 함께 하는 포폴 리뷰, 1층 예디대 건물" },

  },
  {
    id: "senior-2",
    name: "김성백",
    departmentId: "dept-5",
    department: "산업디자인학과, 경제학과",
    graduationYear: 2022,
    company: "삼성전자",
    jobTitle: "제품 디자이너",
    skills: ["금융 모델링", "공공 정책", "학위 논문 설계"],
    profileImage: null,
    bio: "AI로 세상을 바꾸고 싶은 엔지니어입니다.",
    tips: "수학 기초가 정말 중요합니다. 선형대수, 확률통계는 확실히 잡고 가세요.",
    timetable: [
      {
        semester: "2020-2",
        courses: [
          { id: "c-6", name: "확률과통계", credits: 3, type: "전공기초", semester: "2020-2", grade: "A+" },
          { id: "c-7", name: "기계학습",   credits: 3, type: "전공선택", semester: "2020-2", grade: "A0" },
        ],
      },
    ],
    isAvailable: false,
  },
  {
    id: "senior-3",
    name: "신현섭",
    departmentId: "dept-5",
    department: "산업디자인학과",
    graduationYear: 2024,
    company: "LG전자",
    jobTitle: "브랜드 디자이너",
    skills: ["시각적 정체성", "타이포그래피", "포트폴리오 리뷰"],
    profileImage: null,
    bio: "안정적인 시스템을 좋아하는 서버 개발자입니다.",
    tips: "데이터베이스 설계를 깊게 공부해두면 어디서든 인정받아요.",
    timetable: [
      {
        semester: "2021-1",
        courses: [
          { id: "c-8", name: "운영체제",   credits: 3, type: "전공필수", semester: "2021-1", grade: "A0" },
          { id: "c-9", name: "데이터베이스", credits: 3, type: "전공필수", semester: "2021-1", grade: "A+" },
        ],
      },
    ],
    isAvailable: true,
  },
];
