"use client";

import React from "react";

type StepProps = {
  step: number;
  label: string;
  children: React.ReactNode;
};

export default function Step({ step, label, children }: StepProps) {
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
