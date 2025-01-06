import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "../AuthContext";
import { authService } from "@/services/auth.service";
import { useToast } from "@/contexts/ToastProvider";

jest.mock("@/services/auth.service");
jest.mock("@/contexts/ToastProvider");

const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;

describe("AuthContext", () => {
  beforeEach(() => {
    mockUseToast.mockReturnValue(jest.fn());
  });

  const TestComponent = () => {
    const { user, login, logout } = useAuth();
    return (
      <div>
        <div data-testid="user">{user ? user.email : "No user"}</div>
        <button
          onClick={() =>
            login({ email: "test@test.com", password: "password" })
          }
        >
          Login
        </button>
        <button onClick={logout}>Logout</button>
      </div>
    );
  };

  it("logs in a user", async () => {
    (authService.login as jest.Mock).mockResolvedValue({
      token: "token",
      user: { email: "test@test.com" },
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByTestId("user")).toHaveTextContent("test@test.com");
    });
  });

  it("logs out a user", async () => {
    (authService.logout as jest.Mock).mockResolvedValue(undefined);

    render(
      <MemoryRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Logout"));

    await waitFor(() => {
      expect(screen.getByTestId("user")).toHaveTextContent("No user");
    });
  });
});
