import { PostOutput } from "./post.model"

interface PostResponse {
    id: string,
    userId: string,
    author?: string,
    title: string,
    content: string,
    
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
        
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
    }
}