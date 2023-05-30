import express, {Request, Response} from 'express'
import { handleResponse } from '..'
import { LikeCommentRequest } from '../like/like.schema'
import likeController from '../like/like.controller'
import { IResponse } from '../../libraries/IResponse'

const router = express.Router()

router
    .route("/:postId/like")
    .post(async (req: Request<LikeCommentRequest['params'], {}, {}>, res: Response) => {
        const postId = String(req.params.postId)
        const userId = String(res.locals.user.id)

        const result : IResponse = await likeController.create(userId, postId)
        handleResponse(res, result)
    })

export default router