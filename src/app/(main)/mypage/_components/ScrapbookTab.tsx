"use client";

import Link from "next/link";
import type { Senior } from "@/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type ScrapbookTabProps = {
  scrapedSeniors: Senior[];
};

export default function ScrapbookTab({ scrapedSeniors }: ScrapbookTabProps) {
  return (
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
  );
}
