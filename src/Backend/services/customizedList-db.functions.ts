import { IQuestion } from "../model/Question-model";
import { db } from "./database";

const CUSTOMIZED_LIST_TABLE = `CustomizedListArchive`;

export async function getCustomizedListOfQuestionsFor(
  type: string
): Promise<IQuestion[]> {
  try {
    const questions: IQuestion[] = await (async () =>
      await db.collection(CUSTOMIZED_LIST_TABLE).doc(type).get())();
    return questions;
  } catch (err) {
    return (await db
      .collection(CUSTOMIZED_LIST_TABLE)
      .doc()
      .add({}, type)) as IQuestion[];
  }
}

export async function updatedCustomizedListOfQuestionsFor({
  type,
  payload,
}: {
  type: string;
  payload: IQuestion[];
}): Promise<void> {
  try {
    await db
      .collection(CUSTOMIZED_LIST_TABLE)
      .doc(type)
      .update({ questions: payload });
  } catch (error) {
    await db
      .collection(CUSTOMIZED_LIST_TABLE)
      .add({ questions: payload }, type);
  }
}

export async function resetProgressCustomedTable() {
  try {
    await db.collection(CUSTOMIZED_LIST_TABLE).delete();
  } catch (err) {
    alert(`something went wrong`);
  }
}
