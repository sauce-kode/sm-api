import express, {Request, Response} from 'express'
import { validate } from '../../middleware/validate'
import { handleResponse } from '..'
import postController from './post.controller'
import { CreatePostRequest, CreatePostSchema } from './post.schema'

const authRouter = express.Router()

authRouter
    .route("/")
    .post(validate(CreatePostSchema), async (req: Request<{}, {}, CreatePostRequest>, res: Response) => {
        const payload : CreatePostRequest = req.body

        const result = await postController.create(payload)
        handleResponse(res, result)
    })

export default authRouter