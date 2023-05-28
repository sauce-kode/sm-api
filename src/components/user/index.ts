import express, {Request, Response} from 'express'
import { validate } from '../../middleware/validate'
import { FollowUserRequest, followUserSchema } from './follower.schema'
import { handleResponse } from '..'
import followerController from './controllers/follower.controller'

const router = express.Router()

router
    .route("/follow")
    .post(validate(followUserSchema),  async (req: Request<{}, {}, FollowUserRequest>, res: Response) => {
        const payload : FollowUserRequest = req.body

        const result = await followerController.create(payload)
        handleResponse(res, result)
    })
    // .delete()

export default router