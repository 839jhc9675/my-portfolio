/**
 * 클립보드에 텍스트를 쓴다. (Clipboard API 미지원 브라우저는 textarea 방식으로 대체)
 * @param {string} text - 복사할 텍스트
 * @returns {Promise<void>}
 */
export async function writeClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}
