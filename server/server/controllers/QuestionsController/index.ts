import { Router } from "express";
import createHttpError from "http-errors";
import { AllTopicQuestions } from "../../../database/schema/alltopicquestions.schema";
import {
  createError,
  Next,
  RequestInterface,
  ResponseInterface,
  SUCCESS,
} from "../../utils";
import { requiresAuth } from "../middlerwares/requires-auth.middleware";

const router = Router();

/** Getting List Of Questions for the User */
router.get(
  "/all",
  requiresAuth,
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const userId: string = (req as any).userId as string;

      const allQuestions = await AllTopicQuestions.findOne({ userId }) as any;

      if (allQuestions === null) {}

      return res.status(202).send({
        ...SUCCESS,
        questions: allQuestions.questions,
      });
    } catch (error) {
      next(error);
    }
  }
);

interface AllTopicQuestionInterface {
  topicName: string;
  position: number;
  started: boolean;
  doneQuestions: number;
  questions: QuestionInterface[];
  userId?: string;
}

interface QuestionInterface {
  Topic: string;
  Problem: string;
  Done: boolean;
  URL: string;
  code?: string;
  haveSolution?: boolean;
}

/** Updating The Progress */
router.patch(
  "/update-progress",
  requiresAuth,
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const userId: string = (req as any).userId as string;
      const payload = req.body as AllTopicQuestionInterface;

      if (!payload)
        throw new createError.NotAcceptable(
          "Please update your progress status correctly!"
        );

      await AllTopicQuestions.updateOne(
        { userId },
        { $set: payload },
        { upsert: true }
      );

      return res.status(202).send({
        ...SUCCESS,
        message: "User progress has been recorded succesfully!",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
