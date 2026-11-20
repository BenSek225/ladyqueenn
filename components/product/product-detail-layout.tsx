'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { ArrowLeft, Check, Leaf, MessageCircle, Minus, Package, Plus, ShieldCheck, Scissors, ShoppingBag, Zap } from 'lucide-react'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { ProductCard } from '@/components/product-card'
import { PriceHint } from '@/components/shared/price'
import { toast } from '@/components/shared/toast'
import { useCart } from '@/lib/store'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import type { CrochetProduct, FragranceProduct, Product, SweetHairProduct } from '@/lib/types'
import { getSimilarProducts, getUniverseName, getVoletPath } from '@/lib/data/all-products'
import { badgeLabel, cn } from '@/lib/utils'
import { whatsappLink } from '@/lib/order'

const EASE = [0.16, 1, 0.3, 1] as const

const usp = {
  'sweet-hair': [
    { icon: Leaf, text: 'Ingrédients d’origine naturelle' },
    { icon: ShieldCheck, text: 'Fabriqué en Côte d’Ivoire' },
    { icon: Package, text: 'Livraison à Abidjan et en Côte d’Ivoire' },
  ],
  fragrance: [
    { icon: ShieldCheck, text: 'Parfum de marque authentique, importé' },
    { icon: Leaf, text: 'Conseil personnalisé sur WhatsApp' },
    { icon: Package, text: 'Livraison à Abidjan et en Côte d’Ivoire' },
  ],
  'crochet-by-thed': [
    { icon: Scissors, text: 'Fait main au crochet par THED' },
    { icon: Leaf, text: 'Couleurs et tailles personnalisables' },
    { icon: Package, text: 'Livraison à Abidjan et en Côte d’Ivoire' },
  ],
} as const

