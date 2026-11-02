import { createClient } from '@supabase/supabase-js';

/**
 * Supabase 클라이언트
 * - URL / 키는 .env(로컬) 또는 GitHub Actions Secrets(배포)에서 주입된다.
 * - 공개(publishable/anon) 키만 사용하며, 보안은 RLS + 컬럼 권한으로 처리한다.
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
