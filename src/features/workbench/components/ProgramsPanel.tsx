import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'

type ArtefactKind =
  | 'programs'
  | 'copybooks'
  | 'jcl'
  | 'cics'
  | 'ims'
  | 'database'
  | 'scheduler'
  | 'config'
  | 'all'

interface ProgramRow {
  name: string
  loc: number
  type: 'BATCH' | 'ONLINE'
  tags: string[]
  path: string
}

const ARTEFACT_TABS: { id: ArtefactKind; label: string; count: number }[] = [
  { id: 'programs', label: 'Programs', count: 40 },
  { id: 'copybooks', label: 'Copybooks', count: 23 },
  { id: 'jcl', label: 'JCL Jobs', count: 12 },
  { id: 'cics', label: 'CICS/BMS', count: 7 },
  { id: 'ims', label: 'IMS', count: 4 },
  { id: 'database', label: 'Database', count: 9 },
  { id: 'scheduler', label: 'Scheduler', count: 5 },
  { id: 'config', label: 'Config', count: 19 },
  { id: 'all', label: 'All artefacts', count: 119 },
]

const PROGRAM_ROWS: ProgramRow[] = [
  {
    name: 'CONDSET6.cbl',
    loc: 168,
    type: 'BATCH',
    tags: ['MAIN', 'CALL'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/MAST/CONDSET6.cbl',
  },
  {
    name: 'DELETE.cbl',
    loc: 57,
    type: 'BATCH',
    tags: ['MAIN'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/MAST/DELETE.cbl',
  },
  {
    name: 'DSCOPY.cbl',
    loc: 159,
    type: 'BATCH',
    tags: ['MAIN', 'COPY'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/MAST/DSCOPY.cbl',
  },
  {
    name: 'GOCHECK.cbl',
    loc: 23,
    type: 'BATCH',
    tags: ['MAIN'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/MAST/GOCHECK.cbl',
  },
  {
    name: 'HD25SPT3.cbl',
    loc: 163,
    type: 'BATCH',
    tags: ['MAIN'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/HD45.MAST.SRCLIB/HD25SPT3.cbl',
  },
  {
    name: 'HD45SP98.cbl',
    loc: 87,
    type: 'BATCH',
    tags: ['MAIN'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/HD45.MAST.SRCLIB/HD45SP98.cbl',
  },
  {
    name: 'HD89A001.cbl',
    loc: 235,
    type: 'BATCH',
    tags: ['MAIN', 'CALL'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/MAST/HD89A001.cbl',
  },
  {
    name: 'HD89A012.cbl',
    loc: 314,
    type: 'BATCH',
    tags: ['MAIN', 'CALL', 'COPY'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/MAST/HD89A012.cbl',
  },
  // duplicated rows for pagination demo
  {
    name: 'HD89M110.cbl',
    loc: 142,
    type: 'BATCH',
    tags: ['MAIN'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/MAST/HD89M110.cbl',
  },
  {
    name: 'HD89M130.cbl',
    loc: 201,
    type: 'BATCH',
    tags: ['MAIN', 'CALL'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/MAST/HD89M130.cbl',
  },
  {
    name: 'HD89M140.cbl',
    loc: 178,
    type: 'BATCH',
    tags: ['MAIN'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/MAST/HD89M140.cbl',
  },
  {
    name: 'HD89M150.cbl',
    loc: 190,
    type: 'BATCH',
    tags: ['MAIN', 'CALL'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/MAST/HD89M150.cbl',
  },
  {
    name: 'HD89M160.cbl',
    loc: 207,
    type: 'BATCH',
    tags: ['MAIN'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/MAST/HD89M160.cbl',
  },
  {
    name: 'HD89Q140.cbl',
    loc: 132,
    type: 'BATCH',
    tags: ['MAIN', 'CALL'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/MAST/HD89Q140.cbl',
  },
  {
    name: 'HD89Q150.cbl',
    loc: 156,
    type: 'BATCH',
    tags: ['MAIN'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/MAST/HD89Q150.cbl',
  },
  {
    name: 'HD89Q160.cbl',
    loc: 121,
    type: 'BATCH',
    tags: ['MAIN', 'COPY'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/MAST/HD89Q160.cbl',
  },
  {
    name: 'ZH79C120.cbl',
    loc: 188,
    type: 'BATCH',
    tags: ['MAIN'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/MAST/ZH79C120.cbl',
  },
  {
    name: 'SEARCH01.cbl',
    loc: 211,
    type: 'BATCH',
    tags: ['MAIN', 'CALL'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/MAST/SEARCH01.cbl',
  },
  {
    name: 'JNT89A01.cbl',
    loc: 175,
    type: 'BATCH',
    tags: ['MAIN'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/MAST/JNT89A01.cbl',
  },
  {
    name: 'JNT89A02.cbl',
    loc: 164,
    type: 'BATCH',
    tags: ['MAIN', 'CALL'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/MAST/JNT89A02.cbl',
  },
  {
    name: 'JNT89A03.cbl',
    loc: 199,
    type: 'BATCH',
    tags: ['MAIN'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/MAST/JNT89A03.cbl',
  },
  {
    name: 'JNT89A04.cbl',
    loc: 187,
    type: 'BATCH',
    tags: ['MAIN'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/MAST/JNT89A04.cbl',
  },
  {
    name: 'JNT89A05.cbl',
    loc: 222,
    type: 'BATCH',
    tags: ['MAIN', 'CALL'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/MAST/JNT89A05.cbl',
  },
  {
    name: 'JNT89A06.cbl',
    loc: 134,
    type: 'BATCH',
    tags: ['MAIN'],
    path: 'cobol_internal_line_investigation/02_PMC/COBOL/MAST/JNT89A06.cbl',
  },
]

const SORT_OPTIONS = [
  { id: 'name-asc', label: 'Name ↑' },
  { id: 'name-desc', label: 'Name ↓' },
  { id: 'loc-desc', label: 'LOC ↓' },
  { id: 'loc-asc', label: 'LOC ↑' },
]

export function ProgramsPanel() {
  const [activeTab, setActiveTab] = useState<ArtefactKind>('programs')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<string>('name-asc')
  const [page, setPage] = useState(0)
  const rowsPerPage = 20

  const filteredRows = useMemo(() => {
    let rows = PROGRAM_ROWS

    const trimmed = query.trim().toLowerCase()
    if (trimmed) {
      rows = rows.filter(
        (row) =>
          row.name.toLowerCase().includes(trimmed) ||
          row.path.toLowerCase().includes(trimmed),
      )
    }

    const sorted = [...rows]
    switch (sort) {
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'loc-desc':
        sorted.sort((a, b) => b.loc - a.loc)
        break
      case 'loc-asc':
        sorted.sort((a, b) => a.loc - b.loc)
        break
      case 'name-asc':
      default:
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return sorted
  }, [query, sort])

  const pageCount = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage))
  const currentPage = Math.min(page, pageCount - 1)
  const paginatedRows = useMemo(
    () =>
      filteredRows.slice(
        currentPage * rowsPerPage,
        currentPage * rowsPerPage + rowsPerPage,
      ),
    [filteredRows, currentPage, rowsPerPage],
  )

  const startIndex = currentPage * rowsPerPage + 1
  const endIndex = Math.min(filteredRows.length, (currentPage + 1) * rowsPerPage)

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        px: 3,
        py: 2.75,
        gap: 2,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: '10px',
            border: '1px solid var(--glass-border)',
            bgcolor: 'var(--glass-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--glass-shadow)',
          }}
        >
          <CodeOutlinedIcon sx={{ fontSize: 18, color: 'var(--accent)' }} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
          <Typography sx={{ fontSize: 15, fontWeight: 600 }}>COBOL Programs</Typography>
          <Typography sx={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>
            Generate documentation for individual programs.
          </Typography>
        </Box>
      </Box>

      {/* Tabs + filters */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderRadius: 2,
          px: 1.75,
          py: 1.25,
          bgcolor: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, value) => setActiveTab(value)}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          TabIndicatorProps={{ style: { display: 'none' } }}
          sx={{
            minHeight: 0,
            borderRadius: 999,
            px: 0.5,
            py: 0.5,
            backgroundColor: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--glass-inset-highlight-subtle)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            '& .MuiTabs-flexContainer': {
              gap: 0.25,
            },
            '& .MuiTabs-scrollButtons': {
              width: 30,
              height: 30,
              borderRadius: 999,
              color: 'var(--text-secondary)',
              transition:
                'opacity 0.18s ease, background-color 0.18s ease, color 0.18s ease',
              opacity: 0,
              pointerEvents: 'none',
              '&:hover': {
                bgcolor: 'var(--glass-hover-bg)',
                color: 'var(--text-primary)',
              },
              '&.Mui-disabled': {
                opacity: 0,
              },
            },
            '&:hover .MuiTabs-scrollButtons': {
              opacity: 1,
              pointerEvents: 'auto',
            },
            '& .MuiTab-root': {
              minHeight: 0,
              px: 2,
              py: 0.6,
              borderRadius: 999,
              textTransform: 'none',
              fontSize: 12.5,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              alignItems: 'center',
              gap: 0.75,
              transition:
                'background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease',
              '&:hover': {
                bgcolor: 'var(--glass-hover-bg)',
                color: 'var(--text-primary)',
                transform: 'translateY(-1px)',
              },
            },
            '& .MuiTab-root.Mui-selected': {
              bgcolor: 'var(--glass-hover-bg)',
              color: 'var(--text-primary)',
              boxShadow: 'inset 0 0 0 1px var(--accent)',
            },
            '& .MuiTab-root.Mui-selected:hover': {
              bgcolor: 'var(--glass-hover-bg)',
              boxShadow: 'inset 0 0 0 1px var(--accent-hover)',
            },
          }}
        >
          {ARTEFACT_TABS.map((tab) => (
            <Tab
              key={tab.id}
              value={tab.id}
              label={
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <span>{tab.label}</span>
                  <Chip
                    label={tab.count}
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: 10,
                      px: 0.6,
                      borderRadius: 999,
                      border: '1px solid var(--glass-border)',
                      bgcolor: 'var(--bg-surface)',
                    }}
                  />
                </Stack>
              }
            />
          ))}
        </Tabs>

        <Box sx={{ flex: 1 }} />

        {/* Filter input */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1.25,
            py: 0.55,
            borderRadius: '999px',
            bgcolor: 'var(--bg-surface)',
            border: '1px solid var(--glass-border)',
            maxWidth: 260,
          }}
        >
          <SearchIcon sx={{ fontSize: 16, color: 'var(--text-secondary)' }} />
          <InputBase
            placeholder="Filter..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{
              fontSize: 12.5,
              color: 'var(--text-primary)',
              '& input::placeholder': {
                color: 'var(--text-secondary)',
                opacity: 1,
              },
            }}
          />
        </Box>

        {/* Sort select */}
        <Select
          size="small"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          sx={{
            fontSize: 12,
            minWidth: 110,
            borderRadius: 999,
            bgcolor: 'var(--bg-surface)',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--glass-border)',
            },
          }}
        >
          {SORT_OPTIONS.map((opt) => (
            <MenuItem key={opt.id} value={opt.id} sx={{ fontSize: 12 }}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Table */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          borderRadius: 2,
          border: '1px solid var(--glass-border)',
          bgcolor: 'var(--glass-bg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.25,
            borderBottom: '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Typography sx={{ fontSize: 12, color: 'var(--text-secondary)' }}>
            Showing {startIndex.toLocaleString()} - {endIndex.toLocaleString()} of{' '}
            {filteredRows.length.toLocaleString()}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflow: 'auto',
          }}
        >
          <Table
            size="small"
            stickyHeader
            sx={{
              '& th': {
                bgcolor: 'var(--bg-surface)',
                borderBottom: '1px solid var(--glass-border)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: 0.7,
                color: 'var(--text-secondary)',
              },
              '& thead th.MuiTableCell-stickyHeader': {
                backgroundColor: 'var(--bg-surface)',
              },
              '& td': {
                borderBottom: '1px solid var(--glass-border)',
                fontSize: 12.5,
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell width="26%">Name</TableCell>
                <TableCell width="8%">LOC</TableCell>
                <TableCell width="9%">Type</TableCell>
                <TableCell width="18%">Tags</TableCell>
                <TableCell>Path</TableCell>
                <TableCell align="center" width="12%">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <TableRow
                  key={row.name}
                  hover
                  sx={{
                    '&:hover': {
                      bgcolor: 'var(--glass-hover-bg)',
                    },
                  }}
                >
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography
                        sx={{
                          fontSize: 13,
                          fontWeight: 500,
                          fontFeatureSettings: '"tnum" 1, "lnum" 1',
                        }}
                      >
                        {row.name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: 12.5,
                        fontFeatureSettings: '"tnum" 1, "lnum" 1',
                      }}
                    >
                      {row.loc}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.type}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: 10,
                        borderRadius: 999,
                        bgcolor: 'var(--bg-surface)',
                        border: '1px solid var(--glass-border)',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.75} flexWrap="wrap">
                      {row.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: 10,
                            borderRadius: 999,
                            bgcolor: 'var(--glass-bg)',
                            border: '1px solid var(--glass-border)',
                          }}
                        />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: 'var(--text-secondary)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 520,
                      }}
                    >
                      {row.path}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={0.5} justifyContent="center">
                      <Tooltip title="Open source">
                        <IconButton size="small">
                          <VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Copy path">
                        <IconButton size="small">
                          <ContentCopyOutlinedIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Configure">
                        <IconButton size="small">
                          <SettingsOutlinedIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* Pagination footer */}
        <Box
          sx={{
            px: 2,
            py: 1,
            borderTop: '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 2,
          }}
        >
          <Stack direction="row" spacing={0.5}>
            <IconButton
              size="small"
              disabled={currentPage === 0}
              onClick={() => setPage(0)}
            >
              <FirstPageIcon sx={{ fontSize: 16 }} />
            </IconButton>
            <IconButton
              size="small"
              disabled={currentPage === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              <ChevronLeftIcon sx={{ fontSize: 16 }} />
            </IconButton>
            <IconButton
              size="small"
              disabled={currentPage >= pageCount - 1}
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            >
              <ChevronRightIcon sx={{ fontSize: 16 }} />
            </IconButton>
            <IconButton
              size="small"
              disabled={currentPage >= pageCount - 1}
              onClick={() => setPage(pageCount - 1)}
            >
              <LastPageIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Stack>
          <Typography sx={{ fontSize: 11.5, color: 'var(--text-secondary)' }}>
            Page {currentPage + 1} of {pageCount}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

