import customConfig from "../../config/default";
import redisClient from "../../libraries/redis";
import Token from "../../libraries/token";
import { UserOutput } from "../user/user.model";

class AuthService {

    async signToken(user: UserOutput){
        redisClient.set(user.id, JSON.stringify(user), {
            EX: customConfig.redisCacheExpiresIn * 60
        })

        const token = Token.signJwt({sub: user.id})
        return token
    }
}

export default new AuthService()