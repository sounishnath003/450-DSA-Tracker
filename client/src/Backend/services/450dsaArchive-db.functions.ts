import { QuestionData } from "../db-store/data";
import { IQuestionData } from "../model/Question-model";
import { db } from "./database";

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

export function countOfQuestionsCompletion(callback: Function) {
  let totalCompleted = 0,
    totalCount = 0;
  setTimeout(() => {
    db.collection(DSA_450_TABLE)
      .get()
      .then((data: IQuestionData[]) => {
        data.map((q) => {
          totalCompleted += q.doneQuestions;
          totalCount += q.questions.length;
        });
        callback(`${totalCompleted}/${totalCount}`);
        return totalCompleted;
      });
  }, 400);
}

export async function findDocByKey(key: string): Promise<IQuestionData> {
  return await db
    .collection(DSA_450_TABLE)
    .doc(formatKeys(key))
    .get()
    .then((doc: IQuestionData) => doc);
}

export function updateDocumentStateInDB(
  key: string,
  updatedData: IQuestionData
) {
  db.collection(DSA_450_TABLE).doc(formatKeys(key)).update(updatedData);
  // getData();
}
