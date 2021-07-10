// AllTopicQuestions Model;

import { model, Schema } from "mongoose";

import { Document } from "mongoose";
import { IUser } from "./users.schema";

export interface IAllTopicQuestion extends Document {
  topicName: string;
  position: number;
  started: boolean;
  doneQuestions: number;
  questions: IQuestion[];
  userId: IUser["_id"];
}

export interface IQuestion {
  Topic: string;
  Problem: string;
  Done: boolean;
  URL: string;
  code?: string;
  haveSolution?: boolean;
}

const AllTopicQuestionsSchema: Schema<IAllTopicQuestion> = new Schema({
  topicName: { type: Schema.Types.String },
  position: { type: Schema.Types.Number },
  started: { type: Schema.Types.Boolean },
  doneQuestions: { type: Schema.Types.Number },
  questions: { type: Schema.Types.Array },
  userId: { type: Schema.Types.ObjectId },
});

const AllTopicQuestions = model<IAllTopicQuestion>(
  "allTopicQuestions",
  AllTopicQuestionsSchema
);

export { AllTopicQuestions };
