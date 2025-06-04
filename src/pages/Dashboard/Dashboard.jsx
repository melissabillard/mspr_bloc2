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

/**
 * Composant Dashboard - Page tableau de bord MSPR
 * Affiche le QR code pour recevoir le mot de passe et permet de se connecter
 *
 * @returns {JSX.Element} La page dashboard avec QR code.
 */

function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Récupérer le username du localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      // Si pas de username, rediriger vers l'inscription
      navigate("/signin");
    }
  }, [navigate]);

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cofrap-light to-cofrap-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-xl border-0">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-cofrap-text">
            Bienvenue {username} !
          </CardTitle>
          <CardDescription className="text-gray-600">
            Scannez le QR code pour recevoir votre mot de passe
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
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
              Vous recevrez votre mot de passe par notification
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
