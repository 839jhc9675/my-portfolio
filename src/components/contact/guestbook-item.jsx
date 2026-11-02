import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import CharacterAvatar from './character-avatar';
import { getAvatarCharacter } from '../../data/avatar-characters';
import { formatRelativeTime } from '../../utils/format-date';

/**
 * GuestbookItem 컴포넌트 - 방명록 한 개 (프로필 캐릭터 + 말풍선)
 *
 * Props:
 * @param {object} entry - 방명록 데이터 (id, message, favorite_color, keyword, emoji, rating, avatar_id, created_at) [Required]
 *
 * Example usage:
 * <GuestbookItem entry={ entry } />
 */
function GuestbookItem({ entry }) {
  const character = getAvatarCharacter(entry.avatar_id);
  const accentColor = entry.favorite_color ?? 'var(--color-accent)';

  return (
    <Box component="li" sx={{ display: 'flex', gap: 1.5, listStyle: 'none' }}>
      <CharacterAvatar avatarId={ entry.avatar_id } size={ 44 } ringColor={ entry.favorite_color ?? undefined } />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        {/* 작성자(캐릭터) 이름 + 시간 */}
        <Box sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: 1, mb: 0.75 }}>
          <Box sx={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-text-primary)' }}>
            익명의 { character.name }
          </Box>
          <Box
            component="time"
            dateTime={ entry.created_at }
            sx={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}
          >
            { formatRelativeTime(entry.created_at) }
          </Box>
        </Box>

        {/* 말풍선 */}
        <Box
          sx={{
            position: 'relative',
            display: 'inline-block',
            maxWidth: '100%',
            px: 2,
            py: 1.5,
            borderRadius: '4px 18px 18px 18px',
            bgcolor: 'var(--color-bg-primary)',
            border: '1px solid var(--color-border-subtle)',
            borderLeft: `4px solid ${accentColor}`,
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
          }}
        >
          <Box
            sx={{
              fontSize: { xs: '0.95rem', sm: '1rem' },
              lineHeight: 1.6,
              color: 'var(--color-text-primary)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            { entry.emoji && <Box component="span" sx={{ mr: 0.75 }}>{ entry.emoji }</Box> }
            { entry.message }
          </Box>

          { (entry.keyword || entry.rating) && (
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              { entry.keyword && (
                <Box
                  component="span"
                  sx={{
                    px: 1.25,
                    py: 0.25,
                    borderRadius: 999,
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--color-accent)',
                    bgcolor: 'color-mix(in srgb, var(--color-accent) 12%, transparent)',
                  }}
                >
                  #{ entry.keyword }
                </Box>
              ) }
              { entry.rating && (
                <Rating
                  value={ entry.rating }
                  readOnly
                  size="small"
                  sx={{ '& .MuiRating-iconFilled': { color: 'var(--color-accent)' } }}
                />
              ) }
            </Box>
          ) }
        </Box>
      </Box>
    </Box>
  );
}

export default GuestbookItem;
