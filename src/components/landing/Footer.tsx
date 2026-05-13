import logoSvg from '../../assets/logo.svg'

export function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-100 py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <img src={logoSvg} alt="Vírgula Labs" className="h-8 w-auto" />
        <p className="text-neutral-400 text-xs text-center md:text-right max-w-sm leading-relaxed">
          Esta ferramenta é de apoio educacional e não substitui avaliação médica. Os resultados devem ser interpretados por profissional de saúde habilitado.
        </p>
      </div>
      <div className="text-center text-neutral-300 text-xs mt-6">
        © 2026 Vírgula Labs · Todas as calculadoras baseadas em diretrizes públicas
      </div>
    </footer>
  )
}
