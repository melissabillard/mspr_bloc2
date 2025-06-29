import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
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
 * Composant Login - Page de connexion moderne MSPR
 * Utilise username et password selon les spécifications du projet
 *
 * @returns {JSX.Element} Le formulaire de connexion moderne.
 */

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");

  const navigate = useNavigate();

  async function handleSubmit (e) {
    e.preventDefault();
    // if (username.trim() && password.trim()) {
    //   // Marquer l'utilisateur comme authentifié
    //   localStorage.setItem(
    //     "username",
    //     username.charAt(0).toUpperCase() + username.slice(1)
    //   );
    //   localStorage.setItem("authenticated", "true");
    //   // Nettoyer les flags temporaires
    //   localStorage.removeItem("password_recovery");
    //   // Redirection vers l'accueil connecté
    //   navigate("/home-authenticated");
    // }

    const isUsernameValid = username.trim() !== "";
    const isPasswordValid = password.trim() !== "";
    const is2FAValid = twoFactorCode.trim() !== "";

    if (isUsernameValid && isPasswordValid && is2FAValid) {

       try {
        const response = await fetch("http://api.cofrap.local/function/authenticate-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.trim(),
            password: password.trim(),
             otp_code: twoFactorCode.trim(),
          }),
        });

    if (!response.ok) {
      throw new Error("Échec de l'authentification.");
    }

    const data = await response.json();

    // Exemple : succès → marquer comme connecté
    localStorage.setItem("username", username.charAt(0).toUpperCase() + username.slice(1));
    localStorage.setItem("authenticated", "true");
    // Nettoyer les flags temporaires
    localStorage.removeItem("password_recovery");

    // console.log("Authentification réussie :", data);

    navigate("/home-authenticated");

  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    alert("Identifiants ou code 2FA incorrects.");
  }

    // // Marquer l'utilisateur comme authentifié
    // localStorage.setItem("username", username.charAt(0).toUpperCase() + username.slice(1));
    // localStorage.setItem("authenticated", "true");

    // // Nettoyer les flags temporaires
    // localStorage.removeItem("password_recovery");

    // // Redirection vers l'accueil connecté
    // navigate("/home-authenticated");

    } else {
      alert("Veuillez remplir tous les champs, y compris le code 2FA.");
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
            Se connecter
          </CardTitle>
          <CardDescription className="text-gray-600">
            Accédez à votre compte COFRAP
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

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              {/* <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-cofrap-primary focus:ring-cofrap-primary border-gray-300 rounded"
                />
                {/* <Label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600"
                >
                  Se souvenir de moi
                </Label> 
              </div> */}

              {/* Champ 2FA à gauche si username + password remplis */}
              {username.trim() && password.trim() && (
                <div className="flex flex-col">
                  <Label
                    htmlFor="twoFactorCode"
                    className="text-sm text-gray-700"
                  >
                    Code 2FA
                  </Label>
                  <Input
                    id="twoFactorCode"
                    type="text"
                    placeholder="6 chiffres"
                    value={twoFactorCode}
                    maxLength={6}
                    minLength={6}
                    required
                    onChange={(e) => {
                      setTwoFactorCode(e.target.value);
                      // console.log("Code 2FA saisi :", e.target.value);
                    }}
                    className="h-9 w-32 text-sm"
                  />
                </div>
              )}  

              <Link
                to="/forgot-password"
                className="text-sm text-cofrap-primary hover:text-cofrap-accent transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-cofrap-primary to-cofrap-accent hover:from-purple-800 hover:to-purple-400 text-white font-medium transform hover:scale-105 transition-all duration-300"
            >
              Se connecter
            </Button>
          </form>

          <div className="mt-6 text-center">
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

export default Login;
