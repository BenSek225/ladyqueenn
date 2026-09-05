'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Check } from 'lucide-react'
import type { Product } from '@/lib/types'
import { useCart } from '@/lib/store'
import { getUniverseName, getVoletPath } from '@/lib/data/all-products'
import { badgeLabel } from '@/lib/utils'
import { toast } from '@/components/shared/toast'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const addItem = useCart((s) => s.addItem)
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  // Définir le volet path selon le volet
  const voletPath = getVoletPath(product.volet)
  const productUrl = `/${voletPath}/${product.slug}`

  // Couleurs selon volet pour l'eyebrow
  const voletColors = {
    'sweet-hair': 'text-sh-olive',
    'fragrance': 'text-fr-plum',
    'crochet-by-thed': 'text-cr-earth',
  }

  // Couleur badge selon le type
  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'nouveau':
        return 'bg-sh-light text-sh-olive border border-sh-olive/20'
      case 'promo':
        return 'bg-fr-light text-fr-plum border border-fr-plum/20'
      case 'coup-de-coeur':
        return 'bg-champagne-gold/20 text-gold-dark border border-champagne-gold'
      case 'limité':
        return 'bg-cr-light text-cr-earth border border-cr-earth/20'
      case 'épuisé':
        return 'bg-warm-200 text-warm-500 border border-warm-300'
      default:
        return 'bg-warm-100 text-warm-500 border border-warm-200'
    }
  }

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isAdding || justAdded) return
    
    setIsAdding(true)
    
    // Animation courte pour feedback
    await new Promise(resolve => setTimeout(resolve, 200))
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      volet: product.volet,
    })
    
    // Toast de succès
    toast.success('Ajouté au panier', `${product.name} a été ajouté à votre panier`)
    
    setIsAdding(false)
    setJustAdded(true)
    
    // Reset après 2 secondes
    setTimeout(() => setJustAdded(false), 2000)
  }

  const isOutOfStock = product.stock === 0

  return (
    <article className="group bg-white rounded-lg overflow-hidden border border-transparent hover:border-warm-200 hover:shadow-lg transition-all duration-300 float-on-hover">
      <Link href={productUrl} className="block">
        {/* Image Container - Ratio 4:5 */}
        <div className="relative aspect-[4/5] overflow-hidden bg-warm-100">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            priority={priority}
            className="object-cover transition-transform duration-700 group-hover:scale-110" 
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          
          {/* Overlay gradient subtil au hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-deep-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          {/* Badge top-left */}
          {product.badge && (
            <div className="absolute left-3 top-3">
              <span className={`inline-block px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-[0.1em] ${getBadgeStyle(product.badge)} pulse-soft`}>
                {badgeLabel(product.badge)}
              </span>
            </div>
          )}

          {/* Bouton Add to Cart bottom-right avec animation */}
          {!isOutOfStock && (
            <button 
              aria-label={`Ajouter ${product.name} au panier`}
              onClick={handleAddToCart}
              disabled={isAdding || justAdded}
              className={`absolute bottom-4 right-4 flex items-center justify-center rounded-full shadow-xl min-w-[48px] min-h-[48px]
                opacity-0 translate-y-4 scale-90 transition-all duration-400
                group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100
                ${justAdded 
                  ? 'bg-green-600 text-white scale-110 animate-pulse' 
                  : 'bg-deep-black text-cream-white hover:bg-champagne-gold hover:text-deep-black hover:scale-110'
                }
                ${isAdding ? 'cursor-wait animate-pulse' : 'cursor-pointer hover-only'}
                disabled:cursor-not-allowed scale-on-hover
              `}
            >
              {isAdding ? (
                <div className="w-5 h-5 border-2 border-cream-white border-t-transparent rounded-full animate-spin" />
              ) : justAdded ? (
                <Check size={20} className="animate-scale-in" />
              ) : (
                <Plus size={20} />
              )}
            </button>
          )}
          
          {/* Badge épuisé */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-warm-100/80 flex items-center justify-center backdrop-blur-sm">
              <span className="px-4 py-2 bg-warm-500 text-white text-sm font-semibold uppercase tracking-wider rounded-lg">
                Épuisé
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Info Produit */}
      <div className="p-4 space-y-2">
        {/* Eyebrow - Volet ou Catégorie */}
        <p className={`eyebrow-label ${voletColors[product.volet]}`}>
          {getUniverseName(product.volet)}
        </p>

        {/* Nom du produit */}
        <Link 
          href={productUrl} 
          className="block font-display text-lg lg:text-xl leading-tight text-deep-black group-hover:text-champagne-gold transition-colors duration-normal line-clamp-2 min-h-[3.5rem]"
        >
          {product.name}
        </Link>

        {/* Description courte (optionnelle si on veut) */}
        {product.description && (
          <p className="text-sm text-warm-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Prix */}
        <div className="flex items-baseline gap-2 pt-1">
          <p className="font-mono text-lg font-bold text-gold-dark">
            {product.price.toLocaleString('fr-FR')} FCFA
          </p>
          {product.oldPrice && (
            <p className="text-sm text-warm-400 line-through font-mono">
              {product.oldPrice.toLocaleString('fr-FR')}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
