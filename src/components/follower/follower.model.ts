import { Model, Optional } from "sequelize"
import {sequelizeConnection, DataTypes} from "../../database/postgres"
import User from "../user/user.model"

interface FollowerAttributes {
    following_user_id: string,
    follower_user_id: string,
    createdAt?: Date,
}

export interface FollowerInput extends Optional<FollowerAttributes, 'createdAt'> {}
export interface FollowerOutput extends Required<FollowerAttributes> {}

class Follower extends Model<FollowerAttributes, FollowerInput> implements FollowerAttributes {
    public follower_user_id: string
    public following_user_id: string

    // timestamp
    public readonly createdAt!: Date
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
    updatedAt: false,
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