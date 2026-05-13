import { Header } from './Header'
import { HeroSection } from './HeroSection'
import { ComparisonSlider } from './ComparisonSlider'
import { HowItWorks } from './HowItWorks'
import { CalculatorsSection } from './CalculatorsSection'
import { BigNumbers } from './BigNumbers'
import { Footer } from './Footer'

interface Props {
  onOpenCalculator: (id: number) => void
}

export function LandingPage({ onOpenCalculator }: Props) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ComparisonSlider />
        <HowItWorks />
        <CalculatorsSection onOpenCalculator={onOpenCalculator} />
        <BigNumbers />
      </main>
      <Footer />
    </div>
  )
}
