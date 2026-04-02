"use client";

import React from "react";
import Link from "next/link";
import type { Message, Senior, ConnectionRequest } from "@/types";
import { getAvatarVariantForId, AvatarIcon } from "@/lib/avatarVariants";
import { CURRENT_USER_ID } from "../_lib/constants";

type MessageAreaProps = {
  messages: Message[];
  selectedConn: ConnectionRequest;
  selectedSenior: Senior | null;
  bottomRef: React.RefObject<HTMLDivElement | null>;
};

const scrollAreaStyle: React.CSSProperties = {
  flex: 1,
  overflowY: "auto",
  backgroundColor: "#FFF8F7",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const emptyProfileCenterStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  paddingTop: "32px",
};

const emptyProfileCardStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "6px",
};

const profileNameStyle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 700,
  color: "#1F1A1A",
  marginTop: "8px",
};

const profileDeptStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "#5C3F3F",
  marginTop: "-4px",
};

const profileLinkStyle: React.CSSProperties = {
  display: "flex",
  padding: "10px 36px",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "14px",
  backgroundColor: "#9A001F1A",
  color: "#9A001F",
  borderRadius: "12px",
  fontSize: "13px",
  fontWeight: 500,
  textDecoration: "none",
};

function getBubbleRowStyle(isMine: boolean): React.CSSProperties {
  return {
    display: "flex",
    justifyContent: isMine ? "flex-end" : "flex-start",
  };
}

function getBubbleStyle(isMine: boolean): React.CSSProperties {
  return {
    maxWidth: "320px",
    padding: "10px 16px",
    borderRadius: isMine ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
    fontSize: "14px",
    backgroundColor: isMine ? "#9A001F" : "#FFFFFF",
    color: isMine ? "#FFFFFF" : "#1F1A1A",
    boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
  };
}

type EmptyProfileProps = {
  selectedSenior: Senior | null;
  seniorId: string;
};

function EmptyProfile({ selectedSenior, seniorId }: EmptyProfileProps) {
  const avatarVariant = getAvatarVariantForId(seniorId);
  const avatarBg = selectedSenior?.profileImage ? "#00000033" : avatarVariant.bg;

  return (
    <div style={emptyProfileCenterStyle}>
      <div style={emptyProfileCardStyle}>
        {/* 아바타 */}
        <div style={{
          width: "96px",
          height: "96px",
          borderRadius: "50%",
          backgroundColor: avatarBg,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {selectedSenior?.profileImage ? (
            <img
              src={selectedSenior.profileImage}
              alt={selectedSenior.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <AvatarIcon fill={avatarVariant.fill} bodyPath={avatarVariant.bodyPath} size={88} />
          )}
        </div>

        <p style={profileNameStyle}>{selectedSenior?.name ?? "선배님"} 선배님</p>
        <p style={profileDeptStyle}>{selectedSenior?.department ?? ""}</p>
        <Link href={`/seniors/${seniorId}`} style={profileLinkStyle}>
          프로필 보기
        </Link>
      </div>
    </div>
  );
}

type MessageListProps = {
  messages: Message[];
};

function MessageList({ messages }: MessageListProps) {
  return (
    <>
      {messages.map((msg) => {
        const isMine = msg.senderId === CURRENT_USER_ID;
        return (
          <div key={msg.id} style={getBubbleRowStyle(isMine)}>
            <div style={getBubbleStyle(isMine)}>
              {msg.content}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default function MessageArea({ messages, selectedConn, selectedSenior, bottomRef }: MessageAreaProps) {
  const hasMessages = messages.length > 0;

  return (
    <div style={scrollAreaStyle}>
      {!hasMessages ? (
        <EmptyProfile selectedSenior={selectedSenior} seniorId={selectedConn.toSeniorId} />
      ) : (
        <MessageList messages={messages} />
      )}
      <div ref={bottomRef} />
    </div>
  );
}
