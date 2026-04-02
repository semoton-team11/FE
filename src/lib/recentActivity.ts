export type RecentActivity = {
  id: string;
  label: string;
  sub: string;
  href: string;
  type: "senior" | "roadmap" | "curriculum" | "messages" | "mypage" | "calendar";
  timestamp: number;
};

const STORAGE_KEY = "semotone_recent_activities";
const MAX_ITEMS = 6;

export function addRecentActivity(activity: Omit<RecentActivity, "timestamp">) {
  if (typeof window === "undefined") return;
  const existing = getRecentActivities();
  // 같은 href는 제거 후 최신으로 추가
  const filtered = existing.filter((a) => a.href !== activity.href);
  const updated = [
    { ...activity, timestamp: Date.now() },
    ...filtered,
  ].slice(0, MAX_ITEMS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getRecentActivities(): RecentActivity[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function formatTimeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return "방금 전";
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  return `${days}일 전`;
}
