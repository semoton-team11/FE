// ╔══════════════════════════════════════════════════════════════╗
// ║  서비스: 연결 요청 / 메시지 (connections)                     ║
// ║  현재 모드 : MOCK                                             ║
// ║  연동 대상 : Supabase — connections, messages 테이블          ║
// ║  교체 방법 : 각 함수 안의 SUPABASE 블록 주석 해제 후           ║
// ║             MOCK 블록 삭제                                    ║
// ╠══════════════════════════════════════════════════════════════╣
// ║  Supabase 테이블 구조                                         ║
// ║                                                              ║
// ║  [connections]                                               ║
// ║    id            uuid PK                                     ║
// ║    from_user_id  uuid → profiles(id)                         ║
// ║    to_senior_id  uuid → seniors(id)                          ║
// ║    type          text  '커피챗'|'멘토링'                      ║
// ║    message       text                                        ║
// ║    status        text  'pending'|'accepted'|'rejected'       ║
// ║    meeting_link  text  nullable                              ║
// ║    created_at    timestamp default now()                     ║
// ║                                                              ║
// ║  [messages]                                                  ║
// ║    id             uuid PK                                    ║
// ║    connection_id  uuid → connections(id)                     ║
// ║    sender_id      uuid → profiles(id)                        ║
// ║    content        text                                       ║
// ║    created_at     timestamp default now()                    ║
// ╚══════════════════════════════════════════════════════════════╝

import type { ConnectionRequest, Message } from "@/types";
import { MOCK_CONNECTIONS, MOCK_MESSAGES } from "@/mock";
// import { supabase } from "@/lib/supabase";

// 세션 중 새로 생성된 연결을 임시 저장
const sessionConnections: ConnectionRequest[] = [];

// ──────────────────────────────────────────────────────────────
// getConnections  — 유저의 연결 요청 목록 조회
// DB 테이블 : connections WHERE from_user_id = ?
// ──────────────────────────────────────────────────────────────
export async function getConnections(userId: string): Promise<ConnectionRequest[]> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // const { data, error } = await supabase
  //   .from("connections")
  //   .select("*")
  //   .eq("from_user_id", userId);
  // if (error) throw error;
  // return data ?? [];
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  void userId;
  return [...MOCK_CONNECTIONS, ...sessionConnections];
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}

// ──────────────────────────────────────────────────────────────
// sendConnectionRequest  — 연결 요청 전송
// DB 테이블 : connections INSERT
// ──────────────────────────────────────────────────────────────
export async function sendConnectionRequest(
  req: Omit<ConnectionRequest, "id" | "status" | "createdAt">
): Promise<ConnectionRequest> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // const { data, error } = await supabase
  //   .from("connections")
  //   .insert({ ...req, status: "pending" })
  //   .select()
  //   .single();
  // if (error) throw error;
  // return data;
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const newConn: ConnectionRequest = {
    ...req,
    id: `conn-${Date.now()}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  sessionConnections.push(newConn);
  return newConn;
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}

// ──────────────────────────────────────────────────────────────
// getMessages  — 연결별 메시지 목록 조회
// DB 테이블 : messages WHERE connection_id = ?
// ──────────────────────────────────────────────────────────────
export async function getMessages(connectionId: string): Promise<Message[]> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // const { data, error } = await supabase
  //   .from("messages")
  //   .select("*")
  //   .eq("connection_id", connectionId)
  //   .order("created_at", { ascending: true });
  // if (error) throw error;
  // return data ?? [];
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  return MOCK_MESSAGES.filter((m) => m.connectionId === connectionId);
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}

// ──────────────────────────────────────────────────────────────
// sendMessage  — 메시지 전송
// DB 테이블 : messages INSERT
// ──────────────────────────────────────────────────────────────
export async function sendMessage(
  msg: Omit<Message, "id" | "createdAt">
): Promise<Message> {

  // ━━━ SUPABASE (연동 시 이 블록 주석 해제, MOCK 블록 삭제) ━━━
  // const { data, error } = await supabase
  //   .from("messages")
  //   .insert(msg)
  //   .select()
  //   .single();
  // if (error) throw error;
  // return data;
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ━━━ MOCK (현재 사용 중) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  return {
    ...msg,
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
}
