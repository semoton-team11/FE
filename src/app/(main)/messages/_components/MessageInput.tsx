"use client";

import { useState } from "react";
import type { ConnectionRequest } from "@/types";

type MessageInputProps = {
  selectedConn: ConnectionRequest;
  input: string;
  isSending: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const wrapperStyle: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  borderTop: "1px solid #EFEFEF",
  padding: "12px 20px",
};

const formStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const plusButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  flexShrink: 0,
  padding: "0 2px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const textInputStyle: React.CSSProperties = {
  flex: 1,
  backgroundColor: "#FCF1F1",
  border: "1px solid #FCF1F1",
  borderRadius: "12px",
  padding: "10px 16px",
  fontSize: "14px",
  color: "#1F1A1A",
  outline: "none",
};

const sendButtonStyle = (hasInput: boolean): React.CSSProperties => ({
  width: "40px",
  height: "40px",
  borderRadius: "10px",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  backgroundColor: "#9A001F",
  cursor: hasInput ? "pointer" : "not-allowed",
  transition: "background-color 150ms ease",
  boxShadow: "0 4px 12px 0 rgba(199, 0, 43, 0.20)",
});

const attachPanelStyle: React.CSSProperties = {
  display: "flex",
  gap: "24px",
  padding: "16px 4px 4px",
};

const attachItemStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  background: "none",
  border: "none",
  cursor: "pointer",
};

const attachIconWrapStyle: React.CSSProperties = {
  width: "52px",
  height: "52px",
  borderRadius: "50%",
  backgroundColor: "#F4F4F4",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const attachLabelStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#5C3F3F",
  fontWeight: 400,
};

