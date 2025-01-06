import {
  authService,
  LoginDTO,
  RegisterDTO,
  AuthResponse,
} from "../auth.service";
import api from "@/lib/api";

jest.mock("@/lib/api");

describe("authService", () => {
  const mockToken = "mockToken";
  const mockUser = {
    id: "1",
    username: "testuser",
    email: "test@example.com",
  };
  const mockAuthResponse: AuthResponse = {
    token: mockToken,
    user: mockUser,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should login a user", async () => {
    const credentials: LoginDTO = {
      email: "test@example.com",
      password: "password",
    };
    (api.post as jest.Mock).mockResolvedValue({ data: mockAuthResponse });

    const response = await authService.login(credentials);

    expect(api.post).toHaveBeenCalledWith("/auth/login", credentials);
    expect(response).toEqual(mockAuthResponse);
  });

  it("should register a user", async () => {
    const data: RegisterDTO = {
      username: "testuser",
      email: "test@example.com",
      password: "password",
    };
    (api.post as jest.Mock).mockResolvedValue({ data: mockAuthResponse });

    const response = await authService.register(data);

    expect(api.post).toHaveBeenCalledWith("/auth/register", data);
    expect(response).toEqual(mockAuthResponse);
  });

  it("should logout a user", async () => {
    localStorage.setItem("token", mockToken);
    localStorage.setItem("user", JSON.stringify(mockUser));

    await authService.logout();

    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
  });
});
