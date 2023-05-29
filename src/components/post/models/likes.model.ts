import { Model, Optional } from "sequelize"
import {sequelizeConnection, DataTypes} from "../../../database/postgres"
import User from "../../user/models/user.model"
import Post from "./post.model"

interface PostLikeAttributes {
    id: string,
    userId: string,
    postId: string,
    created_at?: Date,
    updated_at?: Date,
}

export interface LikeInput extends Optional<PostLikeAttributes, 'id'> {}

class PostLike extends Model<PostLikeAttributes, LikeInput> implements PostLikeAttributes {
    public id: string
    public userId: string
    public postId: string
    public PostLike: string

    // timestamp
    public readonly created_at!: Date
    public readonly updated_at!: Date
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
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})

PostLike.belongsTo(User)
PostLike.belongsTo(Post)

export default PostLike