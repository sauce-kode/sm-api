import { NextFunction, Request, Response } from "express";
import { handleResponse } from "../components";
import { FailResponse, Status } from "../libraries/IResponse";
import { HttpStatusCode } from "../libraries/httpStatusCodes";
import { CommonErrors } from "../libraries/commonErrors";
import Token from "../libraries/token";

const requireAuthentication = (req: Request, res: Response, next: NextFunction) => {
    try {
        let jwt = req.headers.authorization
        if (!jwt) {
            return handleResponse(res, new FailResponse(Status.FAIL, {}, HttpStatusCode.UNAUTHORIZED, CommonErrors.UNAUTHORIZED))
        }

        let token = jwt.split(" ")
        if (token[0] !== 'Bearer') {
            return handleResponse(res, new FailResponse(Status.FAIL, {}, HttpStatusCode.BAD_REQUEST, CommonErrors.INVALID_TOKEN_TYPE))
        }
        
        const decodedToken = Token.verifyJwt<{sub: string}>(token[1])
        
        if (!decodedToken) {
            handleResponse(res, new FailResponse(Status.FAIL, {}, HttpStatusCode.BAD_REQUEST, CommonErrors.INVALID_TOKEN_TYPE))
        }
        req.body.userId = decodedToken?.sub;
        next();
    } catch (error) {
        next(error)
    }
};

export default requireAuthentication