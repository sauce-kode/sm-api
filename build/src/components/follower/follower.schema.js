"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followUserSchema = void 0;
const zod_1 = require("zod");
exports.followUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        followingUserId: zod_1.z
            .string()
    })
});
