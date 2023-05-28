import { Post } from "./post.interface"
import { PostOutput } from "./post.model"

export const postResource = (post: PostOutput) : Post => {
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