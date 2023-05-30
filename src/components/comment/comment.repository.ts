import CommentModel, { CommentInput, CommentOutput } from "./comment.model"

class CommmentRepository {
    async create(payload: CommentInput) : Promise<CommentOutput> {
        try {
            return await CommentModel.create(payload)
        } catch (error) {
            throw error
        }
    }
}

export default new CommmentRepository()