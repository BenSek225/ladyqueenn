import { notFound } from 'next/navigation'
import { getProductBySlug, getAllProductPaths } from '@/lib/data/all-products'
import { ProductDetailLayout } from '@/components/product/product-detail-layout'

// Génération statique des pages pour tous les produits Sweet-Hair
export async function generateStaticParams() {
  const paths = getAllProductPaths()
  return paths
    .filter(p => p.volet === 'cheveux')
    .map(p => ({ slug: p.slug }))
}

// Métadonnées dynamiques
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  
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

export default function SweetHairProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  
  // Si produit inexistant ou pas du bon volet, 404
  if (!product || product.volet !== 'sweet-hair') {
    notFound()
  }

  return <ProductDetailLayout product={product} />
}
