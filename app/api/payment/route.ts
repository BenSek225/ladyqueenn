import { NextResponse } from 'next/server'
import { allProducts } from '@/lib/data/all-products'
import { deliveryFee, isLocal, PAYMENT_OPTIONS, type Customer } from '@/lib/order'
import { createPaymentRequest, jekoConfigured, type JekoMethod } from '@/lib/jeko'

export async function GET() {
  return NextResponse.json({ enabled: jekoConfigured() })
}

export async function POST(request: Request) {
  if (!jekoConfigured()) {
    return NextResponse.json({ error: 'Le paiement en ligne n’est pas encore activé.' }, { status: 503 })
  }

  const body = (await request.json().catch(() => null)) as {
    reference?: string
    method?: string
    customer?: Customer
    items?: { id: string; quantity: number }[]
  } | null

  const option = PAYMENT_OPTIONS.find((p) => p.id === body?.method)
  if (!body?.reference || !option?.online || !body.customer || !body.items?.length) {
    return NextResponse.json({ error: 'Commande incomplète.' }, { status: 400 })
  }
  if (!isLocal(body.customer.country)) {
    return NextResponse.json({ error: 'Le Mobile Money est réservé aux livraisons en Côte d’Ivoire.' }, { status: 400 })
  }

  // Les prix sont recalculés côté serveur : on ne fait jamais confiance au navigateur.
  let subtotal = 0
  for (const line of body.items) {
    const product = allProducts.find((p) => p.id === String(line.id).split('::')[0])
    const qty = Math.floor(Number(line.quantity))
    if (!product || qty < 1 || qty > 50) {
      return NextResponse.json({ error: 'Un article du panier est invalide.' }, { status: 400 })
    }
    subtotal += product.price * qty
  }
  const fee = deliveryFee(body.customer)
  if (fee === null) return NextResponse.json({ error: 'Adresse de livraison incomplète.' }, { status: 400 })

  const origin = new URL(request.url).origin
  const ref = encodeURIComponent(body.reference)
  try {
    const payment = await createPaymentRequest({
      amountXof: subtotal + fee,
      reference: body.reference,
      method: option.id as JekoMethod,
      successUrl: `${origin}/commande/confirmation?statut=succes&ref=${ref}`,
      errorUrl: `${origin}/commande/confirmation?statut=echec&ref=${ref}`,
    })
    return NextResponse.json({ id: payment.id, redirectUrl: payment.redirectUrl, total: subtotal + fee })
  } catch (error) {
    console.error('[payment]', error)
    return NextResponse.json({ error: 'Le paiement n’a pas pu démarrer. Réessayez ou envoyez votre commande sur WhatsApp.' }, { status: 502 })
  }
}
