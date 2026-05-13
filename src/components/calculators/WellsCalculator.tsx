import { useState, useCallback } from 'react'
import { ChatShell } from './shared/ChatShell'
import { MessageBubble, TypingIndicator } from './shared/MessageBubble'
import { ResultBubble } from './shared/ResultBubble'
import { RationaleBubble } from './shared/RationaleBubble'
import { ReferenceBubble } from './shared/ReferenceBubble'
import { ChoiceInputBar } from './shared/InputBar'
import { calculateWells, type WellsInput } from '../../calculators/wells'

type Step = 'intro' | 'dvtSigns' | 'tepMoreLikely' | 'heartRate' | 'immobilization' | 'previousDvtPe' | 'hemoptysis' | 'malignancy' | 'result'

interface Message {
  id: string
  role: 'assistant' | 'user'
  content: string
}

const TOTAL_STEPS = 7

interface Props {
  onBack: () => void
}

export function WellsCalculator({ onBack }: Props) {
  const [step, setStep] = useState<Step>('dvtSigns')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        'Olá! Vou ajudá-lo a aplicar o **Escore de Wells para TEP**, que estima a probabilidade pré-teste de tromboembolismo pulmonar.\n\nResponda Sim ou Não para cada critério clínico.',
    },
    {
      id: '2',
      role: 'assistant',
      content: 'O paciente apresenta **sinais e sintomas clínicos de TVP** (edema de MMII, dor à palpação)? (+3 pontos)',
    },
  ])
  const [typing, setTyping] = useState(false)
  const [data, setData] = useState<Partial<WellsInput>>({})
  const [stepIndex, setStepIndex] = useState(1)

  const addMessage = useCallback((role: 'assistant' | 'user', content: string) => {
    setMessages((prev) => [...prev, { id: Date.now().toString(), role, content }])
  }, [])

  const advance = useCallback(
    (userAnswer: string, nextMsg: string, nextStep: Step, nextIndex: number) => {
      addMessage('user', userAnswer)
      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        addMessage('assistant', nextMsg)
        setStep(nextStep)
        setStepIndex(nextIndex)
      }, 700)
    },
    [addMessage]
  )

  function handleDvtSigns(value: string) {
    setData((d) => ({ ...d, dvtSigns: value === 'yes' }))
    advance(value === 'yes' ? 'Sim' : 'Não', 'O **TEP é o diagnóstico mais provável** dentre os diagnósticos alternativos? (+3 pontos)', 'tepMoreLikely', 2)
  }

  function handleTepMoreLikely(value: string) {
    setData((d) => ({ ...d, tepMoreLikely: value === 'yes' }))
    advance(value === 'yes' ? 'Sim' : 'Não', 'A **FC está acima de 100 bpm**? (+1,5 pontos)', 'heartRate', 3)
  }

  function handleHeartRate(value: string) {
    setData((d) => ({ ...d, heartRate: value === 'yes' }))
    advance(value === 'yes' ? 'Sim' : 'Não', 'O paciente esteve **imobilizado ≥3 dias ou realizou cirurgia nas últimas 4 semanas**? (+1,5 pontos)', 'immobilization', 4)
  }

  function handleImmobilization(value: string) {
    setData((d) => ({ ...d, immobilization: value === 'yes' }))
    advance(value === 'yes' ? 'Sim' : 'Não', 'O paciente tem **TVP ou TEP prévios**? (+1,5 pontos)', 'previousDvtPe', 5)
  }

  function handlePreviousDvtPe(value: string) {
    setData((d) => ({ ...d, previousDvtPe: value === 'yes' }))
    advance(value === 'yes' ? 'Sim' : 'Não', 'O paciente apresenta **hemoptise**? (+1 ponto)', 'hemoptysis', 6)
  }

  function handleHemoptysis(value: string) {
    setData((d) => ({ ...d, hemoptysis: value === 'yes' }))
    advance(value === 'yes' ? 'Sim' : 'Não', 'O paciente tem **neoplasia ativa** (tratamento nos últimos 6 meses ou paliativo)? (+1 ponto)', 'malignancy', 7)
  }

  function handleMalignancy(value: string) {
    const finalData = { ...data, malignancy: value === 'yes' } as WellsInput
    setData(finalData)
    addMessage('user', value === 'yes' ? 'Sim' : 'Não')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setStep('result')
      setStepIndex(8)
    }, 900)
  }

  function handleReset() {
    setStep('intro')
    setStepIndex(1)
    setData({})
    setMessages([
      { id: '1', role: 'assistant', content: 'Olá! Vou ajudá-lo a aplicar o **Escore de Wells para TEP**, que estima a probabilidade pré-teste de tromboembolismo pulmonar.\n\nResponda Sim ou Não para cada critério clínico.' },
      { id: '2', role: 'assistant', content: 'O paciente apresenta **sinais e sintomas clínicos de TVP** (edema de MMII, dor à palpação)? (+3 pontos)' },
    ])
    setStep('dvtSigns')
  }

  const result = step === 'result' ? calculateWells(data as WellsInput) : null
  const progress = Math.min(stepIndex / TOTAL_STEPS, 1)

  const inputArea = (() => {
    if (typing || step === 'result') return null
    switch (step) {
      case 'dvtSigns': return <ChoiceInputBar options={[{ label: 'Sim', value: 'yes', points: '+3 pts' }, { label: 'Não', value: 'no', points: '0 pts' }]} onSelect={handleDvtSigns} />
      case 'tepMoreLikely': return <ChoiceInputBar options={[{ label: 'Sim', value: 'yes', points: '+3 pts' }, { label: 'Não', value: 'no', points: '0 pts' }]} onSelect={handleTepMoreLikely} />
      case 'heartRate': return <ChoiceInputBar options={[{ label: 'Sim', value: 'yes', points: '+1,5 pts' }, { label: 'Não', value: 'no', points: '0 pts' }]} onSelect={handleHeartRate} />
      case 'immobilization': return <ChoiceInputBar options={[{ label: 'Sim', value: 'yes', points: '+1,5 pts' }, { label: 'Não', value: 'no', points: '0 pts' }]} onSelect={handleImmobilization} />
      case 'previousDvtPe': return <ChoiceInputBar options={[{ label: 'Sim', value: 'yes', points: '+1,5 pts' }, { label: 'Não', value: 'no', points: '0 pts' }]} onSelect={handlePreviousDvtPe} />
      case 'hemoptysis': return <ChoiceInputBar options={[{ label: 'Sim', value: 'yes', points: '+1 pt' }, { label: 'Não', value: 'no', points: '0 pts' }]} onSelect={handleHemoptysis} />
      case 'malignancy': return <ChoiceInputBar options={[{ label: 'Sim', value: 'yes', points: '+1 pt' }, { label: 'Não', value: 'no', points: '0 pts' }]} onSelect={handleMalignancy} />
      default: return null
    }
  })()

  return (
    <ChatShell
      subtitle="Escore de Wells · TEP"
      progress={progress}
      onBack={onBack}
      onReset={handleReset}
      inputArea={inputArea}
    >
      {messages.map((msg) => (
        <MessageBubble key={msg.id} role={msg.role}>{msg.content}</MessageBubble>
      ))}
      {typing && <TypingIndicator />}
      {result && (
        <>
          <ResultBubble
            mainValue={`${result.score}`}
            mainLabel={result.label3}
            subLabel={`Probabilidade de TEP: ${result.probability3}`}
            badge={result.label2}
            classification={result.classification3}
            summary={result.recommendation}
            onPrint={() => window.print()}
          />
          <RationaleBubble>
            O Escore de Wells para TEP classifica a probabilidade pré-teste em 3 níveis (0–1 baixa, 2–6 intermediária, ≥7 alta) e 2 níveis (≤4 improvável, &gt;4 provável). Guia a indicação de D-dímero ou angiotomografia de tórax. Validado em múltiplas coortes prospectivas.
          </RationaleBubble>
          <ReferenceBubble
            title="Diretriz de Trombose Venosa Profunda – SBACV"
            domain="sbacv.org.br · PDF oficial"
            url="https://sbacv.org.br/wp-content/uploads/2018/02/trombose-venosa-profunda.pdf"
          />
        </>
      )}
    </ChatShell>
  )
}
