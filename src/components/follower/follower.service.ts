import AppError from "../../libraries/error";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import { FollowerInput, FollowerOutput } from "./follower.model";
import followerUsersRepository from "./follower.repository";

class FollowerService {
    async createFollower(data: FollowerInput) : Promise<FollowerOutput | AppError> {
        try {
            if (data.follower_user_id === data.following_user_id) {
                return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, "You cannot follow yourself")
            }
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