import { AnyProduct, Volet } from '../types'
import { sweetHairProducts } from './sweet-hair-products'
import { fragranceProducts } from './fragrance-products'
import { crochetProducts } from './crochet-products'

// Tous les produits de la plateforme
export const allProducts: AnyProduct[] = [
  ...sweetHairProducts,
  ...fragranceProducts,
  ...crochetProducts
]

// Recherche globale
export function searchProducts(query: string): AnyProduct[] {
  const lowerQuery = query.toLowerCase().trim()
  
  if (!lowerQuery) return []

  return allProducts.filter(product => {
    const searchText = `
      ${product.name} 
      ${product.description} 
      ${product.category || ''} 
      ${product.volet}
    `.toLowerCase()
    
    return searchText.includes(lowerQuery)
  })
}

// Recherche par volet
export function searchProductsByVolet(query: string, volet: Volet): AnyProduct[] {
  const results = searchProducts(query)
  return results.filter(p => p.volet === volet)
}

// Obtenir un produit par ID (tous volets confondus)
export function getProductById(id: string): AnyProduct | undefined {
  return allProducts.find(p => p.id === id)
}

// Obtenir un produit par slug (tous volets confondus)
export function getProductBySlug(slug: string): AnyProduct | undefined {
  return allProducts.find(p => p.slug === slug)
}

// Obtenir tous les produits d'un volet
export function getProductsByVolet(volet: Volet): AnyProduct[] {
  return allProducts.filter(p => p.volet === volet)
}

// Obtenir les nouveautés (badge nouveau)
export function getNewProducts(limit = 6): AnyProduct[] {
  return allProducts
    .filter(p => p.badge === 'nouveau')
    .slice(0, limit)
}

// Obtenir les promos
export function getPromotions(limit = 6): AnyProduct[] {
  return allProducts
    .filter(p => p.badge === 'promo' && p.oldPrice)
    .slice(0, limit)
}

// Obtenir les coups de cœur
export function getFavorites(limit = 6): AnyProduct[] {
  return allProducts
    .filter(p => p.badge === 'coup-de-coeur')
    .slice(0, limit)
}

// Produits similaires (même volet, même catégorie)
export function getSimilarProducts(productId: string, limit = 4): AnyProduct[] {
  const product = getProductById(productId)
  if (!product) return []

  return allProducts
    .filter(p => 
      p.id !== productId && 
      p.volet === product.volet &&
      p.category === product.category
    )
    .slice(0, limit)
}

// Statistiques
export function getProductStats() {
  return {
    total: allProducts.length,
    sweetHair: sweetHairProducts.length,
    fragrance: fragranceProducts.length,
    crochet: crochetProducts.length,
    inStock: allProducts.filter(p => p.stock > 0).length,
    outOfStock: allProducts.filter(p => p.stock === 0).length
  }
}
