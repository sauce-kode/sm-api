export enum Status {
    FAIL = "fail",
    ERROR = "error",
    SUCCESS = "success"
}

export interface IResponse {
    status: Status;
    message?: string;
    data?: object;
    httpCode?: number
    error?: object
}

export class SuccessResponse implements IResponse {
    status: Status;
    data: object;
    httpCode?: number;

    constructor(status: Status, data: object, httpCode?: number) {
        this.status = status;
        this.data = data;
        this.httpCode = httpCode;
    }
}

export class ErrorResponse implements IResponse {
    status: Status;
    httpCode?: number;
    message: string;

    constructor(status: Status, message: string, httpCode?: number) {
        this.status = status;
        this.message = message;
        this.httpCode = httpCode;
    }
}

export class FailResponse implements IResponse {
    status: Status;
    httpCode?: number;
    data: object
    message?: string

    constructor(status: Status, data: object, message?: string,  httpCode?: number) {
        this.status = status;
        this.data = data;
        this.message = message;
        this.httpCode = httpCode;
    }
}