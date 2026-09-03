# Architecture Technique - Lady Queenn

## 📋 Vue d'Ensemble

Lady Queenn est une plateforme e-commerce **mono-site multi-volets** construite avec Next.js 16 (App Router).

### Principes de Conception

1. **Modularité** : Chaque volet est isolé mais partage des composants communs
2. **Scalabilité** : Ajout facile de nouveaux volets à l'avenir
3. **Unification** : Un seul panier, une seule navigation, une seule identité
4. **Performance** : SSR, lazy loading, optimisation images

---

## 🏗️ Structure Détaillée

```
lady-queenn/
│
├── 📁 app/                                    # Next.js App Router
│   │
│   ├── layout.tsx                             # Layout racine (header, footer)
│   ├── page.tsx                               # 🏠 Accueil - Présentation 3 volets
│   ├── globals.css                            # Styles globaux
│   │
│   ├── 📁 sweet-hair/                         # 💇‍♀️ Volet Capillaire
│   │   ├── page.tsx                           # Liste produits Sweet-Hair
│   │   ├── layout.tsx                         # Layout spécifique (breadcrumb, etc.)
│   │   └── 📁 [slug]/
│   │       └── page.tsx                       # Détail produit (huile, shampooing, etc.)
│   │
│   ├── 📁 fragrance/                          # 🌸 Volet Parfumerie
│   │   ├── page.tsx                           # Catalogue parfums
│   │   ├── layout.tsx
│   │   └── 📁 [slug]/
│   │       └── page.tsx                       # Détail parfum
│   │
│   ├── 📁 crochet-by-thed/                   # 🧶 Volet Crochet
│   │   ├── page.tsx                           # Boutique + Galerie
│   │   ├── layout.tsx
│   │   ├── 📁 [slug]/
│   │   │   └── page.tsx                       # Détail vêtement prêt-à-porter
│   │   ├── 📁 sur-mesure/
│   │   │   └── page.tsx                       # Formulaire commande personnalisée
│   │   └── 📁 galerie/
│   │       └── page.tsx                       # Portfolio créations
│   │
│   ├── 📁 panier/
│   │   └── page.tsx                           # Page panier détaillée
│   │
│   ├── 📁 recherche/
│   │   └── page.tsx                           # Résultats recherche globale
│   │
│   └── 📁 contact/
│       └── page.tsx                           # Contact / À propos
│
├── 📁 components/                             # Composants React
│   │
│   ├── 📁 layout/                             # Composants de structure
│   │   ├── site-header.tsx                    # Header avec nav + recherche
│   │   ├── site-footer.tsx                    # Footer
│   │   ├── breadcrumb.tsx                     # Fil d'Ariane
│   │   └── mobile-menu.tsx                    # Menu mobile
│   │
│   ├── 📁 volets/                             # Composants spécifiques par volet
│   │   ├── 📁 sweet-hair/
│   │   │   ├── sweet-hair-hero.tsx            # Hero section Sweet-Hair
│   │   │   ├── sweet-hair-benefits.tsx        # Liste bénéfices
│   │   │   └── sweet-hair-kit-card.tsx        # Carte Kit complet
│   │   │
│   │   ├── 📁 fragrance/
│   │   │   ├── fragrance-hero.tsx
│   │   │   ├── fragrance-filter.tsx           # Filtres H/F/Mixte
│   │   │   └── fragrance-card.tsx             # Carte parfum
│   │   │
│   │   └── 📁 crochet/
│   │       ├── crochet-hero.tsx
│   │       ├── crochet-gallery.tsx            # Galerie portfolio
│   │       ├── custom-order-form.tsx          # Formulaire sur-mesure
│   │       └── crochet-size-guide.tsx         # Guide des tailles
│   │
│   ├── 📁 shared/                             # Composants partagés
│   │   ├── product-card.tsx                   # Carte produit générique
│   │   ├── product-grid.tsx                   # Grille produits
│   │   ├── product-badge.tsx                  # Badges (nouveau, promo, etc.)
│   │   ├── add-to-cart.tsx                    # Bouton ajout panier
│   │   ├── cart-drawer.tsx                    # Drawer panier (slide-in)
│   │   ├── search-bar.tsx                     # Barre de recherche
│   │   ├── price-display.tsx                  # Affichage prix formaté
│   │   ├── stock-indicator.tsx                # Indicateur de stock
│   │   └── whatsapp-button.tsx                # Bouton WhatsApp
│   │
│   └── 📁 ui/                                 # Composants UI de base (shadcn)
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── badge.tsx
│       └── ... (autres composants shadcn)
│
├── 📁 lib/                                    # Logique métier & utilitaires
│   │
│   ├── 📁 data/                               # Données produits
│   │   ├── sweet-hair-products.ts             # Produits capillaires
│   │   ├── fragrance-products.ts              # Parfums
│   │   ├── crochet-products.ts                # Vêtements crochet
│   │   └── navigation.ts                      # Structure navigation
│   │
│   ├── 📁 stores/                             # State management (Zustand)
│   │   └── cart-store.ts                      # Store panier unifié
│   │
│   ├── 📁 hooks/                              # Custom React Hooks
│   │   ├── use-cart.ts                        # Hook panier
│   │   ├── use-search.ts                      # Hook recherche
│   │   └── use-filter.ts                      # Hook filtres
│   │
│   ├── types.ts                               # Types TypeScript globaux
│   ├── utils.ts                               # Fonctions utilitaires
│   ├── constants.ts                           # Constantes (prix, URLs, etc.)
│   └── formatters.ts                          # Formatage (prix, dates, etc.)
│
├── 📁 public/                                 # Assets statiques
│   ├── 📁 images/
│   │   ├── 📁 sweet-hair/                     # Images produits capillaires
│   │   ├── 📁 fragrance/                      # Images parfums
│   │   ├── 📁 crochet/                        # Images vêtements + galerie
│   │   ├── 📁 home/                           # Images page d'accueil
│   │   └── logo-lady-queenn.svg               # Logo principal
│   │
│   └── 📁 icons/                              # Icônes custom
│
├── 📁 styles/
│   └── globals.css                            # Styles Tailwind + custom
│
├── 📄 Configuration
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.mjs
├── postcss.config.mjs
└── components.json                            # Config shadcn/ui
```

