import { comparePassword } from "../password";
import bcryptUtils from "bcryptjs";

jest.mock("bcryptjs");

describe("comparePassword", () => {
  it("should return true if passwords match", async () => {
    (bcryptUtils.compare as jest.Mock).mockResolvedValue(true);

    const result = await comparePassword("inputPassword", "hashPassword");

    expect(result).toBe(true);
    expect(bcryptUtils.compare).toHaveBeenCalledWith(
      "inputPassword",
      "hashPassword"
    );
  });

  it("should return false if passwords do not match", async () => {
    (bcryptUtils.compare as jest.Mock).mockResolvedValue(false);

    const result = await comparePassword("inputPassword", "hashPassword");

    expect(result).toBe(false);
    expect(bcryptUtils.compare).toHaveBeenCalledWith(
      "inputPassword",
      "hashPassword"
    );
  });
});
