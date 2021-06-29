// Typescript Module - Production requirement
import LBase from "localbase";
import { QuestionData } from "../db-store/data";
import { IQuestionData } from "../model/Question-model";
export const db: any = new LBase.default("db");

const DSA_450_TABLE = `450dsaArchive`;

function formatKeys(key: string): string {
  return key.replace(/[^A-Z0-9]+/gi, "_").toLowerCase();
}

// life saver inserter
export function insertData(callback: Function) {
  QuestionData.forEach((topicInfo: IQuestionData, index) => {
    db.collection(DSA_450_TABLE).add(
      topicInfo,
      topicInfo.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase()
    ); // { data: IQuestion[], key: topicName }
  });
  getData(callback);
}

export function getData(callback: Function) {
  db.collection(DSA_450_TABLE)
    .get()
    .then((data: IQuestionData[]) => {
      if (data.length === 0) {
        insertData(callback);
      } else {
        return callback(data.sort((a, b) => a.position - b.position));
      }
    });
}
