import { Sequelize } from "sequelize";
import { UserEntity } from "./user.entity";

const initEntities = async (sequelize: Sequelize) => {
  console.log("Initialize entities...");
  UserEntity.initModel(sequelize);
  await sequelize.sync({ force: false });
  console.log("Entities initialized.");
};

export { initEntities };
