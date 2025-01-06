import { generateToken } from "../generate";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

describe("generateToken", () => {
  it("should generate a token with the given uuid", () => {
    const mockUuid = "user-uuid";
    const mockToken = "mockToken";
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    const token = generateToken(mockUuid);

    expect(token).toBe(mockToken);
    expect(jwt.sign).toHaveBeenCalledWith(
      { uuid: mockUuid },
      expect.any(String),
      { expiresIn: expect.any(Number) }
    );
  });
});
