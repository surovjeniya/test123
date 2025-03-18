import { SequelizeStorage, Umzug } from "umzug";
import { databaseConfig } from "./database.config";

const umzugConfig = new Umzug({
  migrations: {
    glob: "src/migrations/*.ts",
  },
  context: databaseConfig.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize: databaseConfig }),
  logger: console,
});

export { umzugConfig };
