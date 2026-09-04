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
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80'
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
    image: '/images/products/sweet-hair/huile-capillaire-60ml-main.png',
    images: [
      '/images/products/sweet-hair/huile-capillaire-60ml-main.png'126,
    badge: 'nouveau',
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
      '/images/products/sweet-hair/pommade-nourrissante-main.png'3293,
    stock: 52,
    benefits: [
      'Nourrit et hydrate en profondeur',
      'Tenue coiffage naturelle',
      'Dompte les frisottis',
      'Protection contre la chaleur',
      'Texture non collante'
    ],
    ingredients: [
      'Beurre de karité pur',
      'Cire d\'abeille naturelle',
      'Huile d\'argan',
      'Huile de jojoba',
      'Vitamine E'
    ],
    usage: 'Prélever une petite quantité. Chauffer entre les mains. Appliquer sur cheveux secs ou humides. Coiffer selon votre style.',
    details: 'Contenance : 150g | Texture crémeuse | Tenue souple'
  },
  {
    id: 'sh-004',
    slug: 'kit-complet-sweet-hair',
    name: 'Kit Complet Sweet-Hair',
    volet: 'sweet-hair',
    category: 'kit',
    price: 5000,
    oldPrice: 6000,
    volume: 'Pack 3 produits',
    description: 'Le rituel capillaire complet : Huile + Shampooing + Pommade',
    longDescription: `Adoptez la routine complète Sweet-Hair et transformez vos cheveux ! Ce kit réunit nos trois produits phares pour une prise en charge globale de votre chevelure.

**Ce que vous recevez :**
- 1 Huile Capillaire 60ml
- 1 Shampooing Réparateur 250ml
- 1 Pommade Nourrissante 150g

**Économisez 1 000 FCFA** en optant pour le kit complet. Un investissement beauté qui change tout !`,
    image: '/images/products/sweet-hair/kit-complet-sweet-hair-main.png',
    images: [
      '/images/products/sweet-hair/kit-complet-sweet-hair-main.png'4687,
    badge: 'promo',
    stock: 25,
    isKit: true,
    kitItems: ['sh-001', 'sh-002', 'sh-003'],
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
    details: 'Pack économique | -17% | Emballage cadeau offert'
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
