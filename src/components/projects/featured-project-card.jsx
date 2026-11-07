import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import ProjectThumbnail from './project-thumbnail';
import TechStackIcons from './tech-stack-icons';
import ProjectLinks from './project-links';
import { projectCardSx, projectDescriptionSx, projectTitleSx } from './project-card-styles';

/**
 * FeaturedProjectCard 컴포넌트 - 상단 대표 프로젝트 (모바일: 세로, 데스크톱: 가로 배치)
 *
 * Props:
 * @param {object} project - projects 테이블 행 [Required]
 * @param {function} onViewDetails - View Details 클릭 시 실행 [Optional]
 *
 * Example usage:
 * <FeaturedProjectCard project={ projects[0] } onViewDetails={ () => openDetail(projects[0]) } />
 */
function FeaturedProjectCard({ project, onViewDetails }) {
  return (
    <Card component="article" sx={{ ...projectCardSx, borderTop: '4px solid var(--color-primary)' }}>
      <Grid container sx={{ flex: 1 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <ProjectThumbnail src={ project.thumbnail_url } title={ project.title } isEager />
        </Grid>

        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 2,
            p: { xs: 2.5, md: 4 },
          }}
        >
          <Box
            component="span"
            sx={{
              alignSelf: 'flex-start',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1.25,
              py: 0.25,
              borderRadius: 999,
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.06em',
              bgcolor: 'var(--color-primary-light)',
              color: 'var(--color-primary-text)',
            }}
          >
            <StarRoundedIcon sx={{ fontSize: 16 }} aria-hidden />
            FEATURED
          </Box>

          <Typography component="h2" sx={{ ...projectTitleSx, fontSize: { xs: '1.4rem', md: '1.75rem' } }}>
            { project.title }
          </Typography>

          <Typography sx={{ ...projectDescriptionSx, fontSize: { xs: '0.98rem', md: '1.05rem' } }}>
            { project.description }
          </Typography>

          <TechStackIcons techStack={ project.tech_stack } />

          <Box sx={{ mt: 1 }}>
            <ProjectLinks
              detailUrl={ project.detail_url }
              title={ project.title }
              onViewDetails={ onViewDetails }
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default FeaturedProjectCard;
