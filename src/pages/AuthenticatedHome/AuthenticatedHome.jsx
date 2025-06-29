import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, User, Settings, Shield } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import logo from "../../assets/COFRAP_LOGO.png";

/**
 * Composant AuthenticatedHome - Page d'accueil pour utilisateurs connectés
 * Interface personnalisée avec fonctionnalités utilisateur et déconnexion
 *
 * @returns {JSX.Element} La page d'accueil pour utilisateurs authentifiés.
 */

function AuthenticatedHome() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const isAuthenticated = localStorage.getItem("authenticated");

    if (storedUsername && isAuthenticated === "true") {
      setUsername(storedUsername);
    } else {
      // Si pas authentifié, rediriger vers la page de connexion
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Nettoyer toutes les données utilisateur
    localStorage.removeItem("username");
    localStorage.removeItem("authenticated");
    localStorage.removeItem("password_recovery");
    // Rediriger vers la page d'accueil
    navigate("/");
  };

  const handleProfile = () => {
    // TODO: Rediriger vers page de profil
    console.log("Redirection vers profil");
  };

  const handleSettings = () => {
    // TODO: Rediriger vers paramètres
    console.log("Redirection vers paramètres");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cofrap-light to-cofrap-secondary">
      {/* Header personnalisé */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              to="/home-authenticated"
              className="flex items-center space-x-3"
            >
              <img
                src={logo}
                alt="COFRAP Logo"
                className="h-16 w-auto object-contain transform hover:scale-110 hover:rotate-3 transition-all duration-300 ease-in-out"
              />
              <div>
                <h1 className="text-xl font-bold text-cofrap-text">COFRAP</h1>
                <p className="text-sm text-gray-600">Tableau de bord</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-cofrap-primary" />
              <span className="text-gray-700 font-medium">{username}</span>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Connecté
              </Badge>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center space-x-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Se déconnecter</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-cofrap-text mb-2">
            Bienvenue, {username} !
          </h2>
          <p className="text-gray-600">
            Vous êtes maintenant connecté à votre espace COFRAP.
          </p>
        </div>

        {/* Cartes d'action */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={handleProfile}
          >
            <CardHeader>
              <div className="w-12 h-12 bg-cofrap-secondary rounded-lg flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-cofrap-primary" />
              </div>
              <CardTitle className="text-xl text-cofrap-text">
                Mon Profil
              </CardTitle>
              <CardDescription>
                Gérez vos informations personnelles et préférences
              </CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={handleSettings}
          >
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-cofrap-text">
                Paramètres
              </CardTitle>
              <CardDescription>
                Configurez votre compte et vos préférences système
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-xl text-cofrap-text">
                Sécurité
              </CardTitle>
              <CardDescription>
                Vos données sont protégées avec nos protocoles de sécurité
                avancés
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Section statistiques rapides */}
        <div className="mt-12">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-cofrap-text">
                Activité récente
              </CardTitle>
              <CardDescription>
                Aperçu de votre activité sur la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cofrap-primary">
                    1
                  </div>
                  <div className="text-sm text-gray-600">
                    Connexion aujourd'hui
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">✓</div>
                  <div className="text-sm text-gray-600">Compte vérifié</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">💼</div>
                  <div className="text-sm text-gray-600">
                    Services disponibles
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default AuthenticatedHome;
