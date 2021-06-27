import React from "react";
import {
  SET_AS_EASY_QUESTION,
  SET_AS_HARD_QUESTION,
  SET_AS_MEDIUM_QUESTION,
} from "../actions";
import { EasyIcon, HardIcon, MediumIcon, SavedIcon } from "../assets/icons";
import { IQuestion } from "../Backend/model/Question-model";
import { CustomCategoryFilterContext } from "../context/CustomCategoryFilterContext";

type IReturnUseCustomFilterDnDHook = {
  routes: ICategoryRoute[];
  onDragOver: (e: React.DragEvent<HTMLDivElement>, payload: IQuestion) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, payload: IQuestion) => void;
};

type ICategoryRoute = { path: string; categoryType: string; icon: JSX.Element };

export function useCustomFilterDragAndDropper(): IReturnUseCustomFilterDnDHook {
  const { dispatch, easyQuestions, mediumQuestions, hardQuestions } =
    React.useContext(CustomCategoryFilterContext);

  // *** Dragable questionState ***
  const [count, setCount] = React.useState<string>("-");

  // ** Important index for CustomCategory...
  const routes: ICategoryRoute[] = [
    {
      path: "category-lists/easy",
      icon: EasyIcon(),
      categoryType: `Easy ${easyQuestions.length}`,
    },
    {
      path: "category-lists/medium",
      icon: MediumIcon(),
      categoryType: `Medium ${mediumQuestions.length}`,
    },
    {
      path: "category-lists/hard",
      icon: HardIcon(),
      categoryType: `Hard ${hardQuestions.length}`,
    },
    {
      path: "track/progress",
      categoryType: `Solved ${count}`,
      icon: SavedIcon(),
    },
  ];

  React.useEffect(() => {
    return;
    setCount;
  }, [count]);

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
