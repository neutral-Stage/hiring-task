import { Request, Response } from "express";
import { userService } from "../../services";
import { encryptPassword } from "../../utils/encrypt";
import { generateToken } from "../../utils/generate";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await encryptPassword(password);
    const user = await userService.createUser({ username, email, password: hashedPassword });
    const token = generateToken({ id: user.id });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};
