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

// TODO
// ? **Needed to Store/call from IndexedStorage browser
// ** Not implemenented Till Now :-()

export const initialState: CustomCategoryFilterState = {
  easyQuestions: [],
  mediumQuestions: [],
  hardQuestions: [],
  dispatch: (value: any) => {},
};

// * CustomFilterationReducer State Reducer
// * @params {state: CustomCategoryFilterState, action: {type: any, payload: {data: any}}}

export function customCategoryFilterReducer(
  state: CustomCategoryFilterState = initialState,
  action: any
): CustomCategoryFilterState {
  console.log({ action });
  switch (action.type) {
    case SET_AS_EASY_QUESTION:
      if (state.easyQuestions.indexOf(action.payload.data) !== -1) {
        alert("question already added");
        break;
      }
      return {
        ...state,
        easyQuestions: [action.payload.data, ...state.easyQuestions],
      };

    case SET_AS_MEDIUM_QUESTION:
      if (state.mediumQuestions.indexOf(action.payload.data) !== -1) {
        alert("question already added");
        break;
      }
      return {
        ...state,
        mediumQuestions: [action.payload.data, ...state.mediumQuestions],
      };

    case SET_AS_HARD_QUESTION:
      if (state.hardQuestions.indexOf(action.payload.data) !== -1) {
        alert("question already added");
        break;
      }
      return {
        ...state,
        hardQuestions: [action.payload.data, ...state.hardQuestions],
      };

    default:
      return state;
  }
  return state;
}