import PostModel, { PostInput, PostOutput } from "./post.model";
import { sequelizeConnection } from "../../database/postgres";

export interface PaginationResult {
    rows: PostOutput[]
    count: number
}

class PostRepository {
    async create(payload: PostInput) : Promise<PostOutput> {
        return await PostModel.create(payload)
    }

    async update(id: string, payload: Partial<PostInput>) : Promise<PostOutput> {
        const post = await PostModel.findByPk(id)

        if (!post) {
            throw  new Error('not found')
        }

        const updatedPost = await post.update(payload)
        return updatedPost
    }

    async findById(id: string) : Promise<PostOutput> {
        const post = await PostModel.findByPk(id)

        if (!post) {
            throw  new Error('Post not found')
        }
        return post
    }

    async getAll(userId: string, limit:number, offset:number) : Promise<PostOutput[]> {
        const query = `
            SELECT p.*, u.username as author
            FROM posts p
            LEFT JOIN followers f ON p.user_id = f.following_user_id
            INNER JOIN users u ON p.user_id = u.id or f.follower_user_id = u.id
            WHERE u.id = :userId
            ORDER BY created_at DESC
            LIMIT :limit OFFSET :offset
        `;
        const posts = await sequelizeConnection.query(query, {
            model: PostModel,
            mapToModel: true,
            replacements: { userId, limit, offset },
        });
        return posts
    }

    async search(searchQuery: string, offset:number, limit:number) : Promise<PaginationResult> {
        const results : PaginationResult = {
            rows: [],
            count: 0
        }

        try {
            const {count, rows} = await PostModel.findAndCountAll({
                where: sequelizeConnection.literal(`to_tsvector('english', content) || to_tsvector('english', title) @@ to_tsquery('english', '${searchQuery}')`),
                order: [['created_at', 'DESC']],
                offset: offset,
                limit: limit
            });
            results.count = count
            results.rows = rows

            return results
        } catch (error) {
            console.error('Error performing full-text search:', error);
            throw error
        }
    }

}

export default new PostRepository()