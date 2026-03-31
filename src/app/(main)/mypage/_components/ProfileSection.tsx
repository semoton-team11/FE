"use client";

import type { User } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type ProfileSectionProps = {
  user: User;
  interestedFieldNames: string[];
};

export default function ProfileSection({ user, interestedFieldNames }: ProfileSectionProps) {
  return (
    <section className="border border-border rounded-xl p-6 flex items-start gap-5">
      <Avatar className="w-16 h-16">
        <AvatarFallback className="text-xl font-bold bg-muted">
          {user.name[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h2 className="font-bold text-lg">{user.name}</h2>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {interestedFieldNames.map((name) => (
            <Badge key={name} variant="secondary">{name}</Badge>
          ))}
          {interestedFieldNames.length === 0 && (
            <span className="text-sm text-muted-foreground">관심 직무를 선택해보세요.</span>
          )}
        </div>
        {/* TODO: 관심 직무 수정 기능 — 디자이너 확인 후 UI 구현 */}
      </div>
    </section>
  );
}
