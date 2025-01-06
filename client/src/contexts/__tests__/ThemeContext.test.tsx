import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Ensure this import is present
import { ThemeProvider, useTheme } from "../ThemeContext";

// Mock window.matchMedia
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe("ThemeContext", () => {
  const TestComponent = () => {
    const { theme, toggleTheme } = useTheme();
    return (
      <div>
        <div data-testid="theme">{theme}</div>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    );
  };

  it("toggles the theme", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme")).toHaveTextContent("light");

    fireEvent.click(screen.getByText("Toggle Theme"));

    expect(screen.getByTestId("theme")).toHaveTextContent("dark");

    fireEvent.click(screen.getByText("Toggle Theme"));

    expect(screen.getByTestId("theme")).toHaveTextContent("light");
  });
});
