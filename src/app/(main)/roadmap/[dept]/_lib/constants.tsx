import React from "react";
import IconUXUI from "../_components/icons/IconUXUI";
import IconCompas from "../_components/icons/IconCompas";
import IconMobility from "../_components/icons/IconMobility";
import IconProduct from "../_components/icons/IconProduct";

export const DEPT_EN: Record<string, string> = {
  "기계공학부": "Department of Mechanical Engineering",
  "산업경영공학과": "Department of Industrial & Management Engineering",
  "원자력공학과": "Department of Nuclear Engineering",
  "화학공학과": "Department of Chemical Engineering",
  "신소재공학과": "Department of Advanced Materials Engineering",
  "사회기반시스템공학과": "Department of Civil & Environmental Engineering",
  "건축공학과": "Department of Architectural Engineering",
  "환경학및환경공학과": "Department of Environmental Science & Engineering",
  "건축학과": "Department of Architecture",
  "산업디자인학과": "Department of Industrial Design",
  "시각디자인학과": "Department of Visual Communication Design",
  "환경조경디자인학과": "Department of Environmental Landscape Design",
  "디지털콘텐츠학과": "Department of Digital Contents",
  "도예학과": "Department of Ceramic Arts",
  "연극영화학화학과": "Department of Theater & Film",
  "PostModern음악과": "Department of PostModern Music",
  "컴퓨터공학과": "Department of Computer Science & Engineering",
  "소프트웨어융합학과": "Department of Software Convergence",
  "인공지능학과": "Department of Artificial Intelligence",
};

export type DeptField = {
  icon: React.ReactNode;
  name: string;
  description: string;
  fieldId: string;
};

export const DEPT_FIELDS: Record<string, DeptField[]> = {
  "산업디자인학과": [
    { icon: React.createElement(IconUXUI), name: "UX/UI 디자인", description: "철저한 리서치와 사용자 중심 방법론을 통해 직관적이고 편리한 디지털 경험을 설계합니다.", fieldId: "ux-ui" },
    { icon: React.createElement(IconCompas), name: "공간 디자인", description: "인간의 심리와 공간의 상호작용을 고려하여 기능적이고 미적인 물리적 공간을 디자인합니다.", fieldId: "space" },
    { icon: React.createElement(IconMobility), name: "모빌리티 디자인", description: "공기역학, 인간공학, 지속가능성에 중점을 둔 혁신적인 차량 디자인으로 미래의 모빌리티를 제안합니다.", fieldId: "mobility" },
    { icon: React.createElement(IconProduct), name: "제품 디자인", description: "다양한 소비자의 욕구를 파악하여 우리의 실제 삶에 필요한 디자인 제품을 개발을 목표로 합니다.", fieldId: "product" },
  ],
  "컴퓨터공학과": [
    { icon: React.createElement(IconUXUI), name: "소프트웨어 공학", description: "효율적이고 유지보수 가능한 소프트웨어 시스템을 설계하고 개발합니다.", fieldId: "sw-eng" },
    { icon: React.createElement(IconCompas), name: "시스템 프로그래밍", description: "운영체제, 컴파일러, 임베디드 시스템 등 저수준 소프트웨어를 다룹니다.", fieldId: "sys-prog" },
    { icon: React.createElement(IconMobility), name: "네트워크 / 보안", description: "안전하고 신뢰할 수 있는 네트워크 인프라와 사이버 보안 솔루션을 연구합니다.", fieldId: "network" },
  ],
  "인공지능학과": [
    { icon: React.createElement(IconUXUI), name: "머신러닝", description: "데이터로부터 패턴을 학습하는 알고리즘을 연구하고 실제 문제에 적용합니다.", fieldId: "ml" },
    { icon: React.createElement(IconCompas), name: "딥러닝", description: "신경망 기반의 모델을 설계하여 이미지, 언어, 음성 등 다양한 분야에 활용합니다.", fieldId: "dl" },
    { icon: React.createElement(IconMobility), name: "AI 윤리 / 정책", description: "인공지능 기술의 사회적 영향과 책임 있는 AI 개발 방향을 탐구합니다.", fieldId: "ai-ethics" },
  ],
};

export const DEFAULT_FIELDS: DeptField[] = [
  { icon: React.createElement(IconUXUI), name: "세부 분야 1", description: "이 학과의 세부 분야에 대한 설명입니다. Supabase 연동 시 실제 데이터로 교체됩니다.", fieldId: "field-1" },
  { icon: React.createElement(IconCompas), name: "세부 분야 2", description: "이 학과의 세부 분야에 대한 설명입니다. Supabase 연동 시 실제 데이터로 교체됩니다.", fieldId: "field-2" },
  { icon: React.createElement(IconMobility), name: "세부 분야 3", description: "이 학과의 세부 분야에 대한 설명입니다. Supabase 연동 시 실제 데이터로 교체됩니다.", fieldId: "field-3" },
];
