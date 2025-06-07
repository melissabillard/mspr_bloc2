# Tests Unitaires et d'Intégration - COFRAP

## 📋 Vue d'ensemble

Cette suite de tests couvre l'application COFRAP avec différents types de tests :

- **Tests unitaires** : Composants individuels
- **Tests d'intégration** : Flux de navigation complets
- **Tests utilitaires** : Fonctions helpers et localStorage

## 🧪 Types de Tests Créés

### 1. **Tests Unitaires - Login Component** (`src/pages/Login/__tests__/Login.test.js`)

**Objectif** : Tester le composant Login de manière isolée

**Tests inclus** :

- ✅ **Rendu du composant** : Vérification de tous les éléments UI
- ✅ **Toggle mot de passe** : Fonction show/hide password
- ✅ **Validation des champs vides** : Empêche soumission sans données
- ✅ **Soumission avec données valides** : Sauvegarde et navigation
- ✅ **Logo cliquable** : Navigation vers accueil
- ✅ **Capitalisation du username** : Première lettre en majuscule

**Couverture** :

- Interface utilisateur
- Logique de validation
- Navigation
- LocalStorage

### 2. **Tests d'Intégration - Navigation Flow** (`src/__tests__/NavigationFlow.test.js`)

**Objectif** : Tester les flux complets de navigation entre pages

**Tests inclus** :

- ✅ **Inscription complète** : Accueil → Inscription → Dashboard
- ✅ **Connexion réussie** : Accueil → Login → Page connectée
- ✅ **Connexion échouée** : Reste sur page login si champs vides
- ✅ **Récupération mot de passe** : Login → Forgot → Dashboard (recovery)
- ✅ **Déconnexion** : Page connectée → Accueil + nettoyage
- ✅ **Protection des routes** : Accès non autorisé

**Couverture** :

- Flux utilisateur complets
- Navigation entre composants
- États d'authentification
- Gestion des sessions

### 3. **Tests Unitaires - Dashboard Component** (`src/pages/Dashboard/__tests__/Dashboard.test.js`)

**Objectif** : Tester le composant Dashboard avec ses différents états

**Tests inclus** :

- ✅ **Redirection sans username** : Protection de la route
- ✅ **Affichage inscription** : Mode normal après inscription
- ✅ **Affichage récupération** : Mode récupération de mot de passe
- ✅ **QR Code présent** : Vérification de l'image
- ✅ **Bouton Se connecter** : Navigation et nettoyage des flags
- ✅ **Instructions personnalisées** : Affichage du username
- ✅ **Logo cliquable** : Retour à l'accueil
- ✅ **États contextuels** : Différenciation inscription/récupération

**Couverture** :

- Logique conditionnelle
- Gestion d'état
- Props et localStorage
- Navigation

### 4. **Tests Utilitaires** (`src/__tests__/Utils.test.js`)

**Objectif** : Tester les fonctions utilitaires et helpers

**Tests inclus** :

- ✅ **Capitalisation username** : Fonction de formatage
- ✅ **Opérations localStorage** : CRUD operations
- ✅ **États d'authentification** : Validation des conditions
- ✅ **États récupération** : Gestion des flags
- ✅ **Nettoyage données** : Fonction de logout
- ✅ **Validation formulaires** : Rules de validation
- ✅ **Gestion d'erreurs** : Cas limites et null values
- ✅ **Performance** : Tests de rapidité

**Couverture** :

- Fonctions utilitaires
- Gestion d'erreurs
- Performance
- Edge cases

## 🚀 Comment Lancer les Tests

### Lancer tous les tests

```bash
npm test
```

### Lancer un fichier de test spécifique

```bash
npm test Login.test.js
npm test NavigationFlow.test.js
npm test Dashboard.test.js
npm test Utils.test.js
```

### Lancer avec couverture de code

```bash
npm test -- --coverage
```

### Mode watch (relancement automatique)

```bash
npm test -- --watch
```

## 📊 Types de Tests Expliqués

### **Tests Unitaires**

- **Définition** : Testent une unité de code isolément (composant, fonction)
- **Avantages** : Rapides, précis, faciles à déboguer
- **Exemple** : Tester que le bouton Login appelle la bonne fonction

### **Tests d'Intégration**

