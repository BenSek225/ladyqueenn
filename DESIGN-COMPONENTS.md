# Composants UI Lady Queenn

Guide d'implémentation des composants selon le Design System **Luxury Editorial × Organic Minimal**.

---

## 🎨 Principes d'Utilisation

### Classes Tailwind Personnalisées

Toutes les classes custom sont définies dans `globals.css` et suivent le design system.

```typescript
// Boutons
.btn-primary      // Call-to-action principal
.btn-secondary    // Outline élégant
.btn-ghost        // Lien souligné

// Cards
.product-card     // Card produit avec hover

// Badges
.badge-nouveau
.badge-promo
.badge-coup-de-coeur

// Layouts
.container-luxury // Container avec marges luxueuses
.grid-swiss       // Grille catalogue stricte
.grid-asymmetric  // Asymétrique 60/40

// Typography
.eyebrow-label    // Labels uppercase
.price            // Prix en mono

// Animations
.reveal-on-scroll // Reveal au scroll
```

---

## 📦 Composants Prêts à l'Emploi

### 1. Bouton Primary

```tsx
// components/ui/button-primary.tsx
interface ButtonPrimaryProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function ButtonPrimary({ children, onClick, className = '' }: ButtonPrimaryProps) {
  return (
    <button
      onClick={onClick}
      className={`btn-primary ${className}`}
    >
      {children}
    </button>
  )
}

// Usage
<ButtonPrimary onClick={() => addToCart(product)}>
  Ajouter au panier
</ButtonPrimary>
```

---

### 2. Card Produit

```tsx
// components/shared/product-card.tsx
import Image from 'next/image'
import Link from 'next/link'
import { AnyProduct } from '@/lib/types'
import { ProductBadge } from './product-badge'
import { PriceDisplay } from './price-display'
import { AddToCart } from './add-to-cart'

interface ProductCardProps {
  product: AnyProduct
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/${product.volet}/${product.slug}`}>
      <article className="product-card group">
        {/* Image avec ratio 4:5 */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-soft mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-slow group-hover:scale-105"
          />
          
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <ProductBadge badge={product.badge} />
            </div>
          )}
        </div>

        {/* Info produit */}
        <div className="space-y-2">
          {/* Label volet */}
          <p className="eyebrow-label">
            {product.volet === 'sweet-hair' && 'Sweet-Hair'}
            {product.volet === 'fragrance' && 'Fragrance'}
            {product.volet === 'crochet-by-thed' && 'Crochet by THED'}
          </p>

          {/* Nom produit */}
          <h3 className="font-display text-xl leading-tight text-deep-black group-hover:text-gold-dark transition-colors">
            {product.name}
          </h3>

          {/* Description courte */}
          <p className="text-sm text-warm-500 line-clamp-2">
            {product.description}
          </p>

          {/* Prix */}
          <PriceDisplay price={product.price} oldPrice={product.oldPrice} />
        </div>

        {/* Bouton ajout panier (au hover) */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-normal">
          <AddToCart product={product} />
        </div>
      </article>
    </Link>
  )
}
```

---

### 3. Badge Produit

```tsx
// components/shared/product-badge.tsx
import { Badge } from '@/lib/types'

interface ProductBadgeProps {
  badge: Badge
}

export function ProductBadge({ badge }: ProductBadgeProps) {
  const badgeClasses = {
    'nouveau': 'badge-nouveau',
    'promo': 'badge-promo',
    'coup-de-coeur': 'badge-coup-de-coeur',
    'épuisé': 'bg-warm-300 text-warm-500',
    'limité': 'bg-gold-soft text-deep-black',
    'sur-commande': 'bg-cr-light text-cr-earth'
  }

  const badgeLabels = {
    'nouveau': 'Nouveau',
    'promo': 'Promo',
    'coup-de-coeur': '♥ Coup de Cœur',
    'épuisé': 'Épuisé',
    'limité': 'Édition Limitée',
    'sur-commande': 'Sur Commande'
  }

  return (
    <span className={badgeClasses[badge]}>
      {badgeLabels[badge]}
    </span>
  )
}
```

---

### 4. Affichage Prix

```tsx
// components/shared/price-display.tsx
interface PriceDisplayProps {
  price: number
  oldPrice?: number
  className?: string
}

