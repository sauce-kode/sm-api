import express from 'express'
import { validate } from '../../middleware/validate'
import { createUserSchema } from './user.schema'
import userController from './user.controller'

const router = express.Router()

router
    .route("/")

export default router