# CLAUDE.md — Vírgula Labs: Calculadoras Clínicas

> Contexto específico deste repositório. Complementa o `~/.claude/CLAUDE.md` global.

---

## Contexto

**Produto:** Portal de calculadoras clínicas com UX conversacional (chat guiado), voltado para profissionais de saúde, que permite calcular scores de risco de forma fluida e referenciada, auxiliando na tomada de decisão clínica.
**Tipo:** web
**Estágio:** MVP
**Entregável desta sessão:** Landing page completa (6 seções) + 3 calculadoras clínicas funcionais (Framingham, CHA₂DS₂-VASc, Wells TEP)

---

## Stack

- **Framework:** React 18 + Vite (monorepo client-side, sem backend)
- **Linguagem:** TypeScript (sem `any` salvo em casos documentados)
- **Estilo:** Tailwind CSS
- **Animação:** Framer Motion 11
- **Ícones:** lucide-react
- **Utilitários:** clsx + tailwind-merge (via `cn()` helper em `src/lib/utils.ts`)
- **Deploy:** Vercel / Netlify (build estático)
- **Fontes:** Geist (body/UI) + Instrument Serif (números das calculadoras) via Google Fonts

---

## Estrutura de pastas

```
src/
├── App.tsx                         # Navegação por estado (sem react-router)
├── main.tsx
├── index.css                       # Tailwind + @import fontes Google
├── lib/
│   └── utils.ts                    # cn() helper
├── components/
│   ├── landing/
│   │   ├── Header.tsx              # Sticky, glassmorphism
│   │   ├── HeroSection.tsx         # ContainerScroll 3D com vídeo
│   │   ├── ComparisonSlider.tsx    # Slider antes/depois drag/touch
│   │   ├── HowItWorks.tsx          # Stepper 3 passos acessível
│   │   ├── CalculatorsSection.tsx  # Card stack animado
│   │   ├── BigNumbers.tsx          # Stats fundo preto
│   │   └── Footer.tsx              # Disclaimer + marca
│   ├── calculators/
│   │   ├── shared/
│   │   │   ├── ChatShell.tsx       # Layout das calculadoras
│   │   │   ├── Avatar.tsx          # Orb gradient + Sparkles
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── ResultBubble.tsx    # Card resultado com classificação
│   │   │   ├── RationaleBubble.tsx
│   │   │   ├── ReferenceBubble.tsx
│   │   │   ├── InputBar.tsx        # Input numérico / choice buttons
│   │   │   └── MeshBackground.tsx  # Blobs animados + grain + vinheta
│   │   ├── FraminghamCalculator.tsx
│   │   ├── CHADSVAScCalculator.tsx
│   │   └── WellsCalculator.tsx
│   └── ui/
│       ├── MotionButton.tsx        # Botão CTA com círculo expansível
│       ├── Stepper.tsx
│       └── Section.tsx             # Wrapper com reveal on scroll
├── calculators/                    # Lógica pura (sem UI)
│   ├── framingham.ts               # Tabelas NCEP ATP III 2002
│   ├── chadsvasc.ts
│   └── wells.ts
└── assets/
    ├── logo.svg                    # Logo Vírgula Labs (disponível)
    ├── hero-video.mp4              # Placeholder até fornecido
    ├── card-framingham.jpg         # Imagem médica disponível
    ├── card-chadsvasc.jpg          # Imagem médica disponível
    └── card-wells.jpg              # Imagem médica disponível
```

---

## Variáveis de ambiente

Documentadas em `.env.example`. Nunca listar valores reais aqui.

Projeto é 100% client-side — sem variáveis de ambiente necessárias no MVP.

---

## Escopo desta sessão

**Incluído:**
- [ ] Landing page com 6 seções (Header, Hero, ComparisonSlider, HowItWorks, CalculatorsSection, BigNumbers + Footer)
- [ ] Calculadora Framingham (ATP III) — lógica + UX conversacional
- [ ] Calculadora CHA₂DS₂-VASc — lógica + UX conversacional
- [ ] Calculadora Wells TEP — lógica + UX conversacional
- [ ] Navegação por estado (landing ↔ calculadoras, sem react-router)
- [ ] Design system compartilhado das calculadoras (ChatShell, bubbles, InputBar, etc.)
- [ ] Assets integrados: logo.svg, imagens dos cards (disponíveis), placeholder para hero-video.mp4

**Fora do escopo:**
Nada por enquanto.

---

## Decisões técnicas

| Decisão | Escolha | Motivo |
|---|---|---|
| Navegação | Estado local (`useState`) sem react-router | Projeto single-page sem rotas reais; simplifica build estático |
| Cálculo | Client-side puro (`src/calculators/*.ts`) | Zero backend, privacidade total do paciente, deploy estático |
| Animação | Framer Motion (useMotionValue + useSpring) | Slider de comparação e card stack exigem spring physics suave |
| Tema dark | Apenas nas calculadoras (`bg-[#08040c]`) | Landing é light; contraste claro entre os dois contextos |

---

## O que não fazer neste projeto

- Não adicionar backend, API ou banco de dados (MVP é 100% client-side)
- Não usar react-router ou qualquer lib de roteamento
- Não enviar dados de pacientes para nenhum servidor
- Não implementar login, cadastro ou persistência entre sessões
- Não usar `any` em TypeScript sem comentário justificando

---

## Checklist pré-código

- [ ] `.env.example` criado (placeholder — projeto não usa env vars no MVP)
- [ ] Vite + React + TypeScript inicializado (`npm create vite@latest`)
- [ ] Tailwind CSS configurado
- [ ] Framer Motion + lucide-react instalados
- [ ] Fontes Google importadas no `index.css`
- [ ] Assets copiados para `src/assets/`
- [ ] Build passando sem erros (`npm run build`)
