import PostModel, { PostInput, PostOutput } from "../models/post.model";

class PostRepository {
    async create(payload: PostInput) : Promise<PostOutput> {
        return await PostModel.create(payload)
    }

    async update(id: string, payload: Partial<PostInput>) : Promise<PostOutput> {
        const post = await PostModel.findByPk(id)

        if (!post) {
            throw  new Error('not found')
        }

        const updatedPost = await post.update(payload)
        return updatedPost
    }

    async findById(id: string) : Promise<PostOutput> {
        const post = await PostModel.findByPk(id)

        if (!post) {
            throw  new Error('Post not found')
        }

        return post
    }

}

export default new PostRepository()