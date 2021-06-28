import {ActionType} from "./action-type";
import {IQuestion, IQuestionData} from "../Backend/model/Question-model";
import React from "react";

export interface QuestionDataState {
    loading: boolean;
    error: string | null;
    message: string | null;
    allQuestions: IQuestionData[],
    selectedTopicIndex: number | null;
    selectedTopic: string | null;
    selectedTopicQuestions: IQuestion[] | null;
    dispatch: React.Dispatch<ActionType>;
    totalSolvedQuestion: number;
    dismiss: (callback: ()=>void, seconds: number) => void;
}

export const initialQuestionData: QuestionDataState = {
    loading: true,
    error: null,
    message: null,
    allQuestions: [],
    selectedTopicIndex: null,
    selectedTopic: null,
    totalSolvedQuestion: 0,
    selectedTopicQuestions: null,
    dispatch: ({}: ActionType) => {
    },
    dismiss: function (callback: Function, seconds: number) {
        setTimeout(() => {
            callback()
        }, seconds * 1000);
    }

}

export function questionReducer(state: QuestionDataState = initialQuestionData, action: ActionType) {
    switch (action.type) {
        case "LOADING": {
            return {
                ...state,
                loading: true
            }
        }

        case "ERROR": {
            return {
                ...state,
                error: action.payload
            }
        }

        case "GET_ALL_QUESTIONS": {
            return {
                ...state,
                loading: false,
                allQuestions: action.payload.questions,
                totalSolvedQuestion: action.payload.tsq
            }
        }

        case "SELECT_QUESTION_TOPIC": {
            return {
                ...state,
                selectedTopicIndex: action.payload.index,
                selectedTopic: action.payload.questionTopic.topicName,
                selectedTopicQuestions: action.payload.questionTopic.questions
            }
        }

        case "UPDATE_PROGRESS": {
            return {
              ...state,
              message: action.payload.message,
              allQuestions: action.payload.allQuestions,
              selectedTopicQuestions: action.payload.selectedTopicQuestions,
              totalSolvedQuestion: action.payload.totalQuestionSolved,
            };
        }

        case "RESET": {
            return {
                ...state,
                error: null,
                message: null
            }
        }

        default:
            return state;
    }
}