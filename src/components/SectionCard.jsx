import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// 각 섹션을 구분하는 공통 카드
// - label: 섹션 번호/이름 (그린 뱃지)
// - title: 섹션 제목
// - description: 섹션 역할 설명
// - highlight: true면 그린 테두리로 강조 (Hero 섹션 등)
function SectionCard({ id, label, title, description, highlight = false, children }) {
  return (
    <Card
      id={id}
      component="section"
      sx={{
        width: '100%',
        textAlign: 'center',
        borderTop: highlight
          ? '4px solid var(--color-primary)'
          : '1px solid var(--color-border-subtle)',
        '&:hover': {
          boxShadow: 'var(--shadow-card)',
        },
      }}
    >
      <CardContent sx={{ px: { xs: 3, sm: 6 }, py: { xs: 5, sm: 7 } }}>
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            mb: 2,
            px: 1.5,
            py: 0.5,
            borderRadius: 999,
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            bgcolor: 'var(--color-primary-light)',
            color: 'var(--color-primary-text)',
          }}
        >
          {label}
        </Box>

        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: 2,
            fontSize: { xs: '1.6rem', sm: '2.1rem' },
            color: 'var(--color-text-primary)',
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            maxWidth: 640,
            mx: 'auto',
            fontSize: { xs: '1rem', sm: '1.1rem' },
            lineHeight: 1.8,
            color: 'var(--color-text-secondary)',
            wordBreak: 'keep-all',
          }}
        >
          {description}
        </Typography>

        {children && <Box sx={{ mt: 4 }}>{children}</Box>}
      </CardContent>
    </Card>
  )
}

export default SectionCard
