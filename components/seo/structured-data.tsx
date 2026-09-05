/**
 * Structured Data JSON-LD pour SEO
 */

interface OrganizationSchemaProps {
  name?: string
}

export function OrganizationSchema({ name = 'Lady Queenn' }: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: name,
    url: 'https://ladyqueenn.vercel.app',
    logo: 'https://ladyqueenn.vercel.app/placeholder-logo.png',
    description: 'Soins naturels Sweet-Hair, parfums Fragrance, créations Crochet by THED. Beauty. Roots. Ritual.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Abidjan',
      addressCountry: 'CI',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+225-07-10-50-40-07',
      contactType: 'Customer Service',
      areaServed: 'CI',
      availableLanguage: 'French',
    },
    sameAs: [
      'https://instagram.com/ladyqueenn',
      'https://facebook.com/ladyqueenn',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ProductSchemaProps {
  name: string
  description: string
  image: string
  price: number
  sku?: string
  brand?: string
}

export function ProductSchema({
  name,
  description,
  image,
  price,
  sku,
  brand = 'Lady Queenn',
}: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
    description: description,
    image: `https://ladyqueenn.vercel.app${image}`,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    sku: sku || name.toLowerCase().replace(/\s+/g, '-'),
    offers: {
      '@type': 'Offer',
      url: 'https://ladyqueenn.vercel.app',
      priceCurrency: 'XOF',
      price: price,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Lady Queenn',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Lady Queenn',
    url: 'https://ladyqueenn.vercel.app',
    description: 'Soins naturels, parfums intemporels et créations artisanales.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://ladyqueenn.vercel.app/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
