import LikeModel, { LikeInput } from "../models/likes.model";

class LikeRepository {
    async create(payload: LikeInput) {
        try {
            return await LikeModel.create(payload)
        } catch (error) {
            throw error
        }
    }

    async delete(payload:LikeInput) : Promise<boolean> {
        try {
            const deletedLikeCount = await LikeModel.destroy({where: {userId: payload.userId, postId: payload.postId}})
            return !!deletedLikeCount
        } catch (error) {
            throw error
        }
    }

}

export default new LikeRepository()