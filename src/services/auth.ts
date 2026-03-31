// ╔══════════════════════════════════════════════════════════════╗
// ║  서비스: 인증 (auth)                                          ║
// ║  현재 모드 : MOCK (console.log 처리)                          ║
// ║  연동 대상 : Supabase Auth + profiles 테이블                  ║
// ║  교체 방법 : 각 함수 안의 SUPABASE 블록 주석 해제 후           ║
// ║             MOCK 블록 삭제                                    ║
// ╠══════════════════════════════════════════════════════════════╣
// ║  Supabase 테이블 구조                                         ║
// ║                                                              ║
// ║  [auth.users]  ← Supabase 자동 관리                          ║
// ║    id (uuid PK) · email · created_at                         ║
// ║                                                              ║
// ║  [profiles]  ← 회원가입 시 직접 insert                        ║
// ║    id               uuid PK  → auth.users(id) ON DELETE CASCADE ║
// ║    name             text                                     ║
// ║    student_id       text                                     ║
// ║    department_id    uuid → departments(id)  ★ 커리큘럼 핵심  ║
// ║    is_graduated     boolean  default false                   ║
// ║    profile_image    text  nullable                           ║
// ║    interested_fields   text[]  default '{}'                  ║
// ║    scraped_senior_ids  text[]  default '{}'                  ║
// ║    scraped_course_ids  text[]  default '{}'                  ║
// ║    created_at       timestamp  default now()                 ║
// ║                                                              ║
// ║  [departments]                                               ║
// ║    id uuid PK · college_id uuid · name text                  ║
// ║                                                              ║
// ║  RLS 권장 설정                                                ║
// ║    profiles      : SELECT/UPDATE where id = auth.uid()       ║
// ║    user_courses  : SELECT/INSERT/DELETE where user_id = auth.uid() ║
// ║    catalog_courses, curriculum_requirements : SELECT public  ║
// ║    departments, colleges : SELECT public                     ║
// ╚══════════════════════════════════════════════════════════════╝

// import { supabase } from "@/lib/supabase";

// ── 타입 ──────────────────────────────────────────────────────

export type SignupData = {
  email: string;
  password: string;
  name: string;
  studentId: string;
  department: string;   // 학과 이름 (ex: "산업디자인학과")
  isGraduated: boolean;
};

// ──────────────────────────────────────────────────────────────
// signUp  — 회원가입
// 1. Supabase Auth 계정 생성
// 2. departments 테이블에서 학과명으로 department_id 조회
// 3. profiles 테이블에 사용자 정보 저장
// ★ department_id 가 커리큘럼 과목 조회의 핵심 키
// ──────────────────────────────────────────────────────────────
export async function signUp(data: SignupData): Promise<{ success: boolean; error?: string }> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // try {
  //   const { data: authData, error: authError } = await supabase.auth.signUp({
  //     email: data.email,
  //     password: data.password,
  //   });
  //   if (authError) throw authError;
  //   const userId = authData.user!.id;
  //
  //   const { data: dept, error: deptError } = await supabase
  //     .from("departments")
  //     .select("id")
  //     .eq("name", data.department)
  //     .single();
  //   if (deptError) throw new Error(`학과를 찾을 수 없습니다: ${data.department}`);
  //
  //   const { error: profileError } = await supabase.from("profiles").insert({
  //     id: userId,
  //     name: data.name,
  //     student_id: data.studentId,
  //     department_id: dept.id,   // ← getCatalogCourses() 에 전달되는 핵심 값
  //     is_graduated: data.isGraduated,
  //   });
  //   if (profileError) throw profileError;
  //
  //   return { success: true };
  // } catch (err: unknown) {
  //   return { success: false, error: err instanceof Error ? err.message : "알 수 없는 오류" };
  // }
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log("[mock] signUp:", data);
  return { success: true };
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}

// ──────────────────────────────────────────────────────────────
// signIn  — 이메일/비밀번호 로그인
// ──────────────────────────────────────────────────────────────
export async function signIn(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // const { error } = await supabase.auth.signInWithPassword({ email, password });
  // if (error) return { success: false, error: error.message };
  // return { success: true };
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log("[mock] signIn:", email);
  void password;
  return { success: true };
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}

// ──────────────────────────────────────────────────────────────
// signOut  — 로그아웃
// ──────────────────────────────────────────────────────────────
export async function signOut(): Promise<void> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // await supabase.auth.signOut();
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log("[mock] signOut");
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}

// ──────────────────────────────────────────────────────────────
// signInWithGoogle  — Google OAuth 로그인
// ──────────────────────────────────────────────────────────────
export async function signInWithGoogle(): Promise<{ success: boolean; error?: string }> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // const { error } = await supabase.auth.signInWithOAuth({
  //   provider: "google",
  //   options: { redirectTo: `${window.location.origin}/auth/callback` },
  // });
  // if (error) return { success: false, error: error.message };
  // return { success: true };
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log("[mock] signInWithGoogle");
  return { success: true };
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}
