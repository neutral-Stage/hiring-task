import { Request, Response } from "express";
import { userService } from "../../services";
import { comparePassword } from "../../utils/encrypt";
import { generateToken } from "../../utils/generate";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getOneUser({ email });
    
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ id: user.id });
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};
