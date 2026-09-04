import { notFound } from 'next/navigation'
import { getProductBySlug, getAllProductPaths } from '@/lib/data/all-products'
import { ProductDetailLayout } from '@/components/product/product-detail-layout'

// Génération statique des pages pour tous les produits Sweet-Hair
export async function generateStaticParams() {
  const paths = getAllProductPaths()
  return paths
    .filter(p => p.volet === 'sweet-hair')
    .map(p => ({ slug: p.slug }))
}

// Métadonnées dynamiques
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  
  if (!product || product.volet !== 'sweet-hair') {
    return {
      title: 'Produit non trouvé | Lady Queenn',
    }
  }

  return {
    title: `${product.name} — Sweet-Hair | Lady Queenn`,
    description: product.description,
  }
}

export default async function SweetHairProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  
  // Si produit inexistant ou pas du bon volet, 404
  if (!product || product.volet !== 'sweet-hair') {
    notFound()
  }

  return <ProductDetailLayout product={product} />
}
