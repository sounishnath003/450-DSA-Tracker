import { type } from "os";
import { useEffect, useState } from "react";
import { QuestionData } from "../Backend/db-store/data";
import { IQuestionData } from "../Backend/model/Question-model";
import { getData } from "../Backend/services/database";

type TQuestionData = [
  IQuestionData[],
  React.Dispatch<React.SetStateAction<IQuestionData[]>>,
  Function
];

export function useQuestionData(): TQuestionData {
  const [questionData, setQuestionData] = useState<IQuestionData[]>([]);

  function updateData(
    key: number,
    topicData: IQuestionData[],
    topicPosition: number
  ) {
    let upData: any = questionData.map(
      (topic: IQuestionData, index: number) => {
        if (index == topicPosition) {
          // updateDBData(key, topicData);
          return {
            topicName: topic.topicName,
            position: topic.position,
            ...topicData,
          };
        } else {
          return topic;
        }
      }
    );
    setQuestionData(upData);
  }

  useEffect(() => {
    console.log("loaded from contextAPI");
    setQuestionData(QuestionData);
    getData(QuestionData);
  }, []);

  return [questionData, setQuestionData, updateData];
}
