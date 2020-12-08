import { IQuestion } from "../../../Backend/model/Question-model";

// utility function()
function tableRowLogic(index: number, question: IQuestion): string {
  if (question.Done === true) {
    return `#5AFFA8`;
  }
  return index % 2 === 0 ? "white" : "#fff5fb";
}

export { tableRowLogic };
