import { NavItem } from '../types'

// Navigation principale du site
export const mainNavigation: NavItem[] = [
  {
    label: 'Accueil',
    href: '/'
  },
  {
    label: 'Sweet-Hair',
    href: '/sweet-hair',
    description: 'Soins capillaires naturels',
    volet: 'sweet-hair'
  },
  {
    label: 'Fragrance',
    href: '/fragrance',
    description: 'Parfums de luxe',
    volet: 'fragrance'
  },
  {
    label: 'Crochet by THED',
    href: '/crochet-by-thed',
    description: 'Créations artisanales',
    volet: 'crochet-by-thed'
  },
  {
    label: 'Contact',
    href: '/contact'
  }
]

// Navigation Sweet-Hair
export const sweetHairNav: NavItem[] = [
  {
    label: 'Tous les produits',
    href: '/sweet-hair'
  },
  {
    label: 'Huiles',
    href: '/sweet-hair?category=huile'
  },
  {
    label: 'Shampooings',
    href: '/sweet-hair?category=shampooing'
  },
  {
    label: 'Pommades',
    href: '/sweet-hair?category=pommade'
  },
  {
    label: 'Kit Complet',
    href: '/sweet-hair?category=kit'
  }
]

// Navigation Fragrance
export const fragranceNav: NavItem[] = [
  {
    label: 'Tous les parfums',
    href: '/fragrance'
  },
  {
    label: 'Homme',
    href: '/fragrance?category=homme'
  },
  {
    label: 'Femme',
    href: '/fragrance?category=femme'
  },
  {
    label: 'Mixte',
    href: '/fragrance?category=mixte'
  }
]

// Navigation Crochet by THED
export const crochetNav: NavItem[] = [
  {
    label: 'Boutique',
    href: '/crochet-by-thed'
  },
  {
    label: 'Femme',
    href: '/crochet-by-thed?category=femme'
  },
  {
    label: 'Homme',
    href: '/crochet-by-thed?category=homme'
  },
  {
    label: 'Enfant',
    href: '/crochet-by-thed?category=enfant'
  },
  {
    label: 'Accessoires',
    href: '/crochet-by-thed?category=accessoire'
  },
  {
    label: 'Sur-Mesure',
    href: '/crochet-by-thed/sur-mesure'
  },
  {
    label: 'Galerie',
    href: '/crochet-by-thed/galerie'
  }
]

// Footer navigation
export const footerNavigation = {
  company: [
    { label: 'À propos', href: '/a-propos' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' }
  ],
  volets: [
    { label: 'Sweet-Hair', href: '/sweet-hair' },
    { label: 'Fragrance', href: '/fragrance' },
    { label: 'Crochet by THED', href: '/crochet-by-thed' }
  ],
  legal: [
    { label: 'Mentions légales', href: '/mentions-legales' },
    { label: 'Politique de confidentialité', href: '/confidentialite' },
    { label: 'CGV', href: '/cgv' }
  ],
  social: [
    { label: 'Facebook', href: 'https://facebook.com/ladyqueenn' },
    { label: 'Instagram', href: 'https://instagram.com/ladyqueenn' },
    { label: 'TikTok', href: 'https://tiktok.com/@ladyqueenn' },
    { label: 'WhatsApp', href: 'https://wa.me/2250710504007' }
  ]
}

// Constantes du site
export const siteConfig = {
  name: 'Lady Queenn',
  tagline: 'La maison du raffinement ivoirien',
  description: 'Plateforme e-commerce multi-volets : soins capillaires Sweet-Hair, parfums Fragrance, et créations Crochet by THED.',
  whatsapp: '+2250710504007',
  email: 'contact@ladyqueenn.ci',
  address: 'Abidjan, Côte d\'Ivoire',
  social: {
    facebook: 'https://facebook.com/ladyqueenn',
    instagram: 'https://instagram.com/ladyqueenn',
    tiktok: 'https://tiktok.com/@ladyqueenn'
  }
}
