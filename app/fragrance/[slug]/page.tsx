import { notFound } from 'next/navigation'
import { getProductBySlug, getAllProductPaths } from '@/lib/data/all-products'
import { ProductDetailLayout } from '@/components/product/product-detail-layout'

// Génération statique des pages pour tous les produits Fragrance
export async function generateStaticParams() {
  const paths = getAllProductPaths()
  return paths
    .filter(p => p.volet === 'fragrance')
    .map(p => ({ slug: p.slug }))
}

// Métadonnées dynamiques
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  
  if (!product || product.volet !== 'fragrance') {
    return {
      title: 'Produit non trouvé | Lady Queenn',
    }
  }

  return {
    title: `${product.name} — Fragrance | Lady Queenn`,
    description: product.description,
  }
}

export default async function FragranceProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  
  // Si produit inexistant ou pas du bon volet, 404
  if (!product || product.volet !== 'fragrance') {
    notFound()
  }

  return <ProductDetailLayout product={product} />
}
