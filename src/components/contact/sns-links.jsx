import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import CopyButton from '../ui/copy-button';
import { writeClipboard } from '../../utils/clipboard';

const iconMap = {
  github: GitHubIcon,
  instagram: InstagramIcon,
  kakao: ChatBubbleRoundedIcon,
};

/** 사각형 SNS 버튼 공통 스타일 */
const buttonSx = {
  flex: 1,
  minWidth: 0,
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  px: 2,
  py: 1.5,
  borderRadius: 2,
  font: 'inherit',
  fontWeight: 700,
  textAlign: 'left',
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'var(--color-text-primary)',
  bgcolor: 'var(--color-bg-primary)',
  border: '1px solid var(--color-border)',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: 'var(--color-text-primary)',
    borderColor: 'var(--color-accent)',
    bgcolor: 'color-mix(in srgb, var(--color-accent) 8%, var(--color-bg-primary))',
    transform: 'translateY(-2px)',
  },
};

/**
 * SnsLinks 컴포넌트 - 이름이 함께 있는 사각형 SNS 버튼 + 복사 버튼
 * - url이 있으면 새 탭으로 이동, 없으면(카카오톡 ID) 클릭 시 복사 후 안내 메시지 표시
 *
 * Props:
 * @param {Array<{ id: string, name: string, url: string, copyValue: string, guide: string, color: string, background: string }>} links - SNS 목록 [Required]
 *
 * Example usage:
 * <SnsLinks links={ snsLinks } />
 */
function SnsLinks({ links }) {
  const [toastMessage, setToastMessage] = useState('');

  const handleCopyLink = async (link) => {
    try {
      await writeClipboard(link.copyValue);
      setToastMessage(link.guide ?? `${link.name} 정보가 복사되었어요.`);
    } catch {
      setToastMessage('복사에 실패했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <>
      <Grid container spacing={ 1.5 }>
        { links.map((link) => {
          const Icon = iconMap[link.id] ?? ChatBubbleRoundedIcon;
          const linkProps = link.url
            ? { component: 'a', href: link.url, target: '_blank', rel: 'noopener noreferrer' }
            : { component: 'button', type: 'button', onClick: () => handleCopyLink(link) };

          return (
            <Grid key={ link.id } size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box { ...linkProps } aria-label={ `${link.name} 연결` } sx={ buttonSx }>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      flexShrink: 0,
                      display: 'grid',
                      placeItems: 'center',
                      borderRadius: 1.5,
                      color: link.background ? link.color : '#FFFFFF',
                      bgcolor: link.background ?? link.color,
                    }}
                  >
                    <Icon fontSize="small" />
                  </Box>
                  { link.name }
                </Box>
                <CopyButton
                  text={ link.copyValue }
                  label={ link.url ? `${link.name} 링크` : `${link.name} ID` }
                />
              </Box>
            </Grid>
          );
        }) }
      </Grid>

      <Snackbar
        open={ Boolean(toastMessage) }
        autoHideDuration={ 3500 }
        onClose={ () => setToastMessage('') }
        message={ toastMessage }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
}

export default SnsLinks;
