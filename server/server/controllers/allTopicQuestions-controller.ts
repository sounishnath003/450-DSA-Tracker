import { Router } from "express";
import { Types } from "mongoose";
import { QuestionData } from "../data/450DSA-questions";
import { AllTopicQuestions } from "../database/schema/allTopicQuestions-model";
import { IAllTopicQuestion } from "../models/allTopicQuestion.model";
import { INTERNAL_SERVER_ERROR, OK } from "../utils";

const router = Router();

// * [GET] All Topic Questions List
router.get("/", async (req: any, res, next) => {
  const userID = req.oidc.user.sub.split("|")[1];
  try {
    res.setHeader("Content-Type", "application/json");
    await AllTopicQuestions.find((err: any, topics: IAllTopicQuestion) => {
      if (!err) {
        res.status(OK).send({ topics });
      } else {
        throw new Error(err);
      }
    });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send({ error });
  }
  next();
});

// * [POST] INSERT DATA
router.get("/create", async (req: any, res, next) => {
  const userID: string = req.oidc.user.sub.split("|")[1];
  const payload: IAllTopicQuestion = new AllTopicQuestions({
    questions: [...QuestionData],
    user: Types.ObjectId(userID),
  });
  try {
    res.setHeader("Content-Type", "application/json");
    payload.save((err, docs) => {
      if (!err) {
        res.redirect("/topics");
      } else {
        throw new Error(JSON.stringify(err, undefined, 3));
      }
    });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send({ error });
  }
  next();
});

export default router;
