import userService from "./../user/user.service"
import { ErrorResponse, FailResponse, IResponse, Status, SuccessResponse } from "../../libraries/IResponse"
import { CommonErrors } from "../../libraries/commonErrors"
import AppError from "../../libraries/error"
import * as mapper from "./../user/user.mapper"
import { RegisterDto } from "./auth.dto"
import {User} from "../user/user.interface"
import { HttpStatusCode } from "../../libraries/httpStatusCodes"

class AuthController {
    async register(payload:RegisterDto) : Promise<IResponse> {
        const userExists = await userService.findUserByEmail(payload.email)
        if (userExists) return new FailResponse(Status.FAIL, {}, HttpStatusCode.BAD_REQUEST, CommonErrors.USER_EXISTS)

        const result = await userService.createUser(payload)
        if (result instanceof AppError) return new ErrorResponse(Status.ERROR, result.httpCode, CommonErrors.UNSUCCESSFUL_SIGNUP)

        return new SuccessResponse(Status.SUCCESS, HttpStatusCode.CREATED, mapper.userResource(result))
    }
}

export default new AuthController()