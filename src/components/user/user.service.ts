import { CommonErrors } from "../../libraries/commonErrors";
import AppError, { handler } from "../../libraries/error";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import Utils from "../../libraries/utils";
import { UserInput, UserOutput } from "./user.model";
import userRepository from "./user.repository";

class UserService {

    async createUser(user: UserInput) : Promise<UserOutput | AppError> {
        const salt = await Utils.generateSalt()
        user.password = await Utils.hashText(user.password, salt)

        try {
            return await userRepository.create(user)
        } catch(error:any) {
            handler.reportError(error)
            if (error.name == "SequelizeDatabaseError") {
                return new AppError("", HttpStatusCode.CONFLICT, CommonErrors.USER_EXISTS)
            }
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, error.message)
        }
    }

    async findUserByEmail(email:string) {
        try {
            const response = userRepository.findUserBy(email)
            return response
        } catch (error:any) {
            handler.reportError(error)
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, error.message)
        }
    }

}

export default new UserService()