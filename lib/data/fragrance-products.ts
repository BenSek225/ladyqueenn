import { FragranceProduct } from '../types'

export const fragranceProducts: FragranceProduct[] = [
  {
    id: 'fr-001',
    slug: 'andolacy-homme-intense',
    name: 'Andolacy Homme Intense',
    volet: 'fragrance',
    category: 'homme',
    brand: 'Andolacy',
    price: 35000,
    description: 'Eau de parfum masculine intense et captivante',
    longDescription: `Andolacy Homme Intense est une fragrance puissante qui affirme votre caractère. Une composition boisée et épicée qui laisse un sillage mémorable.

Idéale pour l'homme moderne et élégant qui ne passe pas inaperçu. Tenue exceptionnelle de 8-10 heures.`,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'nouveau',
    stock: 12,
    intensity: 'intense',
    notes: {
      top: ['Bergamote', 'Poivre noir', 'Citron'],
      heart: ['Cèdre', 'Patchouli', 'Vétiver'],
      base: ['Ambre', 'Musc', 'Vanille']
    },
    details: 'Contenance : 100ml | Concentration : Eau de Parfum | Importé'
  },
  {
    id: 'fr-002',
    slug: 'elegance-femme',
    name: 'Élégance Femme',
    volet: 'fragrance',
    category: 'femme',
    price: 38000,
    description: 'Fragrance florale délicate et sophistiquée',
    longDescription: `Élégance Femme incarne la féminité raffinée. Un bouquet floral délicat avec une touche de gourmandise qui séduit en toute subtilité.

Parfaite pour la femme élégante et confiante, de jour comme de soir. Une signature olfactive inoubliable.`,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'coup-de-coeur',
    stock: 18,
    intensity: 'moyenne',
    notes: {
      top: ['Rose', 'Jasmin', 'Mandarine'],
      heart: ['Pivoine', 'Iris', 'Ylang-ylang'],
      base: ['Vanille', 'Musc blanc', 'Bois de santal']
    },
    details: 'Contenance : 100ml | Concentration : Eau de Parfum | Importé'
  },
  {
    id: 'fr-003',
    slug: 'andolacy-luxe-mixte',
    name: 'Andolacy Luxe Mixte',
    volet: 'fragrance',
    category: 'mixte',
    brand: 'Andolacy',
    price: 42000,
    description: 'Parfum unisexe raffiné aux notes orientales',
    longDescription: `Andolacy Luxe transcende les genres avec une composition orientale sophistiquée. Un parfum précieux qui s'adapte à chacun avec une élégance naturelle.

Notes riches et envoûtantes pour une personnalité affirmée. Le luxe à l'état pur.`,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'promo',
    oldPrice: 48000,
    stock: 8,
    intensity: 'intense',
    notes: {
      top: ['Safran', 'Cardamome', 'Orange amère'],
      heart: ['Oud', 'Rose de Damas', 'Patchouli'],
      base: ['Ambre gris', 'Musc', 'Bois de gaïac']
    },
    details: 'Contenance : 100ml | Concentration : Extrait de Parfum | Édition Limitée'
  },
  {
    id: 'fr-004',
    slug: 'fraicheur-citrus-homme',
    name: 'Fraîcheur Citrus Homme',
    volet: 'fragrance',
    category: 'homme',
    price: 28000,
    description: 'Eau de toilette fraîche et énergisante',
    longDescription: `Fraîcheur Citrus est le compagnon idéal pour vos journées actives. Une composition légère et tonifiante aux agrumes qui revigore instantanément.

Parfait pour le sport, le bureau ou les sorties décontractées. Une fraîcheur qui dure toute la journée.`,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80'
    ],
    stock: 25,
    intensity: 'légère',
    notes: {
      top: ['Citron vert', 'Pamplemousse', 'Menthe'],
      heart: ['Lavande', 'Basilic', 'Gingembre'],
      base: ['Cèdre', 'Vétiver', 'Musc']
    },
    details: 'Contenance : 100ml | Concentration : Eau de Toilette | Importé'
  },
  {
    id: 'fr-005',
    slug: 'rose-imperiale-femme',
    name: 'Rose Impériale Femme',
    volet: 'fragrance',
    category: 'femme',
    price: 45000,
    description: 'Parfum de luxe à la rose précieuse',
    longDescription: `Rose Impériale célèbre la reine des fleurs dans toute sa splendeur. Une rose somptueuse sublimée par des notes poudrées et boisées.

Pour la femme qui aime le raffinement absolu. Un véritable bijou olfactif qui traverse les époques.`,
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'limité',
    stock: 6,
    intensity: 'intense',
    notes: {
      top: ['Rose de Mai', 'Litchi', 'Bergamote'],
      heart: ['Rose Centifolia', 'Géranium', 'Violette'],
      base: ['Oud', 'Patchouli', 'Musc blanc']
    },
    details: 'Contenance : 100ml | Concentration : Eau de Parfum | Édition Prestige'
  },
  {
    id: 'fr-006',
    slug: 'ocean-breeze-mixte',
    name: 'Ocean Breeze Mixte',
    volet: 'fragrance',
    category: 'mixte',
    price: 32000,
    description: 'Fragrance marine fraîche et apaisante',
    longDescription: `Ocean Breeze évoque la liberté des grands espaces marins. Une composition aquatique universelle qui respire la légèreté et la pureté.

Idéal pour l'été et les climats chauds. Un parfum qui vous transporte instantanément en bord de mer.`,
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=80'
    ],
    stock: 20,
    intensity: 'légère',
    notes: {
      top: ['Notes marines', 'Menthe aquatique', 'Citron'],
      heart: ['Sel marin', 'Jasmin', 'Algues'],
      base: ['Bois flotté', 'Ambre gris', 'Musc']
    },
    details: 'Contenance : 100ml | Concentration : Eau de Toilette | Importé'
  },
  {
    id: 'fr-007',
    slug: 'nuit-orientale-homme',
    name: 'Nuit Orientale Homme',
    volet: 'fragrance',
    category: 'homme',
    price: 40000,
    description: 'Parfum oriental mystérieux et envoûtant',
    longDescription: `Nuit Orientale transporte vers les palais d'Orient. Une fragrance riche et mystérieuse qui révèle sa complexité au fil des heures.

Pour l'homme charismatique qui aime se démarquer. Un parfum de caractère pour les grandes occasions.`,
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=900&q=80'
    ],
    stock: 10,
    intensity: 'intense',
    notes: {
      top: ['Cardamome', 'Safran', 'Anis étoilé'],
      heart: ['Oud', 'Rose', 'Cannelle'],
      base: ['Encens', 'Musc', 'Ambre']
    },
    details: 'Contenance : 100ml | Concentration : Eau de Parfum | Importé'
  },
  {
    id: 'fr-008',
    slug: 'belle-de-jour-femme',
    name: 'Belle de Jour Femme',
    volet: 'fragrance',
    category: 'femme',
    price: 30000,
    description: 'Fragrance florale légère pour le quotidien',
    longDescription: `Belle de Jour est votre compagnon idéal pour rayonner au quotidien. Une composition florale délicate qui accompagne chaque moment avec grâce.

Fraîche et féminine, elle convient parfaitement pour le bureau et les activités de jour. Une élégance discrète et raffinée.`,
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=900&q=80'
    ],
    stock: 30,
    intensity: 'légère',
    notes: {
      top: ['Freesia', 'Poire', 'Cassis'],
      heart: ['Pivoine', 'Magnolia', 'Muguet'],
      base: ['Musc', 'Cèdre', 'Ambrette']
    },
    details: 'Contenance : 100ml | Concentration : Eau de Toilette | Importé'
  }
]

export function getFragranceProductBySlug(slug: string): FragranceProduct | undefined {
  return fragranceProducts.find(p => p.slug === slug)
}

export function getFragranceByCategory(category: 'homme' | 'femme' | 'mixte'): FragranceProduct[] {
  return fragranceProducts.filter(p => p.category === category)
}

export function getFragranceByBrand(brand: string): FragranceProduct[] {
  return fragranceProducts.filter(p => p.brand?.toLowerCase() === brand.toLowerCase())
}

export function getFragranceByIntensity(intensity: 'légère' | 'moyenne' | 'intense'): FragranceProduct[] {
  return fragranceProducts.filter(p => p.intensity === intensity)
}
