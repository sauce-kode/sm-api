"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const default_1 = __importDefault(require("../../config/default"));
const redis_1 = __importDefault(require("../../libraries/redis"));
const token_1 = __importDefault(require("../../libraries/token"));
class AuthService {
    signToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            redis_1.default.set(user.id, JSON.stringify(user), {
                EX: default_1.default.redisCacheExpiresIn * 60
            });
            const token = token_1.default.signJwt({ sub: user.id });
            return token;
        });
    }
}
exports.default = new AuthService();
