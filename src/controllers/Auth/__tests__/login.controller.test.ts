import { loginController } from "../login.controller";
import { userService } from "../../../services";
import { UnauthorizedError } from "../../../errors/unauthorized.error";
import httpStatus from "http-status";

jest.mock("../../../services");
jest.mock("../../../utils/password", () => ({
  comparePassword: jest.fn(),
}));
jest.mock("../../../utils/generate", () => ({
  generateToken: jest.fn(() => "mockToken"),
}));

describe("loginController", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: { email: "test@example.com", password: "password" } };
    res = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it("should return token and user on successful login", async () => {
    (userService.getOneUser as jest.Mock).mockResolvedValue({
      uuid: "123",
      password: "hashedPassword",
    });
    const { comparePassword } = require("../../../utils/password");
    comparePassword.mockResolvedValue(true);

    await loginController(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      token: "mockToken",
      user: { uuid: "123", password: "hashedPassword" },
    });
    expect(res.status).toHaveBeenCalledWith(httpStatus.ACCEPTED);
  });

  it("should throw UnauthorizedError if user not found", async () => {
    (userService.getOneUser as jest.Mock).mockResolvedValue(null);

    await loginController(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
  });

  it("should throw UnauthorizedError if password does not match", async () => {
    (userService.getOneUser as jest.Mock).mockResolvedValue({
      uuid: "123",
      password: "hashedPassword",
    });
    const { comparePassword } = require("../../../utils/password");
    comparePassword.mockResolvedValue(false);

    await loginController(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
  });
});
