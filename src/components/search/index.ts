import express, {Request, Response} from 'express'
import { handleResponse } from '..'
import { IResponse } from '../../libraries/IResponse'
import searchController from '../search/search.controller'

const router = express.Router()

router
    .route("/search")
    .get(async (req: Request, res: Response) => {
        const {query} = req.query
        
        const result : IResponse = await searchController.get(query as string)
        handleResponse(res, result)
    })
export default router