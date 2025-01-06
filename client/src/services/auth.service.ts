import api from "@/lib/api";

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export const authService = {
  async login(credentials: LoginDTO): Promise<AuthResponse> {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  async register(data: RegisterDTO): Promise<AuthResponse> {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  async logout(): Promise<void> {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}; 