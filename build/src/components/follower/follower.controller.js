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
const follower_service_1 = __importDefault(require("./follower.service"));
class UserController {
    create(payload, followerUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const followPayload = { following_user_id: payload.followingUserId, follower_user_id: followerUserId };
            if (followPayload.follower_user_id == followPayload.following_user_id)
                return new IResponse_1.SuccessResponse(IResponse_1.Status.SUCCESS, httpStatusCodes_1.HttpStatusCode.NO_CONTENT, {});
            const result = yield follower_service_1.default.createFollower(followPayload);
            if (result instanceof error_1.default)
                return new IResponse_1.ErrorResponse(IResponse_1.Status.ERROR, result.httpCode, commonErrors_1.CommonErrors.DEFAULT_ERROR);
            return new IResponse_1.SuccessResponse(IResponse_1.Status.SUCCESS, httpStatusCodes_1.HttpStatusCode.OK, {});
        });
    }
    delete(payload, followerUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const unfollowPayload = { following_user_id: payload.followingUserId, follower_user_id: followerUserId };
            const result = yield follower_service_1.default.deleteFollower(unfollowPayload);
            if (result instanceof error_1.default)
                return new IResponse_1.ErrorResponse(IResponse_1.Status.ERROR, result.httpCode, commonErrors_1.CommonErrors.DEFAULT_ERROR);
            return new IResponse_1.SuccessResponse(IResponse_1.Status.SUCCESS, httpStatusCodes_1.HttpStatusCode.NO_CONTENT, {});
        });
    }
}
exports.default = new UserController();
