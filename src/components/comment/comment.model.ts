import { Model, Optional } from "sequelize"
import {sequelizeConnection, DataTypes} from "../../database/postgres"
import User from "../user/user.model"
import Post from "../post/post.model"

interface CommentAttributes {
    id: string,
    user_id?: string,
    post_id: string,
    comment: string,
    parent_comment_id?: string,
    created_at?: Date,
    updated_at?: Date,
}

export interface CommentInput extends Optional<CommentAttributes, 'id' | 'parent_comment_id'> {}
export interface CommentOutput extends Required<CommentAttributes> {}

class Comment extends Model<CommentAttributes, CommentInput> implements CommentAttributes {
    public id: string
    public user_id: string
    public post_id: string
    public comment: string
    public parent_comment_id: string

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
    parent_comment_id: {
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
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})

export default Comment