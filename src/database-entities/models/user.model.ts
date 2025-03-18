import { IBaseModel } from "../../types";

export interface UserModel extends Omit<IBaseModel, "id"> {
  userId: number;
  balance: number;
}
