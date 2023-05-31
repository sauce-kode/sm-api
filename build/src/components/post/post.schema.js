"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostSchema = exports.CreatePostSchema = void 0;
const zod_1 = require("zod");
exports.CreatePostSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: "Add post title"
        })
            .min(2, "Your post title cannot be less than 2 characters"),
        content: zod_1.z
            .string({
            required_error: "Add post content",
        })
            .min(50, "Your post content cannot be less than 50 characters")
    }),
});
const params = {
    params: (0, zod_1.object)({
        postId: (0, zod_1.string)()
    })
};
exports.getPostSchema = (0, zod_1.object)(Object.assign({}, params));
