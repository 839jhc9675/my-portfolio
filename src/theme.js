import { createTheme } from '@mui/material/styles'

// MUI 컴포넌트용 테마
// 색상 값은 src/styles/colors.css(디자인 시스템)와 동일하게 유지하고,
// 컴포넌트 스타일은 CSS 변수를 직접 참조해 다크 모드에서도 자동으로 바뀌게 한다.
const theme = createTheme({
  palette: {
    primary: {
      main: '#03C75A',
      light: '#E6F9EE',
      dark: '#03A94D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#406CDC',
    },
    info: {
      main: '#3283FD',
    },
    error: {
      main: '#F4361E',
    },
    success: {
      main: '#03A94D',
    },
  },
  typography: {
    fontFamily:
      "'Pretendard', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: 'var(--color-button-primary)',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: 'var(--color-button-hover)',
            boxShadow: 'none',
          },
          '&:active': {
            backgroundColor: 'var(--color-button-active)',
          },
        },
        outlinedPrimary: {
          color: 'var(--color-primary-text)',
          borderColor: 'var(--color-primary)',
          '&:hover': {
            backgroundColor: 'var(--color-primary-light)',
            borderColor: 'var(--color-primary-dark)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--color-bg-primary)',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border-subtle)',
          boxShadow: 'none',
          transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        },
      },
    },
  },
})

export default theme
