'use client'

import { useState } from 'react'
import { sweetHairProducts } from '@/lib/data/sweet-hair-products'
import { fragranceProducts } from '@/lib/data/fragrance-products'
import { crochetProducts } from '@/lib/data/crochet-products'
import { ProductCard } from './product-card'
import type { Product } from '@/lib/types'

// Fusionner tous les produits
const allProducts: Product[] = [
  ...sweetHairProducts,
  ...fragranceProducts,
  ...crochetProducts,
]

// Extraire les univers uniques
const universes = ['Tout', ...Array.from(new Set(allProducts.map((p) => p.volet)))]

export function ProductGrid() {
  const [universe, setUniverse] = useState('Tout')

  const shown = universe === 'Tout' ? allProducts : allProducts.filter((p) => p.volet === universe)

  return (
    <section id="boutique" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow-label">La sélection</p>
          <h2 className="mt-3 font-display text-4xl italic md:text-5xl">Choisir avec intention.</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {universes.map((u) => (
            <button
              key={u}
              onClick={() => setUniverse(u)}
              className={`border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all duration-normal rounded-soft ${
                universe === u
                  ? 'border-deep-black bg-deep-black text-cream-white'
                  : 'border-warm-gray-300 text-deep-black hover:border-champagne-gold hover:text-champagne-gold'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
        {shown.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
