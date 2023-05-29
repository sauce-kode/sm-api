import { z } from "zod";

export const CreatePostSchema = z.object({
  body: z.object({
    title: z
        .string({
            required_error: "Add post title"
        })
        .min(2, "Your post title cannot be less than 2 characters"),
    content: z
        .string({
            required_error: "Add post content",
        })
        .min(50, "Your post content cannot be less than 50 characters")
  }),
});

export type CreatePostRequest = z.TypeOf<typeof CreatePostSchema>["body"];
