import { Check } from 'lucide-react'
import { cn } from '../../lib/utils'

interface StepItem {
  label: string
  description: string
  icon: React.ReactNode
}

interface StepperProps {
  steps: StepItem[]
  activeStep: number
  onStepChange: (index: number) => void
}

export function Stepper({ steps, activeStep, onStepChange }: StepperProps) {
  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      onStepChange(Math.min(index + 1, steps.length - 1))
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      onStepChange(Math.max(index - 1, 0))
    } else if (e.key === 'Home') {
      e.preventDefault()
      onStepChange(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      onStepChange(steps.length - 1)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onStepChange(index)
    }
  }

  return (
    <div>
      {/* Indicadores */}
      <div
        role="tablist"
        className="flex items-center justify-center gap-0 mb-10"
      >
        {steps.map((_step, index) => {
          const isActive = index === activeStep
          const isCompleted = index < activeStep

          return (
            <div key={index} className="flex items-center">
              <button
                role="tab"
                aria-selected={isActive}
                aria-controls={`step-panel-${index}`}
                id={`step-tab-${index}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onStepChange(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
                  isCompleted && 'bg-black text-white',
                  isActive && 'bg-black text-white ring-2 ring-black ring-offset-2',
                  !isCompleted && !isActive && 'border-2 border-neutral-300 text-neutral-400'
                )}
              >
                {isCompleted ? <Check size={16} /> : index + 1}
              </button>
              {index < steps.length - 1 && (
                <div className="w-16 md:w-24 h-0.5 mx-1">
                  <div
                    className="h-full bg-black transition-all duration-500"
                    style={{ width: isCompleted ? '100%' : '0%' }}
                  />
                  <div className="h-full bg-neutral-200 -mt-0.5" style={{ width: isCompleted ? '0%' : '100%' }} />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Conteúdo do passo ativo */}
      {steps.map((s, index) => (
        <div
          key={index}
          id={`step-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`step-tab-${index}`}
          hidden={index !== activeStep}
          className="max-w-md mx-auto text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center mx-auto mb-4">
            {s.icon}
          </div>
          <h3 className="text-xl font-semibold text-black mb-2">{s.label}</h3>
          <p className="text-neutral-500 leading-relaxed">{s.description}</p>
        </div>
      ))}

      {/* Navegação */}
      <div className="flex justify-center gap-3 mt-8">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => onStepChange(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              index === activeStep ? 'bg-black w-6' : 'bg-neutral-300'
            )}
            aria-label={`Ir para passo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
