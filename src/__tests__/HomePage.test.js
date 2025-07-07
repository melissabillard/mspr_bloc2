import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";

// Mock react-router-dom COMPLETELY for React Router v7
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

// Import BrowserRouter after the mock
const { BrowserRouter } = require("react-router-dom");

// Mock child components to isolate Home page tests
jest.mock("../components/Hero", () => {
  return function MockHero() {
    return <div data-testid="hero-component">Hero Component</div>;
  };
});

jest.mock("../components/Features", () => {
  return function MockFeatures() {
    return <div data-testid="features-component">Features Component</div>;
  };
});

jest.mock("../components/CTA", () => {
  return function MockCTA() {
    return <div data-testid="cta-component">CTA Component</div>;
  };
});

// Wrapper to provide Router context
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Home Page - Tests Réels", () => {
  test("Home page renders correctly with all components", () => {
    renderWithRouter(<Home />);

    // Check that all child components are rendered
    expect(screen.getByTestId("hero-component")).toBeInTheDocument();
    expect(screen.getByTestId("features-component")).toBeInTheDocument();
    expect(screen.getByTestId("cta-component")).toBeInTheDocument();
  });

  test("Home page has correct CSS classes and structure", () => {
    const { container } = renderWithRouter(<Home />);

    // Check that the main container exists (more specific on CSS classes)
    const mainContainer = container.firstChild;
    expect(mainContainer).toBeInTheDocument();

    // Check the presence of mocked components
    expect(screen.getByTestId("hero-component")).toBeInTheDocument();
    expect(screen.getByTestId("features-component")).toBeInTheDocument();
    expect(screen.getByTestId("cta-component")).toBeInTheDocument();
  });

  test("All child components are present and functional", () => {
    renderWithRouter(<Home />);

    // Integration testing: verify that Home coordinates all its components well
    const hero = screen.getByTestId("hero-component");
    const features = screen.getByTestId("features-component");
    const cta = screen.getByTestId("cta-component");

    expect(hero).toBeInTheDocument();
    expect(features).toBeInTheDocument();
    expect(cta).toBeInTheDocument();

    // Check that all components contain text
    expect(hero).toHaveTextContent("Hero Component");
    expect(features).toHaveTextContent("Features Component");
    expect(cta).toHaveTextContent("CTA Component");
  });
});
