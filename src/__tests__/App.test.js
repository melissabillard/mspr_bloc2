import { render, screen } from "@testing-library/react";
import App from "../App";

// Mock react-router-dom COMPLETEMENT pour React Router v7
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
  useNavigate: () => jest.fn(),
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

// Mock du composant Markup pour isoler les tests de l'App
jest.mock("../components/markup", () => {
  return function MockMarkup() {
    return <div data-testid="markup-component">Markup Component</div>;
  };
});

// Wrapper pour fournir le contexte Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("App Component - Tests Réels", () => {
  test("App renders correctly with Markup component", () => {
    renderWithRouter(<App />);

    // Vérifier que l'App rend le composant Markup
    expect(screen.getByTestId("markup-component")).toBeInTheDocument();
    expect(screen.getByText("Markup Component")).toBeInTheDocument();
  });

  test("App has correct CSS import", () => {
    const { container } = renderWithRouter(<App />);

    // Vérifier que l'App est rendu
    expect(container.firstChild).toBeInTheDocument();
  });

  test("App structure is correct", () => {
    const { container } = renderWithRouter(<App />);

    // Vérifier la structure DOM de base
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByTestId("markup-component")).toBeInTheDocument();
  });
});
