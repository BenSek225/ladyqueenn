import type { Volet } from '@/lib/types'

/**
 * Les marques de la maison Lady Queen.
 * Chaque marque a sa propre personnalité (couleurs, police, ton) appliquée
 * via l'attribut data-brand (voir app/globals.css > THÈMES DE MARQUE).
 */
export interface Brand {
  slug: Volet
  name: string
  short: string
  category: string
  tagline: string
  description: string
  href: string
  image: string
  /** Classe de couleur du texte d'accent (pour les listes et étiquettes) */
  accentText: string
}

export const HOUSE = {
  name: 'Lady Queen',
  tagline: 'Beauty. Roots. Ritual.',
  baseline: 'La maison du raffinement ivoirien',
}

export const brands: Brand[] = [
  {
    slug: 'sweet-hair',
    name: 'Sweet-Hair',
    short: 'Sweet-Hair',
    category: 'Soins capillaires naturels',
    tagline: 'La nature sublime vos cheveux',
    description:
      'Huiles, shampooings et pommades aux ingrédients naturels pour nourrir, fortifier et faire briller toutes les textures.',
    href: '/sweet-hair',
    image: '/images/hero/sweet-hair.png',
    accentText: 'text-sh-olive',
  },
  {
    slug: 'fragrance',
    name: 'Fragrance',
    short: 'Fragrance',
    category: 'Parfums de grandes maisons',
    tagline: 'Votre signature olfactive',
    description:
      'Une sélection de parfums de marque, importés et authentiques, pour homme, femme ou à partager.',
    href: '/fragrance',
    image: '/images/hero/fragrance.png',
    accentText: 'text-fr-plum',
  },
  {
    slug: 'crochet-by-thed',
    name: 'Crochet by THED',
    short: 'Crochet',
    category: 'Pièces faites main',
    tagline: "L'élégance faite à la main",
    description:
      'Robes, tops, sacs et pièces pour toute la famille, crochetés à la main, en prêt-à-porter ou sur-mesure.',
    href: '/crochet-by-thed',
    image: '/images/hero/crochet-by-thed.png',
    accentText: 'text-cr-earth',
  },
]

export function getBrand(slug: Volet): Brand {
  return brands.find((b) => b.slug === slug) ?? brands[0]
}
