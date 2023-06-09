import { NextFunction, Request, Response } from "express";
import { handleResponse } from "../components";
import { Status, SuccessResponse } from "../libraries/IResponse";
import { HttpStatusCode } from "../libraries/httpStatusCodes";
import * as transformer from "./../components/post/post.transformer"
import cache from "../libraries/cache";

const checkCache = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId
    const cacheKey = `post:${postId}`

    const postJson = await cache.getData(cacheKey)

    if (postJson) {
        const post = JSON.parse(postJson)
        handleResponse(res, new SuccessResponse(Status.SUCCESS, HttpStatusCode.CREATED, transformer.postResource(post)))
    } else {
        next()
    }
};

export default checkCache