# AutoInspect Pro - Détection IA d'Anomalies Carrosserie

🚗 **Application SaaS professionnelle de détection automatique d'anomalies carrosserie via intelligence artificielle**

[![Deploy Status](https://img.shields.io/badge/deploy-success-brightgreen)](https://VOTRE_NOM.github.io/autoinspect-pro)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-blue)](https://tailwindcss.com/)

## 🌟 Fonctionnalités

- 🤖 **Détection IA Avancée** : Détection automatique de rayures, enfoncements et anomalies
- 📱 **Multi-Plateforme** : Compatible desktop, tablette et mobile
- 🔐 **Multi-Tenant Sécurisé** : Chaque client a son compte et ses données sécurisées
- 📊 **Rapports Professionnels** : Génération de rapports PDF avec images annotées
- 🚗 **Gestion de Flotte** : Jusqu'à 150 véhicules par compte
- 📸 **Formats Multiples** : Support JPEG, PNG, HEIC/HEIF, TIFF, BMP, GIF
- 🌐 **PWA Ready** : Installation comme application native
- 🔄 **Mode Hors Ligne** : Fonctionnement sans connexion internet

## 🚀 Démo en Direct

**🌐 [Voir l'Application](https://VOTRE_NOM.github.io/autoinspect-pro)**

**⚡ [Tester sur StackBlitz](https://stackblitz.com/~/github/VOTRE_NOM/autoinspect-pro)**

[![Deploy Status](https://github.com/VOTRE_NOM/autoinspect-pro/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/VOTRE_NOM/autoinspect-pro/actions)

### Comptes de Démonstration

**Compte Gratuit Illimité :**
- Email : `c07g09a16@gmail.com`
- Mot de passe : `mCCA1979@#`
- Fonctionnalités : Véhicules illimités, toutes les fonctionnalités premium

## 🛠️ Stack Technique

- **Frontend** : React 18, TypeScript, Tailwind CSS
- **Backend** : Supabase (PostgreSQL, Authentification, Stockage)
- **IA** : Algorithmes d'analyse d'images personnalisés
- **Build** : Vite
- **Déploiement** : Bolt Hosting
- **PWA** : Service Worker, Support hors ligne

## 📦 Installation

### Prérequis
- Node.js 18+
- npm ou yarn
- Compte Supabase (optionnel pour toutes les fonctionnalités)

### Configuration

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/VOTRE_NOM_UTILISATEUR/autoinspect-pro.git
   cd autoinspect-pro
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration environnement** (optionnel)
   ```bash
   cp .env.example .env
   # Éditez .env avec vos identifiants Supabase
   ```

4. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```

5. **Ouvrir dans le navigateur**
   ```
   http://localhost:5173
   ```

## 🗄️ Configuration Base de Données (Optionnel)

Pour toutes les fonctionnalités avec comptes utilisateurs :

1. Créer un projet [Supabase](https://supabase.com)
2. Copier l'URL du projet et la clé anon dans `.env`
3. Exécuter les migrations dans `supabase/migrations/`

## 🎯 Utilisation

### Démarrage Rapide
1. **Sélectionner Véhicule** : Choisir dans votre flotte ou ajouter un nouveau véhicule
2. **Télécharger Photos** : Prendre ou télécharger des photos de chaque côté
3. **Analyse IA** : Laisser l'IA détecter automatiquement les anomalies
4. **Générer Rapport** : Télécharger des rapports PDF professionnels

### Fonctionnalités Clés
- **Gestion Véhicules** : Ajouter, modifier et organiser votre flotte
- **Inspection IA** : Télécharger des photos et obtenir une détection instantanée
- **Rapports Professionnels** : Générer des rapports PDF détaillés avec annotations
- **Images de Référence** : Sauvegarder les photos d'inspection comme références

## 📱 Fonctionnalités PWA

- **Mode Hors Ligne** : Continuer à travailler sans internet
- **Installation App** : Ajouter à l'écran d'accueil mobile/desktop
- **Notifications Push** : Être notifié des résultats d'inspection
- **Synchronisation** : Synchronisation automatique des données

## 🔧 Développement

### Scripts Disponibles

```bash
npm run dev          # Démarrer serveur développement
npm run build        # Build pour production
npm run preview      # Prévisualiser build production
npm run lint         # Exécuter ESLint
```

### Structure du Projet

```
src/
├── components/      # Composants UI réutilisables
├── contexts/        # Contextes React (Auth, Vehicle, Notifications)
├── hooks/          # Hooks React personnalisés
├── lib/            # Configurations librairies externes
├── pages/          # Composants de pages
├── utils/          # Fonctions utilitaires
└── types/          # Définitions TypeScript
```

## 🚀 Déploiement

L'application est configurée pour un déploiement facile :

### StackBlitz (Démo instantanée)

**🎯 Parfait pour tester rapidement**

1. **Ouvrir directement** : https://stackblitz.com/~/github/VOTRE_NOM/autoinspect-pro
2. **Ou importer manuellement** :
   - Allez sur [StackBlitz](https://stackblitz.com)
   - Cliquez sur "Import from GitHub"
   - Collez l'URL de votre dépôt
3. **L'application démarre automatiquement** en 30-60 secondes
4. **Partagez l'URL** pour des démos instantanées

**Avantages StackBlitz :**
- ✅ Démarrage instantané (pas d'installation)
- ✅ Partage facile avec URL publique
- ✅ Collaboration en temps réel
- ✅ Toutes les fonctionnalités de base
- ✅ Parfait pour les démos et tests

### Netlify (Recommandé)

#### Déploiement automatique
1. **Connectez votre dépôt GitHub à Netlify**
2. **Configurez les variables d'environnement** dans Netlify :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. **Le déploiement se fait automatiquement** à chaque push

#### Déploiement manuel
```bash
# Installation de Netlify CLI
npm install -g netlify-cli

# Connexion à Netlify
netlify login

# Lier le projet à un site Netlify
netlify link

# Déploiement de prévisualisation
npm run deploy

# Déploiement en production
npm run deploy:prod
```

### GitHub Pages
- Déploiement automatique via GitHub Actions
- En direct sur : https://VOTRE_NOM.github.io/autoinspect-pro

### Bolt Hosting
- Déploiement rapide et simple
- Idéal pour les tests et prototypes

### Déploiement Manuel
```bash
npm run build
# Déployer le dossier 'dist' sur votre hébergeur

## 🔒 Fonctionnalités de Sécurité

- **Row Level Security (RLS)** : Chaque utilisateur accède uniquement à ses données
- **Authentification Sécurisée** : Alimentée par Supabase Auth
- **Stockage d'Images** : Téléchargements sécurisés avec contrôles d'accès
- **Isolation des Données** : Séparation complète entre comptes clients
- **Conformité RGPD** : Confidentialité complète et contrôle utilisateur

## 🤝 Contribution

1. Fork le dépôt
2. Créer votre branche fonctionnalité (`git checkout -b feature/NouvelleFonctionnalite`)
3. Commit vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/NouvelleFonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est un logiciel propriétaire. Tous droits réservés.

## 📞 Support

- **Email** : support@autoinspect.pro
- **Documentation** : [Voir Docs](https://addcv-org-62c7.bolt.host/assistance)
- **Issues** : [GitHub Issues](https://github.com/VOTRE_NOM_UTILISATEUR/autoinspect-pro/issues)

## 🎉 Remerciements

- Construit avec ❤️ en utilisant React et TypeScript
- Détection IA alimentée par des algorithmes d'apprentissage automatique avancés
- Composants UI stylisés avec Tailwind CSS
- Icônes par Lucide React

---

**⭐ Mettez une étoile à ce dépôt si vous le trouvez utile !**