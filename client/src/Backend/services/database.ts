import {
  countOfQuestionsCompletion,
  findDocByKey,
  getData,
  insertData,
  updateDocumentStateInDB,
} from "./450dsaArchive-db.functions";
import {
  getCustomizedListOfQuestionsFor,
  updatedCustomizedListOfQuestionsFor,
} from "./customizedList-db.functions";

// Typescript Module - Production requirement
// const LBase = require("localbase");

import * as Lbase from "localbase";
export const db: any = new Lbase.default("db");

export {
  countOfQuestionsCompletion,
  findDocByKey,
  getData,
  insertData,
  updateDocumentStateInDB,
  getCustomizedListOfQuestionsFor,
  updatedCustomizedListOfQuestionsFor,
};
