import express, {Response} from "express";
import { IResponse } from "../libraries/IResponse";

import auth from "./auth"

const router = express.Router()

export const handleResponse = function(res: Response<any>, response: Partial<IResponse>) {
    let resp = Object.assign({}, response)
    delete resp.httpCode
    res.status(response.httpCode || 200).send(resp)
}

router.use("/auth", auth)

export default router