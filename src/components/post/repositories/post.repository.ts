import PostModel, { PostInput, PostOutput } from "../models/post.model";
import { sequelizeConnection } from "../../../database/postgres";
import { Op } from "sequelize";
import User from "../../user/models/user.model";

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

    async getAll(userId: string) : Promise<PostOutput[]> {
        const query = `
            SELECT p.*, u.username as author
            FROM posts p
            LEFT JOIN followers f ON p.user_id = f.following_user_id
            INNER JOIN users u ON p.user_id = u.id or f.follower_user_id = u.id
            WHERE u.id = :userId
            ORDER BY p.createdAt DESC
        `;
        const posts = await sequelizeConnection.query(query, {
            model: PostModel,
            mapToModel: true,
            replacements: { userId },
          });
          return posts
    }

    async search(searchQuery: string) : Promise<PostOutput[]> {
        try {
            const results = await PostModel.findAll({
              where: sequelizeConnection.literal(`to_tsvector('english', content) @@ plainto_tsquery('english', '${searchQuery}')`),
            });
            return results
        } catch (error) {
            console.error('Error performing full-text search:', error);
            throw error
        }
    }

}

export default new PostRepository()