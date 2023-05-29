import express, {Request, Response} from 'express'
import { validate } from '../../middleware/validate'
import { handleResponse } from '..'
import postController from './controllers/post.controller'
import { CreatePostRequest, CreatePostSchema } from './schemas/post.schema'
import { CreateCommentRequest, CreateCommentSchema } from './schemas/comment.schema'
import commentController from './controllers/comment.controller'
import { LikeCommentRequest } from './schemas/like.schema'
import likeController from './controllers/like.controller'

const router = express.Router()

router
    .route("/")
    .post(validate(CreatePostSchema), async (req: Request<{}, {}, CreatePostRequest>, res: Response) => {
        const payload : CreatePostRequest = req.body
        const user = res.locals.user.id

        const result = await postController.create(payload, user)
        handleResponse(res, result)
    })

router
    .route("/:postId/comment")
    .post(validate(CreateCommentSchema), async (req: Request<CreateCommentRequest['params'], {}, CreateCommentRequest['body']>, res: Response) => {
        const payload : CreateCommentRequest['body'] = req.body
        const postId = String(req.params.postId)
        const user = res.locals.user.id

        const result = await commentController.create(payload, user, postId)
        handleResponse(res, result)
    })

router
    .route("/:postId/like")
    .post(async (req: Request<LikeCommentRequest['params'], {}, CreateCommentRequest['body']>, res: Response) => {
        const postId = String(req.params.postId)
        const userId = String(res.locals.userId)
        const result = await likeController.create(userId, postId)
        handleResponse(res, result)
    })

export default router