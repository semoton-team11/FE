"use client";

import Image from "next/image";

// ── 이미지 위치 조정 ──────────────────────────
const IMG_SCALE = 2.0;       // 확대 배율 (클수록 확대)
const IMG_X = "65%";         // 좌우: 0% 왼쪽 ↔ 100% 오른쪽
const IMG_Y = "30%";         // 상하: 0% 위 ↔ 100% 아래
// ─────────────────────────────────────────────

export default function SignupCampusImage() {
  return (
    <div style={{ width: "50%", position: "relative", overflow: "hidden" }}>
      <Image
        src="/campus.png"
        alt="캠퍼스"
        fill
        style={{
          objectFit: "cover",
          objectPosition: "65% 53%",
          transform: "scale(2.8)",
          transformOrigin: "65% 53%",
        }}
        priority
      />
      {/* 어두운 오버레이 — opacity로 밝기 조절 (0 = 없음, 1 = 완전 검정) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "black",
          opacity: 0.25,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
