"use client";

import Link from "next/link";
import type { Senior } from "@/types";
import { Badge } from "@/components/ui/badge";

type FieldSeniorsListProps = {
  seniors: Senior[];
};

export default function FieldSeniorsList({ seniors }: FieldSeniorsListProps) {
  if (seniors.length === 0) {
    return <p className="text-sm text-muted-foreground">등록된 선배가 없습니다.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {seniors.map((senior) => (
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
  );
}
