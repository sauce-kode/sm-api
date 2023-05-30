import { Model, Optional } from "sequelize"
import { DataTypes, sequelizeConnection } from "../../database/postgres"

interface UserAttributes {
    id: string,
    username: string,
    email: string,
    password: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export interface UserInput extends Optional<UserAttributes, 'id'> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id: string
    public username: string
    public email: string
    public password: string

    // timestamp
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
    public readonly deletedAt!: Date
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
    sequelize: sequelizeConnection,
    tableName: "users",
    paranoid: true, //set soft deletes for data
    timestamps: true
})

export default User