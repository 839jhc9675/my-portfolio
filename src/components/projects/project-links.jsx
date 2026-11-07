import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { getGithubRepoUrl } from '../../utils/github-repo-url';

/**
 * 모든 버튼 공통: 모바일 터치 영역 44px 이상 + 눌림 피드백
 * - 모바일(또는 isStretched)에서는 남는 폭을 채우며 자연스럽게 줄바꿈
 * @param {boolean} isStretched - 모든 화면에서 폭 채우기 여부
 * @returns {object} sx 객체
 */
const getButtonSx = (isStretched) => ({
  minHeight: 44,
  borderRadius: 999,
  px: 2,
  flex: isStretched ? '1 1 auto' : { xs: '1 1 auto', sm: '0 0 auto' },
  whiteSpace: 'nowrap',
  transition: 'transform 0.15s ease, background-color 0.2s ease',
  '&:active': { transform: 'scale(0.97)' },
});

/**
 * ProjectLinks 컴포넌트 - Live Demo / GitHub / View Details 버튼 묶음
 *
 * Props:
 * @param {string} detailUrl - 배포된 사이트 URL [Required]
 * @param {string} title - 접근성 라벨용 프로젝트 이름 [Required]
 * @param {function} onViewDetails - View Details 클릭 시 실행 (없으면 버튼 숨김) [Optional]
 * @param {boolean} isStretched - 버튼이 항상 가로 폭을 채울지 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <ProjectLinks detailUrl={ url } title="헬스메이트" onViewDetails={ handleOpen } />
 */
function ProjectLinks({ detailUrl, title, onViewDetails, isStretched = false }) {
  const githubUrl = getGithubRepoUrl(detailUrl);
  const buttonSx = getButtonSx(isStretched);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      <Button
        variant="contained"
        href={ detailUrl }
        target="_blank"
        rel="noopener noreferrer"
        startIcon={ <LaunchRoundedIcon /> }
        aria-label={ `${title} Live Demo 새 창으로 열기` }
        sx={ buttonSx }
      >
        Live Demo
      </Button>

      { githubUrl && (
        <Button
          variant="outlined"
          href={ githubUrl }
          target="_blank"
          rel="noopener noreferrer"
          startIcon={ <GitHubIcon /> }
          aria-label={ `${title} GitHub 저장소 새 창으로 열기` }
          sx={{
            ...buttonSx,
            color: 'var(--color-text-primary)',
            borderColor: 'var(--color-border)',
            '&:hover': { bgcolor: 'var(--color-hover-layer)', borderColor: 'var(--color-text-muted)' },
          }}
        >
          GitHub
        </Button>
      ) }

      { onViewDetails && (
        <Button
          variant="text"
          onClick={ onViewDetails }
          startIcon={ <InfoOutlinedIcon /> }
          sx={{
            ...buttonSx,
            color: 'var(--color-accent)',
            '&:hover': { bgcolor: 'color-mix(in srgb, var(--color-accent) 8%, transparent)' },
          }}
        >
          View Details
        </Button>
      ) }
    </Box>
  );
}

export default ProjectLinks;
