import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import CopyButton from '../ui/copy-button';

const iconMap = {
  github: GitHubIcon,
  instagram: InstagramIcon,
  facebook: FacebookRoundedIcon,
  kakao: ChatBubbleRoundedIcon,
};

/**
 * SnsLinks 컴포넌트 - 이름이 함께 있는 사각형 SNS 버튼 + 링크 복사 버튼
 *
 * Props:
 * @param {Array<{ id: string, name: string, url: string, color: string, background: string }>} links - SNS 목록 [Required]
 *
 * Example usage:
 * <SnsLinks links={ snsLinks } />
 */
function SnsLinks({ links }) {
  return (
    <Grid container spacing={ 1.5 }>
      { links.map((link) => {
        const Icon = iconMap[link.id] ?? ChatBubbleRoundedIcon;
        return (
          <Grid key={ link.id } size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                component="a"
                href={ link.url }
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 700,
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
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
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
              <CopyButton text={ link.url } label={ `${link.name} 링크` } />
            </Box>
          </Grid>
        );
      }) }
    </Grid>
  );
}

export default SnsLinks;
