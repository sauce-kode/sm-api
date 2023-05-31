"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailResponse = exports.ErrorResponse = exports.SuccessResponse = exports.Status = void 0;
var Status;
(function (Status) {
    Status["FAIL"] = "fail";
    Status["ERROR"] = "error";
    Status["SUCCESS"] = "success";
})(Status = exports.Status || (exports.Status = {}));
class SuccessResponse {
    constructor(status, httpCode, data) {
        this.status = status;
        this.data = data;
        this.httpCode = httpCode;
    }
}
exports.SuccessResponse = SuccessResponse;
class ErrorResponse {
    constructor(status, httpCode, message) {
        this.status = status;
        this.message = message;
        this.httpCode = httpCode;
    }
}
exports.ErrorResponse = ErrorResponse;
class FailResponse {
    constructor(status, data, httpCode, message) {
        this.status = status;
        this.data = data;
        this.message = message;
        this.httpCode = httpCode;
    }
}
exports.FailResponse = FailResponse;
