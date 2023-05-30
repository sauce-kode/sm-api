import postService from "./post.service"
import { ErrorResponse, IResponse, Status, SuccessResponse } from "../../libraries/IResponse"
import { CommonErrors } from "../../libraries/commonErrors"
import AppError from "../../libraries/error"
import * as transformer from "./post.transformer"
import { HttpStatusCode } from "../../libraries/httpStatusCodes"
import { CreatePostRequest } from "./post.schema"
import { PostInput } from "./post.model"

class PostController {
    async create(payload : CreatePostRequest, userId: string) : Promise<IResponse> {
        const postInput : PostInput = {...payload, user_id: userId}
        const result = await postService.createPost(postInput)
        if (result instanceof AppError) return new ErrorResponse(Status.ERROR, result.httpCode, CommonErrors.UNSUCCESSFUL_SIGNUP)

        return new SuccessResponse(Status.SUCCESS, HttpStatusCode.CREATED, transformer.postResource(result))
    }

    async get(userId: string) : Promise<IResponse> {
        const result = await postService.getPosts(userId)
        return new SuccessResponse(Status.SUCCESS, HttpStatusCode.CREATED, result.map(transformer.postResource))
    }
    
}

export default new PostController()