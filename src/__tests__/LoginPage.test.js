import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../pages/Login/Login";

// Mock fetch pour simuler les appels API
global.fetch = jest.fn();

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock useNavigate avec une fonction spécifique pour ce test
const mockNavigate = jest.fn();

// Mock react-router-dom COMPLETEMENT sans référence au module réel
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => (
    <div data-testid="browser-router">{children}</div>
  ),
  HashRouter: ({ children }) => <div data-testid="hash-router">{children}</div>,
  MemoryRouter: ({ children }) => (
    <div data-testid="memory-router">{children}</div>
  ),
  Router: ({ children }) => <div data-testid="router">{children}</div>,
  StaticRouter: ({ children }) => (
    <div data-testid="static-router">{children}</div>
  ),
  Route: ({ children, element }) => (
    <div data-testid="route">{element || children}</div>
  ),
  Routes: ({ children }) => <div data-testid="routes">{children}</div>,
  Link: ({ children, to, ...props }) => (
    <a href={to} data-testid="link" {...props}>
      {children}
    </a>
  ),
  NavLink: ({ children, to, ...props }) => (
    <a href={to} data-testid="navlink" {...props}>
      {children}
    </a>
  ),
  Navigate: () => <div data-testid="navigate" />,
  Outlet: () => <div data-testid="outlet" />,
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    pathname: "/",
    search: "",
    hash: "",
    state: null,
    key: "default",
  }),
  useParams: () => ({}),
  useSearchParams: () => [new URLSearchParams(), jest.fn()],
  useMatch: () => null,
  useMatches: () => [],
  useOutlet: () => null,
  useOutletContext: () => null,
  useResolvedPath: () => ({ pathname: "/", search: "", hash: "" }),
  useHref: () => "/",
  useInRouterContext: () => true,
  useNavigationType: () => "POP",
  createBrowserRouter: jest.fn(),
  createHashRouter: jest.fn(),
  createMemoryRouter: jest.fn(),
  createStaticRouter: jest.fn(),
  RouterProvider: ({ children }) => (
    <div data-testid="router-provider">{children}</div>
  ),
}));

// Import BrowserRouter après le mock
const { BrowserRouter } = require("react-router-dom");

// Wrapper pour fournir le contexte Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Login Page - Tests Réels", () => {
  beforeEach(() => {
    // Reset des mocks
    jest.clearAllMocks();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    mockNavigate.mockClear();
    fetch.mockClear();
  });

  test("Login form renders correctly with all required fields", () => {
    renderWithRouter(<Login />);

    // Vérifier que tous les champs requis sont présents
    expect(screen.getByLabelText(/nom d'utilisateur/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /se connecter/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/accédez à votre compte cofrap/i)
    ).toBeInTheDocument();
  });

  test("Password visibility toggle works correctly", async () => {
    renderWithRouter(<Login />);

    const passwordInput = screen.getByLabelText(/mot de passe/i);
    const toggleButton = screen.getByRole("button", { name: "" }); // Bouton eye/eye-off

    // Par défaut, le mot de passe est masqué
    expect(passwordInput).toHaveAttribute("type", "password");

    // Cliquer sur le bouton pour afficher le mot de passe
    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    // Cliquer à nouveau pour masquer le mot de passe
    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("2FA field appears when username and password are filled", async () => {
    renderWithRouter(<Login />);

    const usernameInput = screen.getByLabelText(/nom d'utilisateur/i);
    const passwordInput = screen.getByLabelText(/mot de passe/i);

    // Initialement, le champ 2FA ne doit pas être visible
    expect(screen.queryByLabelText(/code 2fa/i)).not.toBeInTheDocument();

    // Remplir username et password
    await userEvent.type(usernameInput, "testuser");
    await userEvent.type(passwordInput, "testpass");

    // Maintenant le champ 2FA doit apparaître
    expect(screen.getByLabelText(/code 2fa/i)).toBeInTheDocument();
  });

  test("Form validation shows alert when fields are empty", async () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    renderWithRouter(<Login />);

    const submitButton = screen.getByRole("button", { name: /se connecter/i });

    // Soumettre le formulaire sans remplir les champs
    await userEvent.click(submitButton);

    // Vérifier que l'alerte est affichée
    expect(alertSpy).toHaveBeenCalledWith(
      "Veuillez remplir tous les champs, y compris le code 2FA."
    );

    alertSpy.mockRestore();
  });

  test("Successful login with valid credentials and 2FA", async () => {
    // Mock fetch pour retourner une réponse réussie
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, user: "testuser" }),
    });

    renderWithRouter(<Login />);

    // Remplir le formulaire
    await userEvent.type(
      screen.getByLabelText(/nom d'utilisateur/i),
      "testuser"
    );
    await userEvent.type(screen.getByLabelText(/mot de passe/i), "testpass");

    // Attendre que le champ 2FA apparaisse
    await waitFor(() => {
      expect(screen.getByLabelText(/code 2fa/i)).toBeInTheDocument();
    });

    await userEvent.type(screen.getByLabelText(/code 2fa/i), "123456");

    // Soumettre le formulaire
    await userEvent.click(
      screen.getByRole("button", { name: /se connecter/i })
    );

    // Vérifier que le fetch a été appelé avec les bons paramètres
    expect(fetch).toHaveBeenCalledWith(
      "http://api.cofrap.local/function/verify-login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "testuser",
          password: "testpass",
          otp_code: "123456",
        }),
      }
    );
  });

  test("Login fails with invalid credentials", async () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    // Mock fetch pour retourner une erreur
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    renderWithRouter(<Login />);

    // Remplir le formulaire
    await userEvent.type(
      screen.getByLabelText(/nom d'utilisateur/i),
      "wronguser"
    );
    await userEvent.type(screen.getByLabelText(/mot de passe/i), "wrongpass");
    await userEvent.type(screen.getByLabelText(/code 2fa/i), "000000");

    // Soumettre le formulaire
    await userEvent.click(
      screen.getByRole("button", { name: /se connecter/i })
    );

    // Vérifier que l'alerte d'erreur est affichée
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "Identifiants ou code 2FA incorrects."
      );
    });

    // Vérifier que la navigation n'a pas eu lieu
    expect(mockNavigate).not.toHaveBeenCalled();

    alertSpy.mockRestore();
  });

  test("Navigation links work correctly", async () => {
    renderWithRouter(<Login />);

    // Vérifier que les liens de navigation sont présents
    expect(screen.getByText(/créer un compte/i)).toBeInTheDocument();
    expect(screen.getByText(/mot de passe oublié/i)).toBeInTheDocument();
    // Utiliser getAllByText pour gérer les éléments multiples contenant "COFRAP"
    const cofrapElements = screen.getAllByText(/cofrap/i);
    expect(cofrapElements.length).toBeGreaterThan(0);
  });

  test("Form state updates correctly on input changes", async () => {
    renderWithRouter(<Login />);

    const usernameInput = screen.getByLabelText(/nom d'utilisateur/i);
    const passwordInput = screen.getByLabelText(/mot de passe/i);

    // Taper dans les champs
    await userEvent.type(usernameInput, "test");
    await userEvent.type(passwordInput, "password");

    // Vérifier que les valeurs sont mises à jour
    expect(usernameInput).toHaveValue("test");
    expect(passwordInput).toHaveValue("password");

    // Vérifier que le champ 2FA apparaît
    expect(screen.getByLabelText(/code 2fa/i)).toBeInTheDocument();
  });
});
