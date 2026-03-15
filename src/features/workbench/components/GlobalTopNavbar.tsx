import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') !== 'light'
    }
    return true
  })

  useEffect(() => {
    const saved = localStorage.getItem('theme-preference')
    const dark = saved !== 'light'
    setIsDark(dark)
    if (!dark) {
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    if (next) {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme-preference', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
      localStorage.setItem('theme-preference', 'light')
    }
  }

  return (
    <Box
      role="button"
      tabIndex={0}
      aria-label="Toggle dark/light mode"
      onClick={toggle}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle()}
      sx={{
        position: 'relative',
        width: 52,
        height: 28,
        borderRadius: 999,
        background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.10)',
        border: '1px solid var(--glass-border)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        cursor: 'pointer',
        flexShrink: 0,
        outline: 'none',
        transition: 'background 0.3s ease, box-shadow 0.2s ease',
        '&:hover': {
          background: 'var(--glass-hover-bg)',
          boxShadow: 'var(--glass-glow)',
        },
        '&:focus-visible': {
          outline: '2px solid var(--accent)',
          outlineOffset: 2,
        },
      }}
    >
      {/* Icon — positioned on the side opposite to the circle */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          ...(isDark ? { right: 7 } : { left: 7 }),
          display: 'flex',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        {isDark ? (
          <LightModeOutlinedIcon sx={{ fontSize: 13, color: '#B0B0B0' }} />
        ) : (
          <DarkModeOutlinedIcon sx={{ fontSize: 13, color: '#555555' }} />
        )}
      </Box>

      {/* Sliding circle indicator */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: 'var(--accent)',
          transform: isDark ? 'translate(4px, -50%)' : 'translate(28px, -50%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none',
        }}
      />
    </Box>
  )
}

export function GlobalTopNavbar() {
  const location = useLocation()
  const navigate = useNavigate()

  const onSessions = location.pathname === '/sessions'
  const onNewSession = location.pathname.startsWith('/sessions/new')

  return (
    <AppBar
      position="sticky"
      color="inherit"
      className="glass-nav"
      sx={{ zIndex: 100 }}
    >
      <Toolbar sx={{ minHeight: 52, px: 3, gap: 2 }}>
        {/* Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--accent)',
              boxShadow: 'var(--glass-glow)',
              fontSize: 14,
              fontWeight: 800,
              color: 'var(--bg-base)',
              letterSpacing: -0.5,
              flexShrink: 0,
            }}
          >
            F
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: 15,
              letterSpacing: 3,
              fontWeight: 700,
              color: 'var(--text-primary)',
            }}
          >
            HLQ
          </Typography>
        </Box>

        {/* Nav pill */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            ml: 3,
            borderRadius: 999,
            px: 0.5,
            py: 0.5,
            backgroundColor: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
          }}
        >
          <Box
            onClick={() => navigate('/sessions')}
            sx={{
              px: 2,
              py: 0.6,
              borderRadius: 999,
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              bgcolor: onSessions ? 'var(--glass-hover-bg)' : 'transparent',
              color: onSessions ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: onSessions
                ? 'inset 0 0 0 1px var(--accent)'
                : 'none',
              transition:
                'background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease',
              '&:hover': {
                bgcolor: 'var(--glass-hover-bg)',
                color: 'var(--text-primary)',
              },
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 12.5 }}>
              Sessions
            </Typography>
          </Box>
          <Box
            onClick={() => navigate('/sessions/new')}
            sx={{
              px: 2,
              py: 0.6,
              borderRadius: 999,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: onNewSession ? 'var(--text-primary)' : 'var(--text-secondary)',
              bgcolor: onNewSession ? 'var(--glass-hover-bg)' : 'transparent',
              boxShadow: onNewSession
                ? 'inset 0 0 0 1px var(--accent)'
                : 'none',
              transition:
                'background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease',
              '&:hover': {
                bgcolor: 'var(--glass-hover-bg)',
                color: 'var(--text-primary)',
              },
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 12.5 }}>
              New Session
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* Right actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {/* Dark/Light mode toggle */}
          <ThemeToggle />

          <IconButton
            size="small"
            sx={{
              color: 'var(--text-secondary)',
              transition:
                'background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease',
              '&:hover': {
                bgcolor: 'var(--glass-hover-bg)',
                color: 'var(--text-primary)',
              },
            }}
          >
            <Badge color="primary" variant="dot" overlap="circular">
              <NotificationsNoneOutlinedIcon sx={{ fontSize: 18 }} />
            </Badge>
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: 'var(--text-secondary)',
              transition:
                'background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease',
              '&:hover': {
                bgcolor: 'var(--glass-hover-bg)',
                color: 'var(--text-primary)',
              },
            }}
          >
            <SettingsOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>

          {/* User chip */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              ml: 0.5,
              px: 1.25,
              py: 0.4,
              borderRadius: 999,
              bgcolor: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              cursor: 'pointer',
              transition:
                'background-color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease',
              '&:hover': {
                borderColor: 'var(--border)',
                bgcolor: 'var(--glass-hover-bg)',
              },
            }}
          >
            <Avatar
              sx={{
                width: 22,
                height: 22,
                backgroundColor: 'var(--accent)',
                fontSize: 11,
                fontWeight: 700,
                color: 'var(--bg-base)',
              }}
            >
              Y
            </Avatar>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, fontSize: 12, color: 'var(--text-primary)' }}
            >
              You
            </Typography>
            <ExpandMoreIcon sx={{ fontSize: 14, color: 'var(--text-secondary)' }} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
