import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'
import { Section } from '../ui/Section'

function TraditionalMockup() {
  return (
    <div className="w-full h-full bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-xs flex flex-col gap-2.5">
        <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1 text-center">
          Calculadora Tradicional
        </div>
        {['Idade', 'Sexo', 'Colesterol total', 'HDL', 'PA sistólica', 'Trat. HAS', 'Tabagismo'].map((field) => (
          <div key={field} className="flex items-center gap-3">
            <label className="text-xs text-neutral-500 w-28 shrink-0 text-right">{field}</label>
            <div className="h-7 flex-1 rounded border border-neutral-200 bg-neutral-50" />
          </div>
        ))}
        <button className="mt-2 h-9 rounded bg-blue-600 text-white text-sm font-medium">
          Calcular
        </button>
        <div className="p-3 rounded border border-neutral-200 bg-neutral-50 text-center">
          <div className="text-2xl font-bold text-neutral-800">16%</div>
          <div className="text-xs text-neutral-500">Risco intermediário</div>
        </div>
      </div>
    </div>
  )
}

function ModernMockup() {
  return (
    <div className="w-full h-full bg-[#08040c] flex flex-col">
      {/* Header */}
      <div
        className="flex items-center justify-center py-2 px-4 shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(8,4,12,0.6)' }}
      >
        <span className="text-white/50 text-xs">Framingham · ATP III</span>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col gap-2.5 px-4 py-3 overflow-hidden">
        {/* Assistente — idade */}
        <div className="flex gap-2 items-start">
          <div
            className="w-5 h-5 rounded-full shrink-0 mt-0.5"
            style={{ background: 'linear-gradient(135deg, #f97316, #8b5cf6)' }}
          />
          <div
            className="px-3 py-2 rounded-2xl rounded-tl-sm text-white/85 text-xs leading-relaxed"
            style={{ background: 'rgba(15,8,22,0.78)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            Qual a <span className="text-white font-medium">idade</span> do paciente? <span className="text-white/40">(30–79 anos)</span>
          </div>
        </div>

        {/* Usuário — 55 anos */}
        <div className="flex justify-end">
          <div
            className="px-3 py-2 rounded-2xl rounded-tr-sm text-white/85 text-xs"
            style={{ background: 'linear-gradient(135deg, rgba(217,74,42,0.35), rgba(107,46,184,0.35))', border: '1px solid rgba(249,115,22,0.2)' }}
          >
            55 anos
          </div>
        </div>

        {/* Assistente — colesterol */}
        <div className="flex gap-2 items-start">
          <div
            className="w-5 h-5 rounded-full shrink-0 mt-0.5"
            style={{ background: 'linear-gradient(135deg, #f97316, #8b5cf6)' }}
          />
          <div
            className="px-3 py-2 rounded-2xl rounded-tl-sm text-white/85 text-xs leading-relaxed"
            style={{ background: 'rgba(15,8,22,0.78)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            Qual o <span className="text-white font-medium">colesterol total</span>? <span className="text-white/40">(mg/dL)</span>
          </div>
        </div>

        {/* Usuário — 220 */}
        <div className="flex justify-end">
          <div
            className="px-3 py-2 rounded-2xl rounded-tr-sm text-white/85 text-xs"
            style={{ background: 'linear-gradient(135deg, rgba(217,74,42,0.35), rgba(107,46,184,0.35))', border: '1px solid rgba(249,115,22,0.2)' }}
          >
            220 mg/dL
          </div>
        </div>

        {/* Assistente — HDL */}
        <div className="flex gap-2 items-start">
          <div
            className="w-5 h-5 rounded-full shrink-0 mt-0.5"
            style={{ background: 'linear-gradient(135deg, #f97316, #8b5cf6)' }}
          />
          <div
            className="px-3 py-2 rounded-2xl rounded-tl-sm text-white/85 text-xs leading-relaxed"
            style={{ background: 'rgba(15,8,22,0.78)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            Qual o <span className="text-white font-medium">HDL-colesterol</span>? <span className="text-white/40">(mg/dL)</span>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="px-4 pb-4 shrink-0">
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <span className="flex-1 text-white/30 text-xs">Digite um valor...</span>
          <span className="text-white/25 text-xs font-mono">mg/dL</span>
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #f97316, #8b5cf6)' }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5h6M6 3l2 2-2 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ComparisonSlider() {
  const containerRef = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0.5)
  const x = useSpring(rawX, { stiffness: 180, damping: 28 })

  const xPercent = useTransform(x, (v) => v * 100)
  const clipPath = useMotionTemplate`inset(0 0 0 ${xPercent}%)`
  const leftPercent = useMotionTemplate`${xPercent}%`

  function updatePosition(clientX: number) {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pos = Math.max(0.02, Math.min(0.98, (clientX - rect.left) / rect.width))
    rawX.set(pos)
  }

  return (
    <Section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            O diferencial
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-black mt-2 leading-tight">
            Calculadoras existem há anos.<br />Nós melhoramos a experiência.
          </h2>
          <p className="text-neutral-500 mt-3 text-sm">Passe o mouse sobre a imagem para comparar</p>
        </div>

        {/* Slider */}
        <div
          ref={containerRef}
          className="relative select-none overflow-hidden rounded-2xl border border-neutral-200 cursor-ew-resize"
          style={{ aspectRatio: '16/9' }}
          onMouseMove={(e) => updatePosition(e.clientX)}
          onTouchMove={(e) => updatePosition(e.touches[0].clientX)}
        >
          {/* Lado esquerdo — Tradicional */}
          <div className="absolute inset-0">
            <TraditionalMockup />
          </div>

          {/* Lado direito — Vírgula Labs (recortado) */}
          <motion.div className="absolute inset-0" style={{ clipPath }}>
            <ModernMockup />
          </motion.div>

          {/* Handle vertical */}
          <motion.div
            className="absolute top-0 bottom-0 w-px bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            style={{ left: leftPercent }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg border border-neutral-200 flex items-center justify-center text-neutral-500 text-sm font-semibold pointer-events-none">
              ↔
            </div>
          </motion.div>

          {/* Labels */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 text-xs font-medium text-neutral-700 shadow-sm border border-neutral-200 pointer-events-none">
            Tradicional
          </div>
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/90 text-xs font-medium text-white shadow-sm pointer-events-none">
            Vírgula Labs
          </div>
        </div>
      </div>
    </Section>
  )
}
