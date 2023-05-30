import { CommentOutput } from "./comment.model"

interface CommentResponse {
    id: string,
    userId: string,
    comment: string,
    
    created_at: Date,
    updated_at: Date,
}

export const commentResource = (comment: CommentOutput) : CommentResponse => {
    return {
        id: comment.id,
        userId: comment.user_id,
        comment: comment.comment,
        
        created_at: comment.createdAt,
        updated_at: comment.updatedAt,
    }
}