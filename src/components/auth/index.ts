import express, {Request, Response} from 'express'
import authController from './auth.controller'
import { validate } from '../../middleware/validate'
import { CreateUserRequest, createUserSchema } from '../user/user.schema'
import { handleResponse } from '..'
import { RegisterDto } from './auth.dto'

const authRouter = express.Router()

authRouter
    .route("/register")
    .post(validate(createUserSchema), async (req: Request<{}, {}, CreateUserRequest>, res: Response) => {
        const payload : RegisterDto = req.body

        const result = await authController.register(payload)
        handleResponse(res, result)
    })

export default authRouter