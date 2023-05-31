"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLikeSchema = void 0;
const zod_1 = require("zod");
exports.CreateLikeSchema = zod_1.z.object({
    body: zod_1.z.object({
        postId: zod_1.z.string()
    }),
});
