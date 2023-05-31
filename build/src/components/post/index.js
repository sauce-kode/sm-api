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
const express_1 = __importDefault(require("express"));
const validate_1 = require("../../middleware/validate");
const __1 = require("..");
const post_controller_1 = __importDefault(require("./post.controller"));
const post_schema_1 = require("./post.schema");
const checkCache_1 = __importDefault(require("../../middleware/checkCache"));
const router = express_1.default.Router();
router
    .route("/")
    .post((0, validate_1.validate)(post_schema_1.CreatePostSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const user = res.locals.user.id;
    const result = yield post_controller_1.default.create(payload, user);
    (0, __1.handleResponse)(res, result);
}))
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user.id;
    let { page, limit } = req.query;
    const result = yield post_controller_1.default.get(user, Number(page), Number(limit));
    (0, __1.handleResponse)(res, result);
}));
router
    .route("/:postId")
    .get((0, validate_1.validate)(post_schema_1.getPostSchema), checkCache_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    const user = res.locals.user.id;
    const result = yield post_controller_1.default.find(postId, user);
    (0, __1.handleResponse)(res, result);
}));
exports.default = router;
