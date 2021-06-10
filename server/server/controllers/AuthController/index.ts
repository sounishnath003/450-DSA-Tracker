import SignupController from "./signup.controller";
import LoginController from "./login.controller";
import { Router } from "express";
import {
  RequestInterface,
  ResponseInterface,
  Next,
  SUCCESS,
} from "../../utils";
import { requiresAuth } from "../middlerwares/requires-auth.middleware";

const router = Router();

router.use("/signup", SignupController);
router.use("/login", LoginController);

// logout route
router.get(
  "/logout",
  requiresAuth,
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      return res
        .status(202)
        .clearCookie("accessToken")
        .clearCookie("isLoggedIn")
        .send({
          ...SUCCESS,
          message: "You have been Logout Successfully!",
        });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
