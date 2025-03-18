import * as Joi from "joi";
import { ReduceBalanceDto } from "../dtos";

export const reduceBalanceValidator = Joi.object<ReduceBalanceDto>({
  amount: Joi.number().positive().required(),
  userId: Joi.number().required(),
});
