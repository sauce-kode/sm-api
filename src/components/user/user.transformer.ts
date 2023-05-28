import { UserOutput } from "./user.model";

interface UserResponse {
    id: string,
    username: string,
    email: string,
    password?: string,
    created_at: Date,
    updated_at: Date,
    deleted_at?: Date
}

export const userResource = (user: UserOutput) : UserResponse => {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
    }
}