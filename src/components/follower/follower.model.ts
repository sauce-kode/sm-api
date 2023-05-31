import { Model, Optional } from "sequelize"
import {sequelizeConnection, DataTypes} from "../../database/postgres"
import User from "../user/user.model"

interface FollowerAttributes {
    following_user_id: string,
    follower_user_id: string,
    created_at?: Date,
}

export interface FollowerInput extends Optional<FollowerAttributes, 'created_at'> {}
export interface FollowerOutput extends Required<FollowerAttributes> {}

class Follower extends Model<FollowerAttributes, FollowerInput> implements FollowerAttributes {
    public follower_user_id: string
    public following_user_id: string

    // timestamp
    public readonly created_at!: Date
}

Follower.init({
    following_user_id: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'id'
        }
    },
    follower_user_id: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'id'
        }
    },
}, {
    sequelize: sequelizeConnection,
    tableName: "followers",
    createdAt: 'created_at',
    updatedAt: false
})

User.belongsToMany(User, {
    through: Follower,
    as: "`following`",
    foreignKey: "following_user_id"
})

User.belongsToMany(User, {
    through: Follower,
    as: "follower",
    foreignKey: "follower_user_id"
})

export default Follower