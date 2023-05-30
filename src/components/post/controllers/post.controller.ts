import postService from "../services/post.service"
import { ErrorResponse, IResponse, Status, SuccessResponse } from "../../../libraries/IResponse"
import { CommonErrors } from "../../../libraries/commonErrors"
import AppError from "../../../libraries/error"
import * as transformer from "../transformers/post.transformer"
import { HttpStatusCode } from "../../../libraries/httpStatusCodes"
import { CreatePostRequest } from "../schemas/post.schema"
import { PostInput } from "../models/post.model"

class PostController {
    async create(payload : CreatePostRequest, userId: string) : Promise<IResponse> {
        const postInput : PostInput = {...payload, userId}
        const result = await postService.createPost(postInput)
        if (result instanceof AppError) return new ErrorResponse(Status.ERROR, result.httpCode, CommonErrors.UNSUCCESSFUL_SIGNUP)

        return new SuccessResponse(Status.SUCCESS, HttpStatusCode.CREATED, transformer.postResource(result))
    }

    async get(page: number = 1, limit: number = 10) {
        
    }
    
}

export default new PostController()