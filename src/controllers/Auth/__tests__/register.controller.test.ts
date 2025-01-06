import { registerController } from "../register.controller";
import { userService } from "../../../services";
import httpStatus from "http-status";

jest.mock("../../../services");
jest.mock("../../../utils/encrypt", () => ({
  encryptPassword: jest.fn(() => "hashedPassword"),
}));
jest.mock("../../../utils/generate", () => ({
  generateToken: jest.fn(() => "mockToken"),
}));

describe("registerController", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        username: "testuser",
        email: "test@example.com",
        password: "password",
      },
    };
    res = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it("should return user and token on successful registration", async () => {
    (userService.createUser as jest.Mock).mockResolvedValue({
      uuid: "123",
      username: "testuser",
      email: "test@example.com",
    });

    await registerController(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      user: { uuid: "123", username: "testuser", email: "test@example.com" },
      token: "mockToken",
    });
    expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED);
  });
});