---

## 🔄 Flux de Données

### 1. Navigation Utilisateur

```
Accueil (/) 
  └─> Présentation 3 volets
       ├─> Sweet-Hair (/sweet-hair)
       │    └─> Produit (/sweet-hair/huile-capillaire)
       │
       ├─> Fragrance (/fragrance)
       │    └─> Produit (/fragrance/andolacy-homme)
       │
       └─> Crochet (/crochet-by-thed)
            ├─> Prêt-à-porter (/crochet-by-thed/robe-ete)
            ├─> Sur-mesure (/crochet-by-thed/sur-mesure)
            └─> Galerie (/crochet-by-thed/galerie)
```

### 2. Gestion du Panier (Zustand)

```typescript
// Store unifié multi-volets
{
  items: [
    { id: '1', name: 'Huile Capillaire', volet: 'sweet-hair', price: 2000, qty: 1 },
    { id: '5', name: 'Andolacy Homme', volet: 'fragrance', price: 35000, qty: 1 },
    { id: '9', name: 'Robe Été', volet: 'crochet', price: 25000, qty: 1 }
  ],
  totalPrice: 62000,
  totalItems: 3
}
```

### 3. Recherche Globale

```
Utilisateur tape "shampooing"
  ↓
Recherche dans tous les volets
  ↓
Résultats filtrés par volet
  ├─> Sweet-Hair: "Shampooing Réparateur"
  ├─> Fragrance: 0 résultat
  └─> Crochet: 0 résultat
```

---

## 🎨 Design System

### Palette de Couleurs (à définir)

