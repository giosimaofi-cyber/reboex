// Framingham Risk Score — NCEP ATP III (2002)
// Tabelas oficiais separadas por sexo

export interface FraminghamInput {
  age: number
  sex: 'male' | 'female'
  totalCholesterol: number // mg/dL
  hdl: number // mg/dL
  sbp: number // mmHg — pressão arterial sistólica
  bpTreated: boolean
  smoker: boolean
}

export interface FraminghamResult {
  points: number
  riskPercent: number
  classification: 'baixo' | 'intermediário' | 'alto'
  label: string
}

// Pontos por idade — masculino
const agePointsMale: [number, number, number][] = [
  // [minAge, maxAge, points]
  [20, 34, -9],
  [35, 39, -4],
  [40, 44, 0],
  [45, 49, 3],
  [50, 54, 6],
  [55, 59, 8],
  [60, 64, 10],
  [65, 69, 11],
  [70, 74, 12],
  [75, 79, 13],
]

// Pontos por idade — feminino
const agePointsFemale: [number, number, number][] = [
  [20, 34, -7],
  [35, 39, -3],
  [40, 44, 0],
  [45, 49, 3],
  [50, 54, 6],
  [55, 59, 8],
  [60, 64, 10],
  [65, 69, 12],
  [70, 74, 14],
  [75, 79, 16],
]

// Pontos por colesterol total (mg/dL) por faixa etária — masculino
// [ageGroup: 20-39, 40-49, 50-59, 60-69, 70-79]
const cholPointsMale: [number, number, number, number, number, number, number][] = [
  // [minCholesterol, maxCholesterol, pts20-39, pts40-49, pts50-59, pts60-69, pts70-79]
  [0, 159, 0, 0, 0, 0, 0],
  [160, 199, 4, 3, 2, 1, 0],
  [200, 239, 7, 5, 3, 1, 0],
  [240, 279, 9, 6, 4, 2, 1],
  [280, 999, 11, 8, 5, 3, 1],
]

// Pontos por colesterol total — feminino
const cholPointsFemale: [number, number, number, number, number, number, number][] = [
  [0, 159, 0, 0, 0, 0, 0],
  [160, 199, 4, 3, 2, 1, 1],
  [200, 239, 8, 6, 4, 2, 1],
  [240, 279, 11, 8, 5, 3, 2],
  [280, 999, 13, 10, 7, 4, 2],
]

// Pontos por HDL
const hdlPoints: [number, number, number][] = [
  [60, 999, -1],
  [50, 59, 0],
  [40, 49, 1],
  [0, 39, 2],
]

// Pontos por PAS masculino [não tratado, tratado]
const sbpPointsMale: [number, number, number, number][] = [
  // [minSBP, maxSBP, untreated, treated]
  [0, 119, 0, 0],
  [120, 129, 0, 1],
  [130, 139, 1, 2],
  [140, 159, 1, 2],
  [160, 999, 2, 3],
]

// Pontos por PAS feminino
const sbpPointsFemale: [number, number, number, number][] = [
  [0, 119, 0, 0],
  [120, 129, 1, 3],
  [130, 139, 2, 4],
  [140, 149, 3, 5],
  [150, 159, 4, 5],
  [160, 999, 4, 6],
]

// Pontos por tabagismo por faixa etária — masculino [20-39, 40-49, 50-59, 60-69, 70-79]
const smokingPointsMale = [8, 5, 3, 1, 1]

// Pontos por tabagismo — feminino
const smokingPointsFemale = [9, 7, 4, 2, 1]

// Risco 10 anos por pontuação — masculino
const riskByPointsMale: Record<number, number> = {
  [-100]: 1, [-9]: 1, [-8]: 1, [-7]: 1, [-6]: 1, [-5]: 1,
  [-4]: 1, [-3]: 1, [-2]: 1, [-1]: 1, 0: 1,
  1: 1, 2: 1, 3: 1, 4: 1, 5: 1,
  6: 2, 7: 3, 8: 4, 9: 5, 10: 6,
  11: 8, 12: 10, 13: 12, 14: 16, 15: 20,
  16: 25, 17: 30,
}

// Mapa feminino oficial (diferente do masculino)
const riskFemaleOfficial: Record<number, number> = {
  9: 1, 10: 1, 11: 1, 12: 1, 13: 2, 14: 2,
  15: 3, 16: 4, 17: 5, 18: 6, 19: 8, 20: 11,
  21: 14, 22: 17, 23: 22, 24: 27,
}

function getAgeGroup(age: number): number {
  if (age <= 39) return 0
  if (age <= 49) return 1
  if (age <= 59) return 2
  if (age <= 69) return 3
  return 4
}

function lookupRange<T>(
  value: number,
  table: [number, number, ...T[]][],
  colIndex: number
): T {
  for (const row of table) {
    if (value >= row[0] && value <= row[1]) {
      return row[colIndex] as T
    }
  }
  return table[table.length - 1][colIndex] as T
}

export function calculateFramingham(input: FraminghamInput): FraminghamResult {
  const { age, sex, totalCholesterol, hdl, sbp, bpTreated, smoker } = input
  const ageGroup = getAgeGroup(age)
  const isMale = sex === 'male'

  // Pontos por idade
  const ageTable = isMale ? agePointsMale : agePointsFemale
  const agePoints = lookupRange(age, ageTable as [number, number, number][], 2)

  // Pontos por colesterol
  const cholTable = isMale ? cholPointsMale : cholPointsFemale
  const cholPoints = lookupRange(
    totalCholesterol,
    cholTable as [number, number, number, number, number, number, number][],
    2 + ageGroup
  ) as number

  // Pontos por HDL
  const hdlPts = lookupRange(hdl, hdlPoints as [number, number, number][], 2)

  // Pontos por PAS
  const sbpTable = isMale ? sbpPointsMale : sbpPointsFemale
  const sbpCol = bpTreated ? 3 : 2
  const sbpPts = lookupRange(sbp, sbpTable as [number, number, number, number][], sbpCol)

  // Pontos por tabagismo
  let smokerPts = 0
  if (smoker) {
    smokerPts = isMale ? smokingPointsMale[ageGroup] : smokingPointsFemale[ageGroup]
  }

  const total = agePoints + cholPoints + hdlPts + sbpPts + smokerPts

  // Risco percentual
  let riskPercent: number
  if (isMale) {
    const clamped = Math.min(Math.max(total, -100), 17)
    riskPercent = riskByPointsMale[clamped] ?? (total >= 17 ? 30 : 1)
  } else {
    const clamped = Math.min(Math.max(total, 9), 24)
    riskPercent = riskFemaleOfficial[clamped] ?? (total >= 24 ? 27 : 1)
  }

  let classification: FraminghamResult['classification']
  let label: string
  if (riskPercent < 10) {
    classification = 'baixo'
    label = 'Risco Baixo'
  } else if (riskPercent <= 20) {
    classification = 'intermediário'
    label = 'Risco Intermediário'
  } else {
    classification = 'alto'
    label = 'Risco Alto'
  }

  return { points: total, riskPercent, classification, label }
}
