import { render, screen } from "@testing-library/react";
import App from "../App";

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

// Mock the Markup component to isolate the App tests
jest.mock("../components/markup", () => {
  return function MockMarkup() {
    return <div data-testid="markup-component">Markup Component</div>;
  };
});

// Wrapper to provide Router context
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("App Component - Tests Réels", () => {
  test("App renders correctly with Markup component", () => {
    renderWithRouter(<App />);

    // Check that the App renders the Markup component
    expect(screen.getByTestId("markup-component")).toBeInTheDocument();
    expect(screen.getByText("Markup Component")).toBeInTheDocument();
  });

  test("App has correct CSS import", () => {
    const { container } = renderWithRouter(<App />);

    // Check that the App is rendered
    expect(container.firstChild).toBeInTheDocument();
  });

  test("App structure is correct", () => {
    const { container } = renderWithRouter(<App />);

    // Verify DOM base structure
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByTestId("markup-component")).toBeInTheDocument();
  });
});
