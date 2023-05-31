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
const __1 = require("..");
const like_controller_1 = __importDefault(require("../like/like.controller"));
const router = express_1.default.Router();
router
    .route("/")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const userId = String(res.locals.user.id);
    const result = yield like_controller_1.default.create(payload, userId);
    (0, __1.handleResponse)(res, result);
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const userId = String(res.locals.user.id);
    const result = yield like_controller_1.default.delete(payload, userId);
    (0, __1.handleResponse)(res, result);
}));
exports.default = router;
