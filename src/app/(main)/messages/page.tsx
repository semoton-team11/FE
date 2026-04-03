"use client";

// ╔══════════════════════════════════════════════════════════════╗
// ║  페이지: 메시지함 (/messages)                                 ║
// ║  데이터 흐름                                                  ║
// ║    connections 목록  ← src/services/connections.ts           ║
// ║    선배 정보         ← src/services/seniors.ts               ║
// ║    메시지 목록       ← src/services/connections.ts           ║
// ║    Realtime 구독     ← src/services/connections.ts           ║
// ║  타입                                                        ║
// ║    ConnectionRequest, Message, Senior ← src/types/index.ts  ║
// ║  상수                                                        ║
// ║    CURRENT_USER_ID  ← ./_lib/constants.ts (로그인 유저 ID)   ║
// ║  최근 활동 기록      ← src/lib/recentActivity.ts             ║
// ╚══════════════════════════════════════════════════════════════╝

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// 서비스 레이어: Supabase / REST API 호출 함수들
import { getConnections, getMessages, sendMessage, subscribeToMessages } from "@/services/connections";
// 서비스 레이어: 선배 단건 조회
import { getSeniorById } from "@/services/seniors";
// 전역 타입 정의 (src/types/index.ts)
import type { ConnectionRequest, Message, Senior } from "@/types";
// 현재 로그인한 유저 ID 상수 (임시 고정값, 인증 연동 후 대체)
import { CURRENT_USER_ID } from "./_lib/constants";
// 최근 방문 활동 기록 유틸 (홈화면 '최근 활동' 섹션에 표시)
import { addRecentActivity } from "@/lib/recentActivity";
// 하위 컴포넌트들
import ConversationSidebar from "./_components/ConversationSidebar"; // 왼쪽 대화 목록 사이드바
import ChatHeader from "./_components/ChatHeader";                   // 채팅창 상단 선배 정보 헤더
import MessageArea from "./_components/MessageArea";                 // 메시지 버블 스크롤 영역
import MessageInput, { CoffeeChatModal } from "./_components/MessageInput"; // 하단 입력창 + 커피챗 모달

// ── 스타일 상수 ──────────────────────────────────────────────────

/** 페이지 전체 레이아웃: 사이드바 + 채팅 패널 좌우 배치 */
const pageLayoutStyle: React.CSSProperties = {
  display: "flex",
  height: "calc(100vh - 64px)",
  marginTop: "-49.54px",
  marginBottom: "-49.54px",
  fontFamily: "var(--font-roboto), sans-serif",
  backgroundColor: "#F6F6F6",
  overflow: "hidden",
};

/**
 * 오른쪽 채팅 패널 컨테이너
 * position: relative → CoffeeChatModal(position: absolute)의 기준 박스
 */
const chatPanelStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  position: "relative",
};

/** 대화 미선택 시 빈 상태 안내 */
const emptyStateStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#9CA3AF",
  fontSize: "14px",
};

/** 채팅창 하단 학교명 푸터 */
const footerStyle: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  padding: "6px",
  textAlign: "center",
  fontSize: "10px",
  color: "#D1D5DB",
  letterSpacing: "0.05em",
};

// ── 서브 컴포넌트 ────────────────────────────────────────────────

/** 대화가 선택되지 않았을 때 보여주는 안내 문구 */
function EmptyState() {
  return <div style={emptyStateStyle}>대화를 선택하세요</div>;
}

/** 채팅 패널 맨 하단 고정 푸터 */
function ChatFooter() {
  return <div style={footerStyle}>KYUNGHEE UNIVERSITY 2026</div>;
}

// ── 메인 컴포넌트 (useSearchParams 사용으로 Suspense 필요) ────────

