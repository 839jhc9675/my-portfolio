import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import GuestbookItem from './guestbook-item';

/**
 * GuestbookList 컴포넌트 - 방명록 목록 (최신순)
 *
 * Props:
 * @param {Array} entries - 방명록 목록 [Required]
 * @param {boolean} isLoading - 첫 로딩 여부 [Optional, 기본값: false]
 * @param {boolean} isLoadingMore - 더 보기 로딩 여부 [Optional, 기본값: false]
 * @param {boolean} hasMore - 다음 페이지 존재 여부 [Optional, 기본값: false]
 * @param {string} error - 에러 메시지 [Optional]
 * @param {function} onLoadMore - 더 보기 클릭 시 실행 [Optional]
 *
 * Example usage:
 * <GuestbookList entries={ entries } hasMore onLoadMore={ loadMore } />
 */
function GuestbookList({
  entries,
  isLoading = false,
  isLoadingMore = false,
  hasMore = false,
  error,
  onLoadMore,
}) {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        { [0, 1, 2].map((key) => (
          <Box key={ key } sx={{ display: 'flex', gap: 1.5 }}>
            <Skeleton variant="circular" width={ 44 } height={ 44 } />
            <Box sx={{ flex: 1 }}>
              <Skeleton width="30%" />
              <Skeleton variant="rounded" height={ 56 } sx={{ borderRadius: 3 }} />
            </Box>
          </Box>
        )) }
      </Box>
    );
  }

  if (error && entries.length === 0) {
    return <Alert severity="warning">{ error }</Alert>;
  }

  if (entries.length === 0) {
    return (
      <Box sx={{ py: 5, textAlign: 'center', color: 'var(--color-text-muted)' }}>
        <Box sx={{ fontSize: '2.5rem', mb: 1 }}>📝</Box>
        아직 방명록이 없어요. 첫 번째 방명록을 남겨주세요!
      </Box>
    );
  }

  return (
    <Box>
      <Box
        component="ul"
        sx={{ m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 2.5 }}
      >
        { entries.map((entry) => (
          <GuestbookItem key={ entry.id } entry={ entry } />
        )) }
      </Box>

      { hasMore && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button
            variant="outlined"
            onClick={ onLoadMore }
            disabled={ isLoadingMore }
            startIcon={ isLoadingMore ? <CircularProgress size={ 16 } color="inherit" /> : null }
            sx={{
              borderRadius: 999,
              px: 3,
              color: 'var(--color-accent)',
              borderColor: 'var(--color-accent)',
              '&:hover': {
                borderColor: 'var(--color-accent)',
                bgcolor: 'color-mix(in srgb, var(--color-accent) 8%, transparent)',
              },
            }}
          >
            방명록 더 보기
          </Button>
        </Box>
      ) }
    </Box>
  );
}

export default GuestbookList;
