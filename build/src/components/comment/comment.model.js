"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const postgres_1 = require("../../database/postgres");
const user_model_1 = __importDefault(require("../user/user.model"));
const post_model_1 = __importDefault(require("../post/post.model"));
class Comment extends sequelize_1.Model {
}
Comment.init({
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
    post_id: {
        type: postgres_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: post_model_1.default,
            key: 'id'
        }
    },
    parent_comment_id: {
        type: postgres_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: Comment,
            key: 'id'
        }
    },
    comment: {
        type: postgres_1.DataTypes.TEXT(),
        allowNull: true
    },
}, {
    sequelize: postgres_1.sequelizeConnection,
    tableName: "post_comments",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
Comment.belongsTo(user_model_1.default, {
    foreignKey: 'user_id'
});
Comment.belongsTo(post_model_1.default, {
    foreignKey: 'post_id'
});
exports.default = Comment;
