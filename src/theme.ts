import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1C1C1C',
    },
    primary: {
      main: '#888888',
    },
    secondary: {
      main: '#AAAAAA',
    },
    divider: '#444444',
    text: {
      primary: '#E0E0E0',
      secondary: '#B0B0B0',
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'].join(','),
    fontSize: 14,
    h5: {
      fontSize: 26,
      fontWeight: 700,
      letterSpacing: 0.3,
    },
    h6: {
      fontSize: 19,
      fontWeight: 600,
      letterSpacing: 1.2,
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 600,
    },
    body2: {
      fontSize: 14,
    },
    caption: {
      fontSize: 12,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: 0.2,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeArg) => ({
        ':root': {
          /* Layout tokens */
          '--fare-radius-sm': '10px',
          '--fare-radius-md': '14px',
          '--fare-radius-lg': '20px',
          '--fare-radius-pill': '999px',

          /* Dark mode color tokens (default) */
          '--bg-base': '#121212',
          '--bg-surface': '#1C1C1C',
          '--bg-elevated': '#242424',
          '--text-primary': '#E0E0E0',
          '--text-secondary': '#B0B0B0',
          '--border': '#444444',
          '--accent': '#888888',
          '--accent-hover': '#AAAAAA',

          /* Glass layer tokens — dark monochromatic */
          '--glass-bg': 'rgba(255, 255, 255, 0.04)',
          '--glass-border': 'rgba(255, 255, 255, 0.09)',
          '--glass-blur': 'blur(24px) saturate(160%)',
          '--glass-shadow': '0 8px 32px rgba(0, 0, 0, 0.6)',
          '--glass-hover-bg': 'rgba(255, 255, 255, 0.08)',
          '--glass-glow': '0 0 20px rgba(136, 136, 136, 0.15)',

          /* Background gradient — barely perceptible blue-gray shift */
          '--bg-gradient':
            'linear-gradient(135deg, #121212 0%, #181820 50%, #121218 100%)',

          /* Smooth transitions on theme switch */
          transition:
            'background-color 0.3s ease, color 0.2s ease, border-color 0.2s ease',
        },

        /* Light mode overrides — applied when <html data-theme="light"> */
        'html[data-theme="light"]': {
          '--bg-base': '#F5F5F5',
          '--bg-surface': '#FFFFFF',
          '--bg-elevated': '#EBEBEB',
          '--text-primary': '#1A1A1A',
          '--text-secondary': '#555555',
          '--border': '#CCCCCC',
          '--accent': '#555555',
          '--accent-hover': '#222222',

          '--glass-bg': 'rgba(255, 255, 255, 0.55)',
          '--glass-border': 'rgba(0, 0, 0, 0.08)',
          '--glass-blur': 'blur(20px) saturate(180%)',
          '--glass-shadow': '0 4px 24px rgba(0, 0, 0, 0.10)',
          '--glass-hover-bg': 'rgba(255, 255, 255, 0.75)',
          '--glass-glow': '0 0 16px rgba(0, 0, 0, 0.08)',

          '--bg-gradient':
            'linear-gradient(135deg, #F5F5F5 0%, #EBEBEB 50%, #F5F5F5 100%)',
        },

        'body.workbench-no-scroll': {
          overflowY: 'hidden',
        },

        body: {
          margin: 0,
          minHeight: '100vh',
          backgroundColor: 'var(--bg-base)',
          backgroundImage: 'var(--bg-gradient)',
          color: 'var(--text-primary)',
          fontFamily: themeArg.typography.fontFamily,
          WebkitFontSmoothing: 'antialiased',
          backgroundAttachment: 'fixed',
          position: 'relative',
          overflowX: 'hidden',
          transition: 'background-color 0.3s ease, color 0.2s ease',
        },

        /* Subtle noise texture — monochromatic, very low opacity */
        'body::before': {
          content: '""',
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 160 160\\" width=\\"160\\" height=\\"160\\"%3E%3Cfilter id=\\"n\\" x=\\"0\\" y=\\"0\\" width=\\"1\\" height=\\"1\\"%3E%3CfeTurbulence type=\\"fractalNoise\\" baseFrequency=\\"1.2\\" numOctaves=\\"3\\" stitchTiles=\\"noStitch\\"/%3E%3C/filter%3E%3Crect width=\\"100%\\" height=\\"100%\\" filter=\\"url(%23n)\\" opacity=\\"0.45\\"/%3E%3C/svg%3E")',
          opacity: 0.04,
          mixBlendMode: 'soft-light',
          zIndex: -1,
        },

        'body::after': {
          content: 'none',
        },

        '.glass-surface': {
          backgroundColor: 'var(--glass-bg)',
          borderRadius: 'var(--fare-radius-lg)',
          border: '1px solid var(--glass-border)',
          boxShadow:
            'inset 1px 1px 0 rgba(255,255,255,0.06), var(--glass-shadow)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          transition:
            'background-color 0.3s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        },

        '.glass-card': {
          backgroundColor: 'var(--glass-bg)',
          borderRadius: 'var(--fare-radius-md)',
          border: '1px solid var(--glass-border)',
          boxShadow:
            'inset 1px 1px 0 rgba(255,255,255,0.06), var(--glass-shadow)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          transition: 'background-color 0.3s ease, border-color 0.2s ease',
        },

        '.glass-card-bright': {
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--fare-radius-md)',
          border: '1px solid var(--glass-border)',
          boxShadow:
            'inset 1px 1px 0 rgba(255,255,255,0.06), var(--glass-shadow)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          transition: 'background-color 0.3s ease, border-color 0.2s ease',
        },

        '.glass-pill': {
          borderRadius: 'var(--fare-radius-pill)',
          border: '1px solid var(--glass-border)',
          backgroundColor: 'var(--glass-bg)',
          boxShadow:
            'inset 1px 1px 0 rgba(255,255,255,0.06), var(--glass-shadow)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          transition: 'background-color 0.3s ease, border-color 0.2s ease',
        },

        '.glass-nav': {
          backgroundColor: 'var(--glass-bg)',
          borderBottom: '1px solid var(--glass-border)',
          boxShadow: 'var(--glass-shadow)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          transition: 'background-color 0.3s ease, border-color 0.2s ease',
        },

        '.glass-inset': {
          backgroundColor: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            borderColor: 'var(--accent)',
          },
          '&:focus-within': {
            borderColor: 'var(--accent)',
            boxShadow: '0 0 0 3px rgba(136, 136, 136, 0.12)',
          },
        },

        '@keyframes pulse-dot': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.5, transform: 'scale(0.85)' },
        },

        '@keyframes glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 12px rgba(136, 136, 136, 0.2)' },
          '50%': { boxShadow: '0 0 22px rgba(136, 136, 136, 0.35)' },
        },

        '.reveal': {
          opacity: 0,
          transform: 'translateY(14px)',
          transition:
            'opacity 600ms cubic-bezier(0.22, 0.61, 0.36, 1), transform 600ms cubic-bezier(0.22, 0.61, 0.36, 1)',
        },

        '.reveal.is-visible': {
          opacity: 1,
          transform: 'translateY(0)',
        },

        '@media (prefers-reduced-motion: reduce)': {
          '.reveal': {
            transition: 'none',
            opacity: 1,
            transform: 'none',
          },
        },

        '::-webkit-scrollbar': {
          width: 4,
          height: 4,
        },

        '::-webkit-scrollbar-track': {
          background: 'transparent',
        },

        '::-webkit-scrollbar-thumb': {
          background: 'var(--border)',
          borderRadius: 999,
        },

        '::-webkit-scrollbar-thumb:hover': {
          background: 'var(--accent)',
        },
      }),
    },

    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          transition: 'background-color 0.3s ease, border-color 0.2s ease',
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: 'var(--bg-elevated)',
          borderRadius: 14,
          border: '1px solid var(--glass-border)',
          boxShadow: 'var(--glass-shadow)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          transition: 'all 0.18s ease',
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 8,
          fontSize: 11,
          backgroundColor: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--glass-shadow)',
          color: 'var(--text-primary)',
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 13,
          color: 'var(--text-primary)',
          '&:hover': {
            backgroundColor: 'var(--glass-hover-bg)',
          },
          '&.Mui-selected': {
            backgroundColor: 'var(--glass-bg)',
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'var(--glass-hover-bg)',
          },
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.18s ease',
        },
      },
    },
  },
})
