import { PostOutput } from "./post.model"

interface PostResponse {
    id: string,
    userId: string,
    author?: string,
    title: string,
    content: string,
    likeCount: number,
    commentCount: number,
    
    createdAt: Date,
    updatedAt: Date,
    deleted_at?: Date
}

export const postResource = (post: PostOutput) : PostResponse => {
    return {
        id: post.id,
        userId: post.user_id,
        author: post.author,
        title: post.title,
        content: post.content,
        likeCount: post.likeCount,
        commentCount: post.commentCount,
        
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
    }
}