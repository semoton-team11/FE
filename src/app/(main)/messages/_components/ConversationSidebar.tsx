"use client";

import type { ConnectionRequest, Message, Senior } from "@/types";
import { getAvatarVariantForId, AvatarIcon } from "@/lib/avatarVariants";
import { CURRENT_USER_ID } from "../_lib/constants";

// ── 인라인 스타일 상수 ──────────────────────────────────────────────────────
const asideStyle: React.CSSProperties = {
  width: "270px",
  flexShrink: 0,
  backgroundColor: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid #EFEFEF",
};

const headerStyle: React.CSSProperties = {
  padding: "24px 20px 16px",
};

const headingStyle: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: 700,
  color: "#1F1A1A",
  marginBottom: "16px",
};

const searchWrapStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  border: "1px solid #EBE0E0",
  borderRadius: "12px",
  padding: "9px 14px",
  backgroundColor: "#FCF1F1",
};

const searchInputStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  outline: "none",
  fontSize: "13px",
  color: "#1F1A1A",
  width: "100%",
};

const listWrapStyle: React.CSSProperties = {
  flex: 1,
  overflowY: "auto",
};

const emptyTextStyle: React.CSSProperties = {
  padding: "16px 20px",
  fontSize: "13px",
  color: "#9CA3AF",
};

const connBtnStyle = (isSelected: boolean): React.CSSProperties => ({
  width: "100%",
  textAlign: "left",
  padding: "14px 20px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  backgroundColor: isSelected ? "#FFF8F7" : "transparent",
  border: "none",
  borderBottom: "1px solid #F1F5F9",
  cursor: "pointer",
});

const avatarWrapStyle = (bg: string): React.CSSProperties => ({
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  backgroundColor: bg,
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
});

const connInfoStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
};

const connNameRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const connNameStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#1F1A1A",
};

const connTimeStyle: React.CSSProperties = {
  fontSize: "11px",
  color: "#9CA3AF",
  flexShrink: 0,
};

const connPreviewStyle = (hasUnread: boolean): React.CSSProperties => ({
  fontSize: "12px",
  color: hasUnread ? "#5C3F3F" : "#9CA3AF",
  marginTop: "3px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

// ── 타입 ─────────────────────────────────────────────────────────────────────
type ConversationSidebarProps = {
  filteredConns: ConnectionRequest[];
  seniorMap: Record<string, Senior>;
  selectedConn: ConnectionRequest | null;
  lastMessageMap: Record<string, Message>;
  readSet: Set<string>;
  search: string;
  onSearchChange: (value: string) => void;
  onSelectConn: (conn: ConnectionRequest) => void;
};

// ── 메인 컴포넌트 ───────────────────────────────────────────────────────────
export default function ConversationSidebar({
  filteredConns,
  seniorMap,
  selectedConn,
  lastMessageMap,
  readSet,
  search,
  onSearchChange,
  onSelectConn,
}: ConversationSidebarProps) {
  return (
    <aside style={asideStyle}>
      <style>{`
        .msg-search-input::placeholder { color: #5C3F3F80; }
      `}</style>
      {/* 사이드바 헤더 */}
      <div style={headerStyle}>
        <h2 style={headingStyle}>메시지</h2>

        {/* 검색창 */}
        <div style={searchWrapStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22.1333 24L13.7333 15.6C13.0667 16.1333 12.3 16.5556 11.4333 16.8667C10.5667 17.1778 9.64444 17.3333 8.66667 17.3333C6.24444 17.3333 4.19444 16.4944 2.51667 14.8167C0.838889 13.1389 0 11.0889 0 8.66667C0 6.24444 0.838889 4.19444 2.51667 2.51667C4.19444 0.838889 6.24444 0 8.66667 0C11.0889 0 13.1389 0.838889 14.8167 2.51667C16.4944 4.19444 17.3333 6.24444 17.3333 8.66667C17.3333 9.64444 17.1778 10.5667 16.8667 11.4333C16.5556 12.3 16.1333 13.0667 15.6 13.7333L24 22.1333L22.1333 24ZM8.66667 14.6667C10.3333 14.6667 11.75 14.0833 12.9167 12.9167C14.0833 11.75 14.6667 10.3333 14.6667 8.66667C14.6667 7 14.0833 5.58333 12.9167 4.41667C11.75 3.25 10.3333 2.66667 8.66667 2.66667C7 2.66667 5.58333 3.25 4.41667 4.41667C3.25 5.58333 2.66667 7 2.66667 8.66667C2.66667 10.3333 3.25 11.75 4.41667 12.9167C5.58333 14.0833 7 14.6667 8.66667 14.6667Z" fill="#5C3F3F" fillOpacity="0.5"/>
          </svg>
          <input
            className="msg-search-input"
            placeholder="대화 검색..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            style={searchInputStyle}
          />
        </div>
      </div>

      {/* 대화 목록 */}
      <div style={listWrapStyle}>
        {filteredConns.length === 0 ? (
          <p style={emptyTextStyle}>대화가 없습니다.</p>
        ) : (
          filteredConns.map((conn) => {
            const senior = seniorMap[conn.toSeniorId];
            const isSelected = selectedConn?.id === conn.id;
            const avatarVariant = getAvatarVariantForId(conn.toSeniorId);
            const avatarBg = senior?.profileImage ? "#00000033" : avatarVariant.bg;

            const lastMsg = lastMessageMap[conn.id];
            const hasUnread = lastMsg && lastMsg.senderId !== CURRENT_USER_ID && !readSet.has(conn.id);

            return (
              <button key={conn.id} onClick={() => onSelectConn(conn)} style={connBtnStyle(isSelected)}>
                {/* 아바타 */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div style={avatarWrapStyle(avatarBg)}>
                    {senior?.profileImage ? (
                      <img src={senior.profileImage} alt={senior.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <AvatarIcon fill={avatarVariant.fill} bodyPath={avatarVariant.bodyPath} size={44} />
                    )}
                  </div>
                  {hasUnread && (
                    <div style={{
                      position: "absolute",
                      bottom: "1px",
                      right: "1px",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: "#5C3F3F",
                      border: "2px solid #FFFFFF",
                    }} />
                  )}
                </div>

                {/* 이름 + 미리보기 */}
                <div style={connInfoStyle}>
                  <div style={connNameRowStyle}>
                    <p style={connNameStyle}>{senior?.name ?? "선배님"} 선배님</p>
                    <span style={connTimeStyle}>어제</span>
                  </div>
                  <p style={connPreviewStyle(hasUnread)}>
                    {lastMsg
                      ? lastMsg.senderId === CURRENT_USER_ID
                        ? `회원님: ${lastMsg.content}`
                        : lastMsg.content
                      : conn.message}
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
