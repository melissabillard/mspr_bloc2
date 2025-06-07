import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

// Tests de composants de base sans mocking complexe
describe("Basic Components Tests", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Test d'un composant de formulaire simple
  test("should render a basic login form", () => {
    const SimpleLoginForm = () => {
      const [username, setUsername] = React.useState("");
      const [password, setPassword] = React.useState("");

      return (
        <form>
          <h1>Connexion</h1>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Se connecter</button>
        </form>
      );
    };

    render(<SimpleLoginForm />);

    expect(screen.getByText("Connexion")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Nom d'utilisateur")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Mot de passe")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /se connecter/i })
    ).toBeInTheDocument();
  });

  // Test d'interaction utilisateur
  test("should handle form input changes", () => {
    const InteractiveForm = () => {
      const [username, setUsername] = React.useState("");
      const [message, setMessage] = React.useState("");

      const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
          setMessage(`Bonjour ${username}!`);
        }
      };

      return (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Votre nom"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit">Saluer</button>
          </form>
          {message && <p data-testid="message">{message}</p>}
        </div>
      );
    };

    render(<InteractiveForm />);

    const input = screen.getByPlaceholderText("Votre nom");
    const button = screen.getByRole("button", { name: /saluer/i });

    fireEvent.change(input, { target: { value: "Jean" } });
    fireEvent.click(button);

    expect(screen.getByTestId("message")).toHaveTextContent("Bonjour Jean!");
  });

  // Test de gestion d'état conditionnel
  test("should handle conditional rendering", () => {
    const ConditionalComponent = () => {
      const [isVisible, setIsVisible] = React.useState(false);

      return (
        <div>
          <button onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? "Masquer" : "Afficher"}
          </button>
          {isVisible && <p data-testid="content">Contenu affiché</p>}
        </div>
      );
    };

    render(<ConditionalComponent />);

    const button = screen.getByRole("button");

    // Initialement masqué
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
    expect(button).toHaveTextContent("Afficher");

    // Cliquer pour afficher
    fireEvent.click(button);
    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(button).toHaveTextContent("Masquer");

    // Cliquer pour masquer
    fireEvent.click(button);
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
    expect(button).toHaveTextContent("Afficher");
  });

  // Test de validation de formulaire
  test("should validate form inputs", () => {
    const ValidationForm = () => {
      const [email, setEmail] = React.useState("");
      const [error, setError] = React.useState("");

      const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.trim()) {
          setError("Email requis");
        } else if (!validateEmail(email)) {
          setError("Email invalide");
        } else {
          setError("");
        }
      };

      return (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Valider</button>
          {error && <p data-testid="error">{error}</p>}
        </form>
      );
    };

    render(<ValidationForm />);

    const input = screen.getByPlaceholderText("Votre email");
    const button = screen.getByRole("button", { name: /valider/i });

    // Test avec email vide
    fireEvent.click(button);
    expect(screen.getByTestId("error")).toHaveTextContent("Email requis");

    // Test avec email invalide
    fireEvent.change(input, { target: { value: "email-invalide" } });
    fireEvent.click(button);
    expect(screen.getByTestId("error")).toHaveTextContent("Email invalide");

    // Test avec email valide
    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
  });

  // Test de gestion des listes
  test("should handle list rendering and interactions", () => {
    const ListComponent = () => {
      const [items, setItems] = React.useState(["Item 1", "Item 2"]);
      const [newItem, setNewItem] = React.useState("");

      const addItem = () => {
        if (newItem.trim()) {
          setItems([...items, newItem]);
          setNewItem("");
        }
      };

      const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
      };

      return (
        <div>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {item}
                <button onClick={() => removeItem(index)}>Supprimer</button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Nouvel item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button onClick={addItem}>Ajouter</button>
        </div>
      );
    };

    render(<ListComponent />);

    // Vérifier les items initiaux
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();

    // Ajouter un nouvel item
    const input = screen.getByPlaceholderText("Nouvel item");
    const addButton = screen.getByRole("button", { name: /ajouter/i });

    fireEvent.change(input, { target: { value: "Item 3" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Item 3")).toBeInTheDocument();

    // Supprimer un item
    const deleteButtons = screen.getAllByText("Supprimer");
    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });
});
