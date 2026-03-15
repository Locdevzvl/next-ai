import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function SourcePanel() {
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
        Source
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        COBOL source view coming soon
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        This tab will show COBOL source snippets, navigation, and cross references
        for the selected program.
      </Typography>
    </Box>
  )
}

