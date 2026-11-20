'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type Currency = 'XOF' | 'EUR' | 'USD'

/**
 * Le franc CFA est arrimé à l'euro : 1 € = 655,957 FCFA (taux fixe officiel).
 * Le dollar est indicatif : à ajuster si besoin.
 */
export const RATES: Record<Currency, number> = {
  XOF: 1,
  EUR: 655.957,
  USD: 600,
}

export const CURRENCY_LABEL: Record<Currency, string> = {
  XOF: 'FCFA',
  EUR: 'EUR €',
  USD: 'USD $',
}

export function convert(amountXof: number, currency: Currency) {
  return amountXof / RATES[currency]
}

export function formatMoney(amountXof: number, currency: Currency = 'XOF') {
  if (currency === 'XOF') return `${Math.round(amountXof).toLocaleString('fr-FR')} FCFA`
  const value = convert(amountXof, currency)
  return new Intl.NumberFormat(currency === 'EUR' ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: value < 100 ? 2 : 0,
    maximumFractionDigits: value < 100 ? 2 : 0,
  }).format(value)
}

export const useCurrency = create<{ currency: Currency; setCurrency: (c: Currency) => void }>()(
  persist((set) => ({ currency: 'XOF', setCurrency: (currency) => set({ currency }) }), {
    name: 'lady-queen-currency',
    storage: createJSONStorage(() => localStorage),
  }),
)
