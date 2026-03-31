"use client";

import React from "react";
import Link from "next/link";
import type { Message, Senior, ConnectionRequest } from "@/types";
import { CURRENT_USER_ID } from "../_lib/constants";

type MessageAreaProps = {
  messages: Message[];
  selectedConn: ConnectionRequest;
  selectedSenior: Senior | null;
  bottomRef: React.RefObject<HTMLDivElement | null>;
};

export default function MessageArea({ messages, selectedConn, selectedSenior, bottomRef }: MessageAreaProps) {
  const hasMessages = messages.length > 0;

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        backgroundColor: "#FFF8F7",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {!hasMessages ? (
        /* 메시지 없을 때 중앙 프로필 */
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
        <div
          style={{
            display: "flex",
            width: "143px",
            flexDirection: "column",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(#00000033, #00000033) #EBE0E0",
            }}
          />
          <p style={{ fontSize: "16px", fontWeight: 700, color: "#1F1A1A" }}>
            {selectedSenior?.name ?? "선배님"} 선배님
          </p>
          <p style={{ fontSize: "13px", color: "#9CA3AF" }}>
            {selectedSenior?.jobTitle ?? ""}
          </p>
          <Link
            href={`/seniors/${selectedConn.toSeniorId}`}
            style={{
              display: "flex",
              padding: "12px 32px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "stretch",
              backgroundColor: "#F6EBEB",
              color: "#9A001F",
              borderRadius: "12px",
              fontSize: "13px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            프로필 보기
          </Link>
        </div>
        </div>
      ) : (
        /* 메시지 목록 */
        messages.map((msg) => {
          const isMine = msg.senderId === CURRENT_USER_ID;
          return (
            <div
              key={msg.id}
              style={{
                display: "flex",
                justifyContent: isMine ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "320px",
                  padding: "10px 16px",
                  borderRadius: isMine ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  fontSize: "14px",
                  backgroundColor: isMine ? "#9A001F" : "#FFFFFF",
                  color: isMine ? "#FFFFFF" : "#1F1A1A",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                }}
              >
                {msg.content}
              </div>
            </div>
          );
        })
      )}
      <div ref={bottomRef} />
    </div>
  );
}
