import bcryptjs from "bcryptjs";

export const encryptPassword = async (password: string): Promise<string> => {
  return await bcryptjs.hash(password, 8);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcryptjs.compare(password, hashedPassword);
};
