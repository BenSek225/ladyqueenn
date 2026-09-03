# Plan de Refonte & Implémentation - Lady Queenn

## 🎯 Vision de la Refonte

Transformer le site actuel en une **expérience e-commerce premium** qui incarne **Luxury Editorial × Organic Minimal × Image-First**, avec 3 univers distincts mais unifiés sous l'identité Lady Queenn.

### Objectifs Stratégiques

1. **✨ Élégance Éditoriale** : Look & feel de magazine de luxe
2. **🌿 Authenticité Organique** : Chaleur, naturel, artisanal
3. **📸 Image-First** : Photos éditoriales en grand format
4. **🎭 Multi-Univers** : 3 identités visuelles cohérentes
5. **⚡ Performance** : Site rapide, fluide, moderne

---

## ✅ État Actuel (Ce qui existe)

### Code Existant à Refonter

```
app/
├── page.tsx               # 🔴 À refaire complètement
├── layout.tsx             # 🟡 À adapter (fonts, metadata)
├── globals.css            # ✅ Déjà mis à jour (Design System)
├── produit/[slug]/        # 🔴 Structure obsolète (à supprimer)
│
components/
├── site-header.tsx        # 🔴 À refaire (navigation 3 univers)
├── cart-drawer.tsx        # 🟡 À adapter (style + multi-univers)
├── product-card.tsx       # 🔴 À refaire (design éditorial)
├── product-grid.tsx       # 🟡 À adapter
├── add-to-cart.tsx        # 🟡 À adapter (style)
│
lib/
├── products.ts            # 🔴 Obsolète (remplacé par data/*)
├── store.ts               # 🟡 À adapter (multi-univers)
├── data/                  # ✅ Nouveau système (21 produits)
│   ├── sweet-hair-products.ts
│   ├── fragrance-products.ts
│   ├── crochet-products.ts
│   └── all-products.ts
```

### Résumé État

| Élément | État | Action |
|---------|------|--------|
| Design System | ✅ Complet | Utiliser |
| Types TypeScript | ✅ Complet | Utiliser |
| Données produits (21) | ✅ Complet | Utiliser |
| Tailwind config | ✅ Configuré | Utiliser |
| CSS classes custom | ✅ Créées | Utiliser |
| Page d'accueil | 🔴 Obsolète | **Refaire** |
| Navigation/Header | 🔴 Obsolète | **Refaire** |
| Pages univers | ❌ Inexistant | **Créer** |
| Pages détails | 🔴 Obsolète | **Refaire** |
| Composants UI | 🔴 Partiels | **Refaire** |

---

## 📋 Refonte Complète Étape par Étape

### 🎨 Phase 0 : Préparation (1-2h)

#### 0.1 - Nettoyage du Code Existant

```bash
# Fichiers à SUPPRIMER (obsolètes)
- app/produit/[slug]/page.tsx
- lib/products.ts (remplacé par lib/data/*)

# Fichiers à GARDER mais REFAIRE
- app/page.tsx
- components/site-header.tsx
- components/product-card.tsx
```

**Actions** :
- [ ] Supprimer `/app/produit/` (obsolète)
- [ ] Supprimer `/lib/products.ts` (remplacé)
- [ ] Sauvegarder backup si nécessaire

#### 0.2 - Intégration des Fonts

**Fichier** : `app/layout.tsx`

```tsx
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="fr" 
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
```

**Actions** :
- [ ] Intégrer les 3 fonts Google
- [ ] Tester l'affichage des fonts
- [ ] Vérifier les variables CSS

---

### 🏗️ Phase 1 : Layout & Navigation (Priorité CRITIQUE) 🔴

#### 1.1 - Header Unifié avec Navigation 3 Univers

**Fichier** : `components/layout/site-header.tsx` (REFAIRE)

**Design référence** : Visuels fournis

**Structure** :
```
┌─────────────────────────────────────────────────────────┐
│ 👑 Logo Lady Queenn    [CHEVEUX] [CORPS] [MAISON]   🔍 👤 🛒│
└─────────────────────────────────────────────────────────┘
```

