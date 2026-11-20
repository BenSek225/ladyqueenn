'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Check, Plus } from 'lucide-react'
import type { Product } from '@/lib/types'
import { useCart } from '@/lib/store'
import { getUniverseName, getVoletPath } from '@/lib/data/all-products'
import { badgeLabel, cn } from '@/lib/utils'
import { toast } from '@/components/shared/toast'

interface ProductCardProps {
  product: Product
  priority?: boolean
  tone?: 'light' | 'dark'
  showBrand?: boolean
}

const brandText = {
  'sweet-hair': 'text-sh-olive',
  fragrance: 'text-fr-plum',
  'crochet-by-thed': 'text-cr-earth',
} as const

export function ProductCard({ product, priority = false, tone = 'light', showBrand = true }: ProductCardProps) {
  const addItem = useCart((s) => s.addItem)
  const [justAdded, setJustAdded] = useState(false)
  const dark = tone === 'dark'
  const href = `/${getVoletPath(product.volet)}/${product.slug}`
  const secondImage = product.images?.find((img) => img !== product.image)
  const soldOut = product.stock === 0

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (justAdded) return
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, volet: product.volet })
    toast.success('Ajouté au panier', product.name)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1800)
  }

  return (
    <article className="group relative">
      <Link href={href} className="block" aria-label={product.name}>
        <div
          className={cn(
            'relative aspect-[4/5] overflow-hidden rounded-soft',
            dark ? 'bg-cream-white/5' : 'bg-warm-100',
          )}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              'object-cover transition-[transform,opacity] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]',
              secondImage && 'group-hover:opacity-0',
            )}
          />
          {secondImage && (
            <Image
              src={secondImage}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="scale-[1.06] object-cover opacity-0 transition-[transform,opacity] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100 group-hover:opacity-100"
            />
          )}

          {product.badge && !soldOut && (
            <span className="absolute left-3 top-3 rounded-full bg-cream-white/90 px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-deep-black backdrop-blur">
              {badgeLabel(product.badge)}
            </span>
          )}

          {soldOut && (
            <div className="absolute inset-0 flex items-center justify-center bg-cream-white/60 backdrop-blur-[2px]">
              <span className="rounded-full bg-deep-black px-4 py-1.5 text-[0.6875rem] uppercase tracking-[0.18em] text-cream-white">
                Épuisé
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex items-start justify-between gap-3 pt-4">
        <div className="min-w-0">
          {showBrand && (
            <p
              className={cn(
                'mb-1.5 text-[0.625rem] font-medium uppercase tracking-[0.22em]',
                dark ? 'text-fr-rose' : brandText[product.volet],
              )}
            >
              {getUniverseName(product.volet)}
            </p>
          )}
          <h3 className="line-clamp-2 font-display text-[1.0625rem] leading-snug sm:text-lg">
            <Link href={href} className="transition-colors hover:text-champagne-gold">
              {product.name}
            </Link>
          </h3>
          <p className="price mt-1.5 flex items-baseline gap-2 text-sm">
            <span className={dark ? 'text-champagne-gold' : 'text-gold-dark'}>
              {product.price.toLocaleString('fr-FR')} FCFA
            </span>
            {product.oldPrice && (
              <span className={cn('text-xs line-through', dark ? 'text-cream-white/40' : 'text-warm-400')}>
                {product.oldPrice.toLocaleString('fr-FR')}
              </span>
            )}
          </p>
        </div>

        {!soldOut && (
          <button
            onClick={handleAdd}
            aria-label={`Ajouter ${product.name} au panier`}
            className={cn(
              'mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500',
              justAdded
                ? 'border-champagne-gold bg-champagne-gold text-deep-black'
                : dark
                  ? 'border-cream-white/25 text-cream-white hover:border-champagne-gold hover:bg-champagne-gold hover:text-deep-black'
                  : 'border-warm-300 text-deep-black hover:border-deep-black hover:bg-deep-black hover:text-cream-white',
            )}
          >
            {justAdded ? <Check size={16} /> : <Plus size={16} />}
          </button>
        )}
      </div>
    </article>
  )
}
