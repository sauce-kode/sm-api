import { ErrorResponse, IResponse, Status, SuccessResponse } from "../../../libraries/IResponse";
import { CommonErrors } from "../../../libraries/commonErrors";
import AppError from "../../../libraries/error";
import { HttpStatusCode } from "../../../libraries/httpStatusCodes";
import { FollowerUserInput } from "../models/followerUser.model";
import followerService from "../services/follower.service";

class UserController {

    async create(payload: FollowerUserInput) : Promise<IResponse> {
        const result = await followerService.createFollower(payload)

        if (result instanceof AppError) return new ErrorResponse(Status.ERROR, result.httpCode, CommonErrors.DEFAULT_ERROR)

        return new SuccessResponse(Status.SUCCESS, HttpStatusCode.OK, {})
    }

    async delete(payload: FollowerUserInput) : Promise<IResponse> {
        const result = await followerService.deleteFollower(payload)

        if (result instanceof AppError) return new ErrorResponse(Status.ERROR, result.httpCode, CommonErrors.DEFAULT_ERROR)

        return new SuccessResponse(Status.SUCCESS, HttpStatusCode.OK, {})
    }
}

export default new UserController()