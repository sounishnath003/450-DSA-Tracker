const cors = require("cors");
import env from "dotenv";
import express, { json, urlencoded } from "express";
import { auth, requiresAuth } from "express-openid-connect";
import morgan from "morgan";
import {
  AllTopicQuestionController,
  AuthController,
  CustomCategoryListController,
} from "./controllers";
import { connectToDatabase } from "./database";

env.config();
const PORT = process.env.PORT || 5000;
const app = express();

export async function serverStart() {
  try {
    await serverConfig();
    await connectToDatabase();

    app.use("/", AuthController);
    app.use("/topics", requiresAuth(), AllTopicQuestionController);
    app.use(
      "/customCategoryLists",
      requiresAuth(),
      CustomCategoryListController
    );

    app.listen(PORT, () =>
      console.log(`server is running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error({ error });
  }
}

async function serverConfig() {
  // * AUTH middleware
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(
    auth({
      issuerBaseURL: process.env.ISSUER_BASE_URL,
      baseURL: process.env.BASE_URL,
      clientID: process.env.CLIENT_ID,
      secret: process.env.SECRET,
      idpLogout: true,
      authRequired: false,
      auth0Logout: true,
    })
  );
}
