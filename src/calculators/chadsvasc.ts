// CHA₂DS₂-VASc Score — Risco de AVC em Fibrilação Atrial
// Diretriz Brasileira de Fibrilação Atrial (SBC)

export interface CHADSVAScInput {
  age: number
  sex: 'male' | 'female'
  heartFailure: boolean
  hypertension: boolean
  diabetes: boolean
  strokeHistory: boolean
  vascularDisease: boolean
}

export interface CHADSVAScResult {
  score: number
  maxScore: 9
  annualStrokeRisk: number
  classification: 'baixo' | 'intermediário' | 'alto'
  label: string
  recommendation: string
}

// Risco anual de AVC (%) por pontuação — índice = pontuação
const annualStrokeRiskTable = [0, 1.3, 2.2, 3.2, 4.0, 6.7, 9.8, 9.6, 6.7, 15.2]

export function calculateCHADSVASc(input: CHADSVAScInput): CHADSVAScResult {
  const { age, sex, heartFailure, hypertension, diabetes, strokeHistory, vascularDisease } = input

  let score = 0

  // ICC / Disfunção sistólica VE
  if (heartFailure) score += 1

  // Hipertensão
  if (hypertension) score += 1

  // Idade ≥75 (+2) ou 65-74 (+1)
  if (age >= 75) score += 2
  else if (age >= 65) score += 1

  // Diabetes mellitus
  if (diabetes) score += 1

  // AVC/AIT/tromboembolismo prévio
  if (strokeHistory) score += 2

  // Doença vascular (IAM prévio, DAP, placa aórtica)
  if (vascularDisease) score += 1

  // Sexo feminino
  if (sex === 'female') score += 1

  const clamped = Math.min(score, 9)
  const annualStrokeRisk = annualStrokeRiskTable[clamped]

  let classification: CHADSVAScResult['classification']
  let label: string
  let recommendation: string

  if (score === 0) {
    classification = 'baixo'
    label = 'Risco Baixo'
    recommendation = 'Anticoagulação não recomendada'
  } else if (score === 1) {
    classification = 'intermediário'
    label = 'Risco Intermediário'
    recommendation = 'Considerar anticoagulação oral'
  } else {
    classification = 'alto'
    label = 'Risco Alto'
    recommendation = 'Anticoagulação oral recomendada'
  }

  return {
    score,
    maxScore: 9,
    annualStrokeRisk,
    classification,
    label,
    recommendation,
  }
}
