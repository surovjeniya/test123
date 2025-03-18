import { injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import { DataBaseNotFoundException, HttpException } from "../exceptions";

@injectable()
export class ErrorHandlerMiddleware {
  public handler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(`[${new Date().toISOString()}] ${err.message}`);

    let statusCode = err.statusCode || 500;
    const response = {
      status: "error",
      message: err.message || "Internal Server Error",
    };

    if (err instanceof DataBaseNotFoundException) {
      const { code } = err;
      statusCode = code;
    }
    if (err instanceof HttpException) {
      const { code } = err;
      statusCode = code;
    }

    res.status(statusCode).json(response);
  }
}
