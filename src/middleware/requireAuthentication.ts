import { NextFunction, Request, Response } from "express";
import { handleResponse } from "../components";
import { FailResponse, Status } from "../libraries/IResponse";
import { HttpStatusCode } from "../libraries/httpStatusCodes";
import { CommonErrors } from "../libraries/commonErrors";
import Token from "../libraries/token";
import userService from "../components/user/services/user.service";
import redisClient from "../libraries/redis";

const requireAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    let accessToken

    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            accessToken = req.headers.authorization.split(" ")[1]
        }

        if (!accessToken) {
            return handleResponse(res, new FailResponse(Status.FAIL, {}, HttpStatusCode.UNAUTHORIZED, CommonErrors.UNAUTHORIZED  + " No Access Token"))
        }

        const decodedToken = Token.verifyJwt<{sub: string}>(accessToken)
        if (!decodedToken) {
            handleResponse(res, new FailResponse(Status.FAIL, {}, HttpStatusCode.BAD_REQUEST, CommonErrors.INVALID_TOKEN_TYPE))
        }
        console.log("DECODED TOKEN >>>> ", decodedToken)

        const session = await redisClient.get(decodedToken.sub)
        console.log("SESSION FOUND >>>> ", session)

         if(!session) {
            return handleResponse(res, new FailResponse(Status.FAIL, {}, HttpStatusCode.UNAUTHORIZED, CommonErrors.UNAUTHORIZED  + " Session not found"))
         }

        // Ensure user still exists
        const user = await userService.findUserById(JSON.parse(session).id)

        if (!user) {
            return handleResponse(res, new FailResponse(Status.FAIL, {}, HttpStatusCode.UNAUTHORIZED, CommonErrors.UNAUTHORIZED  + " User not found"))
        }

        res.locals.user = user
        
        next()

    } catch (error) {
        next(error)
    }

};

export default requireAuthentication