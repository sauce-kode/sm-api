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
const likes_model_1 = __importDefault(require("./likes.model"));
class LikeRepository {
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield likes_model_1.default.create(payload);
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedLikeCount = yield likes_model_1.default.destroy({ where: { user_id: payload.user_id, post_id: payload.post_id } });
                return !!deletedLikeCount;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new LikeRepository();
