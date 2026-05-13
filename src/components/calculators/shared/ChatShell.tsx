import { useRef, useEffect } from 'react'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import { MeshBackground } from './MeshBackground'
import logoSvg from '../../../assets/logo.svg'

interface ChatShellProps {
  subtitle: string
  progress: number // 0 a 1
  onBack: () => void
  onReset: () => void
  children: React.ReactNode
  inputArea: React.ReactNode
}

export function ChatShell({
  subtitle,
  progress,
  onBack,
  onReset,
  children,
  inputArea,
}: ChatShellProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  })

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#08040c' }}>
      <MeshBackground />

      {/* Header */}
      <header
        className="no-print relative z-10 flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(8,4,12,0.6)', backdropFilter: 'blur(12px)' }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Voltar</span>
        </button>

        <div className="flex flex-col items-center">
          <img src={logoSvg} alt="Vírgula Labs" className="h-6 w-auto mb-0.5" />
          <span className="text-white/40 text-xs">{subtitle}</span>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors text-sm"
          title="Reiniciar"
        >
          <RotateCcw size={16} />
          <span className="hidden sm:inline">Reiniciar</span>
        </button>
      </header>

      {/* Barra de progresso */}
      <div className="no-print relative z-10 h-0.5" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${progress * 100}%`,
            background: 'linear-gradient(90deg, #f97316, #8b5cf6)',
            boxShadow: '0 0 8px rgba(249,115,22,0.5)',
          }}
        />
      </div>

      {/* Área de chat */}
      <div
        ref={scrollRef}
        className="relative z-10 flex-1 overflow-y-auto px-4 py-6"
        style={{ maxWidth: '680px', margin: '0 auto', width: '100%' }}
      >
        <div className="flex flex-col gap-4">
          {children}
        </div>
        <div className="h-4" />
      </div>

      {/* Input area */}
      <div
        className="no-print relative z-10 px-4 pb-6 pt-2"
        style={{ maxWidth: '680px', margin: '0 auto', width: '100%' }}
      >
        {inputArea}
      </div>

      {/* Footer disclaimer */}
      <div
        className="relative z-10 text-center py-3 px-4 text-white/25 text-xs border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        Ferramenta de apoio educacional. Não substitui avaliação médica.
      </div>
    </div>
  )
}
