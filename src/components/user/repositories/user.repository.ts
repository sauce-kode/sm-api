import UserModel, { UserInput } from "../models/user.model";

class UserRepository {
    async create(payload: UserInput) {
        try {
            return await UserModel.create(payload)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async findUserByEmail(email: string) {
        try {
            return await UserModel.findOne({where: {email: email}})
        } catch (error) {
            throw error
        }
    }

    async findUserByUsername(username: string) {
        try {
            return await UserModel.findOne({where: {username: username}})
        } catch (error) {
            throw error
        }
    }
}

export default new UserRepository()