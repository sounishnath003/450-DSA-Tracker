import React from "react";
import { IQuestion } from "../Backend/model/Question-model";
import { CustomCategoryFilterContext } from "../context/CustomCategoryFilterContext";
import {
  SET_AS_EASY_QUESTION,
  SET_AS_MEDIUM_QUESTION,
  SET_AS_HARD_QUESTION,
} from "../Reducer/customCategoryFilterReducer";

type IReturnUseCustomFilterDnDHook = {
  routes: ICategoryRoute[];
  onDragOver: (e: React.DragEvent<HTMLDivElement>, payload: IQuestion) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, payload: IQuestion) => void;
};

type ICategoryRoute = { path: string; categoryType: string };

export function useCustomFilterDragAndDropper(): IReturnUseCustomFilterDnDHook {
  const { dispatch } = React.useContext(CustomCategoryFilterContext);

  // *** Dragable questionState ***
  const [draggedQuestion, _setDraggedQuestion] = React.useState<IQuestion>();

  // ** Important routes for CustomCategory...
  const routes: ICategoryRoute[] = [
    { path: "category-lists/easy", categoryType: "Easy" },
    { path: "category-lists/medium", categoryType: "Medium" },
    { path: "category-lists/hard", categoryType: "Hard" },
  ];

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
