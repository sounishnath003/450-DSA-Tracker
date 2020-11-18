import { IQuestion, IQuestionData } from "../Backend/model/Question-model";

export const defaultQuesStat = {
  isSelected: false,
  questionTableData: [],
};

interface IAction {
  type: string;
  payload: {
    key: string;
    id: number;
    questionData: IQuestionData;
  };
}

enum Types {
  COMPLETED = "COMPLETED",
  RANDOM = "RANDOM",
}

export function reducer(state: any, action: IAction) {
  if (Types.COMPLETED === action.type) {
    const { key, id, questionData } = action.payload;

    let updatedQuestionStatus = questionData.questions.map(
      (question: IQuestion, index: number) => {
        if (index === id) {
          question.Done = true;
          if (question.Done) {
          }
        }
      }
    );

    return {
      ...state,
      isSelected: true,
      questionTableData: [],
      payload: "",
    };
  } else if (action.type === Types.RANDOM) {
    return state;
  }
}
