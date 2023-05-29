import express, {Request, Response} from 'express'
import { validate } from '../../middleware/validate'
import { handleResponse } from '..'
import postController from './controllers/post.controller'
import { CreatePostRequest, CreatePostSchema } from './schemas/post.schema'
import { CreateCommentRequest, CreateCommentSchema } from './schemas/comment.schema'
import commentController from './controllers/comment.controller'
import { CommentInput } from './models/comment.model'
import { PostInput } from './models/post.model'

const router = express.Router()

router
    .route("/")
    .post(validate(CreatePostSchema), async (req: Request<{}, {}, CreatePostRequest>, res: Response) => {
        const payload : PostInput = req.body

        const result = await postController.create(payload)
        handleResponse(res, result)
    })

router
    .route("/:postId/comment")
    .post(validate(CreateCommentSchema), async (req: Request<CreateCommentRequest['params'], {}, CreateCommentRequest['body']>, res: Response) => {
        const payload : CreateCommentRequest['body'] = req.body
        const postId = String(req.params.postId)
        const result = await commentController.create(payload, postId)
        handleResponse(res, result)
    })

export default router