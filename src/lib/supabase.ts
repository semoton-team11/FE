import { createClient } from "@supabase/supabase-js";

// ============================================================
// Supabase 클라이언트 초기화
// 백엔드 팀이 프로젝트 세팅 후 .env.local에 값 채워넣기:
//   NEXT_PUBLIC_SUPABASE_URL=...
//   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
// ============================================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
