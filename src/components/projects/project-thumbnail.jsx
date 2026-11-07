import { useState } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';

/**
 * ProjectThumbnail 컴포넌트 - 4:3 비율 썸네일 (image.thum.io 실시간 캡처)
 * - 로딩 중에는 스켈레톤, 실패 시 브라우저 창 모양의 대체 이미지를 보여준다.
 * - 상단에 브라우저 바를 얹어 "사이트 미리보기" 느낌의 커스텀 디자인을 적용.
 *
 * Props:
 * @param {string} src - 썸네일 이미지 URL [Required]
 * @param {string} title - 대체 텍스트로 쓸 프로젝트 이름 [Required]
 * @param {boolean} isEager - 즉시 로딩 여부 (화면 상단 Featured 용) [Optional, 기본값: false]
 *
 * Example usage:
 * <ProjectThumbnail src={ project.thumbnail_url } title={ project.title } />
 */
function ProjectThumbnail({ src, title, isEager = false }) {
  const [status, setStatus] = useState('loading');

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4 / 3',
        overflow: 'hidden',
        bgcolor: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-divider)',
      }}
    >
      {/* 브라우저 상단 바 */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: '0 0 auto 0',
          zIndex: 1,
          height: 22,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          px: 1.25,
          bgcolor: 'color-mix(in srgb, var(--color-bg-primary) 88%, transparent)',
          backdropFilter: 'blur(4px)',
          borderBottom: '1px solid var(--color-divider)',
        }}
      >
        { ['#FF5F57', '#FEBC2E', '#28C840'].map((color) => (
          <Box key={ color } sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: color }} />
        )) }
      </Box>

      { status === 'loading' && (
        <Skeleton variant="rectangular" animation="wave" sx={{ position: 'absolute', inset: 0, height: '100%' }} />
      ) }

      { status === 'error' ? (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            color: 'var(--color-primary-text)',
            background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-bg-secondary))',
          }}
        >
          <LanguageRoundedIcon sx={{ fontSize: 40 }} />
          <Box sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{ title }</Box>
        </Box>
      ) : (
        <Box
          component="img"
          src={ src }
          alt={ `${title} 사이트 미리보기` }
          loading={ isEager ? 'eager' : 'lazy' }
          decoding="async"
          onLoad={ () => setStatus('loaded') }
          onError={ () => setStatus('error') }
          className="project-thumbnail__image"
          sx={{
            display: 'block',
            width: '100%',
            height: '100%',
            pt: '22px',
            objectFit: 'cover',
            objectPosition: 'top center',
            opacity: status === 'loaded' ? 1 : 0,
            transition: 'opacity 0.3s ease, transform 0.4s ease',
          }}
        />
      ) }
    </Box>
  );
}

export default ProjectThumbnail;
