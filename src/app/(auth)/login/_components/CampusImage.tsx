"use client";

import Image from "next/image";

export default function CampusImage() {
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
