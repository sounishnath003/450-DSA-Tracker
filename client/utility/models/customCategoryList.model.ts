import { Document } from "mongoose";
import { IQuestion } from "./allTopicQuestion.model";

export interface ICustomCategoryList extends Document {
  easy: IQuestion[];
  medium: IQuestion[];
  hard: IQuestion[];
}
