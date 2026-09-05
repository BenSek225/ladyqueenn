'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, MapPin, MessageCircle } from 'lucide-react'
import { useCart } from '@/lib/store'

const deliveryZones = {
  'Abidjan — Cocody, Plateau, Marcory': 1000,
  'Abidjan — Yopougon, Abobo, Anyama': 1500,
  'Grand Abidjan — Bingerville, Bassam': 2000,
  'Intérieur du pays': 3000,
} as const

type DeliveryZone = keyof typeof deliveryZones

export default function CommandePage() {
  const items = useCart((state) => state.items)
  const subtotal = useCart((state) => state.getTotalPrice())
  const [zone, setZone] = useState<DeliveryZone>('Abidjan — Cocody, Plateau, Marcory')
  const [submitted, setSubmitted] = useState(false)
  const delivery = deliveryZones[zone]
  const total = subtotal + delivery

  const itemSummary = useMemo(() => items.map((item) => `- ${item.name} x${item.quantity} : ${(item.price * item.quantity).toLocaleString('fr-FR')} FCFA`).join('\n'), [items])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '')
    const phone = String(form.get('phone') || '')
    const address = String(form.get('address') || '')
    const message = `Bonjour Lady Queenn ! Je souhaite confirmer ma commande.\n\nClient : ${name}\nTéléphone : ${phone}\nAdresse : ${address}\nZone : ${zone}\n\n${itemSummary}\n\nSous-total : ${subtotal.toLocaleString('fr-FR')} FCFA\nLivraison : ${delivery.toLocaleString('fr-FR')} FCFA\nTOTAL : ${total.toLocaleString('fr-FR')} FCFA`
    setSubmitted(true)
    window.open(`https://wa.me/2250710504007?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  if (items.length === 0) {
    return (
      <main className="min-h-[70vh] bg-cream-light px-4 py-20">
        <div className="container-luxury max-w-xl text-center">
          <p className="eyebrow-label text-champagne-gold mb-4">Votre commande</p>
          <h1 className="font-display text-4xl mb-4">Votre panier est vide</h1>
          <p className="text-warm-500 mb-8">Ajoutez un produit avant de passer commande.</p>
          <Link href="/" className="btn-primary inline-flex items-center gap-2">Découvrir la sélection <ArrowRight size={18} /></Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-cream-light py-12 lg:py-20">
      <div className="container-luxury max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-deep-black mb-10"><ArrowLeft size={16} /> Continuer mes achats</Link>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
          <section>
            <p className="eyebrow-label text-champagne-gold mb-4">Finaliser votre sélection</p>
            <h1 className="font-display text-4xl md:text-5xl mb-4">Passer la commande</h1>
            <p className="text-warm-500 leading-relaxed mb-8">Renseignez vos coordonnées. Nous confirmerons ensuite votre commande et sa livraison sur WhatsApp.</p>
            <form onSubmit={handleSubmit} className="space-y-5 bg-cream-white p-6 sm:p-8 rounded-soft border border-warm-200">
              <label className="block"><span className="text-sm font-medium">Nom complet</span><input required name="name" className="mt-2 w-full rounded-soft border border-warm-200 bg-white px-4 py-3 outline-none focus:border-champagne-gold" placeholder="Votre nom" /></label>
              <label className="block"><span className="text-sm font-medium">Téléphone</span><input required name="phone" type="tel" className="mt-2 w-full rounded-soft border border-warm-200 bg-white px-4 py-3 outline-none focus:border-champagne-gold" placeholder="07 00 00 00 00" /></label>
              <label className="block"><span className="text-sm font-medium">Adresse de livraison</span><textarea required name="address" rows={3} className="mt-2 w-full rounded-soft border border-warm-200 bg-white px-4 py-3 outline-none focus:border-champagne-gold" placeholder="Quartier, rue, repère" /></label>
              <label className="block"><span className="text-sm font-medium">Zone de livraison</span><span className="mt-2 flex items-center gap-2"><MapPin size={18} className="text-champagne-gold" /><select value={zone} onChange={(event) => setZone(event.target.value as DeliveryZone)} className="w-full rounded-soft border border-warm-200 bg-white px-4 py-3 outline-none focus:border-champagne-gold">{Object.entries(deliveryZones).map(([label, price]) => <option key={label} value={label}>{label} — {price.toLocaleString('fr-FR')} FCFA</option>)}</select></span></label>
              <button type="submit" className="w-full flex items-center justify-center gap-3 bg-deep-black text-cream-white px-6 py-4 rounded-soft font-medium hover:bg-champagne-gold hover:text-deep-black transition-all min-h-[56px]"><MessageCircle size={19} /> {submitted ? 'Commande envoyée' : 'Confirmer via WhatsApp'}</button>
            </form>
          </section>
          <aside className="lg:sticky lg:top-28 bg-cream-white border border-warm-200 rounded-soft p-6 sm:p-8">
            <p className="eyebrow-label text-warm-500 mb-4">Récapitulatif</p>
            <div className="space-y-4 pb-6 border-b border-warm-200">{items.map((item) => <div key={item.id} className="flex justify-between gap-4 text-sm"><span>{item.name} <span className="text-warm-400">× {item.quantity}</span></span><span className="font-mono whitespace-nowrap">{(item.price * item.quantity).toLocaleString('fr-FR')} F</span></div>)}</div>
            <div className="space-y-3 py-6 text-sm"><div className="flex justify-between"><span className="text-warm-500">Sous-total</span><span>{subtotal.toLocaleString('fr-FR')} FCFA</span></div><div className="flex justify-between"><span className="text-warm-500">Livraison</span><span>{delivery.toLocaleString('fr-FR')} FCFA</span></div></div>
            <div className="flex justify-between items-baseline border-t border-warm-200 pt-5"><span className="font-medium">Total</span><strong className="font-display text-2xl">{total.toLocaleString('fr-FR')} <small className="font-sans text-sm">FCFA</small></strong></div>
          </aside>
        </div>
      </div>
    </main>
  )
}
