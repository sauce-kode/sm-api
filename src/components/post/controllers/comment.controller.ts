import { ErrorResponse, FailResponse, IResponse, Status, SuccessResponse } from "../../../libraries/IResponse"
import { CommonErrors } from "../../../libraries/commonErrors"
import AppError from "../../../libraries/error"
import { HttpStatusCode } from "../../../libraries/httpStatusCodes"
import { CreateCommentRequest } from "../schemas/comment.schema"
import commentService from "../services/comment.service"
import postService from "../services/post.service"
import * as transformer from "../transformers/comment.transformer"

class CommentController {
    async create(payload : CreateCommentRequest['body'], postId: string) : Promise<IResponse> {

        const findPost = await postService.findPost(postId);

        if (findPost) {
            if (findPost instanceof AppError) return new ErrorResponse(Status.ERROR, findPost.httpCode, CommonErrors.SERVER_ERROR);
            const result = await commentService.createComment(payload, postId)
            if (result instanceof AppError) return new ErrorResponse(Status.ERROR, result.httpCode, CommonErrors.UNSUCCESSFUL_SIGNUP)
    
            return new SuccessResponse(Status.SUCCESS, HttpStatusCode.CREATED, transformer.commentResource(result))
        }
        return new FailResponse(Status.FAIL, {}, HttpStatusCode.BAD_REQUEST, CommonErrors.INVALID_POST);
    }
}

export default new CommentController()