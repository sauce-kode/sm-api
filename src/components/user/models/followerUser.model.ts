import { Model, Optional } from "sequelize"
import {sequelizeConnection, DataTypes} from "../../../database/postgres"
import User from "./user.model"

interface FollowerUsersAttributes {
    id: string,
    followingId: string,
    userId: string,
    created_at?: Date,
    updated_at?: Date,
}

export interface FollowerUserInput extends Optional<FollowerUsersAttributes, 'id' | 'userId'> {}
export interface FollowerUserOutput extends Required<FollowerUsersAttributes> {}

class FollowerUsers extends Model<FollowerUsersAttributes, FollowerUserInput> implements FollowerUsersAttributes {
    public id: string
    public userId: string
    public followingId: string

    // timestamp
    public readonly created_at!: Date
    public readonly updated_at!: Date
}

FollowerUsers.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    followingId: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'id'
        }
    },
}, {
    sequelize: sequelizeConnection,
    tableName: "follower_users",
    createdAt: 'created_at',
    updatedAt: false,
})

User.belongsToMany(User, {
    through: FollowerUsers,
    as: "`following`",
    foreignKey: "followingId"
})

User.belongsToMany(User, {
    through: FollowerUsers,
    as: "follower",
    foreignKey: "userId"
})

export default FollowerUsers