"use client";

import { useState, useEffect, useRef } from "react";
import { getConnections, getMessages, sendMessage } from "@/services/connections";
import { getSeniorById } from "@/services/seniors";
import type { ConnectionRequest, Message, Senior } from "@/types";
import { CURRENT_USER_ID } from "./_lib/constants";
import ConversationSidebar from "./_components/ConversationSidebar";
import ChatHeader from "./_components/ChatHeader";
import MessageArea from "./_components/MessageArea";
import MessageInput from "./_components/MessageInput";

export default function MessagesPage() {
  const [connections, setConnections] = useState<ConnectionRequest[]>([]);
  const [seniorMap, setSeniorMap] = useState<Record<string, Senior>>({});
  const [selectedConn, setSelectedConn] = useState<ConnectionRequest | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastMessageMap, setLastMessageMap] = useState<Record<string, Message>>({});
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [search, setSearch] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // ── 연결 목록 + 선배 정보 + 각 대화 마지막 메시지 로드 ──
  useEffect(() => {
    getConnections(CURRENT_USER_ID).then(async (conns) => {
      setConnections(conns);
      const [seniors, allMessages] = await Promise.all([
        Promise.all(conns.map((c) => getSeniorById(c.toSeniorId))),
        Promise.all(conns.map((c) => getMessages(c.id))),
      ]);
      const seniorMapResult: Record<string, Senior> = {};
      seniors.forEach((s) => { if (s) seniorMapResult[s.id] = s; });
      setSeniorMap(seniorMapResult);

      const lastMsgMap: Record<string, Message> = {};
      conns.forEach((c, i) => {
        const msgs = allMessages[i];
        if (msgs.length > 0) lastMsgMap[c.id] = msgs[msgs.length - 1];
      });
      setLastMessageMap(lastMsgMap);

      if (conns.length > 0) setSelectedConn(conns[0]);
    });
  }, []);

  // ── 메시지 로드 ──
  useEffect(() => {
    if (!selectedConn) return;
    getMessages(selectedConn.id).then(setMessages);
  }, [selectedConn]);

  // ── 스크롤 최하단 유지 ──
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
    setLastMessageMap((prev) => ({ ...prev, [selectedConn.id]: newMsg }));
    setInput("");
    setIsSending(false);
  }

  // ── 검색 필터 ──
  const filteredConns = connections.filter((conn) => {
    const senior = seniorMap[conn.toSeniorId];
    return senior?.name.includes(search) ?? true;
  });

  const selectedSenior = selectedConn ? seniorMap[selectedConn.toSeniorId] : null;

  return (
    <div
      style={{
        display: "flex",
        height: "calc(100vh - 64px)",
        fontFamily: "var(--font-roboto), sans-serif",
        backgroundColor: "#F6F6F6",
      }}
    >

      <ConversationSidebar
        filteredConns={filteredConns}
        seniorMap={seniorMap}
        selectedConn={selectedConn}
        lastMessageMap={lastMessageMap}
        search={search}
        onSearchChange={setSearch}
        onSelectConn={setSelectedConn}
      />

      {/* ── 오른쪽 채팅 패널 ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {!selectedConn ? (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF", fontSize: "14px" }}>
            대화를 선택하세요
          </div>
        ) : (
          <>
            <ChatHeader senior={selectedSenior} />

            <MessageArea
              messages={messages}
              selectedConn={selectedConn}
              selectedSenior={selectedSenior}
              bottomRef={bottomRef}
            />

            <MessageInput
              selectedConn={selectedConn}
              input={input}
              isSending={isSending}
              onInputChange={setInput}
              onSubmit={handleSend}
            />

            {/* 푸터 */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                padding: "6px",
                textAlign: "center",
                fontSize: "10px",
                color: "#D1D5DB",
                letterSpacing: "0.05em",
              }}
            >
              KYUNGHEE UNIVERSITY 2026
            </div>
          </>
        )}
      </div>
    </div>
  );
}
