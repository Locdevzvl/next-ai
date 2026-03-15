import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { GlobalTopNavbar } from './components/GlobalTopNavbar'
import { SessionHeaderBar } from './components/SessionHeaderBar'
import { LeftNavRail } from './components/LeftNavRail'
import {
  DocumentsPanel,
  PROGRAM_DOCUMENTS,
  type ProgramDocument,
} from './components/DocumentsPanel'
import { ViewerPanel } from './components/ViewerPanel'
import { FloatingStatusDock } from './components/FloatingStatusDock'
import { OverviewPanel } from './components/OverviewPanel'
import { ProgramsPanel } from './components/ProgramsPanel'
import { SourcePanel } from './components/SourcePanel'
import { GeneratePanel } from './components/GeneratePanel'
import { TemplatesPanel } from './components/TemplatesPanel'
import { SESSION_SUMMARIES } from '../sessions/mockSessions'

export function WorkbenchPage() {
  const { sessionId } = useParams<{ sessionId: string }>()
  const [activeNav, setActiveNav] = useState<
    'docs' | 'overview' | 'programs' | 'source' | 'generate' | 'templates'
  >('docs')
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(
    null,
  )

  const sessionSummary = useMemo(
    () => SESSION_SUMMARIES.find((s) => s.id === sessionId),
    [sessionId],
  )

  const selectedDocument: ProgramDocument | null = useMemo(() => {
    if (!selectedDocumentId) return null
    return (
      PROGRAM_DOCUMENTS.find((doc) => doc.id === selectedDocumentId) ?? null
    )
  }, [selectedDocumentId])

  useEffect(() => {
    document.body.classList.add('workbench-no-scroll')
    return () => {
      document.body.classList.remove('workbench-no-scroll')
    }
  }, [])

  return (
    <Box
      sx={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'var(--bg-base)',
        overflow: 'hidden',
      }}
    >
      {/* Top bars */}
      <Box sx={{ flexShrink: 0 }}>
        <GlobalTopNavbar />
        <SessionHeaderBar
          session={
            sessionSummary && {
              name: sessionSummary.name,
              tech: sessionSummary.tech,
              statusLabel: sessionSummary.statusLabel,
              updatedLabel: sessionSummary.updatedLabel,
              owner: sessionSummary.owner,
            }
          }
        />
      </Box>

      {/* Main workspace */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          gap: 3,
          p: 2,
          pt: 1.75,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Left nav rail */}
        <LeftNavRail activeItem={activeNav} onChange={setActiveNav} />

        {activeNav === 'docs' ? (
          <>
            {/* Documents panel */}
            <Box
            className="glass-card"
            sx={{
              width: 450,
              flexShrink: 0,
              height: '100%',
              borderRadius: '16px',
              bgcolor: 'var(--bg-surface)',
              overflow: 'hidden',
            }}
            >
              <DocumentsPanel
                selectedId={selectedDocumentId}
                onSelect={setSelectedDocumentId}
              />
            </Box>

            {/* Main viewer panel */}
            <Box
            className="glass-card"
            sx={{
              flex: 1,
              minWidth: 0,
              height: '100%',
              borderRadius: '16px',
              bgcolor: 'var(--bg-surface)',
              overflow: 'hidden',
            }}
          >
            <ViewerPanel selectedDocument={selectedDocument} />
            </Box>
          </>
        ) : (
          <Box
            className="glass-card"
            sx={{
              flex: 1,
              minWidth: 0,
              height: '100%',
              borderRadius: '16px',
              bgcolor: 'var(--bg-surface)',
              overflow: 'hidden',
            }}
          >
            {activeNav === 'overview' && <OverviewPanel />}
            {activeNav === 'programs' && <ProgramsPanel />}
            {activeNav === 'source' && <SourcePanel />}
            {activeNav === 'generate' && <GeneratePanel />}
            {activeNav === 'templates' && <TemplatesPanel />}
          </Box>
        )}

        <FloatingStatusDock />
      </Box>
    </Box>
  )
}
