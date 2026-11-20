import 'server-only'

/**
 * Paiement en ligne Mobile Money via Jèko (https://jeko.africa).
 * Variables d'environnement à définir sur Vercel :
 *   JEKO_API_KEY, JEKO_API_KEY_ID, JEKO_STORE_ID
 * Tant qu'elles sont absentes, le site propose seulement l'envoi WhatsApp.
 */
const API = 'https://api.jeko.africa/partner_api'

export function jekoConfigured() {
  return Boolean(process.env.JEKO_API_KEY && process.env.JEKO_API_KEY_ID && process.env.JEKO_STORE_ID)
}

function headers() {
  return {
    'X-API-KEY': process.env.JEKO_API_KEY ?? '',
    'X-API-KEY-ID': process.env.JEKO_API_KEY_ID ?? '',
    'Content-Type': 'application/json',
  }
}

export type JekoMethod = 'wave' | 'orange' | 'mtn' | 'moov' | 'djamo'

export async function createPaymentRequest(input: {
  amountXof: number
  reference: string
  method: JekoMethod
  successUrl: string
  errorUrl: string
}) {
  const res = await fetch(`${API}/payment_requests`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      storeId: process.env.JEKO_STORE_ID,
      // Montant en centimes, multiple de 100
      amountCents: Math.round(input.amountXof) * 100,
      currency: 'XOF',
      reference: input.reference,
      paymentDetails: {
        type: 'redirect',
        data: { paymentMethod: input.method, successUrl: input.successUrl, errorUrl: input.errorUrl },
      },
    }),
    cache: 'no-store',
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.message ?? `Jèko ${res.status}`)
  return data as { id: string; redirectUrl: string; status: 'pending' | 'success' | 'error' }
}

export async function getPaymentRequest(id: string) {
  const res = await fetch(`${API}/payment_requests/${encodeURIComponent(id)}`, { headers: headers(), cache: 'no-store' })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.message ?? `Jèko ${res.status}`)
  return data as { id: string; reference: string; status: 'pending' | 'success' | 'error'; errorReason?: string | null }
}
