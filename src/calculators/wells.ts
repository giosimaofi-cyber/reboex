// Escore de Wells para TEP (Tromboembolismo Pulmonar)
// Diretriz de Trombose Venosa Profunda — SBACV

export interface WellsInput {
  dvtSigns: boolean          // Sinais e sintomas de TVP (+3)
  tepMoreLikely: boolean     // TEP mais provável que diagnóstico alternativo (+3)
  heartRate: boolean         // FC > 100 bpm (+1.5)
  immobilization: boolean    // Imobilização ≥3 dias ou cirurgia nas últimas 4 semanas (+1.5)
  previousDvtPe: boolean     // TVP ou TEP prévio (+1.5)
  hemoptysis: boolean        // Hemoptise (+1)
  malignancy: boolean        // Neoplasia ativa (+1)
}

export interface WellsResult {
  score: number
  classification3: 'baixa' | 'intermediária' | 'alta'
  label3: string
  probability3: string
  classification2: 'improvável' | 'provável'
  label2: string
  recommendation: string
}

export function calculateWells(input: WellsInput): WellsResult {
  let score = 0

  if (input.dvtSigns) score += 3
  if (input.tepMoreLikely) score += 3
  if (input.heartRate) score += 1.5
  if (input.immobilization) score += 1.5
  if (input.previousDvtPe) score += 1.5
  if (input.hemoptysis) score += 1
  if (input.malignancy) score += 1

  // Classificação 3 níveis
  let classification3: WellsResult['classification3']
  let label3: string
  let probability3: string

  if (score <= 1) {
    classification3 = 'baixa'
    label3 = 'Probabilidade Baixa'
    probability3 = '~1.3%'
  } else if (score <= 6) {
    classification3 = 'intermediária'
    label3 = 'Probabilidade Intermediária'
    probability3 = '~16.2%'
  } else {
    classification3 = 'alta'
    label3 = 'Probabilidade Alta'
    probability3 = '~37.5%'
  }

  // Classificação 2 níveis
  const classification2: WellsResult['classification2'] = score <= 4 ? 'improvável' : 'provável'
  const label2 = score <= 4 ? 'TEP Improvável (≤4)' : 'TEP Provável (>4)'

  let recommendation: string
  if (score <= 4) {
    recommendation = 'Considerar D-dímero. Se negativo, TEP excluído.'
  } else {
    recommendation = 'Angiotomografia de tórax indicada para confirmação diagnóstica.'
  }

  return {
    score,
    classification3,
    label3,
    probability3,
    classification2,
    label2,
    recommendation,
  }
}
