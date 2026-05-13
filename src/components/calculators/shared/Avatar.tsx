import { Sparkles } from 'lucide-react'

export function Avatar() {
  return (
    <div className="relative flex-shrink-0">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #f97316, #ec4899, #8b5cf6)',
          boxShadow: '0 0 16px rgba(236,72,153,0.5)',
        }}
      >
        <Sparkles size={12} className="text-white" />
      </div>
    </div>
  )
}
