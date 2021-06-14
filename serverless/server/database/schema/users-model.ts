// User Model;
import { model, Schema } from "mongoose";
import { IUser } from "../../models/user.model";

const UserSchema: Schema<IUser> = new Schema({
  _id: { type: Schema.Types.ObjectId },
  tenant: { type: Schema.Types.String },
  connection: { type: Schema.Types.String },
  email: { type: Schema.Types.String },
  password: { type: Schema.Types.String },
  debug: { type: Schema.Types.Boolean },
});

const User = model<IUser>("users", UserSchema);

export { User };
