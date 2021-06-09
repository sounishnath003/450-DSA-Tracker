import { Router } from "express";
import { User } from "../../../database/schema/users.schema";
import {
  createError,
  generateAccessToken,
  generateHashedPassword,
  Next,
  RequestInterface,
  ResponseInterface,
  SUCCESS,
} from "../../utils";

const router = Router();

interface SignupInterface {
  username: string;
  password: string;
}

router.post(
  "/",
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const payload: SignupInterface = req.body as SignupInterface;

      if (!payload.username || !payload.password)
        throw new createError.BadRequest(
          "Please ensure your username / password filled up correctly"
        );

      // check user already exists or not
      const isUserExists = await User.findOne({ username: payload.username });
      if (isUserExists)
        throw new createError.Conflict(
          `${payload.username} is already been registered`
        );

      const finalPayload = {
        ...payload,
        password: generateHashedPassword(payload.password),
      };

      const user = new User(finalPayload);
      const savedUser = await user.save();

      const accessToken = await generateAccessToken(savedUser.id);

      return res.status(202).send({
        ...SUCCESS,
        accessToken,
        isLoggedIn: true,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
