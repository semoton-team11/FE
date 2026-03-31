"use client";

import { useState, useEffect } from "react";
import { getColleges, getDepartments, getFields, getJobs } from "@/services/roadmap";
import { getSeniors } from "@/services/seniors";
import type { College, Department, Field, Job, Senior } from "@/types";
import Step from "./_components/Step";
import SelectGrid from "./_components/SelectGrid";
import JobsList from "./_components/JobsList";
import FieldSeniorsList from "./_components/FieldSeniorsList";

export default function RoadmapPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [fieldSeniors, setFieldSeniors] = useState<Senior[]>([]);

  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedField, setSelectedField] = useState<string | null>(null);

  useEffect(() => {
    getColleges().then(setColleges);
  }, []);

  useEffect(() => {
    if (!selectedCollege) return;
    setSelectedDept(null);
    setSelectedField(null);
    getDepartments(selectedCollege).then(setDepartments);
  }, [selectedCollege]);

  useEffect(() => {
    if (!selectedDept) return;
    setSelectedField(null);
    getFields(selectedDept).then(setFields);
  }, [selectedDept]);

  useEffect(() => {
    if (!selectedField) return;
    Promise.all([
      getJobs(selectedField),
      getSeniors({ fieldId: selectedField }),
    ]).then(([j, s]) => {
      setJobs(j);
      setFieldSeniors(s);
    });
  }, [selectedField]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">커리어 로드맵</h1>

      <Step step={1} label="단과대학 선택">
        <SelectGrid items={colleges} selected={selectedCollege} onSelect={setSelectedCollege} />
      </Step>

      {selectedCollege && (
        <Step step={2} label="학과 선택">
          <SelectGrid items={departments} selected={selectedDept} onSelect={setSelectedDept} />
        </Step>
      )}

      {selectedDept && (
        <Step step={3} label="세부 분야 선택">
          {fields.length === 0 ? (
            <p className="text-sm text-muted-foreground">해당 학과에 등록된 세부 분야가 없습니다.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {fields.map((field) => (
                <button
                  key={field.id}
                  onClick={() => setSelectedField(field.id)}
                  className={`text-left border rounded-xl p-4 transition-all ${
                    selectedField === field.id
                      ? "border-[var(--color-brand)] bg-[var(--color-brand-light)]"
                      : "border-border hover:border-[var(--color-brand)]"
                  }`}
                >
                  <p className="font-semibold">{field.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{field.description}</p>
                </button>
              ))}
            </div>
          )}
        </Step>
      )}

      {selectedField && (
        <>
          {/* 직무 */}
          <Step step={4} label="관련 직무">
            <JobsList jobs={jobs} />
          </Step>

          {/* 이 분야 선배들 */}
          <Step step={5} label="이 분야 선배들의 수강 데이터">
            <FieldSeniorsList seniors={fieldSeniors} />
          </Step>
        </>
      )}
    </div>
  );
}
