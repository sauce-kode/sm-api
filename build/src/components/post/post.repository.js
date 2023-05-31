"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_model_1 = __importDefault(require("./post.model"));
const postgres_1 = require("../../database/postgres");
class PostRepository {
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield post_model_1.default.create(payload);
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield post_model_1.default.findByPk(id);
            if (!post) {
                throw new Error('not found');
            }
            const updatedPost = yield post.update(payload);
            return updatedPost;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield post_model_1.default.findByPk(id);
            if (!post) {
                throw new Error('Post not found');
            }
            return post;
        });
    }
    getAll(userId, limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT p.*, u.username as author
            FROM posts p
            LEFT JOIN followers f ON p.user_id = f.following_user_id
            INNER JOIN users u ON p.user_id = u.id or f.follower_user_id = u.id
            WHERE u.id = :userId
            ORDER BY created_at DESC
            LIMIT :limit OFFSET :offset
        `;
            const posts = yield postgres_1.sequelizeConnection.query(query, {
                model: post_model_1.default,
                mapToModel: true,
                replacements: { userId, limit, offset },
            });
            console.log("POSTS", posts);
            return posts;
        });
    }
    search(searchQuery, offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = {
                rows: [],
                count: 0
            };
            try {
                const { count, rows } = yield post_model_1.default.findAndCountAll({
                    where: postgres_1.sequelizeConnection.literal(`to_tsvector('english', content) || to_tsvector('english', title) @@ to_tsquery('english', '${searchQuery}')`),
                    order: [['created_at', 'DESC']],
                    offset: offset,
                    limit: limit
                });
                results.count = count;
                results.rows = rows;
                return results;
            }
            catch (error) {
                console.error('Error performing full-text search:', error);
                throw error;
            }
        });
    }
}
exports.default = new PostRepository();
