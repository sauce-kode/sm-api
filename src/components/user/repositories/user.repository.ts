import UserModel, { UserInput, UserOutput } from "../models/user.model";

class UserRepository {
    async create(payload: UserInput) {
        try {
            return await UserModel.create(payload)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async findUserById(id: string) : Promise<UserOutput> {
        const user = await UserModel.findByPk(id)

        if (!user) {
            throw new Error('user not found')
        }

        return user
    }

    async findUserBy(where: any) : Promise<UserOutput | null> {
        try {
            return await UserModel.findOne({where: where})
        } catch (error) {
            throw error
        }
    }
}

export default new UserRepository()