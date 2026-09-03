export interface Product {
  id: string
  slug: string
  name: string
  category: string
  price: number
  oldPrice?: number
  description: string
  longDescription: string
  image: string
  badge?: 'nouveau' | 'limité' | 'coup-de-coeur' | 'rupture' | 'promo'
  stock: number
  details?: string
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'eau-de-toilette-ambre',
    name: 'Eau de Toilette Ambré',
    category: 'Fragrances',
    price: 45000,
    description: 'Fragrance élégante et intemporelle',
    longDescription: 'Une composition sophistiquée mêlant notes d\'ambre, de vanille et de bois. Idéale pour les jours ordinaires qui demandent une touche d\'excellence. Persistance 6-8 heures.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80',
    badge: 'nouveau',
    stock: 12,
    details: 'Contenance : 100ml | Fabriqué en Côte d\'Ivoire'
  },
  {
    id: '2',
    slug: 'savon-noir-traditionnel',
    name: 'Savon Noir Traditionnel',
    category: 'Beauté',
    price: 8500,
    description: 'Savon naturel pour le soin quotidien',
    longDescription: 'Préparé selon la recette ancestrale avec des ingrédients naturels. Purifie en douceur et respecte l\'équilibre naturel de votre peau. Idéal pour tous les types de peau.',
    image: 'https://images.unsplash.com/photo-1607006344380-b6775a0824c7?auto=format&fit=crop&w=900&q=80',
    badge: 'coup-de-coeur',
    stock: 48,
    details: 'Poids : 200g | Ingrédients 100% naturels'
  },
  {
    id: '3',
    slug: 'beurre-de-karite-pur',
    name: 'Beurre de Karité Pur',
    category: 'Soins',
    price: 22000,
    oldPrice: 28000,
    description: 'Beurre de karité non raffiné',
    longDescription: 'Extrait directement du fruit du karité sans aucune transformation chimique. Hydrate profondément et régénère la peau. Usage corporel et facial recommandé.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80',
    badge: 'promo',
    stock: 25,
    details: 'Contenance : 250ml | Non raffiné, brut d\'extraction'
  },
  {
    id: '4',
    slug: 'tisane-detox-bio',
    name: 'Tisane Détox Bio',
    category: 'Bien-être',
    price: 12000,
    description: 'Mélange de plantes africaines séchées',
    longDescription: 'Combinaison de plantes détoxifiantes cultivées biologiquement : gingembre, hibiscus, écorce de baobab et herbes aromatiques. À déguster chaude ou froide selon vos préférences.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80',
    stock: 30,
    details: 'Poids : 50g | 20 sachets environ | Bio certifié'
  },
  {
    id: '5',
    slug: 'collier-perles-artisanal',
    name: 'Collier Perles Artisanal',
    category: 'Accessoires',
    price: 35000,
    description: 'Collier confectionné à la main avec perles traditionnelles',
    longDescription: 'Chaque pièce est unique, travaillée manuellement par des artisans locaux. Perles de verre et matériaux naturels assemblés avec soin. Une déclaration d\'élégance et de patrimoine.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
    badge: 'limité',
    stock: 5,
    details: 'Longueur : 45cm | Ajustable | Matériaux : verre, coton ciré'
  },
  {
    id: '6',
    slug: 'huile-essentielle-menthe',
    name: 'Huile Essentielle Menthe',
    category: 'Bien-être',
    price: 18000,
    description: 'Huile essentielle pure de menthe poivrée',
    longDescription: 'Distillation artisanale de menthe poivrée premium. Tonifiante et vivifiante, idéale en diffusion, massage ou bain. À utiliser diluée pour le bien-être quotidien.',
    image: 'https://images.unsplash.com/photo-1608571423539-e951a1a4a7f5?auto=format&fit=crop&w=900&q=80',
    stock: 20,
    details: 'Contenance : 30ml | 100% pur | Conservation 2 ans'
  },
  {
    id: '7',
    slug: 'masque-visage-argile',
    name: 'Masque Visage Argile Blanche',
    category: 'Beauté',
    price: 15000,
    description: 'Masque purifiant à l\'argile blanche',
    longDescription: 'Poudre d\'argile blanche pure pour un masque fait maison ou prêt à utiliser. Purifie, éclaire et affine le grain de la peau. Recommandé 1-2 fois par semaine.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
    stock: 35,
    details: 'Contenance : 100g | Usage : 2-3 applications | Argile naturelle'
  },
  {
    id: '8',
    slug: 'journal-artisanal-cuir',
    name: 'Journal Artisanal en Cuir',
    category: 'Édition',
    price: 28000,
    description: 'Carnet cuir naturel pour vos pensées',
    longDescription: 'Journal premium relié en cuir véritable travaillé à la main. Pages ivoire qualité, couverture en cuir brut qui vieillit gracieusement. Écrire devient un rituel.',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=80',
    badge: 'nouveau',
    stock: 15,
    details: 'Format : A5 | 200 pages | Couverture personnalisable'
  },
  {
    id: '9',
    slug: 'bougie-soja-naturelle',
    name: 'Bougie Soja Naturelle',
    category: 'Ambiance',
    price: 16000,
    description: 'Bougie artisanale à cire de soja',
    longDescription: 'Confectionnée à partir de cire de soja naturelle avec mèche en coton. Parfumée aux huiles essentielles, elle crée une ambiance chaleureuse. Brûle 40 heures environ.',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80',
    stock: 42,
    details: 'Poids : 180g | Parfum : Vanille & Bois | Durée : 40h'
  }
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category)
}

export function getCategories(): string[] {
  return Array.from(new Set(products.map(p => p.category)))
}

export function getSimilarProducts(productId: string, limit = 4): Product[] {
  const product = products.find(p => p.id === productId)
  if (!product) return []
  return products
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit)
}
