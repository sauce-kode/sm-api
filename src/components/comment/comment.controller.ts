import { ErrorResponse, FailResponse, IResponse, Status, SuccessResponse } from "../../libraries/IResponse"
import { CommonErrors } from "../../libraries/commonErrors"
import AppError from "../../libraries/error"
import { HttpStatusCode } from "../../libraries/httpStatusCodes"
import { CommentInput } from "./comment.model"
import { CreateCommentRequest } from "./comment.schema"
import commentService from "./comment.service"
import postService from "../post/post.service"
import * as transformer from "./comment.transformer"

class CommentController {
    async create(payload : CreateCommentRequest, userId: string) : Promise<IResponse> {
        const findPost = await postService.findPost(payload.postId);

        if (findPost) {
            if (findPost instanceof AppError) return new ErrorResponse(Status.ERROR, findPost.httpCode, CommonErrors.SERVER_ERROR);

            const commentPayload : CommentInput = {comment: payload.comment, post_id: payload.postId, user_id: userId}
            const result = await commentService.createComment(commentPayload)

            if (result instanceof AppError) return new ErrorResponse(Status.ERROR, result.httpCode, result.message)
    
            return new SuccessResponse(Status.SUCCESS, HttpStatusCode.CREATED, transformer.commentResource(result))
        }
        return new FailResponse(Status.FAIL, {}, HttpStatusCode.BAD_REQUEST, CommonErrors.INVALID_POST);
    }
}

export default new CommentController()