"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSeniorById } from "@/services/seniors";
import { sendConnectionRequest } from "@/services/connections";
import type { Senior } from "@/types";
import ProfileCard from "./_components/ProfileCard";
import AcademicJourneyGrid, { buildYearColumns } from "./_components/AcademicJourneyGrid";
import MentoringSchedule from "./_components/MentoringSchedule";

export default function SeniorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [senior, setSenior] = useState<Senior | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // ── 선배 데이터 로드 ──
  useEffect(() => {
    getSeniorById(id).then(setSenior);
  }, [id]);

  async function handleConnect() {
    if (!senior) return;
    setIsSending(true);
    try {
      await sendConnectionRequest({
        fromUserId: "user-1",
        toSeniorId: senior.id,
        type: "커피챗",
        message: "안녕하세요, 연결 요청드립니다!",
        meetingLink: undefined,
      });
      router.push("/messages");
    } finally {
      setIsSending(false);
    }
  }

  if (!senior) {
    return (
      <div style={{ padding: "60px", color: "#9CA3AF", fontSize: "15px" }}>
        불러오는 중...
      </div>
    );
  }

  const yearColumns = buildYearColumns(senior.timetable);

  return (
    <div
      style={{
        fontFamily: "var(--font-roboto), sans-serif",
        display: "flex",
        gap: "40px",
        alignItems: "flex-start",
        padding: "48px 0",
      }}
    >

      {/* ── 왼쪽: 프로필 카드 ── */}
      <ProfileCard
        senior={senior}
        isSending={isSending}
        onConnect={handleConnect}
      />

      {/* ── 오른쪽: 학업 여정 + 멘토링 시간 ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "48px" }}>
        <AcademicJourneyGrid yearColumns={yearColumns} />
        <MentoringSchedule selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      </div>

    </div>
  );
}
