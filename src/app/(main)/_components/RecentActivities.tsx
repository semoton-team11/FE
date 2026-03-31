"use client";

import { RECENT_ACTIVITIES } from "../_lib/constants";

export default function RecentActivities() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">최근 활동</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {RECENT_ACTIVITIES.map((item) => (
          <div
            key={item.label}
            className="border border-border rounded-xl p-5 flex flex-col gap-3 bg-white"
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: item.bg }}
            >
              {item.icon}
            </div>
            <div>
              <p className="font-medium text-sm">{item.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
