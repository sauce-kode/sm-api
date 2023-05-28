export interface Post {
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