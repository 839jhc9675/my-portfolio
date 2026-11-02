import Box from '@mui/material/Box';
import { getAvatarCharacter } from '../../data/avatar-characters';

/**
 * CharacterAvatar 컴포넌트 - 방명록 작성자의 랜덤 캐릭터 프로필 사진
 *
 * Props:
 * @param {number} avatarId - 캐릭터 인덱스 [Required]
 * @param {number} size - 지름(px) [Optional, 기본값: 48]
 * @param {string} ringColor - 테두리 색 (좋아하는 색깔) [Optional]
 *
 * Example usage:
 * <CharacterAvatar avatarId={ 3 } size={ 56 } ringColor="#3283FD" />
 */
function CharacterAvatar({ avatarId, size = 48, ringColor }) {
  const character = getAvatarCharacter(avatarId);

  return (
    <Box
      role="img"
      aria-label={ `${character.name} 캐릭터` }
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        display: 'grid',
        placeItems: 'center',
        borderRadius: '50%',
        bgcolor: character.background,
        fontSize: size * 0.55,
        lineHeight: 1,
        userSelect: 'none',
        boxShadow: ringColor
          ? `0 0 0 3px var(--color-bg-primary), 0 0 0 5px ${ringColor}`
          : '0 0 0 1px var(--color-border-subtle)',
      }}
    >
      { character.emoji }
    </Box>
  );
}

export default CharacterAvatar;
