export type AvatarVariant = {
  bg: string;
  stroke: string;
};

export const AVATAR_VARIANTS: AvatarVariant[] = [
  { bg: "#FCF1F1", stroke: "#9A001F" },
  { bg: "#EFF6FF", stroke: "#1D4ED8" },
  { bg: "#F0FDF4", stroke: "#15803D" },
  { bg: "#FFF7ED", stroke: "#C2410C" },
  { bg: "#F5F3FF", stroke: "#7C3AED" },
  { bg: "#FDF4FF", stroke: "#A21CAF" },
  { bg: "#F0F9FF", stroke: "#0369A1" },
  { bg: "#FEFCE8", stroke: "#A16207" },
];

const STORAGE_KEY = "avatar_variant_idx";

/** ID 문자열을 기반으로 항상 동일한 variant를 반환 */
export function getAvatarVariantForId(id: string): AvatarVariant {
  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_VARIANTS[hash % AVATAR_VARIANTS.length];
}

export function getRandomAvatarIdx(): number {
  return Math.floor(Math.random() * AVATAR_VARIANTS.length);
}

export function saveAvatarIdx(idx: number): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, String(idx));
  }
}

export function loadAvatarVariant(): AvatarVariant {
  if (typeof window === "undefined") return AVATAR_VARIANTS[0];
  const raw = localStorage.getItem(STORAGE_KEY);
  const idx = raw !== null ? parseInt(raw, 10) : 0;
  return AVATAR_VARIANTS[idx] ?? AVATAR_VARIANTS[0];
}
