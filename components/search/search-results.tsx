'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SearchResult } from '@/lib/types'
import { getVoletPath, getUniverseName } from '@/lib/data/all-products'
import { formatPrice } from '@/lib/utils'

interface SearchResultsProps {
  results: SearchResult[]
  onClose: () => void
}

export function SearchResults({ results, onClose }: SearchResultsProps) {
  // Grouper les résultats par volet
  const groupedResults = results.reduce((acc, result) => {
    const volet = result.volet
    if (!acc[volet]) {
      acc[volet] = []
    }
    acc[volet].push(result)
    return acc
  }, {} as Record<string, SearchResult[]>)
  
  const voletOrder: Array<'sweet-hair' | 'fragrance' | 'crochet-by-thed'> = [
    'sweet-hair',
    'fragrance',
    'crochet-by-thed',
  ]
  
  return (
    <div className="space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
      {voletOrder.map((volet) => {
        const voletResults = groupedResults[volet]
        if (!voletResults || voletResults.length === 0) return null
        
        const voletColors = {
          'sweet-hair': 'text-sh-olive',
          'fragrance': 'text-fr-plum',
          'crochet-by-thed': 'text-cr-earth',
        }
        
        return (
          <div key={volet}>
            {/* Titre volet */}
            <h3 className={`eyebrow-label ${voletColors[volet]} mb-4`}>
              {getUniverseName(volet)} ({voletResults.length})
            </h3>
            
            {/* Grille produits */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {voletResults.slice(0, 6).map((result) => {
                const product = result.product
                const productPath = `/${getVoletPath(product.volet)}/${product.slug}`
                
                return (
                  <Link
                    key={product.id}
                    href={productPath}
                    onClick={onClose}
                    className="group flex gap-4 bg-white rounded-lg p-4 hover:shadow-lg transition-all duration-normal"
                  >
                    {/* Image */}
                    <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-slow"
                      />
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-deep-black group-hover:text-gold-champagne transition-colors mb-1 truncate">
                        {product.name}
                      </h4>
                      <p className="text-sm text-warm-500 mb-2 line-clamp-1">
                        {product.description}
                      </p>
                      <p className="font-mono text-sm font-semibold text-gold-dark">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
            
            {/* Voir plus */}
            {voletResults.length > 6 && (
              <Link
                href={`/${getVoletPath(volet)}`}
                onClick={onClose}
                className="inline-flex items-center gap-2 mt-4 text-sm text-warm-500 hover:text-gold-champagne transition-colors"
              >
                Voir tous les produits {getUniverseName(volet)} ({voletResults.length})
              </Link>
            )}
          </div>
        )
      })}
      
      {/* Lien vers page recherche complète */}
      {results.length > 12 && (
        <div className="text-center pt-6 border-t border-warm-200">
          <Link
            href={`/recherche?q=${encodeURIComponent('')}`}
            onClick={onClose}
            className="btn-secondary"
          >
            Voir tous les résultats ({results.length})
          </Link>
        </div>
      )}
    </div>
  )
}
