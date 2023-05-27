import UserModel from "./user.model";

class UserRepository {
    async create(payload: any) {
        try {
            return await UserModel.create(payload)
        } catch (error:any) {
            throw error
        }
    }

    async findUserBy(email: string) {
        try {
            return await UserModel.findOne({where: {email: email}})
        } catch (error:any) {
            throw error
        }
    }

}

export default new UserRepository()