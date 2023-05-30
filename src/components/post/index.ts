import express, {Request, Response} from 'express'
import { validate } from '../../middleware/validate'
import { handleResponse } from '..'
import postController from './post.controller'
import { CreatePostRequest, CreatePostSchema, GetPostRequest, getPostSchema } from './post.schema'
import { IResponse } from '../../libraries/IResponse'
import checkCache from '../../middleware/checkCache'

const router = express.Router()

router
    .route("/")
    .post(validate(CreatePostSchema), async (req: Request<{}, {}, CreatePostRequest>, res: Response) => {
        const payload : CreatePostRequest = req.body
        const user = res.locals.user.id

        const result : IResponse = await postController.create(payload, user)
        handleResponse(res, result)
    })
    .get(async (req: Request, res: Response) => {
        const user = res.locals.user.id

        const result : IResponse = await postController.get(user)
        handleResponse(res, result)
    })

router
    .route("/:postId")
    .get(validate(getPostSchema), checkCache, async (req: Request<GetPostRequest>, res: Response) => {
        const postId = req.params.postId
        const user = res.locals.user.id

        const result : IResponse = await postController.find(postId, user)
        handleResponse(res, result)
    })

export default router