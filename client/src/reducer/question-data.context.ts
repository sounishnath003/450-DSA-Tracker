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
}

export const initialQuestionData: QuestionDataState = {
    loading: true,
    error: null,
    message: null,
    allQuestions: [],
    selectedTopicIndex: null,
    selectedTopic: null,
    selectedTopicQuestions: null,
    dispatch: ({}: ActionType) => {
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
                allQuestions: action.payload.questions
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