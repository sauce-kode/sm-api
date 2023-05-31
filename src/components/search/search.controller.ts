import { IResponse, Status, SuccessResponse } from "../../libraries/IResponse"
import * as transformer from "../post/post.transformer"
import { HttpStatusCode } from "../../libraries/httpStatusCodes"
import searchService from "./search.service"

class SearchController {
    async get(queryParam: string, offset: number, limit: number) : Promise<IResponse> {
        const result = await searchService.searchPosts(queryParam, 1, 10)
        return new SuccessResponse(Status.SUCCESS, HttpStatusCode.OK, {
            'posts' : result.data.map(transformer.postResource),
            'pagination': {
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                currentPage: result.currentPage,
                nextPage: result.nextPage
            }
        })
    }
}

export default new SearchController()