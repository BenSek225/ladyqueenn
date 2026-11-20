import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allProducts, getProductBySlug, getUniverseName, getVoletPath } from '@/lib/data/all-products'
import { ProductDetailLayout } from '@/components/product/product-detail-layout'
import { ProductSchema } from '@/components/seo/structured-data'
import type { Volet } from '@/lib/types'

type Props = { params: Promise<{ slug: string }> }

/**
 * Fabrique les fonctions d'une page produit (une par marque).
 * Les métadonnées Open Graph donnent un bel aperçu quand le lien
 * est partagé ou utilisé dans une publicité Facebook / Instagram / WhatsApp.
 */
export function productPage(volet: Volet) {
  async function generateStaticParams() {
    return allProducts.filter((p) => p.volet === volet).map((p) => ({ slug: p.slug }))
  }

  async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const product = getProductBySlug(slug)
    if (!product || product.volet !== volet) return { title: 'Produit introuvable | Lady Queen' }

    const brand = getUniverseName(volet)
    const price = `${product.price.toLocaleString('fr-FR')} FCFA`
    const title = `${product.name} — ${brand}`
    const description = `${product.description}. ${price} · Livraison à Abidjan, partout en Côte d’Ivoire et à l’international. Commande en 1 clic ou sur WhatsApp.`
    const url = `/${getVoletPath(volet)}/${product.slug}`

    return {
      title: `${title} | Lady Queen`,
      description,
      alternates: { canonical: url },
      openGraph: {
        type: 'website',
        url,
        siteName: 'Lady Queen',
        locale: 'fr_CI',
        title: `${title} · ${price}`,
        description,
        images: [{ url: product.image, width: 1200, height: 1500, alt: product.name }],
      },
      twitter: { card: 'summary_large_image', title: `${title} · ${price}`, description, images: [product.image] },
      other: {
        'product:price:amount': String(product.price),
        'product:price:currency': 'XOF',
        'product:availability': product.stock > 0 ? 'in stock' : 'out of stock',
        'product:brand': brand,
        'product:retailer_item_id': product.id,
      },
    }
  }

  async function Page({ params }: Props) {
    const { slug } = await params
    const product = getProductBySlug(slug)
    if (!product || product.volet !== volet) notFound()
    return (
      <>
        <ProductSchema
          name={product.name}
          description={product.description}
          image={product.image}
          price={product.price}
          sku={product.id}
          brand={getUniverseName(volet)}
        />
        <ProductDetailLayout product={product} />
      </>
    )
  }

  return { generateStaticParams, generateMetadata, Page }
}
