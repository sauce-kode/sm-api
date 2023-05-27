import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    username: z
        .string({
            required_error: "Username is required"
        })
        .min(3, "Username cannot be less than 3 characters"),
    email: z
        .string({
            required_error: "E-mail address is required",
        })
        .email("E-mail address appears to be invalid"),
    password: z
        .string({
            required_error: "Enter a secure password",
        })
        .min(6, "Password cannot be less than 6 characters"),
  }),
});

export const filterQuery = z.object({
  limit: z.number().default(1),
  page: z.number().default(10),
});

export type FilterQueryRequest = z.TypeOf<typeof filterQuery>;
export type CreateUserRequest = z.TypeOf<typeof createUserSchema>["body"];
