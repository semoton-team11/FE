// 단과대학 / 학과 / 세부분야 / 직무
import type { College, Department, Field, Job } from "@/types";

export const MOCK_COLLEGES: College[] = [
  { id: "col-1", name: "공과대학" },
  { id: "col-2", name: "경영대학" },
  { id: "col-3", name: "자연과학대학" },
];

export const MOCK_DEPARTMENTS: Department[] = [
  { id: "dept-1", collegeId: "col-1", name: "컴퓨터공학과" },
  { id: "dept-2", collegeId: "col-1", name: "전기전자공학과" },
  { id: "dept-3", collegeId: "col-2", name: "경영학과" },
  { id: "dept-4", collegeId: "col-3", name: "수학과" },
  { id: "dept-5", collegeId: "col-4", name: "산업디자인학과" },
];

export const MOCK_FIELDS: Field[] = [
  { id: "field-1", name: "프론트엔드",  description: "웹 UI/UX 개발, React/Next.js 등",       departmentIds: ["dept-1"] },
  { id: "field-2", name: "백엔드",      description: "서버, API, 데이터베이스 설계 및 개발",  departmentIds: ["dept-1", "dept-2"] },
  { id: "field-3", name: "AI/ML",       description: "머신러닝, 딥러닝, 데이터 사이언스",     departmentIds: ["dept-1", "dept-4"] },
  { id: "field-4", name: "금융공학",    description: "핀테크, 퀀트, 금융 데이터 분석",        departmentIds: ["dept-3", "dept-4"] },
];

export const MOCK_JOBS: Job[] = [
  { id: "job-1", fieldId: "field-1", title: "프론트엔드 개발자", description: "React/Next.js 기반 웹 서비스를 개발합니다.", requiredSkills: ["React", "TypeScript", "CSS", "Next.js"] },
  { id: "job-2", fieldId: "field-2", title: "백엔드 개발자",     description: "API 서버 설계 및 데이터베이스 관리를 담당합니다.", requiredSkills: ["Node.js", "PostgreSQL", "Docker", "AWS"] },
  { id: "job-3", fieldId: "field-3", title: "ML 엔지니어",       description: "모델 학습, 배포, 데이터 파이프라인을 구축합니다.", requiredSkills: ["Python", "PyTorch", "MLflow", "SQL"] },
];
