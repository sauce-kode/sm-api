import { NextFunction, Request, Response } from "express";
import { handleResponse } from "../components";
import { FailResponse, Status } from "../libraries/IResponse";
import { HttpStatusCode } from "../libraries/httpStatusCodes";
import { CommonErrors } from "../libraries/commonErrors";
import Token from "../libraries/token";
import redisClient from "../libraries/redis";

const requireAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    let accessToken

    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            accessToken = req.headers.authorization.split(" ")[1]
        }

        if (!accessToken) {
            return handleResponse(res, new FailResponse(Status.FAIL, {}, HttpStatusCode.UNAUTHORIZED, CommonErrors.UNAUTHORIZED))
        }

        const decodedToken = Token.verifyJwt<{sub: string}>(accessToken)
        if (!decodedToken) {
            handleResponse(res, new FailResponse(Status.FAIL, {}, HttpStatusCode.BAD_REQUEST, CommonErrors.INVALID_TOKEN_TYPE))
        }

        const session = await redisClient.get(decodedToken.sub)

         if(!session) {
            return handleResponse(res, new FailResponse(Status.FAIL, {}, HttpStatusCode.UNAUTHORIZED, CommonErrors.UNAUTHORIZED))
         }

        res.locals.user = session
        
        next()

    } catch (error) {
        next(error)
    }

};

export default requireAuthentication