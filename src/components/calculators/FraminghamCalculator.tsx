import { useState, useCallback } from 'react'
import { ChatShell } from './shared/ChatShell'
import { MessageBubble, TypingIndicator } from './shared/MessageBubble'
import { ResultBubble } from './shared/ResultBubble'
import { RationaleBubble } from './shared/RationaleBubble'
import { ReferenceBubble } from './shared/ReferenceBubble'
import { NumericInputBar, ChoiceInputBar } from './shared/InputBar'
import { calculateFramingham, type FraminghamInput } from '../../calculators/framingham'

type Step =
  | 'intro'
  | 'age'
  | 'sex'
  | 'totalCholesterol'
  | 'hdl'
  | 'sbp'
  | 'bpTreated'
  | 'smoker'
  | 'result'

interface Message {
  id: string
  role: 'assistant' | 'user'
  content: string
}

const TOTAL_STEPS = 7

interface Props {
  onBack: () => void
}

export function FraminghamCalculator({ onBack }: Props) {
  const [step, setStep] = useState<Step>('age')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        'Olá! Vou ajudá-lo a calcular o **Escore de Framingham** (ATP III), que estima o risco de evento cardiovascular nos próximos 10 anos.\n\nResponda às perguntas a seguir. Começo com a idade.',
    },
    {
      id: '2',
      role: 'assistant',
      content: 'Qual a **idade** do paciente? (30 a 79 anos)',
    },
  ])
  const [typing, setTyping] = useState(false)
  const [data, setData] = useState<Partial<FraminghamInput>>({})
  const [stepIndex, setStepIndex] = useState(1)

  const addMessage = useCallback((role: 'assistant' | 'user', content: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role, content },
    ])
  }, [])

  const advanceWithDelay = useCallback(
    (userAnswer: string, nextAssistantMsg: string, nextStep: Step, nextStepIndex: number) => {
      addMessage('user', userAnswer)
      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        addMessage('assistant', nextAssistantMsg)
        setStep(nextStep)
        setStepIndex(nextStepIndex)
      }, 700)
    },
    [addMessage]
  )

  function handleAge(value: number) {
    setData((d) => ({ ...d, age: value }))
    advanceWithDelay(
      `${value} anos`,
      'Qual o **sexo biológico** do paciente?',
      'sex',
      2
    )
  }

  function handleSex(value: string) {
    const sex = value as 'male' | 'female'
    setData((d) => ({ ...d, sex }))
    advanceWithDelay(
      value === 'male' ? 'Masculino' : 'Feminino',
      'Qual o **colesterol total** do paciente? (mg/dL)',
      'totalCholesterol',
      3
    )
  }

  function handleCholesterol(value: number) {
    setData((d) => ({ ...d, totalCholesterol: value }))
    advanceWithDelay(
      `${value} mg/dL`,
      'Qual o **HDL-colesterol**? (mg/dL)',
      'hdl',
      4
    )
  }

  function handleHdl(value: number) {
    setData((d) => ({ ...d, hdl: value }))
    advanceWithDelay(
      `${value} mg/dL`,
      'Qual a **pressão arterial sistólica** (PAS)? (mmHg)',
      'sbp',
      5
    )
  }

  function handleSbp(value: number) {
    setData((d) => ({ ...d, sbp: value }))
    advanceWithDelay(
      `${value} mmHg`,
      'O paciente está em **tratamento para hipertensão arterial**?',
      'bpTreated',
      6
    )
  }

  function handleBpTreated(value: string) {
    const treated = value === 'yes'
    setData((d) => ({ ...d, bpTreated: treated }))
    advanceWithDelay(
      treated ? 'Sim' : 'Não',
      'O paciente é **tabagista atual**?',
      'smoker',
      7
    )
  }

  function handleSmoker(value: string) {
    const smoker = value === 'yes'
    const finalData = { ...data, smoker } as FraminghamInput
    setData(finalData)
    addMessage('user', smoker ? 'Sim' : 'Não')
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
      {
        id: '1',
        role: 'assistant',
        content:
          'Olá! Vou ajudá-lo a calcular o **Escore de Framingham** (ATP III), que estima o risco de evento cardiovascular nos próximos 10 anos.\n\nResponda às perguntas a seguir. Começo com a idade.',
      },
      {
        id: '2',
        role: 'assistant',
        content: 'Qual a **idade** do paciente? (30 a 79 anos)',
      },
    ])
    setStep('age')
  }

  const result = step === 'result' ? calculateFramingham(data as FraminghamInput) : null
  const progress = Math.min(stepIndex / TOTAL_STEPS, 1)

  const inputArea = (() => {
    if (typing || step === 'result') return null
    switch (step) {
      case 'age':
        return <NumericInputBar placeholder="Ex: 55" suffix="anos" min={30} max={79} onSubmit={handleAge} />
      case 'sex':
        return (
          <ChoiceInputBar
            options={[
              { label: 'Masculino', value: 'male' },
              { label: 'Feminino', value: 'female' },
            ]}
            onSelect={handleSex}
          />
        )
      case 'totalCholesterol':
        return <NumericInputBar placeholder="Ex: 220" suffix="mg/dL" min={100} max={400} onSubmit={handleCholesterol} />
      case 'hdl':
        return <NumericInputBar placeholder="Ex: 45" suffix="mg/dL" min={20} max={100} onSubmit={handleHdl} />
      case 'sbp':
        return <NumericInputBar placeholder="Ex: 145" suffix="mmHg" min={80} max={220} onSubmit={handleSbp} />
      case 'bpTreated':
        return (
          <ChoiceInputBar
            options={[
              { label: 'Sim', value: 'yes' },
              { label: 'Não', value: 'no' },
            ]}
            onSelect={handleBpTreated}
          />
        )
      case 'smoker':
        return (
          <ChoiceInputBar
            options={[
              { label: 'Sim', value: 'yes' },
              { label: 'Não', value: 'no' },
            ]}
            onSelect={handleSmoker}
          />
        )
      default:
        return null
    }
  })()

  return (
    <ChatShell
      subtitle="Framingham · ATP III"
      progress={progress}
      onBack={onBack}
      onReset={handleReset}
      inputArea={inputArea}
    >
      {messages.map((msg) => (
        <MessageBubble key={msg.id} role={msg.role}>
          {msg.content}
        </MessageBubble>
      ))}
      {typing && <TypingIndicator />}
      {result && (
        <>
          <ResultBubble
            mainValue={`${result.riskPercent}%`}
            mainLabel={result.label}
            subLabel={`Risco cardiovascular em 10 anos · Pontuação: ${result.points}`}
            badge={result.classification === 'baixo' ? 'Baixo (<10%)' : result.classification === 'intermediário' ? 'Intermediário (10–20%)' : 'Alto (>20%)'}
            classification={result.classification}
            summary={`Escore de Framingham: ${result.points} pontos · Sexo: ${data.sex === 'male' ? 'Masculino' : 'Feminino'}`}
            onPrint={() => window.print()}
          />
          <RationaleBubble>
            O Escore de Framingham (NCEP ATP III, 2002) estima a probabilidade de infarto do miocárdio ou morte por doença coronariana em 10 anos. Utiliza variáveis demográficas e laboratoriais validadas em coortes populacionais. Classificação: &lt;10% baixo, 10–20% intermediário, &gt;20% alto.
          </RationaleBubble>
          <ReferenceBubble
            title="Diretriz Brasileira de Prevenção Cardiovascular – SBC"
            domain="publicacoes.cardiol.br · PDF oficial"
            url="http://publicacoes.cardiol.br/portal/abc/portugues/aop/2019/aop-diretriz-prevencao-cardiovascular-portugues.pdf"
          />
        </>
      )}
    </ChatShell>
  )
}
