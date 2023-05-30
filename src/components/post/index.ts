import express, {Request, Response} from 'express'
import { validate } from '../../middleware/validate'
import { handleResponse } from '..'
import postController from './post.controller'
import { CreatePostRequest, CreatePostSchema } from './post.schema'
import { IResponse } from '../../libraries/IResponse'

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

export default router