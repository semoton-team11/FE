// ── 공통 타입 ──────────────────────────────────────────────────

export type MegaMenuItem = { label: string; href: string };
export type MegaMenuGroup = { title: string; items: MegaMenuItem[] };

// ── 선배와의 연결 메가 메뉴 ───────────────────────────────────

export const SENIORS_MEGA_MENU: MegaMenuGroup[] = [
  {
    title: "공과대학",
    items: [
      "기계공학부", "산업경영공학과", "원자력공학과", "화학공학과",
      "신소재공학과", "사회기반시스템공학과", "건축공학과", "환경학및환경공학과", "건축학과",
    ].map((d) => ({ label: d, href: `/seniors?dept=${encodeURIComponent(d)}` })),
  },
  {
    title: "예술디자인대학",
    items: [
      "산업디자인학과", "시각디자인학과", "환경조경디자인학과",
      "디지털콘텐츠학과", "도예학과", "연극영화학화학과", "PostModern음악과",
    ].map((d) => ({ label: d, href: `/seniors?dept=${encodeURIComponent(d)}` })),
  },
  {
    title: "소프트웨어융합대학",
    items: [
      "컴퓨터공학과", "소프트웨어융합학과", "인공지능학과",
    ].map((d) => ({ label: d, href: `/seniors?dept=${encodeURIComponent(d)}` })),
  },
];

// ── 커리어 로드맵 메가 메뉴 ───────────────────────────────────
// 선배와의 연결과 같은 학과 목록, href만 /roadmap/[dept] 로 연결

export const ROADMAP_MEGA_MENU: MegaMenuGroup[] = [
  {
    title: "공과대학",
    items: [
      "기계공학부", "산업경영공학과", "원자력공학과", "화학공학과",
      "신소재공학과", "사회기반시스템공학과", "건축공학과", "환경학및환경공학과", "건축학과",
    ].map((d) => ({ label: d, href: `/roadmap/${encodeURIComponent(d)}` })),
  },
  {
    title: "예술디자인대학",
    items: [
      "산업디자인학과", "시각디자인학과", "환경조경디자인학과",
      "디지털콘텐츠학과", "도예학과", "연극영화학화학과", "PostModern음악과",
    ].map((d) => ({ label: d, href: `/roadmap/${encodeURIComponent(d)}` })),
  },
  {
    title: "소프트웨어융합대학",
    items: [
      "컴퓨터공학과", "소프트웨어융합학과", "인공지능학과",
    ].map((d) => ({ label: d, href: `/roadmap/${encodeURIComponent(d)}` })),
  },
];
