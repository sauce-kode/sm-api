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
const follower_schema_1 = require("../follower/follower.schema");
const __1 = require("..");
const follower_controller_1 = __importDefault(require("../follower/follower.controller"));
const router = express_1.default.Router();
router
    .route("/")
    .post((0, validate_1.validate)(follower_schema_1.followUserSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const user = res.locals.user.id;
    const result = yield follower_controller_1.default.create(payload, user);
    (0, __1.handleResponse)(res, result);
}))
    .delete((0, validate_1.validate)(follower_schema_1.followUserSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const user = res.locals.user.id;
    const result = yield follower_controller_1.default.delete(payload, user);
    (0, __1.handleResponse)(res, result);
}));
exports.default = router;
