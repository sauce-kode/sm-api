import FollowerUsersModel, { FollowerUserInput } from "../models/followerUser.model";

class FollowerUsersRepository {
    async create(payload: FollowerUserInput) {
        try {
            return await FollowerUsersModel.create(payload)
        } catch (error) {
            throw error
        }
    }
}

export default new FollowerUsersRepository()