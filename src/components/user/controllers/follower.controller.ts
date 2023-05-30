import { ErrorResponse, IResponse, Status, SuccessResponse } from "../../../libraries/IResponse";
import { CommonErrors } from "../../../libraries/commonErrors";
import AppError from "../../../libraries/error";
import { HttpStatusCode } from "../../../libraries/httpStatusCodes";
import { FollowUserRequest } from "../follower.schema";
import { FollowerUserInput } from "../models/follower.model";
import followerService from "../services/follower.service";

class UserController {

    async create(payload: FollowUserRequest, userId: string) : Promise<IResponse> {
        const followPayload : FollowerUserInput = {...payload, userId}
        const result = await followerService.createFollower(followPayload)

        if (result instanceof AppError) return new ErrorResponse(Status.ERROR, result.httpCode, CommonErrors.DEFAULT_ERROR)

        return new SuccessResponse(Status.SUCCESS, HttpStatusCode.OK, {})
    }

    async delete(payload: FollowUserRequest, userId: string) : Promise<IResponse> {
        const unfollowPayload : FollowerUserInput = {...payload, userId}

        const result = await followerService.deleteFollower(unfollowPayload)

        if (result instanceof AppError) return new ErrorResponse(Status.ERROR, result.httpCode, CommonErrors.DEFAULT_ERROR)

        return new SuccessResponse(Status.SUCCESS, HttpStatusCode.NO_CONTENT, {})
    }
}

export default new UserController()