import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        textAlign: 'center',
        bgcolor: 'var(--color-bg-primary)',
        borderTop: '1px solid var(--color-divider)',
      }}
    >
      <Typography variant="body2" sx={{ color: 'var(--color-text-muted)' }}>
        © {currentYear} My Portfolio. All rights reserved.
      </Typography>
    </Box>
  )
}

export default Footer
