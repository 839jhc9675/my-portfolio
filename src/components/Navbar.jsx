import { NavLink } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About Me', to: '/about' },
  { label: 'Projects', to: '/projects' },
]

function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
        borderBottom: '1px solid var(--color-divider)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 1, sm: 0 },
            py: { xs: 1.5, sm: 0 },
          }}
        >
          <Typography
            component={NavLink}
            to="/"
            variant="h6"
            sx={{
              fontWeight: 800,
              color: 'var(--color-primary)',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
            }}
          >
            My Portfolio
          </Typography>

          <Box component="nav" sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 } }}>
            {navItems.map((item) => (
              <Box
                key={item.to}
                component={NavLink}
                to={item.to}
                end={item.to === '/'}
                sx={{
                  px: { xs: 1.5, sm: 2 },
                  py: 1,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  textDecoration: 'none',
                  color: 'var(--color-text-secondary)',
                  borderBottom: '3px solid transparent',
                  transition: 'background-color 0.2s, color 0.2s',
                  '&:hover': {
                    bgcolor: 'var(--color-hover-layer)',
                    color: 'var(--color-text-primary)',
                  },
                  // 현재 탭: 그린 텍스트 + 그린 밑줄
                  '&.active': {
                    color: 'var(--color-primary-text)',
                    borderBottomColor: 'var(--color-primary)',
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                }}
              >
                {item.label}
              </Box>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
