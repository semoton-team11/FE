"use client";

import Link from "next/link";
import type { ConnectionRequest } from "@/types";
import { Badge } from "@/components/ui/badge";

type ConnectionsTabProps = {
  upcomingConnections: ConnectionRequest[];
  historyConnections: ConnectionRequest[];
};

export default function ConnectionsTab({ upcomingConnections, historyConnections }: ConnectionsTabProps) {
  return (
    <div className="flex flex-col gap-6">
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
    </div>
  );
}
