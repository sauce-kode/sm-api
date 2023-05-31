"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const postgres_1 = require("../../database/postgres");
const user_model_1 = __importDefault(require("../user/user.model"));
const microdiff_1 = __importDefault(require("microdiff"));
const cache_1 = __importDefault(require("../../libraries/cache"));
class Post extends sequelize_1.Model {
}
Post.init({
    id: {
        type: postgres_1.DataTypes.UUID,
        defaultValue: postgres_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: postgres_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: user_model_1.default,
            key: 'id'
        }
    },
    title: {
        type: postgres_1.DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: postgres_1.DataTypes.TEXT(),
        allowNull: true
    }
}, {
    sequelize: postgres_1.sequelizeConnection,
    tableName: "posts",
    paranoid: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    indexes: [
        {
            using: 'gin',
            fields: [postgres_1.sequelizeConnection.literal('to_tsvector(\'english\', content)'),],
            name: 'posts_content_gin_idx',
        },
        {
            using: 'gin',
            fields: [postgres_1.sequelizeConnection.literal('to_tsvector(\'english\', title)'),],
            name: 'posts_title_gin_idx',
        }
    ],
    hooks: {
        afterCreate(post, options) {
            const postId = post.id;
            const cacheKey = `post:${postId}`;
            const postJson = JSON.stringify(post);
            cache_1.default.addData(cacheKey, postJson);
        },
        afterUpdate(updatedPost, options) {
            const postId = updatedPost.id;
            const cacheKey = `post:${postId}`;
            const oldPost = cache_1.default.getData(cacheKey);
            if (!oldPost)
                return;
            const instanceDiff = (0, microdiff_1.default)(oldPost, updatedPost);
            if (instanceDiff.length > 0) {
                cache_1.default.addData(cacheKey, JSON.stringify(updatedPost));
            }
        }
    }
});
Post.belongsTo(user_model_1.default, {
    foreignKey: 'user_id'
});
exports.default = Post;
