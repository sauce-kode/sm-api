import { Model, Optional } from "sequelize"
import {sequelizeConnection, DataTypes} from "../../../database/postgres"
import User from "../../user/models/user.model"
import Post from "./post.model"

interface CommentAttributes {
    id: string,
    userId: string,
    postId: string,
    parentCommentId?: string,
    comment: string,
    created_at?: Date,
    updated_at?: Date,
}

export interface CommentInput extends Optional<CommentAttributes, 'id' | 'parentCommentId'> {}
export interface CommentOutput extends Required<CommentAttributes> {}

class Comment extends Model<CommentAttributes, CommentInput> implements CommentAttributes {
    public id: string
    public userId: string
    public postId: string
    public comment: string

    // timestamp
    public readonly created_at!: Date
    public readonly updated_at!: Date
}

Comment.init({
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
    comment: {
        type: DataTypes.TEXT(),
        allowNull: true
    },
}, {
    sequelize: sequelizeConnection,
    tableName: "post_comments",
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})

Comment.belongsTo(User)
Comment.belongsTo(Post)

export default Post