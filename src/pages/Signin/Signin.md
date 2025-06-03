Page d’inscription de l’application **COFRAP**.

Permet à un nouvel utilisateur de créer un compte en renseignant son **email** et un **mot de passe**.  
Les informations sont envoyées à l’API d’inscription.  
En cas de succès :
- le token JWT est stocké dans `localStorage`
- l’utilisateur est redirigé vers la page d’accueil

## Exemple

```jsx
<Signin />
