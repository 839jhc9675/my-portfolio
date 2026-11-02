import Box from '@mui/material/Box';
import ContactInfoCard from './contact-info-card';
import GuestbookForm from './guestbook-form';
import GuestbookList from './guestbook-list';
import SnsLinks from './sns-links';
import { contactItems, snsLinks } from '../../data/contact-info';
import useGuestbook from '../../hooks/use-guestbook';

/** 블록 제목 스타일 */
const blockTitleSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  mb: 2,
  fontSize: { xs: '1.05rem', sm: '1.15rem' },
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
 * ContactSection 컴포넌트 - Home의 Contact 섹션 본문
 * 배치: 연락처(이메일/전화) → SNS → 방명록(작성 폼 + 목록)
 *
 * Example usage:
 * <ContactSection />
 */
function ContactSection() {
  const { entries, isLoading, isLoadingMore, hasMore, error, loadMore, addEntry } = useGuestbook();

  return (
    <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: { xs: 4, sm: 5 } }}>
      {/* 연락처 */}
      <Box>
        <Box component="h3" sx={{ ...blockTitleSx, mt: 0 }}>연락처</Box>
        <ContactInfoCard items={ contactItems } />
      </Box>

      {/* SNS */}
      <Box>
        <Box component="h3" sx={{ ...blockTitleSx, mt: 0 }}>SNS</Box>
        <SnsLinks links={ snsLinks } />
      </Box>

      {/* 방명록 */}
      <Box>
        <Box component="h3" sx={{ ...blockTitleSx, mt: 0 }}>
          방명록
          { entries.length > 0 && (
            <Box
              component="span"
              sx={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-accent)' }}
            >
              { entries.length }{ hasMore ? '+' : '' }
            </Box>
          ) }
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <GuestbookForm onSubmit={ addEntry } />
          <GuestbookList
            entries={ entries }
            isLoading={ isLoading }
            isLoadingMore={ isLoadingMore }
            hasMore={ hasMore }
            error={ error }
            onLoadMore={ loadMore }
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ContactSection;
