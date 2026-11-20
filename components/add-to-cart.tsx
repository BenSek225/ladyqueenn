'use client'

import { Check, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import type { Product } from '@/lib/types'
import { useCart } from '@/lib/store'
import { cn } from '@/lib/utils'
import { toast } from '@/components/shared/toast'

interface AddToCartProps {
  product: Product
  className?: string
  variant?: 'dark' | 'light'
}

export function AddToCart({ product, className, variant = 'dark' }: AddToCartProps) {
  const [added, setAdded] = useState(false)
  const addItem = useCart((s) => s.addItem)
  const soldOut = product.stock === 0

  const handleClick = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, volet: product.volet })
    toast.success('Ajouté au panier', product.name)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <button
      onClick={handleClick}
      disabled={soldOut}
      className={cn(variant === 'light' ? 'btn-gold' : 'btn-primary', className)}
    >
      {soldOut ? (
        'Épuisé'
      ) : added ? (
        <>
          <Check size={17} /> Ajouté au panier
        </>
      ) : (
        <>
          <ShoppingBag size={17} /> Ajouter au panier
        </>
      )}
    </button>
  )
}
