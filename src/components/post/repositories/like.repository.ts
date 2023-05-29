import LikeModel, { LikeInput } from "../models/likes.model";

class LikeRepository {
    async create(payload: LikeInput) {
        try {
            return await LikeModel.create(payload)
        } catch (error) {
            throw error
        }
    }
}

export default new LikeRepository()