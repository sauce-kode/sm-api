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
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = __importStar(require("./error"));
const httpStatusCodes_1 = require("./httpStatusCodes");
const commonErrors_1 = require("./commonErrors");
class Utils {
    static generateSalt() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bcrypt_1.default.genSalt(10);
            }
            catch (error) {
                error_1.handler.reportError(error);
                throw new error_1.default("Salt Error", httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR, commonErrors_1.CommonErrors.SERVER_ERROR);
            }
        });
    }
    static hashText(text, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bcrypt_1.default.hash(text, salt);
            }
            catch (error) {
                error_1.handler.reportError(error);
                throw new error_1.default("Hashing Error", httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR, commonErrors_1.CommonErrors.SERVER_ERROR);
            }
        });
    }
    static compareTexts(plain, hashed) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bcrypt_1.default.compare(plain, hashed);
            }
            catch (error) {
                error_1.handler.reportError(error);
                throw new error_1.default("Comparing Hash Error", httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR, commonErrors_1.CommonErrors.SERVER_ERROR);
            }
        });
    }
    static computePagination(total, data, page, limit) {
        const totalPages = total;
        console.log("TOTAL", total);
        console.log("TOTAL PAGES", totalPages);
        console.log("LIMIT", limit);
        console.log("PAGE", page);
        const response = {
            totalPages: totalPages / limit,
            currentPage: page,
            data,
            prevPage: page - 1 == 0 ? null : page - 1,
            nextPage: page++
        };
        return response;
    }
    static stringIsEmail(text) {
        return __awaiter(this, void 0, void 0, function* () {
            const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
            return regexExp.test(text);
        });
    }
}
exports.default = Utils;
