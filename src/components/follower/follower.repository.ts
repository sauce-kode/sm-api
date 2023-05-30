import FollowerModel, { FollowerInput, FollowerOutput } from "./follower.model";

class FollowerRepository {
    async create(payload: FollowerInput) : Promise<FollowerOutput> {
        try {
            return await FollowerModel.create(payload)
        } catch (error) {
            throw error
        }
    }

    async delete(where: any) : Promise<boolean> {
        try {
            const deletedFollowerCount = await FollowerModel.destroy({where: where})
            return !!deletedFollowerCount
        } catch (error) {
            throw error
        }
    }
}

export default new FollowerRepository()