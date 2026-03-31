"use client";

import type { ConnectionRequest } from "@/types";

type MessageInputProps = {
  selectedConn: ConnectionRequest;
  input: string;
  isSending: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function MessageInput({ selectedConn, input, isSending, onInputChange, onSubmit }: MessageInputProps) {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #F1F5F9",
        padding: "12px 20px",
      }}
    >
      {selectedConn.status === "accepted" ? (
        <form
          onSubmit={onSubmit}
          style={{ display: "flex", alignItems: "center", gap: "12px" }}
        >
          {/* 첨부 아이콘 */}
          <button
            type="button"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", flexShrink: 0 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </button>

          {/* 텍스트 입력 */}
          <input
            placeholder="메시지를 입력하세요..."
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            style={{
              flex: 1,
              backgroundColor: "#FFF8F7",
              border: "none",
              borderRadius: "12px",
              padding: "10px 16px",
              fontSize: "14px",
              color: "#1F1A1A",
              outline: "none",
            }}
          />

          {/* 전송 버튼 */}
          <button
            type="submit"
            disabled={!input.trim() || isSending}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: input.trim() ? "#9A001F" : "#E5E7EB",
              border: "none",
              cursor: input.trim() ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "background-color 150ms ease",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      ) : (
        <p style={{ textAlign: "center", fontSize: "13px", color: "#9CA3AF" }}>
          {selectedConn.status === "pending" ? "수락 대기 중입니다." : "거절된 요청입니다."}
        </p>
      )}
    </div>
  );
}
