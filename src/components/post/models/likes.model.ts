import { Model, Optional } from "sequelize"
import {sequelizeConnection, DataTypes} from "../../../database/postgres"
import User from "../../user/models/user.model"
import Post from "./post.model"

interface PostLikeAttributes {
    id: string,
    userId: string,
    postId: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface LikeInput extends Optional<PostLikeAttributes, 'id'> {}

class PostLike extends Model<PostLikeAttributes, LikeInput> implements PostLikeAttributes {
    public id: string
    public userId: string
    public postId: string
    public PostLike: string

    // timestamp
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

PostLike.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    postId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Post,
            key: 'id'
        }
    },
}, {
    sequelize: sequelizeConnection,
    tableName: "post_likes",
    timestamps: true
})

PostLike.belongsTo(User, {
    foreignKey: 'userId'
})
PostLike.belongsTo(Post, {
    foreignKey: 'postId'
})

export default PostLike