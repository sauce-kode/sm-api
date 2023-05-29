import PostModel, { PostInput, PostOutput } from "../models/post.model";

class PostRepository {
    async create(payload: PostInput) : Promise<PostOutput> {
        try {
            return await PostModel.create(payload)
        } catch (error) {
            throw error
        }
    }

    async findPost(where: any) {
        try {
            return await PostModel.findOne({where: where})
        } catch (error) {
            throw error
        }
    }

}

export default new PostRepository()