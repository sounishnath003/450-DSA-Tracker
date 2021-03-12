import { MARK_AS_COMPLETE, UPLOAD_CODE_SOLUTION } from "../actions";
import { IQuestion, IQuestionData } from "../Backend/model/Question-model";

type IAction = {
  type: string;
  payload: any;
};

export interface IQuestionDataContextState {
  allTopicsData: IQuestionData[];
  updateData: (
    key: string,
    topicData: IQuestionData,
    topicPosition: number
  ) => void;
  questionActionDispatcher: React.Dispatch<any>;
}

export const initialState: IQuestionDataContextState = {
  allTopicsData: [],
  updateData: (
    key: string,
    topicData: IQuestionData,
    topicPosition: number
  ) => {},
  questionActionDispatcher: (value: any) => {},
};

export function questionDataReducer(
  state: IQuestionDataContextState = initialState,
  action: IAction
): IQuestionDataContextState {
  switch (action.type) {
    case MARK_AS_COMPLETE:
      const { selected, questionData, updateData, index } = action.payload;
      const key: string = questionData.topicName;

      let newQuestion = [...selected];
      let updatedQuestionStats = questionData.questions.map(
        (question: IQuestion, qIndex: number) => {
          if (index === qIndex) {
            question.Done = !question.Done;
            if (question.Done === true) {
              newQuestion.push(qIndex);
            } else {
              newQuestion.splice(newQuestion.indexOf(qIndex), 1);
            }
            return { ...question };
          } else {
            return { ...question };
          }
        }
      );

      updateData(
        key,
        {
          ...questionData,
          // topicName: questionData.topicName,
          started: newQuestion.length > 0 ? true : false,
          doneQuestions: newQuestion.length,
          questions: updatedQuestionStats,
        } as IQuestionData,
        questionData.position
      );
      const updateAllTopicData = state.allTopicsData.filter(
        (qdata) => qdata.position !== questionData.position
      );
      updateAllTopicData.push({
        topicName: questionData.topicName,
        started: newQuestion.length > 0 ? true : false,
        doneQuestions: newQuestion.length,
        questions: updatedQuestionStats,
        position: questionData.position,
      });

      return {
        ...state,
        allTopicsData: updateAllTopicData,
      };

    case UPLOAD_CODE_SOLUTION: {
      const { updateData, updatedQuestionState, questionData } = action.payload;

      updateData(
        questionData.topicName,
        {
          ...questionData,
          questions: updatedQuestionState,
        },
        questionData.position
      );

      return state;
    }
    default:
      return state;
  }
}
