import { Document } from "mongoose";
import { IUser } from "./user.model";

export interface IAllTopicQuestion extends Document {
  topicName: string;
  position: number;
  started: boolean;
  doneQuestions: number;
  questions: IQuestion[];
  user: IUser["_id"];
}

export interface IQuestion {
  Topic: string;
  Problem: string;
  Done: boolean;
  URL: string;
  code?: string;
  haveSolution?: boolean;
}
