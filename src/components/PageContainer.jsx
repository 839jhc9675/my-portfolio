import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'

// 반응형 중앙 정렬 레이아웃
function PageContainer({ children }) {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, sm: 6 } }}>
      <Stack spacing={{ xs: 3, sm: 4 }} sx={{ alignItems: 'center' }}>
        {children}
      </Stack>
    </Container>
  )
}

export default PageContainer
