// Mock personnalisé pour React Router v7
import React from "react";

// Mock des composants de routing
const BrowserRouter = ({ children }) => (
  <div data-testid="router">{children}</div>
);
const HashRouter = ({ children }) => <div data-testid="router">{children}</div>;
const MemoryRouter = ({ children }) => (
  <div data-testid="router">{children}</div>
);
const Router = ({ children }) => <div data-testid="router">{children}</div>;
const StaticRouter = ({ children }) => (
  <div data-testid="router">{children}</div>
);
const Route = ({ children, element }) => (
  <div data-testid="route">{element || children}</div>
);
const Routes = ({ children }) => <div data-testid="routes">{children}</div>;

// Mock des composants de navigation
const Link = ({ children, to, ...props }) => (
  <a href={to} data-testid="link" {...props}>
    {children}
  </a>
);

const NavLink = ({ children, to, ...props }) => (
  <a href={to} data-testid="navlink" {...props}>
    {children}
  </a>
);

const Navigate = () => <div data-testid="navigate" />;
const Outlet = () => <div data-testid="outlet" />;

// Mock des hooks avec des implémentations par défaut
const useNavigate = () => jest.fn();
const useLocation = () => ({
  pathname: "/",
  search: "",
  hash: "",
  state: null,
  key: "default",
});
const useParams = () => ({});
const useSearchParams = () => [new URLSearchParams(), jest.fn()];
const useMatch = () => null;
const useMatches = () => [];
const useOutlet = () => null;
const useOutletContext = () => null;
const useResolvedPath = () => ({ pathname: "/", search: "", hash: "" });
const useHref = () => "/";
const useInRouterContext = () => true;
const useNavigationType = () => "POP";

// Mock des fonctions de création de router
const createBrowserRouter = jest.fn();
const createHashRouter = jest.fn();
const createMemoryRouter = jest.fn();
const createStaticRouter = jest.fn();
const RouterProvider = ({ children }) => (
  <div data-testid="router-provider">{children}</div>
);

export {
  BrowserRouter,
  HashRouter,
  MemoryRouter,
  Router,
  StaticRouter,
  Route,
  Routes,
  Link,
  NavLink,
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
  useMatch,
  useMatches,
  useOutlet,
  useOutletContext,
  useResolvedPath,
  useHref,
  useInRouterContext,
  useNavigationType,
  createBrowserRouter,
  createHashRouter,
  createMemoryRouter,
  createStaticRouter,
  RouterProvider,
};
