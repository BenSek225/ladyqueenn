---
name: "Design System Lady Queenn"
description: "Direction artistique, règles de design et guidelines visuelles pour Lady Queenn"
inclusion: auto
---

# Design System Lady Queenn 👑

## 🎨 Direction Artistique

**Style Global Unifié :**  
**Luxury Editorial × Organic Minimal × Image-First**

### ADN de Marque

Lady Queenn incarne le **raffinement ivoirien contemporain** :
- ✨ **Élégance** : Sans ostentation, naturelle et affirmée
- 🌿 **Authenticité** : Matériaux naturels, artisanat valorisé
- 🏛️ **Intemporalité** : Design qui traverse les modes
- 🤝 **Accessibilité** : Premium mais chaleureux, jamais intimidant

---

## 📐 Layout & Structure

### Principes de Grille

```
Swiss Grid + Asymétrique Contrôlé + Bento Soft
```

#### Pages Catalogue (Sweet-Hair, Fragrance, Crochet)
- **Grille stricte** : 12 colonnes responsive
- **Gouttières** : 24px (mobile) / 32px (desktop)
- **Marges** : 20px (mobile) / 80px (desktop)
- **Espacement vertical** : Multiple de 8px (8, 16, 24, 32, 48, 64, 96, 128)

#### Page Accueil & Pages Éditoriales
- **Asymétrie contrôlée** : 60/40 ou 70/30 splits
- **Modules Bento** : Cards avec spacing généreux
- **Hero sections** : Plein écran ou min-height: 85vh

#### Hiérarchie Visuelle
```
Hero (plein écran) 
  → Section principale (asymétrique)
    → Grilles produits (Swiss strict)
      → Cards produits (Bento soft)
        → Footer (Swiss)
```

---

## 🎭 Typographie

### System Typographique

```typescript
// Hiérarchie de titres
Display: 64-96px (Hero)
H1: 48-64px (Page titles)
H2: 36-48px (Section titles)
H3: 24-32px (Subsections)
H4: 20-24px (Cards titles)
Body Large: 18-20px (Intro)
Body: 16px (Standard)
Body Small: 14px (Captions)
Micro: 12px (Labels)
```

### Fonts Recommandées

#### Titres & Display
```css
/* Option 1 - Élégance classique */
font-family: 'Playfair Display', serif;

/* Option 2 - Modernité élégante */
font-family: 'Cormorant Garamond', serif;

/* Option 3 - Luxe éditorial */
font-family: 'Freight Display', serif;
```

#### Corps de Texte
```css
/* Option 1 - Lisibilité parfaite */
font-family: 'Inter', sans-serif;

/* Option 2 - Modernité douce */
font-family: 'Satoshi', sans-serif;

/* Option 3 - Clean tech */
font-family: 'Geist', sans-serif;
```

#### Prix & Détails Techniques
```css
/* Mono légère pour prix et specs */
font-family: 'JetBrains Mono', monospace;
/* OU */
font-family: 'IBM Plex Mono', monospace;
```

### Règles d'Usage

✅ **À FAIRE**
- Titres en serif élégante (Playfair Display)
- Corps en sans-serif lisible (Inter)
- Prix en mono pour clarté
- Line-height généreux : 1.5-1.7 pour corps, 1.1-1.3 pour titres
- Letter-spacing : -0.02em pour grands titres, normal pour corps

❌ **À ÉVITER**
- Mélanger plus de 3 font-families
- All-caps agressif (uniquement petites doses)
- Texte trop serré (line-height < 1.4)
- Justification de texte (toujours left-aligned)

---

## 🎨 Palette de Couleurs

### Couleurs Principales

```css
/* Fond principal - Blanc cassé chaud */
--cream-white: #F9F6F1;
--cream-light: #F7F3EC;

/* Texte principal - Noir profond chaud */
--deep-black: #1A1714;
--dark-gray: #2D2A27;

/* Accent global - Or champagne */
--champagne-gold: #C6A87C;
--soft-gold: #B89B6A;
--gold-dark: #9D8159;

/* Neutres */
--warm-gray-100: #F5F1ED;
--warm-gray-200: #E8E3DD;
--warm-gray-300: #D1CBC3;
--warm-gray-400: #AFA89F;
--warm-gray-500: #8D877D;
```

### Accents par Volet (subtils)

