import { Router } from "express";
import { User } from "../../../database/schema/users.schema";
import {
  createError,
  generateAccessToken,
  Next,
  RequestInterface,
  ResponseInterface,
  SUCCESS,
} from "../../utils";

interface LoginInterface {
  username: string;
  password: string;
}

const router = Router();
// [POST]: Login User
router.post(
  "/",
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const payload: LoginInterface = req.body as LoginInterface;
      const isUserExists = await User.findOne({ username: payload.username });

      if (isUserExists === null)
        throw new createError.NotFound(
          "You are not registed! Please Signup first!"
        );

      const doesPasswordMatched = await (User as any).isPasswordCorrect(
        payload.password
      );

      if (!doesPasswordMatched) {
        throw new createError.Unauthorized(
          "Username / Password not valid! Please try again!"
        );
      }

      const accessToken: string = await generateAccessToken(isUserExists.id);

      return res.status(202).send({
        ...SUCCESS,
        isLoggedIn: true,
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
