import { sweetHairProducts } from './sweet-hair-products'
import { fragranceProducts } from './fragrance-products'
import { crochetProducts } from './crochet-products'
import type { Product } from '@/lib/types'

// Fusionner tous les produits
export const allProducts: Product[] = [
  ...sweetHairProducts,
  ...fragranceProducts,
  ...crochetProducts,
]

// Helper pour convertir volet en nom univers
export function getUniverseName(volet: string): string {
  if (volet === 'sweet-hair') return 'Sweet-Hair'
  if (volet === 'fragrance') return 'Fragrance'
  if (volet === 'crochet-by-thed') return 'Crochet by THED'
  return 'Lady Queenn'
}

// Helper pour convertir volet en path
export function getVoletPath(volet: string): string {
  if (volet === 'sweet-hair') return 'sweet-hair'
  if (volet === 'fragrance') return 'fragrance'
  if (volet === 'crochet-by-thed') return 'crochet-by-thed'
  return ''
}

// Fonction pour récupérer un produit par slug
export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((product) => product.slug === slug)
}

// Fonction pour récupérer des produits similaires (même volet, excluant le produit actuel)
export function getSimilarProducts(productId: string, volet: string, limit: number = 4): Product[] {
  return allProducts
    .filter((product) => product.volet === volet && product.id !== productId)
    .slice(0, limit)
}

// Fonction pour générer les chemins statiques (pour generateStaticParams)
export function getAllProductPaths() {
  return allProducts.map((product) => ({
    volet: getVoletPath(product.volet),
    slug: product.slug,
  }))
}
