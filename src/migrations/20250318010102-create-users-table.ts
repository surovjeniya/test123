import { DATABASE_TABLES } from "../constants";
import { QueryInterface, DataTypes } from "sequelize";
import { Sequelize } from "sequelize";

export async function up(queryInterface: QueryInterface, Sequelize: Sequelize) {
  //@ts-ignore
  console.log(queryInterface);
  await queryInterface.createTable(DATABASE_TABLES.users, {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  // Используем queryInterface для удаления таблицы
  await queryInterface.dropTable(DATABASE_TABLES.users);
}
