import {Router} from "express";
import {AllTopicQuestions} from "../../../database/schema/alltopicquestions.schema";
import {AllTopicQuestion} from "../../interfaces";
import {createError, Next, RequestInterface, ResponseInterface, SUCCESS,} from "../../utils";
import {requiresAuth} from "../middlerwares/requires-auth.middleware";

const router = Router();

/** Getting List Of Questions for the User */
router.get(
    "/all",
    requiresAuth,
    async (req: RequestInterface, res: ResponseInterface, next: Next) => {
        try {
            const userId: string = (req as any).userId as string;

            const allQuestions: AllTopicQuestion = (await AllTopicQuestions.findOne({
                userId,
            })) as unknown as AllTopicQuestion;

            if (allQuestions === null) {
            }

            return res.status(202).send({
                ...SUCCESS,
                questions: allQuestions.questions,
            });
        } catch (error) {
            next(error);
        }
    }
);

/** Get Specific Topic Questions */
router.get(
    "/topic/:topicName",
    requiresAuth,
    async (req: RequestInterface, res: ResponseInterface, next: Next) => {
        try {
            const userId: string = (req as any).userId as string;
            const allTopicData: AllTopicQuestion = (await AllTopicQuestions.findOne({
                userId,
            })) as unknown as AllTopicQuestion;

            const topicName: string = req.params.topicName;

            const questions: AllTopicQuestionInterface[] =
                allTopicData.questions.filter(
                    (q: AllTopicQuestionInterface) => q.topicName === topicName
                );

            return res.status(202).send({
                ...SUCCESS,
                message: `All ${topicName} questions are listed!!`,
                questions,
                count: questions.length
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
            const payload = req.body;

            if (!payload)
                throw new createError.NotAcceptable(
                    "Please update your progress status correctly!"
                );

            const doc = await AllTopicQuestions.findOne({userId});
            if (doc !== null) {
                doc.questions = payload;
                await doc.save();

                console.log({doc})
            }

            return res.status(202).send({
                ...SUCCESS,
                message: "User progress has been recorded successfully!",
            });
        } catch (error) {
            next(error);
        }
    }
);

export default router;
