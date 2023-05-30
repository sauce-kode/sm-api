import { Model } from "sequelize"
import {sequelizeConnection, DataTypes} from "../../../database/postgres"
import User from "./user.model"

interface FollowerAttributes {
    followingId: string,
    userId: string,
    createdAt?: Date,
}

export interface FollowerInput extends Required<FollowerAttributes> {}
export interface FollowerOutput extends Required<FollowerAttributes> {}

class Follower extends Model<FollowerAttributes, FollowerInput> implements FollowerAttributes {
    public userId: string
    public followingId: string

    // timestamp
    public readonly createdAt!: Date
}

Follower.init({
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
    tableName: "followers",
    updatedAt: false,
})

User.belongsToMany(User, {
    through: Follower,
    as: "`following`",
    foreignKey: "followingId"
})

User.belongsToMany(User, {
    through: Follower,
    as: "follower",
    foreignKey: "userId"
})

export default Follower