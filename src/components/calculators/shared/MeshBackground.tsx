import { motion } from 'framer-motion'

export function MeshBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Blob 1 — terracota */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, #d94a2a 0%, transparent 70%)',
          opacity: 0.55,
          filter: 'blur(100px)',
          top: '-10%',
          left: '-10%',
        }}
        animate={{ x: [0, 60, -30, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Blob 2 — indigo */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, #6b2eb8 0%, transparent 70%)',
          opacity: 0.55,
          filter: 'blur(100px)',
          top: '30%',
          right: '-15%',
        }}
        animate={{ x: [0, -50, 30, 0], y: [0, 60, -40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Blob 3 — vinho */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, #c44a2a 0%, transparent 70%)',
          opacity: 0.55,
          filter: 'blur(100px)',
          bottom: '-5%',
          left: '30%',
        }}
        animate={{ x: [0, 40, -60, 0], y: [0, -30, 50, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Grain overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.1,
          mixBlendMode: 'overlay',
        }}
      />
      {/* Vinheta radial */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(8,4,12,0.8) 100%)',
        }}
      />
    </div>
  )
}
