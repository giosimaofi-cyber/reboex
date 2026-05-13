import { motion } from 'framer-motion'
import { Printer } from 'lucide-react'
import { Avatar } from './Avatar'

type RiskLevel = 'baixo' | 'intermediário' | 'alto' | 'baixa' | 'intermediária' | 'alta' | 'improvável' | 'provável'

interface ResultBubbleProps {
  mainValue: string
  mainLabel: string
  subLabel?: string
  badge?: string
  classification: RiskLevel
  summary?: string
  onPrint?: () => void
}

const colorMap: Record<string, { border: string; gradient: string; badge: string }> = {
  baixo: {
    border: '#2dd4bf',
    gradient: 'linear-gradient(135deg, #2dd4bf, #14b8a6)',
    badge: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  },
  baixa: {
    border: '#2dd4bf',
    gradient: 'linear-gradient(135deg, #2dd4bf, #14b8a6)',
    badge: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  },
  improvável: {
    border: '#2dd4bf',
    gradient: 'linear-gradient(135deg, #2dd4bf, #14b8a6)',
    badge: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  },
  intermediário: {
    border: '#fbbf24',
    gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  },
  intermediária: {
    border: '#fbbf24',
    gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  },
  alto: {
    border: '#ff6b6b',
    gradient: 'linear-gradient(135deg, #ff6b6b, #ef4444)',
    badge: 'bg-red-500/20 text-red-300 border-red-500/30',
  },
  alta: {
    border: '#ff6b6b',
    gradient: 'linear-gradient(135deg, #ff6b6b, #ef4444)',
    badge: 'bg-red-500/20 text-red-300 border-red-500/30',
  },
  provável: {
    border: '#ff6b6b',
    gradient: 'linear-gradient(135deg, #ff6b6b, #ef4444)',
    badge: 'bg-red-500/20 text-red-300 border-red-500/30',
  },
}

export function ResultBubble({
  mainValue,
  mainLabel,
  subLabel,
  badge,
  classification,
  summary,
  onPrint,
}: ResultBubbleProps) {
  const colors = colorMap[classification] ?? colorMap['intermediário']

  return (
    <motion.div
      className="flex gap-3 items-start"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Avatar />
      <div
        className="flex-1 rounded-2xl rounded-tl-md overflow-hidden"
        style={{
          background: 'rgba(15,8,22,0.78)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderLeft: `3px solid ${colors.border}`,
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="px-5 py-4">
          <div
            className="font-serif text-7xl md:text-8xl font-normal leading-none mb-1"
            style={{
              background: colors.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: `drop-shadow(0 0 20px ${colors.border}50)`,
            }}
          >
            {mainValue}
          </div>
          <div className="font-serif text-2xl text-white/80 mb-2">{mainLabel}</div>
          {subLabel && <div className="text-white/50 text-sm mb-3">{subLabel}</div>}
          {badge && (
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${colors.badge}`}
            >
              {badge}
            </span>
          )}
        </div>
        {summary && (
          <div className="px-5 py-3 border-t border-white/10 text-white/60 text-sm">
            {summary}
          </div>
        )}
        {onPrint && (
          <div className="px-5 py-3 border-t border-white/10">
            <button
              onClick={onPrint}
              className="no-print flex items-center gap-2 text-white/40 hover:text-white/70 text-xs transition-colors"
            >
              <Printer size={14} />
              Imprimir / Salvar PDF
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
