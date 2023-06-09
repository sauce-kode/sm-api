export enum CommonErrors {

    DEFAULT_ERROR = "Something went wrong, try again later",

    SERVER_ERROR = "A server error occurred",
  
    BAD_PARAMETERS = "Ensure you are passing the right parameters",

    DATABASE_ERROR = "An error occurred with the database",

    AUTH_HEADER_MISSING = "No authorization header",

    INVALID_TOKEN = "Invalid Token",

    INVALID_TOKEN_TYPE = "Invalid Token Type",

    UNAUTHORIZED = "User is not authorized to access resource",

    USER_EXISTS = "A user with this email already exists",

    UNSUCCESSFUL_SIGNUP = "Could not register user",

    INVALID_USER='User does not exist',

    INVALID_POST = "Post does not exist"

}