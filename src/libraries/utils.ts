import bcrypt from "bcrypt";
import AppError, { handler } from "./error";
import { HttpStatusCode } from "./httpStatusCodes";
import { CommonErrors } from "./commonErrors";
import customConfig from "../config/default";

export default class Utils {

    static async generateSalt() {
        try {
            return await bcrypt.genSalt(customConfig.hashingRounds);
        } catch (error:any) {
            handler.reportError(error);
            throw new AppError("Salt Error", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.SERVER_ERROR);
        }
    }

    static async hashText(text: string, salt: string) {
        try {
            return await bcrypt.hash(text, salt);
        } catch (error:any) {
            handler.reportError(error);
            throw new AppError("Hashing Error", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.SERVER_ERROR);
        }
    }

    static async compareTexts(plain: string, hashed: string) {
        try {
            return await bcrypt.compare(plain, hashed);
        } catch(error:any) {
            handler.reportError(error);
            throw new AppError("Comparing Hash Error", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.SERVER_ERROR);
        }
    }

    static async stringIsEmail(text: string) : Promise<boolean> {
        const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
        return await regexExp.test(text)
    }

}