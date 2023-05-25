import {sequelize, DataTypes} from "./../../database/postgres"

const UserModel = sequelize.define("users", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID,
        primaryKey: true
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
    created_at: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false
    },
    updated_at: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
        allowNull: false
    }
},
{
    timestamps: false,
})