function MessagesPageInner() {
  // URL 쿼리 파라미터: ?connId=xxx → 특정 대화 바로 열기
  const searchParams = useSearchParams();
  const connIdParam = searchParams.get("connId");

  // 페이지 진입 시 최근 활동에 '메시지함' 기록 (홈화면 표시용)
  useEffect(() => {
    addRecentActivity({
      id: "messages",
      label: "메시지함",
      sub: "대화 목록",
      href: "/messages",
      type: "messages",
    });
  }, []);

  // ── 상태 ──────────────────────────────────────────────────────
  const [connections, setConnections] = useState<ConnectionRequest[]>([]);
  /** connectionId → Senior 매핑 (사이드바·헤더 렌더링용) */
  const [seniorMap, setSeniorMap] = useState<Record<string, Senior>>({});
  /** 현재 선택된 대화 */
  const [selectedConn, setSelectedConn] = useState<ConnectionRequest | null>(null);
  /** 선택된 대화의 메시지 배열 */
  const [messages, setMessages] = useState<Message[]>([]);
  /** connectionId → 마지막 메시지 (사이드바 미리보기용) */
  const [lastMessageMap, setLastMessageMap] = useState<Record<string, Message>>({});
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  /** 메시지 로딩 중 여부 (스켈레톤 표시 제어) */
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  /** 커피챗 일정 예약 모달 표시 여부 */
  const [showCoffeeChat, setShowCoffeeChat] = useState(false);
  /** 사이드바 이름 검색어 */
  const [search, setSearch] = useState("");
  /** 이미 읽은 대화 ID 집합 (읽음 표시 제어) */
  const [readSet, setReadSet] = useState<Set<string>>(new Set());
  /** 스크롤 최하단 이동용 ref → MessageArea의 bottomRef div에 연결 */
  const bottomRef = useRef<HTMLDivElement>(null);

  // ── 초기 데이터 로드 ──────────────────────────────────────────
  /**
   * 1) getConnections: 유저의 연결 목록 조회 (src/services/connections.ts)
   * 2) getSeniorById:  각 연결의 선배 정보 병렬 조회 (src/services/seniors.ts)
   * 3) getMessages:    각 연결의 마지막 메시지 병렬 조회 (src/services/connections.ts)
   * → URL에 connId 파라미터가 있으면 해당 대화 자동 선택
   */
  useEffect(() => {
    getConnections(CURRENT_USER_ID).then(async (conns) => {
      setConnections(conns);
      const [seniors, allMessages] = await Promise.all([
        Promise.all(conns.map((c) => getSeniorById(c.toSeniorId))),
        Promise.all(conns.map((c) => getMessages(c.id))),
      ]);

      // Senior 배열 → { seniorId: Senior } 딕셔너리로 변환
      const seniorMapResult: Record<string, Senior> = {};
      seniors.forEach((s) => { if (s) seniorMapResult[s.id] = s; });
      setSeniorMap(seniorMapResult);

      // 각 연결의 마지막 메시지 추출
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
        const firstWithMsg = conns.find((c) => lastMsgMap[c.id]);
        if (firstWithMsg) setSelectedConn(firstWithMsg);
      }
    });
  }, [connIdParam]);

  // ── 대화 선택 시 메시지 로드 + Realtime 구독 ─────────────────
  /**
   * getMessages:           선택된 연결의 전체 메시지 목록 조회
   * subscribeToMessages:   Supabase Realtime 구독 (src/services/connections.ts)
   *                        → 다른 사람이 보낸 새 메시지를 실시간으로 수신
   * cleanup:               대화 전환 시 이전 채널 구독 해제
   */
  useEffect(() => {
    if (!selectedConn) return;

    setIsLoadingMessages(true);
    getMessages(selectedConn.id).then((msgs) => {
      setMessages(msgs);
      setIsLoadingMessages(false);
    });

    const unsubscribe = subscribeToMessages(selectedConn.id, (newMsg) => {
      // 내가 보낸 메시지는 handleSend에서 이미 추가하므로 중복 방지
      setMessages((prev) => {
        if (prev.some((m) => m.id === newMsg.id)) return prev;
        return [...prev, newMsg];
      });
      setLastMessageMap((prev) => ({ ...prev, [selectedConn.id]: newMsg }));
    });

    return () => unsubscribe();
  }, [selectedConn]);

  // ── 스크롤 최하단 유지 ────────────────────────────────────────
  /**
   * 초기 로드(0→n)에는 스크롤하지 않고,
   * 새 메시지 추가(n→n+1)일 때만 bottomRef로 스크롤
   * → 메시지함 진입 시 화면이 아래로 내려가는 현상 방지
   */
  const prevMessagesLenRef = useRef(0);
  useEffect(() => {
    const prev = prevMessagesLenRef.current;
    const curr = messages.length;
    if (prev > 0 && curr > prev) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevMessagesLenRef.current = curr;
  }, [messages]);

  // ── 메시지 전송 ───────────────────────────────────────────────
  /**
   * sendMessage: REST API POST /messages/{connectionId} 호출
   *              (src/services/connections.ts → src/lib/api.ts)
   * 전송 후 messages 배열 및 lastMessageMap 즉시 업데이트 (낙관적 UI)
   */
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

  // ── 사이드바 필터링 ───────────────────────────────────────────
  /** 메시지가 최소 1개 있는 연결만 + 검색어 필터 적용 */
  const sidebarConns = connections.filter((conn) => {
    const hasMsg = Boolean(lastMessageMap[conn.id]);
    const senior = seniorMap[conn.toSeniorId];
    const matchSearch = senior?.name.includes(search) ?? true;
    return hasMsg && matchSearch;
  });

  /** 현재 선택된 연결에 해당하는 Senior 객체 (seniorMap에서 조회) */
  const selectedSenior = selectedConn ? seniorMap[selectedConn.toSeniorId] : null;

  return (
    <div style={pageLayoutStyle}>
      {/* 왼쪽: 대화 목록 사이드바
          props: filteredConns(필터된 연결 목록), seniorMap, lastMessageMap, readSet, search */}
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
          // 선택 즉시 읽음 처리
          setReadSet((prev) => new Set([...prev, conn.id]));
        }}
      />

      {/* 오른쪽: 채팅 패널 (position: relative → 모달 기준점) */}
      <div style={chatPanelStyle}>
        {!selectedConn ? (
          <EmptyState />
        ) : (
          <>
            {/* 선배 이름·학과·상태 표시 헤더 */}
            <ChatHeader senior={selectedSenior} />

            {/* 메시지 버블 스크롤 영역
                isLoading=true 이면 MessageSkeleton 표시 */}
            <MessageArea
              messages={messages}
              selectedConn={selectedConn}
              selectedSenior={selectedSenior}
              bottomRef={bottomRef}
              isLoading={isLoadingMessages}
            />

            {/* 하단 입력창
                onCoffeeChatOpen → showCoffeeChat=true → CoffeeChatModal 표시 */}
            <MessageInput
              selectedConn={selectedConn}
              selectedSenior={selectedSenior}
              input={input}
              isSending={isSending}
              onInputChange={setInput}
              onSubmit={handleSend}
              onCoffeeChatOpen={() => setShowCoffeeChat(true)}
            />

            {/* 커피챗 일정 예약 모달
                position: absolute → 채팅 패널(position: relative) 안에서 가운데 정렬
                seniorName: selectedSenior.name → "[이름] 선배님과 커피챗" 제목에 사용 */}
            {showCoffeeChat && (
              <CoffeeChatModal
                seniorName={selectedSenior?.name ?? "선배"}
                onClose={() => setShowCoffeeChat(false)}
              />
            )}

            {/* 채팅창 하단 학교명 푸터 */}
            <ChatFooter />
          </>
        )}
      </div>
    </div>
  );
}

/**
 * MessagesPage
 * useSearchParams()는 클라이언트 전용이므로 Suspense로 감싸서 SSR 에러 방지
 */
export default function MessagesPage() {
  return (
    <Suspense fallback={<div />}>
      <MessagesPageInner />
    </Suspense>
  );
}
