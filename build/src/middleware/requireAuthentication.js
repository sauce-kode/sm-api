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
const components_1 = require("../components");
const IResponse_1 = require("../libraries/IResponse");
const httpStatusCodes_1 = require("../libraries/httpStatusCodes");
const commonErrors_1 = require("../libraries/commonErrors");
const token_1 = __importDefault(require("../libraries/token"));
const user_service_1 = __importDefault(require("../components/user/user.service"));
const redis_1 = __importDefault(require("../libraries/redis"));
const requireAuthentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let accessToken;
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            accessToken = req.headers.authorization.split(" ")[1];
        }
        if (!accessToken) {
            return (0, components_1.handleResponse)(res, new IResponse_1.FailResponse(IResponse_1.Status.FAIL, {}, httpStatusCodes_1.HttpStatusCode.UNAUTHORIZED, commonErrors_1.CommonErrors.UNAUTHORIZED));
        }
        const decodedToken = token_1.default.verifyJwt(accessToken);
        if (!decodedToken) {
            (0, components_1.handleResponse)(res, new IResponse_1.FailResponse(IResponse_1.Status.FAIL, {}, httpStatusCodes_1.HttpStatusCode.BAD_REQUEST, commonErrors_1.CommonErrors.INVALID_TOKEN_TYPE));
        }
        const session = yield redis_1.default.get(decodedToken.sub);
        if (!session) {
            return (0, components_1.handleResponse)(res, new IResponse_1.FailResponse(IResponse_1.Status.FAIL, {}, httpStatusCodes_1.HttpStatusCode.UNAUTHORIZED, commonErrors_1.CommonErrors.UNAUTHORIZED));
        }
        // Ensure user still exists
        const user = yield user_service_1.default.findUserById(JSON.parse(session).id);
        if (!user) {
            return (0, components_1.handleResponse)(res, new IResponse_1.FailResponse(IResponse_1.Status.FAIL, {}, httpStatusCodes_1.HttpStatusCode.UNAUTHORIZED, commonErrors_1.CommonErrors.UNAUTHORIZED));
        }
        res.locals.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = requireAuthentication;
