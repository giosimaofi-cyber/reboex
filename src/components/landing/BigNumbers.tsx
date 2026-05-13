import { Section } from '../ui/Section'

const stats = [
  { value: 'R$ 0', label: '100% gratuito', sub: 'Sem assinatura, sem freemium, sem ads' },
  { value: '3', label: 'calculadoras validadas', sub: 'Framingham · CHA₂DS₂-VASc · Wells' },
  { value: '100%', label: 'client-side', sub: 'Nenhum dado sai do navegador' },
  { value: 'SBC', label: 'diretrizes brasileiras', sub: 'Referências oficiais em cada resultado' },
]

export function BigNumbers() {
  return (
    <Section className="py-20 bg-black">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.value} className="text-center">
              <div className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-none">
                {stat.value}
              </div>
              <div className="text-white/60 font-medium mt-2 text-sm">{stat.label}</div>
              <div className="text-white/30 text-xs mt-1 leading-tight">{stat.sub}</div>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/40 text-sm max-w-lg mx-auto">
          Tabelas de pontuação auditáveis, código aberto, validação contra MDCalc. Feito por profissionais de saúde, para profissionais de saúde.
        </div>
      </div>
    </Section>
  )
}
