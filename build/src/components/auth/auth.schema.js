"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userRegistrationSchema = void 0;
const zod_1 = require("zod");
exports.userRegistrationSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z
            .string({
            required_error: "Username is required"
        })
            .min(3, "Username cannot be less than 3 characters"),
        email: zod_1.z
            .string({
            required_error: "E-mail address is required",
        })
            .email("E-mail address appears to be invalid"),
        password: zod_1.z
            .string({
            required_error: "Enter a secure password",
        })
            .min(6, "Password cannot be less than 6 characters"),
        passwordConfirm: zod_1.z
            .string({
            required_error: "Please confirm your password",
        }),
    })
        .refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Passwords do not match'
    }),
});
exports.userLoginSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z
            .string({
            required_error: "Enter your username or E-mail address"
        })
            .min(3, "Username or E-mail address cannot be less than 3 characters"),
        password: zod_1.z
            .string({
            required_error: "Enter your secure password",
        })
            .min(6, "Password cannot be less than 6 characters"),
    }),
});
