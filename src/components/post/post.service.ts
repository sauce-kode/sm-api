import cache from "../../libraries/cache";
import AppError, { handler } from "../../libraries/error";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import { PostInput, PostOutput } from "./post.model";
import postRepository from "./post.repository";

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

    async getPosts(userId: string, limit: number, offset: number) : Promise<PostOutput[]> {
        try {
            return await postRepository.getAll(userId, limit, offset)
        } catch (error) {
            throw error
        }
    }

    async findPost(id:string) : Promise<PostOutput> {
        const post = await postRepository.findById(id)
        cache.addData(`post:${post.id}`, JSON.stringify(post))
        return post
    }
}

export default new PostService()