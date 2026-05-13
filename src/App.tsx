import { useState } from 'react'
import { LandingPage } from './components/landing/LandingPage'
import { FraminghamCalculator } from './components/calculators/FraminghamCalculator'
import { CHADSVAScCalculator } from './components/calculators/CHADSVAScCalculator'
import { WellsCalculator } from './components/calculators/WellsCalculator'

type Page = 'landing' | 'framingham' | 'chadsvasc' | 'wells'

const pageMap: Record<number, Page> = {
  1: 'framingham',
  2: 'chadsvasc',
  3: 'wells',
}

export default function App() {
  const [page, setPage] = useState<Page>('landing')

  if (page === 'framingham') {
    return <FraminghamCalculator onBack={() => setPage('landing')} />
  }
  if (page === 'chadsvasc') {
    return <CHADSVAScCalculator onBack={() => setPage('landing')} />
  }
  if (page === 'wells') {
    return <WellsCalculator onBack={() => setPage('landing')} />
  }

  return (
    <LandingPage
      onOpenCalculator={(id) => {
        const target = pageMap[id]
        if (target) setPage(target)
      }}
    />
  )
}
