import bcrypt from "bcrypt";
import AppError, { handler } from "./error";
import { HttpStatusCode } from "./httpStatusCodes";
import { CommonErrors } from "./commonErrors";

export interface Paginate {
    totalPages: number,
    prevPage: number | null,
    currentPage: number,
    nextPage: number | null,
    data: {[name: string]: any}
}

export default class Utils {

    static async generateSalt() {
        try {
            return await bcrypt.genSalt(10);
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

    static computePagination(total: number, data: any, page: number, limit: number) {
        const totalPages = total;

        const response: Paginate = {
            totalPages: totalPages/limit,
            currentPage: page,
            data,
            prevPage: page - 1 == 0 ? null : page - 1,
            nextPage: page++
        }
        return response;
    }

    static async stringIsEmail(text: string) : Promise<boolean> {
        const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
        return regexExp.test(text)
    }

}