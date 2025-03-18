import "reflect-metadata";
import express from "express";
import {
  container,
  databaseConfig,
  envConfig,
  rateLimiterConfig,
} from "./config";
import { InversifyExpressServer } from "inversify-express-utils";
import { initEntities } from "./database-entities/entities/init";
import { ErrorHandlerMiddleware } from "./middlewares/error-handler.middleware";

const server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(express.json());
  app.use(rateLimiterConfig);
});
server.setErrorConfig((app) => {
  const errorMiddleware = container.get<ErrorHandlerMiddleware>(
    "ErrorHandlerMiddleware"
  );
  app.use(errorMiddleware.handler.bind(errorMiddleware));
});

const app = server.build();

const start = async (port: number) => {
  await initEntities(databaseConfig);
  app.listen(port, () =>
    console.log(`Server has been started on port: ${port}`)
  );
};

start(envConfig.getEnv("PORT"));
