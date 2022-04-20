import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json, urlencoded } from "express";
import morgan from "morgan";
import { cpus } from "os";
import { pid } from "process";
import { APIController } from "./controllers";
import {
  createError,
  Next,
  RequestInterface,
  ResponseInterface,
} from "./utils";

export class Server {
  private readonly PORT = process.env.PORT || 3001;
  private readonly workers = cpus().length;
  private app = express();

  private readonly whiteListIps = [
    "https://450-dsa-tracker.netlify.app",
    "http://localhost:3000",
  ];

  constructor() {
    /**
     * INFO:
     * Can be enable in Production
     * But for development
     * I think it is not required for now!!
     */
    // if (isMaster === true) {
    //   console.log(`## 🔼 [Master Server: ${pid}] has been started...`);
    //   for (let i = 0; i < this.workers; i++) fork();
    //   on("exit", () => fork());
    // } else {
    //   this.start();
    // }
    this.start();
  }

  private corsOptionsDelegate(req: RequestInterface, callback: any) {
    let corsOptions;
    const isAllowedDomain =
      this.whiteListIps.indexOf(req.headers.origin as string) !== -1;
    if (isAllowedDomain === true) {
      corsOptions = { origin: true, credentials: true };
    } else {
      corsOptions = { origin: false };
    }
    callback(null, corsOptions);
  }

  private async serverConfig() {
    // express-file-upload setup middleware
    this.app.use(json({ limit: "20mb" }));
    this.app.use(
      cors({
        origin: [
          "https://450-dsa-tracker.netlify.app/",
          "http://450-dsa-tracker.netlify.app/",
          "http://localhost:3000",
        ],
        credentials: true,
      })
    );
    // this.app.use(function (req, res, next) {
    //   res.header("Access-Control-Allow-Origin", "*");
    //   res.header("Access-Control-Allow-Credentials", "true");
    //   res.header(
    //     "Access-Control-Allow-Methods",
    //     "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
    //   );
    //   res.header(
    //     "Access-Control-Allow-Headers",
    //     "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    //   );
    //   next();
    // });
    this.app.use(morgan("dev"));
    this.app.use(urlencoded({ extended: false }));
    this.app.use(json({ limit: "20mb" }));
    this.app.use(cookieParser());
  }

  private errorHandlers(): void {
    this.app.use(
      async (req: RequestInterface, res: ResponseInterface, next: Next) => {
        next(createError(404, "Not Found!"));
      }
    );
    this.app.use(
      (err: any, req: RequestInterface, res: ResponseInterface, next: Next) => {
        res.status(err.status || 500).send({
          error: {
            url: req.path,
            status: err.status || 500,
            message: err.message,
          },
        });
      }
    );
  }

  private async start() {
    try {
      await this.serverConfig();
      this.app.listen(this.PORT, () =>
        console.log(
          `[ PID:${pid} ] 🚀 Server already started on http://localhost:${this.PORT}`
        )
      );
      this.app.use("/proxy/api", APIController);

      this.errorHandlers();
    } catch (error) {
      console.error({ error });
    }
  }
}
