import { CommonErrors } from "../../../libraries/commonErrors";
import AppError, { handler } from "../../../libraries/error";
import { HttpStatusCode } from "../../../libraries/httpStatusCodes";
import Utils from "../../../libraries/utils";
import { UserInput, UserOutput } from "../models/user.model";
import userRepository from "../repositories/user.repository";

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

    async findUserByEmail(email:string) : Promise<UserOutput | AppError | null> {
        try {
            return userRepository.findUser({email: email})
        } catch (error:any) {
            handler.reportError(error)
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, error.message)
        }
    }

    async findUserByUsername(username: string) : Promise<UserOutput | AppError | null>  {
        try {
            return userRepository.findUser({username: username})
        } catch (error:any) {
            handler.reportError(error)
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, error.message)
        }
    }

    async followUser() {
        
    }

    async comparePasswords(plainPassword: string, hashedPassword: string) : Promise<boolean> {
        return Utils.compareTexts(plainPassword, hashedPassword)
    }

}

export default new UserService()