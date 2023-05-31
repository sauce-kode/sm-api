import { ErrorResponse, FailResponse, IResponse, Status, SuccessResponse } from "../../libraries/IResponse"
import { CommonErrors } from "../../libraries/commonErrors"
import AppError from "../../libraries/error"
import { HttpStatusCode } from "../../libraries/httpStatusCodes"
import { LikeInput } from "./likes.model";
import likeService from "./like.service";
import postService from "../post/post.service";
import { LikePostRequest } from "./like.schema";

class LikeController {
    async create(payload : LikePostRequest, userId: string) : Promise<IResponse> {

        const findPost = await postService.findPost(payload.postId);

        if (findPost) {
            if (findPost instanceof AppError) return new ErrorResponse(Status.ERROR, findPost.httpCode, CommonErrors.SERVER_ERROR);

            const likePayload : LikeInput = {user_id: userId, post_id: payload.postId}
            const result = await likeService.createLike(likePayload)
            if (result instanceof AppError) return new ErrorResponse(Status.ERROR, result.httpCode, result.message)
    
            return new SuccessResponse(Status.SUCCESS, HttpStatusCode.CREATED, {})
        }
        return new FailResponse(Status.FAIL, {}, HttpStatusCode.BAD_REQUEST, CommonErrors.INVALID_POST);
    }

    async delete(payload : LikePostRequest, userId: string) : Promise<IResponse> {
        const likePayload : LikeInput = {user_id: userId, post_id: payload.postId}
        const result = await likeService.deleteLike(likePayload)
        if (result instanceof AppError) return new ErrorResponse(Status.ERROR, result.httpCode, result.message)

        return new SuccessResponse(Status.SUCCESS, HttpStatusCode.NO_CONTENT, {})
    }
    
}

export default new LikeController()