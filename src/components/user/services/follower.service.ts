import AppError from "../../../libraries/error";
import { HttpStatusCode } from "../../../libraries/httpStatusCodes";
import { FollowerUserInput, FollowerUserOutput } from "../models/followerUser.model";
import followerUsersRepository from "../repositories/followerUsers.repository";

class FollowerService {
    async createFollower(data: FollowerUserInput) : Promise<FollowerUserOutput | AppError> {
        try {
            return await followerUsersRepository.create(data)
        } catch(error:any) {
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, error.message)
        }
    }

    async deleteFollower(data: FollowerUserInput) : Promise<boolean | AppError> {
        try {
            return await followerUsersRepository.delete({userId: data.userId, followingId: data.followingId})
        } catch(error:any) {
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, error.message)
        }
    }
}

export default new FollowerService()