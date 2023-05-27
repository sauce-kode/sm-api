import { User } from "./user.interface";
import { UserOutput } from "./user.model";

export const userResource = (user: UserOutput) : User => {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
    }
}