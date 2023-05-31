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
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const components_1 = __importDefault(require("./src/components"));
const postgres_1 = require("./src/database/postgres");
const logger_1 = __importDefault(require("./src/libraries/logger"));
const default_1 = __importDefault(require("./src/config/default"));
const app = (0, express_1.default)();
const PORT = default_1.default.port;
app.use(express_1.default.json({ limit: "10kb" }));
if (process.env.NODE_ENV === "development")
    app.use((0, morgan_1.default)("dev"));
app.get("/api/healthchecker", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Social Media REST API",
    });
});
app.use("/api", components_1.default);
app.all("*", (req, res) => {
    res.status(404).json({
        status: "fail",
        message: `Route: ${req.originalUrl} does not exist on this server`,
    });
});
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info("🚀 Server started Successfully");
    yield (0, postgres_1.connectDB)();
    yield postgres_1.sequelizeConnection.sync({ force: false }).then(() => {
        logger_1.default.info("🚀 Database synced Successfully");
    });
}));
process.on('uncaughtException', reason => {
    logger_1.default.info(`An error occured ${reason}`);
    throw reason;
});
