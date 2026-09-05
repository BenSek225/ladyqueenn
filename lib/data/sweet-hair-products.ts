import { SweetHairProduct } from '../types'

export const sweetHairProducts: SweetHairProduct[] = [
  {
    id: 'sh-001',
    slug: 'huile-capillaire-60ml',
    name: 'Huile Capillaire Sweet-Hair',
    volet: 'sweet-hair',
    category: 'huile',
    price: 2000,
    volume: '60ml',
    description: 'Huile naturelle pour favoriser la pousse et la brillance',
    longDescription: `Notre huile capillaire Sweet-Hair est formulée à base d'ingrédients 100% naturels pour nourrir vos cheveux en profondeur. Elle favorise la pousse, apporte brillance et volume tout en réparant le cuir chevelu.

Idéale pour tous types de cheveux, elle pénètre rapidement sans effet gras. Utilisée régulièrement, elle transforme visiblement la santé de vos cheveux en quelques semaines.`,
    image: '/images/products/sweet-hair/huile-capillaire-60ml-main.png',
  images: [
    '/images/products/sweet-hair/huile-capillaire-60ml-main.png',
    '/images/products/sweet-hair/huile-capillaire-60ml-detail.png',
    '/images/products/sweet-hair/huile-capillaire-60ml-lifestyle.png',
    '/images/products/sweet-hair/huile-capillaire-60ml-variant.png'
  ],
    badge: 'coup-de-coeur',
    stock: 45,
    benefits: [
      'Favorise la pousse des cheveux',
      'Apporte brillance et volume',
      'Répare le cuir chevelu',
      'Nourrit en profondeur',
      'Absorption rapide, non grasse'
    ],
    ingredients: [
      'Huile de coco vierge',
      'Huile de ricin',
      'Huile d\'olive',
      'Vitamine E',
      'Extraits de plantes africaines'
    ],
    usage: 'Appliquer sur cheveux secs ou humides. Masser le cuir chevelu pendant 5 minutes. Laisser poser 30 min minimum avant le shampooing. Utiliser 2-3 fois par semaine.',
    details: 'Contenance : 60ml | 100% naturel | Fabriqué en Côte d\'Ivoire'
  },
  {
    id: 'sh-002',
    slug: 'shampooing-reparateur-250ml',
    name: 'Shampooing Réparateur Sweet-Hair',
    volet: 'sweet-hair',
    category: 'shampooing',
    price: 2000,
    volume: '250ml',
    description: 'Shampooing doux à base d\'ingrédients naturels',
    longDescription: `Le shampooing Sweet-Hair nettoie en douceur sans agresser vos cheveux. Sa formule naturelle respecte l'équilibre du cuir chevelu tout en apportant nutrition et réparation.

Enrichi en extraits de plantes africaines, il convient à tous types de cheveux, même les plus fragiles. Vos cheveux retrouvent force, souplesse et éclat naturel.`,
    image: '/images/products/sweet-hair/shampooing-reparateur-250ml-main.png',
    images: [
      '/images/products/sweet-hair/huile-capillaire-60ml-main.png',
      '/images/products/sweet-hair/huile-capillaire-60ml-detail.png',
      '/images/products/sweet-hair/huile-capillaire-60ml-lifestyle.png',
      '/images/products/sweet-hair/huile-capillaire-60ml-variant.png'
    ],
    stock: 38,
    benefits: [
      'Nettoie en douceur sans sulfates agressifs',
      'Répare les cheveux abîmés',
      'Apporte volume et souplesse',
      'Convient à tous types de cheveux',
      'Parfum naturel délicat'
    ],
    ingredients: [
      'Base lavante douce végétale',
      'Aloe vera',
      'Beurre de karité',
      'Protéines de riz',
      'Huiles essentielles naturelles'
    ],
    usage: 'Appliquer sur cheveux mouillés, masser pour faire mousser. Laisser agir 2-3 minutes. Rincer abondamment à l\'eau tiède.',
    details: 'Contenance : 250ml | Sans sulfates | Sans parabènes | pH neutre'
  },
  {
    id: 'sh-003',
    slug: 'pommade-nourrissante',
    name: 'Pommade Nourrissante Sweet-Hair',
    volet: 'sweet-hair',
    category: 'pommade',
    price: 2000,
    volume: '150g',
    description: 'Pommade coiffante et nourrissante',
    longDescription: `La pommade Sweet-Hair est votre alliée coiffage quotidien. Elle nourrit, discipline et donne une tenue naturelle à vos cheveux tout en les protégeant des agressions extérieures.

Sa texture onctueuse pénètre rapidement sans alourdir. Idéale pour structurer les coiffures, dompter les frisottis et apporter une brillance saine.`,
    image: '/images/products/sweet-hair/pommade-nourrissante-main.png',
    images: [
      '/images/products/sweet-hair/pommade-nourrissante-main.png',
      '/images/products/sweet-hair/pommade-nourrissante-detail.png',
      '/images/products/sweet-hair/pommade-nourrissante-lifestyle.png',
      '/images/products/sweet-hair/pommade-nourrissante-variant.png'
    ],
    stock: 25,
    benefits: [
      'Routine capillaire complète',
      'Économie de 1 000 FCFA',
      'Résultats visibles en 3 semaines',
      'Convient à tous types de cheveux',
      'Idéal pour démarrer votre transformation'
    ],
    usage: `**Routine recommandée :**

1. **2 fois par semaine** : Appliquer l'huile en massage. Laisser poser 30 min.
2. Laver avec le shampooing. Laisser agir 2-3 min.
3. Sécher et appliquer une noisette de pommade pour coiffer.
4. **Quotidien** : Utiliser la pommade pour entretenir votre coiffure.`,
    details: 'Contenance : 150g | 100% naturel | Tenue souple'
  },
  {
    id: 'sh-kit-001',
    slug: 'kit-complet-sweet-hair',
    name: 'Kit Complet Sweet-Hair',
    volet: 'sweet-hair',
    category: 'kit',
    price: 5000,
    oldPrice: 6000,
    volume: 'Pack 3 soins',
    description: 'La routine complète Sweet-Hair pour nourrir, laver et coiffer.',
    longDescription: 'Réunissez les essentiels Sweet-Hair dans un coffret pensé pour une routine simple et complète. Un prix privilégié de 5 000 FCFA au lieu de 6 000 FCFA.',
    image: '/images/products/sweet-hair/kit-complet-sweet-hair-main.png',
    images: [
      '/images/products/sweet-hair/kit-complet-sweet-hair-main.png',
      '/images/products/sweet-hair/kit-complet-sweet-hair-main.png',
      '/images/products/sweet-hair/kit-complet-sweet-hair-main.png',
      '/images/products/sweet-hair/kit-complet-sweet-hair-main.png'
    ],
    badge: 'promo',
    stock: 20,
    isKit: true,
    kitItems: ['sh-001', 'sh-002', 'sh-003'],
    benefits: ['Routine complète en 3 gestes', 'Économie de 1 000 FCFA', 'Convient à tous types de cheveux'],
    ingredients: ['Huile capillaire', 'Shampooing réparateur', 'Pommade nourrissante'],
    usage: 'Utiliser l’huile avant le lavage, nettoyer avec le shampooing puis coiffer avec la pommade.',
    details: 'Pack de 3 soins | Prix promotionnel | Économie de 1 000 FCFA'
  }
]

export function getSweetHairProductBySlug(slug: string): SweetHairProduct | undefined {
  return sweetHairProducts.find(p => p.slug === slug)
}

export function getSweetHairProductsByCategory(category: string): SweetHairProduct[] {
  return sweetHairProducts.filter(p => p.category === category)
}

export function getSweetHairKit(): SweetHairProduct | undefined {
  return sweetHairProducts.find(p => p.isKit === true)
}
