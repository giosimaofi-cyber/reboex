import { useState } from 'react'
import { MessageSquare, Zap, Shield } from 'lucide-react'
import { Stepper } from '../ui/Stepper'
import { Section } from '../ui/Section'

const steps = [
  {
    label: 'Conversa guiada',
    icon: <MessageSquare size={22} />,
    description:
      'A calculadora pergunta um campo por vez — como conversar com um colega. Sem formulários densos, sem medo de errar campo.',
  },
  {
    label: 'Resultado com contexto',
    icon: <Zap size={22} />,
    description:
      'O número sozinho não basta. Cada resultado vem com classificação, fundamentação na literatura e link para a diretriz oficial.',
  },
  {
    label: 'Privacidade total',
    icon: <Shield size={22} />,
    description:
      'Cálculo 100% no seu navegador. Nenhum dado de paciente é enviado para servidores. Sem login, sem cadastro, sem rastro.',
  },
]

export function HowItWorks() {
  const [active, setActive] = useState(0)

  return (
    <Section
      id="como-funciona"
      className="py-20"
      style={{
        background: '#fafafa',
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      } as React.CSSProperties}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Como funciona</span>
          <h2 className="text-3xl md:text-4xl font-bold text-black mt-2">3 passos. Zero fricção.</h2>
        </div>
        <Stepper steps={steps} activeStep={active} onStepChange={setActive} />
      </div>
    </Section>
  )
}