- **Définition** : Testent l'interaction entre plusieurs composants
- **Avantages** : Détectent les problèmes de communication
- **Exemple** : Tester le flux complet inscription → dashboard → connexion

### **Tests Fonctionnels**

- **Définition** : Testent des fonctionnalités complètes du point de vue utilisateur
- **Avantages** : Simulent l'usage réel
- **Exemple** : "En tant qu'utilisateur, je peux me connecter avec succès"

## 🛠 Outils Utilisés

### **Jest**

- Framework de test JavaScript
- Intégré avec Create React App
- Assertions, mocks, coverage

### **React Testing Library**

- Bibliothèque pour tester les composants React
- Approche centrée utilisateur
- Queries basées sur l'accessibilité

### **Mocks**

- `useNavigate` : Simulation de la navigation
- Assets (images) : Éviter les erreurs d'import
- localStorage : Environnement de test isolé

## 🎯 Bonnes Pratiques Appliquées

### **AAA Pattern (Arrange, Act, Assert)**

```javascript
test("should handle login correctly", () => {
  // Arrange - Préparer les données et l'environnement
  render(<Login />);
  const input = screen.getByPlaceholderText("Username");

  // Act - Exécuter l'action à tester
  fireEvent.change(input, { target: { value: "john" } });
  fireEvent.click(screen.getByRole("button"));

  // Assert - Vérifier le résultat
  expect(localStorage.getItem("username")).toBe("John");
});
```

### **Isolation des Tests**

- `beforeEach()` : Nettoyage avant chaque test
- Mocks resetés : État propre pour chaque test
- localStorage.clear() : Pas d'interférence

### **Tests Descriptifs**

- Noms explicites : `should redirect to dashboard on successful login`
- Commentaires : Explication de la logique complexe
- Groupage logique : `describe()` blocks

### **Couverture Complète**

- **Happy path** : Cas nominal de fonctionnement
- **Error cases** : Gestion des erreurs
- **Edge cases** : Cas limites (valeurs nulles, etc.)
- **User interactions** : Clicks, saisies, navigation

## 📈 Métriques de Qualité

### **Couverture de Code**

- **Statements** : Lignes de code exécutées
- **Branches** : Conditions (if/else) testées
- **Functions** : Fonctions appelées
- **Lines** : Pourcentage de lignes couvertes

### **Objectifs de Couverture**

- ✅ **> 80%** pour les composants critiques
- ✅ **> 90%** pour les fonctions utilitaires
- ✅ **100%** pour la logique d'authentification

## 🔍 Analyse des Tests Créés

### **Test Critique : Connexion Échouée**

```javascript
test("should handle failed login with empty fields", async () => {
  // Simule le cas où l'utilisateur essaie de se connecter sans saisir de données
  // VÉRIFIE : L'application ne plante pas et reste sur la page de connexion
});
```

**Importance** : Évite les bugs de sécurité et améliore l'UX

### **Test Critique : Flux d'Intégration**

```javascript
test("should navigate from home to signup and create account", async () => {
  // Teste le parcours complet d'un nouvel utilisateur
  // VÉRIFIE : Toute la chaîne fonctionne de bout en bout
});
```

**Importance** : Détecte les régressions dans le flux principal

## 🚨 Tests de Sécurité Inclus

- **Validation des entrées** : Empêche injection de code
- **Protection des routes** : Accès non autorisé
- **Nettoyage des données** : Pas de fuite d'information
- **États d'authentification** : Vérification stricte

## 📝 Maintenance des Tests

### **Quand Mettre à Jour**

- Nouveaux composants → Nouveaux tests
- Modifications UI → Update des selectors
- Nouvelle logique → Tests de couverture
- Bugs trouvés → Tests de régression

### **Signes d'un Bon Test**

- ✅ Rapide à exécuter (< 100ms)
- ✅ Déterministe (même résultat à chaque fois)
- ✅ Indépendant (ne dépend pas d'autres tests)
- ✅ Lisible (autre développeur comprend facilement)

## 🎉 Conclusion

Cette suite de tests garantit :

- **Fiabilité** : L'application fonctionne comme prévu
- **Maintenance** : Détection rapide des régressions
- **Confiance** : Déploiements sans stress
- **Documentation** : Les tests documentent le comportement attendu

**Total : 25+ tests couvrant tous les aspects critiques de l'application COFRAP !** 🚀
