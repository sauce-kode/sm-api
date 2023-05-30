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

    async getPosts(userId: string) : Promise<PostOutput[]> {
        try {
            return await postRepository.getAll(userId)
        } catch (error) {
            throw error
        }
    }

    async incrementCommentCount(postId: string) : Promise<PostOutput | AppError> {
        try {
            const post : PostOutput = await postRepository.findById(postId)
            const newCommentCount = post.commentCount + 1
            post.commentCount = newCommentCount

            return await postRepository.update(postId, post)
        } catch (error:any) {
            handler.reportError(error)
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, error.message)
        }
    }

    async findPost(id:string) : Promise<PostOutput | AppError | null> {
        try {
            return postRepository.findById(id)
        } catch (error:any) {
            handler.reportError(error)
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, error.message)
        }
    }

    async searchPosts(searchQuery: string) : Promise<PostOutput[]>  {
        try {
            return postRepository.search(searchQuery)
        } catch (error) {
            throw error
        }
    }

}

export default new PostService()