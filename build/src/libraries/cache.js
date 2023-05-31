"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("./redis"));
class RedisCache {
    constructor() {
        this.client = redis_1.default;
    }
    getData(key) {
        return this.client.get(key);
    }
    addData(key, data) {
        this.client.set(key, data, { EX: 60 * 60 * 15 });
    }
    updated_ata(key, data) {
        this.client.set(key, data, { EX: 60 * 60 * 15 });
    }
    deleted_ata(key) {
        this.client.del(key);
    }
}
exports.default = new RedisCache();
