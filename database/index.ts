import m from "mongoose";
import { DATABASE_URI } from "../server/utils";

export async function connectToDatabase() {
  m.connect(
    DATABASE_URI,
    { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true },
    (err) =>
      err
        ? console.error({ err })
        : console.log(`MongoDB Connection established!!`)
  );
}
