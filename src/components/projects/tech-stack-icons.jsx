import Box from '@mui/material/Box';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';
import JavascriptRoundedIcon from '@mui/icons-material/JavascriptRounded';
import HtmlRoundedIcon from '@mui/icons-material/HtmlRounded';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';

/** 기술 이름(소문자) → 아이콘 + 대표 색상 */
const TECH_ICON_MAP = {
  react: { Icon: CodeRoundedIcon, color: '#149ECA' },
  supabase: { Icon: BoltRoundedIcon, color: '#3ECF8E' },
  postgresql: { Icon: StorageRoundedIcon, color: '#4169E1' },
  css3: { Icon: PaletteRoundedIcon, color: '#663399' },
  mui: { Icon: WidgetsRoundedIcon, color: '#007FFF' },
  'unsplash api': { Icon: PhotoCameraRoundedIcon, color: '#737373' },
  javascript: { Icon: JavascriptRoundedIcon, color: '#C9A800' },
  html5: { Icon: HtmlRoundedIcon, color: '#E34F26' },
};

const DEFAULT_TECH = { Icon: ExtensionRoundedIcon, color: 'var(--color-text-muted)' };

/**
 * TechStackIcons 컴포넌트 - 기술 스택을 아이콘 + 이름 칩으로 표시
 * (모바일은 툴팁이 불편하므로 아이콘 옆에 이름을 함께 노출)
 *
 * Props:
 * @param {Array<string>} techStack - 기술 이름 배열 [Required]
 * @param {number} max - 최대 표시 개수, 초과분은 +N 으로 표시 [Optional, 기본값: 전체]
 *
 * Example usage:
 * <TechStackIcons techStack={ ['React', 'Supabase'] } max={ 3 } />
 */
function TechStackIcons({ techStack, max = Infinity }) {
  const visible = techStack.slice(0, max);
  const hiddenCount = techStack.length - visible.length;

  return (
    <Box
      component="ul"
      aria-label="기술 스택"
      sx={{ m: 0, p: 0, listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 0.75 }}
    >
      { visible.map((tech) => {
        const { Icon, color } = TECH_ICON_MAP[tech.toLowerCase()] ?? DEFAULT_TECH;
        return (
          <Box
            component="li"
            key={ tech }
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1,
              py: 0.25,
              borderRadius: 999,
              fontSize: '0.78rem',
              fontWeight: 600,
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
              bgcolor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            <Icon sx={{ fontSize: 16, color }} aria-hidden />
            { tech }
          </Box>
        );
      }) }
      { hiddenCount > 0 && (
        <Box
          component="li"
          sx={{
            px: 1,
            py: 0.25,
            fontSize: '0.78rem',
            fontWeight: 600,
            lineHeight: 1.6,
            color: 'var(--color-text-muted)',
          }}
        >
          +{ hiddenCount }
        </Box>
      ) }
    </Box>
  );
}

export default TechStackIcons;
