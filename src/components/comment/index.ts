import express, {Request, Response} from 'express'
import { validate } from '../../middleware/validate'
import { handleResponse } from '..'
import { CreateCommentRequest, CreateCommentSchema } from '../comment/comment.schema'
import commentController from '../comment/comment.controller'
import { IResponse } from '../../libraries/IResponse'

const router = express.Router()

router
    .route("/:postId/comment")
    .post(validate(CreateCommentSchema), async (req: Request<CreateCommentRequest['params'], {}, CreateCommentRequest['body']>, res: Response) => {
        const payload : CreateCommentRequest['body'] = req.body
        const postId = String(req.params.postId)
        const user = res.locals.user.id

        const result : IResponse = await commentController.create(payload, user, postId)
        handleResponse(res, result)
    })