export function PriceDisplay({ price, oldPrice, className = '' }: PriceDisplayProps) {
  const formatPrice = (amount: number) => {
    return `${amount.toLocaleString('fr-FR')} FCFA`
  }

  return (
    <div className={`flex items-baseline gap-3 ${className}`}>
      <span className="price">
        {formatPrice(price)}
      </span>
      
      {oldPrice && (
        <span className="text-sm text-warm-400 line-through font-mono">
          {formatPrice(oldPrice)}
        </span>
      )}
    </div>
  )
}
```

---

### 5. Grille de Produits

```tsx
// components/shared/product-grid.tsx
import { AnyProduct } from '@/lib/types'
import { ProductCard } from './product-card'

interface ProductGridProps {
  products: AnyProduct[]
  columns?: 'swiss' | 'asymmetric' | 'bento'
}

export function ProductGrid({ products, columns = 'swiss' }: ProductGridProps) {
  const gridClass = columns === 'swiss' ? 'grid-swiss' : 'grid gap-6'

  return (
    <section className="container-luxury py-16">
      <div className={gridClass}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
```

---

### 6. Hero Section

```tsx
// components/home/hero-section.tsx
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="hero-section relative">
      {/* Image de fond */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/home/hero-background.jpg"
          alt="Lady Queenn"
          fill
          priority
          quality={90}
          className="object-cover"
        />
        {/* Overlay doux */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream-white/40 to-cream-white/80" />
      </div>

      {/* Contenu */}
      <div className="container-luxury text-center">
        <p className="eyebrow-label mb-6">
          Objets choisis · Abidjan
        </p>

        <h1 className="font-display text-6xl md:text-8xl leading-none text-balance mb-8">
          Le raffinement
          <br />
          <span className="italic font-normal">au quotidien.</span>
        </h1>

        <p className="text-lg text-warm-500 max-w-xl mx-auto mb-12">
          Une collection sensible de soins, fragrances et créations artisanales 
          qui racontent notre maison.
        </p>

        <Link href="#volets" className="btn-primary inline-flex items-center gap-2">
          Découvrir nos volets
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  )
}
```

---

### 7. Card Volet (Bento Style)

```tsx
// components/home/volet-card.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Volet } from '@/lib/types'

interface VoletCardProps {
  title: string
  subtitle: string
  description: string
  image: string
  href: string
  volet: Volet
}

export function VoletCard({ title, subtitle, description, image, href, volet }: VoletCardProps) {
  const voletClasses = {
    'sweet-hair': 'volet-sweet-hair',
    'fragrance': 'volet-fragrance',
    'crochet-by-thed': 'volet-crochet'
  }

  return (
    <Link href={href}>
      <article className={`group ${voletClasses[volet]} bg-white rounded-soft overflow-hidden 
                          transition-all duration-slow hover:shadow-elevated hover:-translate-y-1`}>
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-slower group-hover:scale-105"
          />
        </div>

        {/* Contenu */}
        <div className="p-8">
          <p className="eyebrow-label mb-3">
            {subtitle}
          </p>

          <h2 className="font-display text-3xl mb-4 text-deep-black group-hover:text-[var(--volet-color)] transition-colors">
            {title}
          </h2>

          <p className="text-warm-500 leading-relaxed">
            {description}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium group-hover:text-[var(--volet-color)] transition-colors">
            Découvrir
            <ArrowRight size={16} />
          </div>
        </div>
      </article>
    </Link>
  )
}
```

---

### 8. Section Révélation au Scroll

```tsx
// components/shared/reveal-section.tsx
'use client'

import { useEffect, useRef } from 'react'

interface RevealSectionProps {
  children: React.ReactNode
  className?: string
}

export function RevealSection({ children, className = '' }: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal-on-scroll ${className}`}>
      {children}
    </div>
  )
}

// Usage
<RevealSection>
  <h2 className="font-display text-5xl">Nos créations</h2>
  <p className="text-warm-500">Découvrez l'artisanat...</p>
</RevealSection>
```

---

## 🎭 Exemples de Layouts

### Layout Page Accueil

```tsx
// app/page.tsx
import { HeroSection } from '@/components/home/hero-section'
import { VoletCard } from '@/components/home/volet-card'
import { ProductGrid } from '@/components/shared/product-grid'
import { getNewProducts } from '@/lib/data/all-products'

export default function HomePage() {
  const nouveautes = getNewProducts(6)

  return (
    <main>
      {/* Hero plein écran */}
      <HeroSection />

      {/* Section volets - Bento Grid */}
      <section id="volets" className="container-luxury py-24">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl mb-4">Nos univers</h2>
          <p className="text-warm-500">Trois volets pour exprimer le raffinement</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <VoletCard
            title="Sweet-Hair"
            subtitle="Soins Capillaires"
            description="Gamme naturelle pour la santé et la beauté de vos cheveux."
            image="/images/volets/sweet-hair-hero.jpg"
            href="/sweet-hair"
            volet="sweet-hair"
          />
          <VoletCard
            title="Fragrance"
            subtitle="Parfumerie de Luxe"
            description="Sélection exclusive de parfums importés premium."
            image="/images/volets/fragrance-hero.jpg"
            href="/fragrance"
            volet="fragrance"
          />
          <VoletCard
            title="Crochet by THED"
            subtitle="Créations Artisanales"
            description="Vêtements confectionnés au crochet, prêt-à-porter et sur-mesure."
            image="/images/volets/crochet-hero.jpg"
            href="/crochet-by-thed"
            volet="crochet-by-thed"
          />
        </div>
      </section>

      {/* Nouveautés */}
      <section className="section-alt py-24">
        <div className="container-luxury">
          <h2 className="font-display text-4xl text-center mb-12">Nouveautés</h2>
          <ProductGrid products={nouveautes} />
        </div>
      </section>
    </main>
  )
}
```

---

### Layout Page Boutique (Volet)

```tsx
// app/sweet-hair/page.tsx
import { sweetHairProducts } from '@/lib/data/sweet-hair-products'
import { ProductGrid } from '@/components/shared/product-grid'

export default function SweetHairPage() {
  return (
    <main>
      {/* Hero volet */}
      <section className="hero-section volet-sweet-hair">
        <div className="container-luxury text-center">
          <p className="eyebrow-label mb-4">Soins Capillaires Naturels</p>
          <h1 className="font-display text-6xl md:text-8xl mb-6">
            Sweet-Hair
          </h1>
          <p className="text-lg text-warm-500 max-w-2xl mx-auto">
            Gamme à base d'ingrédients naturels pour favoriser la pousse, 
            réparer et sublimer vos cheveux.
          </p>
        </div>
      </section>

      {/* Bénéfices */}
      <section className="container-luxury py-16">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {['Pousse rapide', 'Volume & Brillance', 'Réparation', '100% Naturel'].map((benefit) => (
            <div key={benefit} className="p-6">
              <h3 className="font-display text-xl mb-2">{benefit}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Produits */}
      <ProductGrid products={sweetHairProducts} />
    </main>
  )
}
```

---

## ✨ Animations & Transitions

### Hover Doux sur Images

```tsx
<Image
  src={image}
  alt={alt}
  className="transition-transform duration-slower ease-smooth-out group-hover:scale-105"
/>
```

### Transition Bouton

```tsx
<button className="transition-all duration-normal ease-smooth-out hover:-translate-y-0.5">
  Ajouter au panier
</button>
```

### Fade In au Chargement

```tsx
<div className="animate-fade-in-up">
  {/* Contenu */}
</div>
```

---

## 📱 Responsive Patterns

### Grid Responsive Standard

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
  {/* Items */}
</div>
```

### Text Responsive

```tsx
<h1 className="text-4xl md:text-6xl lg:text-8xl">
  Titre
</h1>
```

### Padding Responsive

```tsx
<section className="py-12 md:py-16 lg:py-24">
  {/* Contenu */}
</section>
```

---

**Design Components prêts pour Lady Queenn ! 👑**
