'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Globe } from 'lucide-react'
import { CURRENCY_LABEL, useCurrency, type Currency } from '@/lib/currency'
import { useMounted } from '@/lib/hooks/use-mounted'
import { cn } from '@/lib/utils'

const OPTIONS: { code: Currency; hint: string }[] = [
  { code: 'XOF', hint: 'Franc CFA' },
  { code: 'EUR', hint: 'Euro' },
  { code: 'USD', hint: 'Dollar US' },
]

export function CurrencySwitcher({ tone = 'light', className }: { tone?: 'light' | 'dark'; className?: string }) {
  const { currency, setCurrency } = useCurrency()
  const mounted = useMounted()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = mounted ? currency : 'XOF'

  useEffect(() => {
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex h-11 items-center gap-1.5 rounded-full px-3 text-[0.6875rem] font-medium uppercase tracking-[0.14em] transition-colors',
          tone === 'dark' ? 'text-cream-white/80 hover:bg-cream-white/10' : 'hover:bg-warm-100',
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Choisir la devise d’affichage"
      >
        <Globe size={15} strokeWidth={1.5} />
        {CURRENCY_LABEL[current].split(' ')[0]}
        <ChevronDown size={13} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className={cn(
              'absolute z-50 mt-2 w-48 overflow-hidden rounded-soft border border-warm-200 bg-cream-white p-1 text-deep-black shadow-luxe',
              tone === 'dark' ? 'bottom-full mb-2 left-0' : 'right-0 top-full',
            )}
          >
            {OPTIONS.map((o) => (
              <li key={o.code}>
                <button
                  role="option"
                  aria-selected={current === o.code}
                  onClick={() => {
                    setCurrency(o.code)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-colors hover:bg-warm-100',
                    current === o.code && 'bg-warm-100',
                  )}
                >
                  <span>{o.hint}</span>
                  <span className="price text-xs text-warm-500">{CURRENCY_LABEL[o.code]}</span>
                </button>
              </li>
            ))}
            <li className="px-3 pb-2 pt-1 text-[0.6875rem] leading-snug text-warm-500">Paiement en FCFA, montants convertis à titre indicatif.</li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
