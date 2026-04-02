"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSeniorById } from "@/services/seniors";
import { sendConnectionRequest } from "@/services/connections";
import { getCurrentUser } from "@/services/user";
import type { Senior } from "@/types";
import type { CSSProperties } from "react";
import ProfileCard from "./_components/ProfileCard";
import AcademicJourneyGrid, { buildYearColumns } from "./_components/AcademicJourneyGrid";
import MentoringSchedule from "./_components/MentoringSchedule";
import { addRecentActivity } from "@/lib/recentActivity";

const loadingStyle: CSSProperties = {
  padding: "60px",
  color: "#9CA3AF",
  fontSize: "15px",
};

const pageLayoutStyle: CSSProperties = {
  fontFamily: "var(--font-roboto), sans-serif",
  display: "flex",
  gap: "40px",
  alignItems: "flex-start",
  padding: "48px 0",
};

const rightPanelStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "48px",
};

export default function SeniorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [senior, setSenior] = useState<Senior | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentUserId, setCurrentUserId] = useState("");

  // ── 선배 데이터 로드 ──
  useEffect(() => {
    getCurrentUser().then((u) => setCurrentUserId(u.id)).catch(() => {});
    getSeniorById(id).then((s) => {
      setSenior(s);
      if (s) {
        addRecentActivity({
          id: `senior-${s.id}`,
          label: `${s.name} 선배님 프로필`,
          sub: s.department ?? "",
          href: `/seniors/${s.id}`,
          type: "senior",
        });
      }
    });
  }, [id]);

  async function handleConnect() {
    if (!senior) return;
    setIsSending(true);
    try {
      const newConn = await sendConnectionRequest({
        fromUserId: currentUserId,
        toSeniorId: senior.id,
        type: "커피챗",
        message: "안녕하세요, 연결 요청드립니다!",
        meetingLink: undefined,
      });
      router.push(`/messages?connId=${newConn.id}`);
    } finally {
      setIsSending(false);
    }
  }

  if (!senior) {
    return (
      <div style={loadingStyle}>
        불러오는 중...
      </div>
    );
  }

  const yearColumns = buildYearColumns(senior.timetable);

  return (
    <div style={pageLayoutStyle}>

      {/* ── 왼쪽: 프로필 카드 ── */}
      <ProfileCard
        senior={senior}
        isSending={isSending}
        onConnect={handleConnect}
      />

      {/* ── 오른쪽: 학업 여정 + 멘토링 시간 ── */}
      <div style={rightPanelStyle}>
        <AcademicJourneyGrid yearColumns={yearColumns} />
        <MentoringSchedule selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      </div>

    </div>
  );
}
