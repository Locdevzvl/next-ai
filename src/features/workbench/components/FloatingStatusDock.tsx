import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'

type MetricColor = 'info' | 'warning' | 'success' | 'idle'

interface StatusMetricProps {
  label: string
  value: number
  color: MetricColor
}

const COLOR_MAP: Record<MetricColor, { dot: string; glow: string }> = {
  idle: {
    dot: 'var(--text-secondary)',
    glow: 'transparent',
  },
  info: {
    dot: '#38bdf8',
    glow: 'rgba(56,189,248,0.4)',
  },
  warning: {
    dot: '#fbbf24',
    glow: 'rgba(251,191,36,0.4)',
  },
  success: {
    dot: '#22c55e',
    glow: 'rgba(34,197,94,0.4)',
  },
}

export function FloatingStatusDock() {
  const metrics: StatusMetricProps[] = [
    { label: 'Queued', value: 0, color: 'idle' },
    { label: 'Running', value: 0, color: 'idle' },
    { label: 'Warnings', value: 0, color: 'idle' },
    { label: 'Success', value: 39, color: 'success' },
  ]

  return (
    <Box
      sx={{
        position: 'absolute',
        right: 20,
        bottom: 20,
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      <Paper
        elevation={0}
        className="glass-pill"
        sx={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          px: 1.25,
          py: 0.85,
          borderRadius: 999,
          bgcolor: 'transparent',
        }}
      >
        {/* Run button */}
        <Tooltip title="Run analysis" placement="top">
          <IconButton
            size="small"
            sx={{
            backgroundColor: 'var(--accent)',
            color: 'var(--bg-base)',
            borderRadius: 999,
            width: 30,
            height: 30,
            boxShadow: 'var(--glass-glow)',
            mr: 1.5,
            flexShrink: 0,
            transition: 'all 0.18s ease',
            '&:hover': {
              boxShadow: 'var(--glass-shadow)',
              transform: 'scale(1.08)',
            },
            }}
          >
            <AutoAwesomeOutlinedIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Tooltip>

        {/* Metrics */}
        {metrics.map((metric, i) => {
          const colors = COLOR_MAP[metric.color]
          const isActive = metric.value > 0

          return (
            <Box key={metric.label} sx={{ display: 'flex', alignItems: 'center' }}>
              {i > 0 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    mx: 1.25,
                    borderColor: 'var(--glass-border)',
                    height: 22,
                    alignSelf: 'center',
                  }}
                />
              )}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.15,
                  minWidth: 42,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: colors.dot,
                      boxShadow: isActive ? `0 0 6px ${colors.glow}` : 'none',
                      animation: isActive && metric.color !== 'success'
                        ? 'pulse-dot 2s ease-in-out infinite'
                        : 'none',
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      lineHeight: 1,
                      fontFeatureSettings: '"tnum" 1',
                    }}
                  >
                    {metric.value}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 9.5,
                    color: 'var(--text-secondary)',
                    lineHeight: 1,
                    letterSpacing: 0.3,
                  }}
                >
                  {metric.label}
                </Typography>
              </Box>
            </Box>
          )
        })}
      </Paper>
    </Box>
  )
}