```css
/* Sweet-Hair - Nature & Soin */
--sh-sage: #8A9A7B;
--sh-olive: #6B7D5C;
--sh-light: #E8EDE5;

/* Fragrance - Luxe & Mystère */
--fr-plum: #6B4E71;
--fr-rose: #B88E97;
--fr-light: #F2EDF0;

/* Crochet by THED - Artisanat & Chaleur */
--cr-terracotta: #D4A59A;
--cr-earth: #9D8579;
--cr-light: #F0EBE8;
```

### Usage des Couleurs

#### Backgrounds
- Pages principales : `cream-white`
- Sections alternées : `cream-light` ou `warm-gray-100`
- Cards : `white` avec ombre douce
- Footer : `deep-black`

#### Texte
- Titres : `deep-black`
- Corps : `dark-gray`
- Captions : `warm-gray-500`
- Links : `champagne-gold` (hover: `gold-dark`)

#### Accents
- Boutons primaires : `deep-black` (hover: `champagne-gold` border)
- Badges : Volet colors en background léger
- Bordures : `warm-gray-200`

---

## 🖼️ Images & Photographie

### Style Photographique

**Luxury Editorial × Organic**

#### Caractéristiques
- 📸 **Lumière naturelle douce** (golden hour privilégiée)
- 🎭 **Compositions soignées** (règle des tiers, espace négatif)
- 🌾 **Textures naturelles** visibles (lin, bois, terre, coton)
- 🎨 **Palette harmonieuse** avec couleurs brand
- 🧘 **Minimalisme** : pas de surcharge visuelle

#### Par Volet

**Sweet-Hair**
- Flat lays sur surfaces naturelles (bois clair, marbre, lin)
- Gros plans sur textures (huile, crème, cheveux)
- Lumière douce et chaude
- Végétation discrète (feuilles, branches)

**Fragrance**
- Flacons sur fond sobre (uni ou texture subtile)
- Jeux d'ombres et de lumière
- Ambiance plus dramatique (contraste maîtrisé)
- Possible fond sombre pour parfums intenses

**Crochet by THED**
- Lifestyle : modèles portant les créations
- Détails crochet (mailles, textures)
- Environnement chaleureux (intérieur lumineux)
- Flat lays pour accessoires

### Dimensions & Ratios

```
Hero images: 16:9 ou 21:9
Product cards: 3:4 ou 4:5 (portrait)
Lifestyle: 4:3 ou 16:9
Gallery: Variable (masonry OK)
```

### Optimisation Technique

```typescript
// Next.js Image avec sizes responsive
<Image
  src={productImage}
  alt="Description précise"
  width={900}
  height={1200}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  quality={85}
  placeholder="blur"
  className="object-cover"
/>
```

---

## ✨ Motion & Animations

### Principes

**Smooth + Reveal + Micro-interactions douces**

#### Timing Functions
```css
/* Courbes naturelles */
--ease-out-smooth: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-smooth: cubic-bezier(0.7, 0, 0.84, 0);
--ease-in-out-smooth: cubic-bezier(0.87, 0, 0.13, 1);
```

#### Durées Standard
```css
--duration-fast: 200ms;      /* Micro-interactions */
--duration-normal: 300ms;    /* Transitions standard */
--duration-slow: 500ms;      /* Reveals, page transitions */
--duration-slower: 800ms;    /* Hero animations */
```

### Animations Autorisées

✅ **À UTILISER**

```css
/* Fade + Translate (scroll reveal) */
opacity: 0 → 1;
transform: translateY(20px) → translateY(0);

/* Hover doux sur cards */
transform: scale(1) → scale(1.02);
box-shadow: subtle → elevated;

/* Hover boutons */
background: primary → accent;
transform: translateY(0) → translateY(-2px);

/* Drawer/Modal */
opacity: 0 → 1;
transform: translateX(100%) → translateX(0);
```

❌ **À ÉVITER**
- Rotations excessives
- Bounce trop prononcé
- Animations qui boucent infiniment
- Glow pulsant fort (startup AI vibes)
- Parallax exagéré

### Smooth Scroll (Lenis)

```typescript
// À implémenter avec Lenis ou similaire
import Lenis from '@studio-freight/lenis'

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
})
```

---

## 🧩 Composants UI

### Cards Produit

