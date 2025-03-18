import { DATABASE_TABLES, HTTP_STATUS_CODES } from "../constants";

export class DataBaseException extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class DataBaseNotFoundException extends DataBaseException {
  code = HTTP_STATUS_CODES.NOT_FOUND;
  table_name: keyof typeof DATABASE_TABLES;
  constructor(
    message = "",
    table_name: keyof typeof DATABASE_TABLES,
    request: string
  ) {
    super(message);

    this.table_name = table_name;
    this.name = "DataBaseNotFoundException";

    this.message = `Record with request ${request} in table ${table_name} not found`;
  }
}
