"use client";

import { useState, useEffect } from "react";
import { getCurrentUser } from "@/services/user";
import { getFields } from "@/services/roadmap";
import { getSeniorById } from "@/services/seniors";
import { getConnections } from "@/services/connections";
import type { User, Field, Senior, ConnectionRequest } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSection from "./_components/ProfileSection";
import ScrapbookTab from "./_components/ScrapbookTab";
import ConnectionsTab from "./_components/ConnectionsTab";

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

      <ProfileSection user={user} interestedFieldNames={interestedFieldNames} />

      {/* 탭 */}
      <Tabs defaultValue="scrapbook">
        <TabsList>
          <TabsTrigger value="scrapbook">스크랩북</TabsTrigger>
          <TabsTrigger value="connections">선배 연결 내역</TabsTrigger>
        </TabsList>

        <TabsContent value="scrapbook" className="mt-4 flex flex-col gap-4">
          <ScrapbookTab scrapedSeniors={scrapedSeniors} />
        </TabsContent>

        <TabsContent value="connections" className="mt-4 flex flex-col gap-6">
          <ConnectionsTab
            upcomingConnections={upcomingConnections}
            historyConnections={historyConnections}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
