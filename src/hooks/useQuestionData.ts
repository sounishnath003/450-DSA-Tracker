import { useEffect, useState } from "react";
import { QuestionData } from "../Backend/db-store/data";
import { IQuestionData } from "../Backend/model/Question-model";

export function useQuestionData(): [
  IQuestionData[],
  React.Dispatch<React.SetStateAction<IQuestionData[]>>
] {
  const [questionData, setQuestionData] = useState<IQuestionData[]>(
    QuestionData
  );

  useEffect(() => {
    setQuestionData(QuestionData);
  }, []);

  return [questionData, setQuestionData];
}
