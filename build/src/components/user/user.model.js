"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const postgres_1 = require("../../database/postgres");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: postgres_1.DataTypes.UUID,
        defaultValue: postgres_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: postgres_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    email: {
        type: postgres_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: postgres_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: postgres_1.sequelizeConnection,
    tableName: "users",
    paranoid: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
});
exports.default = User;
