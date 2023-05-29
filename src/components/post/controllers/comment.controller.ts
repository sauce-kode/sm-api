import { ErrorResponse, IResponse, Status, SuccessResponse } from "../../../libraries/IResponse"
import { CommonErrors } from "../../../libraries/commonErrors"
import AppError from "../../../libraries/error"
import { HttpStatusCode } from "../../../libraries/httpStatusCodes"
import { CreateCommentRequest } from "../schemas/comment.schema"
import commentService from "../services/comment.service"

class CommentController {
    async create(payload : CreateCommentRequest) : Promise<IResponse> {
        const result = await commentService.createComment(payload)
        if (result instanceof AppError) return new ErrorResponse(Status.ERROR, result.httpCode, CommonErrors.UNSUCCESSFUL_SIGNUP)

        return new SuccessResponse(Status.SUCCESS, HttpStatusCode.CREATED, {})
    }
}

export default new CommentController()