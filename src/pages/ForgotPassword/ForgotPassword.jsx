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
 * ForgotPassword Component – MSPR forgot password page
 * Asks for the username and redirects to the dashboard for a new QR code
 *
 * @returns {JSX.Element} The password recovery form.
 */

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  async function handleSubmit (e) {
    e.preventDefault();

    const trimmedUsername = username.trim();

    if (trimmedUsername) {
        try {
          const response = await fetch("http://api.cofrap.local/function/generate-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: trimmedUsername }),
          });
    
        if (!response.ok) {
          throw new Error("Erreur lors de la ré-initialisation du mot de passe.");
        }
    
        const data = await response.json();
    
        // Save the username with an uppercase letter and mark as password recovery
        localStorage.setItem("username", username.charAt(0).toUpperCase() + username.slice(1));
        localStorage.setItem("password_recovery", "true");
    
        // Store the QR code to display it
        const qrDataUrl = `data:image/png;base64,${data.qr_code_base64}`;
        localStorage.setItem("qr_code_base64", qrDataUrl);

        // Make a second call to generate the new 2FA QR code
        const mfaResponse = await fetch("http://api.cofrap.local/function/generate-2fa", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: trimmedUsername }),
        });
        
        if (mfaResponse.ok) {
          const mfaData = await mfaResponse.json();
          const qr2FADataUrl = `data:image/png;base64,${mfaData.code_mfa || ""}`;
          localStorage.setItem("code_mfa", qr2FADataUrl);
          console.log("QR 2FA généré :", mfaData.code_mfa);
      
          // Redirect to the dashboard
          navigate("/dashboard");

        } else {
          console.warn("Impossible de générer le QR 2FA");
           localStorage.removeItem("code_mfa");
        }
        // navigate("/dashboard");

      } catch (err) {
        console.error("Erreur de récupération :", err);
        alert("Une erreur est survenue. Veuillez réessayer plus tard.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cofrap-light to-cofrap-secondary flex items-center justify-center p-4 pt-16">
      {/* Back to home button */}
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
