import { CrochetProduct } from '../types'

export const crochetProducts: CrochetProduct[] = [
  // FEMME - Prêt-à-porter
  {
    id: 'cr-001',
    slug: 'robe-ete-boheme',
    name: 'Robe d\'Été Bohème',
    volet: 'crochet-by-thed',
    category: 'femme',
    price: 35000,
    description: 'Robe longue au crochet, parfaite pour l\'été',
    longDescription: `Robe bohème confectionnée entièrement au crochet avec un motif ajouré élégant. Légère et aérée, elle est idéale pour les journées ensoleillées.

Portez-la en plage, en soirée ou au quotidien. Un mélange parfait de confort et d'élégance artisanale.`,
    image: '/images/products/crochet-by-thed/robe-ete-boheme-main.png',
    images: [
      '/images/products/crochet-by-thed/robe-ete-boheme-main.png',
      '/images/products/crochet-by-thed/robe-ete-boheme-detail.png',
      '/images/products/crochet-by-thed/robe-ete-boheme-lifestyle.png',
      '/images/products/crochet-by-thed/robe-ete-boheme-variant.png'
    ],
    stock: 8,
    customizable: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blanc cassé', 'Beige', 'Terracotta', 'Bleu ciel'],
    deliveryTime: '2-3 semaines',
    material: 'Fil de coton premium',
    details: 'Longueur : 120cm environ | Entretien : Lavage à la main | Fait main'
  },
  {
    id: 'cr-002',
    slug: 'top-crop-dentelle',
    name: 'Top Crop Dentelle',
    volet: 'crochet-by-thed',
    category: 'femme',
    price: 18000,
    description: 'Top court au crochet avec motif dentelle',
    longDescription: `Top crop sophistiqué avec un magnifique travail de dentelle au crochet. Parfait pour sublimer une taille haute ou un jean.

Pièce polyvalente qui s'adapte du look décontracté au style chic. Un essentiel de garde-robe.`,
    image: '/images/products/crochet-by-thed/top-crop-dentelle-main.png',
    images: [
      '/images/products/crochet-by-thed/top-crop-dentelle-main.png',
      '/images/products/crochet-by-thed/top-crop-dentelle-detail.png',
      '/images/products/crochet-by-thed/top-crop-dentelle-lifestyle.png',
      '/images/products/crochet-by-thed/top-crop-dentelle-variant.png'
    ],
    stock: 15,
    customizable: true,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Blanc', 'Noir', 'Rose poudré', 'Vert sauge'],
    deliveryTime: '1-2 semaines',
    material: 'Fil de coton mercerisé',
    details: 'Longueur : 40cm | Bretelles ajustables | Fait main'
  },
  {
    id: 'cr-003',
    slug: 'poncho-oversized',
    name: 'Poncho Oversized',
    volet: 'crochet-by-thed',
    category: 'femme',
    price: 28000,
    description: 'Poncho ample et confortable au crochet',
    longDescription: `Poncho généreux qui enveloppe avec douceur. Un vêtement cocooning parfait pour les soirées fraîches ou la climatisation.

Style bohème décontracté qui se porte sur tout. Confort et allure assurés.`,
    image: '/images/products/crochet-by-thed/poncho-oversized-main.png',
    images: [
      '/images/products/crochet-by-thed/poncho-oversized-main.png',
      '/images/products/crochet-by-thed/poncho-oversized-detail.png',
      '/images/products/crochet-by-thed/poncho-oversized-lifestyle.png',
      '/images/products/crochet-by-thed/poncho-oversized-variant.png'
    ],
    stock: 6,
    customizable: true,
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Noir', 'Beige', 'Kaki', 'Marine'],
    deliveryTime: '2 semaines',
    material: 'Fil de coton épais',
    details: 'Coupe droite | Col V | Fait main'
  },
  {
    id: 'cr-005',
    slug: 'bob-bucket-hat',
    name: 'Bob Bucket Hat',
    volet: 'crochet-by-thed',
    category: 'homme',
    price: 12000,
    description: 'Bob tendance confectionné au crochet',
    longDescription: `Bob au crochet dans l'air du temps. Léger et aéré, il protège du soleil tout en apportant une touche streetwear unique.

Unisexe et ajustable. L'accessoire indispensable de l'été.`,
    image: '/images/products/crochet-by-thed/bob-bucket-hat-main.png',
    images: [
      '/images/products/crochet-by-thed/bob-bucket-hat-main.png',
      '/images/products/crochet-by-thed/bob-bucket-hat-detail.png',
      '/images/products/crochet-by-thed/bob-bucket-hat-lifestyle.png',
      '/images/products/crochet-by-thed/bob-bucket-hat-variant.png'
    ],
    stock: 5,
    customizable: true,
    sizes: ['0-3 mois', '3-6 mois', '6-12 mois'],
    colors: ['Blanc', 'Écru', 'Rose pâle', 'Bleu ciel'],
    deliveryTime: '3 semaines',
    material: 'Fil bébé hypoallergénique',
    details: 'Ensemble 3 pièces | Très doux | Fait main avec amour'
  },
  {
    id: 'cr-007',
    slug: 'gilet-enfant-capuche',
    name: 'Gilet Enfant à Capuche',
    volet: 'crochet-by-thed',
    category: 'enfant',
    price: 20000,
    description: 'Gilet enfant confortable avec capuche',
    longDescription: `Gilet ludique et pratique pour les enfants. La capuche ajoute une touche mignonne tout en protégeant du vent.

Chaud sans être lourd, parfait pour les mi-saisons. Les enfants adorent !`,
    image: '/images/products/crochet-by-thed/gilet-enfant-capuche-main.png',
    images: [
      '/images/products/crochet-by-thed/gilet-enfant-capuche-main.png',
      '/images/products/crochet-by-thed/gilet-enfant-capuche-detail.png',
      '/images/products/crochet-by-thed/gilet-enfant-capuche-lifestyle.png',
      '/images/products/crochet-by-thed/gilet-enfant-capuche-variant.png'
    ],
    stock: 7,
    customizable: true,
    sizes: ['Unique (180cm envergure)'],
    colors: ['Ivoire', 'Prune', 'Émeraude', 'Anthracite'],
    deliveryTime: '2-3 semaines',
    material: 'Laine mérinos et soie',
    details: 'Très grande taille | Léger et chaud | Fait main'
  }
]

export function getCrochetProductBySlug(slug: string): CrochetProduct | undefined {
  return crochetProducts.find(p => p.slug === slug)
}

export function getCrochetByCategory(category: 'homme' | 'femme' | 'enfant' | 'accessoire'): CrochetProduct[] {
  return crochetProducts.filter(p => p.category === category)
}

export function getCrochetCustomizable(): CrochetProduct[] {
  return crochetProducts.filter(p => p.customizable === true)
}

export function getCrochetReadyToWear(): CrochetProduct[] {
  return crochetProducts.filter(p => p.stock > 0)
}
