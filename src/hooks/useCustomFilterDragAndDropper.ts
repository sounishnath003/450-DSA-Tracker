import React from "react";
import { IQuestion } from "../Backend/model/Question-model";
import { countOfQuestionsCompletion } from "../Backend/services/database";
import { CustomCategoryFilterContext } from "../context/CustomCategoryFilterContext";
import {
  SET_AS_EASY_QUESTION,
  SET_AS_HARD_QUESTION,
  SET_AS_MEDIUM_QUESTION
} from "../Reducer/customCategoryFilterReducer";

type IReturnUseCustomFilterDnDHook = {
  routes: ICategoryRoute[];
  onDragOver: (e: React.DragEvent<HTMLDivElement>, payload: IQuestion) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, payload: IQuestion) => void;
};

type ICategoryRoute = { path: string; categoryType: string };

export function useCustomFilterDragAndDropper(): IReturnUseCustomFilterDnDHook {
  const {
    dispatch,
    easyQuestions,
    mediumQuestions,
    hardQuestions,
  } = React.useContext(CustomCategoryFilterContext);

  // *** Dragable questionState ***
  const [count, setCount] = React.useState(0);

  // ** Important routes for CustomCategory...
  const routes: ICategoryRoute[] = [
    {
      path: "category-lists/easy",
      categoryType: `Easy ${easyQuestions.length}`,
    },
    {
      path: "category-lists/medium",
      categoryType: `Medium ${mediumQuestions.length}`,
    },
    {
      path: "category-lists/hard",
      categoryType: `Hard ${hardQuestions.length}`,
    },
    { path: "track/progress", categoryType: `Solved ${count}/450` },
  ];

  React.useEffect(() => {
    return countOfQuestionsCompletion(setCount);
  }, []);

  // * draggable events start

  // ** OnDragOver Event - while user holding state...
  function onDragOver(e: React.DragEvent<HTMLDivElement>, payload: IQuestion) {
    e.stopPropagation();
    e.preventDefault();
  }

  // * OnDrop Event - when user dropped on the target
  function onDrop(e: React.DragEvent<HTMLDivElement>, payload: IQuestion) {
    e.stopPropagation();
    const dropZone = e.currentTarget.id;
    console.log({ dropZone });
    if (dropZone === "easy") {
      dispatch({
        type: SET_AS_EASY_QUESTION,
        payload: { data: payload },
      });
    } else if (dropZone === "medium") {
      dispatch({
        type: SET_AS_MEDIUM_QUESTION,
        payload: { data: payload },
      });
    } else if (dropZone === "hard") {
      dispatch({
        type: SET_AS_HARD_QUESTION,
        payload: { data: payload },
      });
    }
  }

  return {
    routes,
    onDragOver,
    onDrop,
  };
}
