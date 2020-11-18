import { QuestionData } from "../db-store/data";
import Localbase from "localbase";
import { IQuestionData } from "../model/Question-model";

const db: Localbase = new Localbase("db");

// life saver inserter
function insertData(): void {
  QuestionData.forEach((topicInfo: IQuestionData, index) => {
    db.collection("450dsaArchive").add(
      topicInfo,
      topicInfo.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase()
    ); // { data: IQuestion[], key: topicName }
  });
}

// getting all the records
export function getData() {
  insertData();
  db.collection("450dsaArchive")
    .get()
    .then((data: IQuestionData[]) => {
      if (data.length < 1) {
        console.log("putting / inserting data to DB");
        insertData();
      } else {
        console.log(data);
        return data.sort((a, b) => a.position - b.position);
      }
    });
}

export function updateDocumentState(
  key: string,
  updatedData: IQuestionData
): void {
  db.collection("450dsaArchive").doc(key).update(updatedData);
}
