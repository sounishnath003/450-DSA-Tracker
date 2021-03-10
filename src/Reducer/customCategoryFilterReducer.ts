import { IQuestion } from "../Backend/model/Question-model";

export const SET_AS_EASY_QUESTION = `[SET_AS_EASY_QUESTION] set as EASY level`;
export const SET_AS_MEDIUM_QUESTION = `[SET_AS_MEDIUM_QUESTION] set as MEDIUM level`;
export const SET_AS_HARD_QUESTION = `[SET_AS_HARD_QUESTION] set as HARD level`;

export interface CustomCategoryFilterState {
  easyQuestions: IQuestion[];
  mediumQuestions: IQuestion[];
  hardQuestions: IQuestion[];
  dispatch: React.Dispatch<any>;
}

export const initialState: CustomCategoryFilterState = {
  easyQuestions: [],
  mediumQuestions: [],
  hardQuestions: [],
  dispatch: (value: any) => {},
};

export function customCategoryFilterReducer(
  state: CustomCategoryFilterState = initialState,
  action: any
): CustomCategoryFilterState {
  switch (action.type) {
    case SET_AS_EASY_QUESTION:
      console.log({ action });
      return {
        ...state,
        easyQuestions: [action.payload.data, ...state.easyQuestions],
      };

    case SET_AS_MEDIUM_QUESTION:
      return {
        ...state,
        mediumQuestions: [action.payload.data, ...state.mediumQuestions],
      };

    case SET_AS_HARD_QUESTION:
      return {
        ...state,
        hardQuestions: [action.payload.data, ...state.hardQuestions],
      };

    default:
      return state;
  }
}
