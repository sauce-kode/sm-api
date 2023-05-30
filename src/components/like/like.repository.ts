import LikeModel, { LikeInput } from "./likes.model";

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
            const deletedLikeCount = await LikeModel.destroy({where: {user_id: payload.user_id, post_id: payload.post_id}})
            return !!deletedLikeCount
        } catch (error) {
            throw error
        }
    }

}

export default new LikeRepository()