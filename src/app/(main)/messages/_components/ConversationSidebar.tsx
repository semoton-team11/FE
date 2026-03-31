"use client";

import type { ConnectionRequest, Message, Senior } from "@/types";

type ConversationSidebarProps = {
  filteredConns: ConnectionRequest[];
  seniorMap: Record<string, Senior>;
  selectedConn: ConnectionRequest | null;
  lastMessageMap: Record<string, Message>;
  search: string;
  onSearchChange: (value: string) => void;
  onSelectConn: (conn: ConnectionRequest) => void;
};

export default function ConversationSidebar({
  filteredConns,
  seniorMap,
  selectedConn,
  lastMessageMap,
  search,
  onSearchChange,
  onSelectConn,
}: ConversationSidebarProps) {
  return (
    <aside
      style={{
        width: "260px",
        flexShrink: 0,
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #F1F5F9",
      }}
    >
      {/* 사이드바 헤더 */}
      <div style={{ padding: "24px 20px 12px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1F1A1A", marginBottom: "14px" }}>
          메시지
        </h2>

        {/* 검색창 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#F6EBEB",
            borderRadius: "9999px",
            padding: "8px 14px",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9A001F" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            placeholder="대화 검색..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              background: "none",
              border: "none",
              outline: "none",
              fontSize: "13px",
              color: "#1F1A1A",
              width: "100%",
            }}
          />
        </div>
      </div>

      {/* 대화 목록 */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {filteredConns.length === 0 ? (
          <p style={{ padding: "16px 20px", fontSize: "13px", color: "#9CA3AF" }}>
            대화가 없습니다.
          </p>
        ) : (
          filteredConns.map((conn) => {
            const senior = seniorMap[conn.toSeniorId];
            const isSelected = selectedConn?.id === conn.id;

            return (
              <button
                key={conn.id}
                onClick={() => onSelectConn(conn)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "14px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  backgroundColor: isSelected ? "#FFF8F7" : "transparent",
                  borderLeft: isSelected ? "3px solid #9A001F" : "3px solid transparent",
                  borderTop: "none",
                  borderRight: "none",
                  borderBottom: "1px solid #F1F5F9",
                  cursor: "pointer",
                  transition: "background-color 150ms ease",
                }}
              >
                {/* 아바타 */}
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    backgroundColor: "#E5E7EB",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#9CA3AF",
                  }}
                >
                  {senior?.name[0] ?? "?"}
                </div>

                {/* 이름 + 미리보기 */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#1F1A1A" }}>
                      {senior?.name ?? "선배님"} 선배님
                    </p>
                    <span style={{ fontSize: "11px", color: "#9CA3AF", flexShrink: 0 }}>
                      어제
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9CA3AF",
                      marginTop: "2px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {lastMessageMap[conn.id]?.content ?? conn.message}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}
