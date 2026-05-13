import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Section } from '../ui/Section'
import cardFramingham from '../../assets/card-framingham.jpg'
import cardChadsvasc from '../../assets/card-chadsvasc.jpg'
import cardWells from '../../assets/card-wells.jpg'

interface CardData {
  id: number
  title: string
  subtitle: string
  tag: string
  image: string
  gradient: string
}

const cards: CardData[] = [
  {
    id: 1,
    title: 'Framingham',
    subtitle: 'Risco Cardiovascular em 10 anos',
    tag: 'Cardiologia',
    image: cardFramingham,
    gradient: 'from-rose-400 to-rose-600',
  },
  {
    id: 2,
    title: 'CHA₂DS₂-VASc',
    subtitle: 'Risco de AVC em Fibrilação Atrial',
    tag: 'Cardiologia',
    image: cardChadsvasc,
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    id: 3,
    title: 'Escore de Wells',
    subtitle: 'Probabilidade de TEP',
    tag: 'Emergência',
    image: cardWells,
    gradient: 'from-amber-400 to-amber-600',
  },
]

interface Props {
  onOpenCalculator: (id: number) => void
}

export function CalculatorsSection({ onOpenCalculator }: Props) {
  const [order, setOrder] = useState([0, 1, 2])

  function nextCard() {
    setOrder(([first, ...rest]) => [...rest, first])
  }

  return (
    <Section id="calculadoras" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Calculadoras</span>
          <h2 className="text-3xl md:text-4xl font-bold text-black mt-2">Validadas. Referenciadas.</h2>
          <p className="text-neutral-500 mt-3 max-w-md mx-auto text-sm">
            Cada calculadora cita a diretriz fonte e foi comparada com MDCalc e Whitebook.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative w-full max-w-sm" style={{ height: '420px' }}>
            <AnimatePresence mode="popLayout">
              {order.map((cardIndex, stackPos) => {
                const card = cards[cardIndex]
                const isTop = stackPos === 0
                const scale = 1 - stackPos * 0.05
                const y = stackPos * 12

                return (
                  <motion.div
                    key={card.id}
                    layout
                    initial={{ scale: 0.85, y: 40, opacity: 0 }}
                    animate={{ scale, y, opacity: 1, zIndex: 3 - stackPos }}
                    exit={{ scale: 0.8, y: 60, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="absolute inset-x-0 top-0 rounded-3xl overflow-hidden"
                    style={{ transformOrigin: 'top center' }}
                  >
                    <div className="relative h-96 flex flex-col">
                      {/* Imagem ou gradiente */}
                      <div className="absolute inset-0">
                        {card.image ? (
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${card.gradient}`} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </div>

                      {/* Conteúdo */}
                      <div className="relative flex-1 flex flex-col justify-end p-6">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white/90 text-xs mb-3 w-fit">
                          {card.tag}
                        </span>
                        <h3 className="text-white text-2xl font-bold leading-tight">{card.title}</h3>
                        <p className="text-white/70 text-sm mt-1 mb-4">{card.subtitle}</p>
                        {isTop && (
                          <motion.button
                            onClick={() => onOpenCalculator(card.id)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold w-fit hover:bg-white/90 transition-colors"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            Calcular
                            <ArrowRight size={14} />
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={nextCard}
            className="px-6 py-2.5 rounded-full border border-neutral-200 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            Próxima →
          </button>
        </div>
      </div>
    </Section>
  )
}
