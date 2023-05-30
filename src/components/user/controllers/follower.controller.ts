import { ErrorResponse, IResponse, Status, SuccessResponse } from "../../../libraries/IResponse";
import { CommonErrors } from "../../../libraries/commonErrors";
import AppError from "../../../libraries/error";
import { HttpStatusCode } from "../../../libraries/httpStatusCodes";
import { FollowUserRequest } from "../follower.schema";
import { FollowerInput } from "../models/follower.model";
import followerService from "../services/follower.service";

class UserController {

    async create(payload: FollowUserRequest, followerUserId: string) : Promise<IResponse> {
        const followPayload : FollowerInput = {following_user_id: payload.followingUserId, follower_user_id: followerUserId}
        const result = await followerService.createFollower(followPayload)

        if (result instanceof AppError) return new ErrorResponse(Status.ERROR, result.httpCode, CommonErrors.DEFAULT_ERROR)

        return new SuccessResponse(Status.SUCCESS, HttpStatusCode.OK, {})
    }

    async delete(payload: FollowUserRequest, followerUserId: string) : Promise<IResponse> {
        const unfollowPayload : FollowerInput = {following_user_id: payload.followingUserId,  follower_user_id: followerUserId}

        const result = await followerService.deleteFollower(unfollowPayload)

        if (result instanceof AppError) return new ErrorResponse(Status.ERROR, result.httpCode, CommonErrors.DEFAULT_ERROR)

        return new SuccessResponse(Status.SUCCESS, HttpStatusCode.NO_CONTENT, {})
    }
}

export default new UserController()