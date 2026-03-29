// ============================================================
// 유저 서비스
// 현재: mock 데이터 반환
// Supabase 연동 시: 아래 주석 처리된 코드로 교체
// ============================================================

import type { User } from "@/types";
import { MOCK_USER } from "@/mock";

export async function getCurrentUser(): Promise<User> {
  // TODO: Supabase 연동 시 교체
  // const { data: { user } } = await supabase.auth.getUser();
  // const { data } = await supabase.from("users").select("*").eq("id", user.id).single();
  // return data;

  return MOCK_USER;
}

export async function updateUserFields(
  userId: string,
  interestedFields: string[]
): Promise<void> {
  // TODO: Supabase 연동 시 교체
  // await supabase.from("users").update({ interested_fields: interestedFields }).eq("id", userId);

  void userId;
  void interestedFields;
}

export async function toggleScrapSenior(
  userId: string,
  seniorId: string
): Promise<void> {
  // TODO: Supabase 연동 시 교체

  void userId;
  void seniorId;
}
