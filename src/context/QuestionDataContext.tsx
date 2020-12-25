import React from "react";
import { QuestionData } from "../Backend/db-store/data";
import { IQuestionData } from "../Backend/model/Question-model";

interface IContext {
  questionData: IQuestionData[];
  updateData: Function;
  singleQuestionData?: IQuestionData;
}

export const QuestionDataContext = React.createContext<IContext>({
  questionData: [],
  updateData: () => {},
  singleQuestionData: QuestionData[0],
});
