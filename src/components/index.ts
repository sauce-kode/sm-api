import express, {Response} from "express";
import { IResponse } from "../libraries/IResponse";

import auth from "./auth"
import post from "./post"
import follow from "./follower"
import comment from "./comment"
import like from "./like"
import search from "./search"

import requireAuthentication from "../middleware/requireAuthentication";

const router = express.Router()

export const handleResponse = function(res: Response<any>, response: Partial<IResponse>) {
    let resp = Object.assign({}, response)
    delete resp.httpCode
    res.status(response.httpCode || 400).send(resp)
}

router.use("/auth", auth)

router.use(requireAuthentication)

router.use("/follow", follow)
router.use("/posts", post)
router.use("/search", search)
router.use("/comments", comment)
router.use("/like", like)

export default router