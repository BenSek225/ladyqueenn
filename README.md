# Lady Queenn 👑

**La maison du raffinement ivoirien**

Lady Queenn est une plateforme e-commerce multi-volets dédiée à la beauté, l'élégance et l'authenticité. Nous regroupons sous une même enseigne trois univers complémentaires pour offrir une expérience d'achat complète et raffinée.

---

## 🌟 Nos Volets

### 💇‍♀️ SWEET-HAIR - Soins Capillaires Naturels
Gamme capillaire premium à base d'ingrédients naturels pour la santé et la beauté de vos cheveux.

**Notre Promesse :**
- Favorise la pousse des cheveux
- Apporte volume et brillance
- Répare le cuir chevelu en profondeur
- Traite tous types de problèmes capillaires

**Produits :**
- 🧴 **Huile Capillaire** - 60ml à 2 000 FCFA *(100ml à venir)*
- 🧼 **Shampooing Réparateur** - 250ml à 2 000 FCFA
- 💆 **Pommade Nourrissante** - 2 000 FCFA
- 🎁 **Kit Complet** - Les 3 produits à 5 000 FCFA

---

### 🌸 FRAGRANCE - Parfumerie de Luxe
Sélection exclusive de parfums importés pour homme, femme et mixte.

**Notre Sélection :**
- Parfums de marques internationales premium
- Collections selon disponibilité (Andolacy, marques de luxe)
- Fragrances pour tous les styles et occasions
- Authenticité et qualité garanties

---

### 🧶 Crochet by THED - Créations Artisanales
Marque de vêtements confectionnés au crochet, alliant tradition et modernité.

**Nos Services :**
- 👔 **Prêt-à-Porter** - Collections homme, femme et enfant
- ✨ **Sur-Mesure** - Confections personnalisées (couleur, taille, motifs)
- 🎨 **Galerie** - Portfolio de nos créations uniques
- 🤝 **Consultation** - Accompagnement personnalisé pour vos projets

---

## 🛍️ Fonctionnalités de la Plateforme

### Pour les Clients
- ✅ Navigation fluide entre les trois volets
- 🔍 Recherche globale de produits
- 🛒 Panier unifié multi-volets
- 💬 Commande directe via WhatsApp
- 📱 Design responsive (mobile, tablette, desktop)
- 🏷️ Système de badges (nouveau, promo, épuisé)

### Technique
- ⚡ Performance optimisée avec Next.js 16
- 🎨 Interface moderne avec Tailwind CSS 4
- 💾 Persistance du panier (sessionStorage)
- 🔐 TypeScript pour la fiabilité du code
- 📦 Gestion de stock en temps réel

---

## 🚀 Technologies

- **Framework** : Next.js 16.3.3 (App Router)
- **Language** : TypeScript 5.7
- **Styling** : Tailwind CSS 4.3.3
- **State Management** : Zustand 5.0
- **UI Components** : Shadcn/ui + Lucide Icons
- **Deployment** : Vercel (recommandé)

---

## 📦 Installation & Développement

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
```bash
# Cloner le dépôt
git clone https://github.com/BenSek225/ladyqueenn.git
cd ladyqueenn

# Installer les dépendances
npm install
```

