import jwt from "jsonwebtoken";
import { Env } from "../env";

interface TokenPayload {
  id: string;
}

export const generateToken = (payload: TokenPayload): string => {
  const { secretKey } = Env;

  return jwt.sign(payload, secretKey, {
    expiresIn: "24h", // Token expires in 24 hours
  });
};
