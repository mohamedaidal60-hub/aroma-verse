# Guide de Navigation - Perfume Nexus

La plateforme **AromaVerse** a été entièrement migrée vers l'architecture **Perfume Nexus**. Ce document résume les nouvelles fonctionnalités, la structure de données et les outils d'administration.

## 🚀 Architecture "Perfume Nexus"
Le système repose désormais sur une base de données **Neon PostgreSQL** avec un schéma étendu de 14 modules, utilisant des types `JSONB` pour une flexibilité maximale (inventaires, propriétés techniques, variantes).

### Modules Clés
1.  **Utilisateurs & Auth** : Gestion des abonnements avec un essai gratuit de 4 mois automatique à l'inscription.
2.  **Marketplace** : Catalogue avancé avec filtrage par catégorie (Matières premières, Packaging, etc.) et sélecteur de variantes de poids (1g, 5g, 10g).
3.  **Investissement** : Dashboard pro pour investir dans des projets réels (Oud, Rose de Damas) avec suivi du ROI et portfolio personnel.
4.  **Academy** : Parcours d'apprentissage structuré avec 3 niveaux (Initié, Expert, Maître) et accès au laboratoire virtuel.
5.  **Studio (Lab)** : Outil de création de formules avec calculatrice de coût IA et vérification de conformité IFRA/RIFM.
6.  **Communauté** : Hub social bilingue avec canaux continentaux (Europe, Afrique, etc.) et système de vote pour les meilleurs créateurs.
7.  **Store B2B** : Moteur de recherche agrégé pour interroger les plus gros fournisseurs mondiaux (Alibaba, ThomasNet, Kompass).

---

## 🎨 Interface Premium & Bilingue
L'interface a été refaite pour offrir un aspect "Luxueux & Technologique" :
-   **Design System** : Utilisation de Glassmorphism (effets de flou et transparence), de gradients or (Gold Palette) et de typographies premium (Playfair Display pour les titres, Inter pour le corps).
-   **Bilinguisme (Fr/Ar)** : Support complet de l'arabe avec la police "Noto Sans Arabic" intégrée. Les descriptions et titres importants utilisent un format bilingue pour une meilleure accessibilité internationale.
-   **Visuels Robustes** : Utilisation de filtres CSS sur des sources d'images vérifiées pour garantir un affichage sans erreurs (plus de "placeholder" vides).

---

## 🛠️ Panel d'Administration
Accès via la barre de navigation (pour les comptes administrateurs) :
-   **Gestion SQL Directe** : Interface CRUD pour les tables `users`, `products`, `courses`, `investment_projects`.
-   **Édition JSON** : Les structures complexes (comme les inventaires ou les propriétés techniques) peuvent être modifiées directement.
-   **Correctif Appliqué** : La fonction `startEdit` a été restaurée, permettant de modifier les éléments existants sans erreurs de compilation.

---

## 📦 Prochaines Étapes Suggérées
1.  **Données Réelles** : Remplacer les données de test par vos catalogues produits réels via le panel Admin.
2.  **Passerelle de Paiement** : Intégrer un fournisseur (Stripe ou autre) pour finaliser les transactions de la Marketplace et des Investissements.
3.  **Certifications** : Personnaliser les PDF de certificats générés par l'Academy.

**L'application est déployée et prête à l'emploi en production.**
URL : [Lien Vercel](https://aroma-verse-5ar2fvprd-mohamedaidal60-5742s-projects.vercel.app)
