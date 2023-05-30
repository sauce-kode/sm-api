import { ErrorResponse, FailResponse, IResponse, Status, SuccessResponse } from "../../../libraries/IResponse"
import { CommonErrors } from "../../../libraries/commonErrors"
import AppError from "../../../libraries/error"
import { HttpStatusCode } from "../../../libraries/httpStatusCodes"
import { LikeInput } from "../models/likes.model";
import likeService from "../services/like.service";
import postService from "../services/post.service";

class LikeController {
    async create(userId : string, postId: string) : Promise<IResponse> {

        const findPost = await postService.findPost(postId);

        if (findPost) {
            if (findPost instanceof AppError) return new ErrorResponse(Status.ERROR, findPost.httpCode, CommonErrors.SERVER_ERROR);

            const likePayload : LikeInput = {user_id: userId, post_id: postId}
            const result = await likeService.createLike(likePayload)
            if (result instanceof AppError) return new ErrorResponse(Status.ERROR, result.httpCode, CommonErrors.UNSUCCESSFUL_SIGNUP)
    
            return new SuccessResponse(Status.SUCCESS, HttpStatusCode.CREATED, {})
        }
        return new FailResponse(Status.FAIL, {}, HttpStatusCode.BAD_REQUEST, CommonErrors.INVALID_POST);
    }

    async delete(userId : string, postId: string) : Promise<IResponse> {
        const likePayload : LikeInput = {user_id: userId, post_id: postId}
        const result = await likeService.deleteLike(likePayload)
        if (result instanceof AppError) return new ErrorResponse(Status.ERROR, result.httpCode, CommonErrors.UNSUCCESSFUL_SIGNUP)

        return new SuccessResponse(Status.SUCCESS, HttpStatusCode.NO_CONTENT, {})
    }
    
}

export default new LikeController()