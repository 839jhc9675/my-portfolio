import { useEffect, useState } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

const NOT_CONFIGURED_MESSAGE = '프로젝트 데이터베이스가 연결되지 않았습니다.';
const FETCH_ERROR_MESSAGE = '프로젝트를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.';

const PROJECT_COLUMNS = 'id, title, description, tech_stack, detail_url, thumbnail_url, sort_order, created_at';

/**
 * 공개된 프로젝트 목록 조회 훅 (sort_order 오름차순)
 * - RLS 정책상 is_published = true 인 행만 조회된다.
 * @returns {{ projects: Array, isLoading: boolean, error: string }}
 */
function useProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState(isSupabaseConfigured ? '' : NOT_CONFIGURED_MESSAGE);

  /** 최초 마운트 시 조회 (언마운트 후 도착한 응답은 무시) */
  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;
    let isActive = true;

    supabase
      .from('projects')
      .select(PROJECT_COLUMNS)
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .order('id', { ascending: true })
      .then(({ data, error: fetchError }) => {
        if (!isActive) return;
        if (fetchError) {
          setError(FETCH_ERROR_MESSAGE);
        } else {
          setProjects(data ?? []);
        }
        setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  return { projects, isLoading, error };
}

export default useProjects;
