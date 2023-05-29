import { CommentOutput } from "../models/comment.model"

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
        userId: comment.userId,
        comment: comment.comment,
        
        created_at: comment.created_at,
        updated_at: comment.updated_at,
    }
}