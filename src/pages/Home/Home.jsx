/**
 * Composant Home
 *
 * Page d'accueil de l'application COFRAP.
 * Affiche le logo de l'entreprise, un titre de bienvenue et une description.
 *
 * Exemple :
 * ```jsx
 * <Home />
 * ```
 */

import logo from '../../assets/COFRAP_LOGO.png';

function Home() {
  return (
    <div>
        <img src={logo} alt="Logo" className="logo-img-home" />
        <h1 className="titre1-home">Bienvenue à COFRAP !</h1>
        <p>Compagnie Française de Réalisation d'Applicatifs Professionnels.</p>
    </div>
  );
}
export default Home;