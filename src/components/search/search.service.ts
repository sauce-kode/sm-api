import Utils, { Paginate } from "../../libraries/utils"
import postRepository from "../post/post.repository"

class SearchService {

    async searchPosts(searchQuery: string, limit: number, offset: number) : Promise<Paginate>  {
        try {
            const {rows, count} = await postRepository.search(searchQuery, limit - 1, offset)
            const data = Utils.computePagination(count, rows, offset, limit)
            return data
        } catch (error) {
            throw error
        }
    }

}

export default new SearchService()