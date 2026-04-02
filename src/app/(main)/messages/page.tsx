"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getConnections, getMessages, sendMessage } from "@/services/connections";
import { getSeniorById } from "@/services/seniors";
import type { ConnectionRequest, Message, Senior } from "@/types";
import { CURRENT_USER_ID } from "./_lib/constants";
import { addRecentActivity } from "@/lib/recentActivity";
import ConversationSidebar from "./_components/ConversationSidebar";
import ChatHeader from "./_components/ChatHeader";
import MessageArea from "./_components/MessageArea";
import MessageInput from "./_components/MessageInput";

const pageLayoutStyle: React.CSSProperties = {
  display: "flex",
  height: "calc(100vh - 64px)",
  marginTop: "-49.54px",
  marginBottom: "-49.54px",
  fontFamily: "var(--font-roboto), sans-serif",
  backgroundColor: "#F6F6F6",
  overflow: "hidden",
};

const chatPanelStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const emptyStateStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#9CA3AF",
  fontSize: "14px",
};

const footerStyle: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  padding: "6px",
  textAlign: "center",
  fontSize: "10px",
  color: "#D1D5DB",
  letterSpacing: "0.05em",
};

function EmptyState() {
  return <div style={emptyStateStyle}>대화를 선택하세요</div>;
}

function ChatFooter() {
  return <div style={footerStyle}>KYUNGHEE UNIVERSITY 2026</div>;
}

function MessagesPageInner() {
  const searchParams = useSearchParams();
  const connIdParam = searchParams.get("connId");

  useEffect(() => {
    addRecentActivity({
      id: "messages",
      label: "메시지함",
      sub: "대화 목록",
      href: "/messages",
      type: "messages",
    });
  }, []);

  const [connections, setConnections] = useState<ConnectionRequest[]>([]);
  const [seniorMap, setSeniorMap] = useState<Record<string, Senior>>({});
  const [selectedConn, setSelectedConn] = useState<ConnectionRequest | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastMessageMap, setLastMessageMap] = useState<Record<string, Message>>({});
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [search, setSearch] = useState("");
  const [readSet, setReadSet] = useState<Set<string>>(new Set());
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

      // connId 파라미터가 있으면 해당 연결 선택, 없으면 첫 번째 선택
      if (connIdParam) {
        const target = conns.find((c) => c.id === connIdParam);
        if (target) setSelectedConn(target);
      } else {
        // 메시지가 있는 첫 번째 대화 선택
        const firstWithMsg = conns.find((c) => lastMsgMap[c.id]);
        if (firstWithMsg) setSelectedConn(firstWithMsg);
      }
    });
  }, [connIdParam]);

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
    // 첫 메시지 전송 시 사이드바에 추가
    setLastMessageMap((prev) => ({ ...prev, [selectedConn.id]: newMsg }));
    setInput("");
    setIsSending(false);
  }

  // ── 사이드바: 메시지가 있는 대화만 표시 ──
  const sidebarConns = connections.filter((conn) => {
    const hasMsg = Boolean(lastMessageMap[conn.id]);
    const senior = seniorMap[conn.toSeniorId];
    const matchSearch = senior?.name.includes(search) ?? true;
    return hasMsg && matchSearch;
  });

  const selectedSenior = selectedConn ? seniorMap[selectedConn.toSeniorId] : null;

  return (
    <div style={pageLayoutStyle}>
      <ConversationSidebar
        filteredConns={sidebarConns}
        seniorMap={seniorMap}
        selectedConn={selectedConn}
        lastMessageMap={lastMessageMap}
        readSet={readSet}
        search={search}
        onSearchChange={setSearch}
        onSelectConn={(conn) => {
          setSelectedConn(conn);
          setReadSet((prev) => new Set([...prev, conn.id]));
        }}
      />

      {/* ── 오른쪽 채팅 패널 ── */}
      <div style={chatPanelStyle}>
        {!selectedConn ? (
          <EmptyState />
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
            <ChatFooter />
          </>
        )}
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div />}>
      <MessagesPageInner />
    </Suspense>
  );
}
