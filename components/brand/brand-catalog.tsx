'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Product } from '@/lib/types'
import { ProductCard } from '@/components/product-card'
import { cn } from '@/lib/utils'

export interface CatalogFilter {
  key: string
  label: string
}

/** Grille produits d'une marque avec filtres animés. */
export function BrandCatalog({
  products,
  filters,
  tone = 'light',
  noun = ['produit', 'produits'],
}: {
  products: Product[]
  filters: CatalogFilter[]
  tone?: 'light' | 'dark'
  noun?: [string, string]
}) {
  const [active, setActive] = useState('all')
  const visible = useMemo(
    () => (active === 'all' ? products : products.filter((p) => p.category === active)),
    [active, products],
  )
  const available = filters.filter((f) => f.key === 'all' || products.some((p) => p.category === f.key))
  const dark = tone === 'dark'

  return (
    <div>
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filtrer">
          {available.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              aria-pressed={active === f.key}
              className={cn('chip shrink-0', dark && 'chip-dark')}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className={cn('price text-xs uppercase tracking-[0.18em]', dark ? 'text-cream-white/50' : 'text-warm-500')}>
          {visible.length} {visible.length > 1 ? noun[1] : noun[0]}
        </p>
      </div>

      <motion.div layout className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
        <AnimatePresence mode="popLayout">
          {visible.map((product, i) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard product={product} tone={tone} showBrand={false} priority={i < 4} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
