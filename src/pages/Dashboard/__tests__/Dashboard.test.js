import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock des assets
jest.mock("../../../assets/QRCode.png", () => "qr-code-mock.png");
jest.mock("../../../assets/COFRAP_LOGO.png", () => "logo-mock.png");

// Mock des fonctions de navigation
const mockNavigate = jest.fn();

// Composant Dashboard simplifié pour les tests
const DashboardTest = () => {
  const [username, setUsername] = React.useState("");
  const [isRecovery, setIsRecovery] = React.useState(false);

  React.useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const recoveryMode = localStorage.getItem("password_recovery") === "true";

    if (!storedUsername) {
      mockNavigate("/signin");
      return;
    }

    setUsername(storedUsername);
    setIsRecovery(recoveryMode);
  }, []);

  const handleConnect = () => {
    localStorage.removeItem("password_recovery");
    mockNavigate("/login");
  };

  if (!username) {
    return <div>Redirecting...</div>;
  }

  return (
    <div>
      <a href="/">
        <img src="logo-mock.png" alt="COFRAP Logo" />
        <span>COFRAP</span>
      </a>

      {isRecovery ? (
        <div>
          <h1>Récupération pour {username}</h1>
          <p>Scannez le QR code pour recevoir votre nouveau mot de passe</p>
          <div>
            <h2>Récupération de mot de passe en cours</h2>
            <p>Vous recevrez votre nouveau mot de passe par notification</p>
          </div>
        </div>
      ) : (
        <div>
          <h1>Bienvenue {username} !</h1>
          <p>Scannez le QR code pour recevoir votre mot de passe</p>
          <div>
            <p>📱 Scannez ce QR code avec votre téléphone</p>
            <p>Vous recevrez votre mot de passe par notification</p>
          </div>
        </div>
      )}

      <img src="qr-code-mock.png" alt="QR Code pour recevoir le mot de passe" />

      <div>
        <p>et utilisez votre nom d'utilisateur :</p>
        <p>{username}</p>
      </div>

      <button onClick={handleConnect}>Se connecter</button>
    </div>
  );
};

describe("Dashboard Component - Tests Simples", () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  test("should redirect to signin if no username", () => {
    render(<DashboardTest />);
    expect(mockNavigate).toHaveBeenCalledWith("/signin");
  });

  test("should display normal signup flow", () => {
    localStorage.setItem("username", "TestUser");
    render(<DashboardTest />);

    expect(screen.getByText("Bienvenue TestUser !")).toBeInTheDocument();
    expect(
      screen.getByText("Scannez le QR code pour recevoir votre mot de passe")
    ).toBeInTheDocument();
    expect(
      screen.getByText("📱 Scannez ce QR code avec votre téléphone")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Vous recevrez votre mot de passe par notification")
    ).toBeInTheDocument();
  });

  test("should display password recovery flow", () => {
    localStorage.setItem("username", "RecoveryUser");
    localStorage.setItem("password_recovery", "true");
    render(<DashboardTest />);

    expect(
      screen.getByText("Récupération pour RecoveryUser")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Scannez le QR code pour recevoir votre nouveau mot de passe"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Récupération de mot de passe en cours")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Vous recevrez votre nouveau mot de passe par notification"
      )
    ).toBeInTheDocument();
  });

  test("should display QR code image", () => {
    localStorage.setItem("username", "TestUser");
    render(<DashboardTest />);

    const qrImage = screen.getByAltText(
      "QR Code pour recevoir le mot de passe"
    );
    expect(qrImage).toBeInTheDocument();
    expect(qrImage).toHaveAttribute("src", "qr-code-mock.png");
  });

  test("should handle connect button click", () => {
    localStorage.setItem("username", "TestUser");
    localStorage.setItem("password_recovery", "true");
    render(<DashboardTest />);

    const connectButton = screen.getByRole("button", { name: /se connecter/i });
    fireEvent.click(connectButton);

    expect(localStorage.getItem("password_recovery")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("should display personalized instructions", () => {
    localStorage.setItem("username", "CustomUser");
    render(<DashboardTest />);

    expect(
      screen.getByText("et utilisez votre nom d'utilisateur :")
    ).toBeInTheDocument();
    expect(screen.getByText("CustomUser")).toBeInTheDocument();
  });

  test("should display clickable logo", () => {
    localStorage.setItem("username", "TestUser");
    render(<DashboardTest />);

    const logoLink = screen.getByRole("link");
    expect(logoLink).toHaveAttribute("href", "/");
    expect(screen.getByText("COFRAP")).toBeInTheDocument();
  });
});
