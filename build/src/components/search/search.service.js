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
const utils_1 = __importDefault(require("../../libraries/utils"));
const post_repository_1 = __importDefault(require("../post/post.repository"));
class SearchService {
    searchPosts(searchQuery, limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rows, count } = yield post_repository_1.default.search(searchQuery, limit - 1, offset);
                const data = utils_1.default.computePagination(count, rows, offset, limit);
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new SearchService();
