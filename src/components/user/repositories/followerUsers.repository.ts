import FollowerUsersModel, { FollowerUserInput, FollowerUserOutput } from "../models/followerUser.model";

class FollowerUsersRepository {
    async create(payload: FollowerUserInput) : Promise<FollowerUserOutput> {
        try {
            return await FollowerUsersModel.create(payload)
        } catch (error) {
            throw error
        }
    }

    async delete(where: any) : Promise<boolean> {
        try {
            const deletedFollowerCount = await FollowerUsersModel.destroy({where: where})
            return !!deletedFollowerCount
        } catch (error) {
            throw error
        }
    }
}

export default new FollowerUsersRepository()