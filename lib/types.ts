// Types globaux Lady Queenn

export type Volet = 'sweet-hair' | 'fragrance' | 'crochet-by-thed'

export type Badge = 'nouveau' | 'promo' | 'épuisé' | 'limité' | 'coup-de-coeur' | 'sur-commande'

export interface Product {
  id: string
  slug: string
  name: string
  volet: Volet
  category?: string
  price: number
  oldPrice?: number
  description: string
  longDescription: string
  image: string
  images?: string[] // Galerie d'images
  badge?: Badge
  stock: number
  details?: string
  gender?: 'homme' | 'femme' | 'mixte'
  ingredients?: string[]
  usage?: string
  sizes?: string[]
  colors?: string[]
}

// Sweet-Hair - Produits capillaires
export interface SweetHairProduct extends Product {
  volet: 'sweet-hair'
  volume: string // '60ml', '250ml', etc.
  benefits: string[]
  ingredients?: string[]
  usage?: string
  isKit?: boolean // Pour identifier le kit complet
  kitItems?: string[] // IDs des produits du kit
}

// Fragrance - Parfums
export interface FragranceProduct extends Product {
  volet: 'fragrance'
  category: 'homme' | 'femme' | 'mixte'
  brand?: string // Andolacy, etc.
  notes?: {
    top?: string[]
    heart?: string[]
    base?: string[]
  }
  intensity?: 'légère' | 'moyenne' | 'intense'
}

// Crochet by THED - Vêtements
export interface CrochetProduct extends Product {
  volet: 'crochet-by-thed'
  category: 'homme' | 'femme' | 'enfant' | 'accessoire'
  sizes?: string[] // ['S', 'M', 'L', 'XL']
  colors?: string[] // ['Blanc', 'Beige', 'Noir']
  customizable: boolean
  deliveryTime?: string // "2-3 semaines"
  material?: string
}

// Union type pour tous les produits
export type AnyProduct = SweetHairProduct | FragranceProduct | CrochetProduct

// Item dans le panier
export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  volet: Volet // Ajout du volet pour groupement
}

// Store Panier
export interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getCartCount: () => number
  formatCartMessage: () => string
}

// Navigation
export interface NavItem {
  label: string
  href: string
  description?: string
  volet?: Volet
}

// Recherche
export interface SearchResult {
  product: AnyProduct
  volet: Volet
  relevance: number
}
