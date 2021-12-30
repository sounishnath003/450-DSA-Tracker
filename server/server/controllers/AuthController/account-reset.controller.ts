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

router.put(
  "/reset",
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const payload: { username: string; newpassword: string } = req.body;
      const isUserExists = await User.findOne({
        username: payload.username,
      });
      console.log({ isUserExists });

      if (isUserExists === null)
        throw new createError.NotFound(
          "You are not registed! Please Signup first!"
        );

      isUserExists.password = generateHashedPassword(payload.newpassword);
      await isUserExists.save();

      const accessToken: string = await generateAccessToken(isUserExists.id);

      return res
        .status(202)
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          expires: new Date(new Date().getTime() + 1000 * 3600 * 5),
        })
        .cookie("isLoggedIn", "true", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          expires: new Date(new Date().getTime() + 1000 * 3600 * 5),
        })
        .cookie("isAuthenticated", "true", {
          secure: true,
          sameSite: "none",
          expires: new Date(new Date().getTime() + 1000 * 3600 * 5),
        })
        .send({
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
