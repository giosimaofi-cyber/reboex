import { motion } from 'framer-motion'
import { ExternalLink, FileText } from 'lucide-react'
import { Avatar } from './Avatar'

interface ReferenceBubbleProps {
  title: string
  domain: string
  url: string
}

export function ReferenceBubble({ title, domain, url }: ReferenceBubbleProps) {
  return (
    <motion.div
      className="flex gap-3 items-start"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
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
          <ExternalLink size={14} className="text-white/40" />
          <span className="text-white/40 text-xs font-medium uppercase tracking-wider">
            Referência oficial
          </span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-white/20 transition-colors group"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <FileText size={18} className="text-white/40 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-white/80 text-sm font-medium leading-tight">{title}</div>
            <div className="text-white/40 text-xs font-mono mt-0.5">{domain}</div>
          </div>
          <ExternalLink size={14} className="text-white/30 group-hover:text-white/60 transition-colors flex-shrink-0" />
        </a>
      </div>
    </motion.div>
  )
}
