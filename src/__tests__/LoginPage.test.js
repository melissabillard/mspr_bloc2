import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../pages/Login/Login";

// Mock fetch to simulate API calls
global.fetch = jest.fn();

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock useNavigate with a specific function for this test
const mockNavigate = jest.fn();

// Mock react-router-dom COMPLETELY without reference to the actual module
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

// Import BrowserRouter after the mock
const { BrowserRouter } = require("react-router-dom");

// Wrapper to provide Router context
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Login Page - Tests Réels", () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    mockNavigate.mockClear();
    fetch.mockClear();
  });

  test("Login form renders correctly with all required fields", () => {
    renderWithRouter(<Login />);

    // Check that all required fields are present
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

    // By default, the password is hidden
    expect(passwordInput).toHaveAttribute("type", "password");

    // Click the button to display the password
    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    // Click again to hide the password
    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("2FA field appears when username and password are filled", async () => {
    renderWithRouter(<Login />);

    const usernameInput = screen.getByLabelText(/nom d'utilisateur/i);
    const passwordInput = screen.getByLabelText(/mot de passe/i);

    // Initially, the 2FA field should not be visible
    expect(screen.queryByLabelText(/code 2fa/i)).not.toBeInTheDocument();

    // Fill in username and password
    await userEvent.type(usernameInput, "testuser");
    await userEvent.type(passwordInput, "testpass");

    // Now the 2FA field should appear
    expect(screen.getByLabelText(/code 2fa/i)).toBeInTheDocument();
  });

  test("Form validation shows alert when fields are empty", async () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    renderWithRouter(<Login />);

    const submitButton = screen.getByRole("button", { name: /se connecter/i });

    // Submit the form without filling in the fields
    await userEvent.click(submitButton);

    // Check that the alert is displayed
    expect(alertSpy).toHaveBeenCalledWith(
      "Veuillez remplir tous les champs, y compris le code 2FA."
    );

    alertSpy.mockRestore();
  });

  test("Successful login with valid credentials and 2FA", async () => {
    // Mock fetch to return a successful response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, user: "testuser" }),
    });

    renderWithRouter(<Login />);

    // Fill out the form
    await userEvent.type(
      screen.getByLabelText(/nom d'utilisateur/i),
      "testuser"
    );
    await userEvent.type(screen.getByLabelText(/mot de passe/i), "testpass");

    // Wait for the 2FA field to appear
    await waitFor(() => {
      expect(screen.getByLabelText(/code 2fa/i)).toBeInTheDocument();
    });

    await userEvent.type(screen.getByLabelText(/code 2fa/i), "123456");

    // Submit form
    await userEvent.click(
      screen.getByRole("button", { name: /se connecter/i })
    );

    // Check that the fetch was called with the correct parameters
    expect(fetch).toHaveBeenCalledWith(
      "http://api.cofrap.local/function/authenticate-user",
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

    // Mock fetch to return an error
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    renderWithRouter(<Login />);

    // Fill out the form
    await userEvent.type(
      screen.getByLabelText(/nom d'utilisateur/i),
      "wronguser"
    );
    await userEvent.type(screen.getByLabelText(/mot de passe/i), "wrongpass");
    await userEvent.type(screen.getByLabelText(/code 2fa/i), "000000");

    // Submit form
    await userEvent.click(
      screen.getByRole("button", { name: /se connecter/i })
    );

    // Check that the error alert is displayed
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "Identifiants ou code 2FA incorrects."
      );
    });

    // Check that navigation has not taken place
    expect(mockNavigate).not.toHaveBeenCalled();

    alertSpy.mockRestore();
  });

  test("Navigation links work correctly", async () => {
    renderWithRouter(<Login />);

    // Check that the navigation links are present
    expect(screen.getByText(/créer un compte/i)).toBeInTheDocument();
    expect(screen.getByText(/mot de passe oublié/i)).toBeInTheDocument();
    // Use getAllByText to handle multiple elements containing "COFRAP"
    const cofrapElements = screen.getAllByText(/cofrap/i);
    expect(cofrapElements.length).toBeGreaterThan(0);
  });

  test("Form state updates correctly on input changes", async () => {
    renderWithRouter(<Login />);

    const usernameInput = screen.getByLabelText(/nom d'utilisateur/i);
    const passwordInput = screen.getByLabelText(/mot de passe/i);

    // Type in the fields
    await userEvent.type(usernameInput, "test");
    await userEvent.type(passwordInput, "password");

    // Check that the values ​​are updated
    expect(usernameInput).toHaveValue("test");
    expect(passwordInput).toHaveValue("password");

    // Check that the 2FA field appears
    expect(screen.getByLabelText(/code 2fa/i)).toBeInTheDocument();
  });
});
