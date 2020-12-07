import { QuestionData } from "../db-store/data";
import Localbase from "localbase";
import { IQuestionData } from "../model/Question-model";

const db: Localbase = new Localbase("db");

function formatKeys(key: string): string {
  return key.replace(/[^A-Z0-9]+/gi, "_").toLowerCase();
}

// life saver inserter
// function insertData(questionData: IQuestionData[]): void {
//   questionData.forEach((topicInfo: IQuestionData, index) => {
//     db.collection("450dsaArchive").add(
//       topicInfo,
//       topicInfo.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase()
//     ); // { data: IQuestion[], key: topicName }
//   });

//   getData(questionData);
// }

// life saver inserter
export function insertData(callback: Function) {
  QuestionData.forEach((topicInfo: IQuestionData, index) => {
    db.collection("450dsaArchive").add(
      topicInfo,
      topicInfo.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase()
    ); // { data: IQuestion[], key: topicName }
  });
  getData(callback);
}

// getting all the records
// export function getData(questionData: IQuestionData[]): IQuestionData[] {
//   const c: IQuestionData[] = db
//     .collection("450dsaArchive")
//     .get()
//     .then((data: IQuestionData[]) => {
//       if (data.length < 1) {
//         console.log("putting / inserting data to DB");
//         insertData(QuestionData);
//       } else {
//         return data.sort((a, b) => a.position - b.position);
//         // return data;
//       }
//     });
//     return c;
// }

export function getData(callback: Function) {
  db.collection("450dsaArchive")
    .get()
    .then((data: IQuestionData[]) => {
      if (data.length === 0) {
        insertData(callback);
      } else {
        return callback(data.sort((a, b) => a.position - b.position));
      }
    });
}

export async function findDocByKey(key: string): Promise<IQuestionData> {
  return await db
    .collection("450dsaArchive")
    .doc(formatKeys(key))
    .get()
    .then((doc: IQuestionData) => doc);
}

export function updateDocumentState(key: string, updatedData: IQuestionData) {
  let d: any = db
    .collection("450dsaArchive")
    .doc(formatKeys(key))
    .update(updatedData);
  // getData();
}
