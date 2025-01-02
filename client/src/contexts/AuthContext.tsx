import React, { createContext, useContext, useState, useEffect } from "react";
import { authService, AuthResponse, LoginDTO, RegisterDTO } from "@/services/auth.service";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: AuthResponse["user"] | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginDTO) => Promise<void>;
  register: (data: RegisterDTO) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthResponse["user"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Try to get user info from token
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginDTO) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authService.login(credentials);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);
      addToast({
        title: "Success",
        description: "Logged in successfully",
      });
    } catch (err) {
      const message = "Failed to login";
      setError(message);
      addToast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterDTO) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authService.register(data);
      localStorage.setItem("token", response.token);
      setUser(response.user);
    } catch (err) {
      setError("Failed to register");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("token");
      setUser(null);
    } catch (err) {
      setError("Failed to logout");
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 