import { type ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { TodoProvider } from "@/contexts/TodoContext";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { TodoList } from "@/components/todo/TodoList";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  type Location,
} from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@/components/ui/spinner";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ToastProvider } from "./contexts/ToastProvider";
interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function AppContent(): JSX.Element {
  const location: Location = useLocation();

  return (
    <div className="min-h-screen">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Header />
              <TodoList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <TodoProvider>
              <AppContent />
            </TodoProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
