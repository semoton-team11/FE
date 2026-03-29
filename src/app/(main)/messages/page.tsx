"use client";

import { useState, useEffect, useRef } from "react";
import { getConnections, getMessages, sendMessage } from "@/services/connections";
import { getSeniorById } from "@/services/seniors";
import type { ConnectionRequest, Message, Senior } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const CURRENT_USER_ID = "user-1";

export default function MessagesPage() {
  const [connections, setConnections] = useState<ConnectionRequest[]>([]);
  const [seniorMap, setSeniorMap] = useState<Record<string, Senior>>({});
  const [selectedConn, setSelectedConn] = useState<ConnectionRequest | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getConnections(CURRENT_USER_ID).then(async (conns) => {
      setConnections(conns);
      const seniors = await Promise.all(
        conns.map((c) => getSeniorById(c.toSeniorId))
      );
      const map: Record<string, Senior> = {};
      seniors.forEach((s) => { if (s) map[s.id] = s; });
      setSeniorMap(map);
      if (conns.length > 0) setSelectedConn(conns[0]);
    });
  }, []);

  useEffect(() => {
    if (!selectedConn) return;
    getMessages(selectedConn.id).then(setMessages);
  }, [selectedConn]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedConn || !input.trim()) return;
    setIsSending(true);
    const newMsg = await sendMessage({
      connectionId: selectedConn.id,
      senderId: CURRENT_USER_ID,
      content: input.trim(),
    });
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setIsSending(false);
  }

  const statusLabel: Record<ConnectionRequest["status"], string> = {
    pending: "대기 중",
    accepted: "수락됨",
    rejected: "거절됨",
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">메시지함</h1>

      <div className="flex gap-4 h-[600px]">
        {/* 사이드바: 연결 목록 */}
        <aside className="w-64 shrink-0 border border-border rounded-xl overflow-y-auto flex flex-col">
          {connections.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">연결 요청이 없습니다.</p>
          ) : (
            connections.map((conn) => {
              const senior = seniorMap[conn.toSeniorId];
              return (
                <button
                  key={conn.id}
                  onClick={() => setSelectedConn(conn)}
                  className={`text-left px-4 py-3 border-b border-border last:border-0 hover:bg-muted transition-colors ${
                    selectedConn?.id === conn.id ? "bg-[var(--color-brand-light)]" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs font-bold bg-muted">
                        {senior?.name[0] ?? "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{senior?.name ?? conn.toSeniorId}</p>
                      <p className="text-xs text-muted-foreground">{conn.type}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      conn.status === "accepted" ? "default"
                      : conn.status === "rejected" ? "destructive"
                      : "outline"
                    }
                    className="mt-1.5 text-xs"
                  >
                    {statusLabel[conn.status]}
                  </Badge>
                </button>
              );
            })
          )}
        </aside>

        {/* 채팅 영역 */}
        <div className="flex-1 border border-border rounded-xl flex flex-col overflow-hidden">
          {!selectedConn ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
              대화를 선택하세요
            </div>
          ) : (
            <>
              {/* 채팅 헤더 */}
              <div className="border-b border-border px-5 py-3 flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs font-bold bg-muted">
                    {seniorMap[selectedConn.toSeniorId]?.name[0] ?? "?"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">
                    {seniorMap[selectedConn.toSeniorId]?.name ?? selectedConn.toSeniorId}
                  </p>
                  <p className="text-xs text-muted-foreground">{selectedConn.type}</p>
                </div>
                {selectedConn.meetingLink && (
                  <a
                    href={selectedConn.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-xs text-[var(--color-brand)] underline"
                  >
                    미팅 링크
                  </a>
                )}
              </div>

              {/* 메시지 목록 */}
              <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                {messages.map((msg) => {
                  const isMine = msg.senderId === CURRENT_USER_ID;
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                          isMine
                            ? "bg-[var(--color-brand)] text-white rounded-br-sm"
                            : "bg-muted text-foreground rounded-bl-sm"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  );
                })}
                {messages.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground">
                    아직 메시지가 없습니다.
                  </p>
                )}
                <div ref={bottomRef} />
              </div>

              {/* 입력창 */}
              {selectedConn.status === "accepted" ? (
                <form onSubmit={handleSend} className="border-t border-border px-4 py-3 flex gap-2">
                  <Input
                    placeholder="메시지를 입력하세요"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    disabled={!input.trim() || isSending}
                    className="bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white"
                  >
                    전송
                  </Button>
                </form>
              ) : (
                <div className="border-t border-border px-4 py-3 text-center text-sm text-muted-foreground">
                  {selectedConn.status === "pending" ? "수락 대기 중입니다." : "거절된 요청입니다."}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
