import { UnauthorizedError } from "../../errors/unauthorized.error";
import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { generateToken } from "../../utils/generate";
import { comparePassword } from "../../utils/password";
import httpStatus from "http-status";

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.getOneUser({ email });
  if (!user) throw new UnauthorizedError("Invalid email or password");
  if (user.deletedAt) return null;
  const compare = await comparePassword(password, user.password);
  if (!compare) throw new UnauthorizedError("Invalid email or password");
  const token = generateToken(user.uuid);
  res.json({ token, user }).status(httpStatus.ACCEPTED);
};

export const loginController = errorHandlerWrapper(loginHandler);
