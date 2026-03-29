"use client";

import { useState, useEffect } from "react";
import { getColleges, getDepartments, getFields, getJobs } from "@/services/roadmap";
import { getSeniors } from "@/services/seniors";
import type { College, Department, Field, Job, Senior } from "@/types";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type StepProps = {
  step: number;
  label: string;
  children: React.ReactNode;
};

function Step({ step, label, children }: StepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-[var(--color-brand)] text-white flex items-center justify-center text-sm font-bold shrink-0">
          {step}
        </div>
        <div className="w-px flex-1 bg-border mt-2" />
      </div>
      <div className="pb-8 flex-1">
        <p className="text-sm font-medium text-muted-foreground mb-3">{label}</p>
        {children}
      </div>
    </div>
  );
}

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

  function SelectGrid<T extends { id: string; name: string }>({
    items,
    selected,
    onSelect,
  }: {
    items: T[];
    selected: string | null;
    onSelect: (id: string) => void;
  }) {
    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
              selected === item.id
                ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)]"
                : "border-border text-foreground hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    );
  }

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
            <div className="flex flex-col gap-3">
              {jobs.map((job) => (
                <div key={job.id} className="border border-border rounded-xl p-4">
                  <p className="font-semibold">{job.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{job.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {job.requiredSkills.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Step>

          {/* 이 분야 선배들 */}
          <Step step={5} label="이 분야 선배들의 수강 데이터">
            {fieldSeniors.length === 0 ? (
              <p className="text-sm text-muted-foreground">등록된 선배가 없습니다.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {fieldSeniors.map((senior) => (
                  <Link
                    key={senior.id}
                    href={`/seniors/${senior.id}`}
                    className="border border-border rounded-xl p-4 hover:border-[var(--color-brand)] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{senior.name}</p>
                        <p className="text-sm text-muted-foreground">{senior.company} · {senior.jobTitle}</p>
                      </div>
                      <Badge variant={senior.isAvailable ? "default" : "secondary"}>
                        {senior.isAvailable ? "커피챗 가능" : "불가"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{senior.bio}</p>
                  </Link>
                ))}
              </div>
            )}
          </Step>
        </>
      )}
    </div>
  );
}
