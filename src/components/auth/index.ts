import express, {Request, Response} from 'express'
import authController from './auth.controller'
import { validate } from '../../middleware/validate'
import { handleResponse } from '..'
import { UserLoginRequest, UserRegistrationRequest, userLoginSchema, userRegistrationSchema } from './auth.schema'

const authRouter = express.Router()

authRouter
    .route("/register")
    .post(validate(userRegistrationSchema), async (req: Request<{}, {}, UserRegistrationRequest>, res: Response) => {
        const payload : UserRegistrationRequest = req.body

        const result = await authController.register(payload)
        handleResponse(res, result)
    })

authRouter
    .route("/login")
    .post(validate(userLoginSchema), async (req: Request<{}, {}, UserLoginRequest>, res: Response) => {
        const payload : UserLoginRequest = req.body

        const result = await authController.login(payload)
        handleResponse(res, result)
    })

export default authRouter