'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, Check, Loader2, Lock, MessageCircle, Minus, Plus, ShieldCheck, Trash2, Truck } from 'lucide-react'
import { useCart } from '@/lib/store'
import { useMounted } from '@/lib/hooks/use-mounted'
import { DELIVERY_CITIES } from '@/lib/data/delivery-zones'
import {
  ABIDJAN_COMMUNES,
  COUNTRIES,
  deliveryFee,
  formatOrderMessage,
  isLocal,
  LOCAL_COUNTRY,
  orderReference,
  PENDING_ORDER_KEY,
  PAYMENT_OPTIONS,
  whatsappLink,
  type Customer,
  type PaymentMethod,
} from '@/lib/order'
import { getUniverseName } from '@/lib/data/all-products'
import { PriceHint } from '@/components/shared/price'
import { cn } from '@/lib/utils'

const EASE = [0.16, 1, 0.3, 1] as const
const fcfa = (n: number) => `${n.toLocaleString('fr-FR')} FCFA`

const EMPTY: Customer = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  country: LOCAL_COUNTRY,
  city: 'Abidjan',
  commune: '',
  address: '',
  note: '',
}

const CUSTOMER_KEY = 'lady-queen-customer'

export default function CommandePage() {
  const mounted = useMounted()
  const items = useCart((s) => s.items)
  const updateQuantity = useCart((s) => s.updateQuantity)
  const removeItem = useCart((s) => s.removeItem)

  const [customer, setCustomer] = useState<Customer>(EMPTY)
  const [method, setMethod] = useState<PaymentMethod>('wave')
  const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>({})
  const [onlineEnabled, setOnlineEnabled] = useState<boolean | null>(null)
  const [paying, setPaying] = useState(false)
  const [payError, setPayError] = useState<string | null>(null)
  const [reference] = useState(orderReference)

  // Reprendre les coordonnées d'une commande précédente
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CUSTOMER_KEY)
      if (saved) setCustomer({ ...EMPTY, ...JSON.parse(saved), note: '' })
    } catch {}
    fetch('/api/payment')
      .then((r) => r.json())
      .then((d) => setOnlineEnabled(Boolean(d.enabled)))
      .catch(() => setOnlineEnabled(false))
  }, [])

  const local = isLocal(customer.country)
  const fee = deliveryFee(customer)
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const total = subtotal + (fee ?? 0)
  const options = PAYMENT_OPTIONS.filter((p) => local || !p.localOnly)
  const payment = options.find((p) => p.id === method) ?? options[0]
  const canPayOnline = payment.online && onlineEnabled === true

  // Si le pays change, le moyen de paiement doit rester valide
  useEffect(() => {
    if (!options.some((p) => p.id === method)) setMethod(options[0].id)
  }, [local]) // eslint-disable-line react-hooks/exhaustive-deps

  const lines = useMemo(() => items.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })), [items])

  const set = (key: keyof Customer) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    setCustomer((c) => {
      const next = { ...c, [key]: value }
      if (key === 'country') {
        next.city = value === LOCAL_COUNTRY ? 'Abidjan' : ''
        next.commune = ''
      }
      if (key === 'city') next.commune = ''
      return next
    })
    setErrors((er) => ({ ...er, [key]: undefined }))
  }

  function validate() {
    const er: Partial<Record<keyof Customer, string>> = {}
    if (customer.firstName.trim().length < 2) er.firstName = 'Indiquez votre prénom'
    if (customer.lastName.trim().length < 2) er.lastName = 'Indiquez votre nom'
    if (!/^\+?[\d\s().-]{8,20}$/.test(customer.phone.trim())) er.phone = 'Numéro invalide (ex. 07 99 50 39 18 ou +33 6…)'
    if (customer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) er.email = 'Adresse email invalide'
    if (!customer.city.trim()) er.city = local ? 'Choisissez votre ville' : 'Indiquez votre ville'
    if (local && customer.city === 'Abidjan' && !customer.commune) er.commune = 'Choisissez votre commune'
    if (customer.address.trim().length < 3) er.address = local ? 'Quartier ou repère pour le livreur' : 'Adresse complète'
    setErrors(er)
    if (Object.keys(er).length) {
      document.getElementById(`f-${Object.keys(er)[0]}`)?.focus()
      return false
    }
    try {
      localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer))
    } catch {}
    return true
  }

  function sendWhatsApp() {
    if (!validate()) return
    const message = formatOrderMessage({ reference, lines, customer, payment, fee })
    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
  }

  async function payOnline() {
    if (!validate()) return
    setPaying(true)
    setPayError(null)
    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference, method: payment.id, customer, items: lines.map(({ id, quantity }) => ({ id, quantity })) }),
      })
      const data = await res.json()
      if (!res.ok || !data.redirectUrl) throw new Error(data.error ?? 'Le paiement n’a pas pu démarrer.')
      localStorage.setItem(
        PENDING_ORDER_KEY,
        JSON.stringify({ reference, paymentId: data.id, lines, customer, method: payment.id, fee }),
      )
      window.location.href = data.redirectUrl
    } catch (e) {
      setPayError(e instanceof Error ? e.message : 'Erreur inattendue')
      setPaying(false)
    }
  }

  if (!mounted) return <div className="min-h-[70vh] bg-cream-light" />

  if (items.length === 0) {
    return (
      <section className="grain flex min-h-[70vh] items-center bg-cream-light py-24">
        <div className="container-luxury max-w-xl text-center">
          <p className="eyebrow-label">Votre panier</p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl">Votre panier est vide</h1>
          <p className="mt-4 text-warm-600">Découvrez nos marques et ajoutez vos coups de cœur.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/sweet-hair" className="chip bg-cream-white">Sweet-Hair</Link>
            <Link href="/fragrance" className="chip bg-cream-white">Fragrance</Link>
            <Link href="/crochet-by-thed" className="chip bg-cream-white">Crochet by THED</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-cream-light pb-24 pt-8 lg:pb-32">
      <div className="container-luxury">
        <Link href="/" className="inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.18em] text-warm-500 hover:text-deep-black">
          <ArrowLeft size={14} /> Continuer mes achats
        </Link>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-display text-4xl sm:text-5xl">Finaliser ma commande</h1>
          <p className="price text-xs uppercase tracking-[0.18em] text-warm-500">Réf. {reference}</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-12">
          {/* Formulaire */}
          <div className="space-y-6">
            <Step n={1} title="Vos coordonnées">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="firstName" label="Prénom" error={errors.firstName}>
                  <input id="f-firstName" autoComplete="given-name" value={customer.firstName} onChange={set('firstName')} className="field" />
                </Field>
                <Field id="lastName" label="Nom" error={errors.lastName}>
                  <input id="f-lastName" autoComplete="family-name" value={customer.lastName} onChange={set('lastName')} className="field" />
                </Field>
                <Field id="phone" label="Téléphone / WhatsApp" error={errors.phone}>
                  <input id="f-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="07 99 50 39 18" value={customer.phone} onChange={set('phone')} className="field" />
                </Field>
                <Field id="email" label="Email" optional error={errors.email}>
                  <input id="f-email" type="email" autoComplete="email" placeholder="vous@exemple.com" value={customer.email} onChange={set('email')} className="field" />
                </Field>
              </div>
            </Step>

            <Step n={2} title="Livraison">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="country" label="Pays" error={errors.country}>
                  <select id="f-country" autoComplete="country-name" value={customer.country} onChange={set('country')} className="field">
                    {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                {local ? (
                  <Field id="city" label="Ville" error={errors.city}>
                    <select id="f-city" value={customer.city} onChange={set('city')} className="field">
                      {DELIVERY_CITIES.map((c) => <option key={c.name}>{c.name}</option>)}
                    </select>
                  </Field>
                ) : (
                  <Field id="city" label="Ville" error={errors.city}>
                    <input id="f-city" autoComplete="address-level2" value={customer.city} onChange={set('city')} className="field" />
                  </Field>
                )}
                {local && customer.city === 'Abidjan' && (
                  <Field id="commune" label="Commune" error={errors.commune}>
                    <select id="f-commune" value={customer.commune} onChange={set('commune')} className="field">
                      <option value="">Choisir…</option>
                      {ABIDJAN_COMMUNES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </Field>
                )}
                <Field id="address" label={local ? 'Quartier et repère' : 'Adresse complète'} error={errors.address} className={local && customer.city === 'Abidjan' ? '' : 'sm:col-span-2'}>
                  <input id="f-address" autoComplete="street-address" placeholder={local ? 'Ex. Riviera 2, près de la pharmacie' : 'Rue, code postal…'} value={customer.address} onChange={set('address')} className="field" />
                </Field>
                <Field id="note" label="Note pour la commande" optional className="sm:col-span-2">
                  <textarea id="f-note" rows={2} placeholder="Taille, couleur, créneau de livraison…" value={customer.note} onChange={set('note')} className="field resize-none py-3" />
                </Field>
              </div>
              <p className="mt-4 flex items-start gap-2 text-sm text-warm-500">
                <Truck size={16} className="mt-0.5 shrink-0 text-gold-dark" />
                {local
                  ? 'Livraison en 24 à 72 h à Abidjan, 2 à 5 jours dans les autres villes.'
                  : 'Nous livrons à l’international : les frais et le délai vous sont confirmés sur WhatsApp avant tout paiement.'}
              </p>
            </Step>

            <Step n={3} title="Paiement">
              <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Moyen de paiement">
                {options.map((opt) => {
                  const active = payment.id === opt.id
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setMethod(opt.id)}
                      className={cn(
                        'relative flex items-center gap-3 rounded-soft border bg-cream-white p-4 text-left transition-all duration-300',
                        active ? 'border-deep-black shadow-[0_0_0_1px_var(--color-deep-black)]' : 'border-warm-200 hover:border-warm-400',
                        (opt.id === 'cash' || opt.id === 'card') && 'sm:col-span-2',
                      )}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: opt.color }}>
                        {opt.label.slice(0, 1)}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium">{opt.label}</span>
                        <span className="block text-xs text-warm-500">{opt.description}</span>
                      </span>
                      <span className={cn('ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors', active ? 'border-deep-black bg-deep-black text-cream-white' : 'border-warm-300')}>
                        {active && <Check size={12} />}
                      </span>
                    </button>
                  )
                })}
              </div>
              {payment.online && onlineEnabled === false && (
                <p className="mt-4 rounded-soft bg-champagne-gold/15 px-4 py-3 text-sm text-gold-dark">
                  Le paiement en ligne arrive très bientôt. En attendant, envoyez votre commande sur WhatsApp : nous vous
                  envoyons le lien de paiement {payment.label}.
                </p>
              )}
            </Step>
          </div>

          {/* Récapitulatif */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[1.25rem] bg-cream-white p-6 shadow-[0_30px_60px_-40px_rgba(26,23,20,0.4)] sm:p-8">
              <h2 className="font-display text-2xl">Votre panier</h2>
              <ul className="mt-6 divide-y divide-warm-200">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.li key={item.id} layout exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: EASE }} className="flex gap-4 py-4">
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md bg-warm-100">
                        <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <p className="text-[0.625rem] uppercase tracking-[0.18em] text-warm-500">{getUniverseName(item.volet)}</p>
                        <p className="line-clamp-1 font-display">{item.name}</p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center rounded-full border border-warm-200">
                            <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-8 w-8 items-center justify-center" aria-label="Retirer un">
                              <Minus size={13} />
                            </button>
                            <span className="price w-6 text-center text-sm">{item.quantity}</span>
                            <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-8 w-8 items-center justify-center" aria-label="Ajouter un">
                              <Plus size={13} />
                            </button>
                          </div>
                          <span className="price text-sm">{fcfa(item.price * item.quantity)}</span>
                        </div>
                      </div>
                      <button type="button" onClick={() => removeItem(item.id)} className="self-start p-1 text-warm-400 hover:text-deep-black" aria-label={`Supprimer ${item.name}`}>
                        <Trash2 size={15} />
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

              <dl className="space-y-2 border-t border-warm-200 pt-5 text-sm">
                <Row label="Sous-total" value={fcfa(subtotal)} />
                <Row
                  label="Livraison"
                  value={fee === null ? (local ? 'Choisissez la commune' : 'À confirmer') : fcfa(fee)}
                  muted={fee === null}
                />
                <div className="flex items-baseline justify-between border-t border-warm-200 pt-4">
                  <dt className="text-xs uppercase tracking-[0.18em] text-warm-500">Total</dt>
                  <dd className="text-right">
                    <span className="price block text-2xl">{fcfa(total)}</span>
                    <PriceHint amount={total} className="price text-xs text-warm-500" />
                  </dd>
                </div>
              </dl>

              <div className="mt-6 space-y-3">
                {canPayOnline && (
                  <button type="button" onClick={payOnline} disabled={paying} className="btn-primary w-full">
                    {paying ? <Loader2 size={17} className="animate-spin" /> : <Lock size={15} />}
                    Payer {fcfa(total)} · {payment.label}
                  </button>
                )}
                <button
                  type="button"
                  onClick={sendWhatsApp}
                  className={cn('w-full', canPayOnline ? 'btn-secondary' : 'btn-primary !bg-[#1f7a4d]')}
                >
                  <MessageCircle size={17} />
                  {canPayOnline ? 'Ou envoyer sur WhatsApp' : 'Envoyer ma commande sur WhatsApp'}
                </button>
                {payError && <p className="text-center text-sm text-red-700">{payError}</p>}
              </div>

              <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-warm-500">
                <ShieldCheck size={15} className="mt-px shrink-0 text-gold-dark" />
                {canPayOnline
                  ? 'Paiement sécurisé par Jèko. Votre commande nous est aussi transmise, nous vous confirmons la livraison sur WhatsApp.'
                  : 'Votre commande arrive sur notre WhatsApp avec toutes vos informations. Nous confirmons la disponibilité et la livraison avec vous.'}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: n * 0.08, ease: EASE }}
      className="rounded-[1.25rem] bg-cream-white p-6 sm:p-8"
    >
      <h2 className="mb-6 flex items-center gap-3 font-display text-2xl">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-deep-black font-sans text-xs text-cream-white">{n}</span>
        {title}
      </h2>
      {children}
    </motion.div>
  )
}

function Field({
  id,
  label,
  error,
  optional,
  className,
  children,
}: {
  id: string
  label: string
  error?: string
  optional?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={`f-${id}`} className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-warm-600">
        {label}
        {optional && <span className="ml-1 normal-case tracking-normal text-warm-400">(facultatif)</span>}
      </label>
      <div className={cn(error && '[&_.field]:border-red-600')}>{children}</div>
      {error && <p className="mt-1.5 text-xs text-red-700">{error}</p>}
    </div>
  )
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-warm-600">{label}</dt>
      <dd className={cn('price', muted && 'text-warm-400')}>{value}</dd>
    </div>
  )
}
