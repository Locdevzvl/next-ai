import { startTransition, useEffect, useMemo, useState } from 'react'
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

  const panelDeck = useMemo(
    () =>
      [
        { key: 'overview', node: <OverviewPanel /> },
        { key: 'programs', node: <ProgramsPanel /> },
        { key: 'source', node: <SourcePanel /> },
        { key: 'generate', node: <GeneratePanel /> },
        { key: 'templates', node: <TemplatesPanel /> },
      ] as const,
    [],
  )

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
        <LeftNavRail
          activeItem={activeNav}
          onChange={(next) => startTransition(() => setActiveNav(next))}
        />

        {activeNav === 'docs' ? (
          <>
            {/* Documents panel */}
            <Box
              key="docs-sidebar"
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
              <Box className="page-transition" sx={{ height: '100%' }}>
                <DocumentsPanel
                  selectedId={selectedDocumentId}
                  onSelect={setSelectedDocumentId}
                />
              </Box>
            </Box>

            {/* Main viewer panel */}
            <Box
              key="docs-viewer"
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
              <Box className="page-transition" sx={{ height: '100%' }}>
                <ViewerPanel selectedDocument={selectedDocument} />
              </Box>
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
              position: 'relative',
            }}
          >
            {panelDeck.map((panel) => {
              const isActive = activeNav === panel.key
              return (
                <Box
                  key={panel.key}
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    opacity: isActive ? 1 : 0,
                    transform: isActive
                      ? 'translateY(0) scale(1)'
                      : 'translateY(8px) scale(0.995)',
                    transition:
                      'opacity 180ms ease, transform 220ms cubic-bezier(0.22, 0.61, 0.36, 1)',
                    willChange: 'opacity, transform',
                    pointerEvents: isActive ? 'auto' : 'none',
                    visibility: isActive ? 'visible' : 'hidden',
                    contain: 'layout paint',
                  }}
                >
                  <Box className="page-transition" sx={{ height: '100%' }}>
                    {panel.node}
                  </Box>
                </Box>
              )
            })}
          </Box>
        )}

        <FloatingStatusDock />
      </Box>
    </Box>
  )
}