```css
/* Suggestion pour chaque volet */
:root {
  /* Lady Queenn Global */
  --lq-primary: #... ;      /* Or/Doré (royauté) */
  --lq-secondary: #... ;    
  
  /* Sweet-Hair */
  --sh-primary: #... ;      /* Vert naturel */
  --sh-accent: #... ;
  
  /* Fragrance */
  --fr-primary: #... ;      /* Rose/Pourpre luxe */
  --fr-accent: #... ;
  
  /* Crochet by THED */
  --cr-primary: #... ;      /* Beige/Terre artisanal */
  --cr-accent: #... ;
}
```

### Typographie

- **Titres** : Font serif élégante (Playfair Display, Cormorant)
- **Corps** : Font sans-serif lisible (Inter, Poppins)
- **Prix** : Font monospace (JetBrains Mono)

---

## 🔐 Types TypeScript Principaux

```typescript
// Volet (section de Lady Queenn)
type Volet = 'sweet-hair' | 'fragrance' | 'crochet-by-thed'

// Produit générique
interface Product {
  id: string
  slug: string
  name: string
  volet: Volet
  price: number
  oldPrice?: number
  description: string
  longDescription: string
  image: string
  images?: string[]  // Galerie
  badge?: 'nouveau' | 'promo' | 'épuisé' | 'sur-commande'
  stock: number
  category?: string  // Ex: 'homme', 'femme', 'mixte' pour fragrance
  variants?: ProductVariant[]  // Pour tailles, couleurs, etc.
}

// Produit Sweet-Hair spécifique
interface SweetHairProduct extends Product {
  volet: 'sweet-hair'
  volume: string  // '60ml', '250ml', etc.
  benefits: string[]
  ingredients: string[]
  usage: string
}

// Produit Crochet spécifique
interface CrochetProduct extends Product {
  volet: 'crochet-by-thed'
  sizes: string[]
  colors: string[]
  customizable: boolean
  deliveryTime?: string
}

// Item panier
interface CartItem {
  id: string
  productId: string
  name: string
  volet: Volet
  price: number
  quantity: number
  image: string
  variant?: {
    size?: string
    color?: string
  }
}
```

---

## 📱 Responsive Breakpoints

```
- Mobile:  < 640px   (sm)
- Tablet:  640-1024px (md-lg)
- Desktop: > 1024px   (xl)
```

### Priorités Mobile-First
- Header collapsible
- Recherche en overlay
- Panier drawer full-screen sur mobile
- Grilles adaptatives (1 col → 2 cols → 3-4 cols)

---

## ⚡ Optimisations Performance

1. **Images**
   - Next.js `<Image>` avec lazy loading
   - Formats WebP/AVIF
   - Tailles responsive

2. **Code Splitting**
   - Chaque volet est un route segment séparé
   - Lazy loading des composants lourds (galerie)

3. **Caching**
   - Static Generation pour pages produits
   - Revalidation ISR si stock change

4. **SEO**
   - Metadata dynamique par volet
   - Structured data (Schema.org Product)
   - Sitemap XML auto-généré

---

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
# Installation Vercel CLI
npm i -g vercel

# Déploiement
vercel --prod
```

### Variables d'Environnement
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=+2250710504007
NEXT_PUBLIC_SITE_URL=https://ladyqueenn.ci
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Google Analytics
```

---

## 🧪 Tests (Future)

- **Unit Tests** : Vitest
- **E2E Tests** : Playwright
- **Coverage cible** : > 80%

---

## 📊 Analytics & Tracking

- Google Analytics 4
- Meta Pixel (Facebook/Instagram ads)
- WhatsApp conversion tracking

---

## 🔮 Évolution Future

### Nouveaux Volets Potentiels
L'architecture permet d'ajouter facilement :
- Volet "Bien-être" (compléments alimentaires)
- Volet "Accessoires" (bijoux, sacs)
- Volet "Décoration"

### Process d'Ajout
1. Créer `/app/nouveau-volet/page.tsx`
2. Ajouter les données dans `/lib/data/nouveau-volet-products.ts`
3. Créer les composants dans `/components/volets/nouveau-volet/`
4. Mettre à jour la navigation dans `/lib/data/navigation.ts`

---

**Cette architecture est conçue pour grandir avec Lady Queenn ! 🚀**
