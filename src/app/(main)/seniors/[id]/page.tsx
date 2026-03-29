"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSeniorById } from "@/services/seniors";
import { sendConnectionRequest } from "@/services/connections";
import type { Senior } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function SeniorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [senior, setSenior] = useState<Senior | null>(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestType, setRequestType] = useState<"커피챗" | "멘토링">("커피챗");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    getSeniorById(id).then(setSenior);
  }, [id]);

  async function handleSendRequest() {
    if (!senior) return;
    setIsSending(true);
    try {
      await sendConnectionRequest({
        fromUserId: "user-1",
        toSeniorId: senior.id,
        type: requestType,
        message,
        meetingLink: undefined,
      });
      alert("연결 요청을 보냈습니다!");
      router.push("/messages");
    } finally {
      setIsSending(false);
    }
  }

  if (!senior) {
    return <p className="text-muted-foreground">불러오는 중...</p>;
  }

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      {/* 프로필 헤더 */}
      <div className="flex items-start gap-5">
        <Avatar className="w-16 h-16">
          <AvatarFallback className="text-xl font-bold bg-muted">
            {senior.name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold">{senior.name}</h1>
            <Badge variant={senior.isAvailable ? "default" : "secondary"}>
              {senior.isAvailable ? "커피챗 가능" : "현재 불가"}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">{senior.company} · {senior.jobTitle}</p>
          <p className="mt-2 text-sm">{senior.bio}</p>
        </div>
      </div>

      {/* 후배에게 남기는 팁 */}
      <section className="border border-border rounded-xl p-5">
        <h2 className="font-semibold mb-2">후배들에게 남기는 팁</h2>
        <p className="text-sm text-foreground leading-relaxed">{senior.tips}</p>
      </section>

      {/* 수강 시간표 */}
      <section className="flex flex-col gap-4">
        <h2 className="font-semibold">대학 시절 수강 이력</h2>
        {senior.timetable.map((entry) => (
          <div key={entry.semester} className="border border-border rounded-xl p-4">
            <p className="text-sm font-medium text-muted-foreground mb-3">{entry.semester}</p>
            <div className="flex flex-col gap-2">
              {entry.courses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{course.type}</Badge>
                    <span>{course.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span>{course.credits}학점</span>
                    {course.grade && (
                      <span className="font-medium text-[var(--color-brand)]">{course.grade}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 연결 요청 */}
      {senior.isAvailable && (
        <section className="border border-border rounded-xl p-5 flex flex-col gap-4">
          <h2 className="font-semibold">1:1 연결 요청</h2>

          {!showRequestForm ? (
            <Button
              onClick={() => setShowRequestForm(true)}
              className="bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white self-start"
            >
              연결 요청하기
            </Button>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                {(["커피챗", "멘토링"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setRequestType(type)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                      requestType === type
                        ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)]"
                        : "border-border hover:border-[var(--color-brand)]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <Textarea
                placeholder="선배에게 전달할 메시지를 입력하세요."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSendRequest}
                  disabled={!message.trim() || isSending}
                  className="bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white"
                >
                  {isSending ? "전송 중..." : "요청 보내기"}
                </Button>
                <Button variant="outline" onClick={() => setShowRequestForm(false)}>
                  취소
                </Button>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
