import { QuestionData } from "../db-store/data";
import Localbase from "localbase";
import { IQuestionData, IQuestion } from "../model/Question-model";

const db: Localbase = new Localbase("db");

function formatKeys(key: string): string {
  return key.replace(/[^A-Z0-9]+/gi, "_").toLowerCase();
}

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
  return db
    .collection("450dsaArchive")
    .get()
    .then((data: IQuestionData[]) => {
      if (data.length < 1) {
        console.log("putting / inserting data to DB");
        insertData();
      } else {
        return data.sort((a, b) => a.position - b.position);
      }
    });
}

function findByKeyIndex(key: string, position: number): IQuestionData {
  return db.collection("450dsaArchive")
    .doc(formatKeys(key))
    .get()
    .then((dat: IQuestionData) => {
      if(dat.position === position){
        return dat;
      }
    });
}

export function updateDocumentState(key: string, position: number) {
  const d = Promise.resolve(findByKeyIndex(key, position)).then((r) => r);
  console.log(d);
  db.collection("450dsaArchive").doc(formatKeys(key)).update({});
}
