import express, {Request, Response} from 'express'
import { handleResponse } from '..'
import { LikePostRequest } from '../like/like.schema'
import likeController from '../like/like.controller'
import { IResponse } from '../../libraries/IResponse'

const router = express.Router()

router
    .route("/")
    .post(async (req: Request<{}, {}, LikePostRequest>, res: Response) => {
        const payload : LikePostRequest = req.body
        const userId = String(res.locals.user.id)

        const result : IResponse = await likeController.create(payload, userId)
        handleResponse(res, result)
    })
    .delete(async (req: Request<{}, {}, LikePostRequest>, res: Response) => {
        const payload : LikePostRequest = req.body
        const userId = String(res.locals.user.id)

        const result : IResponse = await likeController.delete(payload, userId)
        handleResponse(res, result)
    })

export default router