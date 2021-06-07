import { config } from "dotenv";
import m from "mongoose";

config();

export async function connectToDatabase() {
  m.connect(
    `mongodb+srv://sounishnath:vQxqvxHJzyDIEAyw@cluster0.x3jg2.mongodb.net/450DSATracker?retryWrites=true&w=majority`,
    { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true },
    (err) =>
      err
        ? console.error({ err })
        : console.log(`MongoDB Connection established!!`)
  );
}
