import { PostOutput } from "./post.model"

interface PostResponse {
    id: string,
    userId: string,
    author?: string,
    title: string,
    content: string,
    
    created_at: Date,
    updated_at: Date,
    deleted_at?: Date
}

export const postResource = (post: PostOutput) : PostResponse => {
    return {
        id: post.id,
        userId: post.user_id,
        author: post.author,
        title: post.title,
        content: post.content,
        
        created_at: post.created_at,
        updated_at: post.updated_at,
    }
}