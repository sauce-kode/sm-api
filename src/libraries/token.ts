import jwt, { SignOptions } from 'jsonwebtoken'
import customConfig from '../config/default'
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
            ...(options && options),
            algorithm: 'RS256',
        })
    }

    // static async verifyJwt(
    //     token: string,
    //     key: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
    // ) : Promise<string | jwt.JwtPayload | null> {
    //     try {
    //         const publicKey = Buffer.from(customConfig[key], 'base64').toString(
    //           'ascii'
    //         );
    //         return jwt.verify(token, publicKey);
    //       } catch (error) {
    //         console.log(error);
    //         return null;
    //       }
    // }

}