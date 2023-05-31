"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const postgres_1 = require("../../database/postgres");
const user_model_1 = __importDefault(require("../user/user.model"));
class Follower extends sequelize_1.Model {
}
Follower.init({
    following_user_id: {
        type: postgres_1.DataTypes.STRING,
        references: {
            model: user_model_1.default,
            key: 'id'
        }
    },
    follower_user_id: {
        type: postgres_1.DataTypes.STRING,
        references: {
            model: user_model_1.default,
            key: 'id'
        }
    },
}, {
    sequelize: postgres_1.sequelizeConnection,
    tableName: "followers",
    createdAt: 'created_at',
    updatedAt: false
});
user_model_1.default.belongsToMany(user_model_1.default, {
    through: Follower,
    as: "`following`",
    foreignKey: "following_user_id"
});
user_model_1.default.belongsToMany(user_model_1.default, {
    through: Follower,
    as: "follower",
    foreignKey: "follower_user_id"
});
exports.default = Follower;
