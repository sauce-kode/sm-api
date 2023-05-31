"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const customConfig = {
    port: process.env.PORT,
    accessTokenExpiresIn: 15,
    redisCacheExpiresIn: 60,
    dbUri: process.env.DATABASE_URL,
    hashingRounds: process.env.HASHING_ROUNDS
};
exports.default = customConfig;
