import "reflect-metadata";
import express from "express";
import { container, databaseConfig, envConfig } from "./config";
import { InversifyExpressServer } from "inversify-express-utils";
import { initEntities } from "./database-entities/entities/init";
import { ErrorHandlerMiddleware } from "./middlewares/error-handler.middleware";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1000, // 1 секунда
  max: 10000, // максимальное количество запросов за 1 секунду
  message: "Too many requests, please try again later.",
  statusCode: 429, // статус код для превышения лимита
});

const server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(express.json());
  app.use(limiter);
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
