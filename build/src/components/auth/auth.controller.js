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
const user_service_1 = __importDefault(require("../user/user.service"));
const IResponse_1 = require("../../libraries/IResponse");
const commonErrors_1 = require("../../libraries/commonErrors");
const error_1 = __importDefault(require("../../libraries/error"));
const transformer = __importStar(require("../user/user.transformer"));
const httpStatusCodes_1 = require("../../libraries/httpStatusCodes");
const utils_1 = __importDefault(require("../../libraries/utils"));
const auth_service_1 = __importDefault(require("./auth.service"));
class AuthController {
    register(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield user_service_1.default.findUserByEmail(payload.email);
            if (userExists)
                return new IResponse_1.FailResponse(IResponse_1.Status.FAIL, {}, httpStatusCodes_1.HttpStatusCode.BAD_REQUEST, commonErrors_1.CommonErrors.USER_EXISTS);
            const result = yield user_service_1.default.createUser(payload);
            if (result instanceof error_1.default)
                return new IResponse_1.ErrorResponse(IResponse_1.Status.ERROR, result.httpCode, commonErrors_1.CommonErrors.UNSUCCESSFUL_SIGNUP);
            return new IResponse_1.SuccessResponse(IResponse_1.Status.SUCCESS, httpStatusCodes_1.HttpStatusCode.CREATED, transformer.userResource(result));
        });
    }
    login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginField = yield this.getLoginField(payload.username);
            let response;
            if (loginField == 'username') {
                response = yield user_service_1.default.findUserByUsername(payload.username);
            }
            else {
                response = yield user_service_1.default.findUserByEmail(payload.username);
            }
            if (response) {
                if (response instanceof error_1.default)
                    return new IResponse_1.ErrorResponse(IResponse_1.Status.ERROR, response.httpCode, commonErrors_1.CommonErrors.SERVER_ERROR);
                const passwordMatches = yield user_service_1.default.comparePasswords(payload.password, response.password);
                if (passwordMatches) {
                    const jwtPayload = yield auth_service_1.default.signToken(response);
                    const data = {
                        'user': transformer.userResource(response),
                        'token': jwtPayload
                    };
                    return new IResponse_1.SuccessResponse(IResponse_1.Status.SUCCESS, httpStatusCodes_1.HttpStatusCode.OK, data);
                }
            }
            return new IResponse_1.FailResponse(IResponse_1.Status.FAIL, {}, httpStatusCodes_1.HttpStatusCode.BAD_REQUEST, commonErrors_1.CommonErrors.INVALID_USER);
        });
    }
    getLoginField(text) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield utils_1.default.stringIsEmail(text)) ? 'email' : 'username';
        });
    }
}
exports.default = new AuthController();
