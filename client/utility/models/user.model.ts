import { Document } from "mongoose";

export interface IUser extends Document {
  // _id: ID;
  tenant: string;
  connection: string;
  email: string;
  password: string;
  debug: boolean;
}

export interface ID {
  $oid: string;
}
