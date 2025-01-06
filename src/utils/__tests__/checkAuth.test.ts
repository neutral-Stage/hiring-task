import { checkAuth } from "../checkAuth";
import { userService } from "../../services";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../../errors/unauthorized.error";

jest.mock("../../services");
jest.mock("jsonwebtoken");

describe("checkAuth", () => {
  let req, res, next;

  beforeEach(() => {
    req = { header: jest.fn().mockReturnValue("Bearer token") };
    res = {};
    next = jest.fn();
  });

  it("should call next with user data if token is valid", async () => {
    const mockUser = { uuid: "user-uuid" };
    (jwt.verify as jest.Mock).mockReturnValue({ uuid: "user-uuid" });
    (userService.getOneUser as jest.Mock).mockResolvedValue(mockUser);

    await checkAuth(req, res, next);

    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalledWith();
  });

  it("should call next with UnauthorizedError if token is invalid", async () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error();
    });

    await checkAuth(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
  });
});
