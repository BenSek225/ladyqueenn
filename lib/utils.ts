import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const WHATSAPP_NUMBER = '2250710504007'
export function formatPrice(price: number) { return `${price.toLocaleString('fr-FR')} FCFA` }
export function whatsappUrl(message: string) { return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}` }
export function badgeLabel(badge?: string) { return badge === 'coup-de-coeur' ? 'Coup de cœur' : badge === 'limité' ? 'Édition limitée' : badge === 'nouveau' ? 'Nouveau' : badge === 'promo' ? 'Prix doux' : badge === 'rupture' ? 'Rupture' : '' }
