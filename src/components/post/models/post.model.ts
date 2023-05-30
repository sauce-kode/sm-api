import { Model, Optional } from "sequelize"
import {sequelizeConnection, DataTypes} from "../../../database/postgres"
import User from "../../user/models/user.model"

interface PostAttributes {
    id: string,
    user_id: string,
    title: string,
    content: string,
    likeCount: number,
    commentCount: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export interface PostInput extends Optional<PostAttributes, 'id' | 'user_id' | 'likeCount' | 'commentCount'> {}
export interface PostOutput extends Required<PostAttributes> {
    author?: string
}

class Post extends Model<PostAttributes, PostInput> implements PostAttributes {
    public id: string
    public user_id: string
    public title: string
    public content: string
    public likeCount: number
    public commentCount: number

    // timestamp
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
    public readonly deletedAt!: Date
}

Post.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT(),
        allowNull: true
    },
    likeCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    commentCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize: sequelizeConnection,
    tableName: "posts",
    paranoid: true, //set soft deletes for data
    timestamps: true,
})

Post.belongsTo(User, {
    foreignKey: 'user_id'
})

export default Post