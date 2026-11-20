'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, MessageCircle, Minus, Plus, ShoppingBag, Trash2, Truck, X } from 'lucide-react'
import { useCart } from '@/lib/store'
import { getUniverseName, getVoletPath } from '@/lib/data/all-products'
import { whatsappLink } from '@/lib/order'
import { PriceHint } from '@/components/shared/price'

const EASE = [0.16, 1, 0.3, 1] as const
const fcfa = (n: number) => `${n.toLocaleString('fr-FR')} FCFA`

export function CartDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const items = useCart((s) => s.items)
  const updateQuantity = useCart((s) => s.updateQuantity)
  const removeItem = useCart((s) => s.removeItem)
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const count = items.reduce((s, i) => s + i.quantity, 0)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onOpenChange(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onOpenChange])

  const quickMessage = [
    'Bonjour Lady Queen 👑, je souhaite commander :',
    ...items.map((i) => `• ${i.name} × ${i.quantity} — ${fcfa(i.price * i.quantity)}`),
    `Total : ${fcfa(total)} + livraison`,
  ].join('\n')

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-deep-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            aria-hidden
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-cream-white shadow-2xl sm:max-w-md"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Panier"
            data-lenis-prevent
          >
            <div className="flex items-center justify-between border-b border-warm-200 px-6 py-5">
              <div>
                <p className="eyebrow-label">Votre sélection</p>
                <h2 className="mt-1 font-display text-2xl">
                  Panier <span className="price text-base text-warm-500">({count})</span>
                </h2>
              </div>
              <button onClick={() => onOpenChange(false)} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-warm-100" aria-label="Fermer le panier">
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-warm-100">
                    <ShoppingBag className="h-7 w-7 text-warm-400" strokeWidth={1.4} />
                  </span>
                  <p className="mt-5 font-display text-xl">Votre panier est vide</p>
                  <p className="mt-1 text-sm text-warm-500">Laissez-vous tenter par nos trois marques.</p>
                  <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {[['Sweet-Hair', '/sweet-hair'], ['Fragrance', '/fragrance'], ['Crochet by THED', '/crochet-by-thed']].map(([l, h]) => (
                      <Link key={h} href={h} onClick={() => onOpenChange(false)} className="chip">
                        {l}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <ul className="divide-y divide-warm-200">
                  <AnimatePresence initial={false}>
                    {items.map((item, i) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: 0.15 + i * 0.05, duration: 0.5, ease: EASE } }}
                        exit={{ opacity: 0, x: -30, transition: { duration: 0.3 } }}
                        className="flex gap-4 py-5"
                      >
                        <Link
                          href={`/${getVoletPath(item.volet)}`}
                          onClick={() => onOpenChange(false)}
                          className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-warm-100"
                        >
                          <Image src={item.image} alt="" fill sizes="80px" className="object-cover" />
                        </Link>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-[0.625rem] uppercase tracking-[0.18em] text-warm-500">{getUniverseName(item.volet)}</p>
                              <p className="mt-0.5 line-clamp-2 font-display leading-snug">{item.name}</p>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="-mr-1 h-8 w-8 shrink-0 text-warm-400 hover:text-deep-black" aria-label={`Retirer ${item.name}`}>
                              <Trash2 size={15} className="mx-auto" />
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center rounded-full border border-warm-200">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-9 w-9 items-center justify-center" aria-label="Retirer un">
                                <Minus size={13} />
                              </button>
                              <span className="price w-6 text-center text-sm">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-9 w-9 items-center justify-center" aria-label="Ajouter un">
                                <Plus size={13} />
                              </button>
                            </div>
                            <span className="price text-sm text-gold-dark">{fcfa(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-warm-200 bg-cream-light px-6 pb-6 pt-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-[0.18em] text-warm-500">Sous-total</span>
                  <span className="text-right">
                    <span className="price block text-2xl">{fcfa(total)}</span>
                    <PriceHint amount={total} className="price text-xs text-warm-500" />
                  </span>
                </div>
                <p className="mt-2 flex items-center gap-2 text-xs text-warm-500">
                  <Truck size={14} /> Livraison calculée à l’étape suivante · paiement à la livraison possible
                </p>
                <div className="mt-5 grid gap-2.5">
                  <Link href="/commande" onClick={() => onOpenChange(false)} className="btn-primary w-full">
                    Passer la commande <ArrowRight size={16} />
                  </Link>
                  <a href={whatsappLink(quickMessage)} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full">
                    <MessageCircle size={16} /> Commander sur WhatsApp
                  </a>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
