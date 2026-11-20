/**
 * Logique de commande partagée entre le navigateur et le serveur :
 * pays, livraison, moyens de paiement, calcul du total et message WhatsApp.
 */
import { ABIDJAN_ZONES, getDeliveryFee } from '@/lib/data/delivery-zones'

export const WHATSAPP_NUMBER = '2250710504007'
export const PENDING_ORDER_KEY = 'lady-queen-pending-order'

export const COUNTRIES = [
  "Côte d'Ivoire",
  'Sénégal',
  'Mali',
  'Burkina Faso',
  'Togo',
  'Bénin',
  'Niger',
  'Guinée',
  'Cameroun',
  'Gabon',
  'France',
  'Belgique',
  'Suisse',
  'Canada',
  'États-Unis',
  'Royaume-Uni',
  'Autre pays',
] as const

export const LOCAL_COUNTRY = "Côte d'Ivoire"

export type PaymentMethod = 'wave' | 'orange' | 'mtn' | 'moov' | 'djamo' | 'cash' | 'card'

export interface PaymentOption {
  id: PaymentMethod
  label: string
  description: string
  /** Paiement en ligne immédiat (Mobile Money via Jèko) */
  online: boolean
  /** Disponible uniquement pour une livraison en Côte d'Ivoire */
  localOnly: boolean
  color: string
}

export const PAYMENT_OPTIONS: PaymentOption[] = [
  { id: 'wave', label: 'Wave', description: 'Paiement instantané depuis l’app Wave', online: true, localOnly: true, color: '#1dc4ff' },
  { id: 'orange', label: 'Orange Money', description: 'Validation sur votre téléphone', online: true, localOnly: true, color: '#ff7900' },
  { id: 'mtn', label: 'MTN MoMo', description: 'Validation par USSD', online: true, localOnly: true, color: '#ffcc00' },
  { id: 'moov', label: 'Moov Money', description: 'Validation par USSD', online: true, localOnly: true, color: '#0066b3' },
  { id: 'djamo', label: 'Djamo', description: 'Carte et compte Djamo', online: true, localOnly: true, color: '#0b0b0b' },
  { id: 'cash', label: 'Paiement à la livraison', description: 'Espèces ou Mobile Money à la réception', online: false, localOnly: true, color: '#c6a87c' },
  { id: 'card', label: 'Carte bancaire / international', description: 'Lien de paiement sécurisé envoyé sur WhatsApp', online: false, localOnly: false, color: '#1a1714' },
]

export interface Customer {
  firstName: string
  lastName: string
  phone: string
  email: string
  country: string
  city: string
  commune: string
  address: string
  note: string
}

export interface OrderLine {
  id: string
  name: string
  price: number
  quantity: number
}

export function isLocal(country: string) {
  return country === LOCAL_COUNTRY
}

/** Frais de livraison en FCFA, ou null si à confirmer (international). */
export function deliveryFee(customer: Pick<Customer, 'country' | 'city' | 'commune'>): number | null {
  if (!isLocal(customer.country)) return null
  if (!customer.city) return null
  if (customer.city === 'Abidjan' && !customer.commune) return null
  return getDeliveryFee(customer.city, customer.commune)
}

export const ABIDJAN_COMMUNES = ABIDJAN_ZONES.flatMap((z) => z.communes).sort((a, b) => a.localeCompare(b, 'fr'))

export function orderReference() {
  const d = new Date()
  const date = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `LQ-${date}-${rand}`
}

const fcfa = (n: number) => `${n.toLocaleString('fr-FR')} FCFA`

export function formatOrderMessage({
  reference,
  lines,
  customer,
  payment,
  fee,
  paid,
}: {
  reference: string
  lines: OrderLine[]
  customer: Customer
  payment: PaymentOption | undefined
  fee: number | null
  paid?: boolean
}) {
  const subtotal = lines.reduce((s, l) => s + l.price * l.quantity, 0)
  const total = subtotal + (fee ?? 0)
  const place = [customer.address, customer.commune, customer.city, customer.country].filter(Boolean).join(', ')

  return [
    `Bonjour Lady Queen 👑, voici ma commande *${reference}*`,
    '',
    '🛍️ *ARTICLES*',
    ...lines.map((l) => `• ${l.name} × ${l.quantity} — ${fcfa(l.price * l.quantity)}`),
    '',
    '👤 *CLIENT*',
    `${customer.firstName} ${customer.lastName}`.trim(),
    `Tél : ${customer.phone}`,
    customer.email ? `Email : ${customer.email}` : '',
    '',
    '📍 *LIVRAISON*',
    place,
    customer.note ? `Note : ${customer.note}` : '',
    '',
    '💳 *PAIEMENT*',
    `${payment?.label ?? 'À définir'}${paid ? ' — ✅ payé en ligne' : ''}`,
    '',
    `Sous-total : ${fcfa(subtotal)}`,
    `Livraison : ${fee === null ? 'à confirmer' : fcfa(fee)}`,
    `*TOTAL : ${fcfa(total)}${fee === null ? ' + livraison' : ''}*`,
  ]
    .filter((line, i, arr) => !(line === '' && arr[i - 1] === ''))
    .filter((line) => line !== undefined)
    .join('\n')
}

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
