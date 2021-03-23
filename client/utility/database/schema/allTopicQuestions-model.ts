// AllTopicQuestions Model;

import { model, Schema } from "mongoose";
import { IAllTopicQuestion } from "../../models/allTopicQuestion.model";

const AllTopicQuestionsSchema: Schema<IAllTopicQuestion> = new Schema({
  topicName: { type: Schema.Types.String },
  position: { type: Schema.Types.Number },
  started: { type: Schema.Types.Boolean },
  doneQuestions: { type: Schema.Types.Number },
  questions: { type: Schema.Types.Array },
  user: { type: Schema.Types.ObjectId },
});

const AllTopicQuestions = model<IAllTopicQuestion>(
  "allTopicQuestions",
  AllTopicQuestionsSchema
);

export { AllTopicQuestions };
