# 🚀 Guide de déploiement StackBlitz - AutoInspect Pro

## Configuration StackBlitz

### 1. Déploiement automatique

#### Option 1 : Via GitHub (Recommandé)
1. Allez sur [StackBlitz](https://stackblitz.com)
2. Cliquez sur **"Import from GitHub"**
3. Collez l'URL de votre dépôt : `https://github.com/VOTRE_NOM/autoinspect-pro`
4. StackBlitz importera et démarrera automatiquement votre projet

#### Option 2 : Création manuelle
1. Allez sur [StackBlitz](https://stackblitz.com)
2. Cliquez sur **"Create a new project"**
3. Sélectionnez **"React TypeScript"**
4. Copiez-collez vos fichiers dans l'éditeur

### 2. Configuration des variables d'environnement

Dans StackBlitz, ajoutez vos variables d'environnement :
1. Cliquez sur l'icône **"Settings"** (⚙️)
2. Allez dans **"Environment Variables"**
3. Ajoutez :
   ```
   VITE_SUPABASE_URL=https://votre-projet.supabase.co
   VITE_SUPABASE_ANON_KEY=votre_cle_anonyme_supabase
   ```

### 3. URL de votre application

Votre application sera disponible sur :
```
https://stackblitz.com/~/github/VOTRE_NOM/autoinspect-pro
```

Ou directement via l'URL de prévisualisation StackBlitz.

## 🔧 Fonctionnalités StackBlitz

### ✅ Avantages
- **Démarrage instantané** - Pas d'installation locale
- **Collaboration en temps réel** - Partage facile
- **Hot reload** - Rechargement automatique
- **Terminal intégré** - Accès complet aux commandes npm
- **Débogage intégré** - Outils de développement
- **Déploiement automatique** - URL publique instantanée

### 🚀 Commandes disponibles
```bash
npm run dev              # Démarrer le serveur de développement
npm run build            # Build pour production
npm run preview          # Prévisualiser le build
npm run stackblitz:dev   # Version optimisée pour StackBlitz
```

## 📱 Fonctionnalités supportées

### ✅ Entièrement supporté
- Interface utilisateur complète
- Gestion des véhicules (stockage local)
- Téléchargement et prévisualisation d'images
- Génération de rapports PDF
- Mode démo complet
- Responsive design

### ⚠️ Limitations StackBlitz
- **Caméra** : Accès limité à la caméra du navigateur
- **Stockage** : Données perdues au rechargement (sauf si Supabase configuré)
- **Service Worker** : Support PWA limité
- **Fichiers volumineux** : Limite de taille pour les images

## 🔗 Liens utiles

### Partage de votre projet
- **URL publique** : `https://stackblitz.com/~/github/VOTRE_NOM/autoinspect-pro`
- **Embed** : Intégrable dans d'autres sites
- **Fork** : Autres utilisateurs peuvent créer leur propre copie

### Collaboration
- **Partage en temps réel** : Invitez d'autres développeurs
- **Commentaires** : Système de commentaires intégré
- **Historique** : Suivi des modifications

## 🛠️ Optimisations StackBlitz

### Configuration Vite optimisée
- Host configuré pour StackBlitz
- Port flexible
- Optimisations de build spécifiques

### Dépendances optimisées
- Exclusion de certains modules problématiques
- Configuration spéciale pour Supabase
- Support TypeScript complet

## 📞 Support

- [Documentation StackBlitz](https://developer.stackblitz.com)
- [Communauté StackBlitz](https://discord.gg/stackblitz)
- [Support technique](https://stackblitz.com/support)

---

**🎉 Votre application AutoInspect Pro sera accessible instantanément sur StackBlitz !**

## 🚀 Démarrage rapide

1. **Ouvrir dans StackBlitz** : https://stackblitz.com/~/github/VOTRE_NOM/autoinspect-pro
2. **Attendre le chargement** (30-60 secondes)
3. **Tester l'application** avec le compte démo
4. **Partager l'URL** avec votre équipe

L'application fonctionnera immédiatement avec toutes les fonctionnalités de base !