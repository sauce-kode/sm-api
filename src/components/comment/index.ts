import express, {Request, Response} from 'express'
import { validate } from '../../middleware/validate'
import { handleResponse } from '..'
import { CreateCommentRequest, CreateCommentSchema } from '../comment/comment.schema'
import commentController from '../comment/comment.controller'
import { IResponse } from '../../libraries/IResponse'

const router = express.Router()

router
    .route("/")
    .post(validate(CreateCommentSchema), async (req: Request<{}, {}, CreateCommentRequest>, res: Response) => {
        const payload : CreateCommentRequest = req.body
        const user = res.locals.user.id

        const result : IResponse = await commentController.create(payload, user)
        handleResponse(res, result)
    })

export default router