import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import SectionCard from '../components/SectionCard';
import FeaturedProjectCard from '../components/projects/featured-project-card';
import ProjectCard from '../components/projects/project-card';
import ProjectCardSkeleton from '../components/projects/project-card-skeleton';
import ProjectDetailDialog from '../components/projects/project-detail-dialog';
import useProjects from '../hooks/use-projects';

/** 그리드 반응형: 모바일 1열 / 태블릿 2열 / 데스크톱 3열 */
const GRID_SIZE = { xs: 12, sm: 6, md: 4 };

/** 하단 그리드 소제목 스타일 */
const gridTitleSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  mt: 0,
  mb: 2,
  fontSize: { xs: '1.1rem', md: '1.25rem' },
  fontWeight: 800,
  color: 'var(--color-text-primary)',
  '&::before': {
    content: '""',
    width: 4,
    height: '1.1em',
    borderRadius: 2,
    bgcolor: 'var(--color-accent)',
  },
};

/**
 * Projects 페이지 - 혼합형 레이아웃 (상단 Featured + 하단 Grid)
 * - 데이터: Supabase projects 테이블 (sort_order 순, 첫 번째가 Featured)
 */
function Projects() {
  const { projects, isLoading, error } = useProjects();
  const [selectedProject, setSelectedProject] = useState(null);

  const [featured, ...others] = projects;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, md: 3 } }}>
      <Stack spacing={{ xs: 3, sm: 4 }}>
        <SectionCard
          label="PROJECTS"
          title="Projects"
          description="직접 기획하고 개발해 배포한 프로젝트들입니다. Live Demo 로 실제 사이트를 바로 체험해보세요."
          highlight
        />

        { isLoading && (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            { [0, 1, 2].map((key) => (
              <Grid key={ key } size={ GRID_SIZE }>
                <ProjectCardSkeleton />
              </Grid>
            )) }
          </Grid>
        ) }

        { !isLoading && error && <Alert severity="warning">{ error }</Alert> }

        { !isLoading && !error && projects.length === 0 && (
          <Box sx={{ py: 6, textAlign: 'center', color: 'var(--color-text-muted)' }}>
            <Box sx={{ fontSize: '2.5rem', mb: 1 }}>🛠️</Box>
            아직 공개된 프로젝트가 없어요. 곧 업데이트될 예정입니다!
          </Box>
        ) }

        { featured && (
          <FeaturedProjectCard
            project={ featured }
            onViewDetails={ () => setSelectedProject(featured) }
          />
        ) }

        { others.length > 0 && (
          <Box component="section" aria-labelledby="more-projects-title">
            <Box component="h2" id="more-projects-title" sx={ gridTitleSx }>
              More Projects
            </Box>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              { others.map((project) => (
                <Grid key={ project.id } size={ GRID_SIZE }>
                  <ProjectCard
                    project={ project }
                    onViewDetails={ () => setSelectedProject(project) }
                  />
                </Grid>
              )) }
            </Grid>
          </Box>
        ) }
      </Stack>

      <ProjectDetailDialog project={ selectedProject } onClose={ () => setSelectedProject(null) } />
    </Container>
  );
}

export default Projects;
