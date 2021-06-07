import { Router } from "express";
import { CustomCategoryList } from "../database/schema/customCategoryList-model";
import {
  INTERNAL_SERVER_ERROR,
  OK,
  getUserIdFromRequestHeader,
} from "../utils";

const router = Router();

router.get("/", async (req, res, next) => {
  const userId: string = getUserIdFromRequestHeader(req);
  try {
    await CustomCategoryList.find((err, customCategoryLists) => {
      if (!err) {
        res.status(OK).send({ customCategoryLists, userId });
      }
    });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send(JSON.stringify(error, undefined, 3));
  }
  next();
});

export default router;
