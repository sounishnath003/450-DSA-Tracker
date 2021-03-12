import { IQuestionData } from "../Backend/model/Question-model";

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
  state: any,
  action: any
): IQuestionDataContextState {
  return state;
}
