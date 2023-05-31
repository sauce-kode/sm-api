"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const app_root_path_1 = __importDefault(require("app-root-path"));
const options = {
    file: {
        level: 'info',
        filename: `${app_root_path_1.default}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};
const Logger = (service) => {
    return (0, winston_1.createLogger)({
        level: 'info',
        format: winston_1.format.combine(winston_1.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json()),
        defaultMeta: { service: service },
        transports: [
            new winston_1.transports.File(options.file),
            new winston_1.transports.Console(options.console),
        ],
        exitOnError: false,
    });
};
exports.default = Logger("Social Media REST API");
