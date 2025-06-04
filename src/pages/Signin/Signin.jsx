import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

/**
 * Composant Signin - Page d'inscription simplifiée MSPR
 * L'utilisateur renseigne juste son username et est redirigé vers le dashboard
 *
 * @returns {JSX.Element} Le formulaire d'inscription simplifié.
 */

function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  /**
   * Gère la soumission du formulaire d'inscription.
   * Redirige vers le dashboard après validation du username.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - L'événement de soumission du formulaire.
   */
  async function handleSignup(e) {
    e.preventDefault();
    if (username.trim()) {
      // Sauvegarder le username pour l'utiliser plus tard
      localStorage.setItem("username", username);
      // Rediriger vers le dashboard
      navigate("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cofrap-light to-cofrap-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-2xl font-bold text-cofrap-text">
            Créer un compte
          </CardTitle>
          <CardDescription className="text-gray-600"></CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-6">
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

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-cofrap-primary to-cofrap-accent hover:from-purple-800 hover:to-purple-400 text-white font-medium transform hover:scale-105 transition-all duration-300"
            >
              Créer mon compte
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Déjà un compte ?{" "}
              <Link
                to="/login"
                className="text-cofrap-primary hover:text-cofrap-accent font-medium"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signin;
