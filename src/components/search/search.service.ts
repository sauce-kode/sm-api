import { PostOutput } from "../post/post.model"
import postRepository from "../post/post.repository"

class SearchService {

    async searchPosts(searchQuery: string) : Promise<PostOutput[]>  {
        try {
            return postRepository.search(searchQuery)
        } catch (error) {
            throw error
        }
    }

}

export default new SearchService()