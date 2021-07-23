import Cookie from "js-cookie";
import React from "react";
import { IQuestion, IQuestionData } from "../../Backend/model/Question-model";
import { AllTopicQuestionResponse } from "../../interfaces";
import { ActionType } from "../../reducer/action-type";
import {
    initialQuestionData,
    questionReducer
} from "../../reducer/question-data.context.reducer";

interface useHookInterface {
  allQuestionDataState: {
    error: any;
    loading: boolean;
    message: string | null;
    allQuestions: IQuestionData[];
    selectedTopicIndex: number | null;
    selectedTopic: string | null;
    selectedTopicQuestions: IQuestion[] | null;
    dispatch: React.Dispatch<ActionType>;
    totalSolvedQuestion: number;
    dismiss: (callback: () => void, seconds: number) => void;
  };
  dispatch: React.Dispatch<ActionType>;
  dismiss: (callback: Function, seconds: number) => void;
}

export function useHook(): useHookInterface {
  const [allQuestionDataState, dispatch] = React.useReducer(
    questionReducer,
    initialQuestionData
  );

  function dismiss(callback: Function, seconds: number) {
    setTimeout(() => {
      callback();
    }, seconds * 1000);
  }

  async function getAllQuestions(abortController: AbortController) {
    dispatch({ type: "LOADING" });
    const resp: AllTopicQuestionResponse = await (
      await fetch(`/proxy/api/questions/all`, {
        credentials: "include",
        signal: abortController.signal,
      })
    ).json();
    if (resp.error) {
      dispatch({ type: "ERROR", payload: resp.error.message });
      dismiss(() => dispatch({ type: "RESET" }), 5);
      if (resp.error.message === "User is not registered!!") {
        Cookie.remove("isAuthenticated");
        window.location.replace("/");
      } else
        setTimeout(() => {
          window.location.reload();
        }, 4);
    } else {
      let tsq = 0;
      for (const q of resp.questions) {
        tsq += q.doneQuestions;
      }
      dispatch({
        type: "GET_ALL_QUESTIONS",
        payload: { questions: resp.questions, tsq },
      });
    }
  }

  React.useEffect(() => {
    const abortController: AbortController = new AbortController();
    getAllQuestions(abortController);
    return () => abortController.abort();
  }, []);

  return { allQuestionDataState, dispatch, dismiss };
}
