import React from "react";
import { IQuestion } from "../../Backend/model/Question-model";
import { useCategory } from "../../context/CategoryContext";

type DragEvent =
  | React.DragEvent<HTMLDivElement>
  | React.DragEvent<HTMLTableRowElement>;

async function _fetch(type: string, payload: IQuestion[]): Promise<Response> {
  return await fetch(`/proxy/api/category/${type}/update`, {
    method: "POST",
    credentials: "include",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export default function useDragDropHook() {
  const { dispatch, easyQuestions, dismiss, mediumQuestions, hardQuestions } =
    useCategory();

  React.useEffect(() => {}, [dispatch]);

  // * OnDragStart Event - user start dragging questions
  function onDragStart(event: DragEvent, payload: IQuestion) {
    event.stopPropagation();
    setTimeout(() => {
      localStorage.setItem("draggedItem", JSON.stringify(payload));
    }, 0);
  }

  // ** OnDragOver Event - while user holding state...
  function onDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  // ** OnDrop - when user drop held question onto div
  async function onDrop(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    const dropZone: string = event.currentTarget.id;
    const draggedQuestion = JSON.parse(
      localStorage.getItem("draggedItem") as string
    );
    localStorage.clear();
    if (draggedQuestion === undefined) {
      console.error("Man... I am empty", draggedQuestion);
    }
    if (dropZone === "easy") {
      const updatedQuestionLists: IQuestion[] = [
        ...easyQuestions,
        draggedQuestion,
      ];
      await _fetch(dropZone, updatedQuestionLists).catch((e) =>
        alert(e.message)
      );
      dispatch({
        type: "CAT_EASY",
        payload: {
          questions: updatedQuestionLists,
          message: "Question has been added to the easy category!",
        },
      });
    } else if (dropZone === "medium") {
      const updatedQuestionLists: IQuestion[] = [
        ...mediumQuestions,
        draggedQuestion,
      ];
      await _fetch(dropZone, updatedQuestionLists).catch((e) =>
        alert(e.message)
      );
      dispatch({
        type: "CAT_MEDIUM",
        payload: {
          questions: updatedQuestionLists,
          message: "Question has been added to the medium category!",
        },
      });
    } else if (dropZone === "hard") {
      const updatedQuestionLists: IQuestion[] = [
        ...hardQuestions,
        draggedQuestion,
      ];
      await _fetch(dropZone, updatedQuestionLists).catch((e) =>
        alert(e.message)
      );
      dispatch({
        type: "CAT_HARD",
        payload: {
          questions: updatedQuestionLists,
          message: "Question has been added to the hard category!",
        },
      });
    }
    dismiss(() => dispatch({ type: "RESET" }), 3);
  }

  return {
    onDrop,
    onDragOver,
    onDragStart,
  };
}
