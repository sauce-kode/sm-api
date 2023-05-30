import { sequelizeConnection } from "../../database/postgres";
import AppError, { handler } from "../../libraries/error";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import { CommentInput, CommentOutput } from "./comment.model";
import commentRepository from "./comment.repository";
import postService from "../post/post.service";

class CommentService {

    async createComment(comment: CommentInput) : Promise<CommentOutput | AppError> {
        try {
            const createComment = await commentRepository.create(comment);
            return createComment
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