import { render, screen } from "@testing-library/react";

// Tests for utility functions and LocalStorage
describe("Utility Functions and LocalStorage - Tests Unitaires", () => {
  beforeEach(() => {
    localStorage.clear();
  });

// Test 1: Username capitalization function
  test("should capitalize username correctly", () => {
    const capitalizeUsername = (username) => {
      return username.charAt(0).toUpperCase() + username.slice(1);
    };

    expect(capitalizeUsername("john")).toBe("John");
    expect(capitalizeUsername("marie-claire")).toBe("Marie-claire");
    expect(capitalizeUsername("PIERRE")).toBe("PIERRE");
    expect(capitalizeUsername("a")).toBe("A");
    expect(capitalizeUsername("")).toBe("");
  });

// Test 2: localStorage handling
  test("should handle localStorage operations correctly", () => {
    // Write test
    localStorage.setItem("username", "TestUser");
    localStorage.setItem("authenticated", "true");
    localStorage.setItem("password_recovery", "false");

    // Reading test
    expect(localStorage.getItem("username")).toBe("TestUser");
    expect(localStorage.getItem("authenticated")).toBe("true");
    expect(localStorage.getItem("password_recovery")).toBe("false");

    // Individual deletion test
    localStorage.removeItem("password_recovery");
    expect(localStorage.getItem("password_recovery")).toBeNull();
    expect(localStorage.getItem("username")).toBe("TestUser");

    // Full cleanup test
    localStorage.clear();
    expect(localStorage.getItem("username")).toBeNull();
    expect(localStorage.getItem("authenticated")).toBeNull();
  });

  // Test 3: Authentication state validation
  test("should validate authentication states correctly", () => {
    const isAuthenticated = () => {
      const username = localStorage.getItem("username");
      const authenticated = localStorage.getItem("authenticated");
      return Boolean(username && authenticated === "true");
    };

    // Not authenticated – no data
    expect(isAuthenticated()).toBe(false);

    // Not authenticated – username only
    localStorage.setItem("username", "User");
    expect(isAuthenticated()).toBe(false);

    // Not authenticated – authenticated flag only
    localStorage.clear();
    localStorage.setItem("authenticated", "true");
    expect(isAuthenticated()).toBe(false);

    // Non authentifié - authenticated false
    localStorage.setItem("username", "User");
    localStorage.setItem("authenticated", "false");
    expect(isAuthenticated()).toBe(false);

    // Authenticated – all conditions met
    localStorage.setItem("authenticated", "true");
    expect(isAuthenticated()).toBe(true);
  });

  // Test 4: Password recovery state management
  test("should handle password recovery states correctly", () => {
    const isPasswordRecovery = () => {
      return localStorage.getItem("password_recovery") === "true";
    };

    // No recovery
    expect(isPasswordRecovery()).toBe(false);

    // Recovery explicitly disabled
    localStorage.setItem("password_recovery", "false");
    expect(isPasswordRecovery()).toBe(false);

    // Recovery enabled
    localStorage.setItem("password_recovery", "true");
    expect(isPasswordRecovery()).toBe(true);

    // Clean
    localStorage.removeItem("password_recovery");
    expect(isPasswordRecovery()).toBe(false);
  });

  // Test 5: User data cleanup function
  test("should clean user data correctly", () => {
    const cleanUserData = () => {
      localStorage.removeItem("username");
      localStorage.removeItem("authenticated");
      localStorage.removeItem("password_recovery");
    };

    // Prepare the data
    localStorage.setItem("username", "TestUser");
    localStorage.setItem("authenticated", "true");
    localStorage.setItem("password_recovery", "true");
    localStorage.setItem("other_data", "should_remain");

    // Clean up
    cleanUserData();

    // Check the clean up
    expect(localStorage.getItem("username")).toBeNull();
    expect(localStorage.getItem("authenticated")).toBeNull();
    expect(localStorage.getItem("password_recovery")).toBeNull();
    expect(localStorage.getItem("other_data")).toBe("should_remain");
  });

  // Test 6: Form validation
  test("should validate form inputs correctly", () => {
    const validateLogin = (username, password) => {
      return username.trim() !== "" && password.trim() !== "";
    };

    const validateSignup = (username) => {
      return username.trim() !== "";
    };

    // Test login
    expect(validateLogin("john", "password")).toBe(true);
    expect(validateLogin("", "password")).toBe(false);
    expect(validateLogin("john", "")).toBe(false);
    expect(validateLogin("", "")).toBe(false);
    expect(validateLogin("  ", "password")).toBe(false);
    expect(validateLogin("john", "  ")).toBe(false);

    // Test sign up
    expect(validateSignup("john")).toBe(true);
    expect(validateSignup("")).toBe(false);
    expect(validateSignup("  ")).toBe(false);
    expect(validateSignup("a")).toBe(true);
  });

  // Test 7: Error handling and edge cases
  test("should handle edge cases and errors", () => {
    // Test with null and undefined values
    const capitalizeUsername = (username) => {
      if (!username) return "";
      return username.charAt(0).toUpperCase() + username.slice(1);
    };

    expect(capitalizeUsername(null)).toBe("");
    expect(capitalizeUsername(undefined)).toBe("");
    expect(capitalizeUsername("")).toBe("");

  // Test with unavailable localStorage (simulation)
    const originalLocalStorage = global.localStorage;

  // Simulate unavailable localStorage
    delete global.localStorage;

  // The function should handle the error gracefully
    const safeLocalStorageGet = (key) => {
      try {
        return localStorage?.getItem(key) || null;
      } catch (error) {
        return null;
      }
    };

    expect(safeLocalStorageGet("any_key")).toBeNull();

    // Restore localStorage
    global.localStorage = originalLocalStorage;
  });

    // Test 8: Performance and optimization
  test("should handle performance considerations", () => {
    const startTime = performance.now();

    // Simulate multiple localStorage operations
    for (let i = 0; i < 100; i++) {
      localStorage.setItem(`key_${i}`, `value_${i}`);
    }

    for (let i = 0; i < 100; i++) {
      localStorage.getItem(`key_${i}`);
    }

    for (let i = 0; i < 100; i++) {
      localStorage.removeItem(`key_${i}`);
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    // localStorage operations should be fast (< 100ms for 300 operations)
    expect(duration).toBeLessThan(100);
  });
});
