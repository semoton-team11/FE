"use client";

import { useState, useEffect } from "react";
import { getCurrentUser } from "@/services/user";
import { getFields } from "@/services/roadmap";
import { getSeniorById } from "@/services/seniors";
import { getConnections } from "@/services/connections";
import type { User, Field, Senior, ConnectionRequest } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function MyPage() {
  const [user, setUser] = useState<User | null>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const [scrapedSeniors, setScrapedSeniors] = useState<Senior[]>([]);
  const [connections, setConnections] = useState<ConnectionRequest[]>([]);

  useEffect(() => {
    getCurrentUser().then(async (u) => {
      setUser(u);
      const [f, seniors, conns] = await Promise.all([
        getFields(),
        Promise.all(u.scrapedSeniorIds.map((id) => getSeniorById(id))),
        getConnections(u.id),
      ]);
      setFields(f);
      setScrapedSeniors(seniors.filter((s): s is Senior => s !== null));
      setConnections(conns);
    });
  }, []);

  if (!user) return <p className="text-muted-foreground">불러오는 중...</p>;

  const interestedFieldNames = fields
    .filter((f) => user.interestedFields.includes(f.id))
    .map((f) => f.name);

  const upcomingConnections = connections.filter((c) => c.status === "accepted");
  const historyConnections = connections.filter((c) => c.status !== "pending");

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">마이페이지</h1>

      {/* 프로필 */}
      <section className="border border-border rounded-xl p-6 flex items-start gap-5">
        <Avatar className="w-16 h-16">
          <AvatarFallback className="text-xl font-bold bg-muted">
            {user.name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="font-bold text-lg">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {interestedFieldNames.map((name) => (
              <Badge key={name} variant="secondary">{name}</Badge>
            ))}
            {interestedFieldNames.length === 0 && (
              <span className="text-sm text-muted-foreground">관심 직무를 선택해보세요.</span>
            )}
          </div>
          {/* TODO: 관심 직무 수정 기능 — 디자이너 확인 후 UI 구현 */}
        </div>
      </section>

      {/* 탭 */}
      <Tabs defaultValue="scrapbook">
        <TabsList>
          <TabsTrigger value="scrapbook">스크랩북</TabsTrigger>
          <TabsTrigger value="connections">선배 연결 내역</TabsTrigger>
        </TabsList>

        {/* 스크랩북 */}
        <TabsContent value="scrapbook" className="mt-4 flex flex-col gap-4">
          <div>
            <h3 className="font-semibold mb-3">저장한 선배 로드맵 ({scrapedSeniors.length})</h3>
            {scrapedSeniors.length === 0 ? (
              <p className="text-sm text-muted-foreground">저장한 선배가 없습니다.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {scrapedSeniors.map((senior) => (
                  <Link
                    key={senior.id}
                    href={`/seniors/${senior.id}`}
                    className="border border-border rounded-xl px-4 py-3 flex items-center gap-3 hover:border-[var(--color-brand)] transition-all"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs font-bold bg-muted">
                        {senior.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{senior.name}</p>
                      <p className="text-xs text-muted-foreground">{senior.company} · {senior.jobTitle}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* 선배 연결 내역 */}
        <TabsContent value="connections" className="mt-4 flex flex-col gap-6">
          <div>
            <h3 className="font-semibold mb-3">진행 예정 ({upcomingConnections.length})</h3>
            {upcomingConnections.length === 0 ? (
              <p className="text-sm text-muted-foreground">예정된 미팅이 없습니다.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {upcomingConnections.map((conn) => (
                  <div
                    key={conn.id}
                    className="border border-[var(--color-brand)] rounded-xl px-4 py-3 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge>{conn.type}</Badge>
                        <span className="text-sm font-medium">{conn.toSeniorId}</span>
                      </div>
                      {conn.meetingLink && (
                        <a
                          href={conn.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[var(--color-brand)] underline mt-1 block"
                        >
                          미팅 링크 열기
                        </a>
                      )}
                    </div>
                    <Link href="/messages">
                      <Badge variant="outline">메시지 보기</Badge>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-3">완료된 상담 기록</h3>
            {historyConnections.length === 0 ? (
              <p className="text-sm text-muted-foreground">완료된 상담이 없습니다.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {historyConnections.map((conn) => (
                  <div
                    key={conn.id}
                    className="border border-border rounded-xl px-4 py-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{conn.type}</Badge>
                      <span className="text-sm">{conn.toSeniorId}</span>
                    </div>
                    <Badge
                      variant={
                        conn.status === "accepted" ? "default"
                        : conn.status === "rejected" ? "destructive"
                        : "outline"
                      }
                    >
                      {conn.status === "accepted" ? "수락됨"
                        : conn.status === "rejected" ? "거절됨"
                        : "대기 중"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
