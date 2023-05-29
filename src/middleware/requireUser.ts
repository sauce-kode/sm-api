import { NextFunction, Request, Response } from 'express';
import { handleResponse } from '../components';
import { FailResponse, Status } from '../libraries/IResponse';
import { CommonErrors } from '../libraries/commonErrors';
import { HttpStatusCode } from '../libraries/httpStatusCodes';

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    if (!user) {
        return handleResponse(res, new FailResponse(Status.FAIL, {}, HttpStatusCode.UNAUTHORIZED, CommonErrors.UNAUTHORIZED  + "requireUser"))
    }

    next();
  } catch (err: any) {
    next(err);
  }
};
