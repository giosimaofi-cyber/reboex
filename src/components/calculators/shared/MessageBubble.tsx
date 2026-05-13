import { motion } from 'framer-motion'
import { Avatar } from './Avatar'

interface MessageBubbleProps {
  role: 'assistant' | 'user'
  children: React.ReactNode
}

export function MessageBubble({ role, children }: MessageBubbleProps) {
  if (role === 'assistant') {
    return (
      <motion.div
        className="flex gap-3 items-start"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Avatar />
        <div
          className="flex-1 px-4 py-3 rounded-2xl rounded-tl-md text-white/90 text-sm leading-relaxed"
          style={{
            background: 'rgba(15,8,22,0.78)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {children}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="flex justify-end"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="max-w-xs px-4 py-3 rounded-2xl rounded-tr-md text-white/90 text-sm leading-relaxed"
        style={{
          background: 'linear-gradient(135deg, rgba(217,74,42,0.3), rgba(107,46,184,0.3))',
          border: '1px solid rgba(249,115,22,0.2)',
          boxShadow: '0 4px 12px rgba(217,74,42,0.15)',
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}

export function TypingIndicator() {
  return (
    <motion.div
      className="flex gap-3 items-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Avatar />
      <div
        className="px-4 py-3 rounded-2xl rounded-tl-md flex gap-1 items-center"
        style={{
          background: 'rgba(15,8,22,0.78)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-white/50"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  )
}
