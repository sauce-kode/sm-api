import postService from "./post.service"
import { ErrorResponse, IResponse, Status, SuccessResponse } from "../../libraries/IResponse"
import { CommonErrors } from "../../libraries/commonErrors"
import AppError from "../../libraries/error"
import * as mapper from "./post.mapper"
import { HttpStatusCode } from "../../libraries/httpStatusCodes"
import { CreatePostRequest } from "./post.schema"

class AuthController {
    async create(payload : CreatePostRequest) : Promise<IResponse> {
        const result = await postService.createPost(payload)
        if (result instanceof AppError) return new ErrorResponse(Status.ERROR, result.httpCode, CommonErrors.UNSUCCESSFUL_SIGNUP)

        return new SuccessResponse(Status.SUCCESS, HttpStatusCode.CREATED, mapper.postResource(result))
    }

    async like(postId: string) {
        
    }
}

export default new AuthController()