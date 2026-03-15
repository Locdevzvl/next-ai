import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function GeneratePanel() {
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
        Generate
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Generation workspace coming soon
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        This tab will host AI-powered generation of detail designs, tests, and
        modernization assets from COBOL programs.
      </Typography>
    </Box>
  )
}

