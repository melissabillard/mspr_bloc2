# 🧪 Tests COFRAP - Guide Technique

## 📊 Vue d'Ensemble

- **71 tests** ✅ (100% réussite)
- **9 fichiers** de test
- **React Router v7.6.1** compatible
- **Couverture 100%** sur `src/components/ui`

## 🚀 Commandes

```bash
# Tests de base
npm test                           # Mode watch
npm test -- --watchAll=false      # Une fois

# Tests avec couverture
npm run test:coverage              # Couverture complète
npm run test:unit                  # Tests principaux

# Test spécifique
npm test -- --testPathPattern="UIComponents"
```

## 📁 Structure

```
src/__tests__/
├── App.test.js                 # 3 tests - App + React Router
├── HomePage.test.js            # 3 tests - Page accueil
├── UIComponents.test.js        # 23 tests - Composants UI
├── LoginPage.test.js           # 9 tests - Formulaire login
├── BasicComponents.test.js     # 5 tests - Composants de base
├── Utils.test.js               # 8 tests - Utilitaires
├── NavigationFlow.test.js      # 8 tests - Flux navigation
├── Dashboard.test.js           # 7 tests - Dashboard QR
└── Login.test.js               # 5 tests - Composant Login
```

## 🔧 Configuration React Router v7

### Problème Résolu

```
Cannot find module 'react-router/dom' from 'node_modules/react-router-dom/dist/index.js'
```

### Solution

**Mock complet dans chaque fichier de test :**

```javascript
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => (
    <div data-testid="browser-router">{children}</div>
  ),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: "/", search: "", hash: "", state: null }),
  // ... autres mocks
}));
```

**Wrapper universel :**

```javascript
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};
```

**Polyfills setupTests.js :**

```javascript
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
```

## 📊 Couverture Détaillée

| Fichier               | Couverture | Tests |
| --------------------- | ---------- | ----- |
| **src/components/ui** | **100%**   | ✅    |
| ├── avatar.jsx        | 100%       | 4     |
| ├── badge.jsx         | 100%       | 4     |
| ├── button.jsx        | 100%       | 7     |
| ├── card.jsx          | 100%       | 3     |
| ├── input.jsx         | 100%       | 4     |
| └── label.jsx         | 100%       | 1     |
| **src/pages/Login**   | **100%**   | 9     |
| **src/lib/utils.js**  | **100%**   | 8     |
| **src/App.jsx**       | **100%**   | 3     |
| **Global**            | **37.3%**  | 71    |

## 🎯 Tests par Composant

### UIComponents.test.js (23 tests)

**Button (7 tests)**

- Rendu par défaut ✅
- Événements click ✅
- Variantes (destructive, outline, etc.) ✅
- Tailles (sm, lg, icon) ✅
- État disabled ✅
- Mode asChild ✅

**Input (4 tests)**

- Rendu et valeurs ✅
- Types (text, password, email) ✅
- État disabled ✅

**Avatar (4 tests)**

- AvatarFallback ✅
- AvatarImage ✅
- Classes personnalisées ✅

**Badge (4 tests)**

- Variantes ✅
- Événements click ✅

**Card (3 tests)**

- Sous-composants complets ✅

**Label (1 test)**

- Association htmlFor ✅

### LoginPage.test.js (9 tests)

- Rendu formulaire ✅
- Toggle mot de passe ✅
- Champ 2FA ✅
- Validation ✅
- Connexion réussie ✅
- Connexion échouée ✅
- Navigation ✅

## 🛠️ Mocks Principaux

```javascript
// localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

// fetch API
global.fetch = jest.fn();

// window.alert
jest.spyOn(window, "alert").mockImplementation(() => {});
```

## 📈 Rapport HTML

```bash
npm run test:coverage
# Ouvrir: coverage/lcov-report/index.html
```

## 🔍 Debug

```bash
# Test spécifique avec détails
npm test -- --testNamePattern="Button renders"

# Mode verbose
npm test -- --verbose

# Aide Jest
npm test -- --help
```
