"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCatalogCourses, getCurriculumRequirement, getCheckedCourses, saveCheckedCourses } from "@/services/curriculum";
import { getCurrentUser } from "@/services/user";
import type { CatalogCourse, CurriculumRequirement, CourseType } from "@/types";

import { CATEGORY_CONFIG } from "./_lib/constants";
import { LoadingOverlay } from "./_components/LoadingOverlay";
import { CategoryPanel } from "./_components/CategoryPanel";
import { CourseGrid } from "./_components/CourseGrid";
import { ActionButtons } from "./_components/ActionButtons";

export default function CurriculumPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [catalog, setCatalog] = useState<CatalogCourse[]>([]);
  const [requirement, setRequirement] = useState<CurriculumRequirement | null>(null);
  const [selectedType, setSelectedType] = useState<CourseType>("전공기초");
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved">("idle");
  const [isCalculating, setIsCalculating] = useState(false);

  // ── 데이터 로드 ──────────────────────────────────────────────
  useEffect(() => {
    getCurrentUser().then(async (user) => {
      if (!user) return;
      setUserId(user.id);

      try {
        const [courses, req, savedChecked] = await Promise.all([
          getCatalogCourses(),
          getCurriculumRequirement(),
          getCheckedCourses(user.id),
        ]);
        
        const mappedCourses = courses.map((c: any) => ({
          id: c.id || c.course_id,
          name: c.name || c.course_name,
          type: c.type || c.course_type,
          credits: c.credits, 
          departmentId: c.dept_name || "",
          code: c.code || c.course_id
        }));

        setCatalog(mappedCourses);
        setRequirement(req);
        setChecked(savedChecked instanceof Set ? savedChecked : new Set(savedChecked));
      } catch (err) {
        console.error("데이터 로딩 에러:", err);
        setCatalog([]);
      }
    });
  }, []);

  // ── 핸들러 ───────────────────────────────────────────────────
  function toggleCourse(id: string) {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  async function handleSave() {
    if (!userId) return;
    await saveCheckedCourses(userId, [...checked]);
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 3000);
  }

  async function handleCalculate() {
    if (!userId) return;
    setIsCalculating(true);
    await saveCheckedCourses(userId, [...checked]);
    setTimeout(() => {
      setIsCalculating(false);
      router.push("/curriculum/result");
    }, 2000);
  }

  // ── 파생 데이터 ──────────────────────────────────────────────
  const category = CATEGORY_CONFIG.find(c => c.type === selectedType)!;
  // const currentCourses = catalog.filter(c => c.type === selectedType);

  // const reqTotal = requirement
  //   ? ({ 전공기초: requirement.basic, 전공필수: requirement.required, 전공선택: requirement.elective } as Record<string, number>)[selectedType] ?? 0
  //   : 0;

  const currentCourses = catalog.filter(c => {
    const cType = (c as any).course_type || (c as any).type;
    return cType === selectedType;
  });

  const reqTotal = requirement
    ? ({ 
        전공기초: (requirement as any).basic, 
        전공필수: (requirement as any).required, 
        전공선택: (requirement as any).elective 
      } as Record<string, number>)[selectedType] ?? 0
    : 0;
  
  const completedCredits = currentCourses
    .filter(c => checked.has(c.id))
    .reduce((sum, c) => sum + c.credits, 0);

  // ── 렌더 ─────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "var(--font-roboto), sans-serif", minHeight: "100vh" }}>

      {isCalculating && <LoadingOverlay />}

      {/* 히어로 */}
      <div style={{
        backgroundColor: "#FFF8F7",
        padding: "72px 0 80px",
        marginLeft: "calc(-50vw + 50%)",
        marginTop: "calc(-49.54px)",
        width: "100vw",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
          <h1 style={{ fontSize: "48px", fontWeight: 700, lineHeight: "1.15", color: "#1F1A1A", marginBottom: "20px" }}>
            지금까지의 여정을<br />
            <span style={{ color: "#9A001F" }}>기록해주세요</span>
          </h1>
          <p style={{ fontSize: "15px", color: "#78716C", lineHeight: "1.7", maxWidth: "440px" }}>
            정확한 졸업 사정을 위해 수강하신 강의들을 각 카테고리에 맞춰 입력해<br />
            주세요. khunnect가 당신의 남은 학기를 설계해 드립니다.
          </p>
        </div>
      </div>

      {/* 본문 */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 48px 120px" }}>
        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", minHeight: "560px" }}>

          {/* 왼쪽: 카테고리 패널 */}
          <CategoryPanel selectedType={selectedType} onSelect={setSelectedType} />

          {/* 오른쪽: 과목 그리드 */}
          {catalog.length === 0 ? (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <p style={{ color: "#A8A29E", fontSize: "14px" }}>과목을 불러오는 중...</p>
            </div>
          ) : (
            <CourseGrid
              categoryLabel={category.label}
              courses={currentCourses}
              checked={checked}
              completedCredits={completedCredits}
              reqTotal={reqTotal}
              onToggle={toggleCourse}
            />
          )}

        </div>

        {/* 액션 버튼 */}
        <ActionButtons
          saveStatus={saveStatus}
          onSave={handleSave}
          onCalculate={handleCalculate}
        />
      </div>

    </div>
  );
}
