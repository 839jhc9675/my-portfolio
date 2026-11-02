import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

/**
 * 클립보드에 텍스트를 쓴다. (Clipboard API 미지원 브라우저는 textarea 방식으로 대체)
 * @param {string} text
 */
async function writeClipboard(text) {
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

/**
 * CopyButton 컴포넌트 - 클릭하면 텍스트를 복사하고 체크 아이콘으로 피드백
 *
 * Props:
 * @param {string} text - 복사할 텍스트 [Required]
 * @param {string} label - 스크린리더/툴팁용 대상 이름 [Optional, 기본값: '내용']
 *
 * Example usage:
 * <CopyButton text="hello@example.com" label="이메일" />
 */
function CopyButton({ text, label = '내용' }) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return undefined;
    const timer = setTimeout(() => setIsCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [isCopied]);

  const handleCopy = async () => {
    try {
      await writeClipboard(text);
      setIsCopied(true);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <Tooltip title={ isCopied ? '복사됨!' : `${label} 복사` } arrow>
      <IconButton
        onClick={ handleCopy }
        aria-label={ `${label} 복사` }
        size="small"
        sx={{
          flexShrink: 0,
          borderRadius: 2,
          border: '1px solid var(--color-border-subtle)',
          color: isCopied ? 'var(--color-success)' : 'var(--color-accent)',
          bgcolor: 'var(--color-bg-primary)',
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
            borderColor: 'var(--color-accent)',
          },
        }}
      >
        { isCopied
          ? <CheckRoundedIcon fontSize="small" />
          : <ContentCopyRoundedIcon fontSize="small" /> }
      </IconButton>
    </Tooltip>
  );
}

export default CopyButton;