export function ProductDetailLayout({ product }: { product: Product }) {
  const images = product.images?.length ? product.images : [product.image]
  const [selected, setSelected] = useState(0)
  const [tab, setTab] = useState<'details' | 'composition' | 'usage'>('details')
  const [size, setSize] = useState<string | null>(null)
  const [color, setColor] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [pageUrl, setPageUrl] = useState('')
  useEffect(() => setPageUrl(window.location.href.split('?')[0]), [])
  const addItem = useCart((s) => s.addItem)
  const router = useRouter()
  const actionsRef = useRef<HTMLDivElement>(null)
  const actionsVisible = useInView(actionsRef, { margin: '0px 0px -40px 0px' })

  const path = `/${getVoletPath(product.volet)}`
  const brandName = getUniverseName(product.volet)
  const similar = getSimilarProducts(product.id, product.volet, 4)
  const fragrance = product.volet === 'fragrance' ? (product as FragranceProduct) : null
  const crochet = product.volet === 'crochet-by-thed' ? (product as CrochetProduct) : null
  const sweet = product.volet === 'sweet-hair' ? (product as SweetHairProduct) : null

  const options = [size && `taille ${size}`, color && `couleur ${color}`].filter(Boolean).join(', ')
  const waMessage = `Bonjour Lady Queen 👑, je souhaite commander :\n• ${product.name}${options ? ` (${options})` : ''} × ${quantity} — ${(product.price * quantity).toLocaleString('fr-FR')} FCFA${pageUrl ? `\n${pageUrl}` : ''}`
  const soldOut = product.stock === 0
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0

  function addToCart() {
    const label = [size, color].filter(Boolean).join(', ')
    addItem(
      {
        id: label ? `${product.id}::${label}` : product.id,
        name: label ? `${product.name} (${label})` : product.name,
        price: product.price,
        image: product.image,
        volet: product.volet,
      },
      quantity,
    )
  }

  function handleAdd() {
    addToCart()
    toast.success('Ajouté au panier', `${product.name} × ${quantity}`)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  function handleBuyNow() {
    addToCart()
    router.push('/commande')
  }

  const tabs = [
    { key: 'details' as const, label: 'Détails' },
    { key: 'composition' as const, label: fragrance ? 'Notes' : crochet ? 'Matière' : 'Composition' },
    { key: 'usage' as const, label: crochet ? 'Entretien' : 'Utilisation' },
  ]

  return (
    <div data-brand={product.volet} className="bg-cream-white">
      <div className="container-luxury flex flex-wrap items-center justify-between gap-2 pt-4">
        <Breadcrumb items={[{ label: brandName, href: path }, { label: product.name, href: `${path}/${product.slug}` }]} />
        <Link
          href={path}
          className="inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.18em] text-warm-500 transition-colors hover:text-deep-black"
        >
          <ArrowLeft size={14} /> Retour à {brandName}
        </Link>
      </div>

      <section className="container-luxury pb-20 pt-4 lg:pb-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
          {/* Galerie */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4">
            {images.length > 1 && (
              <div className="no-scrollbar flex gap-3 overflow-x-auto sm:flex-col sm:overflow-visible">
                {images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setSelected(i)}
                    aria-label={`Voir l’image ${i + 1}`}
                    className={cn(
                      'relative aspect-[4/5] w-16 shrink-0 overflow-hidden rounded-md transition-all duration-500 sm:w-20',
                      i === selected ? 'ring-1 ring-deep-black ring-offset-2 ring-offset-cream-white' : 'opacity-60 hover:opacity-100',
                    )}
                  >
                    <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-soft bg-warm-100">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={images[selected]}
                  className="absolute inset-0 touch-pan-y"
                  drag={images.length > 1 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -50) setSelected((i) => (i + 1) % images.length)
                    if (info.offset.x > 50) setSelected((i) => (i - 1 + images.length) % images.length)
                  }}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                >
                  <Image
                    src={images[selected]}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="pointer-events-none object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              {images.length > 1 && (
                <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5 sm:hidden">
                  {images.map((img, i) => (
                    <span key={img} className={cn('h-1.5 rounded-full bg-cream-white transition-all duration-500', i === selected ? 'w-6' : 'w-1.5 opacity-60')} />
                  ))}
                </div>
              )}
              {product.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-cream-white/90 px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.16em] backdrop-blur">
                  {badgeLabel(product.badge)}
                </span>
              )}
            </div>
          </div>

          {/* Infos */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow-label text-brand-ink">
                {brandName}
                {fragrance?.brand ? ` · ${fragrance.brand}` : ''}
              </p>
              <h1 className="mt-4 font-brand text-4xl leading-[1.05] tracking-tight sm:text-5xl">{product.name}</h1>
              <div className="price mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-3xl text-gold-dark">{product.price.toLocaleString('fr-FR')} FCFA</span>
                {product.oldPrice && (
                  <span className="text-base text-warm-400 line-through">{product.oldPrice.toLocaleString('fr-FR')} FCFA</span>
                )}
                {discount > 0 && (
                  <span className="rounded-full bg-deep-black px-2.5 py-1 font-sans text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-champagne-gold">
                    −{discount} %
                  </span>
                )}
                <PriceHint amount={product.price} className="w-full text-sm text-warm-500" />
              </div>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-warm-600">{product.description}</p>
            </Reveal>

            {/* Repères produit */}
            {(sweet?.volume || fragrance || crochet?.deliveryTime) && (
              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-soft border border-warm-200 bg-warm-200 text-sm sm:grid-cols-3">
                {sweet?.volume && <Spec label="Contenance" value={sweet.volume} />}
                {fragrance && <Spec label="Pour" value={capitalize(fragrance.category)} />}
                {fragrance?.intensity && <Spec label="Intensité" value={capitalize(fragrance.intensity)} />}
                {crochet?.material && <Spec label="Matière" value={crochet.material} />}
                {crochet?.deliveryTime && <Spec label="Délai" value={crochet.deliveryTime} />}
                <Spec label="Stock" value={product.stock > 0 ? 'Disponible' : 'Épuisé'} />
              </dl>
            )}

            {/* Options */}
            {(crochet?.sizes?.length || crochet?.colors?.length) && (
              <div className="mt-8 space-y-6">
                {crochet?.sizes?.length ? (
                  <OptionGroup label="Taille" values={crochet.sizes} value={size} onChange={setSize} />
                ) : null}
                {crochet?.colors?.length ? (
                  <OptionGroup label="Couleur" values={crochet.colors} value={color} onChange={setColor} />
                ) : null}
              </div>
            )}

            <div ref={actionsRef} className="mt-8 space-y-3">
              <div className="flex gap-3">
                <div className="flex h-[3.25rem] shrink-0 items-center rounded-full border border-warm-300">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="flex h-full w-11 items-center justify-center" aria-label="Diminuer la quantité">
                    <Minus size={15} />
                  </button>
                  <span className="price w-7 text-center">{quantity}</span>
                  <button onClick={() => setQuantity((q) => Math.min(20, q + 1))} className="flex h-full w-11 items-center justify-center" aria-label="Augmenter la quantité">
                    <Plus size={15} />
                  </button>
                </div>
                <button onClick={handleAdd} disabled={soldOut} className="btn-secondary flex-1">
                  {added ? <Check size={17} /> : <ShoppingBag size={17} />}
                  {soldOut ? 'Épuisé' : added ? 'Ajouté' : 'Ajouter au panier'}
                </button>
              </div>
              <button onClick={handleBuyNow} disabled={soldOut} className="btn-primary w-full">
                <Zap size={16} /> Acheter maintenant
              </button>
              <a
                href={whatsappLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full !bg-[#1f7a4d]"
              >
                <MessageCircle size={17} /> Commander sur WhatsApp
              </a>
              <p className="pt-1 text-center text-xs text-warm-500">
                Wave · Orange Money · MTN · Moov · ou paiement à la livraison
              </p>
            </div>

            <ul className="mt-8 space-y-3 border-t border-warm-200 pt-6">
              {usp[product.volet].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-warm-600">
                  <Icon size={17} strokeWidth={1.5} className="text-brand-ink" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Onglets */}
      <section className="border-y border-warm-200 bg-brand-soft py-16 lg:py-24">
        <div className="container-luxury max-w-4xl">
          <div className="mb-10 flex justify-center gap-1 rounded-full bg-cream-white p-1 shadow-sm sm:mx-auto sm:w-fit" role="tablist">
            {tabs.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className="relative flex-1 rounded-full px-4 py-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.16em] sm:flex-none sm:px-7"
              >
                {tab === t.key && (
                  <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-brand-deep" transition={{ duration: 0.5, ease: EASE }} />
                )}
                <span className={cn('relative transition-colors', tab === t.key ? 'text-cream-white' : 'text-deep-black')}>
                  {t.label}
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="text-[0.9375rem] leading-relaxed text-warm-600"
            >
              {tab === 'details' && (
                <div className="space-y-5">
                  <p className="whitespace-pre-line">{product.longDescription || product.description}</p>
                  {product.details && <p className="text-sm text-warm-500">{product.details}</p>}
                  {sweet?.benefits?.length ? (
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {sweet.benefits.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              )}

              {tab === 'composition' && (
                <div>
                  {fragrance?.notes ? (
                    <div className="grid gap-4 sm:grid-cols-3">
                      {(
                        [
                          ['Notes de tête', fragrance.notes.top],
                          ['Notes de cœur', fragrance.notes.heart],
                          ['Notes de fond', fragrance.notes.base],
                        ] as const
                      ).map(([label, notes]) =>
                        notes?.length ? (
                          <div key={label} className="rounded-soft bg-cream-white p-6">
                            <p className="eyebrow-label text-brand-ink">{label}</p>
                            <p className="mt-3 font-brand text-xl text-deep-black">{notes.join(', ')}</p>
                          </div>
                        ) : null,
                      )}
                    </div>
                  ) : product.ingredients?.length ? (
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {product.ingredients.map((ing) => (
                        <li key={ing} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                          {ing}
                        </li>
                      ))}
                    </ul>
                  ) : crochet ? (
                    <p>
                      {crochet.material ?? 'Fil de coton premium'}. Chaque pièce est crochetée à la main, avec des finitions
                      soignées. Couleurs personnalisables sur demande.
                    </p>
                  ) : (
                    <p>Huiles végétales, beurre de karité et extraits de plantes africaines. Sans parabènes ni sulfates.</p>
                  )}
                </div>
              )}

              {tab === 'usage' && (
                <p className="whitespace-pre-line">
                  {product.usage ??
                    (fragrance
                      ? 'Vaporisez sur les points de pulsation : poignets, cou, derrière les oreilles. Évitez de frotter, cela altère les notes de tête.'
                      : crochet
                        ? 'Lavage à la main à l’eau tiède, séchage à plat pour préserver la forme. Rangez à plat ou suspendu, à l’abri du soleil direct.'
                        : 'Appliquez sur cheveux secs ou humides en massant le cuir chevelu. Utilisez 2 à 3 fois par semaine.')}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Suggestions */}
      {similar.length > 0 && (
        <section className="py-20 lg:py-28">
          <div className="container-luxury">
            <Reveal className="mb-12 flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow-label mb-3 text-brand-ink">{brandName}</p>
                <h2 className="font-brand text-4xl sm:text-5xl">Vous aimerez aussi</h2>
              </div>
              <Link href={path} className="link-underline hidden text-xs font-medium uppercase tracking-[0.2em] sm:inline-flex">
                Tout voir
              </Link>
            </Reveal>
            <RevealGroup className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
              {similar.map((p) => (
                <RevealItem key={p.id}>
                  <ProductCard product={p} showBrand={false} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* Barre d'achat mobile (visiteurs venant des publicités) */}
      <AnimatePresence>
        {!actionsVisible && !soldOut && (
          <motion.div
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            exit={{ y: '110%' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-x-0 bottom-0 z-30 border-t border-warm-200 bg-cream-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded-md bg-warm-100">
                <Image src={product.image} alt="" fill sizes="40px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{product.name}</p>
                <p className="price text-sm text-gold-dark">{product.price.toLocaleString('fr-FR')} FCFA</p>
              </div>
              <a
                href={whatsappLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Commander sur WhatsApp"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1f7a4d] text-white"
              >
                <MessageCircle size={18} />
              </a>
              <button onClick={handleBuyNow} className="btn-primary !min-h-11 shrink-0 !px-5 !text-[0.6875rem]">
                Acheter
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-cream-white px-4 py-3">
      <dt className="text-[0.625rem] uppercase tracking-[0.18em] text-warm-500">{label}</dt>
      <dd className="mt-1 font-medium text-deep-black">{value}</dd>
    </div>
  )
}

function OptionGroup({
  label,
  values,
  value,
  onChange,
}: {
  label: string
  values: string[]
  value: string | null
  onChange: (v: string | null) => void
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em]">
        {label}
        {value && <span className="ml-2 normal-case tracking-normal text-warm-500">— {value}</span>}
      </p>
      <div className="flex flex-wrap gap-2">
        {values.map((v) => (
          <button key={v} onClick={() => onChange(value === v ? null : v)} aria-pressed={value === v} className="chip normal-case tracking-normal">
            {v}
          </button>
        ))}
      </div>
    </div>
  )
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
