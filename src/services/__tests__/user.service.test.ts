import { AppDataSouce } from "../../db";
import * as userService from "../user.service";

jest.mock("../../db");

describe("User Service", () => {
  let userRepository;

  beforeAll(() => {
    userRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    AppDataSouce.getRepository = jest.fn(() => userRepository);
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      userRepository.findOne.mockResolvedValue(null);
      userRepository.create.mockReturnValue({
        uuid: "user-uuid",
        email: "test@example.com",
      });
      userRepository.save.mockResolvedValue({
        uuid: "user-uuid",
        email: "test@example.com",
      });

      const user = await userService.createUser({
        username: "testuser",
        email: "test@example.com",
        password: "password",
      });

      expect(user).toEqual({ uuid: "user-uuid", email: "test@example.com" });
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      expect(userRepository.create).toHaveBeenCalledWith({
        username: "testuser",
        email: "test@example.com",
        password: "password",
      });
      expect(userRepository.save).toHaveBeenCalledWith({
        uuid: "user-uuid",
        email: "test@example.com",
      });
    });

    it("should return null if user already exists", async () => {
      userRepository.findOne.mockResolvedValue({
        uuid: "user-uuid",
        email: "test@example.com",
      });

      const user = await userService.createUser({
        username: "testuser",
        email: "test@example.com",
        password: "password",
      });

      expect(user).toBeNull();
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
    });
  });

  describe("getOneUser", () => {
    it("should return a user by email", async () => {
      userRepository.findOne.mockResolvedValue({
        uuid: "user-uuid",
        email: "test@example.com",
      });

      const user = await userService.getOneUser({ email: "test@example.com" });

      expect(user).toEqual({ uuid: "user-uuid", email: "test@example.com" });
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
    });

    it("should return null if user not found", async () => {
      userRepository.findOne.mockResolvedValue(null);

      const user = await userService.getOneUser({ email: "test@example.com" });

      expect(user).toBeNull();
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
    });
  });
});
