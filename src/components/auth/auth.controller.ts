import userService from "./../user/user.service"
import { ErrorResponse, FailResponse, IResponse, Status, SuccessResponse } from "../../libraries/IResponse"
import { CommonErrors } from "../../libraries/commonErrors"
import AppError from "../../libraries/error"
import * as mapper from "../user/user.transformer"
import { HttpStatusCode } from "../../libraries/httpStatusCodes"
import Token from "../../libraries/token"
import customConfig from "../../config/default"
import { UserLoginRequest, UserRegistrationRequest } from "./auth.schema"
import Utils from "../../libraries/utils"

class AuthController {
    async register(payload : UserRegistrationRequest) : Promise<IResponse> {
        const userExists = await userService.findUserByEmail(payload.email)
        if (userExists) return new FailResponse(Status.FAIL, {}, HttpStatusCode.BAD_REQUEST, CommonErrors.USER_EXISTS)

        const result = await userService.createUser(payload)
        if (result instanceof AppError) return new ErrorResponse(Status.ERROR, result.httpCode, CommonErrors.UNSUCCESSFUL_SIGNUP)

        return new SuccessResponse(Status.SUCCESS, HttpStatusCode.CREATED, mapper.userResource(result))
    }

    async login(payload: UserLoginRequest) : Promise<IResponse>  {
        const loginField = await this.getLoginField(payload.username)

        let response
        if (loginField == 'username') {
            response = await userService.findUserByUsername(payload.username);
        } else {
            response = await userService.findUserByEmail(payload.username);
        }

        if (response) {
            if (response instanceof AppError) return new ErrorResponse(Status.ERROR, response.httpCode, CommonErrors.SERVER_ERROR);

            const passwordMatches = await userService.comparePasswords(payload.password, response.password)

            if (passwordMatches) {
                const jwtPayload = Token.signJwt({sub: response.id}, {expiresIn: `${customConfig.accessTokenExpiresIn}m`})
                const data = {
                    'user': mapper.userResource(response),
                    'token': jwtPayload
                }
                return new SuccessResponse(Status.SUCCESS, HttpStatusCode.OK, data)
            }
        }
        return new FailResponse(Status.FAIL, {}, HttpStatusCode.BAD_REQUEST, CommonErrors.INVALID_USER, );
    }

    private async getLoginField(text:string) : Promise<'email' | 'username'> {
        return await Utils.stringIsEmail(text) ? 'email' : 'username'
    }

}

export default new AuthController()