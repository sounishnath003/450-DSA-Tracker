// User Model;
import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  // _id: string;
  username: string;
  password: string;
}

const UserSchema: Schema<IUser> = new Schema({
  // _id: { type: Schema.Types.ObjectId },
  username: {
    type: Schema.Types.String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: { type: Schema.Types.String, required: true },
});

const User = model<IUser>("users", UserSchema);

export { User };
