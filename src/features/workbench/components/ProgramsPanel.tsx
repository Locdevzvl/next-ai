import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function ProgramsPanel() {
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
        Programs
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Program inventory coming soon
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        This tab will display a catalog of COBOL programs, their status, and analysis
        results for the current session.
      </Typography>
    </Box>
  )
}

