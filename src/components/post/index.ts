import express, {Request, Response} from 'express'
import { validate } from '../../middleware/validate'
import { handleResponse } from '..'
import postController from './post.controller'
import { CreatePostRequest, CreatePostSchema } from './post.schema'
import { CreateCommentRequest, CreateCommentSchema } from '../comment/comment.schema'
import commentController from '../comment/comment.controller'
import { LikeCommentRequest } from '../like/like.schema'
import likeController from '../like/like.controller'
import { IResponse } from '../../libraries/IResponse'
import searchController from '../search/search.controller'

const router = express.Router()

router
    .route("/")
    .post(validate(CreatePostSchema), async (req: Request<{}, {}, CreatePostRequest>, res: Response) => {
        const payload : CreatePostRequest = req.body
        const user = res.locals.user.id

        const result : IResponse = await postController.create(payload, user)
        handleResponse(res, result)
    })
    .get(async (req: Request<{}, {}, {}>, res: Response) => {
        const user = res.locals.user.id

        const result : IResponse = await postController.get(user)
        handleResponse(res, result)
    })

router
    .route("/:postId/comment")
    .post(validate(CreateCommentSchema), async (req: Request<CreateCommentRequest['params'], {}, CreateCommentRequest['body']>, res: Response) => {
        const payload : CreateCommentRequest['body'] = req.body
        const postId = String(req.params.postId)
        const user = res.locals.user.id

        const result : IResponse = await commentController.create(payload, user, postId)
        handleResponse(res, result)
    })

router
    .route("/:postId/like")
    .post(async (req: Request<LikeCommentRequest['params'], {}, CreateCommentRequest['body']>, res: Response) => {
        const postId = String(req.params.postId)
        const userId = String(res.locals.user.id)

        const result : IResponse = await likeController.create(userId, postId)
        handleResponse(res, result)
    })
    .delete(async (req: Request<LikeCommentRequest['params'], {}, CreateCommentRequest['body']>, res: Response) => {
        const postId = String(req.params.postId)
        const userId = String(res.locals.user.id)

        const result : IResponse = await likeController.delete(userId, postId)
        handleResponse(res, result)
    })

router
    .route("/search")
    .get(async (req: Request<{}, {}, {}>, res: Response) => {
        const {query} = req.query
        
        const result : IResponse = await searchController.get(query as string)
        handleResponse(res, result)
    })
export default router