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
exports.DataTypes = exports.Sequelize = exports.sequelizeConnection = exports.connectDB = void 0;
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
Object.defineProperty(exports, "DataTypes", { enumerable: true, get: function () { return sequelize_1.DataTypes; } });
const logger_1 = __importDefault(require("../libraries/logger"));
const default_1 = __importDefault(require("../config/default"));
const POSTGRES_URL = default_1.default.dbUri;
const sequelizeConnection = new sequelize_1.Sequelize(POSTGRES_URL, {
    dialect: 'postgres'
});
exports.sequelizeConnection = sequelizeConnection;
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelizeConnection.authenticate();
            logger_1.default.info("✅ Database Connection has been successfully established.");
        }
        catch (error) {
            logger_1.default.error(`Unable to connect to the database: ${error}`);
        }
    });
}
exports.connectDB = connectDB;
