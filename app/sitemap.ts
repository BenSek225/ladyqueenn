import { MetadataRoute } from 'next'
import { sweetHairProducts } from '@/lib/data/sweet-hair-products'
import { fragranceProducts } from '@/lib/data/fragrance-products'
import { crochetProducts } from '@/lib/data/crochet-products'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ladyqueenn.vercel.app'
  
  // Pages principales
  const routes = [
    '',
    '/sweet-hair',
    '/fragrance',
    '/crochet-by-thed',
    '/commande',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Pages produits Sweet-Hair
  const sweetHairRoutes = sweetHairProducts.map((product) => ({
    url: `${baseUrl}/sweet-hair/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Pages produits Fragrance
  const fragranceRoutes = fragranceProducts.map((product) => ({
    url: `${baseUrl}/fragrance/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Pages produits Crochet
  const crochetRoutes = crochetProducts.map((product) => ({
    url: `${baseUrl}/crochet-by-thed/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...routes, ...sweetHairRoutes, ...fragranceRoutes, ...crochetRoutes]
}
