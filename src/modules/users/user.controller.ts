import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { UserService } from "./user.service";
import { Request, Response } from "express";
import { IncreaseBalanceDto, ReduceBalanceDto } from "./dtos";
import { validationDtoMiddleware } from "../../middlewares";
import { increaseBalanceValidator } from "./validators/increase-balance.validator";
import { reduceBalanceValidator } from "./validators/reduce-balance.validator";

@controller("/users")
export class UserController {
  constructor(
    @inject("UserService")
    private readonly _userService: UserService
  ) {}

  @httpPost(
    "/balance/increase-balance",
    validationDtoMiddleware(increaseBalanceValidator)
  )
  private async _increaseBalance(
    req: Request<any, any, IncreaseBalanceDto>,
    res: Response
  ) {
    try {
      const { amount, userId } = req.body;
      const result = await this._userService.increaseBalance(amount, userId);
      res.status(200).json(result);
    } catch (error: unknown) {
      throw error;
    }
  }

  @httpPost(
    "/balance/reduce-balance",
    validationDtoMiddleware(reduceBalanceValidator)
  )
  private async _reduceBalance(
    req: Request<any, any, ReduceBalanceDto>,
    res: Response
  ) {
    try {
      const { amount, userId } = req.body;
      const result = await this._userService.reduceBalance(amount, userId);
      res.status(200).json(result);
    } catch (error: unknown) {
      throw error;
    }
  }
}
