// ============================================================
// 연결 요청 / 메시지 서비스
// 현재: mock 데이터 반환
// Supabase 연동 시: 아래 주석 처리된 코드로 교체
// ============================================================

import type { ConnectionRequest, Message } from "@/types";
import { MOCK_CONNECTIONS, MOCK_MESSAGES } from "@/mock";

export async function getConnections(userId: string): Promise<ConnectionRequest[]> {
  // TODO: Supabase 연동 시 교체
  // const { data } = await supabase.from("connections").select("*").eq("from_user_id", userId);
  // return data ?? [];
  void userId;
  return MOCK_CONNECTIONS;
}

export async function sendConnectionRequest(
  req: Omit<ConnectionRequest, "id" | "status" | "createdAt">
): Promise<ConnectionRequest> {
  // TODO: Supabase 연동 시 교체
  // const { data } = await supabase.from("connections").insert({ ...req, status: "pending" }).select().single();
  // return data;
  return {
    ...req,
    id: `conn-${Date.now()}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
}

export async function getMessages(connectionId: string): Promise<Message[]> {
  // TODO: Supabase 연동 시 교체
  // const { data } = await supabase.from("messages").select("*").eq("connection_id", connectionId);
  // return data ?? [];
  return MOCK_MESSAGES.filter((m) => m.connectionId === connectionId);
}

export async function sendMessage(
  msg: Omit<Message, "id" | "createdAt">
): Promise<Message> {
  // TODO: Supabase 연동 시 교체
  // const { data } = await supabase.from("messages").insert(msg).select().single();
  // return data;
  return {
    ...msg,
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
}
