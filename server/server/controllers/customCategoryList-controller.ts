import { Router } from "express";
import { CustomCategoryList } from "../database/schema/customCategoryList-model";
import { INTERNAL_SERVER_ERROR, OK } from "../utils";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    await CustomCategoryList.find((err, customCategoryLists) => {
      if (!err) {
        res.status(OK).send({ customCategoryLists });
      }
    });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send(JSON.stringify(error, undefined, 3));
  }
  next();
});

export default router;
