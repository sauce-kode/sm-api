import { Model, Optional } from "sequelize"
import {sequelizeConnection, DataTypes} from "../../database/postgres"
import User from "../user/models/user.model"
import Post from "../post/post.model"

interface PostLikeAttributes {
    id: string,
    user_id: string,
    post_id: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface LikeInput extends Optional<PostLikeAttributes, 'id'> {}

class PostLike extends Model<PostLikeAttributes, LikeInput> implements PostLikeAttributes {
    public id: string
    public user_id: string
    public post_id: string

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
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    post_id: {
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
    foreignKey: 'user_id'
})
PostLike.belongsTo(Post, {
    foreignKey: 'post_id'
})

export default PostLike