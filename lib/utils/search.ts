// Utilitaires de recherche et filtrage
import { allProducts } from '@/lib/data/all-products'
import type { Product, Volet, AnyProduct, SearchResult } from '@/lib/types'

/**
 * Recherche globale dans tous les produits
 * @param query - Terme de recherche
 * @returns Produits triés par pertinence
 */
export function searchProducts(query: string): SearchResult[] {
  if (!query || query.trim().length < 2) {
    return []
  }

  const normalizedQuery = query.toLowerCase().trim()
  
  const results = allProducts
    .map((product) => {
      let relevance = 0
      
      // Recherche dans le nom (poids fort)
      if (product.name.toLowerCase().includes(normalizedQuery)) {
        relevance += 10
        // Bonus si le nom commence par la requête
        if (product.name.toLowerCase().startsWith(normalizedQuery)) {
          relevance += 5
        }
      }
      
      // Recherche dans la description
      if (product.description.toLowerCase().includes(normalizedQuery)) {
        relevance += 5
      }
      
      // Recherche dans la catégorie
      if (product.category?.toLowerCase().includes(normalizedQuery)) {
        relevance += 3
      }
      
      // Recherche dans le volet
      const voletNames = {
        'sweet-hair': ['sweet', 'hair', 'cheveux', 'capillaire', 'soin'],
        'fragrance': ['fragrance', 'parfum', 'corps', 'senteur'],
        'crochet-by-thed': ['crochet', 'thed', 'maison', 'artisanal', 'fait main'],
      }
      
      const voletKeywords = voletNames[product.volet] || []
      if (voletKeywords.some(keyword => normalizedQuery.includes(keyword))) {
        relevance += 2
      }
      
      return {
        product,
        volet: product.volet,
        relevance,
      } as SearchResult
    })
    .filter(result => result.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
  
  return results
}

/**
 * Filtrer les produits par critères
 */
export interface FilterOptions {
  volet?: Volet[]
  category?: string[]
  priceRange?: { min: number; max: number }
  inStock?: boolean
  badges?: string[]
  sortBy?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest'
}

export function filterProducts(
  products: Product[] = allProducts,
  options: FilterOptions = {}
): Product[] {
  let filtered = [...products]
  
  // Filtre par volet
  if (options.volet && options.volet.length > 0) {
    filtered = filtered.filter(p => options.volet!.includes(p.volet))
  }
  
  // Filtre par catégorie
  if (options.category && options.category.length > 0) {
    filtered = filtered.filter(p => 
      p.category && options.category!.includes(p.category)
    )
  }
  
  // Filtre par prix
  if (options.priceRange) {
    const { min, max } = options.priceRange
    filtered = filtered.filter(p => p.price >= min && p.price <= max)
  }
  
  // Filtre par stock
  if (options.inStock) {
    filtered = filtered.filter(p => p.stock > 0)
  }
  
  // Filtre par badges
  if (options.badges && options.badges.length > 0) {
    filtered = filtered.filter(p => 
      p.badge && options.badges!.includes(p.badge)
    )
  }
  
  // Tri
  if (options.sortBy) {
    switch (options.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'newest':
        // Supposons que les nouveaux produits ont le badge 'nouveau'
        filtered.sort((a, b) => {
          if (a.badge === 'nouveau' && b.badge !== 'nouveau') return -1
          if (a.badge !== 'nouveau' && b.badge === 'nouveau') return 1
          return 0
        })
        break
    }
  }
  
  return filtered
}

/**
 * Obtenir les plages de prix disponibles
 */
export function getPriceRange(products: Product[] = allProducts): { min: number; max: number } {
  if (products.length === 0) {
    return { min: 0, max: 100000 }
  }
  
  const prices = products.map(p => p.price)
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  }
}

/**
 * Obtenir toutes les catégories disponibles par volet
 */
export function getCategoriesByVolet(volet: Volet): string[] {
  const voletProducts = allProducts.filter(p => p.volet === volet)
  const categories = new Set(
    voletProducts
      .map(p => p.category)
      .filter((c): c is string => c !== undefined)
  )
  return Array.from(categories)
}

/**
 * Obtenir les suggestions de recherche (autocomplete)
 */
export function getSearchSuggestions(query: string, limit: number = 5): string[] {
  if (!query || query.trim().length < 2) {
    return []
  }
  
  const normalizedQuery = query.toLowerCase().trim()
  const suggestions = new Set<string>()
  
  allProducts.forEach(product => {
    // Ajouter le nom du produit s'il correspond
    if (product.name.toLowerCase().includes(normalizedQuery)) {
      suggestions.add(product.name)
    }
    
    // Ajouter la catégorie si elle correspond
    if (product.category?.toLowerCase().includes(normalizedQuery)) {
      suggestions.add(product.category)
    }
  })
  
  return Array.from(suggestions).slice(0, limit)
}
