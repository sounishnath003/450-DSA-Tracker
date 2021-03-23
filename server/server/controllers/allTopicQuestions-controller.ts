import { Router } from "express";
import { Types } from "mongoose";
import { QuestionData } from "../data/450DSA-questions";
import { AllTopicQuestions } from "../database/models/allTopicQuestions-model";
import { IAllTopicQuestion } from "../models/allTopicQuestion.model";
import { OK, INTERNAL_SERVER_ERROR } from "../utils";

const router = Router();

// * [GET] All Topic Questions List
router.get("/", async (req, res, next) => {
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
router.get("/create", async (req, res, next) => {
  const payload: IAllTopicQuestion = new AllTopicQuestions({
    questions: [...QuestionData],
    user: Types.ObjectId("6058e46c13f5490011b30d61"),
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
