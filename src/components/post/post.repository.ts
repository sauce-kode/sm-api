import PostModel from "./post.model";

class UserRepository {
    async create(payload: any) {
        try {
            return await PostModel.create(payload)
        } catch (error:any) {
            throw error
        }
    }
}

export default new UserRepository()