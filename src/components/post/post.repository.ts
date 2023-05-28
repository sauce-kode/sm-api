import PostModel, { PostInput, PostOutput } from "./post.model";

class PostRepository {
    async create(payload: PostInput) : Promise<PostOutput> {
        try {
            return await PostModel.create(payload)
        } catch (error:any) {
            throw error
        }
    }
}

export default new PostRepository()