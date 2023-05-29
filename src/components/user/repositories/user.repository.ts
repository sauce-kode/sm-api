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

    async findUser(where: any) {
        try {
            return await UserModel.findOne({where: where})
        } catch (error) {
            throw error
        }
    }
}

export default new UserRepository()