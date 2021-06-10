import { Router } from "express";
import { Types } from "mongoose";
import { AllTopicQuestions } from "../../../database/schema/alltopicquestions.schema";
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
import { QuestionData } from "./data/450DSA-questions";

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

      /**
       * My duty is to populate all 450 question to the user
       */

      const userId: string = savedUser.id;
      const ds450Payload = new AllTopicQuestions({
        questions: [...QuestionData],
        userId: Types.ObjectId(userId),
      });

      await ds450Payload.save();

      const accessToken = await generateAccessToken(savedUser.id);

      return res
        .status(202)
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          sameSite: "strict",
          expires: new Date(new Date().getTime() + 1000 * 3600 * 5),
        })
        .cookie("isLoggedIn", "true", {
          httpOnly: true,
          sameSite: "strict",
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
