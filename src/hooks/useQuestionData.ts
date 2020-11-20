import { useEffect, useState } from "react";
import { QuestionData } from "../Backend/db-store/data";
import { IQuestionData } from "../Backend/model/Question-model";
import { getData } from "../Backend/services/database";

export function useQuestionData(): [
  IQuestionData[],
  React.Dispatch<React.SetStateAction<IQuestionData[]>>
] {
  const [questionData, setQuestionData] = useState<IQuestionData[]>(QuestionData);

  useEffect(() => {
    console.log("loaded from contextAPI");

    setQuestionData(QuestionData);
  }, []);

  return [questionData, setQuestionData];
}
