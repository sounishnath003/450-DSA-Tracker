import { Router } from "express";
import {
  Next,
  RequestInterface,
  ResponseInterface,
  SUCCESS,
} from "../../utils";
import { requiresAuth } from "../middlerwares/requires-auth.middleware";
import AccountReset from "./account-reset.controller";
import LoginController from "./login.controller";
import SignupController from "./signup.controller";

const router = Router();

router.use("/signup", SignupController);
router.use("/login", LoginController);
router.use("/account", AccountReset);

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
        .clearCookie("isAuthenticated")
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
