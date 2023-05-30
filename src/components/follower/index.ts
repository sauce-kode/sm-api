import express, {Request, Response} from 'express'
import { validate } from '../../middleware/validate'
import { FollowUserRequest, followUserSchema } from '../follower/follower.schema'
import { handleResponse } from '..'
import followerController from '../follower/follower.controller'

const router = express.Router()

router
    .route("/follow")
    .post(validate(followUserSchema),  async (req: Request<{}, {}, FollowUserRequest>, res: Response) => {
        const payload : FollowUserRequest = req.body
        const user = res.locals.user.id
        
        const result = await followerController.create(payload, user)
        handleResponse(res, result)
    })
    .delete(validate(followUserSchema),   async (req: Request<FollowUserRequest>, res: Response) => {
        const payload : FollowUserRequest = req.body
        const user = res.locals.user.id

        const result = await followerController.delete(payload, user)
        handleResponse(res, result)
    })

export default router