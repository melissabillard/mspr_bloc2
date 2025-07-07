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
import logo from "../../assets/COFRAP_LOGO.png";

/**
 * Signin Component – Simplified MSPR registration page
 * The user only enters their username and is redirected to the dashboard
 *
 * @returns {JSX.Element} The simplified registration form.
 */


function Signin() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

/**
 * Handles the submission of the registration form.
 * Redirects to the dashboard after validating the username.
 *
 * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
 */

  async function handleSignup(e) {
    e.preventDefault();

    const trimmedUsername = username.trim();

    if (trimmedUsername) {
        try {
          const response = await fetch("http://api.cofrap.local/function/generate-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: trimmedUsername }),
          });
          if (!response.ok) {
            throw new Error("Erreur lors de la création du compte.");
          }
          
          const data = await response.json();

          // Save the username with an uppercase letter to use later
          localStorage.setItem("username", username.charAt(0).toUpperCase() + username.slice(1));

          // Store the QR code password to display it
          const qrDataUrl = `data:image/png;base64,${data.qr_code_base64}`;
          localStorage.setItem("qr_code_base64", qrDataUrl);

          // Make a second call to generate the 2FA QR code
          const mfaResponse = await fetch("http://api.cofrap.local/function/generate-2fa", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: trimmedUsername }),
          });

          if (mfaResponse.ok) {
            const mfaData = await mfaResponse.json();
            const qr2FADataUrl = `data:image/png;base64,${mfaData.code_mfa}`;
            localStorage.setItem("code_mfa", qr2FADataUrl);
            console.log("QR 2FA généré :", mfaData.code_mfa);
      
            // Redirect to the dashboard
            navigate("/dashboard");

          } else {
            console.warn("Impossible de générer le QR 2FA");
            localStorage.removeItem("code_mfa");
          }

      } catch (error) {
          console.error("Erreur:", error);
          alert("Échec de la création du compte. Veuillez réessayer.");
      }

    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cofrap-light to-cofrap-secondary flex items-center justify-center p-4 pt-16">
      {/* Back to home button */}
      <Link 
        to="/" 
        className="fixed top-4 left-4 flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-white z-50"
      >
        <img src={logo} alt="COFRAP Logo" className="h-8 w-auto object-contain" />
        <span className="text-cofrap-text font-semibold">COFRAP</span>
      </Link>

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
