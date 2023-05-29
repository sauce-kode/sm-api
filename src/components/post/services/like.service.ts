import AppError, { handler } from "../../../libraries/error";
import { HttpStatusCode } from "../../../libraries/httpStatusCodes";
import { LikeInput } from "../models/likes.model";
import likeRepository from "../repositories/like.repository";

class LikeService {

    async createLike(like: LikeInput) {
        try {
            return await likeRepository.create(like)
        } catch(error:any) {
            handler.reportError(error)
            if (error instanceof AppError) {
                return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, error.message)
            }
            throw error
        }
    }
}

export default new LikeService()