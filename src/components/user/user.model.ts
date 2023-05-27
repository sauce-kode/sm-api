import { Model, Optional } from "sequelize"
import {sequelize, DataTypes} from "../../database/postgres"

interface UserAttributes {
    id: string,
    username: string,
    email: string,
    password: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date
}

export interface UserInput extends Optional<UserAttributes, 'id'> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id: string
    public username: string
    public email: string
    public password: string

    // timestamp
    public readonly created_at!: Date
    public readonly updated_at!: Date
    public readonly deleted_at!: Date
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    paranoid: true, //set soft deletes for data
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
})

export default User