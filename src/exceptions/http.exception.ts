import { HTTP_STATUS_CODES } from "../constants";

export class HttpException extends Error {
  code: HTTP_STATUS_CODES;
  constructor(message: string, code: HTTP_STATUS_CODES) {
    super(message);
    this.code = code;
  }
}
