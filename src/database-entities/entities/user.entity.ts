import { DataTypes, Model, Sequelize, NOW } from "sequelize";
import { UserModel } from "../models/user.model";
import { DATABASE_TABLES } from "../../constants";

export class UserEntity extends Model<UserModel> implements UserModel {
  created_at: Date;
  updated_at: Date;
  userId: number;
  balance: number;

  static initModel(sequelize: Sequelize): typeof UserEntity {
    return UserEntity.init(
      {
        userId: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        balance: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: false,
          defaultValue: 0.0,
          validate: {
            isPositive(value: number) {
              if (value <= 0) {
                throw new Error("Amount must be positive");
              }
            },
          },
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: NOW,
        },
      },
      {
        sequelize,
        tableName: DATABASE_TABLES.users,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
  }
}
