import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken'
import * as fs from 'fs'
import path from 'path'

export interface JWTPayload {
    iss: string,
    aud: string,
    exp: number,
    iat: number
}

export default class Token {
    static signJwt(
        payload: Object,
        options: SignOptions = {}
    ) : string {
        const privateKey = fs.readFileSync(path.join(__dirname, './../../private.key'))
        return jwt.sign(payload, privateKey, {
            ...options,
            algorithm: 'RS256',
        })
    }

    static verifyJwt <T>(
        token: string,
    ) : T | null {
        try {
            const publicKey = fs.readFileSync(path.join(__dirname, './../../public.key'))
            const verifyOptions : VerifyOptions = {
                algorithms: ['RS256']
            }
            return jwt.verify(token, publicKey, verifyOptions) as T;
        } catch (error) {
            return null;
        }
    }

}