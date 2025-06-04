import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import qrCodeImage from "../../assets/QRCode.png";
import logo from "../../assets/COFRAP_LOGO.png";

/**
 * Composant Dashboard - Page tableau de bord MSPR
 * Affiche le QR code pour recevoir le mot de passe et permet de se connecter
 *
 * @returns {JSX.Element} La page dashboard avec QR code.
 */

function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);

  useEffect(() => {
    // Récupérer le username du localStorage
    const storedUsername = localStorage.getItem("username");
    const passwordRecovery = localStorage.getItem("password_recovery");

    if (storedUsername) {
      setUsername(storedUsername);
      setIsPasswordRecovery(passwordRecovery === "true");
    } else {
      // Si pas de username, rediriger vers l'inscription
      navigate("/signin");
    }
  }, [navigate]);

  const handleGoToLogin = () => {
    // Nettoyer le flag de récupération de mot de passe
    localStorage.removeItem("password_recovery");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cofrap-light to-cofrap-secondary flex items-center justify-center p-4 pt-16">
      {/* Bouton retour à l'accueil */}
      <Link
        to="/"
        className="fixed top-4 left-4 flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-white z-50"
      >
        <img
          src={logo}
          alt="COFRAP Logo"
          className="h-8 w-auto object-contain"
        />
        <span className="text-cofrap-text font-semibold">COFRAP</span>
      </Link>

      <Card className="w-full max-w-lg shadow-xl border-0">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-cofrap-text">
            {isPasswordRecovery
              ? `Récupération pour ${username}`
              : `Bienvenue ${username} !`}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {isPasswordRecovery
              ? "Scannez le QR code pour recevoir votre nouveau mot de passe"
              : "Scannez le QR code pour recevoir votre mot de passe"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {/* Message spécifique selon le contexte */}
          {isPasswordRecovery && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-orange-400 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-orange-700 font-medium">
                  Récupération de mot de passe en cours
                </p>
              </div>
            </div>
          )}

          {/* QR Code */}
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={qrCodeImage}
                alt="QR Code pour recevoir le mot de passe"
                className="w-48 h-48 object-contain"
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <p className="text-gray-700 font-medium">
              📱 Scannez ce QR code avec votre téléphone
            </p>
            <p className="text-sm text-gray-600">
              {isPasswordRecovery
                ? "Vous recevrez votre nouveau mot de passe par notification"
                : "Vous recevrez votre mot de passe par notification"}
            </p>
          </div>

          {/* Bouton de connexion */}
          <div className="pt-4">
            <Button
              onClick={handleGoToLogin}
              className="w-full h-12 bg-gradient-to-r from-cofrap-primary to-cofrap-accent hover:from-purple-800 hover:to-purple-400 text-white font-medium transform hover:scale-105 transition-all duration-300"
            >
              Se connecter
            </Button>
          </div>

          {/* Informations supplémentaires */}
          <div className="text-xs text-gray-500 pt-4">
            <p>Une fois votre mot de passe reçu, cliquez sur "Se connecter"</p>
            <p>
              et utilisez votre nom d'utilisateur : <strong>{username}</strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
