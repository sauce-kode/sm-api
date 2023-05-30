import { NextFunction, Request, Response } from "express";
import redisClient from "../libraries/redis";
import { handleResponse } from "../components";
import { Status, SuccessResponse } from "../libraries/IResponse";
import { HttpStatusCode } from "../libraries/httpStatusCodes";
import * as transformer from "./../components/post/post.transformer"

const checkCache = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId
    const cacheKey = `post:${postId}`

    const postJson = await redisClient.get(cacheKey)

    if (postJson) {
        const post = JSON.parse(postJson)
        handleResponse(res, new SuccessResponse(Status.SUCCESS, HttpStatusCode.CREATED, transformer.postResource(post)))
    } else {
        next()
    }
};

export default checkCache