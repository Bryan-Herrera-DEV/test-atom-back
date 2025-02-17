import express from "express";
import http from "http";
import Router from "express-promise-router";
import { init as initLocals } from "./LocalsProvider";
import { HttpMiddlewareProvider } from './MiddlewaresProvider';
import ErrorHandlerProvider from "./ErroHandlerProvider";
import { ILogger } from "../../shared/providers/Logger/domain/Logger";
import { registerTaskRoutes } from "./Routes/task.routes";
import { errorHandler } from "../../shared/errors/errorHandler";

export const server = {
  httpServer: null as http.Server | null,
};


export const ApplicationProvider = (logger: ILogger) => () => {
  const app = express();
  const router = Router();


  initLocals(app);
  HttpMiddlewareProvider(app, logger)();

  app.use(router);

  registerTaskRoutes(router);

  app.use(ErrorHandlerProvider.syntaxErrorHandler());
  app.use(ErrorHandlerProvider.notFoundHandler());
  app.use(ErrorHandlerProvider.clientErrorHandler());
  app.use(ErrorHandlerProvider.errorHandler());
  app.use(errorHandler);
  return app;
};