function AcceptedForm({ input, isSending, onInputChange, onSubmit }: {
  input: string;
  isSending: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const [showAttach, setShowAttach] = useState(false);
  const hasInput = Boolean(input.trim());

  return (
    <div>
      <form onSubmit={onSubmit} style={formStyle}>
        {/* + 버튼 */}
        <button
          type="button"
          style={plusButtonStyle}
          onClick={() => setShowAttach((prev) => !prev)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19" stroke="#9A001F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 12H19" stroke="#9A001F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* 텍스트 입력 */}
        <style>{`.msg-input::placeholder { color: #5C3F3F80; }`}</style>
        <input
          className="msg-input"
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          style={textInputStyle}
        />

        {/* 전송 버튼 */}
        <button
          type="submit"
          disabled={!hasInput || isSending}
          style={sendButtonStyle(hasInput)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>

      {/* 첨부 패널 */}
      {showAttach && (
        <div style={attachPanelStyle}>
          <button type="button" style={attachItemStyle}>
            <div style={attachIconWrapStyle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="20" viewBox="0 0 13 20" fill="none">
                <path d="M12.5 13.75C12.5 15.4833 11.8917 16.9583 10.675 18.175C9.45833 19.3917 7.98333 20 6.25 20C4.51667 20 3.04167 19.3917 1.825 18.175C0.608333 16.9583 0 15.4833 0 13.75V4.5C0 3.25 0.4375 2.1875 1.3125 1.3125C2.1875 0.4375 3.25 0 4.5 0C5.75 0 6.8125 0.4375 7.6875 1.3125C8.5625 2.1875 9 3.25 9 4.5V13.25C9 14.0167 8.73333 14.6667 8.2 15.2C7.66667 15.7333 7.01667 16 6.25 16C5.48333 16 4.83333 15.7333 4.3 15.2C3.76667 14.6667 3.5 14.0167 3.5 13.25V4H5.5V13.25C5.5 13.4667 5.57083 13.6458 5.7125 13.7875C5.85417 13.9292 6.03333 14 6.25 14C6.46667 14 6.64583 13.9292 6.7875 13.7875C6.92917 13.6458 7 13.4667 7 13.25V4.5C6.98333 3.8 6.7375 3.20833 6.2625 2.725C5.7875 2.24167 5.2 2 4.5 2C3.8 2 3.20833 2.24167 2.725 2.725C2.24167 3.20833 2 3.8 2 4.5V13.75C1.98333 14.9333 2.39167 15.9375 3.225 16.7625C4.05833 17.5875 5.06667 18 6.25 18C7.41667 18 8.40833 17.5875 9.225 16.7625C10.0417 15.9375 10.4667 14.9333 10.5 13.75V4H12.5V13.75Z" fill="#5C3F3F"/>
              </svg>
            </div>
            <span style={attachLabelStyle}>파일</span>
          </button>

          <button type="button" style={attachItemStyle}>
            <div style={attachIconWrapStyle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.5 4.5C3.67157 4.5 3 5.17157 3 6V19.5C3 20.3284 3.67157 21 4.5 21H19.5C20.3284 21 21 20.3284 21 19.5V6C21 5.17157 20.3284 4.5 19.5 4.5H4.5ZM1.5 6C1.5 4.34315 2.84315 3 4.5 3H19.5C21.1569 3 22.5 4.34315 22.5 6V19.5C22.5 21.1569 21.1569 22.5 19.5 22.5H4.5C2.84315 22.5 1.5 21.1569 1.5 19.5V6Z" fill="#C7002B"/>
                <path d="M13.875 12C14.4963 12 15 11.4963 15 10.875C15 10.2537 14.4963 9.75 13.875 9.75C13.2537 9.75 12.75 10.2537 12.75 10.875C12.75 11.4963 13.2537 12 13.875 12Z" fill="#C7002B"/>
                <path d="M17.625 12C18.2463 12 18.75 11.4963 18.75 10.875C18.75 10.2537 18.2463 9.75 17.625 9.75C17.0037 9.75 16.5 10.2537 16.5 10.875C16.5 11.4963 17.0037 12 17.625 12Z" fill="#C7002B"/>
                <path d="M13.875 15.75C14.4963 15.75 15 15.2463 15 14.625C15 14.0037 14.4963 13.5 13.875 13.5C13.2537 13.5 12.75 14.0037 12.75 14.625C12.75 15.2463 13.2537 15.75 13.875 15.75Z" fill="#C7002B"/>
                <path d="M17.625 15.75C18.2463 15.75 18.75 15.2463 18.75 14.625C18.75 14.0037 18.2463 13.5 17.625 13.5C17.0037 13.5 16.5 14.0037 16.5 14.625C16.5 15.2463 17.0037 15.75 17.625 15.75Z" fill="#C7002B"/>
                <path d="M6.375 15.75C6.99632 15.75 7.5 15.2463 7.5 14.625C7.5 14.0037 6.99632 13.5 6.375 13.5C5.75368 13.5 5.25 14.0037 5.25 14.625C5.25 15.2463 5.75368 15.75 6.375 15.75Z" fill="#C7002B"/>
                <path d="M10.125 15.75C10.7463 15.75 11.25 15.2463 11.25 14.625C11.25 14.0037 10.7463 13.5 10.125 13.5C9.50368 13.5 9 14.0037 9 14.625C9 15.2463 9.50368 15.75 10.125 15.75Z" fill="#C7002B"/>
                <path d="M6.375 19.5C6.99632 19.5 7.5 18.9963 7.5 18.375C7.5 17.7537 6.99632 17.25 6.375 17.25C5.75368 17.25 5.25 17.7537 5.25 18.375C5.25 18.9963 5.75368 19.5 6.375 19.5Z" fill="#C7002B"/>
                <path d="M10.125 19.5C10.7463 19.5 11.25 18.9963 11.25 18.375C11.25 17.7537 10.7463 17.25 10.125 17.25C9.50368 17.25 9 17.7537 9 18.375C9 18.9963 9.50368 19.5 10.125 19.5Z" fill="#C7002B"/>
                <path d="M13.875 19.5C14.4963 19.5 15 18.9963 15 18.375C15 17.7537 14.4963 17.25 13.875 17.25C13.2537 17.25 12.75 17.7537 12.75 18.375C12.75 18.9963 13.2537 19.5 13.875 19.5Z" fill="#C7002B"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M6 1.5C6.41421 1.5 6.75 1.83579 6.75 2.25V3.75C6.75 4.16421 6.41421 4.5 6 4.5C5.58579 4.5 5.25 4.16421 5.25 3.75V2.25C5.25 1.83579 5.58579 1.5 6 1.5Z" fill="#C7002B"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M18 1.5C18.4142 1.5 18.75 1.83579 18.75 2.25V3.75C18.75 4.16421 18.4142 4.5 18 4.5C17.5858 4.5 17.25 4.16421 17.25 3.75V2.25C17.25 1.83579 17.5858 1.5 18 1.5Z" fill="#C7002B"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M2.25 6.75H21.75V8.25H2.25V6.75Z" fill="#C7002B"/>
              </svg>
            </div>
            <span style={attachLabelStyle}>커피챗</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function MessageInput({ selectedConn, input, isSending, onInputChange, onSubmit }: MessageInputProps) {
  void selectedConn;
  return (
    <div style={wrapperStyle}>
      <AcceptedForm
        input={input}
        isSending={isSending}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
