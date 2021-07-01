import React from "react";
import { IQuestion } from "../Backend/model/Question-model";
import { ActionType } from "./action-type";

export interface CategoryFilterState {
  error: string | null;
  message: string | null;
  easyQuestions: IQuestion[];
  mediumQuestions: IQuestion[];
  hardQuestions: IQuestion[];
  selectedCategoryType: string | null;
  selectedCategoryQuestions: IQuestion[] | null;
  dispatch: React.Dispatch<ActionType>;
  dismiss: (callback: () => void, seconds: number) => void;
}

export const initialCategoryFilterState: CategoryFilterState = {
  error: null,
  message: null,
  easyQuestions: [],
  mediumQuestions: [],
  hardQuestions: [],
  selectedCategoryType: null,
  selectedCategoryQuestions: null,
  dispatch: function ({}: ActionType) {},
  dismiss: function (callback: () => void, seconds: number) {
    setTimeout(() => {
      callback();
    }, seconds * 1000);
  },
};

export function categoryFilterReducer(
  state: CategoryFilterState,
  action: ActionType
): CategoryFilterState {
  switch (action.type) {
    case "GET_ALL_CATEGORY_LISTS": {
      return {
        ...state,
        easyQuestions: action.payload.easyQuestions,
        mediumQuestions: action.payload.mediumQuestions,
        hardQuestions: action.payload.hardQuestions,
      };
    }

    case "ON_CATEGORY_SELECT": {
      return {
        ...state,
        selectedCategoryType: action.payload.selectedCategoryType,
        selectedCategoryQuestions: action.payload.selectedCategoryQuestions,
      };
    }

    case "CAT_EASY": {
      return {
        ...state,
        easyQuestions: action.payload.questions,
        message: action.payload.message,
      };
    }

    case "CAT_MEDIUM": {
      return {
        ...state,
        mediumQuestions: action.payload.questions,
        message: action.payload.message,
      };
    }

    case "CAT_HARD": {
      return {
        ...state,
        hardQuestions: action.payload.questions,
        message: action.payload.message,
      };
    }

    case "ERROR": {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case "ON_CAT_QUESTION_DELETE": {
      return {
        ...state,
        easyQuestions: action.payload.questions.easy,
        mediumQuestions: action.payload.questions.medium,
        hardQuestions: action.payload.questions.hard,
        error: action.payload.message,
      };
    }

    case "RESET": {
      return {
        ...state,
        error: null,
        message: null,
      };
    }

    default: {
      return state;
    }
  }
}
