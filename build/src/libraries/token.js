"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
class Token {
    static signJwt(payload, options = {}) {
        const privateKey = fs.readFileSync(path_1.default.join(__dirname, './../../private.key'));
        return jsonwebtoken_1.default.sign(payload, privateKey, Object.assign(Object.assign({}, options), { algorithm: 'RS256' }));
    }
    static verifyJwt(token) {
        try {
            const publicKey = fs.readFileSync(path_1.default.join(__dirname, './../../public.key'));
            const verifyOptions = {
                algorithms: ['RS256']
            };
            return jsonwebtoken_1.default.verify(token, publicKey, verifyOptions);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = Token;
