'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { searchProducts, filterProducts, FilterOptions } from '@/lib/utils/search'
import { ProductCard } from '@/components/product-card'
import { SearchFilters } from '@/components/search/search-filters'
import { Search } from 'lucide-react'
import Link from 'next/link'

export function SearchPageContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [filters, setFilters] = useState<FilterOptions>({})
  
  // Recherche de base
  const searchResults = useMemo(() => {
    return searchProducts(query)
  }, [query])
  
  // Application des filtres
  const filteredProducts = useMemo(() => {
    const products = searchResults.map(r => r.product)
    return filterProducts(products, filters)
  }, [searchResults, filters])
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }
  
  return (
    <main className="min-h-screen bg-cream-white">
      <div className="bg-white border-b border-warm-200 py-8">
        <div className="container-luxury">
          {query ? (
            <>
              <p className="eyebrow-label mb-2">RÉSULTATS DE RECHERCHE</p>
              <h1 className="font-display text-4xl md:text-5xl mb-2">
                « {query} »
              </h1>
              <p className="text-warm-500">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
              </p>
            </>
          ) : (
            <>
              <h1 className="font-display text-4xl md:text-5xl mb-2">
                Tous nos produits
              </h1>
              <p className="text-warm-500">
                Découvrez notre collection complète
              </p>
            </>
          )}
        </div>
      </div>
      
      <div className="container-luxury py-12">
        {searchResults.length === 0 && query ? (
          // Aucun résultat
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-warm-100 rounded-full mb-6">
              <Search className="w-10 h-10 text-warm-400" />
            </div>
            <h2 className="font-display text-3xl mb-4">Aucun résultat trouvé</h2>
            <p className="text-warm-500 mb-8 max-w-md mx-auto">
              Nous n'avons pas trouvé de produit correspondant à « {query} ».
              Essayez avec d'autres mots-clés ou parcourez nos univers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sweet-hair" className="btn-secondary">
                Découvrir Sweet-Hair
              </Link>
              <Link href="/fragrance" className="btn-secondary">
                Découvrir Fragrance
              </Link>
              <Link href="/crochet-by-thed" className="btn-secondary">
                Découvrir Crochet
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
            {/* Filtres sidebar */}
            <aside className="lg:sticky lg:top-24 self-start">
              <SearchFilters
                initialProducts={searchResults.map(r => r.product)}
                onFilterChange={handleFilterChange}
                currentFilters={filters}
              />
            </aside>
            
            {/* Grille produits */}
            <div>
              {/* Barre de tri */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-warm-200">
                <p className="text-sm text-warm-500">
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
                </p>
                
                <select
                  onChange={(e) => handleFilterChange({ sortBy: e.target.value as any })}
                  className="text-sm border border-warm-200 rounded-lg px-4 py-2 bg-white focus:border-gold-champagne focus:outline-none"
                >
                  <option value="">Trier par</option>
                  <option value="newest">Nouveautés</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="name-asc">Nom A-Z</option>
                  <option value="name-desc">Nom Z-A</option>
                </select>
              </div>
              
              {/* Grille */}
              {filteredProducts.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24">
                  <p className="text-warm-500 text-lg mb-2">
                    Aucun produit ne correspond à ces filtres
                  </p>
                  <button
                    onClick={() => setFilters({})}
                    className="text-gold-champagne hover:underline text-sm"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
