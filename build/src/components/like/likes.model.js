"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const postgres_1 = require("../../database/postgres");
const user_model_1 = __importDefault(require("../user/user.model"));
const post_model_1 = __importDefault(require("../post/post.model"));
class PostLike extends sequelize_1.Model {
}
PostLike.init({
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
}, {
    sequelize: postgres_1.sequelizeConnection,
    tableName: "post_likes",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
PostLike.belongsTo(user_model_1.default, {
    foreignKey: 'user_id'
});
PostLike.belongsTo(post_model_1.default, {
    foreignKey: 'post_id'
});
exports.default = PostLike;
