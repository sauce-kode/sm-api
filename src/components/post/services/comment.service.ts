import AppError, { handler } from "../../../libraries/error";
import { HttpStatusCode } from "../../../libraries/httpStatusCodes";
import { CommentInput, CommentOutput } from "../models/comment.model";
import commentRepository from "../repositories/comment.repository";

class CommentService {

    async createComment(comment: CommentInput) : Promise<CommentOutput | AppError> {
        try {
            return await commentRepository.create(comment)
        } catch(error:any) {
            handler.reportError(error)
            if (error instanceof AppError) {
                return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, error.message)
            }
            throw error
        }
    }
}

export default new CommentService()