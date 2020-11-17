import React from "react";
import { QuestionData } from "../Backend/db-store/data";
import { IQuestionData } from "../Backend/model/Question-model";

export const QuestionDataContext = React.createContext<IQuestionData[]>([]);
