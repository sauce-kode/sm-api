import postService from "../services/post.service"
import { IResponse, Status, SuccessResponse } from "../../../libraries/IResponse"
import * as transformer from "../transformers/post.transformer"
import { HttpStatusCode } from "../../../libraries/httpStatusCodes"

class SearchController {
    async get(queryParam: string) : Promise<IResponse> {
        const result = await postService.searchPosts(queryParam)
        return new SuccessResponse(Status.SUCCESS, HttpStatusCode.CREATED, result.map(transformer.postResource))
    }
}

export default new SearchController()