```typescript
// Structure standard
<ProductCard>
  <ImageContainer ratio="4:5" /> {/* Photo éditoriale */}
  <Badge /> {/* Nouveau, Promo, etc. */}
  <ProductInfo>
    <VoletLabel /> {/* Sweet-Hair, Fragrance, Crochet */}
    <Title serif large /> {/* Nom produit */}
    <Description sans small muted />
    <Price mono bold accent />
  </ProductInfo>
  <AddToCartButton smooth-hover />
</ProductCard>
```

#### Styles
- Background : `white`
- Border : None ou `1px solid warm-gray-200`
- Border-radius : `8px` (doux, pas trop rond)
- Padding : `16px` (mobile) / `24px` (desktop)
- Hover : Élévation douce (`shadow-lg`)

### Boutons

#### Primaire (Call-to-Action)
```css
background: deep-black;
color: cream-white;
padding: 14px 32px;
border-radius: 4px;
font-weight: 500;
transition: all 300ms ease-out-smooth;

/* Hover */
background: champagne-gold;
color: deep-black;
transform: translateY(-2px);
box-shadow: 0 8px 24px rgba(198, 168, 124, 0.3);
```

#### Secondaire (Outline)
```css
background: transparent;
border: 1px solid deep-black;
color: deep-black;
padding: 14px 32px;

/* Hover */
background: deep-black;
color: cream-white;
```

#### Tertiaire (Ghost)
```css
background: transparent;
color: deep-black;
border: none;
text-decoration: underline;
text-underline-offset: 4px;

/* Hover */
color: champagne-gold;
```

### Badges

```css
/* Nouveau */
background: sh-light;
color: sh-olive;

/* Promo */
background: fr-light;
color: fr-plum;

/* Coup de cœur */
background: champagne-gold;
color: deep-black;

/* Commun */
padding: 6px 12px;
border-radius: 4px;
font-size: 12px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.05em;
```

---

## 📱 Responsive Design

### Breakpoints

```typescript
const breakpoints = {
  sm: '640px',   // Mobile large
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Extra large
}
```

### Grilles Adaptatives

```
Mobile (< 640px):     1 colonne
Tablet (640-1024px):  2 colonnes
Desktop (> 1024px):   3-4 colonnes
```

### Typography Scale

```
Mobile: Base 14px → Titres 32-48px
Desktop: Base 16px → Titres 48-96px
```

### Navigation

**Mobile**
- Hamburger menu → Drawer full-screen
- Recherche → Modal overlay
- Panier → Drawer full-screen

**Desktop**
- Navigation horizontale visible
- Recherche inline dans header
- Panier → Drawer side (400px width)

---

## 🚫 Ce qu'il faut ÉVITER

### Styles Interdits

❌ **Glassmorphism** (backdrop-blur excessif)
❌ **Neo-Brutalism** (borders épaisses, couleurs criardes)
❌ **Memphis Design** (formes géométriques colorées chaotiques)
❌ **Cyberpunk/Y2K** (neon, grids futuristes)
❌ **Neumorphism** (ombres intérieures)
❌ **Aurora gradients** (multicolor glow)

### Pratiques à Éviter

❌ All-caps agressif partout
❌ Animations qui boucent infiniment
❌ Pop-ups intrusifs
❌ Auto-play vidéos avec son
❌ Parallax exagéré (mal de mer)
❌ Cursors custom complexes
❌ Scrolljacking (bloquer le scroll naturel)

---

## ✅ Checklist Design

Avant de valider un composant/page :

- [ ] Typographie : 2-3 fonts max, hiérarchie claire
- [ ] Espacement : Multiple de 8px
- [ ] Couleurs : Palette définie respectée
- [ ] Hover states : Définis et doux
- [ ] Focus states : Accessibles (outline visible)
- [ ] Images : Optimisées, alt text présent
- [ ] Responsive : Testé sur 3 tailles minimum
- [ ] Performance : Pas d'animations lourdes
- [ ] Accessibilité : Contraste WCAG AA minimum

---

## 🎯 Résumé en Une Phrase

**Lady Queenn doit donner l'impression d'entrer dans une maison de raffinement contemporaine africaine : élégante, chaleureuse, authentique, avec une mise en page digne d'un magazine de luxe et une expérience fluide et unifiée.**

---

*Design system créé pour Lady Queenn - La maison du raffinement ivoirien 👑*
