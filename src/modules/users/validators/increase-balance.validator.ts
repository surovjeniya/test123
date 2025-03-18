import * as Joi from "joi";
import { IncreaseBalanceDto } from "../dtos";

export const increaseBalanceValidator = Joi.object<IncreaseBalanceDto>({
  amount: Joi.number().positive().required(),
  userId: Joi.number().required(),
});
