import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import logo from "../../assets/COFRAP_LOGO.png";

/**
 * Composant ForgotPassword - Page mot de passe oublié MSPR
 * Demande le username et redirige vers le dashboard pour un nouveau QR code
 *
 * @returns {JSX.Element} Le formulaire de récupération de mot de passe.
 */

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      // Sauvegarder le username avec majuscule et marquer comme récupération de mot de passe
      localStorage.setItem(
        "username",
        username.charAt(0).toUpperCase() + username.slice(1)
      );
      localStorage.setItem("password_recovery", "true");
      // Rediriger vers le dashboard pour un nouveau QR code
      navigate("/dashboard");
    }
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

      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-2xl font-bold text-cofrap-text">
            Mot de passe oublié
          </CardTitle>
          <CardDescription className="text-gray-600">
            Saisissez votre nom d'utilisateur pour recevoir un nouveau mot de
            passe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Nom d'utilisateur
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Votre nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Vous recevrez un nouveau QR code à scanner pour obtenir
                    votre nouveau mot de passe.
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-cofrap-primary to-cofrap-accent hover:from-purple-800 hover:to-purple-400 text-white font-medium transform hover:scale-105 transition-all duration-300"
            >
              Récupérer mon mot de passe
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Vous vous souvenez de votre mot de passe ?{" "}
              <Link
                to="/login"
                className="text-cofrap-primary hover:text-cofrap-accent font-medium transition-colors"
              >
                Se connecter
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              Pas encore de compte ?{" "}
              <Link
                to="/signin"
                className="text-cofrap-primary hover:text-cofrap-accent font-medium transition-colors"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgotPassword;
