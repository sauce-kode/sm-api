import { Model, Optional } from "sequelize"
import {sequelizeConnection, DataTypes} from "../../database/postgres"
import User from "../user/user.model"
import diff from "microdiff"
import cache from "../../libraries/cache"

interface PostAttributes {
    id: string,
    user_id: string,
    title: string,
    content: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export interface PostInput extends Optional<PostAttributes, 'id'> {}
export interface PostOutput extends Required<PostAttributes> {
    author?: string
}

class Post extends Model<PostAttributes, PostInput> implements PostAttributes {
    public id: string
    public user_id: string
    public title: string
    public content: string

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
    }
}, {
    sequelize: sequelizeConnection,
    tableName: "posts",
    paranoid: true, //set soft deletes for data
    timestamps: true,
    indexes: [
        {
            using: 'gin',
            fields: [sequelizeConnection.literal('to_tsvector(\'english\', content)')],
            name: 'posts_content_gin_idx',
        }
    ],
    hooks: {
        afterCreate(post, options) {
            const postId = post.id
            const cacheKey = `post:${postId}`

            const postJson = JSON.stringify(post)
            cache.addData(cacheKey, postJson)
        },
        afterUpdate(updatedPost, options) {
            const postId = updatedPost.id
            const cacheKey = `post:${postId}`

            const oldPost = cache.getData(cacheKey)
            
            if (!oldPost) return

            const instanceDiff = diff(oldPost, updatedPost)
            if (instanceDiff.length > 0) {
                cache.addData(cacheKey, JSON.stringify(updatedPost))
            }
        }
    }
})

Post.belongsTo(User, {
    foreignKey: 'user_id'
})

export default Post