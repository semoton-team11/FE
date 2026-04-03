// ╔══════════════════════════════════════════════════════════════╗
// ║  서비스: 유저 (user)                                          ║
// ║  현재 모드 : MOCK                                             ║
// ║  연동 대상 : Supabase — profiles 테이블                       ║
// ║  교체 방법 : 각 함수 안의 SUPABASE 블록 주석 해제 후           ║
// ║             MOCK 블록 삭제                                    ║
// ╠══════════════════════════════════════════════════════════════╣
// ║  ★ 핵심 주의사항                                              ║
// ║  getCurrentUser()가 반환하는 User.departmentId 가             ║
// ║  getCatalogCourses() 의 필터 키로 사용됨.                     ║
// ║  이 값이 없거나 잘못되면 다른 학과 과목이 노출되므로            ║
// ║  회원가입 시 저장된 department_id 를 반드시 그대로 읽어야 함.  ║
// ╚══════════════════════════════════════════════════════════════╝

import type { User } from "@/types";
import { MOCK_USER } from "@/mock";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// import { supabase } from "@/lib/supabase";

// ──────────────────────────────────────────────────────────────
// getCurrentUser  — 현재 로그인한 사용자 정보 반환
// DB 테이블 : profiles  (+ auth.users for email)
// ★ 반환값의 departmentId → getCatalogCourses() 에 전달
// ──────────────────────────────────────────────────────────────
export async function getCurrentUser(): Promise<User> {
  const token = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");
  if (!token) throw new Error("로그인이 필요합니다.");

  try {
    const response = await fetch(`${API_URL}/profile/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "사용자 정보를 가져오는데 실패했습니다.");
    }

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      department: result.department,
      student_id: result.student_id,
      created_at: result.created_at,
      is_graduated: result.is_graduated,
      grade: result.grade,
      interestedFields: MOCK_USER.interestedFields,
      profileImage: MOCK_USER.profileImage,
      courses: MOCK_USER.courses,
      scrapedSeniorIds: MOCK_USER.scrapedSeniorIds,
      scrapedCourseIds: MOCK_USER.scrapedCourseIds,
    };
  } catch (error) {
    console.error("getCurrentUser Error:", error);
    throw error;
  }
}

// ──────────────────────────────────────────────────────────────
// updateUserFields  — 관심 분야 목록 업데이트
// DB 테이블 : profiles.interested_fields (text[])
// ──────────────────────────────────────────────────────────────
export async function updateUserFields(
  userId: string,
  interestedFields: string[]
): Promise<void> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // const { error } = await supabase
  //   .from("profiles")
  //   .update({ interested_fields: interestedFields })
  //   .eq("id", userId);
  // if (error) throw error;
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중 — no-op) ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  void userId;
  void interestedFields;
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}

// ──────────────────────────────────────────────────────────────
// toggleScrapSenior  — 선배 스크랩 추가/해제
// DB 테이블 : profiles.scraped_senior_ids (text[])
// ──────────────────────────────────────────────────────────────
export async function toggleScrapSenior(
  userId: string,
  seniorId: string
): Promise<void> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // const { data: profile, error: fetchError } = await supabase
  //   .from("profiles")
  //   .select("scraped_senior_ids")
  //   .eq("id", userId)
  //   .single();
  // if (fetchError) throw fetchError;
  //
  // const current: string[] = profile?.scraped_senior_ids ?? [];
  // const next = current.includes(seniorId)
  //   ? current.filter((id) => id !== seniorId)
  //   : [...current, seniorId];
  //
  // const { error: updateError } = await supabase
  //   .from("profiles")
  //   .update({ scraped_senior_ids: next })
  //   .eq("id", userId);
  // if (updateError) throw updateError;
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중 — no-op) ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  void userId;
  void seniorId;
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}
