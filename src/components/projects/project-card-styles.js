/**
 * Projects 카드 공통 스타일
 * - 과하지 않은 인터랙션: 마우스 환경에서만 살짝 떠오름(4px) + 그림자 + 썸네일 미세 확대
 * - 터치 환경에서는 hover 가 고정되는 문제를 막기 위해 @media (hover: hover) 로 한정
 */
export const projectCardSx = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  borderRadius: 4,
  '@media (hover: hover)': {
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: 'var(--shadow-card)',
    },
    '&:hover .project-thumbnail__image': {
      transform: 'scale(1.03)',
    },
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
    '&:hover': { transform: 'none' },
  },
};

/** 카드 제목 */
export const projectTitleSx = {
  m: 0,
  fontWeight: 800,
  lineHeight: 1.3,
  color: 'var(--color-text-primary)',
  wordBreak: 'keep-all',
};

/** 카드 설명 */
export const projectDescriptionSx = {
  m: 0,
  lineHeight: 1.6,
  color: 'var(--color-text-secondary)',
  wordBreak: 'keep-all',
};
