import React from "react";
import env from "../../env";
import { ActionType } from "../../reducer/action-type";
import {
  categoryFilterReducer,
  CategoryFilterState,
  initialCategoryFilterState,
} from "../../reducer/category-filter.reducer";
import { useQuestion } from "../QuestionContext";

interface useHookInterface {
  categoryFilterState: CategoryFilterState;
  dispatch: React.Dispatch<ActionType>;
}

const abortController: AbortController = new AbortController();

const urls = [
  fetch(`${env.API_URL}/api/category/easy/all`, {
    credentials: "include",
    signal: abortController.signal,
  }),
  fetch(`${env.API_URL}/api/category/medium/all`, {
    credentials: "include",
    signal: abortController.signal,
  }),
  fetch(`${env.API_URL}/api/category/hard/all`, {
    credentials: "include",
    signal: abortController.signal,
  }),
];

export function useHook(): useHookInterface {
  const { allQuestions } = useQuestion();
  const [categoryFilterState, dispatch] = React.useReducer(
    categoryFilterReducer,
    initialCategoryFilterState
  );

  async function getAllCategoryListsQuestions() {
    const [easyResp, mediumResp, hardResp] = await Promise.all(urls);
    const easyQuestions = (await easyResp.json()).categorizedQuestions;
    const mediumQuestions = (await mediumResp.json()).categorizedQuestions;
    const hardQuestions = (await hardResp.json()).categorizedQuestions;

    dispatch({
      type: "GET_ALL_CATEGORY_LISTS",
      payload: { easyQuestions, mediumQuestions, hardQuestions },
    });
  }

  React.useEffect(() => {
    if (allQuestions.length > 0) getAllCategoryListsQuestions();
    return () => abortController.abort();
  }, [allQuestions]);

  return { categoryFilterState, dispatch };
}
