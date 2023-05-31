"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonErrors = void 0;
var CommonErrors;
(function (CommonErrors) {
    CommonErrors["DEFAULT_ERROR"] = "Something went wrong, try again later";
    CommonErrors["SERVER_ERROR"] = "A server error occurred";
    CommonErrors["BAD_PARAMETERS"] = "Ensure you are passing the right parameters";
    CommonErrors["DATABASE_ERROR"] = "An error occurred with the database";
    CommonErrors["AUTH_HEADER_MISSING"] = "No authorization header";
    CommonErrors["INVALID_TOKEN"] = "Invalid Token";
    CommonErrors["INVALID_TOKEN_TYPE"] = "Invalid Token Type";
    CommonErrors["UNAUTHORIZED"] = "User is not authorized to access resource";
    CommonErrors["USER_EXISTS"] = "A user with this email already exists";
    CommonErrors["UNSUCCESSFUL_SIGNUP"] = "Could not register user";
    CommonErrors["INVALID_USER"] = "User does not exist";
    CommonErrors["INVALID_POST"] = "Post does not exist";
})(CommonErrors = exports.CommonErrors || (exports.CommonErrors = {}));
