/**
 * 날짜를 '방금 전', '5분 전', '3일 전' 같은 상대 시간으로 변환한다.
 * 7일이 지나면 'YYYY.MM.DD' 형식으로 표시한다.
 * @param {string} isoString - ISO 형식 날짜 문자열
 * @returns {string}
 */
export function formatRelativeTime(isoString) {
  const date = new Date(isoString);
  const diffSeconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (diffSeconds < 60) return '방금 전';
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}분 전`;
  if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}시간 전`;
  if (diffSeconds < 604800) return `${Math.floor(diffSeconds / 86400)}일 전`;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}
