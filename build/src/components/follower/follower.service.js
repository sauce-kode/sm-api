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
const error_1 = __importDefault(require("../../libraries/error"));
const httpStatusCodes_1 = require("../../libraries/httpStatusCodes");
const follower_repository_1 = __importDefault(require("./follower.repository"));
class FollowerService {
    createFollower(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield follower_repository_1.default.create(data);
            }
            catch (error) {
                return new error_1.default("", httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR, error.message);
            }
        });
    }
    deleteFollower(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield follower_repository_1.default.delete(data);
            }
            catch (error) {
                return new error_1.default("", httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR, error.message);
            }
        });
    }
}
exports.default = new FollowerService();
