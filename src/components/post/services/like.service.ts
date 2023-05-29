import AppError, { handler } from "../../../libraries/error";
import { HttpStatusCode } from "../../../libraries/httpStatusCodes";
import { LikeInput } from "../models/likes.model";
import likeRepository from "../repositories/like.repository";

class LikeService {

    async createLike(userId: string, postId: string) {
        try {
            const likePayload : LikeInput = {
                userId: userId,
                postId: postId
            }
            return await likeRepository.create(likePayload)
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