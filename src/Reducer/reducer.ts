import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IQuestion, IQuestionData } from "../Backend/model/Question-model";

import {
  findDocByKey,
  getData,
  updateDocumentState,
} from "../Backend/services/database";

export const defaultQuesStat = {
  isSelected: false,
  questionTableData: [],
};

interface IAction {
  type: string;
  payload: {
    index: number;
    selected: number[];
    questionData: IQuestionData;
    updateData: Function;
  };
}

enum Types {
  COMPLETED = "COMPLETED",
  RANDOM = "RANDOM",
  SEARCH_ON = "SEARCH_ON",
}

export function reducer(state: any, action: IAction) {
  if (Types.COMPLETED === action.type) {
    const { selected, questionData, updateData, index } = action.payload;
    const key: string = questionData.topicName;

    let newQuestion = [...selected];
    let updatedQuestionStats = questionData.questions.map(
      (question: IQuestion, qIndex: number) => {
        if (index === qIndex) {
          question.Done = true;
          if (question.Done === true) {
            newQuestion.push(qIndex);
          } else {
            newQuestion.splice(newQuestion.indexOf(qIndex), 1);
          }
          return question;
        } else {
          return question;
        }
      }
    );

    updateData(
      key,
      {
        started: newQuestion.length > 0 ? true : false,
        doneQuestions: newQuestion.length,
        questions: updatedQuestionStats,
      },
      questionData.position
    );
    toast.success("Awesome Done✨🎉");

    return {
      ...state,
      isSelected: true,
      questionTableData: [...state.questionTableData],
      payload: "",
    };
  } else if (action.type === Types.RANDOM) {
    return state;
  }
}
