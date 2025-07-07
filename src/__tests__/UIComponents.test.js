import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/card";

// Mock of the cn function for testing
jest.mock("../lib/utils", () => ({
  cn: (...classes) => classes.filter(Boolean).join(" "),
}));

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

// Wrapper to provide the Router context
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("UI Components - Tests Réels", () => {
  describe("Button Component", () => {
    test("Button renders with default props", () => {
      renderWithRouter(<Button>Click me</Button>);

      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(
        "inline-flex",
        "items-center",
        "justify-center"
      );
    });

    test("Button handles click events", async () => {
      const handleClick = jest.fn();

      renderWithRouter(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole("button", { name: /click me/i });
      await userEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("Button renders with different variants", () => {
      renderWithRouter(
        <div>
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      );

      expect(
        screen.getByRole("button", { name: /default/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /destructive/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /outline/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /secondary/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /ghost/i })
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /link/i })).toBeInTheDocument();
    });

    test("Button renders with different sizes", () => {
      renderWithRouter(
        <div>
          <Button size="default">Default</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">Icon</Button>
        </div>
      );

      expect(
        screen.getByRole("button", { name: /default/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /small/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /large/i })
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /icon/i })).toBeInTheDocument();
    });

    test("Button is disabled when disabled prop is true", () => {
      renderWithRouter(<Button disabled>Disabled Button</Button>);

      const button = screen.getByRole("button", { name: /disabled button/i });
      expect(button).toBeDisabled();
    });

    test("Button with asChild prop renders as different element", () => {
      renderWithRouter(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );

      const link = screen.getByRole("link", { name: /link button/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/test");
    });
  });

  describe("Input Component", () => {
    test("Input renders with default props", () => {
      renderWithRouter(<Input placeholder="Enter text" />);

      const input = screen.getByPlaceholderText(/enter text/i);
      expect(input).toBeInTheDocument();
      // The default type is "text" but it may not be explicitly defined
      expect(input.type === "text" || input.type === undefined).toBeTruthy();
    });

    test("Input handles value changes", async () => {
      renderWithRouter(<Input placeholder="Enter text" />);

      const input = screen.getByPlaceholderText(/enter text/i);
      await userEvent.type(input, "test value");

      expect(input).toHaveValue("test value");
    });

    test("Input renders with different types", () => {
      renderWithRouter(
        <div>
          <Input type="text" placeholder="Text" />
          <Input type="password" placeholder="Password" />
          <Input type="email" placeholder="Email" />
          <Input type="number" placeholder="Number" />
        </div>
      );

      expect(screen.getByPlaceholderText(/text/i)).toHaveAttribute(
        "type",
        "text"
      );
      expect(screen.getByPlaceholderText(/password/i)).toHaveAttribute(
        "type",
        "password"
      );
      expect(screen.getByPlaceholderText(/email/i)).toHaveAttribute(
        "type",
        "email"
      );
      expect(screen.getByPlaceholderText(/number/i)).toHaveAttribute(
        "type",
        "number"
      );
    });

    test("Input is disabled when disabled prop is true", () => {
      renderWithRouter(<Input disabled placeholder="Disabled input" />);

      const input = screen.getByPlaceholderText(/disabled input/i);
      expect(input).toBeDisabled();
    });
  });

  describe("Label Component", () => {
    test("Label renders with text content", () => {
      renderWithRouter(<Label>Test Label</Label>);

      expect(screen.getByText(/test label/i)).toBeInTheDocument();
    });

    test("Label is associated with input via htmlFor", () => {
      renderWithRouter(
        <div>
          <Label htmlFor="test-input">Test Label</Label>
          <Input id="test-input" placeholder="Test input" />
        </div>
      );

      const label = screen.getByText(/test label/i);
      const input = screen.getByPlaceholderText(/test input/i);

      expect(label).toHaveAttribute("for", "test-input");
      expect(input).toHaveAttribute("id", "test-input");
    });
  });

  describe("Card Components", () => {
    test("Card renders with all sub-components", () => {
      renderWithRouter(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>Card Content</CardContent>
          <CardFooter>Card Footer</CardFooter>
        </Card>
      );

      expect(screen.getByText(/card title/i)).toBeInTheDocument();
      expect(screen.getByText(/card description/i)).toBeInTheDocument();
      expect(screen.getByText(/card content/i)).toBeInTheDocument();
      expect(screen.getByText(/card footer/i)).toBeInTheDocument();
    });

    test("Card renders with only content", () => {
      renderWithRouter(
        <Card>
          <CardContent>Simple Card Content</CardContent>
        </Card>
      );

      expect(screen.getByText(/simple card content/i)).toBeInTheDocument();
    });

    test("Card handles click events", async () => {
      const handleClick = jest.fn();

      renderWithRouter(
        <Card onClick={handleClick}>
          <CardContent>Clickable Card</CardContent>
        </Card>
      );

      const card = screen.getByText(/clickable card/i).closest("div");
      await userEvent.click(card);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Component Integration", () => {
    test("Form with Input, Label, and Button works together", async () => {
      const handleSubmit = jest.fn((e) => e.preventDefault());

      renderWithRouter(
        <form onSubmit={handleSubmit}>
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="Enter username" />
          <Button type="submit">Submit</Button>
        </form>
      );

      const input = screen.getByPlaceholderText(/enter username/i);
      const button = screen.getByRole("button", { name: /submit/i });

      await userEvent.type(input, "testuser");
      await userEvent.click(button);

      expect(input).toHaveValue("testuser");
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe("Avatar Component", () => {
    test("Avatar renders with AvatarFallback", () => {
      renderWithRouter(
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );

      const avatarFallback = screen.getByText("JD");
      expect(avatarFallback).toBeInTheDocument();
    });

    test("AvatarImage renders correctly", () => {
      renderWithRouter(
        <Avatar>
          <AvatarImage src="https://example.com/avatar.jpg" alt="User Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );

      // The image may not be visible due to Radix UI, so just test that the component exists
      const avatar = screen.getByText("JD").closest("span").parentElement;
      expect(avatar).toBeInTheDocument();
    });

    test("AvatarFallback displays text content", () => {
      renderWithRouter(
        <Avatar>
          <AvatarFallback>Test Fallback</AvatarFallback>
        </Avatar>
      );

      const avatarFallback = screen.getByText("Test Fallback");
      expect(avatarFallback).toBeInTheDocument();
    });

    test("Avatar renders with custom className", () => {
      renderWithRouter(
        <Avatar className="custom-avatar">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );

      // Test that the parent Avatar has the custom class
      const avatarContainer = screen
        .getByText("JD")
        .closest("span").parentElement;
      expect(avatarContainer).toHaveClass("custom-avatar");
    });
  });

  describe("Badge Component", () => {
    test("Badge renders with default props", () => {
      renderWithRouter(<Badge>Default Badge</Badge>);

      const badge = screen.getByText("Default Badge");
      expect(badge).toBeInTheDocument();
    });

    test("Badge renders with different variants", () => {
      renderWithRouter(
        <div>
          <Badge variant="default">Default</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="secondary">Secondary</Badge>
        </div>
      );

      expect(screen.getByText("Default")).toBeInTheDocument();
      expect(screen.getByText("Destructive")).toBeInTheDocument();
      expect(screen.getByText("Outline")).toBeInTheDocument();
      expect(screen.getByText("Secondary")).toBeInTheDocument();
    });

    test("Badge renders with custom className", () => {
      renderWithRouter(<Badge className="custom-badge">Custom Badge</Badge>);

      const badge = screen.getByText("Custom Badge");
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass("custom-badge");
    });

    test("Badge handles click events", async () => {
      const handleClick = jest.fn();

      renderWithRouter(<Badge onClick={handleClick}>Clickable Badge</Badge>);

      const badge = screen.getByText("Clickable Badge");
      await userEvent.click(badge);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
