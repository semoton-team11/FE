"use client";

import { useState, useEffect } from "react";
import { getCurriculumStatus, getUserCourses } from "@/services/curriculum";
import type { CurriculumStatus, Course } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const COURSE_TYPES: Course["type"][] = ["전공필수", "전공선택", "전공기초", "교양", "기타"];

type StatusBarProps = {
  label: string;
  completed: number;
  total: number;
  color: string;
};

function StatusBar({ label, completed, total, color }: StatusBarProps) {
  const pct = Math.min(100, Math.round((completed / total) * 100));
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">
          {completed} / {total} 학점 ({pct}%)
        </span>
      </div>
      <div className="h-3 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

type AddCourseFormProps = {
  onAdd: (course: Omit<Course, "id">) => void;
};

function AddCourseForm({ onAdd }: AddCourseFormProps) {
  const [name, setName] = useState("");
  const [credits, setCredits] = useState("3");
  const [type, setType] = useState<Course["type"]>("전공필수");
  const [semester, setSemester] = useState("");
  const [grade, setGrade] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onAdd({
      name,
      credits: Number(credits),
      type,
      semester,
      grade: grade || null,
    });
    setName("");
    setCredits("3");
    setGrade("");
  }

  return (
    <form onSubmit={handleSubmit} className="border border-border rounded-xl p-5 flex flex-col gap-3">
      <h3 className="font-semibold">과목 추가</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Input
          placeholder="과목명"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="col-span-2"
        />
        <Input
          placeholder="학기 (예: 2024-1)"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="학점"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
          min={1}
          max={6}
          required
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as Course["type"])}
          className="border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring col-span-2"
        >
          {COURSE_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <Input
          placeholder="성적 (예: A+, 미이수 시 빈칸)"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <Button type="submit" className="bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white">
          추가
        </Button>
      </div>
    </form>
  );
}

export default function CurriculumPage() {
  const [status, setStatus] = useState<CurriculumStatus | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    getCurriculumStatus("user-1").then(setStatus);
    getUserCourses("user-1").then(setCourses);
  }, []);

  function handleAddCourse(course: Omit<Course, "id">) {
    const newCourse: Course = { ...course, id: `local-${Date.now()}` };
    setCourses((prev) => [...prev, newCourse]);
    // 상태 재계산
    setStatus((prev) => {
      if (!prev || !newCourse.grade) return prev;
      const key = {
        전공필수: "required",
        전공선택: "elective",
        전공기초: "basic",
        교양: "liberal",
        기타: null,
      }[newCourse.type] as keyof CurriculumStatus | null;
      if (!key) return prev;
      return {
        ...prev,
        [key]: {
          ...prev[key],
          completed: prev[key].completed + newCourse.credits,
        },
      };
    });
  }

  const STATUS_BARS = status
    ? [
        { label: "전공필수", ...status.required, color: "var(--color-brand)" },
        { label: "전공선택", ...status.elective, color: "#22c55e" },
        { label: "전공기초", ...status.basic, color: "#f59e0b" },
      ]
    : [];

  const completedCourses = courses.filter((c) => c.grade);
  const pendingCourses = courses.filter((c) => !c.grade);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">커리큘럼 계산기</h1>

      {/* 이수 현황 */}
      <section className="border border-border rounded-xl p-6 flex flex-col gap-4">
        <h2 className="font-semibold text-lg">이수 현황</h2>
        {status ? (
          <div className="flex flex-col gap-4">
            {STATUS_BARS.map((bar) => (
              <StatusBar key={bar.label} {...bar} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">불러오는 중...</p>
        )}
      </section>

      {/* 과목 추가 */}
      <AddCourseForm onAdd={handleAddCourse} />

      {/* 과목 목록 */}
      <section className="flex flex-col gap-4">
        <h2 className="font-semibold text-lg">이수 과목 ({completedCourses.length})</h2>
        <div className="flex flex-col gap-2">
          {completedCourses.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between border border-border rounded-lg px-4 py-3 text-sm"
            >
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{c.type}</Badge>
                <span className="font-medium">{c.name}</span>
                <span className="text-muted-foreground">{c.semester}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">{c.credits}학점</span>
                <span className="font-semibold text-[var(--color-brand)]">{c.grade}</span>
              </div>
            </div>
          ))}
        </div>

        {pendingCourses.length > 0 && (
          <>
            <h2 className="font-semibold text-lg mt-2">수강 중 / 미이수 ({pendingCourses.length})</h2>
            <div className="flex flex-col gap-2">
              {pendingCourses.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between border border-dashed border-border rounded-lg px-4 py-3 text-sm opacity-70"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{c.type}</Badge>
                    <span className="font-medium">{c.name}</span>
                    <span className="text-muted-foreground">{c.semester}</span>
                  </div>
                  <span className="text-muted-foreground">{c.credits}학점</span>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
