import { Sequelize } from "sequelize";
import { envConfig } from "./env.config";

export const databaseConfig = new Sequelize({
  username: envConfig.getEnv("DB_USER"),
  password: envConfig.getEnv("DB_PASSWORD"),
  host: envConfig.getEnv("DB_HOST"),
  port: envConfig.getEnv("DB_PORT"),
  database: envConfig.getEnv("DB_NAME"),
  dialect: "postgres",
  schema: envConfig.getEnv("DB_SCHEMA"),
  logging: false,
  pool: {
    max: 50, // уменьшите количество соединений
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
