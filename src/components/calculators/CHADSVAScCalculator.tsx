import { useState, useCallback } from 'react'
import { ChatShell } from './shared/ChatShell'
import { MessageBubble, TypingIndicator } from './shared/MessageBubble'
import { ResultBubble } from './shared/ResultBubble'
import { RationaleBubble } from './shared/RationaleBubble'
import { ReferenceBubble } from './shared/ReferenceBubble'
import { NumericInputBar, ChoiceInputBar } from './shared/InputBar'
import { calculateCHADSVASc, type CHADSVAScInput } from '../../calculators/chadsvasc'

type Step = 'intro' | 'age' | 'sex' | 'heartFailure' | 'hypertension' | 'diabetes' | 'strokeHistory' | 'vascularDisease' | 'result'

interface Message {
  id: string
  role: 'assistant' | 'user'
  content: string
}

const TOTAL_STEPS = 7

interface Props {
  onBack: () => void
}

export function CHADSVAScCalculator({ onBack }: Props) {
  const [step, setStep] = useState<Step>('age')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        'Olá! Vou ajudá-lo a calcular o **CHA₂DS₂-VASc**, que estima o risco anual de AVC em pacientes com Fibrilação Atrial não valvar.\n\nVamos começar.',
    },
    {
      id: '2',
      role: 'assistant',
      content: 'Qual a **idade** do paciente?',
    },
  ])
  const [typing, setTyping] = useState(false)
  const [data, setData] = useState<Partial<CHADSVAScInput>>({})
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

  function handleAge(value: number) {
    setData((d) => ({ ...d, age: value }))
    advance(`${value} anos`, 'Qual o **sexo biológico** do paciente?', 'sex', 2)
  }

  function handleSex(value: string) {
    setData((d) => ({ ...d, sex: value as 'male' | 'female' }))
    advance(
      value === 'male' ? 'Masculino' : 'Feminino',
      'O paciente possui **insuficiência cardíaca** ou disfunção sistólica do VE? (+1 ponto)',
      'heartFailure',
      3
    )
  }

  function handleHeartFailure(value: string) {
    setData((d) => ({ ...d, heartFailure: value === 'yes' }))
    advance(
      value === 'yes' ? 'Sim' : 'Não',
      'O paciente é **hipertenso**? (+1 ponto)',
      'hypertension',
      4
    )
  }

  function handleHypertension(value: string) {
    setData((d) => ({ ...d, hypertension: value === 'yes' }))
    advance(
      value === 'yes' ? 'Sim' : 'Não',
      'O paciente tem **diabetes mellitus**? (+1 ponto)',
      'diabetes',
      5
    )
  }

  function handleDiabetes(value: string) {
    setData((d) => ({ ...d, diabetes: value === 'yes' }))
    advance(
      value === 'yes' ? 'Sim' : 'Não',
      'O paciente tem **AVC, AIT ou tromboembolismo prévio**? (+2 pontos)',
      'strokeHistory',
      6
    )
  }

  function handleStrokeHistory(value: string) {
    setData((d) => ({ ...d, strokeHistory: value === 'yes' }))
    advance(
      value === 'yes' ? 'Sim' : 'Não',
      'O paciente tem **doença vascular** (IAM prévio, DAP ou placa aórtica)? (+1 ponto)',
      'vascularDisease',
      7
    )
  }

  function handleVascularDisease(value: string) {
    const finalData = { ...data, vascularDisease: value === 'yes' } as CHADSVAScInput
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
      { id: '1', role: 'assistant', content: 'Olá! Vou ajudá-lo a calcular o **CHA₂DS₂-VASc**, que estima o risco anual de AVC em pacientes com Fibrilação Atrial não valvar.\n\nVamos começar.' },
      { id: '2', role: 'assistant', content: 'Qual a **idade** do paciente?' },
    ])
    setStep('age')
  }

  const result = step === 'result' ? calculateCHADSVASc(data as CHADSVAScInput) : null
  const progress = Math.min(stepIndex / TOTAL_STEPS, 1)

  const inputArea = (() => {
    if (typing || step === 'result') return null
    const yesNo = [{ label: 'Sim', value: 'yes' }, { label: 'Não', value: 'no' }]
    switch (step) {
      case 'age': return <NumericInputBar placeholder="Ex: 72" suffix="anos" min={18} max={110} onSubmit={handleAge} />
      case 'sex': return <ChoiceInputBar options={[{ label: 'Masculino', value: 'male' }, { label: 'Feminino', value: 'female' }]} onSelect={handleSex} />
      case 'heartFailure': return <ChoiceInputBar options={yesNo} onSelect={handleHeartFailure} />
      case 'hypertension': return <ChoiceInputBar options={yesNo} onSelect={handleHypertension} />
      case 'diabetes': return <ChoiceInputBar options={yesNo} onSelect={handleDiabetes} />
      case 'strokeHistory': return <ChoiceInputBar options={yesNo} onSelect={handleStrokeHistory} />
      case 'vascularDisease': return <ChoiceInputBar options={yesNo} onSelect={handleVascularDisease} />
      default: return null
    }
  })()

  return (
    <ChatShell
      subtitle="CHA₂DS₂-VASc"
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
            mainValue={`${result.annualStrokeRisk}%`}
            mainLabel="Risco anual de AVC"
            subLabel={`CHA₂DS₂-VASc: ${result.score}/9 pontos`}
            badge={result.label}
            classification={result.classification}
            summary={result.recommendation}
            onPrint={() => window.print()}
          />
          <RationaleBubble>
            O CHA₂DS₂-VASc estratifica o risco tromboembólico em pacientes com FA não valvar. Pontuação 0 = risco baixo (anticoagulação não indicada); 1 = considerar; ≥2 = anticoagulação oral recomendada. O sexo feminino adiciona 1 ponto, mas não indica anticoagulação isoladamente (score feminino isolado = 0).
          </RationaleBubble>
          <ReferenceBubble
            title="Diretriz Brasileira de Fibrilação Atrial – SBC"
            domain="abccardiol.org · PDF oficial"
            url="https://abccardiol.org/wp-content/uploads/articles_xml/0066-782X-abc-122-09-e20250618/0066-782X-abc-122-09-e20250618.x74770.pdf"
          />
        </>
      )}
    </ChatShell>
  )
}
