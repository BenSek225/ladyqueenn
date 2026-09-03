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
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'nouveau',
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
    image: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'coup-de-coeur',
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
    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=900&q=80'
    ],
    stock: 10,
    customizable: true,
    sizes: ['Unique (Oversized)'],
    colors: ['Camel', 'Gris chiné', 'Bordeaux', 'Écru'],
    deliveryTime: '2-3 semaines',
    material: 'Laine mélangée et coton',
    details: 'Taille unique | Longueur : 70cm | Fait main'
  },

  // HOMME - Prêt-à-porter
  {
    id: 'cr-004',
    slug: 'gilet-sans-manches-homme',
    name: 'Gilet Sans Manches Homme',
    volet: 'crochet-by-thed',
    category: 'homme',
    price: 25000,
    description: 'Gilet décontracté au crochet pour homme',
    longDescription: `Gilet masculin au crochet avec une coupe moderne et décontractée. Parfait pour un style urbain original qui se démarque.

Se porte sur un t-shirt ou une chemise. Une pièce unique qui attire les regards.`,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'nouveau',
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
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80'
    ],
    stock: 20,
    customizable: true,
    sizes: ['S/M', 'L/XL'],
    colors: ['Blanc', 'Noir', 'Beige', 'Multicolore'],
    deliveryTime: '1 semaine',
    material: 'Fil de coton résistant',
    details: 'Tour de tête : 56-60cm | Lavable | Fait main'
  },

  // ENFANT - Prêt-à-porter
  {
    id: 'cr-006',
    slug: 'ensemble-bebe-bapteme',
    name: 'Ensemble Bébé Baptême',
    volet: 'crochet-by-thed',
    category: 'enfant',
    price: 30000,
    description: 'Tenue de cérémonie au crochet pour bébé',
    longDescription: `Ensemble précieux pour baptême ou cérémonie. Confectionné avec soin dans un fil ultra-doux adapté à la peau délicate des bébés.

Comprend : bonnet, brassière et chaussons assortis. Un cadeau de naissance inoubliable.`,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'coup-de-coeur',
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
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=900&q=80'
    ],
    stock: 12,
    customizable: true,
    sizes: ['2-4 ans', '4-6 ans', '6-8 ans', '8-10 ans'],
    colors: ['Jaune moutarde', 'Vert forêt', 'Rouge', 'Gris'],
    deliveryTime: '2 semaines',
    material: 'Laine acrylique douce',
    details: 'Avec boutons | Capuche doublée | Fait main'
  },

  // ACCESSOIRES
  {
    id: 'cr-008',
    slug: 'sac-cabas-plage',
    name: 'Sac Cabas de Plage',
    volet: 'crochet-by-thed',
    category: 'accessoire',
    price: 15000,
    description: 'Grand sac cabas au crochet pour la plage',
    longDescription: `Sac spacieux et résistant, parfait pour la plage, le marché ou les sorties. Confectionné avec un fil épais et robuste.

Grande capacité et anses renforcées. Style bohème et pratique au quotidien.`,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80'
    ],
    stock: 18,
    customizable: true,
    sizes: ['Grand (40x35cm)'],
    colors: ['Naturel', 'Rayé multicolore', 'Terracotta', 'Marine'],
    deliveryTime: '1-2 semaines',
    material: 'Corde de coton tressée',
    details: 'Grande capacité | Anses longues | Résistant'
  },
  {
    id: 'cr-009',
    slug: 'chale-triangulaire',
    name: 'Châle Triangulaire',
    volet: 'crochet-by-thed',
    category: 'accessoire',
    price: 22000,
    description: 'Châle élégant au crochet en forme de triangle',
    longDescription: `Châle sophistiqué avec un motif ajouré délicat. Se drape élégamment sur les épaules pour les soirées ou les occasions spéciales.

Une pièce intemporelle qui traverse les saisons. Léger mais réchauffant.`,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'limité',
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
