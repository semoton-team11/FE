"use client";

import type { Senior } from "@/types";
import { getAvatarVariantForId, AvatarIcon } from "@/lib/avatarVariants";

// ── 인라인 스타일 상수 ──────────────────────────────────────────────────────
const headerStyle: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  borderBottom: "1px solid #EFEFEF",
  padding: "24px 24px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const avatarWrapStyle = (bg: string): React.CSSProperties => ({
  position: "relative",
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

const avatarImgStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const onlineDotStyle = (isAvailable?: boolean): React.CSSProperties => ({
  position: "absolute",
  bottom: "2px",
  right: "2px",
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: isAvailable ? "#22C55E" : "#FF5464",
  border: "2px solid white",
  zIndex: 1,
});

const nameStyle: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 700,
  color: "#1F1A1A",
};

const statusRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
  marginTop: "2px",
};

const onlineLabelStyle = (isAvailable?: boolean): React.CSSProperties => ({
  fontSize: "12px",
  color: isAvailable ? "#22C55E" : "#FF5464",
  fontWeight: 500,
});

const deptLabelStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#9CA3AF",
};

const actionGroupStyle: React.CSSProperties = {
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

const iconBtnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// ── 타입 ─────────────────────────────────────────────────────────────────────
type ChatHeaderProps = {
  senior: Senior | null;
};

// ── 메인 컴포넌트 ───────────────────────────────────────────────────────────
export default function ChatHeader({ senior }: ChatHeaderProps) {
  const avatarVariant = getAvatarVariantForId(senior?.id ?? "");
  const avatarBg = senior?.profileImage ? "#00000033" : avatarVariant.bg;

  return (
    <div style={headerStyle}>
      {/* 아바타 + 온라인 표시 */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={avatarWrapStyle(avatarBg)}>
          {senior?.profileImage ? (
            <img src={senior.profileImage} alt={senior.name} style={avatarImgStyle} />
          ) : (
            <AvatarIcon fill={avatarVariant.fill} bodyPath={avatarVariant.bodyPath} size={44} />
          )}
        </div>
        <div style={onlineDotStyle(senior?.isAvailable)} />
      </div>

      {/* 이름 + 상태 */}
      <div>
        <p style={nameStyle}>{senior?.name ?? "선배님"} 선배님</p>
        <div style={statusRowStyle}>
          <span style={onlineLabelStyle(senior?.isAvailable)}>
            {senior?.isAvailable ? "온라인" : "오프라인"}
          </span>
          <span style={deptLabelStyle}>· {senior?.department ?? ""}</span>
        </div>
      </div>

      {/* 우측 아이콘 */}
      <div style={actionGroupStyle}>
        <button style={iconBtnStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21.9994 16.9201V19.9201C22.0006 20.1986 21.9435 20.4743 21.832 20.7294C21.7204 20.9846 21.5567 21.2137 21.3515 21.402C21.1463 21.5902 20.904 21.7336 20.6402 21.8228C20.3764 21.912 20.0968 21.9452 19.8194 21.9201C16.7423 21.5857 13.7864 20.5342 11.1894 18.8501C8.77327 17.3148 6.72478 15.2663 5.18945 12.8501C3.49942 10.2413 2.44769 7.27109 2.11944 4.1801C2.09446 3.90356 2.12732 3.62486 2.21595 3.36172C2.30457 3.09859 2.44702 2.85679 2.63421 2.65172C2.82141 2.44665 3.04925 2.28281 3.30324 2.17062C3.55722 2.05843 3.83179 2.00036 4.10945 2.0001H7.10945C7.59475 1.99532 8.06524 2.16718 8.43321 2.48363C8.80118 2.80008 9.04152 3.23954 9.10944 3.7201C9.23607 4.68016 9.47089 5.62282 9.80945 6.5301C9.94399 6.88802 9.97311 7.27701 9.89335 7.65098C9.8136 8.02494 9.62831 8.36821 9.35944 8.6401L8.08945 9.9101C9.513 12.4136 11.5859 14.4865 14.0894 15.9101L15.3594 14.6401C15.6313 14.3712 15.9746 14.1859 16.3486 14.1062C16.7225 14.0264 17.1115 14.0556 17.4694 14.1901C18.3767 14.5286 19.3194 14.7635 20.2794 14.8901C20.7652 14.9586 21.2088 15.2033 21.526 15.5776C21.8431 15.9519 22.0116 16.4297 21.9994 16.9201Z" stroke="#5C3F3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button style={iconBtnStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M23 7L16 12L23 17V7Z" stroke="#5C3F3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z" stroke="#5C3F3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button style={iconBtnStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#5C3F3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16V12" stroke="#5C3F3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8H12.01" stroke="#5C3F3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
