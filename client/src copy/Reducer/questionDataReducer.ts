import { QuestionData } from "../Backend/db-store/data";
import { IQuestionData } from "../Backend/model/Question-model";

interface ActionInterface {
  type: string;
  payload?: any;
}

export interface QuestionDataContextState {
  allTopicsData: IQuestionData[];
  updateData(
    parentIndex: number,
    updatedQuestionData: IQuestionData
  ): Promise<void>;
}

export const initialState: QuestionDataContextState = {
  allTopicsData: QuestionData,
  updateData: async (
    parentIndex: number,
    updatedQuestionData: IQuestionData
  ) => {},
};

export function questionDataReducer(
  state: QuestionDataContextState = initialState,
  action: ActionInterface
): QuestionDataContextState {
  return state;
}
