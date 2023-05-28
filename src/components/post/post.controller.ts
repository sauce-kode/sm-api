import postService from "./services/post.service"
import { ErrorResponse, IResponse, Status, SuccessResponse } from "../../libraries/IResponse"
import { CommonErrors } from "../../libraries/commonErrors"
import AppError from "../../libraries/error"
import * as transformer from "./post.transformer"
import { HttpStatusCode } from "../../libraries/httpStatusCodes"
import { CreatePostRequest } from "./post.schema"

class AuthController {
    async create(payload : CreatePostRequest) : Promise<IResponse> {
        const result = await postService.createPost(payload)
        if (result instanceof AppError) return new ErrorResponse(Status.ERROR, result.httpCode, CommonErrors.UNSUCCESSFUL_SIGNUP)

        return new SuccessResponse(Status.SUCCESS, HttpStatusCode.CREATED, transformer.postResource(result))
    }
}

export default new AuthController()