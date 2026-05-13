import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface NumericInputProps {
  placeholder: string
  suffix?: string
  min?: number
  max?: number
  onSubmit: (value: number) => void
}

export function NumericInputBar({ placeholder, suffix, min, max, onSubmit }: NumericInputProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  function handleSubmit() {
    const num = parseFloat(value)
    if (isNaN(num)) {
      setError('Por favor, insira um número válido.')
      return
    }
    if (min !== undefined && num < min) {
      setError(`Valor mínimo: ${min}`)
      return
    }
    if (max !== undefined && num > max) {
      setError(`Valor máximo: ${max}`)
      return
    }
    setError('')
    onSubmit(num)
    setValue('')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="w-full">
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-3xl"
        style={{
          background: 'rgba(10,5,15,0.85)',
          border: '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-sm"
          autoFocus
        />
        {suffix && (
          <span className="text-white/40 text-xs font-mono">{suffix}</span>
        )}
        <button
          onClick={handleSubmit}
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #f97316, #8b5cf6)',
          }}
        >
          <ArrowRight size={14} className="text-white" />
        </button>
      </div>
      {error && (
        <p className="text-red-400/80 text-xs mt-1.5 px-2">{error}</p>
      )}
    </div>
  )
}

interface ChoiceOption {
  label: string
  value: string
  points?: string
}

interface ChoiceInputProps {
  options: ChoiceOption[]
  onSelect: (value: string) => void
}

export function ChoiceInputBar({ options, onSelect }: ChoiceInputProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((opt) => (
        <motion.button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          className="flex-1 min-w-[120px] px-4 py-3 rounded-2xl text-white/80 text-sm font-medium flex flex-col items-center gap-0.5 transition-colors"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          whileHover={{ background: 'rgba(255,255,255,0.08)' } as never}
          whileTap={{ scale: 0.97 } as never}
        >
          <span>{opt.label}</span>
          {opt.points && (
            <span className="text-white/40 text-xs font-mono">{opt.points}</span>
          )}
        </motion.button>
      ))}
    </div>
  )
}