**Spécifications** :
- Logo avec couronne (SVG custom ou texte stylisé)
- Navigation principale : "CHEVEUX" (Sweet-Hair), "CORPS" (Fragrance), "MAISON" (Crochet)
- Icônes : Search, User, Cart
- Background : Cream White (#F9F6F1)
- Texte : Deep Black (#1A1714)
- Hover : Champagne Gold (#C6A87C)
- Height : 80px desktop / 64px mobile
- Sticky au scroll

**Composant** :
```tsx
'use client'

import Link from 'next/link'
import { Search, User, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/stores/cart-store'

export function SiteHeader() {
  const cartCount = useCart((state) => state.getCartCount())
  
  return (
    <header className="sticky top-0 z-50 bg-cream-white border-b border-warm-200">
      <div className="container-luxury">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">👑</span>
            <span className="font-display text-2xl tracking-tight">
              Lady Queenn
            </span>
          </Link>

          {/* Navigation principale */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/sweet-hair" 
              className="text-sm uppercase tracking-[0.18em] hover:text-gold-champagne transition-colors"
            >
              Cheveux
            </Link>
            <Link 
              href="/fragrance" 
              className="text-sm uppercase tracking-[0.18em] hover:text-gold-champagne transition-colors"
            >
              Corps
            </Link>
            <Link 
              href="/crochet-by-thed" 
              className="text-sm uppercase tracking-[0.18em] hover:text-gold-champagne transition-colors"
            >
              Maison
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button className="hover:text-gold-champagne transition-colors">
              <Search size={20} />
            </button>
            <Link href="/compte" className="hover:text-gold-champagne transition-colors">
              <User size={20} />
            </Link>
            <Link href="/panier" className="relative hover:text-gold-champagne transition-colors">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-champagne text-deep-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
```

**Actions** :
- [ ] Créer `components/layout/site-header.tsx`
- [ ] Implémenter navigation 3 univers
- [ ] Ajouter icônes avec compteur panier
- [ ] Rendre sticky au scroll
- [ ] Version mobile (hamburger menu)

#### 1.2 - Footer Élégant

**Fichier** : `components/layout/site-footer.tsx` (CRÉER)

**Structure** : 4 colonnes + Social

**Actions** :
- [ ] Créer footer avec 4 colonnes
- [ ] Links : À propos, Univers, Légal, Social
- [ ] Background : Deep Black
- [ ] Texte : Cream White
- [ ] Newsletter signup (optionnel)

#### 1.3 - Breadcrumb Élégant

**Fichier** : `components/layout/breadcrumb.tsx` (CRÉER)

**Style** : `ACCUEIL / CHEVEUX / HUILE CAPILLAIRE`

**Actions** :
- [ ] Composant breadcrumb avec séparateurs
- [ ] Style : eyebrow-label
- [ ] Responsive

---

### 🏠 Phase 2 : Page d'Accueil Éditoriale (Priorité CRITIQUE) 🔴

#### 2.1 - Hero Section Immersive

**Fichier** : `app/page.tsx` (REFAIRE COMPLET)

**Design référence** : Visuel "Embrace Your Queenn Energy"

**Structure** :
```
┌────────────────────────────────────────────────┐
│                                                │
│  [Image plein écran - Modèle élégante]         │
│                                                │
│       BEAUTY. ROOTS. RITUAL.                   │
│                                                │
│       Embrace Your                             │
│       Queenn Energy                            │
│                                                │
│   Natural care, timeless fragrance, and        │
│   handmade pieces that celebrate African       │
│   elegance and conscious luxury.               │
│                                                │
│       [DISCOVER OUR UNIVERSES →]               │
│                                                │
└────────────────────────────────────────────────┘
```

**Spécifications** :
- Height : min-h-screen (100vh)
- Background : Image éditoriale haute qualité
- Overlay : gradient subtle
- Typographie : Display serif 64-96px
- Eyebrow : "BEAUTY. ROOTS. RITUAL."
- CTA : Bouton gold

**Composant** :
```tsx
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/home/hero-queenn-energy.jpg"
            alt="Lady Queenn - African Elegance"
            fill
            priority
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream-white/20 to-cream-white/60" />
        </div>

        {/* Content */}
        <div className="container-luxury text-center">
          <p className="eyebrow-label text-gold-dark mb-6">
            BEAUTY. ROOTS. RITUAL.
          </p>

          <h1 className="font-display text-6xl md:text-8xl leading-none mb-8 text-balance">
            Embrace Your
            <br />
            <span className="italic font-normal">Queenn Energy</span>
          </h1>

          <p className="text-lg md:text-xl text-warm-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Natural care, timeless fragrance, and handmade pieces that celebrate 
            African elegance and conscious luxury.
          </p>

          <Link href="#universes" className="btn-primary inline-flex items-center gap-3">
            Discover Our Universes
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Reste des sections... */}
    </main>
  )
}
```

**Actions** :
- [ ] Créer hero section plein écran
- [ ] Intégrer image éditoriale haute qualité
- [ ] Typography : Playfair Display
- [ ] CTA button avec animation
- [ ] Responsive mobile

#### 2.2 - Section 3 Univers (Bento Grid)

**Design référence** : Visuels 3 univers côte à côte

**Structure** : 3 grandes cards horizontales

**Univers Cards** :

1. **Sweet-Hair** — Natural Hair Care
2. **Fragrance** — Luxury Fragrances  
3. **Crochet by THED** — Handmade by THED

**Composant** : `components/home/universe-card.tsx`

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface UniverseCardProps {
  title: string
  subtitle: string
  description: string
  image: string
  href: string
  accent: 'sage' | 'plum' | 'terracotta'
}

export function UniverseCard({ title, subtitle, description, image, href, accent }: UniverseCardProps) {
  const accentColors = {
    sage: 'hover:text-sh-olive',
    plum: 'hover:text-fr-plum',
    terracotta: 'hover:text-cr-earth'
  }

  return (
    <Link href={href} className="group">
      <article className="bg-white rounded-soft overflow-hidden transition-all duration-slow hover:shadow-elevated hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-slower group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="eyebrow-label mb-3">{subtitle}</p>
          <h2 className={`font-display text-3xl mb-4 ${accentColors[accent]} transition-colors`}>
            {title}
          </h2>
          <p className="text-warm-500 leading-relaxed mb-6">{description}</p>
          
          <div className={`inline-flex items-center gap-2 text-sm font-medium ${accentColors[accent]} transition-colors`}>
            Discover
            <ArrowRight size={16} />
          </div>
        </div>
      </article>
    </Link>
  )
}
```

**Usage dans page.tsx** :
```tsx
<section id="universes" className="container-luxury py-24">
  <div className="text-center mb-16">
    <h2 className="font-display text-5xl mb-4">Our Universes</h2>
    <p className="text-warm-500">Three expressions of African refinement</p>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    <UniverseCard
      title="Sweet-Hair"
      subtitle="Natural Hair Care"
      description="Nourish, hydrate and celebrate your natural texture with plant-powered care."
      image="/images/volets/sweet-hair-hero.jpg"
      href="/sweet-hair"
      accent="sage"
    />
    <UniverseCard
      title="Fragrance"
      subtitle="Luxury Fragrances"
      description="Scents inspired by heritage, crafted to linger on your skin and tell your story."
      image="/images/volets/fragrance-hero.jpg"
      href="/fragrance"
      accent="plum"
    />
    <UniverseCard
      title="Crochet by THED"
      subtitle="Handmade by THED"
      description="Timeless crochet pieces, lovingly made with intention and rooted in tradition."
      image="/images/volets/crochet-hero.jpg"
      href="/crochet-by-thed"
      accent="terracotta"
    />
  </div>
</section>
```

**Actions** :
- [ ] Créer UniverseCard component
- [ ] Implémenter 3 cards avec images
- [ ] Hover states élégants
- [ ] Responsive grid

#### 2.3 - Section Nouveautés

**Style** : Grille Swiss 3-4 colonnes

**Actions** :
- [ ] Utiliser `getNewProducts(6)`
- [ ] Grid responsive avec ProductCard
- [ ] Badge "Nouveau"
- [ ] Link "Voir tout"

#### 2.4 - Section "L'Inspiration" (Optionnel)

**Style** : Galerie flat lays / lifestyle

**Actions** :
- [ ] Section avec 4 images inspirantes
- [ ] Texte : "NOTRE INSPIRATION" + description
- [ ] Link journal (future)

---

### 🛍️ Phase 3 : Pages Univers (Boutiques) (Priorité HAUTE) 🔴

#### 3.1 - Page Sweet-Hair

**Fichier** : `app/sweet-hair/page.tsx` (CRÉER)

**Design référence** : Visuel Sweet-Hair avec produits

**Structure** :
```
1. Hero Section Univers (image + titre + tagline)
2. Section Bénéfices (4 icônes : Naturel, Pousse, Volume, Réparation)
3. Grille Produits (4 produits)
4. Section "Nos Rituels" (comment utiliser)
5. CTA Kit Complet (highlight promo)
```

**Hero Sweet-Hair** :
- Background : Image produits sur pierre/bois
- Overlay : vert sauge subtil
- Titre : "Lady Queenn Sweet-Hair"
- Tagline : "LA NATURE SUBLIME VOS CHEVEUX"
- Eyebrow : "SOIN NATUREL & LUXUEUX"

**Composant Hero** :
```tsx
export default function SweetHairPage() {
  return (
    <main className="volet-sweet-hair">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/volets/sweet-hair-hero-full.jpg"
            alt="Sweet-Hair Natural Hair Care"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-sh-light/40" />
        </div>

        <div className="container-luxury text-center">
          <p className="eyebrow-label text-sh-olive mb-4">
            SOIN NATUREL & LUXUEUX
          </p>

          <h1 className="font-display text-6xl md:text-8xl mb-6">
            Lady Queenn
            <br />
            <span className="italic font-normal">Sweet-Hair</span>
          </h1>

          <p className="text-lg text-warm-500 max-w-2xl mx-auto mb-8">
            Des soins biologiques, formulés avec des ingrédients naturels d'Ivoire 
            pour des cheveux nourris, forts et resplendissants.
          </p>

          <Link href="#products" className="btn-primary">
            Découvrir nos rituels
          </Link>
        </div>
      </section>

      {/* Bénéfices */}
      <section className="container-luxury py-16">
        {/* 4 icônes avec bénéfices */}
      </section>

      {/* Produits */}
      <section id="products" className="section-alt py-24">
        <ProductGrid products={sweetHairProducts} />
      </section>

      {/* Kit Highlight */}
      <section className="container-luxury py-24">
        {/* Card spéciale Kit avec promo */}
      </section>
    </main>
  )
}
```

**Actions** :
- [ ] Créer page Sweet-Hair complète
- [ ] Hero avec image éditoriale
- [ ] Section bénéfices avec icônes
- [ ] Grille produits 4 items
- [ ] Highlight Kit Complet

#### 3.2 - Page Fragrance

**Fichier** : `app/fragrance/page.tsx` (CRÉER)

**Design référence** : Visuel Fragrance avec flacons luxe

**Structure** :
```
1. Hero Luxe (fond sombre/dramatique)
2. Filtres H/F/Mixte (tabs élégants)
3. Grille Produits (8 parfums)
4. Section "L'art du parfum" (storytelling)
```

**Hero Fragrance** :
- Background : Fond sombre avec roses/fleurs
- Flacons en avant-plan
- Typographie : Or champagne
- Ambiance : Luxe, mystère

**Actions** :
- [ ] Créer page Fragrance
- [ ] Hero dramatique/luxueux
- [ ] Tabs filtres H/F/Mixte
- [ ] Grid 8 parfums
- [ ] Section storytelling

#### 3.3 - Page Crochet by THED

**Fichier** : `app/crochet-by-thed/page.tsx` (CRÉER)

**Design référence** : Visuel Crochet avec modèles

**Structure** :
```
1. Hero Artisanal (lifestyle avec modèles)
2. Tagline : "FAIT À LA MAIN, PORTÉ AVEC INTENTION"
3. Tabs : Prêt-à-porter / Sur-mesure / Galerie
4. Grille Produits (9 créations)
5. Section Process (4 étapes sur-mesure)
```

**Hero Crochet** :
- Background : Lifestyle (modèles portant créations)
- Couleur dominante : Terracotta
- Ambiance : Chaleur, authenticité

**Actions** :
- [ ] Créer page Crochet
- [ ] Hero lifestyle avec modèles
- [ ] Tabs navigation (Boutique/Sur-mesure/Galerie)
- [ ] Grid 9 créations
- [ ] Section process sur-mesure

---

### 🔍 Phase 4 : Pages Détails Produits (Priorité HAUTE) 🔴

#### 4.1 - Template Détail Produit

**Fichier** : `app/[volet]/[slug]/page.tsx` (pattern générique)

**Design référence** : Visuel "Élixir de Néroli" détaillé

**Structure** :
```
┌─────────────────┬──────────────────────────────┐
│                 │  NOUVEAU                     │
│                 │  Élixir de Néroli            │
│  Image          │  Huile Capillaire            │
│  Produit        │                              │
│  Grande         │  48,00 €                     │
│  (60% width)    │                              │
│                 │  Description...              │
│                 │                              │
│                 │  FORMAT  [50 ML ▼]           │
│  [Miniatures]   │  TEXTURE [●] [○]             │
│  [● ○ ○]        │                              │
│                 │  [AJOUTER AU PANIER 48€]     │
│                 │  [COMMANDER VIA WHATSAPP]    │
│                 │                              │
│                 │  🍃 Ingrédients naturels     │
│                 │  🎨 Fabrication artisanale   │
│                 │  🎁 Édition limitée          │
└─────────────────┴──────────────────────────────┘

[Section Détails]
[Section Ingrédients]
[Section Utilisation]
[Produits Similaires]
```

**Spécifications** :
- Layout : 60/40 asymétrique (image / info)
- Image : Ratio 4:5, haute qualité
- Gallery : 3-4 miniatures sous image principale
- Badge : Position top-left sur image
- Prix : Font mono, champagne gold
- Boutons : Primary (Panier) + Secondary (WhatsApp)
- Icônes : Minimales, élégantes
- Section tabs : Détails / Ingrédients / Utilisation

**Composant** :
```tsx
// app/[volet]/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/data/all-products'
import { ProductDetailLayout } from '@/components/product/product-detail-layout'

export default async function ProductDetailPage({ 
  params 
}: { 
  params: { volet: string; slug: string } 
}) {
  const product = getProductBySlug(params.slug)
  
  if (!product || product.volet !== params.volet) {
    notFound()
  }

  return <ProductDetailLayout product={product} />
}
```

**Composant Detail Layout** :
```tsx
// components/product/product-detail-layout.tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { AnyProduct } from '@/lib/types'
import { ProductBadge } from '@/components/shared/product-badge'
import { PriceDisplay } from '@/components/shared/price-display'
import { AddToCart } from '@/components/shared/add-to-cart'
import { WhatsAppButton } from '@/components/shared/whatsapp-button'

export function ProductDetailLayout({ product }: { product: AnyProduct }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const images = product.images || [product.image]

  return (
    <main>
      <div className="container-luxury py-12">
        <div className="grid lg:grid-cols-[60%_40%] gap-12">
          {/* Images */}
          <div>
            {/* Image principale */}
            <div className="relative aspect-[4/5] rounded-soft overflow-hidden mb-4">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <ProductBadge badge={product.badge} />
                </div>
              )}
            </div>

            {/* Miniatures */}
            {images.length > 1 && (
              <div className="flex gap-4">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative aspect-square w-20 rounded overflow-hidden border-2 transition-colors ${
                      i === selectedImage ? 'border-gold-champagne' : 'border-transparent'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            {/* Eyebrow volet */}
            <p className="eyebrow-label">
              {product.volet === 'sweet-hair' && 'Sweet-Hair'}
              {product.volet === 'fragrance' && 'Fragrance'}
              {product.volet === 'crochet-by-thed' && 'Crochet by THED'}
            </p>

            {/* Titre */}
            <h1 className="font-display text-4xl md:text-5xl leading-tight">
              {product.name}
            </h1>

            {/* Prix */}
            <PriceDisplay price={product.price} oldPrice={product.oldPrice} className="text-2xl" />

            {/* Description */}
            <p className="text-warm-500 leading-relaxed">
              {product.description}
            </p>

            {/* Variants (si applicable) */}
            {/* ... */}

            {/* Actions */}
            <div className="space-y-3">
              <AddToCart product={product} />
              <WhatsAppButton product={product} />
            </div>

            {/* USPs */}
            <div className="pt-6 space-y-3 border-t border-warm-200">
              <div className="flex items-center gap-3 text-sm">
                <span>🍃</span>
                <span>Ingrédients d'origine naturelle</span>
              </div>
              {/* ... autres USPs */}
            </div>
          </div>
        </div>

        {/* Sections détails (tabs ou accordion) */}
        <div className="mt-24">
          {/* Détails, Ingrédients, Utilisation */}
        </div>

        {/* Produits similaires */}
        <div className="mt-24">
          {/* Grid produits similaires */}
        </div>
      </div>
    </main>
  )
}
```

**Actions** :
- [ ] Créer template détail produit
- [ ] Layout 60/40 asymétrique
- [ ] Gallery images avec miniatures
- [ ] Section info complète
- [ ] Boutons Panier + WhatsApp
- [ ] Tabs détails
- [ ] Produits similaires

---

### 🛒 Phase 5 : Panier & Checkout (Priorité MOYENNE) 🟡

#### 5.1 - Refonte Store Panier

**Fichier** : `lib/stores/cart-store.ts` (ADAPTER)

**Modifications** :
- Ajouter champ `volet` dans CartItem
- Grouper items par volet dans affichage
- Formatter message WhatsApp avec sections par volet

**Actions** :
- [ ] Adapter store Zustand
- [ ] Grouper par volet
- [ ] Formatter message WhatsApp

#### 5.2 - Cart Drawer Refonte

**Fichier** : `components/shared/cart-drawer.tsx` (REFAIRE)

**Style** : Drawer latéral 400px width

**Structure** :
```
┌─────────────────┐
│ Panier (3) [×]  │
├─────────────────┤
│ Sweet-Hair      │
│ ├─ Huile x1     │
│ └─ Kit x1       │
│                 │
│ Fragrance       │
│ ├─ Andolacy x1  │
│                 │
│ TOTAL: 42 000   │
│                 │
│ [COMMANDER →]   │
└─────────────────┘
```

**Actions** :
- [ ] Drawer avec Shadcn Sheet
- [ ] Grouper items par volet
- [ ] Total et CTA WhatsApp

#### 5.3 - Page Panier Complète

**Fichier** : `app/panier/page.tsx` (CRÉER)

**Layout** : Page complète avec récapitulatif

**Actions** :
- [ ] Page panier full
- [ ] Table items
- [ ] Quantité +/-
- [ ] Total et CTA

---

### 🔍 Phase 6 : Recherche & Filtres (Priorité MOYENNE) 🟡

#### 6.1 - Barre de Recherche Globale

**Composant** : `components/shared/search-bar.tsx`

**Style** : Modal overlay avec suggestions

**Actions** :
- [ ] Input recherche header
- [ ] Modal overlay résultats
- [ ] Recherche instant (debounce)
- [ ] Grouper par volet

#### 6.2 - Page Résultats Recherche

**Fichier** : `app/recherche/page.tsx`

**Actions** :
- [ ] Page résultats
- [ ] Filtres sidebar
- [ ] Grid responsive

---

### 🎨 Phase 7 : Composants Shared (Priorité MOYENNE) 🟡

#### 7.1 - ProductCard Refonte

**Fichier** : `components/shared/product-card.tsx` (REFAIRE)

**Design référence** : Cards produits visuels

**Specs** :
- Ratio image : 4:5 (portrait)
- Background : white
- Hover : shadow + scale(1.02)
- Badge : top-left
- Info : eyebrow, titre, description, prix
- CTA : "Ajouter au panier" au hover

**Actions** :
- [ ] Refaire ProductCard
- [ ] Image 4:5 ratio
- [ ] Hover élégant
- [ ] Badge positionné

#### 7.2 - Autres Composants

**Actions** :
- [ ] ProductBadge (déjà créé, tester)
- [ ] PriceDisplay (déjà créé, tester)
- [ ] AddToCart (adapter style)
- [ ] WhatsAppButton (créer)
- [ ] StockIndicator (créer)

---

### ✨ Phase 8 : Animations & Polish (Priorité BASSE) 🟢

#### 8.1 - Smooth Scroll

**Librairie** : Lenis

```bash
npm install @studio-freight/lenis
```

**Implémentation** : `app/layout.tsx`

**Actions** :
- [ ] Installer Lenis
- [ ] Configurer smooth scroll
- [ ] Tester navigation

#### 8.2 - Reveal Animations

**Composant** : `components/shared/reveal-section.tsx` (déjà créé)

**Actions** :
- [ ] Wraper sections avec RevealSection
- [ ] Tester scroll reveal
- [ ] Ajuster thresholds

#### 8.3 - Micro-interactions

**Actions** :
- [ ] Hover states tous boutons
- [ ] Transitions douces
- [ ] Loading states
- [ ] Toast notifications

---

### 📱 Phase 9 : Responsive & Mobile (Priorité HAUTE) 🔴

#### 9.1 - Mobile Navigation

**Composant** : `components/layout/mobile-menu.tsx`

**Style** : Hamburger → Drawer full-screen

**Actions** :
- [ ] Hamburger icon
- [ ] Drawer menu
- [ ] Navigation 3 univers
- [ ] Close animation

#### 9.2 - Mobile Optimizations

**Actions** :
- [ ] Tester toutes pages mobile
- [ ] Images responsive
- [ ] Touch targets 44px min
- [ ] Drawer panier mobile

---

### 🖼️ Phase 10 : Images & Assets (Priorité CRITIQUE) 🔴

#### 10.1 - Remplacer Placeholders

**Actuellement** : Images Unsplash placeholder

**À faire** :
- [ ] Photos produits Sweet-Hair (huile, shampooing, pommade, kit)
- [ ] Photos parfums Fragrance (8 flacons)
- [ ] Photos créations Crochet (9 pièces + lifestyle)
- [ ] Photos hero (accueil, 3 univers)
- [ ] Photos lifestyle/inspiration

**Specs photos** :
- Format : JPEG optimisé ou WebP
- Résolution : 1920px max width
- Qualité : 85%
- Ratio produits : 4:5 (portrait)
- Ratio hero : 16:9 ou 21:9

#### 10.2 - Logo & Icônes

**À créer** :
- [ ] Logo Lady Queenn avec couronne (SVG)
- [ ] Favicon
- [ ] Open Graph image
- [ ] Icônes USPs (naturel, artisanal, etc.)

---

### 🧪 Phase 11 : Tests & QA (Priorité HAUTE) 🔴

#### 11.1 - Tests Manuels

**Checklist** :
- [ ] Navigation entre univers fluide
- [ ] Ajout panier multi-volets
- [ ] Génération message WhatsApp correct
- [ ] Recherche globale fonctionne
- [ ] Responsive 3 tailles (mobile, tablet, desktop)
- [ ] Images chargent correctement
- [ ] Animations smooth
- [ ] Accessibility (clavier, screen reader)

#### 11.2 - Performance

**Actions** :
- [ ] Lighthouse score > 90
- [ ] Images optimisées (Next.js Image)
- [ ] Fonts preload
- [ ] No layout shift (CLS)

---

### 🚀 Phase 12 : Déploiement (Priorité FINALE) 🔴

#### 12.1 - Préparation

**Actions** :
- [ ] Build production test local
- [ ] Vérifier .env variables
- [ ] Tester build errors
- [ ] Optimiser bundle size

#### 12.2 - Vercel Deployment

**Actions** :
- [ ] Connecter GitHub → Vercel
- [ ] Configurer environnement
- [ ] Premier déploiement
- [ ] Tester production URL

#### 12.3 - Domain Custom

**Actions** :
- [ ] Acheter domaine (ladyqueenn.ci ou .com)
- [ ] Configurer DNS Vercel
- [ ] SSL auto (Vercel)
- [ ] Tester domaine

---

## 📊 Estimation Temps

### Par Phase (développeur expérimenté)

| Phase | Tâche | Temps estimé |
|-------|-------|--------------|
| 0 | Préparation | 1-2h |
| 1 | Layout & Navigation | 4-6h |
| 2 | Page Accueil | 6-8h |
| 3 | Pages Univers (×3) | 12-16h |
| 4 | Pages Détails | 6-8h |
| 5 | Panier & Checkout | 4-6h |
| 6 | Recherche & Filtres | 4-6h |
| 7 | Composants Shared | 4-6h |
| 8 | Animations & Polish | 2-4h |
| 9 | Responsive Mobile | 4-6h |
| 10 | Images & Assets | 4-6h |
| 11 | Tests & QA | 6-8h |
| 12 | Déploiement | 2-3h |

**TOTAL : 60-85 heures** (8-11 jours à temps plein)

### Priorisation

**Sprint 1 (Critique) : MVP Fonctionnel**
- Phases 0, 1, 2, 3, 4, 10 → 35-45h
- Livrable : Site navigable avec 3 univers et produits

**Sprint 2 (Important) : E-commerce Complet**
- Phases 5, 6, 7, 9 → 16-24h
- Livrable : Panier, recherche, mobile optimisé

**Sprint 3 (Polish) : Finitions**
- Phases 8, 11, 12 → 10-15h
- Livrable : Site production prêt

---

## ✅ Checklist Finale

Avant de considérer le site terminé :

### Design
- [ ] Design system respecté partout
- [ ] Typographie cohérente (Playfair + Inter + Mono)
- [ ] Palette couleurs respectée
- [ ] Spacing multiple de 8px
- [ ] Hover states définis
- [ ] Animations douces

### Fonctionnel
- [ ] Navigation 3 univers fluide
- [ ] 21 produits affichés correctement
- [ ] Panier unifié fonctionne
- [ ] Message WhatsApp formaté
- [ ] Recherche globale opérationnelle
- [ ] Filtres fonctionnels

### Responsive
- [ ] Mobile < 640px parfait
- [ ] Tablet 640-1024px parfait
- [ ] Desktop > 1024px parfait
- [ ] Touch targets 44px min
- [ ] Menu hamburger mobile

### Performance
- [ ] Lighthouse > 90
- [ ] Images optimisées
- [ ] Fonts preload
- [ ] Bundle size < 500kb
- [ ] CLS < 0.1

### Accessibility
- [ ] Contraste WCAG AA
- [ ] Focus visible
- [ ] Alt text images
- [ ] Navigation clavier
- [ ] Screen reader friendly

### SEO
- [ ] Metadata complètes
- [ ] Open Graph tags
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Structured data

---

## 🎯 Notes Importantes

### Code à Supprimer

```
❌ app/produit/[slug]/       # Obsolète
❌ lib/products.ts            # Remplacé par lib/data/*
❌ Ancien product-card.tsx    # Refaire avec design system
```

### Code à Adapter

```
🟡 components/site-header.tsx    # Ajouter nav 3 univers
🟡 components/cart-drawer.tsx    # Style + grouper par volet
🟡 lib/store.ts                  # Ajouter volet field
```

### Code à Créer

```
✅ Tous les fichiers Phase 2, 3, 4
✅ Composants layout/
✅ Composants volets/
✅ Pages univers
✅ Pages détails
```

---

**Plan de refonte complet - Prêt à exécuter ! 🚀👑**
