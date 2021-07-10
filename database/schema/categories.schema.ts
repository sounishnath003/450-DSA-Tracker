import {Document, model, Schema} from "mongoose";
import {IQuestion} from "./alltopicquestions.schema";
import {IUser} from "./users.schema";

export interface ICategory extends Document {
    easy: IQuestion[],
    medium: IQuestion[],
    hard: IQuestion[],
    userId: IUser["_id"]
}

const CategorySchema: Schema<ICategory> = new Schema<ICategory>({
    easy: { type: Schema.Types.Array },
    medium: { type: Schema.Types.Array },
    hard: { type: Schema.Types.Array },
    userId: {type: Schema.Types.ObjectId}
})

const Category = model<ICategory>("categories", CategorySchema);

export {Category};