'use client'

import { formatMoney, useCurrency } from '@/lib/currency'
import { useMounted } from '@/lib/hooks/use-mounted'

/** Prix affiché dans la devise choisie par le visiteur (paiement toujours en FCFA). */
export function Price({ amount, className }: { amount: number; className?: string }) {
  const currency = useCurrency((s) => s.currency)
  const mounted = useMounted()
  const c = mounted ? currency : 'XOF'
  return (
    <span className={className} title={c === 'XOF' ? undefined : formatMoney(amount, 'XOF')}>
      {c === 'XOF' ? '' : '≈ '}
      {formatMoney(amount, c)}
    </span>
  )
}

/** Équivalent discret dans la devise choisie, à placer sous un montant en FCFA. */
export function PriceHint({ amount, className }: { amount: number; className?: string }) {
  const currency = useCurrency((s) => s.currency)
  const mounted = useMounted()
  if (!mounted || currency === 'XOF') return null
  return <span className={className}>≈ {formatMoney(amount, currency)}</span>
}
