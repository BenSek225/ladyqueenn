# Lady Queenn 👑

Une boutique en ligne élégante pour des produits naturels et artisanaux d'Abidjan, Côte d'Ivoire.

## 🌟 Fonctionnalités

- 🛍️ Catalogue de produits avec images et descriptions détaillées
- 🛒 Panier d'achat avec persistance
- 📱 Design responsive et moderne
- 💬 Intégration WhatsApp pour les commandes
- 🏷️ Système de badges (nouveau, promo, limité, coup de cœur)
- 📦 Gestion de stock en temps réel

## 🚀 Technologies

- **Next.js 16.3** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS 4** - Styling moderne
- **Zustand** - Gestion d'état
- **Shadcn/ui** - Composants UI
- **Lucide React** - Icônes

## 📦 Installation

```bash
npm install
```

## 🏃‍♂️ Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🏗️ Build

```bash
npm run build
npm start
```

## 📂 Structure du Projet

```
lady-queenn/
├── app/                    # Pages Next.js App Router
│   ├── page.tsx           # Page d'accueil
│   └── produit/[slug]/    # Pages produits dynamiques
├── components/            # Composants React
│   ├── cart-drawer.tsx   # Panier
│   ├── product-card.tsx  # Carte produit
│   └── site-header.tsx   # En-tête
├── lib/                  # Utilitaires et logique
│   ├── products.ts       # Données produits
│   └── store.ts          # Store Zustand
└── public/              # Assets statiques
```

## 🛍️ Catégories de Produits

- Fragrances
- Beauté
- Soins
- Bien-être
- Accessoires
- Édition
- Ambiance

## 📞 Contact

WhatsApp: +225 07 10 50 40 07

---

Made with ❤️ for Lady Queenn
