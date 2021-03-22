import env from "dotenv";
import express from "express";
import { auth } from "express-openid-connect";
import morgan from "morgan";
import { AuthController } from "./controllers";

env.config();
const PORT = process.env.PORT || 5000;
const app = express();

export async function serverStart() {
  try {
    await serverConfig();

    app.use("/", AuthController);

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
