import { IQuestion } from "../../../Backend/model/Question-model";

// utility function()
function tableRowLogic(index: number, question: IQuestion): string {
  if (question.Done === true) {
    return `bg-green-400`;
  }
  return index % 2 === 0 ? "white" : "bg-red-100";
}

export { tableRowLogic };
