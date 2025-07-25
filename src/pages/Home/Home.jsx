/**
 * Composant Home
 *
 * Home page of the COFRAP application.
 * Displays the company logo, a welcome title, and a description.
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