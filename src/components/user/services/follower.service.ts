import AppError from "../../../libraries/error";
import { HttpStatusCode } from "../../../libraries/httpStatusCodes";
import { FollowerInput, FollowerOutput } from "../models/follower.model";
import followerUsersRepository from "../repositories/follower.repository";

class FollowerService {
    async createFollower(data: FollowerInput) : Promise<FollowerOutput | AppError> {
        try {
            return await followerUsersRepository.create(data)
        } catch(error:any) {
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, error.message)
        }
    }

    async deleteFollower(data: FollowerInput) : Promise<boolean | AppError> {
        try {
            return await followerUsersRepository.delete(data)
        } catch(error:any) {
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, error.message)
        }
    }
}

export default new FollowerService()