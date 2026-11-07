import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import ProjectThumbnail from './project-thumbnail';
import TechStackIcons from './tech-stack-icons';
import ProjectLinks from './project-links';
import { projectCardSx, projectDescriptionSx, projectTitleSx } from './project-card-styles';

/**
 * ProjectCard 컴포넌트 - 하단 그리드용 프로젝트 썸네일 카드
 *
 * Props:
 * @param {object} project - projects 테이블 행 [Required]
 * @param {function} onViewDetails - View Details 클릭 시 실행 [Optional]
 *
 * Example usage:
 * <ProjectCard project={ project } onViewDetails={ () => openDetail(project) } />
 */
function ProjectCard({ project, onViewDetails }) {
  return (
    <Card component="article" sx={ projectCardSx }>
      <ProjectThumbnail src={ project.thumbnail_url } title={ project.title } />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5, p: { xs: 2.5, md: 3 } }}>
        <Typography component="h3" sx={{ ...projectTitleSx, fontSize: { xs: '1.15rem', md: '1.2rem' } }}>
          { project.title }
        </Typography>

        {/* 한 줄 설명: 카드 높이를 맞추기 위해 1줄 말줄임 */}
        <Typography
          title={ project.description }
          sx={{
            ...projectDescriptionSx,
            fontSize: { xs: '0.95rem', md: '0.95rem' },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          { project.description }
        </Typography>

        <TechStackIcons techStack={ project.tech_stack } max={ 4 } />

        <Box sx={{ mt: 'auto', pt: 1 }}>
          <ProjectLinks
            detailUrl={ project.detail_url }
            title={ project.title }
            onViewDetails={ onViewDetails }
            isStretched
          />
        </Box>
      </Box>
    </Card>
  );
}

export default ProjectCard;
