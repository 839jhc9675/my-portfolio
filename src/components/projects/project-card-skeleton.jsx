import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';

/**
 * ProjectCardSkeleton 컴포넌트 - 프로젝트 카드 로딩 자리표시
 *
 * Example usage:
 * <ProjectCardSkeleton />
 */
function ProjectCardSkeleton() {
  return (
    <Card sx={{ width: '100%', borderRadius: 4, overflow: 'hidden' }} aria-hidden>
      <Skeleton variant="rectangular" sx={{ width: '100%', height: 'auto', aspectRatio: '4 / 3' }} />
      <Box sx={{ p: { xs: 2.5, md: 3 } }}>
        <Skeleton width="60%" height={ 32 } />
        <Skeleton width="90%" />
        <Box sx={{ display: 'flex', gap: 1, my: 1.5 }}>
          <Skeleton variant="rounded" width={ 70 } height={ 24 } sx={{ borderRadius: 999 }} />
          <Skeleton variant="rounded" width={ 80 } height={ 24 } sx={{ borderRadius: 999 }} />
        </Box>
        <Skeleton variant="rounded" height={ 44 } sx={{ borderRadius: 999 }} />
      </Box>
    </Card>
  );
}

export default ProjectCardSkeleton;
