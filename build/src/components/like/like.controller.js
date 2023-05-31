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
const IResponse_1 = require("../../libraries/IResponse");
const commonErrors_1 = require("../../libraries/commonErrors");
const error_1 = __importDefault(require("../../libraries/error"));
const httpStatusCodes_1 = require("../../libraries/httpStatusCodes");
const like_service_1 = __importDefault(require("./like.service"));
const post_service_1 = __importDefault(require("../post/post.service"));
class LikeController {
    create(payload, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const findPost = yield post_service_1.default.findPost(payload.postId);
            if (findPost) {
                if (findPost instanceof error_1.default)
                    return new IResponse_1.ErrorResponse(IResponse_1.Status.ERROR, findPost.httpCode, commonErrors_1.CommonErrors.SERVER_ERROR);
                const likePayload = { user_id: userId, post_id: payload.postId };
                const result = yield like_service_1.default.createLike(likePayload);
                if (result instanceof error_1.default)
                    return new IResponse_1.ErrorResponse(IResponse_1.Status.ERROR, result.httpCode, result.message);
                return new IResponse_1.SuccessResponse(IResponse_1.Status.SUCCESS, httpStatusCodes_1.HttpStatusCode.CREATED, {});
            }
            return new IResponse_1.FailResponse(IResponse_1.Status.FAIL, {}, httpStatusCodes_1.HttpStatusCode.BAD_REQUEST, commonErrors_1.CommonErrors.INVALID_POST);
        });
    }
    delete(payload, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const likePayload = { user_id: userId, post_id: payload.postId };
            const result = yield like_service_1.default.deleteLike(likePayload);
            if (result instanceof error_1.default)
                return new IResponse_1.ErrorResponse(IResponse_1.Status.ERROR, result.httpCode, result.message);
            return new IResponse_1.SuccessResponse(IResponse_1.Status.SUCCESS, httpStatusCodes_1.HttpStatusCode.NO_CONTENT, {});
        });
    }
}
exports.default = new LikeController();
