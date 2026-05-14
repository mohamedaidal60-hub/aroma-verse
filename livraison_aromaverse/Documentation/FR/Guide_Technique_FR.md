# Guide Technique et Déploiement - AromaVerse
**Projet :** Architecture Perfume Nexus
**Hébergement :** Infrastructure Cloud Privé - Sidi Abdallah (Algérie)

## 1. Architecture Système
La plateforme repose sur une stack moderne et sécurisée :
- **Frontend :** React 18 / Vite / Tailwind CSS (Optimisé pour le bilinguisme FR/AR).
- **Backend :** API Serverless optimisée pour les Data Centers de Sidi Abdallah.
- **Base de Données :** PostgreSQL (Version 16+) avec extensions JSONB pour la flexibilité des formules de parfum.

## 2. Configuration du Domaine & DNS
Pour pointer votre nom de domaine vers les serveurs locaux, configurez les enregistrements suivants chez votre fournisseur (Hostinger/Namecheap) :

| Type | Hôte | Valeur | Note |
| :--- | :--- | :--- | :--- |
| **A** | @ | `105.XXX.XX.XX` | IP du Data Center Sidi Abdallah |
| **CNAME** | www | `aroma-verse.dz` | Redirection vers le domaine principal |
| **TXT** | @ | `v=spf1 include:_spf.google.com ~all` | Configuration Email |

## 3. Sécurité & SSL
- La plateforme force la connexion via **HTTPS (TLS 1.3)**.
- Le certificat SSL est géré par le serveur via **Let's Encrypt** (Auto-renouvelable tous les 90 jours).

## 4. Maintenance & Sauvegardes
- **Localisation des sauvegardes :** Serveur de stockage redondant à Sidi Abdallah.
- **Fréquence :** Quotidienne (02:00 AM).
- **Rétention :** 30 jours glissants.

---
*Fait à Alger, le 01 Mai 2026.*
