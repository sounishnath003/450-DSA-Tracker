import { QuestionData } from "../Backend/db-store/data";
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
    key: string;
    index: number;
    questionSelected: IQuestion;
  };
}

enum Types {
  COMPLETED = "COMPLETED",
  RANDOM = "RANDOM",
  SEARCH_ON = "SEARCH_ON",
}

export function reducer(state: any, action: IAction) {
  if (Types.COMPLETED === action.type) {
    const { key, index, questionSelected } = action.payload;

    const quesPromise = Promise.resolve(findDocByKey(key));
    quesPromise.then((questionTopic) => {
      // let idx: number = questionTopic.questions.indexOf(questionSelected);

      const updatedQuestionsData: IQuestion = {
        Topic: questionSelected.Topic,
        Problem: questionSelected.Problem,
        URL: questionSelected.URL,
        Done: true,
      };

      questionTopic.questions[index] = updatedQuestionsData;

      const updatedData: IQuestionData = {
        doneQuestions: questionTopic.doneQuestions + 1,
        topicName: questionTopic.topicName,
        started: true,
        position: questionTopic.position,
        questions: questionTopic.questions,
      };

      // updateDocumentState(key, updatedData);
    });

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
