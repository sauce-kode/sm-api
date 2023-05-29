import postService from "../services/post.service"
import { ErrorResponse, IResponse, Status, SuccessResponse } from "../../../libraries/IResponse"
import { CommonErrors } from "../../../libraries/commonErrors"
import AppError from "../../../libraries/error"
import * as transformer from "../transformers/post.transformer"
import { HttpStatusCode } from "../../../libraries/httpStatusCodes"
import { CreatePostRequest } from "../schemas/post.schema"

class PostController {
    async create(payload : CreatePostRequest) : Promise<IResponse> {
        const result = await postService.createPost(payload)
        if (result instanceof AppError) return new ErrorResponse(Status.ERROR, result.httpCode, CommonErrors.UNSUCCESSFUL_SIGNUP)

        return new SuccessResponse(Status.SUCCESS, HttpStatusCode.CREATED, transformer.postResource(result))
    }
}

export default new PostController()