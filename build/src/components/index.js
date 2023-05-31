"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleResponse = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const post_1 = __importDefault(require("./post"));
const follower_1 = __importDefault(require("./follower"));
const comment_1 = __importDefault(require("./comment"));
const like_1 = __importDefault(require("./like"));
const search_1 = __importDefault(require("./search"));
const requireAuthentication_1 = __importDefault(require("../middleware/requireAuthentication"));
const router = express_1.default.Router();
const handleResponse = function (res, response) {
    let resp = Object.assign({}, response);
    delete resp.httpCode;
    res.status(response.httpCode || 400).send(resp);
};
exports.handleResponse = handleResponse;
router.use("/auth", auth_1.default);
router.use(requireAuthentication_1.default);
router.use("/follow", follower_1.default);
router.use("/posts", post_1.default);
router.use("/search", search_1.default);
router.use("/comments", comment_1.default);
router.use("/like", like_1.default);
exports.default = router;
