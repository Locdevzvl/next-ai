import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function OverviewPanel() {
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
        Overview
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Session overview coming soon
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        This tab will show a high-level summary of the COBOL modernization session:
        key metrics, recent activity, and important design artifacts.
      </Typography>
    </Box>
  )
}

