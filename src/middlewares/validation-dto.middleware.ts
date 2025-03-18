import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";

type ValidationTarget = "body" | "query" | "params";

export const validationDtoMiddleware = (
  schema: Joi.ObjectSchema,
  target: ValidationTarget = "body"
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req[target], {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error) {
      res.status(400).json({
        status: "error",
        message: "Validation failed",
        details: error.details.map((err) => ({
          message: err.message,
          path: err.path,
        })),
      });
      return;
    }

    next();
  };
};
