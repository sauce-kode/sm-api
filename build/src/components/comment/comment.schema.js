"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommentSchema = void 0;
const zod_1 = require("zod");
exports.CreateCommentSchema = zod_1.z.object({
    body: zod_1.z.object({
        postId: zod_1.z.string(),
        comment: zod_1.z.string({
            required_error: "Comment cannot be empty",
        })
            .min(1, "Your comment cannot be less than 1 character")
    }),
});
