// mock 데이터 진입점 — 도메인별 파일에서 re-export
// 실제 데이터는 domains/ 폴더 내 각 파일에 있음

export { MOCK_COLLEGES, MOCK_DEPARTMENTS, MOCK_FIELDS, MOCK_JOBS } from "./domains/organization";
export { MOCK_SENIORS } from "./domains/seniors";
export { MOCK_USER, MOCK_CONNECTIONS, MOCK_MESSAGES } from "./domains/user";
export { MOCK_CURRICULUM_REQUIREMENTS, MOCK_CURRICULUM_REQUIREMENTS_BY_DEPT, MOCK_CATALOG_COURSES } from "./domains/curriculum";
export { MOCK_ROADMAP_COURSES } from "./domains/roadmap";
