import { Model, Optional } from "sequelize"
import {sequelizeConnection, DataTypes} from "../../../database/postgres"
import User from "../../user/models/user.model"
import Post from "./post.model"

interface CommentAttributes {
    id: string,
    userId?: string,
    postId: string,
    comment: string,
    parentCommentId?: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface CommentInput extends Optional<CommentAttributes, 'id' | 'parentCommentId'> {}
export interface CommentOutput extends Required<CommentAttributes> {}

class Comment extends Model<CommentAttributes, CommentInput> implements CommentAttributes {
    public id: string
    public userId: string
    public postId: string
    public comment: string
    public parentCommentId: string

    // timestamp
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
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
    parentCommentId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: Comment,
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
    timestamps: true
})

Comment.belongsTo(User, {
    foreignKey: 'userId'
})
Comment.belongsTo(Post, {
    foreignKey: 'postId'
})

export default Comment