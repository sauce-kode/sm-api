import bcrypt from "bcrypt";
import AppError, { handler } from "./error";
import { HttpStatusCode } from "./httpStatusCodes";
import { CommonErrors } from "./commonErrors";

export default class Utils {

    static async generateSalt() {
        try {
            return await bcrypt.genSalt(Number(process.env.HASHING_ROUNDS));
        } catch (error:any) {
            handler.handleError(error);
            throw new AppError("Salt Error", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.SERVER_ERROR, true);
        }
    }

    static async hashText(text: string, salt: string) {
        try {
            return await bcrypt.hash(text, salt);
        } catch (error:any) {
            handler.handleError(error);
            throw new AppError("Hashing Error", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.SERVER_ERROR, true);
        }
    }

    static async compareTexts(plain: string, hashed: string) {
        try {
            return await bcrypt.compare(plain, hashed);
        } catch(error:any) {
            handler.handleError(error);
            throw new AppError("Comparing Hash Error", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.SERVER_ERROR, true);
        }
    }

}