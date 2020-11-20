import React from "react";
import { IQuestionData } from "../Backend/model/Question-model";

export const QuestionDataContext = React.createContext<IQuestionData[]>([]);
