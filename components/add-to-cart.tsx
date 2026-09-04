'use client'

import { ShoppingBag, Check } from 'lucide-react'
import { useState } from 'react'
import type { Product } from '@/lib/types'
import { useCart } from '@/lib/store'

interface AddToCartProps {
  product: Product
  className?: string
}

export function AddToCart({ product, className = '' }: AddToCartProps) {
  const [added, setAdded] = useState(false)
  const addItem = useCart((s) => s.addItem)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      volet: product.volet,
    })

    // Animation feedback
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={product.stock === 0}
      className={`flex items-center justify-center gap-3 px-8 py-4 bg-deep-black text-cream-white rounded-soft font-medium hover:bg-champagne-gold hover:text-deep-black transition-all duration-normal disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
    >
      {added ? (
        <>
          <Check size={20} />
          <span>Ajouté au panier !</span>
        </>
      ) : (
        <>
          <ShoppingBag size={20} />
          <span>Ajouter au panier — {product.price.toLocaleString('fr-FR')} FCFA</span>
        </>
      )}
    </button>
  )
}
