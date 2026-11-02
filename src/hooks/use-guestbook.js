import { useCallback, useEffect, useState } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

const PAGE_SIZE = 10;
const NOT_CONFIGURED_MESSAGE = '방명록 데이터베이스가 연결되지 않았습니다.';

/** 공개 컬럼만 조회 (이름·이메일·전화·인스타는 DB 권한상 조회 불가) */
const PUBLIC_COLUMNS = 'id, message, favorite_color, keyword, emoji, rating, avatar_id, created_at';

/**
 * 방명록 목록 조회 / 작성 훅
 * @returns {{
 *   entries: Array, isLoading: boolean, isLoadingMore: boolean, hasMore: boolean,
 *   error: string, loadMore: function, addEntry: function
 * }}
 */
function useGuestbook() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(isSupabaseConfigured ? '' : NOT_CONFIGURED_MESSAGE);

  /** from 위치부터 한 페이지를 최신순으로 가져온다 */
  const fetchPage = useCallback(async (from) => {
    const { data, error: fetchError } = await supabase
      .from('guestbook')
      .select(PUBLIC_COLUMNS)
      .order('created_at', { ascending: false })
      .range(from, from + PAGE_SIZE - 1);

    if (fetchError) throw fetchError;
    return data;
  }, []);

  /** 첫 페이지 새로 불러오기 */
  const refresh = useCallback(async () => {
    try {
      const data = await fetchPage(0);
      setEntries(data);
      setHasMore(data.length === PAGE_SIZE);
      setError('');
    } catch {
      setError('방명록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }, [fetchPage]);

  /** 최초 마운트 시 첫 페이지 조회 (언마운트 후 도착한 응답은 무시) */
  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;
    let isActive = true;
    fetchPage(0)
      .then((data) => {
        if (!isActive) return;
        setEntries(data);
        setHasMore(data.length === PAGE_SIZE);
      })
      .catch(() => {
        if (isActive) setError('방명록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });
    return () => {
      isActive = false;
    };
  }, [fetchPage]);

  /** 다음 페이지 이어서 불러오기 */
  const loadMore = useCallback(async () => {
    setIsLoadingMore(true);
    try {
      const data = await fetchPage(entries.length);
      setEntries((prev) => [...prev, ...data]);
      setHasMore(data.length === PAGE_SIZE);
    } catch {
      setError('방명록을 더 불러오지 못했습니다.');
    } finally {
      setIsLoadingMore(false);
    }
  }, [entries.length, fetchPage]);

  /**
   * 방명록 작성
   * @param {object} entry - DB 컬럼명과 동일한 키를 가진 객체
   * @returns {Promise<void>} 실패 시 에러를 throw
   */
  const addEntry = useCallback(async (entry) => {
    if (!isSupabaseConfigured) {
      throw new Error(NOT_CONFIGURED_MESSAGE);
    }
    const { error: insertError } = await supabase.from('guestbook').insert(entry);
    if (insertError) throw insertError;
    await refresh();
  }, [refresh]);

  return { entries, isLoading, isLoadingMore, hasMore, error, loadMore, addEntry };
}

export default useGuestbook;
