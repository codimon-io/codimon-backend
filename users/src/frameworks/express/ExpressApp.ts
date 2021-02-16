import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import Express, { Application } from "express";
import BodyParser from "body-parser";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "../../modules/shared/errors/NotFoundError";
import config from "../config";
import { db } from "../mysql/mysql";
import pkg from "../../../package.json";

import usersRouter from "../../modules/users/adapters/controllers/router";

export class ExpressApp {
  public app: Application;

  constructor() {
    this.app = Express();
    this.LoadMiddleware();
    this.LoadRouters();
    this.LoadNotFoundError();
    this.LoadHandleError();
  }

  public LoadMiddleware(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(BodyParser.json());
    // don't show the log when it is test
    if (config.env !== "test" && config.env !== "test.local") {
      // use morgan to log at command line
      this.app.use(morgan("combined")); // "combined" outputs the Apache style LOGs
    }
    this.app.use((req, res, next) => {
      res.set("X-Api-Version", pkg.version);
      next();
    });
  }

  private LoadRouters(): void {
    const routers: Express.Router[] = [
      usersRouter,
    ];
    routers.forEach((router) => {
      this.app.use(router);
    });
  }

  private LoadNotFoundError(): void {
    this.app.all('*', (req, res) => {
      throw new NotFoundError();
    });
  }

  private LoadHandleError(): void {
    this.app.use(errorHandler);
  }

  public Listen(): void {
    if (config.env !== "test" && config.env !== "test.local") {
      this.app.listen(config.server.port, () => {
        // tslint:disable-next-line:no-console
        console.log(
          `${config.env} server v${pkg.version} running on port:${config.server.port}`,
        );
      });
    }
  }

  private async RunServices(): Promise<void> {
    try {
      await db.connect();
      this.Listen();
    } catch (error) {
      throw error;
    }
  }

  public Start(): void {
    this.RunServices();
  }
}
