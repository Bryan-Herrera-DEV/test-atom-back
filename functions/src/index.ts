import "reflect-metadata";
import { ApplicationProvider } from "./core/providers/ApplicationProvider";
import { LoggerImplementation } from "./shared/providers/Logger/infrastructure/LoggerImplementation";
import * as functions from "firebase-functions";

import("tsconfig-paths")
  .then(({ register }) => {
    register({
      baseUrl: __dirname,
      paths: { "@/*": ["*"] },
      addMatchAll: false,
    });
  })
  .then(() => {
    ApplicationProvider(LoggerImplementation)();
  });

export const api = functions.https.onRequest(
  ApplicationProvider(LoggerImplementation)()
);
