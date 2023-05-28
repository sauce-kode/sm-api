import { PostOutput } from "./post.model"

interface PostResponse {
    id: string,
    userId: string,
    title: string,
    content: string,
    slug: string,
    likeCount: number,
    commentCount: number,
    
    created_at: Date,
    updated_at: Date,
    deleted_at?: Date
}

export const postResource = (post: PostOutput) : PostResponse => {
    return {
        id: post.id,
        userId: post.userId,
        title: post.title,
        content: post.content,
        slug: post.slug,
        likeCount: post.likeCount,
        commentCount: post.commentCount,
        
        created_at: post.created_at,
        updated_at: post.updated_at,
    }
}