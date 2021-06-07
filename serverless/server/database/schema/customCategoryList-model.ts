import { model, Schema } from "mongoose";
import { ICustomCategoryList } from "../../models/customCategoryList.model";

const CustomCategoryListSchema: Schema<ICustomCategoryList> = new Schema({});

const CustomCategoryList = model<ICustomCategoryList>(
  "customCategoryLists",
  CustomCategoryListSchema
);

export { CustomCategoryList };
