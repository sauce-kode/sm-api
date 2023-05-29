import express, {Request, Response} from 'express'
import { validate } from '../../middleware/validate'
import { handleResponse } from '..'
import postController from './controllers/post.controller'
import { CreatePostRequest, CreatePostSchema } from './schemas/post.schema'
import { CreateCommentRequest, CreateCommentSchema } from './schemas/comment.schema'
import commentController from './controllers/comment.controller'

const router = express.Router()

router
    .route("/")
    .post(validate(CreatePostSchema), async (req: Request<{}, {}, CreatePostRequest>, res: Response) => {
        const payload : CreatePostRequest = req.body

        const result = await postController.create(payload)
        handleResponse(res, result)
    })

router
    .route("/comment")
    .post(validate(CreateCommentSchema), async (req: Request<{}, {}, CreateCommentRequest>, res: Response) => {
        const payload : CreateCommentRequest = req.body

        const result = await commentController.create(payload)
        handleResponse(res, result)
    })

export default router