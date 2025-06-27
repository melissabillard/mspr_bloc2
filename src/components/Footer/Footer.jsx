import React from "react";
import logo from "../../assets/COFRAP_LOGO.png";
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
    <footer className="w-full bg-white text-cofrap-text py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <img
              src={logo}
              alt="COFRAP Logo"
              className="w-12 h-12 object-contain"
            />
            <span className="text-3xl font-bold text-cofrap-primary">
              COFRAP
            </span>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Plateforme moderne de gestion d'utilisateurs et de services
          </p>
          <div className="w-24 h-1 bg-cofrap-accent mx-auto mb-8 rounded-full"></div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-500">
            &copy; 2025 COFRAP. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
