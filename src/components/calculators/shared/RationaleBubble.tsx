import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import { Avatar } from './Avatar'

interface RationaleBubbleProps {
  children: React.ReactNode
}

export function RationaleBubble({ children }: RationaleBubbleProps) {
  return (
    <motion.div
      className="flex gap-3 items-start"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Avatar />
      <div
        className="flex-1 px-4 py-3 rounded-2xl rounded-tl-md"
        style={{
          background: 'rgba(15,8,22,0.78)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={14} className="text-white/40" />
          <span className="text-white/40 text-xs font-medium uppercase tracking-wider">
            Fundamentação
          </span>
        </div>
        <div className="text-white/80 text-sm leading-relaxed">{children}</div>
      </div>
    </motion.div>
  )
}
