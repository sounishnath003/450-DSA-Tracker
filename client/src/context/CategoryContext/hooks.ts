import React from "react";
import { ActionType } from "../../reducer/action-type";
import {
    categoryFilterReducer,
    CategoryFilterState,
    initialCategoryFilterState
} from "../../reducer/category-filter.reducer";

interface useHookInterface {
  categoryFilterState: CategoryFilterState;
  dispatch: React.Dispatch<ActionType>;
}

export function useHook(): useHookInterface {
  const [categoryFilterState, dispatch] = React.useReducer(
    categoryFilterReducer,
    initialCategoryFilterState
  );

  async function getAllCategoryListsQuestions(
    abortController: AbortController
  ) {
    const urls = [
      fetch(`/proxy/api/category/easy/all`, {
        credentials: "include",
        signal: abortController.signal,
      }),
      fetch(`/proxy/api/category/medium/all`, {
        credentials: "include",
        signal: abortController.signal,
      }),
      fetch(`/proxy/api/category/hard/all`, {
        credentials: "include",
        signal: abortController.signal,
      }),
    ];
    const [easyPromise, mediumPromise, hardPromise] = await Promise.all(urls);
    if (
      easyPromise.ok === false ||
      mediumPromise.ok === false ||
      hardPromise.ok === false
    ) {
      await getAllCategoryListsQuestions(abortController);
    } else {
      const easyQuestions = (await easyPromise.json()).categorizedQuestions;
      const mediumQuestions = (await mediumPromise.json()).categorizedQuestions;
      const hardQuestions = (await hardPromise.json()).categorizedQuestions;

      dispatch({
        type: "GET_ALL_CATEGORY_LISTS",
        payload: { easyQuestions, mediumQuestions, hardQuestions },
      });
    }
  }

  React.useEffect(() => {
    const abortController: AbortController = new AbortController();
    getAllCategoryListsQuestions(abortController);
    return () => abortController.abort();
  }, []);

  return { categoryFilterState, dispatch };
}
