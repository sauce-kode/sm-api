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
const IResponse_1 = require("../../libraries/IResponse");
const commonErrors_1 = require("../../libraries/commonErrors");
const error_1 = __importDefault(require("../../libraries/error"));
const httpStatusCodes_1 = require("../../libraries/httpStatusCodes");
const comment_service_1 = __importDefault(require("./comment.service"));
const post_service_1 = __importDefault(require("../post/post.service"));
const transformer = __importStar(require("./comment.transformer"));
class CommentController {
    create(payload, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const findPost = yield post_service_1.default.findPost(payload.postId);
            if (findPost) {
                if (findPost instanceof error_1.default)
                    return new IResponse_1.ErrorResponse(IResponse_1.Status.ERROR, findPost.httpCode, commonErrors_1.CommonErrors.SERVER_ERROR);
                const commentPayload = { comment: payload.comment, post_id: payload.postId, user_id: userId };
                const result = yield comment_service_1.default.createComment(commentPayload);
                if (result instanceof error_1.default)
                    return new IResponse_1.ErrorResponse(IResponse_1.Status.ERROR, result.httpCode, result.message);
                return new IResponse_1.SuccessResponse(IResponse_1.Status.SUCCESS, httpStatusCodes_1.HttpStatusCode.CREATED, transformer.commentResource(result));
            }
            return new IResponse_1.FailResponse(IResponse_1.Status.FAIL, {}, httpStatusCodes_1.HttpStatusCode.BAD_REQUEST, commonErrors_1.CommonErrors.INVALID_POST);
        });
    }
}
exports.default = new CommentController();
