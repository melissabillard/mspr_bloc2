/**
 * Composant de pied de page
 *
 * Affiche des informations légales ou de contact en bas de page.
 *
 * Exemple :
 * ```jsx
 * <Footer />
 * ```
 */

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} COFRAP. Tous droits réservés.</p>
        <ul className="social-media">
          <li><a href="/">Mélissa BILLARD</a></li>
          <li><a href="/">Rita CARRILHO LAMEIRA</a></li>
          <li><a href="/">Lola BRACCIALE-COMBAS</a></li>
          <li><a href="/">Nassim KRIDEL</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;