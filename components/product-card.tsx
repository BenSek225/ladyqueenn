'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import type { Product } from '@/lib/types'
import { useCart } from '@/lib/store'
import { getUniverseName, getVoletPath } from '@/lib/data/all-products'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((s) => s.addItem)

  // Définir le volet path selon le volet
  const voletPath = getVoletPath(product.volet)
  const productUrl = `/${voletPath}/${product.slug}`

  // Couleur badge selon volet
  const badgeClass = product.volet === 'sweet-hair' ? 'bg-sh-light text-sh-olive' :
                     product.volet === 'fragrance' ? 'bg-fr-light text-fr-plum' :
                     'bg-cr-light text-cr-earth'

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <article className="group">
      <Link href={productUrl}>
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-warm-gray-100 rounded-soft mb-4">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            className="object-cover transition duration-slower group-hover:scale-105" 
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          
          {/* Badge */}
          {product.badge && (
            <span className={`absolute left-3 top-3 px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider ${badgeClass}`}>
              {product.badge}
            </span>
          )}

          {/* Bouton Add to Cart au hover */}
          <button 
            aria-label={`Ajouter ${product.name} au panier`}
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center bg-deep-black text-cream-white rounded-full opacity-0 translate-y-2 transition-all duration-normal group-hover:translate-y-0 group-hover:opacity-100 hover:bg-champagne-gold hover:text-deep-black"
          >
            <Plus size={20} />
          </button>
        </div>
      </Link>

      {/* Info Produit */}
      <div className="space-y-2">
        {/* Catégorie / Univers */}
        <p className="text-xs uppercase tracking-wider text-warm-500">
          {product.category}
        </p>

        {/* Nom */}
        <Link 
          href={productUrl} 
          className="block font-display text-lg leading-tight text-deep-black hover:text-champagne-gold transition-colors"
        >
          {product.name}
        </Link>

        {/* Prix */}
        <div className="flex items-baseline gap-2">
          <p className="font-mono text-base font-bold text-champagne-gold">
            {product.price.toLocaleString('fr-FR')} FCFA
          </p>
          {product.oldPrice && (
            <p className="text-sm text-warm-500 line-through">
              {product.oldPrice.toLocaleString('fr-FR')} FCFA
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
