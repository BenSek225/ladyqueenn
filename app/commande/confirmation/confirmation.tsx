'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'motion/react'
import { Check, Loader2, MessageCircle, RotateCcw, X } from 'lucide-react'
import { useCart } from '@/lib/store'
import { formatOrderMessage, PAYMENT_OPTIONS, PENDING_ORDER_KEY, whatsappLink, type Customer, type OrderLine, type PaymentMethod } from '@/lib/order'

interface PendingOrder {
  reference: string
  paymentId: string
  lines: OrderLine[]
  customer: Customer
  method: PaymentMethod
  fee: number | null
}

type Status = 'checking' | 'success' | 'pending' | 'error'

export function Confirmation() {
  const params = useSearchParams()
  const clearCart = useCart((s) => s.clearCart)
  const [order, setOrder] = useState<PendingOrder | null>(null)
  const [status, setStatus] = useState<Status>('checking')

  useEffect(() => {
    let pending: PendingOrder | null = null
    try {
      pending = JSON.parse(localStorage.getItem(PENDING_ORDER_KEY) ?? 'null')
    } catch {}
    setOrder(pending)

    const returned = params.get('statut') === 'succes' ? 'success' : 'error'
    if (!pending?.paymentId) {
      setStatus(returned)
      return
    }
    // On vérifie toujours le statut réel auprès de Jèko
    fetch(`/api/payment/${pending.paymentId}`)
      .then((r) => r.json())
      .then((d) => setStatus(d.status === 'success' ? 'success' : d.status === 'pending' ? 'pending' : d.status === 'error' ? 'error' : returned))
      .catch(() => setStatus(returned))
  }, [params])

  useEffect(() => {
    if (status === 'success') clearCart()
  }, [status, clearCart])

  const payment = PAYMENT_OPTIONS.find((p) => p.id === order?.method)
  const message = order
    ? formatOrderMessage({ ...order, payment, paid: status === 'success' })
    : `Bonjour Lady Queen, je viens de passer la commande ${params.get('ref') ?? ''}.`

  const ok = status === 'success' || status === 'pending'

  return (
    <section className="grain flex min-h-[75vh] items-center bg-cream-light py-24">
      <div className="container-luxury max-w-xl text-center">
        {status === 'checking' ? (
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-gold-dark" />
        ) : (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.15 }}
              className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${ok ? 'bg-champagne-gold text-deep-black' : 'bg-deep-black text-cream-white'}`}
            >
              {ok ? <Check size={34} /> : <X size={34} />}
            </motion.span>
            <p className="eyebrow-label mt-8">{order?.reference ?? params.get('ref')}</p>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl">
              {status === 'success' ? 'Merci, votre paiement est confirmé' : status === 'pending' ? 'Paiement en cours de validation' : 'Le paiement n’a pas abouti'}
            </h1>
            <p className="mx-auto mt-5 max-w-md leading-relaxed text-warm-600">
              {ok
                ? 'Envoyez-nous le récapitulatif sur WhatsApp : nous préparons votre commande et vous confirmons la livraison.'
                : 'Aucun montant n’a été débité. Vous pouvez réessayer, ou envoyer votre commande sur WhatsApp et payer à la livraison.'}
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="btn-primary !bg-[#1f7a4d]">
                <MessageCircle size={17} /> Envoyer sur WhatsApp
              </a>
              {ok ? (
                <Link href="/" className="btn-secondary">Retour à l’accueil</Link>
              ) : (
                <Link href="/commande" className="btn-secondary"><RotateCcw size={16} /> Réessayer</Link>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
