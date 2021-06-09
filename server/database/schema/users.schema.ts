// User Model;
import { compare } from "bcrypt";
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

UserSchema.methods.isPasswordCorrect = async function(password: string) {
  try {
    return await compare(password, this.password)
  }catch(error) {
    throw error
  }
}


const User = model<IUser>("users", UserSchema);

export { User };
