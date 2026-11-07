import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ProjectThumbnail from './project-thumbnail';
import TechStackIcons from './tech-stack-icons';
import ProjectLinks from './project-links';

/** 상세 정보 라벨 스타일 */
const infoLabelSx = {
  mb: 1,
  fontSize: '0.8rem',
  fontWeight: 800,
  letterSpacing: '0.04em',
  color: 'var(--color-text-muted)',
};

/**
 * ISO 날짜를 'YYYY.MM.DD' 로 변환
 * @param {string} isoString - ISO 날짜 문자열
 * @returns {string}
 */
const formatDate = (isoString) => {
  const date = new Date(isoString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}.${month}.${day}`;
};

/**
 * ProjectDetailDialog 컴포넌트 - View Details 클릭 시 프로젝트 상세 보기
 * (모바일에서는 전체 화면으로 열어 읽기 편하게)
 *
 * Props:
 * @param {object|null} project - 표시할 프로젝트, null 이면 닫힘 [Required]
 * @param {function} onClose - 닫기 시 실행 [Required]
 *
 * Example usage:
 * <ProjectDetailDialog project={ selected } onClose={ () => setSelected(null) } />
 */
function ProjectDetailDialog({ project, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={ Boolean(project) }
      onClose={ onClose }
      fullScreen={ isMobile }
      fullWidth
      maxWidth="sm"
      aria-labelledby="project-detail-title"
      slotProps={{
        paper: {
          sx: {
            bgcolor: 'var(--color-bg-primary)',
            color: 'var(--color-text-primary)',
            borderRadius: { xs: 0, sm: 4 },
            backgroundImage: 'none',
          },
        },
      }}
    >
      { project && (
        <>
          <DialogTitle
            id="project-detail-title"
            sx={{ pr: 7, fontWeight: 800, fontSize: { xs: '1.25rem', md: '1.4rem' }, wordBreak: 'keep-all' }}
          >
            { project.title }
            <IconButton
              onClick={ onClose }
              aria-label="닫기"
              sx={{ position: 'absolute', top: 10, right: 10, color: 'var(--color-text-muted)' }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 4 }}>
            <Box sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid var(--color-border-subtle)' }}>
              <ProjectThumbnail src={ project.thumbnail_url } title={ project.title } isEager />
            </Box>

            <Box sx={{ lineHeight: 1.6, color: 'var(--color-text-secondary)', wordBreak: 'keep-all' }}>
              { project.description }
            </Box>

            <Box>
              <Box sx={ infoLabelSx }>TECH STACK</Box>
              <TechStackIcons techStack={ project.tech_stack } />
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2, sm: 4 } }}>
              <Box>
                <Box sx={ infoLabelSx }>등록일</Box>
                <Box sx={{ fontWeight: 600 }}>{ formatDate(project.created_at) }</Box>
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Box sx={ infoLabelSx }>사이트 주소</Box>
                <Box
                  component="a"
                  href={ project.detail_url }
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ fontWeight: 600, wordBreak: 'break-all' }}
                >
                  { project.detail_url }
                </Box>
              </Box>
            </Box>

            <ProjectLinks detailUrl={ project.detail_url } title={ project.title } />
          </DialogContent>
        </>
      ) }
    </Dialog>
  );
}

export default ProjectDetailDialog;
