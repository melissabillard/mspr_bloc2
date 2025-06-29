# COFRAP - Application React

Application React moderne pour COFRAP (Comité de Formation Professionnel) avec authentification et système de QR code.

## 🚀 Démarrage Rapide

### Installation

```bash
# Cloner le repository
git clone [url-du-repo]
cd mspr_bloc2

# Installer les dépendances
npm install

# Lancer l'application en développement
npm start
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

## 📋 Scripts Disponibles

### Développement

```bash
# Lancer le serveur de développement
npm start

# Construire pour la production
npm run build
```

### Tests Unitaires

```bash
# Lancer tous les tests
npm test

# Tests avec couverture de code
npm run test:coverage

# Tests spécifiques (App, HomePage, UIComponents, LoginPage)
npm run test:unit
```

### Linting

```bash
# Vérifier la qualité du code
npm run lint

# Corriger automatiquement les erreurs
npm run lint:fix

# Vérification stricte (0 warnings)
npm run lint:check
```

### Documentation

```bash
# Lancer Styleguidist (documentation des composants)
npx styleguidist server
# Accès sur http://localhost:6060
```

## 🔄 CI/CD Automatisé

### 🚀 Pipeline GitHub Actions

À chaque push sur `main`, le workflow automatique :

1. **🔍 Linting ESLint** - Vérification qualité du code
2. **🧪 Tests Unitaires** - 38 tests React (bloque si échec)
3. **🏗️ Build & Version** - Construction et versioning
4. **🚀 Deploy** - Déploiement automatique + notifications Discord

### ✅ Tests Intégrés

- **38 tests** exécutés automatiquement
- **Couverture 100%** sur les fichiers testés
- **Blocage** du déploiement si tests échouent
- **Notifications Discord** sur succès/échec

## 🧪 Tests Unitaires

### ✅ Résultats

- **71 tests** - 100% de réussite
- **9 fichiers** de test
- **Compatible React Router v7.6.1**

### 📊 Couverture de Code

| Dossier/Fichier       | Couverture | Statut |
| --------------------- | ---------- | ------ |
| **src/components/ui** | **100%**   | ✅     |
| **src/pages/Login**   | **100%**   | ✅     |
| **src/lib/utils.js**  | **100%**   | ✅     |
| **src/App.jsx**       | **100%**   | ✅     |
| **Global**            | **37.3%**  | 📈     |

### 🔧 Commandes

```bash
# Tests de base
npm test                    # Mode watch
npm run test:unit          # Tests principaux

# Avec couverture
npm run test:coverage      # Rapport complet
# Ouvrir: coverage/lcov-report/index.html
```

## 🏗️ Architecture

### Pages Principales

- **Homepage** (`/`) - Page d'accueil
- **Login** (`/login`) - Connexion
- **Signin** (`/signin`) - Inscription
- **Dashboard** (`/dashboard`) - QR code
- **ForgotPassword** (`/forgot-password`) - Récupération
- **AuthenticatedHome** (`/home-authenticated`) - Page utilisateur

### Flux d'Authentification

1. **Inscription** : Username → QR code → Login
2. **Connexion** : Username + Password → Page authentifiée
3. **Récupération** : Username → QR code → Login

## 🛠️ Technologies

- **React 19** - Framework principal
- **React Router v7** - Navigation
- **Tailwind CSS** - Styling
- **Jest & React Testing Library** - Tests
- **Lucide React** - Icônes

## 🎨 Composants UI

### Composants de Base

- `Button` - Boutons avec variantes
- `Input` - Champs de saisie
- `Card` - Cartes de contenu
- `Label` - Labels de formulaire
- `Avatar` - Avatars utilisateur
- `Badge` - Badges de statut

### Composants Métier

- `Header` - En-tête avec navigation
- `Footer` - Pied de page
- `Hero` - Section héros
- `Features` - Fonctionnalités
- `CTA` - Call-to-action

## 📱 Fonctionnalités

### Authentification

- ✅ Inscription avec username uniquement
- ✅ QR code pour réception mot de passe
- ✅ Système de récupération
- ✅ Capitalisation automatique

### UX/UI

- ✅ Design responsive
- ✅ Animations fluides
- ✅ Thème COFRAP

## 🔧 Configuration

### LocalStorage

- `username` - Nom d'utilisateur
- `authenticated` - État de connexion
- `password_recovery` - Mode récupération

## 📦 Déploiement

```bash
npm run build
# Déployer le dossier build/
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Push et ouvrir une PR

---

**Développé avec ❤️ pour COFRAP**