### Lancement
```bash
# Mode développement
npm run dev

# Build de production
npm run build
npm start
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

---

## 📂 Architecture du Projet

```
lady-queenn/
├── app/                           # Pages Next.js (App Router)
│   ├── page.tsx                   # Accueil - Présentation des 3 volets
│   ├── layout.tsx                 # Layout global
│   ├── sweet-hair/                # Section SWEET-HAIR
│   │   ├── page.tsx               # Boutique capillaire
│   │   └── [slug]/                # Détails produit
│   ├── fragrance/                 # Section Parfumerie
│   │   ├── page.tsx               # Catalogue parfums
│   │   └── [slug]/                # Détails produit
│   ├── crochet-by-thed/          # Section Crochet
│   │   ├── page.tsx               # Boutique + Galerie
│   │   ├── [slug]/                # Détails produit prêt-à-porter
│   │   └── sur-mesure/            # Formulaire personnalisation
│   └── panier/                    # Page panier
│
├── components/                    # Composants React
│   ├── layout/
│   │   ├── site-header.tsx        # Navigation + Recherche globale
│   │   └── site-footer.tsx        # Pied de page
│   ├── volets/                    # Composants par volet
│   │   ├── sweet-hair/
│   │   ├── fragrance/
│   │   └── crochet/
│   ├── shared/                    # Composants partagés
│   │   ├── product-card.tsx
│   │   ├── product-grid.tsx
│   │   ├── add-to-cart.tsx
│   │   └── cart-drawer.tsx
│   └── ui/                        # Composants UI de base
│
├── lib/                           # Logique & Utilitaires
│   ├── data/
│   │   ├── sweet-hair.ts          # Données produits capillaires
│   │   ├── fragrance.ts           # Données parfums
│   │   └── crochet.ts             # Données vêtements crochet
│   ├── stores/
│   │   └── cart-store.ts          # Store Zustand panier unifié
│   ├── utils.ts                   # Fonctions utilitaires
│   └── types.ts                   # Types TypeScript globaux
│
├── public/                        # Assets statiques
│   ├── images/
│   │   ├── sweet-hair/
│   │   ├── fragrance/
│   │   └── crochet/
│   └── icons/
│
└── styles/                        # Styles globaux
    └── globals.css
```

---

## 🎨 Structure des Volets

Chaque volet de Lady Queenn est conçu comme un **univers autonome** mais **intégré** :

### Sweet-Hair
- Page boutique avec filtres (huile, shampooing, pommade, kit)
- Fiches produits détaillées avec bénéfices
- Mise en avant des ingrédients naturels
- Section "À propos de la gamme"

### Fragrance
- Catalogue organisé par type (Homme/Femme/Mixte)
- Filtres par marque et prix
- Fiches produits avec notes olfactives
- Badge "Disponible" dynamique selon stock

### Crochet by THED
- Galerie portfolio (réalisations passées)
- Boutique prêt-à-porter avec filtres (Homme/Femme/Enfant)
- Formulaire sur-mesure (couleur, taille, modèle)
- Délais de confection mentionnés

---

## 📞 Contact & Commandes

**WhatsApp :** +225 07 10 50 40 07

Les commandes sont traitées via WhatsApp avec un récapitulatif automatique du panier.

---

## 🗺️ Roadmap Future

### Phase 2
- [ ] Système de paiement en ligne (Orange Money, MTN, Wave)
- [ ] Gestion des commandes (dashboard admin)
- [ ] Variantes produits Sweet-Hair (100ml, 500ml)
- [ ] Programme de fidélité

### Phase 3
- [ ] Blog/Actualités Lady Queenn
- [ ] Témoignages clients
- [ ] Section promotions et codes promo
- [ ] Notifications stock disponible

### Phase 4
- [ ] Application mobile (React Native)
- [ ] Livraison tracking
- [ ] Multi-langues (Français/Anglais)

---

## 👥 L'Équipe Lady Queenn

Lady Queenn est une entreprise ivoirienne qui célèbre l'excellence locale :
- **Sweet-Hair** : Soins capillaires naturels made in Côte d'Ivoire
- **Fragrance** : Curation de parfums internationaux premium
- **Crochet by THED** : Créations artisanales uniques

---

## 📄 Licence

© 2025 Lady Queenn - Tous droits réservés

---

## 🤝 Contribution

Ce projet est en développement actif. Pour toute suggestion ou collaboration :
- 📧 Email : contact@ladyqueenn.ci *(à configurer)*
- 💬 WhatsApp : +225 07 10 50 40 07
- 🌐 GitHub : [BenSek225/ladyqueenn](https://github.com/BenSek225/ladyqueenn)

---

**Made with ❤️ in Abidjan, Côte d'Ivoire**
