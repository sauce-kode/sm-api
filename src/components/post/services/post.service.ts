import AppError, { handler } from "../../../libraries/error";
import { HttpStatusCode } from "../../../libraries/httpStatusCodes";
import { PostInput, PostOutput } from "../models/post.model";
import postRepository from "../repositories/post.repository";

class PostService {

    async createPost(post: PostInput) : Promise<PostOutput | AppError> {
        try {
            return await postRepository.create(post)
        } catch(error:any) {
            handler.reportError(error)
            if (error instanceof AppError) {
                return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, error.message)
            }
            throw error
        }
    }

    async findPost(id:string) : Promise<PostOutput | AppError | null> {
        try {
            return postRepository.findPost({id: id})
        } catch (error:any) {
            handler.reportError(error)
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, error.message)
        }
    }

}

export default new PostService()