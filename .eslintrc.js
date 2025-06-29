module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ["react-app", "react-app/jest"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    // Règles d'erreur critiques seulement
    "no-debugger": "error",
    "no-undef": "error",

    // Règles en warning (non bloquantes)
    "no-unused-vars": "warn",
    "no-console": "warn",
    "prefer-const": "warn",
    eqeqeq: "warn",

    // Règles React
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",

    // Désactiver les règles Testing Library pour les tests
    "testing-library/no-node-access": "off",

    // Import/Export en warning
    "import/order": "warn",
    "import/no-unused-modules": "off",

    // Accessibilité en warning
    "jsx-a11y/heading-has-content": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
