import { DATABASE_SCHEMAS } from "../constants";
import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.sequelize.query(
    `CREATE SCHEMA IF NOT EXISTS ${DATABASE_SCHEMAS["my-app"]}`
  );
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.sequelize.query(
    `DROP SCHEMA IF EXISTS ${DATABASE_SCHEMAS["my-app"]}`
  );
}
