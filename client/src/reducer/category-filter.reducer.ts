import {ActionType} from "./action-type";
import {IQuestion} from "../Backend/model/Question-model";
import React from "react";

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
    dispatch: function ({}: ActionType) {
    },
    dismiss: function (callback: () => void, seconds: number) {
        setTimeout(() => {
            callback();
        }, seconds * 1000)
    }
}

export function categoryFilterReducer(state: CategoryFilterState, action: ActionType): CategoryFilterState {
    switch (action.type) {
        case "GET_ALL_CATEGORY_LISTS": {
            return {
                ...state,
                easyQuestions: action.payload.easyQuestions,
                mediumQuestions: action.payload.mediumQuestions,
                hardQuestions: action.payload.hardQuestions
            }
        }

        case "ON_CATEGORY_SELECT": {
            console.log({payload: action.payload})
            return {
                ...state,
                selectedCategoryType: action.payload.selectedCategoryType,
                selectedCategoryQuestions: action.payload.selectedCategoryQuestions
            }
        }

        default: {
            return state
        }
    }
}