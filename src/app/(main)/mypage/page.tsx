"use client";

import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { getCurrentUser } from "@/services/user";
import { getFields, getDepartments } from "@/services/roadmap";
import { getSeniorById } from "@/services/seniors";
import type { User, Field, Senior, Department } from "@/types";
import ProfileSection from "./_components/ProfileSection";
import CalendarSection from "./_components/CalendarSection";
import ScrapbookSection from "./_components/ScrapbookSection";

const pageStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  fontFamily: "var(--font-roboto), sans-serif",
};

const titleStyle: CSSProperties = {
  fontSize: "32px",
  fontWeight: 700,
  color: "#1F1A1A",
};

const topRowStyle: CSSProperties = {
  display: "flex",
  gap: "24px",
  alignItems: "stretch",
};

export default function MyPage() {
  const [user, setUser]               = useState<User | null>(null);
  const [fields, setFields]           = useState<Field[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [scrapedSeniors, setScrapedSeniors] = useState<Senior[]>([]);

  useEffect(() => {
    getCurrentUser().then(async (u) => {
      setUser(u);
      const [f, depts, seniors] = await Promise.all([
        getFields(),
        getDepartments(),
        Promise.all(u.scrapedSeniorIds.map((id) => getSeniorById(id))),
      ]);
      setFields(f);
      setDepartments(depts);
      setScrapedSeniors(seniors.filter((s): s is Senior => s !== null));
    });
  }, []);

  if (!user) return null;

  const interestedFieldNames = fields
    .filter((f) => user.interestedFields.includes(f.id))
    .map((f) => f.name);

  const deptName = departments.find((d) => d.id === user.department)?.name ?? "";

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>마이페이지</h1>

      {/* 프로필 + 캘린더 */}
      <div style={topRowStyle}>
        <ProfileSection user={user} interestedFieldNames={interestedFieldNames} deptName={deptName} />
        <CalendarSection />
      </div>

      {/* 스크랩북 */}
      <ScrapbookSection scrapedSeniors={scrapedSeniors} />
    </div>
  );
}
