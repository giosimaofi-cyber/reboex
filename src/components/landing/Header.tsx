import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { MotionButton } from '../ui/MotionButton'
import logoSvg from '../../assets/logo.svg'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <header
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
      }}
    >
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logoSvg} alt="Vírgula Labs" className="h-8 w-auto" />
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollTo('como-funciona')}
            className="text-sm text-neutral-600 hover:text-black transition-colors"
          >
            Como funciona
          </button>
          <button
            onClick={() => scrollTo('calculadoras')}
            className="text-sm text-neutral-600 hover:text-black transition-colors"
          >
            Calculadoras
          </button>
          <MotionButton label="Acessar" onClick={() => scrollTo('calculadoras')} />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-neutral-600"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-4 pb-4 flex flex-col gap-3"
          style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
        >
          <button
            onClick={() => scrollTo('como-funciona')}
            className="text-left py-2 text-sm text-neutral-600 hover:text-black transition-colors"
          >
            Como funciona
          </button>
          <button
            onClick={() => scrollTo('calculadoras')}
            className="text-left py-2 text-sm text-neutral-600 hover:text-black transition-colors"
          >
            Calculadoras
          </button>
          <MotionButton label="Acessar" onClick={() => scrollTo('calculadoras')} className="w-full" />
        </div>
      )}
    </header>
  )
}
