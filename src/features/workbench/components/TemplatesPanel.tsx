import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function TemplatesPanel() {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        px: 3,
        py: 3,
        gap: 2,
      }}
    >
      <Typography variant="overline" sx={{ letterSpacing: 1, color: 'text.secondary' }}>
        Templates
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Template library coming soon
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        This tab will provide reusable templates for COBOL documentation, tests,
        and migration patterns.
      </Typography>
    </Box>
  )
}

