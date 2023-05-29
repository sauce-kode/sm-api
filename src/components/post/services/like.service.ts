import AppError, { handler } from "../../../libraries/error";
import { HttpStatusCode } from "../../../libraries/httpStatusCodes";
import { LikeInput } from "../models/likes.model";
import likeRepository from "../repositories/like.repository";

class LikeService {
    async createLike(payload : LikeInput) {
        try {
            return await likeRepository.create(payload)
        } catch(error:any) {
            handler.reportError(error)
            if (error instanceof AppError) {
                return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, error.message)
            }
            throw error
        }
    }
    
    async deleteLike(payload : LikeInput) {
        try {
            return await likeRepository.delete(payload)
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