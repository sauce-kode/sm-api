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
const cache_1 = __importDefault(require("../../libraries/cache"));
const error_1 = __importStar(require("../../libraries/error"));
const httpStatusCodes_1 = require("../../libraries/httpStatusCodes");
const post_repository_1 = __importDefault(require("./post.repository"));
class PostService {
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield post_repository_1.default.create(post);
            }
            catch (error) {
                error_1.handler.reportError(error);
                if (error instanceof error_1.default) {
                    return new error_1.default("", httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR, error.message);
                }
                throw error;
            }
        });
    }
    getPosts(userId, limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield post_repository_1.default.getAll(userId, limit, offset);
            }
            catch (error) {
                throw error;
            }
        });
    }
    findPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield post_repository_1.default.findById(id);
            cache_1.default.addData(`post:${post.id}`, JSON.stringify(post));
            return post;
        });
    }
}
exports.default = new PostService();
