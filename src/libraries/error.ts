import { HttpStatusCode } from "./httpStatusCodes";
import logger from "./logger";

export default class AppError extends Error {
  public readonly name: string;
  public httpCode: HttpStatusCode;
  public description: string;

  constructor(
      name: string,
      httpCode: HttpStatusCode,
      description: string,
  ) {
      super(description);
  
      Object.setPrototypeOf(this, new.target.prototype);
  
      this.name = name;
      this.httpCode = httpCode;
      this.description = description;
  
      Error.captureStackTrace(this, this.constructor);
  }
}

class ErrorHandler {
  public async reportError(err: Error): Promise<void> {
    logger.error(err);
    // send mail too maybe
  }
}
  
export const handler = new ErrorHandler();