import { QuestionData } from "../db-store/data";
import Localbase from "localbase";
import { IQuestionData, IQuestion } from "../model/Question-model";

const db: Localbase = new Localbase("db");

function formatKeys(key: string): string {
  return key.replace(/[^A-Z0-9]+/gi, "_").toLowerCase();
}

// life saver inserter
function insertData(questionData: IQuestionData[]): void {
  questionData.forEach((topicInfo: IQuestionData, index) => {
    db.collection("450dsaArchive").add(
      topicInfo,
      topicInfo.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase()
    ); // { data: IQuestion[], key: topicName }
  });
}

// getting all the records
export function getData(questionData: IQuestionData[]): IQuestionData[] {
  return db
    .collection("450dsaArchive")
    .get()
    .then((data: IQuestionData[]) => {
      if (data.length < 1) {
        console.log("putting / inserting data to DB");
        insertData(QuestionData);
      } else {
        return data.sort((a, b) => a.position - b.position);
        // return data;
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
