import { Model, Optional } from "sequelize"
import {sequelizeConnection, DataTypes} from "../../../database/postgres"
import User from "../../user/models/user.model"

interface PostAttributes {
    id: string,
    userId: string,
    title: string,
    content: string,
    slug: string,
    likeCount: number,
    commentCount: number,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date
}

export interface PostInput extends Optional<PostAttributes, 'id' | 'userId' | 'slug' | 'likeCount' | 'commentCount'> {}
export interface PostOutput extends Required<PostAttributes> {}

class Post extends Model<PostAttributes, PostInput> implements PostAttributes {
    public id: string
    public userId: string
    public title: string
    public content: string
    public slug: string
    public likeCount: number
    public commentCount: number

    // timestamp
    public readonly created_at!: Date
    public readonly updated_at!: Date
    public readonly deleted_at!: Date
}

Post.init({
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
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT(),
        allowNull: true
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
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
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    hooks: {
        afterCreate: (post, options) => {
            // console.log("POST >>>", post)
            // console.log("OPTIONS >>>>>", options)
        } 
    }
})

Post.belongsTo(User, {
    foreignKey: 'userId'
})

export default Post