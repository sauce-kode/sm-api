import UserModel, { UserInput } from "./user.model";

class UserRepository {
    async create(payload: UserInput) {
        try {
            return await UserModel.create(payload)
        } catch (error) {
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